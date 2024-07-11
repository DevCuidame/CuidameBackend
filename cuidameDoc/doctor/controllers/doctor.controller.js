const { buildImage } = require('../../../utils/image.handler');
const doctorService = require('../services/doctor.service');


exports.createDoctor = async (req, res) => {
    const { nanoid } = await import("nanoid");
    try {
        const {
            first_name, last_name, identification_type, identification_number,
            city_id, address, phone, medical_record, medical_specialist,
            landline_phone, note, rating, pub_name, file_bs64, name
        } = req.body;

        const exists = await doctorService.getDoctorByCard(identification_number);
        if (exists) {
            return res.status(400).json({ message: "¡Error al crear doctor!", success: false });
        }

        const priv_name = `DOCTOR_${first_name}_${nanoid(20)}`;

        try {
            await buildImage(priv_name, name, file_bs64);
        } catch (error) {
            return res.status(400).json({ message: "Error al guardar la imagen.", error: error.message, success: false });
        }

        const newDoctor = await doctorService.createDoctor(
            first_name, last_name, identification_type, identification_number,
            city_id, address, phone, medical_record, medical_specialist,
            landline_phone, note, rating, pub_name, priv_name, file_bs64
        );
        res.status(200).json({ message: "¡Doctor creado exitosamente!", newDoctor, success: true });
    } catch (error) {
        res.status(400).json({ message: "Error al crear doctor.", error: error.message, success: false });
    }
};


exports.updateDoctor = async (req, res) => {
    try {
        const {
            first_name, last_name, identification_type, identification_number,
            city_id, address, phone, medical_record, medical_specialist,
            landline_phone, note, rating, pub_name, file_bs64, name
        } = req.body;

        // Obtener el doctor actual
        const currentDoctor = await doctorService.getDoctor(req.params.id);
        if (!currentDoctor) {
            return res.status(404).json({ message: "Doctor no encontrado.", success: false });
        }

        // Verificar si la imagen ha cambiado
        let priv_name = currentDoctor.priv_name;
        if (file_bs64 && file_bs64 !== currentDoctor.file_bs64) {
            // Eliminar la imagen anterior si existe
            if (currentDoctor.priv_name) {
                await deleteImage(`./uploads/person/${name}/${currentDoctor.priv_name}`);
            }

            const uniqueName = `DOCTOR_${first_name}_${nanoid(20)}`;
            try {
                priv_name = await buildImage(uniqueName, name, file_bs64);
            } catch (error) {
                return res.status(500).json({ message: "Error al construir la imagen.", error: error.message, success: false });
            }
        }

        // Actualizar los campos del doctor
        const updatedDoctor = await doctorService.updateDoctor(
            req.params.id, first_name, last_name, identification_type,
            identification_number, city_id, address, phone, medical_record,
            medical_specialist, landline_phone, note, rating, pub_name, priv_name, file_bs64
        );

        return res.status(200).json({ updatedDoctor, success: true });
    } catch (error) {
        res.status(400).json({ message: "Error al actualizar doctor.", error: error.message, success: false });
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
