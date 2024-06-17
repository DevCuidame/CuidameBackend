class GynecoObstetrics {
    constructor(id, medical_consult_id, births, abortions, cesarean, gestations, menstrual_cycles, family_planning) {
      this.id = id;
      this.medical_consult_id = medical_consult_id;
      this.births = births;
      this.abortions = abortions;
      this.cesarean = cesarean;
      this.gestations = gestations;
      this.menstrual_cycles = menstrual_cycles;
      this.family_planning = family_planning;
    }
  }
  
  module.exports = GynecoObstetrics;
  