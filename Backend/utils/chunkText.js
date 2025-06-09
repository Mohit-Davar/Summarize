const fs = require('fs');

function splitAndTrim(text, separator) {
    return text
        .split(separator)
        .map(text => text.trim())
        .filter(text => text.length > 0);
}

function getChunks(content, maxLength = 500) {
    const chunks = [];

    function recursiveSplit(text) {
        if (text.length <= maxLength) {
            chunks.push(text);
            return;
        }
        // Step 1: Paragraphs
        let parts = splitAndTrim(text, /\n\s*\n/);
        if (parts.length > 1) {
            for (const part of parts) recursiveSplit(part);
            return;
        }
        // Step 2: Lines
        parts = splitAndTrim(text, /\n/);
        if (parts.length > 1) {
            for (const part of parts) recursiveSplit(part);
            return;
        }
        // Step 3: Sentences
        parts = text.match(/[^.!?]+[.!?]+[\])'"`’”]*|[^.!?]+$/g);
        if (parts && parts.length > 1) {
            for (const part of parts) recursiveSplit(part.trim());
            return;
        }
        // Step 4: Word grouping
        const words = text.split(/\s+/);
        let current = '';
        for (const word of words) {
            if ((current + ' ' + word).trim().length > maxLength) {
                if (current) chunks.push(current.trim());
                current = word;
            } else {
                current += ' ' + word;
            }
        }
        if (current.trim()) chunks.push(current.trim());
    }

    recursiveSplit(content);
    return chunks;
}

fs.readFile('example.txt', 'utf8', (err, data) => {
    if (err) {
        console.error(err);
        return;
    }
    const chunks = getChunks(data);
    chunks.forEach((chunk, index) => {
        console.log(`Chunk ${index + 1}: ${chunk}`);
    });
    console.log(`Total chunks: ${chunks.length}`);
});
