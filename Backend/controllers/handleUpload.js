const fs = require('fs');
const path = require('path');
const FormData = require('form-data');
const axios = require('axios');
require("dotenv").config()

const handleUpload = async (req, res) => {

    if (!req.file) return res.redirect("/workbook/upload")
    const pdfFilePath = path.join(__dirname, `../public/Data/${req.file.filename}`);

    const formData = new FormData();
    formData.append('file', fs.createReadStream(pdfFilePath));
    await axios.post(process.env.upload_link, formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        },
        maxContentLength: Infinity,
        maxBodyLength: Infinity
    })
        .then(response => {
            let Allquestions = response.data.Questions.response.split("\n")
            res.status(200).render("chat", {
                questions: Allquestions
            })
        })
        .catch(error => {
            console.log('Error uploading file:', error);
            res.status(404).redirect("/workbook/upload")
        });
}
module.exports = {
    handleUpload
}