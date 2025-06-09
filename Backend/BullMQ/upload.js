const { Queue, Worker } = require('bullmq');
const redis = require("../service/redis");
const extractText = require('../utils/extractText');
const chunkText = require('../utils/chunkText');

const uploadQueue = new Queue('pdf-upload', { connection: redis });

const worker = new Worker(
    'pdf-upload',
    async (job) => {
        const { url, public_id } = job.data;
        try {
            const text = await extractText(url);
            chunkText(text, 1000);
        } catch (error) {
            throw new Error(`PDF processing failed: ${error.message}`);
        }
    },
    { connection: redis }
);

worker.on('completed', (job) => {
    console.log(`Job ${job.id} completed in ${job.processedOn - job.timestamp}ms`);
});

worker.on('failed', (job, err) => {
    console.error(`Job ${job.id} failed:`, err.message);
});

worker.on('error', (err) => {
    console.error('Worker error:', err.message);
});

module.exports = { uploadQueue };