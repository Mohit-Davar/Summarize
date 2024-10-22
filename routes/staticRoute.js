const express = require("express")
const router = express.Router()
const { displayHome } = require("../controllers/handleStatic")

router.route("/")
    .get(displayHome)

module.exports = router