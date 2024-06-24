const axios = require("axios");
const QR = require("../../models/qr");

const ACCESS_TOKEN = process.env.API_FACEBOOK_TOKEN;
const PHONE_NUMBER_ID = "332324036632647";

const sendMessage = async (to, message, locationUrl) => {
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
        text: message,
      },

      footer: {
        text: "Cuídame Tech",
      },
      action: {
        name: "cta_url",
        parameters: {
          display_text: "Ubicación",
          url: locationUrl,
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
    console.log("Message sent:", response.data);
  } catch (error) {
    console.error("Error sending message:", error.response.data);
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

module.exports = {
  sendNotification,
  sendPetNotification,
};
