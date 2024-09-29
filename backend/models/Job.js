// const mongoose = require('mongoose');
// const Schema = mongoose.Schema;

// // Define the Job schema
// const jobSchema = new Schema({
//   userId: { type: Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to the user
//   status: { type: String, enum: ['queued', 'processing', 'completed', 'failed'], required: true },
//   filePath: { type: String, required: true }, // Path to the video file
//   result: { type: Schema.Types.ObjectId, ref: 'VideoProcessingResult' }, // Reference to processing result
//   error: { type: String }, // Error message if job fails
// }, { timestamps: true });

// const Job = mongoose.model('Job', jobSchema);
// module.exports = Job;


const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const jobSchema = new Schema({
   userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
   status: { type: String, enum: ['queued', 'processing', 'completed', 'failed'], required: true },
   filePath: { type: String, required: true },
   result: { type: Schema.Types.ObjectId, ref: 'VideoProcessingResult' },
   error: { type: String },
   question: { type: String, required: true },  // Add question field
   userResponse: { type: String, required: true }, // Add userResponse field
}, { timestamps: true });


const Job = mongoose.model('Job', jobSchema);
module.exports = Job;