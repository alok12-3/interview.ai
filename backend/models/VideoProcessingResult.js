// // const mongoose = require('mongoose');
// // const Schema = mongoose.Schema;

// // // Define the VideoProcessingResult schema
// // const videoProcessingResultSchema = new Schema({
// //   userId: { type: Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to the user who uploaded the video
// //   question: { type: String, required: true },       
// //   userResponse: { type: String, required: true },    
// //   geminiResult: { type: String },    
// //   resultJson: { type: Object, required: true }, // Store the result as a JSON object
// //   jobId: { type: Schema.Types.ObjectId, ref: 'Job', required: true }, // Reference to the associated Job
// // }, { timestamps: true });

// // const VideoProcessingResult = mongoose.model('VideoProcessingResult', videoProcessingResultSchema);
// // module.exports = VideoProcessingResult;


// const mongoose = require('mongoose');
// const Schema = mongoose.Schema;

// // Schema to store video processing results and AI response
// const videoProcessingResultSchema = new Schema({
//   userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
//   question: { type: String},
//   userResponse: { type: String},
//   geminiResult: { type: String }, // AI-generated response
//   resultJson: { type: Object}, // Store result JSON (e.g., video status)
//   jobId: { type: Schema.Types.ObjectId, ref: 'Job', required: true },
// }, { timestamps: true });

// const VideoProcessingResult = mongoose.model('VideoProcessingResult', videoProcessingResultSchema);
// module.exports = VideoProcessingResult;


const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Schema to store video processing results and AI response
const videoProcessingResultSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  question: { type: String, required: true },
  userResponse: { type: String, required: true },
  geminiResult: { type: String }, // AI-generated response
  resultJson: { type: Object, required: true }, // Store result JSON (e.g., video status)
  jobId: { type: Schema.Types.ObjectId, ref: 'Job', required: true },
}, { timestamps: true });

const VideoProcessingResult = mongoose.model('VideoProcessingResult', videoProcessingResultSchema);
module.exports = VideoProcessingResult;
