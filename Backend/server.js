
const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

const uploadsDir = path.join(__dirname, 'public/uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

app.use('/uploads', express.static(uploadsDir));

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadsDir);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

// --- Configuración de la conexión a la base de datos ---
const db = mysql.createConnection({
  host: 'localhost', // Volvemos a usar 'localhost'
  user: 'root',
  password: '',
  database: 'papa',
  family: 4 // Forzar la resolución de dirección a IPv4
});

// Conectar a la base de datos
db.connect(err => {
  if (err) {
    console.error('Error al conectar a la base de datos:', err);
    return;
  }
  console.log('Conectado exitosamente a la base de datos MySQL!');
});

// --- Rutas de la API ---
app.get('/api/items', (req, res) => {
  const sql = "SELECT * FROM productos";
  db.query(sql, (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Error al consultar productos' });
    }
    res.json(results);
  });
});

app.post('/api/items', (req, res) => {
  const { Producto, Tipo, Medida, Precio, P_Unitario, Q_Caneca, Descripcion } = req.body;
  const sql = "INSERT INTO productos (Producto, Tipo, Medida, Precio, P_Unitario, Q_Caneca, Descripcion) VALUES (?, ?, ?, ?, ?, ?, ?)";
  db.query(sql, [Producto, Tipo, Medida, Precio, P_Unitario, Q_Caneca, Descripcion], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Error al guardar el producto' });
    }
    res.json({ message: 'Producto registrado exitosamente', insertId: results.insertId });
  });
});

app.post('/api/register', (req, res) => {
  const { nombre_completo, correo, usuario, contrasena } = req.body;
  const sql = "INSERT INTO usuarios (nombre_completo, correo, usuario, contrasena) VALUES (?, ?, ?, ?)";
  db.query(sql, [nombre_completo, correo, usuario, contrasena], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Error al registrar usuario' });
    }
    res.json({ message: 'Usuario registrado exitosamente', insertId: results.insertId });
  });
});

app.post('/api/login', (req, res) => {
  const { usuario, contrasena } = req.body;
  const sql = "SELECT id, nombre_completo, correo, usuario FROM usuarios WHERE (usuario = ? OR correo = ?) AND contrasena = ?";
  db.query(sql, [usuario, usuario, contrasena], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Error en el servidor al iniciar sesión' });
    }
    if (results.length > 0) {
      res.json({ message: 'Login exitoso', usuario: results[0] });
    } else {
      res.status(401).json({ error: 'Credenciales inválidas' });
    }
  });
});

app.get('/api/finanzas/resumen', (req, res) => {
  const sql = "SELECT Tipo, SUM(Total) as total FROM compras GROUP BY Tipo";
  db.query(sql, (err, results) => {
    if (err) {
      console.error('Error al consultar finanzas:', err);
      return res.status(500).json({ error: 'Error al consultar el resumen de finanzas' });
    }
    res.json(results);
  });
});

app.get('/api/compras/recientes', (req, res) => {
  const sql = "SELECT * FROM compras ORDER BY Fecha DESC LIMIT 5";
  db.query(sql, (err, results) => {
    if (err) {
      console.error('Error al consultar compras recientes:', err);
      return res.status(500).json({ error: 'Error al consultar las compras recientes' });
    }
    res.json(results);
  });
});

app.post('/api/compras', (req, res) => {
  const { producto, tipo, descripcion, medida, cantidad, precio } = req.body;
  const total = parseFloat(cantidad) * parseFloat(precio);
  const fecha = new Date().toISOString().split('T')[0];

  const sql = "INSERT INTO compras (Producto, Tipo, Descripsion, Medida, Cantidad, Precio_U, Total, Fecha) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
  db.query(sql, [producto, tipo, descripcion, medida, cantidad, precio, total, fecha], (err, results) => {
    if (err) {
      console.error('Error al insertar gasto:', err);
      return res.status(500).json({ error: 'Error al guardar el gasto' });
    }
    
    // Check if price changed compared to inventory
    const checkSql = "SELECT Precio FROM productos WHERE Producto = ?";
    db.query(checkSql, [producto], (errCheck, resultsCheck) => {
      if (!errCheck && resultsCheck.length > 0) {
        const oldPrice = parseFloat(resultsCheck[0].Precio);
        const newPrice = parseFloat(precio);
        
        if (oldPrice !== newPrice) {
          return res.json({ 
            message: 'Gasto registrado exitosamente', 
            insertId: results.insertId,
            priceChanged: true,
            oldPrice: oldPrice,
            newPrice: newPrice
          });
        }
      }
      res.json({ message: 'Gasto registrado exitosamente', insertId: results.insertId });
    });
  });
});

app.post('/api/productos/updatePrice', (req, res) => {
  const { producto, precio_nuevo, precio_anterior } = req.body;
  const diferencia = parseFloat(precio_nuevo) - parseFloat(precio_anterior);
  const fecha = new Date().toISOString().split('T')[0];

  const sqlHist = "INSERT INTO historico_precProd (producto, precio_anterior, precio_nuevo, diferencia, fecha) VALUES (?, ?, ?, ?, ?)";
  db.query(sqlHist, [producto, precio_anterior, precio_nuevo, diferencia, fecha], (err, results) => {
    if (err) {
      console.error('Error al guardar historial:', err);
      return res.status(500).json({ error: 'Error al guardar el historial de precios' });
    }
    
    // Update both Precio and P_Unitario since P_Unitario seems to be used as unit price too
    const sqlUpdate = "UPDATE productos SET Precio = ?, P_Unitario = ? WHERE Producto = ?";
    db.query(sqlUpdate, [precio_nuevo, precio_nuevo, producto], (errUpd, resultsUpd) => {
      if (errUpd) {
        console.error('Error al actualizar precio:', errUpd);
        return res.status(500).json({ error: 'Error al actualizar el precio en inventario' });
      }
      res.json({ message: 'Precio actualizado exitosamente' });
    });
  });
});

app.get('/api/lotes', (req, res) => {
  const sql = "SELECT id, nombre as name, ubicacion as sector, tipo_Semilla as variety, fecha_siemb as plantedDate, metros as maturity, status, imageUrl FROM lotes";
  db.query(sql, (err, results) => {
    if (err) {
      console.error('Error al consultar lotes:', err);
      return res.status(500).json({ error: 'Error al consultar los lotes' });
    }
    res.json(results);
  });
});

app.post('/api/lotes', upload.single('image'), (req, res) => {
  const { name, sector, variety, plantedDate, maturity, status } = req.body;
  let finalImageUrl = req.body.imageUrl;
  if (req.file) {
    finalImageUrl = `http://localhost:3001/uploads/${req.file.filename}`;
  } else if (!finalImageUrl) {
    finalImageUrl = `https://picsum.photos/id/${Math.floor(Math.random() * 1000)}/400/300`;
  }

  const sql = "INSERT INTO lotes (nombre, ubicacion, tipo_Semilla, fecha_siemb, metros, status, imageUrl) VALUES (?, ?, ?, ?, ?, ?, ?)";
  db.query(sql, [name, sector, variety, plantedDate, maturity, status, finalImageUrl], (err, results) => {
    if (err) {
      console.error('Error al insertar lote:', err);
      return res.status(500).json({ error: 'Error al guardar el lote' });
    }
    res.json({ message: 'Lote registrado exitosamente', insertId: results.insertId, imageUrl: finalImageUrl });
  });
});

app.get('/api/actividades', (req, res) => {
  const sql = `
    SELECT a.id, a.id_lote, a.tipo_operacion, a.fecha, a.estado, l.nombre as lote_nombre, l.ubicacion as lote_ubicacion 
    FROM actividades a 
    JOIN lotes l ON a.id_lote = l.id 
    ORDER BY a.fecha DESC
  `;
  db.query(sql, (err, results) => {
    if (err) {
      console.error('Error al consultar actividades:', err);
      return res.status(500).json({ error: 'Error al consultar las actividades' });
    }
    res.json(results);
  });
});

app.post('/api/actividades', (req, res) => {
  const { id_lote, tipo_operacion, fecha, estado } = req.body;
  const sql = "INSERT INTO actividades (id_lote, tipo_operacion, fecha, estado) VALUES (?, ?, ?, ?)";
  db.query(sql, [id_lote, tipo_operacion, fecha, estado], (err, results) => {
    if (err) {
      console.error('Error al insertar actividad:', err);
      return res.status(500).json({ error: 'Error al guardar la actividad' });
    }
    res.json({ message: 'Actividad registrada exitosamente', insertId: results.insertId });
  });
});

app.put('/api/actividades/:id', (req, res) => {
  const { id } = req.params;
  const { estado } = req.body;
  const sql = "UPDATE actividades SET estado = ? WHERE id = ?";
  db.query(sql, [estado, id], (err, results) => {
    if (err) {
      console.error('Error al actualizar actividad:', err);
      return res.status(500).json({ error: 'Error al actualizar la actividad' });
    }
    res.json({ message: 'Actividad actualizada exitosamente' });
  });
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor de backend escuchando en http://localhost:${port}`);
});
