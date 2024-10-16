// Acquiring Express 
const express = require("express")
const router = express.Router()
const upload = require("../services/multer")
const { handleUpload } = require("../controllers/handleUpload")

router.route("/upload")
    .get((req, res) => {
        res.render('input')
    })
    .post(upload.single("file-upload"), handleUpload)


module.exports = router