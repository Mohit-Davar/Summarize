const fs = require('fs');
const pdf = require('pdf-parse');
const { v4: uuidv4 } = require('uuid');

async function pdfToText(filePath) {
    try {
        const dataBuffer = fs.readFileSync(filePath);
        const data = await pdf(dataBuffer);
        const id = uuidv4()
        const content = data.text;
        fs.writeFile(`./public/Text/${id}`, content, err => {
            if (err) {
                console.error(err);
            } 
        });
    } catch (error) {
        console.error("Error extracting text from PDF:", error);
    }
}
module.exports = {
    pdfToText
}