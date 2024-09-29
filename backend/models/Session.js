const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the Session schema
const sessionSchema = new Schema({
  question: { type: String, required: true },       
  userResponse: { type: String, required: true },    
  geminiResult: { type: String },                    
  videoProcessingResult: { type: Schema.Types.ObjectId, ref: 'VideoProcessingResult' }, 
}, { timestamps: true });

const Session = mongoose.model('Session', sessionSchema);
module.exports = Session;
