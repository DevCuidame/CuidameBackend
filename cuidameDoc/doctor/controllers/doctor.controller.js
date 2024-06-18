const doctorService = require('../services/doctor.service');

exports.createDoctor = async (req, res) => {
    try {
        const { first_name, last_name, identification_type, identification_number, city_id, address, phone, medical_record, medical_specialist, landline_phone, note, rating } = req.body;
        const newDoctor = await doctorService.createDoctor(first_name, last_name, identification_type, identification_number, city_id, address, phone, medical_record, medical_specialist, landline_phone, note, rating);
        res.status(200).json({ mensaje: "¡Doctor creado exitosamente!", nuevoDoctor: newDoctor, exito: true });
    } catch (error) {
        res.status(400).json({ mensaje: "Error al crear doctor.", error: error.message, exito: false });
    }
};

exports.getDoctor = async (req, res) => {
    try {
        const doctor = await doctorService.getDoctor(req.params.id);
        if (!doctor) {
            return res.status(404).json({ mensaje: "Doctor no encontrado" });
        }
        res.json(doctor);
    } catch (error) {
        res.status(400).json({ mensaje: "Error al obtener doctor.", error: error.message });
    }
};

exports.getAllDoctors = async (req, res) => {
    try {
        const doctors = await doctorService.getAllDoctors();
        res.json(doctors);
    } catch (error) {
        res.status(400).json({ mensaje: "Error al obtener doctores.", error: error.message });
    }
};

exports.updateDoctor = async (req, res) => {
    try {
        const { first_name, last_name, identification_type, identification_number, city_id, address, phone, medical_record, medical_specialist, landline_phone, note, rating } = req.body;
        const updatedDoctor = await doctorService.updateDoctor(req.params.id, first_name, last_name, identification_type, identification_number, city_id, address, phone, medical_record, medical_specialist, landline_phone, note, rating);
        res.json(updatedDoctor);
    } catch (error) {
        res.status(400).json({ mensaje: "Error al actualizar doctor.", error: error.message });
    }
};

exports.deleteDoctor = async (req, res) => {
    try {
        await doctorService.deleteDoctor(req.params.id);
        res.json({ mensaje: "¡Doctor eliminado exitosamente!" });
    } catch (error) {
        res.status(500).json({ mensaje: "Error al eliminar doctor.", error: error.message });
    }
};
