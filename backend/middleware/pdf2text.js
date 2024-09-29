// const pdfParse = require('pdf-parse');
// const fs = require('fs');

// const pdfTextExtractorMiddleware = async (req, res, next) => {
//     const file = req.file;

//     if (!file) {
//         return res.status(400).send('No file uploaded');
//     }

//     try {
//         const dataBuffer = fs.readFileSync(file.path);
//         const pdfData = await pdfParse(dataBuffer);
//         req.extractedText = pdfData.text;
//         next();
//     } catch (error) {
//         console.error('Error extracting text:', error);
//         res.status(500).send('Error extracting text from PDF');
//     }
// };

// module.exports = pdfTextExtractorMiddleware;

const pdfParse = require('pdf-parse');
const fs = require('fs');

const pdfTextExtractorMiddleware = async (req, res, next) => {
    const file = req.file;

    if (!file) {
        return res.status(400).send('No file uploaded');
    }

    try {
        const dataBuffer = fs.readFileSync(file.path);
        const pdfData = await pdfParse(dataBuffer);
        req.extractedText = pdfData.text; // Extracted text from PDF
        next();
    } catch (error) {
        console.error('Error extracting text:', error);
        res.status(500).send('Error extracting text from PDF');
    } finally {
        // Optionally, remove the file after processing
        fs.unlinkSync(file.path);
    }
};

module.exports = pdfTextExtractorMiddleware;
