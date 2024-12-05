const express = require("express");
const router = express.Router();
const imageController = require("../../controllers/relative/imagesOrder.controller");

router.get("/:id", imageController.getImageById);
router.post("/save", imageController.uploadImage);

module.exports = router;
