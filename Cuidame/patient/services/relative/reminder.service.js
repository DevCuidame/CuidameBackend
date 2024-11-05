// path: src/services/reminder.service.js
const reminderRepository = require('../../repositories/relative/reminder.repository');

exports.createReminder = async (data) => {
  return reminderRepository.createReminder(data);
};

exports.getReminder = async (id) => {
  return reminderRepository.getReminder(id);
};

exports.getAllReminders = async () => {
  return reminderRepository.getAllReminders();
};

exports.updateReminder = async (id, data) => {
  return reminderRepository.updateReminder(id, data);
};

exports.deleteReminder = async (id) => {
  return reminderRepository.deleteReminder(id);
};


// // services/relative/reminder.service.js
// const nodemailer = require("nodemailer");
// const db = require("../../models");

// const sendNotification = async (reminder) => {
//   const transporter = nodemailer.createTransport({
//     service: "gmail", // Aquí configuras tu servicio SMTP
//     auth: {
//       user: process.env.EMAIL_USER,
//       pass: process.env.EMAIL_PASS,
//     },
//   });

//   const mailOptions = {
//     from: process.env.EMAIL_USER,
//     to: "paciente@example.com", // Aquí debes colocar el email del paciente o responsable
//     subject: "Recordatorio de Medicamento",
//     text: `Este es un recordatorio para tomar el medicamento: ${reminder.message}`,
//   };

//   try {
//     await transporter.sendMail(mailOptions);
//     console.log(`Notificación enviada para el recordatorio ${reminder.id}`);
//   } catch (error) {
//     console.error("Error enviando la notificación:", error);
//   }
// };

// exports.createReminder = async (medication_id, reminder_datetime, message) => {
//   const newReminder = await db.Reminder.create({
//     medication_id,
//     reminder_datetime,
//     message,
//   });

//   return newReminder;
// };

// exports.getReminder = async (id) => {
//   return await db.Reminder.findByPk(id);
// };

// exports.getAllReminders = async () => {
//   return await db.Reminder.findAll();
// };

// exports.updateReminder = async (id, medication_id, reminder_datetime, message) => {
//   const reminder = await db.Reminder.findByPk(id);
//   if (!reminder) throw new Error("Recordatorio no encontrado");

//   reminder.medication_id = medication_id;
//   reminder.reminder_datetime = reminder_datetime;
//   reminder.message = message;

//   await reminder.save();

//   return reminder;
// };

// exports.deleteReminder = async (id) => {
//   const reminder = await db.Reminder.findByPk(id);
//   if (!reminder) throw new Error("Recordatorio no encontrado");

//   await reminder.destroy();
// };

// // Servicio para manejar notificaciones
// exports.checkAndSendNotifications = async () => {
//   const now = new Date();
//   const reminders = await db.Reminder.findAll({
//     where: {
//       reminder_datetime: {
//         [db.Sequelize.Op.lte]: now, // Recordatorios pasados o actuales
//       },
//       notified: false, // Solo recordatorios que no han sido notificados
//     },
//   });

//   for (const reminder of reminders) {
//     await sendNotification(reminder);
//     reminder.notified = true; // Marcar el recordatorio como notificado
//     await reminder.save();
//   }
// };
