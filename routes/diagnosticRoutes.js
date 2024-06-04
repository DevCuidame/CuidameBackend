const DiagnosticController = require("../controllers/diagController");
const passport = require("passport");

module.exports = (app) => {
    app.post(
      "/api/diagnostcs/add",
      //passport.authenticate("jwt", { session: false }),
      DiagnosticController.addDiagnostico
    );
}