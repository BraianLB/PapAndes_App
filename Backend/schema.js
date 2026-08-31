const mysql = require('mysql2');
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'papa'
});
db.query('DESCRIBE compras', (err, res) => {
  if (err) console.error(err);
  else console.log(res);
  db.end();
  process.exit(0);
});
