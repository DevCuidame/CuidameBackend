const db = require("../../config/config");

const Medicament = {};

Medicament.add = (info) => {
  const sql = `
        INSERT INTO 
        petsTreatment(
                pet_id,
                typeTreatment,
                name,
                status,
                startDate,
                endDate,
                frequency
            )   
        VALUES($1, $2, $3, $4, $5, $6, $7)
        `;

  return db.oneOrNone(sql, [
    info.pet_id,
    info.typeTreatment,
    info.name,
    info.status,
    info.startDate,
    info.endDate,
    info.frequency,
  ]);
};

Medicament.update = (info) => {
  const sql = `
      UPDATE 
      petsTreatment
      SET
        name = $2,
        typeTreatment = $3,
        status = $4,
        startDate = $5,
        endDate = $6,
        frequency = $7
      WHERE 
          id = $1
          `;

  return db.oneOrNone(sql, [
    info.id,
    info.name,
    info.typetreatment,
    info.status,
    info.startdate,
    info.enddate,
    info.frequency,
  ]);
};

Medicament.read = (id) => {
  const sql = `
    SELECT 
          *
    FROM
    petsTreatment 
    WHERE 
    pet_id = $1`;

  return db.manyOrNone(sql, id);
};

Medicament.readById = (id) => {
  const sql = `
    SELECT 
          *
    FROM
    petsTreatment 
    WHERE 
    id = $1`;

  return db.oneOrNone(sql, id);
};

Medicament.delete = (id) => {
  const sql = `
      DELETE
      FROM 
      petsTreatment 
      WHERE 
          id = $1
          `;

  return db.oneOrNone(sql, id);
};

module.exports = Medicament;
