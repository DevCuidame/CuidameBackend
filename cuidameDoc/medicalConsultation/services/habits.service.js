// services/HabitsService.js
const habitsRepository = require('../repositories/habits.repository');

exports.createHabits = async (medical_consult_id, smoke, liquor, other) => {
  return habitsRepository.createHabits(medical_consult_id, smoke, liquor, other);
};

exports.getHabits = async (id) => {
  return habitsRepository.getHabits(id);
};

exports.getAllHabits = async () => {
  return habitsRepository.getAllHabits();
};

exports.updateHabits = async (id, medical_consult_id, smoke, liquor, other) => {
  return habitsRepository.updateHabits(id, medical_consult_id, smoke, liquor, other);
};

exports.deleteHabits = async (id) => {
  return habitsRepository.deleteHabits(id);
};
