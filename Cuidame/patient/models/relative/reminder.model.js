class Reminder {
    constructor(id, medication_id, reminder_datetime, message, created_at) {
      this.id = id;
      this.medication_id = medication_id;
      this.reminder_datetime = reminder_datetime;
      this.message = message;
      this.created_at = created_at;
    }
  }
  
  module.exports = Reminder;
  