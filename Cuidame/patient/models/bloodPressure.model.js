class BloodPressure {
  constructor(id, patient_id, systolic, diastolic, date) {
    this.id = id;
    this.patient_id = patient_id;
    this.systolic = systolic;
    this.diastolic = diastolic;
    this.date = date;
  }
}

module.exports = BloodPressure;
