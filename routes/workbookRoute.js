const express = require("express")
const router = express.Router()
const upload = require("../services/multer")
const { handleUpload } = require("../controllers/handleUpload")
const { displayInput } = require('../controllers/handleStatic')

router.route("/upload")
    .get(displayInput)
    .post(upload.single("file-upload"), handleUpload)

module.exports = router