// //***************************************************************************************************
const express = require('express');
const multer = require('multer');
const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');
const path = require('path');
const cors = require('cors');
const mongoose = require('mongoose');
const generateAIQuestions = require('./middleware/aiquestions');
const pdfTextExtractorMiddleware = require('./middleware/pdf2text');
const triggerVideoProcessing = require('./middleware/triggerVideoProcessing');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/userdetail');
const bodyParser = require('body-parser');
const User = require('./models/User');
const VideoProcessingResult = require('./models/VideoProcessingResult');

const app = express();
const port = 3000;
app.use(cors());
const upload = multer({ dest: 'uploads/' });
app.use(express.json());
app.use(bodyParser.json());

mongoose.connect(process.env.MONGODB_URI, {
 
  })
    .then(() => console.log('MongoDB connected...'))
    .catch(err => console.error(err));

    //to get user details
    app.get("/api/details", async (req, res) => {
        const email = req.query.email;
    
        if (!email) {
            return res.status(400).json({ error: "Email is required" });
        }
    
        try {
            const user = await User.findOne({ email });
            if (!user) {
                return res.status(404).json({ error: "User not found" });
            }
            res.json({ userId: user._id, email: user.email });
        } catch (error) {
            res.status(500).json({ error: "Server error" });
        }
    });

    app.get('/api/user/history', async (req, res) => {
        const { userId } = req.query;
      
        if (!userId) {
          return res.status(400).json({ error: 'User ID is required' });
        }
      
        try {
          const results = await VideoProcessingResult.find({ userId }).sort({ createdAt: -1 });
          res.json(results);
        } catch (error) {
          console.error('Error fetching history:', error);
          res.status(500).json({ error: 'Error fetching history' });
        }
      });
    

//for authentication
app.use('/api', authRoutes);

app.post('/trigger-video-processing', upload.single('video'), triggerVideoProcessing);

// Process PDF upload, extract text, and generate AI questions
app.post('/api/generate', upload.single("file"), pdfTextExtractorMiddleware, generateAIQuestions, (req, res) => {
    res.json({ response: req.aiResponse });
});


app.get('/', (req, res) => {
    res.send('Node.js server is running');
});
app.listen(port, () => {
    console.log(`Node.js server is running on http://localhost:${port}`);
});

