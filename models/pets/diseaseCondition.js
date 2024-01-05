const db = require("../../config/config");

const DiseaseCondition = {};

DiseaseCondition.add = (info) => {
  const sql = `
        INSERT INTO 
             petsDiseaseCondition(
                pet_id,
                typeDiseaseCondition,
                name,
                diagnosticDate,
                status,
                description
            )   
        VALUES($1, $2, $3, $4, $5, $6)
        `;

  return db.oneOrNone(sql, [
    info.pet_id,
    info.typeDiseaseCondition,
    info.name,
    info.diagnosticDate,
    info.status,
    info.description,
  ]);
};

DiseaseCondition.update = (info) => {
  const sql = `
      UPDATE 
          petsDiseaseCondition
      SET
      typeDiseaseCondition = $2,
      name = $3,
        diagnosticDate = $4,
        status = $5,
        description = $6
      WHERE 
          id = $1
          `;

  return db.oneOrNone(sql, [
    info.id,
    info.typediseasecondition,
    info.name,
    info.diagnosticdate,
    info.status,
    info.description,
  ]);
};

DiseaseCondition.read = (id) => {
  const sql = `
    SELECT 
          *
    FROM
          petsDiseaseCondition 
    WHERE 
    pet_id = $1`;

  return db.manyOrNone(sql, id);
};

DiseaseCondition.readById = (id) => {
  const sql = `
    SELECT 
          *
    FROM
          petsDiseaseCondition 
    WHERE 
    id = $1`;

  return db.oneOrNone(sql, id);
};

DiseaseCondition.delete = (id) => {
    const sql = `
      DELETE
      FROM 
          petsDiseaseCondition 
      WHERE 
          id = $1
          `;
  
    return db.oneOrNone(sql, id);
  }

module.exports = DiseaseCondition;
