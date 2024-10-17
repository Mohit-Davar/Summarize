const { pdfToText } = require("../services/pdf-parse")
const { sendPdf } = require("../services/pdfTransfer")

const handleUpload = (req, res) => {
    pdfToText(`./public/Data/${req.file.filename}`);
    sendPdf(req.file.filename, "https://ee10-2401-4900-5c9a-3fe5-812f-924b-b223-d858.ngrok-free.app/upload")
    res.redirect("upload/")
}
module.exports = {
    handleUpload
}