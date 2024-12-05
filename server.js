require("dotenv").config();
const express = require("express");
const http = require("http");
const logger = require("morgan");
const cors = require("cors");
const passport = require("passport");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const path = require("path");
const bodyParser = require("body-parser");
const Keys = require("./config/keys");
const upload = require('./middlewares/upload');
const uploadVaccine = require('./middlewares/uploadVaccine');
const users = require("./routes/usersRoutes");
const routerApi = require("./routes/index");
const cron = require("node-cron");
const reminderService = require("./Cuidame/patient/services/relative/reminder.service");

const app = express();
const server = http.createServer(app);
const port = process.env.PORT || 3000;

// app.use(helmet());
// app.use(xss());

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(logger("dev"));

const corsOptions = {
  origin: '*',
};
app.use(cors(corsOptions));

// Ejecutar cada minuto para verificar recordatorios pendientes
cron.schedule("* * * * *", async () => {
  await reminderService.checkAndSendNotifications();
});

app.use(cookieParser(Keys.secretOrKey));
app.use(session({
  secret: Keys.secretOrKey,
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

app.use('/home/developer/uploads/pets/', express.static('/home/developer/uploads/pets/'));
app.use('/home/developer/uploads/person/', express.static('/home/developer/uploads/person/'));
app.use('/home/developer/uploads/resources/', express.static('/home/developer/uploads/resources/'));
app.use('/home/developer/uploads/MedicineControl/', express.static('/home/developer/uploads/MedicineControl/'));

const staticFolderPath = path.join(__dirname, 'uploads/pets/');
const staticFolderResourcesPath = path.join(__dirname, 'uploads/resources/');
const staticFolderPathPerson = path.join(__dirname, 'uploads/person/');
const staticFolderPathMedicine = path.join(__dirname, 'uploads/MedicineControl/');

app.use('/uploads/pets/', express.static(staticFolderPath));
app.use('/uploads/person/', express.static(staticFolderPathPerson));
app.use('/uploads/resources/', express.static(staticFolderResourcesPath));
app.use('/uploads/MedicineControl/', express.static(staticFolderPathMedicine));


require("./config/passport")(passport);

app.disable("x-powered-by");

app.set("port", port);

users(app, upload, uploadVaccine);
routerApi(app);

server.listen(app.get("port"), function () {
  console.log(`Aplicacion de NodeJS ${port} Iniciada...`);
});

app.get("/", (req, res) => {
  res.send("Ruta raiz del backend para SMARTHEALTH");
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).send(err.message);
});
