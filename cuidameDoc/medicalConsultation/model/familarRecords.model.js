class FamiliarRecords {
    constructor(id, medical_consult_id, relative, diagnostic, records, hemorrhagic, thrombotic, oncological) {
      this.id = id;
      this.medical_consult_id = medical_consult_id;
      this.relative = relative;
      this.diagnostic = diagnostic;
      this.records = records;
      this.hemorrhagic = hemorrhagic;
      this.thrombotic = thrombotic;
      this.oncological = oncological;
    }
  }
  
  module.exports = FamiliarRecords;
  