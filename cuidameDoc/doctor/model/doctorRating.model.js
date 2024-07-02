class UserRating {
    constructor(id, rater_user_id, rated_doctor_id, rating, created_at, updated_at) {
      this.id = id;
      this.rater_user_id = rater_user_id;
      this.rated_doctor_id = rated_doctor_id;
      this.rating = rating;
      this.created_at = created_at;
      this.updated_at = updated_at;
    }
  }
  
  module.exports = UserRating;
  