const axios = require('axios');

const API_TOKEN = 'eyJraWQiOiIxY2UxZTEzNjE3ZGNmNzY2YjNjZWJjY2Y4ZGM1YmFmYThhNjVlNjg0MDIzZjdjMzJiZTgzNDliMjM4MDEzNWI0IiwidHlwIjoiUEFUIiwiYWxnIjoiRVMyNTYifQ.eyJpc3MiOiJodHRwczovL2F1dGguY2FsZW5kbHkuY29tIiwiaWF0IjoxNzE2Mzg2MzcyLCJqdGkiOiIyY2JjMzVmMi0yZTZkLTQ4NjgtOTZhMi0yYjA4NWE2YTI3NmIiLCJ1c2VyX3V1aWQiOiI1YjdlN2JlZi05NWE0LTQ2MjAtYTRjNC00ZGM0YjNiOTc1ZmMifQ.YUlnDtA8i8gsyne2i389_AwSraO6VZtPX9wiY5p2GfEaqa0zSTnqJCuuEkcRH-BmVWtycb2JM0rdT8j67dCOHQ';

const calendlyAPI = axios.create({
  baseURL: 'https://api.calendly.com',
  headers: {
    'Authorization': `Bearer ${API_TOKEN}`,
    'Content-Type': 'application/json',
  },
});

async function getUserInfo() {
  try {
    const response = await calendlyAPI.get('/users/me');
    console.log(response.data);
  } catch (error) {
    console.error('Error al obtener la información del usuario:', error.response.data);
  }
}

async function listScheduledEvents() {
  try {
    const response = await calendlyAPI.get('/scheduled_events');
    console.log(response.data.collection);
  } catch (error) {
    console.error('Error al listar los eventos programados:', error.response.data);
  }
}

// getUserInfo();
// listScheduledEvents();
