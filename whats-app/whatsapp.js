const qrcode = require("qrcode-terminal");
const { Client, LocalAuth } = require("whatsapp-web.js");

const client = new Client({
  authStrategy: new LocalAuth(),
  puppeteer: {
    headless: true, // Asegúrate de que Puppeteer se ejecute en modo headless
    args: [
      "--no-sandbox",
      "--disable-setuid-sandbox",
      "--disable-dev-shm-usage", // Mejora el uso de la memoria compartida
      "--disable-accelerated-2d-canvas", // Deshabilita la aceleración de canvas 2D
      "--disable-gpu", // Deshabilita el uso de GPU
      "--disable-features=site-per-process", // Deshabilita el aislamiento de sitios
      "--disable-web-security", // Deshabilita la seguridad web para evitar ciertos problemas de permisos
      "--ignore-certificate-errors", // Ignora errores de certificado
    ],
  },
});

client.on("qr", (qr) => {
  qrcode.generate(qr, { small: true });
});

client.on("ready", () => {
  console.log("Client is ready!");
});

client.on("message", (message) => {
  if (message.body === "!ping") {
    client.sendMessage(message.from, "pong");
  }
});

client.on('disconnected', (reason) => {
  console.log('Client was logged out', reason);
  client.initialize(); // Re-inicializa el cliente si se desconecta
});

client.on('auth_failure', (msg) => {
  console.error('Authentication failure:', msg);
  // Puedes añadir lógica adicional aquí para manejar fallos de autenticación
});

client.on('change_state', state => {
  console.log('Client state:', state);
});

client.on('error', (error) => {
  console.error('Error:', error);
});

// client.initialize();

module.exports = { client };




// const puppeteer = require('puppeteer');
// const qrcode = require("qrcode-terminal");
// const { Client, LocalAuth } = require("whatsapp-web.js");
// const wwebVersion = '2.2407.3';

// const client = new Client({
//   authStrategy: new LocalAuth(),
//   puppeteer: {
//     headless: true, // Asegúrate de que Puppeteer se ejecute en modo headless
//     args: [
//       "--no-sandbox",
//       "--disable-setuid-sandbox",
//       "--disable-dev-shm-usage", // Mejora el uso de la memoria compartida
//       "--disable-accelerated-2d-canvas", // Deshabilita la aceleración de canvas 2D
//       "--disable-gpu", // Deshabilita el uso de GPU
//       "--disable-features=site-per-process", // Deshabilita el aislamiento de sitios
//       "--disable-web-security", // Deshabilita la seguridad web para evitar ciertos problemas de permisos
//       "--ignore-certificate-errors", // Ignora errores de certificado
//     ],
//   },
//   webVersionCache: {
//     type: 'remote',
//     remotePath: `https://raw.githubusercontent.com/wppconnect-team/wa-version/main/html/${wwebVersion}.html`,
//   },
// });

// client.on("qr", (qr) => {
//   qrcode.generate(qr, { small: true });
// });

// client.on("ready", () => {
//   console.log("Client is ready!");
// });

// client.on("message", (message) => {
//   if (message.body === "!ping") {
//     client.sendMessage(message.from, "pong");
//   }
// });


// client.on('disconnected', (reason) => {
//   console.log('Client was logged out', reason);
//   client.initialize(); // Re-inicializa el cliente si se desconecta
// });

// client.on('auth_failure', (msg) => {
//   console.error('Authentication failure:', msg);
// });

// client.on('change_state', state => {
//   console.log('Client state:', state);
// });

// client.on('error', (error) => {
//   console.error('Error:', error);
// });


// client.initialize();

// module.exports = { client };
