// const { pdfToText } = require("../services/pdf-parse")
// const { sendPdf } = require("../services/pdfTransfer")
const fs = require('fs');
const path = require('path');
const FormData = require('form-data');
const axios = require('axios');
require("dotenv").config()

const handleUpload = async (req, res) => {

    const pdfFilePath = path.join(__dirname, `../public/Data/${req.file.filename}`);
    // Create a FormData object
    const formData = new FormData();
    formData.append('file', fs.createReadStream(pdfFilePath)); // Add the PDF file to the form
    // Make the POST request
    await axios.post(process.env.upload_link, formData, {
        headers: {
            "Content-Type": "multipart/form-data"  // This will include the correct 'Content-Type' header
        }
    })
        .then(response => {
            let Allquestions = response.data.Questions.response.split("\n")
            res.status(200).render("chat", {
                questions: Allquestions
            })
        })
        .catch(error => {
            console.error('Error uploading file:', error);
        });
}
module.exports = {
    handleUpload
}