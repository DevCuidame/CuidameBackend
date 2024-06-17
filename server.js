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
const xss = require('xss-clean');
const helmet = require('helmet');
const csrf = require('csurf');
const Keys = require("./config/keys");
const upload = require('./middlewares/upload');
const uploadVaccine = require('./middlewares/uploadVaccine');
const users = require("./routes/usersRoutes");
const routerApi = require("./routes/index");

const app = express();
const server = http.createServer(app);
const port = process.env.PORT || 3000;

app.use(helmet());
app.use(xss());

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(logger("dev"));

const corsOptions = {
  origin: '*',
};
app.use(cors(corsOptions));

app.use(cookieParser(Keys.secretOrKey));
app.use(session({
  secret: Keys.secretOrKey,
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

const staticFolderPath = path.join(__dirname, 'uploads/pets/');
const staticFolderPathPerson = path.join(__dirname, 'uploads/person/');
const staticFolderResourcesPath = path.join(__dirname, 'uploads/resources/');
app.use('/uploads/pets/', express.static(staticFolderPath));
app.use('/uploads/person/', express.static(staticFolderPathPerson));
app.use('/uploads/resources/', express.static(staticFolderResourcesPath));

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
