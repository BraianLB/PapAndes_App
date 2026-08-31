const mysql = require('mysql2');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'papa',
  family: 4
});

db.connect(err => {
  if (err) throw err;
  console.log('Connected');
  
  const sql = `
    CREATE TABLE IF NOT EXISTS historico_precProd (
      id INT AUTO_INCREMENT PRIMARY KEY,
      producto VARCHAR(100),
      precio_anterior INT,
      precio_nuevo INT,
      diferencia INT,
      fecha DATE
    )
  `;
  
  db.query(sql, (err, result) => {
    if (err) throw err;
    console.log('Table created');
    process.exit();
  });
});
