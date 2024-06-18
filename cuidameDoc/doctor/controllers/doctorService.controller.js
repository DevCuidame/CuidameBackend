const doctorServiceService = require('../services/doctorService.service');

exports.crearServicioMedico = async (req, res) => {
    try {
        const { nombre, precio_visita, doctor_id, descuento } = req.body;
        const nuevoServicioMedico = await doctorServiceService.crearServicioMedico(nombre, precio_visita, doctor_id, descuento);
        res.status(200).json({ mensaje: "Servicio médico creado correctamente", nuevoServicioMedico, success: true });
    } catch (error) {
        res.status(400).json({ mensaje: "Error al crear el servicio médico", error: error.message, success: false });
    }
};

exports.obtenerServicioMedico = async (req, res) => {
    try {
        const servicioMedico = await doctorServiceService.obtenerServicioMedico(req.params.id);
        if (!servicioMedico) {
            return res.status(404).json({ mensaje: "Servicio médico no encontrado" });
        }
        res.json(servicioMedico);
    } catch (error) {
        res.status(400).json({ mensaje: "Error al obtener el servicio médico", error: error.message });
    }
};

exports.obtenerTodosLosServiciosMedicos = async (req, res) => {
    try {
        const serviciosMedicos = await doctorServiceService.obtenerTodosLosServiciosMedicos();
        res.json(serviciosMedicos);
    } catch (error) {
        res.status(400).json({ mensaje: "Error al obtener los servicios médicos", error: error.message });
    }
};

exports.actualizarServicioMedico = async (req, res) => {
    try {
        const { nombre, precio_visita, doctor_id, descuento } = req.body;
        const servicioMedicoActualizado = await doctorServiceService.actualizarServicioMedico(req.params.id, nombre, precio_visita, doctor_id, descuento);
        res.json(servicioMedicoActualizado);
    } catch (error) {
        res.status(400).json({ mensaje: "Error al actualizar el servicio médico", error: error.message });
    }
};

exports.eliminarServicioMedico = async (req, res) => {
    try {
        await doctorServiceService.eliminarServicioMedico(req.params.id);
        res.json({ mensaje: "Servicio médico eliminado correctamente" });
    } catch (error) {
        res.status(500).json({ mensaje: "Error al eliminar el servicio médico", error: error.message });
    }
};
