
const net = require('net');
const port = 3306;
const host = '127.0.0.1';

const client = new net.Socket();

console.log(`Intentando una conexión de red básica a ${host}:${port}...`);

client.connect(port, host, () => {
  console.log('\n¡ÉXITO! Se pudo establecer una conexión de red con el puerto 3306 desde Node.js.');
  client.destroy(); // Cerramos la conexión inmediatamente
});

client.on('error', (err) => {
  console.error('\nFALLO: No se pudo establecer la conexión de red desde Node.js.');
  console.error('Este es el mismo error ECONNREFUSED, confirmando que algo está bloqueando a Node.js.');
  console.error(err.message);
});
