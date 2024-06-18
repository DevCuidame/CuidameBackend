const doctorService = require('../services/doctor.service');

exports.createDoctor = async (req, res) => {
    try {
        const { first_name, last_name, identification_type, identification_number, city_id, address, phone, medical_record, medical_specialist, landline_phone, note, rating } = req.body;
        const exits = await doctorService.getDoctorByCard(identification_number) 
        if (exits){
            return res.status(400).json({ message: "¡Error al crear doctor!", success: false });
        }

        const newDoctor = await doctorService.createDoctor(first_name, last_name, identification_type, identification_number, city_id, address, phone, medical_record, medical_specialist, landline_phone, note, rating);
        res.status(200).json({ message: "¡Doctor creado successsamente!", nuevoDoctor: newDoctor, success: true });
    } catch (error) {
        res.status(400).json({ message: "Error al crear doctor.", error: error.message, success: false });
    }
};

exports.getDoctor = async (req, res) => {
    try {
        const doctor = await doctorService.getDoctor(req.params.id);
        if (!doctor) {
            return res.status(404).json({ message: "Doctor no encontrado", success: false });
        }
        return res.status(200).json({doctor, success: true});
    } catch (error) {
        res.status(400).json({ message: "Error al obtener doctor.", error: error.message, success: false});
    }
};

exports.getAllDoctors = async (req, res) => {
    try {
        const doctors = await doctorService.getAllDoctors();

        if(!doctors){
            return res.status(404).json({ message: "Doctores no encontrados", success: false} );
        }

        return res.status(200).json({doctors, success: true});
    } catch (error) {
        res.status(400).json({ message: "Error al obtener doctores.", error: error.message, success: false});
    }
};

exports.updateDoctor = async (req, res) => {
    try {
        const { first_name, last_name, identification_type, identification_number, city_id, address, phone, medical_record, medical_specialist, landline_phone, note, rating } = req.body;
        const updatedDoctor = await doctorService.updateDoctor(req.params.id, first_name, last_name, identification_type, identification_number, city_id, address, phone, medical_record, medical_specialist, landline_phone, note, rating);
        return res.status(200).json({updatedDoctor, success: true});
    } catch (error) {
        res.status(400).json({ message: "Error al actualizar doctor.", error: error.message, success: false});
    }
};

exports.deleteDoctor = async (req, res) => {
    try {
      const id = req.params.id;
      const wasDeleted = await doctorService.deleteDoctor(id);
  
      if (!wasDeleted) {
        return res.status(404).json({ message: "Doctor no encontrado.", success: false });
      }
  
      return res.status(200).json({ message: "¡Doctor eliminado successsamente!", success: true });
    } catch (error) {
      console.error("🚀 ~ Error en deleteDoctor:", error);
      res.status(500).json({ message: "Error al eliminar doctor.", error: error.message, success: false });
    }
  };
