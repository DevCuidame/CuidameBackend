const db = require("../../config/config");

const Veterinarian = {};

Veterinarian.add = (info) => {
  const sql = `
        INSERT INTO 
             petsVeterinarian(
                pet_id,
                fullName,
                idType,
                idNumber,
                phone,
                city_id,
                address,
                email
            )   
        VALUES($1, $2, $3, $4, $5, $6, $7, $8)
        `;

  return db.oneOrNone(sql, [
    info.pet_id,
    info.fullName,
    info.idType,
    info.idNumber,
    info.phone,
    info.city_id,
    info.address,
    info.email,
  ]);
};

Veterinarian.update = (info) => {
  const sql = `
      UPDATE 
          petsVeterinarian
      SET
        fullname = $2,
        idtype = $3,
        idnumber = $4,
        phone = $5,
        city_id = $6,
        address = $7,
        email = $8
      WHERE 
          id = $1
          `;

  return db.oneOrNone(sql, [
    info.id,
    info.fullname,
    info.idtype,
    info.idnumber,
    info.phone,
    info.city_id,
    info.address,
    info.email,
  ]);
};

Veterinarian.read = (id) => {
  const sql = `
  SELECT
  u.*,
  t.name as city,
  d.name as department
FROM petsVeterinarian AS u
  INNER JOIN townships AS t ON u.city_id = t.id
  INNER JOIN departments AS d ON t.department_id = d.id
WHERE u.pet_id = $1;`;

  return db.manyOrNone(sql, id);
};

Veterinarian.getBathroomHairdresser = () => {
  const sql = `
    SELECT 
          u.*,
          d.name as department, t.name as city
    FROM
    bathroomHairdresser as u
    INNER JOIN townships AS t ON u.city_id = t.id
    INNER JOIN departments AS d ON t.department_id = d.id`;

  return db.manyOrNone(sql);
};

Veterinarian.getHotelNursery = () => {
  const sql = `
    SELECT 
          u.*,
          d.name as department, t.name as city
    FROM
    hotelNursery as u
    INNER JOIN townships AS t ON u.city_id = t.id
    INNER JOIN departments AS d ON t.department_id = d.id`;

  return db.manyOrNone(sql);
};

Veterinarian.getWellnessSpa = () => {
  const sql = `
    SELECT 
          u.*,
          d.name as department, t.name as city
    FROM
    wellnessSpa as u
    INNER JOIN townships AS t ON u.city_id = t.id
    INNER JOIN departments AS d ON t.department_id = d.id`;

  return db.manyOrNone(sql);
};


Veterinarian.database = () => {
  const sql = `
  SELECT 
  u.*,
  d.name as department, t.name as city
  FROM
  veterinarians as u
  INNER JOIN townships AS t ON u.city_id = t.id
  INNER JOIN departments AS d ON t.department_id = d.id`;
  
  return db.manyOrNone(sql);
}
Veterinarian.readById = (id) => {
  const sql = `
    SELECT 
          u.*,
          d.id as department
    FROM
          petsVeterinarian as u
    INNER JOIN townships AS t ON u.city_id = t.id
    INNER JOIN departments AS d ON t.department_id = d.id
    WHERE 
    u.id = $1`;

  return db.oneOrNone(sql, id);
};

Veterinarian.delete = (id) => {
  const sql = `
      DELETE
      FROM 
          petsVeterinarian 
      WHERE 
          id = $1
          `;

  return db.oneOrNone(sql, id);
};

module.exports = Veterinarian;
