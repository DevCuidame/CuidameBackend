const Diagnostic = require("../models/diagnostics");


  async function addDiagnostico(req, res) {
    try {
      const Diagnosticinfo = req.body;
      const DiagnosticId = await Diagnostic.addDiagnostico(Diagnosticinfo);
        
    
      return res.status(201).json({
        success: true,
        message: "Se ha guardado la información de tu Diagnostico correctamente.",
        id: DiagnosticId,
      });
    } catch (error) {
      console.log(error);
      return res.status(400).json({
        success: false,
        message: "Hubo un error con el registro de tu Diagnostico.",
        error: error,
      });
    }
  }


  module.exports = {
    addDiagnostico
  }