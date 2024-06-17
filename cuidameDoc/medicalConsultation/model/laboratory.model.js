class Laboratory {
    constructor(id, medical_consult_id, exam_type, exam, date, result, pathology_report) {
      this.id = id;
      this.medical_consult_id = medical_consult_id;
      this.exam_type = exam_type;
      this.exam = exam;
      this.date = date;
      this.result = result;
      this.pathology_report = pathology_report;
    }
  }
  
  module.exports = Laboratory;
  