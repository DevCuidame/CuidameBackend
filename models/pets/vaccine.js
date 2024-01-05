const db = require("../../config/config");

const Vaccine = {};

Vaccine.add = (info) => {
  const sql = `
        INSERT INTO 
             petsVaccine(
                pet_id,
                name,
                laboratory,
                startDate,
                nextDate,
                dose,
                photoUrl,
                photoName
            )   
        VALUES($1, $2, $3, $4, $5, $6, $7, $8)
        `;

  return db.oneOrNone(sql, [
    info.pet_id,
    info.name,
    info.laboratory,
    info.startDate,
    info.nextDate,
    info.dose,
    info.photoUrl,
    info.photoName,
  ]);
};

Vaccine.update = (info) => {
  const sql = `
      UPDATE 
          petsVaccine
      SET
        name = $2,
        laboratory = $3,
        startdate = $4,
        nextdate = $5,
        dose = $6,
        photourl = $7,
        photoname = $8
      WHERE 
          id = $1
          `;

  return db.oneOrNone(sql, [
    info.id,
    info.name,
    info.laboratory,
    info.startDate,
    info.nextDate,
    info.dose,
    info.photourl,
    info.photoname,
  ]);
};

Vaccine.read = (id) => {
  const sql = `
    SELECT 
          *
    FROM
          petsVaccine
    WHERE 
    pet_id = $1`;

  return db.manyOrNone(sql, id);
};

Vaccine.readById = (id) => {
  const sql = `
    SELECT 
          *
    FROM
          petsVaccine
    WHERE 
    id = $1`;

  return db.oneOrNone(sql, id);
};

Vaccine.delete = (id) => {
    const sql = `
      DELETE
      FROM 
          petsVaccine
      WHERE 
          id = $1
          `;
  
    return db.oneOrNone(sql, id);
  }

module.exports = Vaccine;
