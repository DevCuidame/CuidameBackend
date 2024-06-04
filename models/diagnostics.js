const db = require("../config/config");
const { oneOrNone } = require("../config/config");

const Diagnostic = {};


Diagnostic.addDiagnostico = ({idPaciente, nombre, fecha, hora, dato}) => {
    const sql = `
      INSERT INTO 
          diagnositicos(
            id_paciente,
            nombre,
            fecha,
            hora,
            dato
          )   
      VALUES($1, $2, $3, $4, $5) RETURNING id
      `;

    return db.oneOrNone(sql, [idPaciente, nombre, fecha, hora, dato]);
};


module.exports = Diagnostic;