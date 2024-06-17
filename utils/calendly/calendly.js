const express = require('express');
const axios = require('axios');

const router = express.Router();

const calendlyAPI = axios.create({
  baseURL: 'https://api.calendly.com',
  headers: {
    'Authorization': `Bearer ${process.env.CALENDLY_API_TOKEN}`,
    'Content-Type': 'application/json',
  },
});

router.get('/user', async (req, res) => {
  try {
    const response = await calendlyAPI.get('/users/me');
    res.json(response.data);
  } catch (error) {
    console.error('Error al obtener la información del usuario:', error.response.data);
    res.status(500).send('Error al obtener la información del usuario');
  }
});

router.get('/events', async (req, res) => {
  try {
    const response = await calendlyAPI.get('/scheduled_events');
    res.json(response.data.collection);
  } catch (error) {
    console.error('Error al listar los eventos programados:', error.response.data);
    res.status(500).send('Error al listar los eventos programados');
  }
});

router.post('/schedule', async (req, res) => {
  const { event_type, invitee_email, start_time, end_time } = req.body;
  try {
    const response = await calendlyAPI.post('/scheduled_events', {
      event: {
        event_type,
        start_time,
        end_time,
        invitees: [{ email: invitee_email }]
      }
    });
    res.json(response.data);
  } catch (error) {
    console.error('Error al agendar la cita:', error.response.data);
    res.status(500).send('Error al agendar la cita');
  }
});

router.post('/cancel', async (req, res) => {
  const { event_id } = req.body;
  try {
    const response = await calendlyAPI.post(`/scheduled_events/${event_id}/cancellation`);
    res.json(response.data);
  } catch (error) {
    console.error('Error al cancelar la cita:', error.response.data);
    res.status(500).send('Error al cancelar la cita');
  }
});

module.exports = router;
