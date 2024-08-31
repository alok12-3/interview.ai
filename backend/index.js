// //***************************************************************************************************
const express = require('express');
const multer = require('multer');
const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
const port = 3000;
app.use(cors());
const upload = multer({ dest: 'uploads/' });


const jobQueue = [];
let isProcessing = false;


async function processNextJob() {
    if (jobQueue.length === 0) {
        isProcessing = false; 
        return;
    }

    isProcessing = true; 

    const { req, res } = jobQueue.shift(); 
    const form = new FormData();
    form.append('video', fs.createReadStream(req.file.path));

    try {
        const response = await axios.post(
            'http://localhost:5000/process_video',
            form,
            {
                headers: {
                    ...form.getHeaders(),
                },
            }
        );

        if (!res.headersSent) { 
            res.json(response.data); 
        }
    } catch (error) {
        console.error('Error:', error);
        if (!res.headersSent) { 
            res.status(500).json({ error: 'Error while processing video' }); 
        }
    } finally {
        fs.unlinkSync(req.file.path); 
        processNextJob(); 
    }
}




app.post('/trigger-video-processing', upload.single('video'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: 'No video file provided.' });
    }

    
    jobQueue.push({ req, res });

   
    if (!isProcessing) {
        processNextJob();
    } else {
    
        res.json({ status: 'queued', message: 'Your video is queued for processing.' });
    }
});


app.get('/', (req, res) => {
    res.send('Node.js server is running');
});
app.listen(port, () => {
    console.log(`Node.js server is running on http://localhost:${port}`);
});

