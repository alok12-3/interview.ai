// const { GoogleGenerativeAI } = require('@google/generative-ai');
// const dotenv = require('dotenv');

// dotenv.config(); // Load environment variables

// const apiKey = "AIzaSyDsEvPf8X0M03OkSaDqmyqy1EZubalOg7Y";

// // Initialize Google Generative AI
// const genAI = new GoogleGenerativeAI(apiKey);
// const model = genAI.getGenerativeModel({
//   model: "gemini-1.5-flash",
// });

// // Define the generation config
// const generationConfig = {
//   temperature: 1,
//   topP: 0.95,
//   topK: 64,
//   maxOutputTokens: 8192,
//   responseMimeType: "text/plain",
// };

// // Middleware to handle AI question generation
// const generateAIQuestions = async (req, res, next) => {
//   const { userInput } = req.body; // Get input from frontend

//   // Prepare the parts array with user input replaced
//   const parts = [
//     {text: "you are hiring manager of a company and you have to take interview of me and first tell me to introduce myself in between %% %% then this is my resume so go through my resume and ask 10 questions based on my resume also ask every question with $$write your question here$$ so write question in between $$ $$"},
   
//     {text: " ask 10 qiestions based on resume such that put every question in between special character $$ question $$"},
//     {text: `input: ${userInput}`},
    
   
//   ];

//   try {
//     // Call the Gemini API
//     const result = await model.generateContent({
//       contents: [{ role: "user", parts }],
//       generationConfig,
//     });

//     // Store the result in the response object for next middleware or route
//     req.aiResponse = result.response.text(); 
//     next(); // Call next to continue with the request
//   } catch (error) {
//     console.error('Error calling Gemini API:', error);
//     res.status(500).json({ error: 'Error generating content' });
//   }
// };

// // Export the middleware
// module.exports = generateAIQuestions;


const { GoogleGenerativeAI } = require('@google/generative-ai');
const dotenv = require('dotenv');

dotenv.config();
const apiKey = "AIzaSyDsEvPf8X0M03OkSaDqmyqy1EZubalOg7Y";

// Initialize Google Generative AI
const genAI = new GoogleGenerativeAI(apiKey);
const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};

// Middleware to handle AI question generation
const generateAIQuestions = async (req, res, next) => {
  const pdfText = req.extractedText; // Use the extracted text from PDF

  const parts = [
    { text: "you are hiring manager of a company and you have to take interview of me and first tell me to introduce myself in between %% %% then this is my resume so go through my resume and ask 10 questions based on my resume also ask every question with $$write your question here$$ so write question in between $$ $$" },
    { text: " ask 10 questions based on resume such that put every question in between special character $$ question $$" },
    { text: `input: ${pdfText}` },
  ];

  try {
    const result = await model.generateContent({
      contents: [{ role: "user", parts }],
      generationConfig,
    });

    req.aiResponse = result.response.text(); // Store result
    next();
  } catch (error) {
    console.error('Error calling Gemini API:', error);
    res.status(500).json({ error: 'Error generating content' });
  }
};

module.exports = generateAIQuestions;
