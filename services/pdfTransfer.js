const axios = require('axios');
const fs = require('fs');
const path = require('path');
const FormData = require('form-data');

async function sendPdf(filePath, uploadUrl, res) {
    const pdfFilePath = path.join(__dirname, `../public/Data/${filePath}`);

    // Create a FormData object
    const formData = new FormData();
    formData.append('file', fs.createReadStream(pdfFilePath)); // Add the PDF file to the form

    // Make the POST request
    await axios.post(uploadUrl, formData, {
        headers: {
            "Content-Type": "multipart/form-data"  // This will include the correct 'Content-Type' header
        }
    })
        .then(response => {
            return res.send("chat", { questions: response.data.Questions.response })
        })
        .catch(error => {
            console.error('Error uploading file:', error);
        });
}
module.exports = {
    sendPdf
}