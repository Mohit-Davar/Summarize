const express = require("express");
const router = express.Router();
const { pdfUpload } = require("../controllers/file.controller");
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post("/upload", upload.single('file'), pdfUpload);

module.exports = router;