const VitalSignals = require("../model/vitalSignals.model");
const VitalSignalsRepository = require("../repositories/vitalSignals.repository");

// Crear señales vitales
exports.createVitalSignals = async (medicalConsultId, weight, size, imc, bloodPressure, heartFrequency, system, bodyArea, symptom, description) => {
    const newVitalSignal = await VitalSignalsRepository.createVitalSignals(medicalConsultId, weight, size, imc, bloodPressure, heartFrequency, system, bodyArea, symptom, description);
    return newVitalSignal;
};

// Obtener una señal vital por ID
exports.getVitalSignalsById = async (id) => {
    const vitalSignal = await VitalSignalsRepository.getVitalSignals(id);
    return vitalSignal;
};

// Obtener todas las señales vitales
exports.getAllVitalSignals = async () => {
    const allVitalSignals = await VitalSignalsRepository.getAllVitalSignals();
    return allVitalSignals;
};

// Actualizar señales vitales
exports.updateVitalSignals = async (id, medicalConsultId, weight, size, imc, bloodPressure, heartFrequency, system, bodyArea, symptom, description) => {
    const updatedVitalSignal = await VitalSignalsRepository.updateVitalSignals(id, medicalConsultId, weight, size, imc, bloodPressure, heartFrequency, system, bodyArea, symptom, description);
    return updatedVitalSignal;
};

// Eliminar señal vital por ID
exports.deleteVitalSignals = async (id) => {
    await VitalSignalsRepository.deleteVitalSignals(id);
};
