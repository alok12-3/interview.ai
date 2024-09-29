// // // import React, { useState } from "react";

// // // const GeminiApiComponent = () => {
// // //   const [userInput, setUserInput] = useState("");
// // //   const [response, setResponse] = useState("");

// // //   const handleInputChange = (e) => {
// // //     setUserInput(e.target.value);
// // //   };

// // //   const handleSubmit = async () => {
// // //     try {
// // //       const res = await fetch("http://localhost:3000/api/generate", {
// // //         method: "POST",
// // //         headers: {
// // //           "Content-Type": "application/json",
// // //         },
// // //         body: JSON.stringify({ userInput }),
// // //       });
// // //       const data = await res.json();
// // //       setResponse(data.response);
// // //     } catch (error) {
// // //       console.error("Error fetching response:", error);
// // //     }
// // //   };

// // //   return (
// // //     <div className="gemini-api-container">
// // //       <h2>Gemini API Interaction</h2>
// // //       <textarea
// // //         value={userInput}
// // //         onChange={handleInputChange}
// // //         placeholder="Paste your input here"
// // //         rows="5"
// // //         cols="50"
// // //       />
// // //       <br />
// // //       <button onClick={handleSubmit}>Submit</button>
// // //       <h3>Response:</h3>
// // //       <p>{response}</p>
// // //     </div>
// // //   );
// // // };

// // // export default GeminiApiComponent;
// // import React, { useState } from "react";

// // const GeminiApiComponent = () => {
// //   const [userInput, setUserInput] = useState("");
// //   const [introduction, setIntroduction] = useState("");
// //   const [questions, setQuestions] = useState([]);

// //   const handleInputChange = (e) => {
// //     setUserInput(e.target.value);
// //   };

// //   const handleSubmit = async () => {
// //     try {
// //       const res = await fetch("http://localhost:3000/api/generate", {
// //         method: "POST",
// //         headers: {
// //           "Content-Type": "application/json",
// //         },
// //         body: JSON.stringify({ userInput }),
// //       });
// //       const data = await res.json();
// //       const responseText = data.response;

// //       // Extract intro and questions
// //       const introMatch = responseText.match(/%%(.*?)%%/);
// //       const intro = introMatch ? introMatch[1].trim() : "";

// //       const questionMatches = responseText.match(/\$\$(.*?)\$\$/g);
// //       const extractedQuestions = questionMatches
// //         ? questionMatches.map((q) => q.replace(/\$\$/g, "").trim())
// //         : [];

// //       setIntroduction(intro);
// //       setQuestions(extractedQuestions);
// //     } catch (error) {
// //       console.error("Error fetching response:", error);
// //     }
// //   };

// //   return (
// //     <div className="gemini-api-container">
// //       <h2>Gemini API Interaction</h2>
// //       <textarea
// //         value={userInput}
// //         onChange={handleInputChange}
// //         placeholder="Paste your input here"
// //         rows="5"
// //         cols="50"
// //       />
// //       <br />
// //       <button onClick={handleSubmit}>Submit</button>

// //       {introduction && (
// //         <div>
// //           <h3>Introduction:</h3>
// //           <p>{introduction}</p>
// //         </div>
// //       )}

// //       {questions.length > 0 && (
// //         <div>
// //           <h3>Questions:</h3>
// //           <ul>
// //             {questions.map((question, index) => (
// //               <li key={index}>{question}</li>
// //             ))}
// //           </ul>
// //         </div>
// //       )}
// //     </div>
// //   );
// // };

// // export default GeminiApiComponent;

// import React, { useState } from "react";

// const GeminiApiComponent = () => {
//   const [pdfFile, setPdfFile] = useState(null);
//   const [introduction, setIntroduction] = useState("");
//   const [questions, setQuestions] = useState([]);

//   const handleFileChange = (e) => {
//     setPdfFile(e.target.files[0]);
//   };

//   const handleSubmit = async () => {
//     const formData = new FormData();
//     formData.append("file", pdfFile);

//     try {
//       const res = await fetch("http://localhost:3000/api/generate", {
//         method: "POST",
//         body: formData, // Send the file using FormData
//       });

//       const data = await res.json();
//       const responseText = data.response;

//       // Extract intro and questions
//       const introMatch = responseText.match(/%%(.*?)%%/);
//       const intro = introMatch ? introMatch[1].trim() : "";

//       const questionMatches = responseText.match(/\$\$(.*?)\$\$/g);
//       const extractedQuestions = questionMatches
//         ? questionMatches.map((q) => q.replace(/\$\$/g, "").trim())
//         : [];

//       setIntroduction(intro);
//       setQuestions(extractedQuestions);
//     } catch (error) {
//       console.error("Error fetching response:", error);
//     }
//   };

//   return (
//     <div className="gemini-api-container">
//       <h2>Gemini API Interaction</h2>
//       <input type="file" accept="application/pdf" onChange={handleFileChange} />
//       <br />
//       <button onClick={handleSubmit}>Submit PDF</button>

//       {introduction && (
//         <div>
//           <h3>Introduction:</h3>
//           <p>{introduction}</p>
//         </div>
//       )}

//       {questions.length > 0 && (
//         <div>
//           <h3>Questions:</h3>
//           <ul>
//             {questions.map((question, index) => (
//               <li key={index}>{question}</li>
//             ))}
//           </ul>
//         </div>
//       )}
//     </div>
//   );
// };

// export default GeminiApiComponent;

//**************************************************************************** */

import React, { useState } from "react";
import UploadVideoAndSpeech from "./UploadVideoAndSpeech"; // Import the component to record video and speech

const GeminiApiComponent = () => {
  const [pdfFile, setPdfFile] = useState(null);
  const [introduction, setIntroduction] = useState("");
  const [questions, setQuestions] = useState([]);
  const [selectedQuestion, setSelectedQuestion] = useState(null); // To store the current question

  const handleFileChange = (e) => {
    setPdfFile(e.target.files[0]);
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("file", pdfFile);

    try {
      const res = await fetch("http://localhost:3000/api/generate", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      const responseText = data.response;

      const introMatch = responseText.match(/%%(.*?)%%/);
      const intro = introMatch ? introMatch[1].trim() : "";

      const questionMatches = responseText.match(/\$\$(.*?)\$\$/g);
      const extractedQuestions = questionMatches
        ? questionMatches.map((q) => q.replace(/\$\$/g, "").trim())
        : [];

      setIntroduction(intro);
      setQuestions(extractedQuestions);
    } catch (error) {
      console.error("Error fetching response:", error);
    }
  };

  return (
    <div className="gemini-api-container">
      <h2>Upload you resume here</h2>
      <input type="file" accept="application/pdf" onChange={handleFileChange} />
      <br />
      <button onClick={handleSubmit}>Submit PDF</button>

      {introduction && (
        <div>
          <h3>Introduction:</h3>
          <p>{introduction}</p>
        </div>
      )}

      {questions.length > 0 && (
        <div>
          <h3>Questions:</h3>
          <ul>
            {questions.map((question, index) => (
              <li key={index}>
                {question}
                <button
                  onClick={() => setSelectedQuestion(question)} // Set the selected question
                >
                  Attempt Question
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Conditionally render the UploadVideoAndSpeech component when a question is selected */}
      {selectedQuestion && <UploadVideoAndSpeech question={selectedQuestion} />}
    </div>
  );
};

export default GeminiApiComponent;
