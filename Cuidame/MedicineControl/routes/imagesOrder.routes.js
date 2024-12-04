const express = require("express");
const router = express.Router();
const imageController = require("../controllers/imagesOrder.controller");

router.post("/save", imageController.uploadImage);

module.exports = router;
