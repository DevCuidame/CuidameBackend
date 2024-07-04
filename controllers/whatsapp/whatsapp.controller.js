const twilio = require("twilio");
const QR = require("../../models/qr");
const db = require("../../utils/connection");

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = new twilio(accountSid, authToken);
const TWILIO_PHONE_NUMBER = process.env.TWILIO_PHONE_NUMBER;

const sendPetMessage = async (to, contactName, petName, locationUrl) => {
  try {
    const formattedNumber = `+57${to}`; 
    const message = await client.messages.create({
      from: TWILIO_PHONE_NUMBER,
      to: formattedNumber,
      body: `Hola ${contactName},\nTu mascota, ${petName} fue escaneado/a en esta ubicación: ${locationUrl}`,
    });
    console.log(`Mensaje enviado a ${formattedNumber}: ${message.sid}`);
  } catch (error) {
    console.error(`Error al enviar mensaje a ${to}:`, error.message);
  }
};


const sendPersonaMessage = async (to, contactName, patientName, locationUrl) => {
  try {
    const formattedNumber = `+57${to}`; 
    const message = await client.messages.create({
      from: TWILIO_PHONE_NUMBER, 
      to: formattedNumber, 
      body: `Hola ${contactName}, tu familiar, \n${patientName}, fue escaneado/a en esta ubicación: ${locationUrl}`,
    });
    console.log(`Mensaje enviado a ${to}: ${message.sid}`);
  } catch (error) {
    console.error(`Error al enviar mensaje a ${to}:`, error.message);
  }
};

const sendNotification = async (req, res) => {
  const { code_request, latitude, longitude } = req.query;
  const data = await QR.getByCode(code_request);

  if (data) {
    const contacts = await QR.findContacts(data.id);
    const locationUrl = `https://maps.google.com/?q=${latitude},${longitude}`;

    let telefonos = [
      { nombre: contacts.nombre1, telefono: contacts.telefono1 },
      { nombre: contacts.nombre2, telefono: contacts.telefono2 },
      { nombre: contacts.nombre3, telefono: contacts.telefono3 },
    ];

    for (let contact of telefonos) {
      if (contact.telefono) {
        await sendPersonaMessage(
          contact.telefono,
          contact.nombre,
          data.name,
          locationUrl
        );
      }
    }

    res.status(201).json({
      message: "Se ha identificado el código",
      success: true,
      data: data,
    });
  } else {
    res.status(501).json({
      message: "Hubo un error al enviar alguna notificación",
      success: false,
    });
  }
};

const sendPetNotification = async (req, res) => {
  const { code_request, latitude, longitude } = req.query;
  const data = await QR.findPetByCode(code_request);

  if (data) {
    const contacts = await QR.findUserContact(data.id);
    console.log("🚀 ~ sendPetNotification ~ contacts:", contacts)
    const locationUrl = `https://maps.google.com/?q=${latitude},${longitude}`;

    let telefonos = [
      { nombre: contacts.nombre1, telefono: contacts.telefono1 },
      { nombre: contacts.nombre2, telefono: contacts.telefono2 },
      { nombre: contacts.nombre3, telefono: contacts.telefono3 },
    ];

    for (let contact of telefonos) {
      if (contact.telefono) {
        await sendPetMessage(
          contact.telefono,
          contact.nombre,
          data.nombre,
          locationUrl
        );
      }
    }

    res.status(201).json({
      message: "Se ha identificado el código",
      success: true,
      data: data,
    });
  } else {
    res.status(501).json({
      message: "Hubo un error al enviar alguna notificación",
      success: false,
    });
  }
};

const sendWelcomeMessagesToAll = async (req, res) => {
  try {
    const users = await db.query("SELECT phone FROM users");
    const contacts = await db.query(
      "SELECT telefono1, telefono2, telefono3 FROM contactos"
    );

    const phoneNumbers = new Set();

    users.rows.forEach((user) => {
      if (user.phone) {
        phoneNumbers.add(user.phone);
      }
    });

    contacts.rows.forEach((contact) => {
      if (contact.telefono1) {
        phoneNumbers.add(contact.telefono1);
      }
      if (contact.telefono2) {
        phoneNumbers.add(contact.telefono2);
      }
      if (contact.telefono3) {
        phoneNumbers.add(contact.telefono3);
      }
    });

    for (let phone of phoneNumbers) {
      if (phone) {
        await sendTemplateMessage(phone);
        await sleep(200);
      }
    }
    console.log("🚀 ~ sendWelcomeMessagesToAll ~ phoneNumbers:", phoneNumbers);

    res.status(200).json({
      message: "Welcome messages sent",
      success: true,
      phones: phoneNumbers,
    });
  } catch (error) {
    console.error("Error sending welcome messages:", error);
    res.status(500).json({
      message: "Error sending welcome messages",
      success: false,
    });
  }
};

const sendTemplateMessage = async (to) => {
  try {
    const message = await client.messages.create({
      from: TWILIO_PHONE_NUMBER, // Use a regular phone number for SMS
      to: to, // No need for `whatsapp:` prefix
      body: "Welcome to our service! We're glad to have you.",
    });
    console.log(`Template message sent to ${to}:`, message.sid);
  } catch (error) {
    console.error(`Error sending template message to ${to}:`, error.message);
  }
};

// const sendDailyMessage = async (to) => {
//   try {
//     const message = await client.messages.create({
//       from: TWILIO_PHONE_NUMBER, // Use a regular phone number for SMS
//       to: to, // No need for `whatsapp:` prefix
//       body: "This is your daily message. Have a great day!",
//     });
//     console.log("Message sent:", message.sid);
//   } catch (error) {
//     console.error("Error sending message:", error.message);
//   }
// };

module.exports = {
  sendNotification,
  sendPetNotification,
  sendWelcomeMessagesToAll,
  sendTemplateMessage,
};
