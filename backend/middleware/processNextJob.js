// // const fs = require('fs');
// // const axios = require('axios');
// // const FormData = require('form-data');
// // const Job = require('../models/Job');
// // const VideoProcessingResult = require('../models/VideoProcessingResult'); 
// // const jobQueue = [];
// // let isProcessing = false;


// // async function processNextJob() {
// //     if (jobQueue.length === 0) {
// //         isProcessing = false;
// //         return;
// //     }

// //     isProcessing = true;

    
// //     const { req, res, jobId, userId } = jobQueue.shift(); 


// //     const job = await Job.findById(jobId);
// //     if (!job) {
// //         console.error(`Job with ID ${jobId} not found.`);
// //         isProcessing = false;
// //         processNextJob();
// //         return;
// //     }

// //     job.status = 'processing';
// //     job.updatedAt = Date.now();
// //     await job.save();

// //     const form = new FormData();
// //     form.append('video', fs.createReadStream(req.file.path));

// //     try {
// //         const response = await axios.post(
// //             'http://localhost:5000/process_video',
// //             form,
// //             {
// //                 headers: {
// //                     ...form.getHeaders(),
// //                 },
// //             }
// //         );

      
// //         const videoProcessingResult = new VideoProcessingResult({
// //             userId: userId, 
// //             resultJson: response.data, 
// //         });

// //         await videoProcessingResult.save();

        
// //         job.status = 'completed';
// //         job.result = videoProcessingResult._id; 
// //         job.updatedAt = Date.now();
// //         await job.save();

// //         if (!res.headersSent) {
// //             res.json(response.data); 
// //         }
// //     } catch (error) {
// //         console.error('Error:', error);
// //         job.status = 'failed';
// //         job.error = error.message;
// //         job.updatedAt = Date.now();
// //         await job.save();

// //         if (!res.headersSent) {
// //             res.status(500).json({ error: 'Error while processing video' });
// //         }
// //     } finally {
// //         fs.unlinkSync(req.file.path);
// //         processNextJob(); 
// //     }
// // }

// // module.exports = {
// //     processNextJob,
// //     jobQueue,
// //     isProcessing
// // };


// const fs = require('fs');
// const axios = require('axios');
// const FormData = require('form-data');
// const Job = require('../models/Job');
// const VideoProcessingResult = require('../models/VideoProcessingResult'); 
// const jobQueue = [];
// let isProcessing = false;


// async function processNextJob() {
//     if (jobQueue.length === 0) {
//         isProcessing = false;
//         return;
//     }

//     isProcessing = true;

    
//     const { req, res, jobId, userId } = jobQueue.shift(); 


//     const job = await Job.findById(jobId);
//     if (!job) {
//         console.error(`Job with ID ${jobId} not found.`);
//         isProcessing = false;
//         processNextJob();
//         return;
//     }

//     job.status = 'processing';
//     job.updatedAt = Date.now();
//     await job.save();

//     const form = new FormData();
//     form.append('video', fs.createReadStream(req.file.path));

//     try {
//         const response = await axios.post(
//             'http://localhost:5000/process_video',
//             form,
//             {
//                 headers: {
//                     ...form.getHeaders(),
//                 },
//             }
//         );

      
//         const videoProcessingResult = new VideoProcessingResult({
//             userId: userId, 
//             jobId: jobId,                 // Include the jobId
//             userResponse: userResponse,   // Include the userResponse
//             question: question,           // Include the question
//             resultJson: response.data,    // Result from video processing
//         });

//         await videoProcessingResult.save();

        
//         job.status = 'completed';
//         job.result = videoProcessingResult._id; 
//         job.updatedAt = Date.now();
//         await job.save();

//         if (!res.headersSent) {
//             res.json(response.data); 
//         }
//     } catch (error) {
//         console.error('Error:', error);
//         job.status = 'failed';
//         job.error = error.message;
//         job.updatedAt = Date.now();
//         await job.save();

//         if (!res.headersSent) {
//             res.status(500).json({ error: 'Error while processing video' });
//         }
//     } finally {
//         fs.unlinkSync(req.file.path);
//         processNextJob(); 
//     }
// }

// module.exports = {
//     processNextJob,
//     jobQueue,
//     isProcessing
// };   


const fs = require('fs');
const axios = require('axios');
const FormData = require('form-data');
const Job = require('../models/Job');
const VideoProcessingResult = require('../models/VideoProcessingResult'); 
const jobQueue = [];
let isProcessing = false;
async function processNextJob() {
    if (jobQueue.length === 0) {
      isProcessing = false;
      return;
    }
  
    isProcessing = true;
  
    const { req, res, jobId, userId, question, userResponse, filePath, geminiResult } = jobQueue.shift();
  
    const job = await Job.findById(jobId);
    if (!job) {
      console.error(`Job with ID ${jobId} not found.`);
      isProcessing = false;
      processNextJob();
      return;
    }
  
    job.status = 'processing';
    job.updatedAt = Date.now();
    await job.save();
  
    const form = new FormData();
    form.append('video', fs.createReadStream(filePath));
  
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
  
      // Store the video processing result along with geminiResult
      const videoProcessingResult = new VideoProcessingResult({
        userId: userId,
        jobId: jobId,
        userResponse: userResponse,  
        question: question,          
        geminiResult: geminiResult,   // Save AI response in schema
        resultJson: response.data,   // Result from video processing
      });
  
      await videoProcessingResult.save();
  
      // Update the job status
      job.status = 'completed';
      job.result = videoProcessingResult._id; // Store the reference to the video result
      job.updatedAt = Date.now();
      await job.save();
  
      if (!res.headersSent) {
        res.json(response.data);  // Send the video processing result
      }
    } catch (error) {
      console.error('Error:', error);
      job.status = 'failed';
      job.error = error.message;
      job.updatedAt = Date.now();
      await job.save();
  
      if (!res.headersSent) {
        res.status(500).json({ error: 'Error while processing video' });
      }
    } finally {
      fs.unlinkSync(filePath); // Clean up the file after processing
      processNextJob();  // Process the next job in the queue
    }
}


  module.exports = {
    processNextJob,
    jobQueue,
    isProcessing
};   
