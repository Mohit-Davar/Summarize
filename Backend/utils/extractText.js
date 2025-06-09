const axios = require('axios');
const pdfParse = require('pdf-parse');

async function extractText(url) {
    const response = await axios.get(url, {
        responseType: 'arraybuffer',
        timeout: 30000,
        maxContentLength: 50 * 1024 * 1024,
    });

    const pdfBuffer = Buffer.from(response.data);
    const { text } = await pdfParse(pdfBuffer);
    return text;
}

module.exports = extractText;