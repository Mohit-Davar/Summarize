// Import the required modules
const fs = require('fs');
const pdf = require('pdf-parse');

// Function to convert PDF to text
async function pdfToText(filePath) {
    try {
        // Read the PDF file
        const dataBuffer = fs.readFileSync(filePath);
        // Parse the PDF
        const data = await pdf(dataBuffer);
        // Writing the text on a file
        fs.writeFile('./test.txt', data.text, err => {
            if (err) {
                console.error(err);
            } else {
                console.log("Content written succesfully on file.");
            }
        });
    } catch (error) {
        console.error("Error converting PDF to text:", error);
    }
}
pdfToText("Problem Statement.pdf");
