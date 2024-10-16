const { pdfToText } = require("../services/pdf-parse")
const axios = require('axios');

const handleUpload = (req, res) => {
    pdfToText(`./public/Data/${req.file.filename}`)
    axios.post('/user', {})
        .then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        });
    res.redirect("upload/")
}
module.exports = {
    handleUpload
}