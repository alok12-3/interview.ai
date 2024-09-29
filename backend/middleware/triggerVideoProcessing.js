// // // const fs = require('fs');
// // // const Job = require('./models/Job');
// // // const { processNextJob, jobQueue, isProcessing } = require('./processNextJob'); // Import processNextJob

// // // // Middleware function to handle video processing route
// // // const triggerVideoProcessing = async (req, res) => {
// // //     if (!req.file) {
// // //         return res.status(400).json({ error: 'No video file provided.' });
// // //     }

// // //     // Create a new job in MongoDB with status 'queued'
// // //     const newJob = new Job({
// // //         status: 'queued',
// // //         filePath: req.file.path
// // //     });

// // //     await newJob.save();

// // //     // Add job to the queue with jobId
// // //     jobQueue.push({ req, res, jobId: newJob._id });

// // //     // Check if any job is being processed, if not start processing
// // //     if (!isProcessing) {
// // //         processNextJob();
// // //     }

// // //     // Respond to the user that the video is queued
// // //     res.json({ status: 'queued', message: 'Your video is queued for processing.', jobId: newJob._id });
// // // };

// // // module.exports = triggerVideoProcessing;



// // const fs = require('fs');
// // const Job = require('../models/Job');
// // const { processNextJob, jobQueue, isProcessing } = require('./processNextJob'); // Import processNextJob

// // const triggerVideoProcessing = async (req, res) => {
// //    if (!req.file) {
// //        return res.status(400).json({ error: 'No video file provided.' });
// //    }

// //    const userId = req.body.userId; // Get userId from the request body (FormData)

// //    if (!userId) {
// //        return res.status(400).json({ error: 'User ID is required.' });
// //    }

// //    // Create a new job in MongoDB with status 'queued'
// //    const newJob = new Job({
// //        userId: userId, // Use userId from the request body
// //        status: 'queued',
// //        filePath: req.file.path
// //    });

// //    await newJob.save();

// //    // Add job to the queue with jobId and userId
// //    jobQueue.push({ req, res, jobId: newJob._id, userId }); // Include userId here

// //    // Check if any job is being processed, if not start processing
// //    if (!isProcessing) {
// //        processNextJob();
// //    }

// //    // Respond to the user that the video is queued
// //    res.json({ status: 'queued', message: 'Your video is queued for processing.', jobId: newJob._id });
// // };

// // module.exports = triggerVideoProcessing;



// const fs = require('fs');
// const Job = require('../models/Job');
// const VideoProcessingResult = require('../models/VideoProcessingResult');
// const { processNextJob, jobQueue, isProcessing } = require('./processNextJob');
// const { GoogleGenerativeAI } = require('@google/generative-ai');
// const dotenv = require('dotenv');

// dotenv.config();
// const apiKey = "AIzaSyDsEvPf8X0M03OkSaDqmyqy1EZubalOg7Y";
// const genAI = new GoogleGenerativeAI(apiKey);
// const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// const generationConfig = {
//   temperature: 1,
//   topP: 0.95,
//   topK: 64,
//   maxOutputTokens: 8192,
//   responseMimeType: "text/plain",
// };

// // Middleware for video processing and AI response generation
// const triggerVideoProcessing = async (req, res) => {
//    const { file, body: { userId, question, userResponse } } = req;

//    if (!file || !userId || !question || !userResponse) {
//        return res.status(400).json({ error: 'Video file, User ID, Question, and User Response are required.' });
//    }

//    const newJob = new Job({
//     userId: userId,
//     status: 'queued',
//     filePath: file.path,
//     question,  // Add the question field to the Job schema
//     userResponse  // Add the userResponse field to the Job schema
// });
//    await newJob.save();

//    // Add job to the processing queue
//    jobQueue.push({ req, res, jobId: newJob._id, userId });

//    // If no job is currently being processed, start processing
//    if (!isProcessing) {
//        processNextJob();
//    }

//    // Generate AI Response
//    try {
//      const result = await model.generateContent({
//        contents: [
//          { role: "user", parts: [
//            { text: "You are a hiring manager, here's a question and my response, judge the response." },
//            { text: `Question: ${question}` },
//            { text: `Response: ${userResponse}` }
//          ] }
//        ],
//        generationConfig,
//      });

//      const geminiResult = result.response.text();

//      // Store the result in VideoProcessingResult schema
//      const videoProcessingResult = new VideoProcessingResult({
//        userId,
//        question,
//        userResponse,
//        geminiResult,
//        resultJson: { videoProcessed: false }, // For now, video is queued, update it later after processing
//        jobId: newJob._id
//      });

//      await videoProcessingResult.save();

//      // Respond with AI result and video processing job status
//      res.json({ 
//        status: 'queued', 
//        message: 'Your video is queued for processing, AI response generated.', 
//        jobId: newJob._id,
//        geminiResult
//      });
//    } catch (error) {
//      console.error('Error generating AI response:', error);
//      res.status(500).json({ error: 'Error generating AI response' });
//    }
// };

// module.exports = triggerVideoProcessing;


const fs = require('fs');
const Job = require('../models/Job');
const VideoProcessingResult = require('../models/VideoProcessingResult');
const { processNextJob, jobQueue, isProcessing } = require('./processNextJob');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const dotenv = require('dotenv');

dotenv.config();
const apiKey = "AIzaSyDsEvPf8X0M03OkSaDqmyqy1EZubalOg7Y";
const genAI = new GoogleGenerativeAI(apiKey);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};

const triggerVideoProcessing = async (req, res) => {
    const { file, body: { userId, question, userResponse } } = req;
  
    if (!file || !userId || !question || !userResponse) {
      return res.status(400).json({ error: 'Video file, User ID, Question, and User Response are required.' });
    }
  
    const newJob = new Job({
      userId: userId,
      status: 'queued',
      filePath: file.path,
      question,  // Add the question field to the Job schema
      userResponse  // Add the userResponse field to the Job schema
    });
    await newJob.save();
  
    // Generate AI Response
    let geminiResult;
    try {
      const result = await model.generateContent({
        contents: [
          { role: "user", parts: [
            { text: "You are a hiring manager, here's a question and my response, judge the response." },
            { text: `Question: ${question}` },
            { text: `Response: ${userResponse}` }
          ] }
        ],
        generationConfig,
      });
  
      geminiResult = result.response.text();  // Store AI response

      // Store the AI result in VideoProcessingResult schema
      const videoProcessingResult = new VideoProcessingResult({
        userId,
        question,
        userResponse,
        geminiResult,
        resultJson: { videoProcessed: false }, // For now, video is queued, update it later after processing
        jobId: newJob._id
      });
  
      await videoProcessingResult.save();
  
    } catch (error) {
      console.error('Error generating AI response:', error);
      return res.status(500).json({ error: 'Error generating AI response' });
    }
  
    // Add job to the processing queue, including the geminiResult
    jobQueue.push({ 
      req, 
      res, 
      jobId: newJob._id, 
      userId, 
      question,        
      userResponse,    
      filePath: file.path,
      geminiResult   // Pass AI response to processNextJob
    });
  
    // If no job is currently being processed, start processing
    if (!isProcessing) {
      processNextJob();
    }
  
    // Respond with initial status
    res.json({ 
      status: 'queued', 
      message: 'Your video is queued for processing, AI response generated.', 
      jobId: newJob._id,
      geminiResult
    });
};

  
  module.exports = triggerVideoProcessing;
