class Appointments {
    constructor(id, user_id, doctor_id, calendly_event_id, start_time, end_time, status, created_at, updated_at) {
      this.id = id;
      this.user_id = user_id;
      this.doctor_id = doctor_id;
      this.calendly_event_id = calendly_event_id;
      this.start_time = start_time;
      this.end_time = end_time;
      this.status = status;
      this.created_at = created_at;
      this.updated_at = updated_at;
    }
  }
  
  module.exports = Appointments;
  