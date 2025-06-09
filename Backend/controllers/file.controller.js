const cloudinary = require("../service/cloudinary");
const { uploadQueue } = require('../BullMQ/upload');
const { insertFile } = require("../models/file.model");

const pdfUpload = async (req, res) => {
    try {
        const { buffer, originalname } = req.file;
        const email = req.user.email;

        //Uploading to Cloudinary
        const { public_id, secure_url } = await new Promise((resolve, reject) => {
            const stream = cloudinary.uploader.upload_stream(
                {
                    resource_type: 'raw',
                    folder: 'Summarize/PDFs',
                },
                (error, result) => {
                    if (error) return reject(error);
                    resolve(result);
                }
            );
            stream.end(buffer);
        });
        if (!public_id || !secure_url) return res.status(500).send({ message: 'Failed to upload file' });

        // Inserting file details into the database
        await insertFile(originalname, secure_url, public_id, email);

        // Adding job to the upload queue
        await uploadQueue.add(
            'upload-pdf',
            {
                public_id: public_id,
                url: secure_url,
                uploadedAt: Date.now(),
            },
            {
                removeOnComplete: true,
                removeOnFail: true
            }
        );

        return res.status(200).send({ message: "File uploaded successfully" });
    } catch (error) {
        console.error(error);
        return res.status(500).send({ message: 'Upload failed' });
    }
};

module.exports = { pdfUpload };