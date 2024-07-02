const axios = require("axios");
const QR = require("../../models/qr");
const db = require("../../utils/connection");

const ACCESS_TOKEN = process.env.API_FACEBOOK_TOKEN;
const PHONE_NUMBER_ID = "332324036632647";

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const sendMessage = async (to, message, locationUrl) => {
  const url = `https://graph.facebook.com/v19.0/${PHONE_NUMBER_ID}/messages`;
  const data = {
    messaging_product: "whatsapp",
    to: to,
    type: "template",
    template: {
      name: "reengagement_template",
      language: {
        code: "en_US",
      },
      components: [
        {
          type: "header",
          parameters: [
            {
              type: "text",
              text: "CuídameBot",
            },
          ],
        },
        {
          type: "body",
          parameters: [
            {
              type: "text",
              text: message,
            },
          ],
        },
        {
          type: "button",
          sub_type: "url",
          index: "0",
          parameters: [
            {
              type: "text",
              text: locationUrl,
            },
          ],
        },
      ],
    },
  };

  try {
    const response = await axios.post(url, data, {
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`,
        "Content-Type": "application/json",
      },
    });
    console.log(`Mensaje enviado a ${to}: ${response.status}`);
  } catch (error) {
    console.error(
      `Error al enviar mensaje a ${to}:`,
      error.response?.data || error.message
    );
  }
};

const sendReengagementMessage = async (to, message, locationUrl) => {
  const url = `https://graph.facebook.com/v19.0/${PHONE_NUMBER_ID}/messages`;
  const data = {
    messaging_product: "whatsapp",
    to: to,
    type: "template",
    template: {
      name: "reengagement_template",
      language: {
        code: "en_US",
      },
      components: [
        {
          type: "header",
          parameters: [
            {
              type: "text",
              text: "CuídameBot",
            },
          ],
        },
        {
          type: "body",
          parameters: [
            {
              type: "text",
              text: message,
            },
          ],
        },
        {
          type: "button",
          sub_type: "url",
          index: "0",
          parameters: [
            {
              type: "text",
              text: locationUrl,
            },
          ],
        },
      ],
    },
  };

  try {
    const response = await axios.post(url, data, {
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`,
        "Content-Type": "application/json",
      },
    });
    console.log(`Template message sent to ${to}:`, response.data);
  } catch (error) {
    console.error(
      `Error sending template message to ${to}:`,
      error.response ? error.response.data : error
    );
  }
};

const sendNotification = async (req, res) => {
  const { code_request, latitude, longitude, objeto, mascota } = req.query;
  const data = await QR.getByCode(code_request);

  if (data) {
    const contacts = await QR.findContacts(data.id);
    const mensajeEspanol = objeto
      ? `${data.name}, tú código QR ha sido escaneado en tu objeto: ${objeto}.`
      : mascota
      ? `${data.name}, tú código QR en tu mascota, ${mascota} ha sido escaneado!`
      : `${data.name}, el código QR ha sido escaneado.`;

    const locationUrl = `https://maps.google.com/?q=${latitude},${longitude}`;
    const mensaje = `${mensajeEspanol} Toca para mirar la ubicación`;
    let telefonos = Object.values(contacts);

    for (let telefono of telefonos) {
      if (telefono) {
        await sendMessage(`57${telefono}`, mensaje, locationUrl);
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
  const { code_request, latitude, longitude, objeto, mascota } = req.query;
  const data = await QR.findPetByCode(code_request);

  if (data) {
    const contacts = await QR.findUserContact(data.id);
    const mensajeEspanol = objeto
      ? `${data.name}, tú código QR ha sido escaneado en tu objeto: ${objeto}.`
      : mascota
      ? `${data.name}, el código QR de tu mascota, *${mascota}*, ha sido escaneado!`
      : `${data.name}, el código QR ha sido escaneado.`;

    const locationUrl = `https://maps.google.com/?q=${latitude},${longitude}`;
    const mensaje = `${mensajeEspanol} Toca para mirar la ubicación`;

    let telefonos = Object.values(contacts);

    for (let telefono of telefonos) {
      if (telefono) {
        await sendMessage(`57${telefono}`, mensaje, locationUrl);
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

const sendWelcomeMessage = async (to) => {
  const url = `https://graph.facebook.com/v19.0/${PHONE_NUMBER_ID}/messages`;
  const data = {
    messaging_product: "whatsapp",
    recipient_type: "individual",
    to: to,
    type: "interactive",
    interactive: {
      type: "cta_url",

      header: {
        type: "text",
        text: "CuídameBot",
      },

      body: {
        text: "Hola 👋 Gracias por conectar con nosotros. Por favor, te invitamos a seguir nuestra página de Instagram para las últimas actualizaciones. ",
      },

      footer: {
        text: "Cuídame Tech",
      },
      action: {
        name: "cta_url",
        parameters: {
          display_text: "Instagram",
          url: "https://www.instagram.com/cuidame.tech/",
        },
      },
    },
  };

  try {
    const response = await axios.post(url, data, {
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`,
        "Content-Type": "application/json",
      },
    });
    console.log("Welcome message sent:", response.data);
  } catch (error) {
    console.error("Error sending welcome message:", error.response.data);
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
        await sendTemplateMessage(`57${phone}`);
        // await sendDailyMessage(`57${phone}`);
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
  const url = `https://graph.facebook.com/v19.0/${PHONE_NUMBER_ID}/messages`;
  const data = {
    messaging_product: "whatsapp",
    to: to,
    type: "template",
    template: {
      name: "instagram",
      language: {
        code: "en_US",
      },
      components: [
        {
          type: "header",
          parameters: [
            {
              type: "image",
              image: {
                link: "https://cuidame.tech/wp-content/uploads/2023/02/NEON-2048x1536.png",
              },
            },
          ],
        },
      ],
    },
  };

  try {
    const response = await axios.post(url, data, {
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`,
        "Content-Type": "application/json",
      },
    });
    console.log(`Template message sent to ${to}:`, response.data);
  } catch (error) {
    console.error(
      `Error sending template message to ${to}:`,
      error.response ? error.response.data : error
    );
  }
};

const sendDailyMessage = async (to) => {
  const url = `https://graph.facebook.com/v19.0/${PHONE_NUMBER_ID}/messages`;
  const data = {
    messaging_product: "whatsapp",
    to: to,
    type: "template",
    template: {
      name: "daily_message",
      language: {
        code: "en",
      },
    },
  };

  try {
    const response = await axios.post(url, data, {
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`,
        "Content-Type": "application/json",
      },
    });
    console.log("Message sent:", response.data);
  } catch (error) {
    console.error("Error sending message:", error.response.data);
  }
};

module.exports = {
  sendNotification,
  sendPetNotification,
  sendWelcomeMessagesToAll,
  sendTemplateMessage,
};
