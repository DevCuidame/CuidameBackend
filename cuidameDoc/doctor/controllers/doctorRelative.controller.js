// controllers/DoctorRelativeController.js
const doctorRelativeService = require('../../services/DoctorRelativeService');

exports.createDoctorRelative = async (req, res) => {
    try {
        const { doctor_id, relative_id, service_id } = req.body;
        const newDoctorRelative = await doctorRelativeService.createDoctorRelative(doctor_id, relative_id, service_id);
        res.status(200).json({ message: "Doctor-relative relationship created successfully!", newDoctorRelative, success: true });
    } catch (error) {
        res.status(400).json({ message: "Error creating doctor-relative relationship.", error: error.message, success: false });
    }
};

exports.getDoctorRelative = async (req, res) => {
    try {
        const doctorRelative = await doctorRelativeService.getDoctorRelative(req.params.id);
        if (!doctorRelative) {
            return res.status(404).json({ message: "Doctor-relative relationship not found" });
        }
        res.json(doctorRelative);
    } catch (error) {
        res.status(400).json({ message: "Error fetching doctor-relative relationship.", error: error.message });
    }
};

exports.getAllDoctorRelatives = async (req, res) => {
    try {
        const doctorRelatives = await doctorRelativeService.getAllDoctorRelatives();
        res.json(doctorRelatives);
    } catch (error) {
        res.status(400).json({ message: "Error fetching doctor-relative relationships.", error: error.message });
    }
};

exports.updateDoctorRelative = async (req, res) => {
    try {
        const { doctor_id, relative_id, service_id } = req.body;
        const updatedDoctorRelative = await doctorRelativeService.updateDoctorRelative(req.params.id, doctor_id, relative_id, service_id);
        res.json(updatedDoctorRelative);
    } catch (error) {
        res.status(400).json({ message: "Error updating doctor-relative relationship.", error: error.message });
    }
};

exports.deleteDoctorRelative = async (req, res) => {
    try {
        await doctorRelativeService.deleteDoctorRelative(req.params.id);
        res.json({ message: "Doctor-relative relationship deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting doctor-relative relationship.", error: error.message });
    }
};
