const pool = require("../utils/connection");

exports.getAll = async () => {
  const query = "SELECT vc.business_name AS clinic_name, CONCAT( vc.vicinity, ', ', t.name, ', ', d.name) as vicinity, ARRAY_AGG(cs.name) AS services FROM veterinary_clinics vc JOIN clinics_services_breakdown csb ON vc.id = csb.veterinary_clinic_id JOIN clinics_services cs ON csb.clinic_service_id = cs.id JOIN townships t ON vc.township = t.id JOIN departments d ON t.department_id = d.id GROUP BY vc.business_name, d.name, t.name, vc.vicinity;"
  const result = await pool.query(query);

  return result.rows;
};

exports.getByService = async (value) => {
  const query =
    "SELECT vc.id, vc.business_name, CONCAT(vc.vicinity, ', ', t.name, ', ', d.name) as vicinity, cs.name AS service_name FROM veterinary_clinics vc JOIN clinics_services_breakdown csb ON vc.id = csb.veterinary_clinic_id JOIN clinics_services cs ON csb.clinic_service_id = cs.id JOIN townships t ON vc.township = t.id JOIN departments d ON t.department_id = d.id WHERE cs.name = $1;";
  const result = await pool.query(query, [value]);

  return result.rows;
};
