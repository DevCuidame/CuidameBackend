const doctorServiceService = require('../services/doctorService.service');

exports.createDoctorService = async (req, res) => {
    try {
        const { name, visit_price, doctor_id, discount } = req.body;
        const newMedicalService = await doctorServiceService.createDoctorService(name, visit_price, doctor_id, discount);
        return res.status(200).json({ message: "Servicio médico creado correctamente", newMedicalService, success: true });
    } catch (error) {
        return res.status(400).json({ message: "Error al crear el servicio médico", error: error.message, success: false });
    }
};

exports.getDoctorService = async (req, res) => {
    try {
        const medicalService = await doctorServiceService.getDoctorService(req.params.id);
        if (!medicalService) {
            return res.status(404).json({ message: "Servicio médico no encontrado", success: true });
        }
        return res.status(200).json({medicalService, success: true});
    } catch (error) {
        return res.status(400).json({ message: "Error al obtener el servicio médico", error: error.message, success: false});
    }
};

exports.getAllDoctorServices = async (req, res) => {
    try {
        const medicalServices = await doctorServiceService.getAllDoctorServices();
        return res.status(200).json({medicalServices, success: true});
    } catch (error) {
        return res.status(400).json({ message: "Error al obtener los servicios médicos", error: error.message, success: false});
    }
};

exports.updateDoctorService = async (req, res) => {
    try {
        const { name, visit_price, doctor_id, discount } = req.body;
        const updatedMedicalService = await doctorServiceService.updateDoctorService(req.params.id, name, visit_price, doctor_id, discount);
        return res.status(200).json({updatedMedicalService, success: true});
    } catch (error) {
        return res.status(400).json({ message: "Error al actualizar el servicio médico", error: error.message, success: false});
    }
};

exports.deleteDoctorService = async (req, res) => {
    try {
        const medicalService = await doctorServiceService.getDoctorService(req.params.id);
        if (!medicalService) {
            return res.status(404).json({ message: "Servicio médico no encontrado", success: false });
        }

        await doctorServiceService.deleteDoctorService(req.params.id);
        return res.status(200).json({ message: "Servicio médico eliminado correctamente", success: true });
    } catch (error) {
        return res.status(500).json({ message: "Error al eliminar el servicio médico", error: error.message, success: false});
    }
};
