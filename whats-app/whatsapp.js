// whatsapp-config.js
const qrcode = require('qrcode-terminal');
const { Client, LocalAuth  } = require('whatsapp-web.js');

const client = new Client();

client.on('qr', qr => {
    // Generate and scan this QR code with your phone
    qrcode.generate(qr, {small: true});
});

client.on('ready', () => {
    console.log('Client is ready!');
});

client.on('message', message => {
    if(message.body === '!ping') {
        client.sendMessage(message.from, 'pong');
        //client.sendMessage("573194843592@c.us", 'pong');
    }
});

client.initialize();

module.exports = { client };