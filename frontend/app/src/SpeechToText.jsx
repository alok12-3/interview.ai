// // // // import React, { useState, useEffect, useRef } from "react";

// // // // const SpeechToText = () => {
// // // //   const [isRecording, setIsRecording] = useState(false);
// // // //   const [transcript, setTranscript] = useState("");
// // // //   const recognitionRef = useRef(null);

// // // //   useEffect(() => {
// // // //     // Check if the browser supports SpeechRecognition
// // // //     const SpeechRecognition =
// // // //       window.SpeechRecognition || window.webkitSpeechRecognition;
// // // //     if (!SpeechRecognition) {
// // // //       alert("Sorry, your browser doesn't support speech recognition.");
// // // //       return;
// // // //     }

// // // //     // Initialize SpeechRecognition
// // // //     const recognition = new SpeechRecognition();
// // // //     recognition.continuous = true; // For continuous speech recognition
// // // //     recognition.interimResults = true; // Capture interim results before final result
// // // //     recognition.lang = "en-US"; // Set language

// // // //     recognition.onresult = (event) => {
// // // //       let interimTranscript = "";
// // // //       for (let i = event.resultIndex; i < event.results.length; i++) {
// // // //         const transcriptChunk = event.results[i][0].transcript;
// // // //         if (event.results[i].isFinal) {
// // // //           setTranscript((prev) => prev + transcriptChunk);
// // // //         } else {
// // // //           interimTranscript += transcriptChunk;
// // // //         }
// // // //       }
// // // //     };

// // // //     recognition.onerror = (event) => {
// // // //       console.error("Speech recognition error:", event.error);
// // // //     };

// // // //     recognitionRef.current = recognition;
// // // //   }, []);

// // // //   const startRecording = () => {
// // // //     setIsRecording(true);
// // // //     recognitionRef.current.start();
// // // //   };

// // // //   const stopRecording = () => {
// // // //     setIsRecording(false);
// // // //     recognitionRef.current.stop();
// // // //   };

// // // //   return (
// // // //     <div className="speech-to-text-container">
// // // //       <h2>Speech to Text Converter</h2>
// // // //       <button onClick={isRecording ? stopRecording : startRecording}>
// // // //         {isRecording ? "Stop Recording" : "Start Recording"}
// // // //       </button>
// // // //       <div className="transcript-container">
// // // //         <h3>Transcript:</h3>
// // // //         <p>{transcript}</p>
// // // //       </div>
// // // //     </div>
// // // //   );
// // // // };

// // // // export default SpeechToText;

import React, { useState, useEffect, useRef } from "react";

const SpeechToText = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [interimTranscript, setInterimTranscript] = useState("");
  const recognitionRef = useRef(null);

  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Sorry, your browser doesn't support speech recognition.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = "en-US";

    recognition.onresult = (event) => {
      let interim = "";
      let final = "";

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const result = event.results[i];
        if (result.isFinal) {
          final += result[0].transcript;
        } else {
          interim += result[0].transcript;
        }
      }

      setTranscript((prev) => prev + final);
      setInterimTranscript(interim); // Show interim results including fillers like "umm" and "uhh"
    };

    recognition.onerror = (event) => {
      console.error("Speech recognition error:", event.error);
    };

    recognitionRef.current = recognition;
  }, []);

  const startRecording = () => {
    setIsRecording(true);
    setTranscript(""); // Reset transcript on new recording
    setInterimTranscript(""); // Reset interim transcript
    recognitionRef.current.start();
  };

  const stopRecording = () => {
    setIsRecording(false);
    recognitionRef.current.stop();
  };

  return (
    <div className="speech-to-text-container">
      <h2>Speech to Text Converter</h2>
      <button onClick={isRecording ? stopRecording : startRecording}>
        {isRecording ? "Stop Recording" : "Start Recording"}
      </button>
      <div className="transcript-container">
        <h3>Transcript:</h3>
        <p>{transcript}</p>
        <h3>Interim Transcript (live):</h3>
        <p style={{ color: "gray" }}>{interimTranscript}</p>
      </div>
    </div>
  );
};

export default SpeechToText;

// // import React, { useState, useEffect, useRef } from "react";

// // const SpeechToText = () => {
// //   const [isRecording, setIsRecording] = useState(false);
// //   const [transcript, setTranscript] = useState("");
// //   const recognitionRef = useRef(null);

// //   useEffect(() => {
// //     const SpeechRecognition =
// //       window.SpeechRecognition || window.webkitSpeechRecognition;
// //     if (!SpeechRecognition) {
// //       alert("Sorry, your browser doesn't support speech recognition.");
// //       return;
// //     }

// //     const recognition = new SpeechRecognition();
// //     recognition.continuous = true; // Keep listening continuously
// //     recognition.interimResults = true; // Capture live results
// //     recognition.lang = "en-US"; // Set language

// //     recognition.onresult = (event) => {
// //       let interimTranscript = "";

// //       // Append interim results to the final transcript
// //       for (let i = event.resultIndex; i < event.results.length; i++) {
// //         interimTranscript += event.results[i][0].transcript;
// //       }

// //       // Update the main transcript by appending interim transcript
// //       setTranscript((prev) => prev + interimTranscript);
// //     };

// //     recognition.onerror = (event) => {
// //       console.error("Speech recognition error:", event.error);
// //     };

// //     recognitionRef.current = recognition;
// //   }, []);

// //   const startRecording = () => {
// //     setIsRecording(true);
// //     recognitionRef.current.start();
// //   };

// //   const stopRecording = () => {
// //     setIsRecording(false);
// //     recognitionRef.current.stop();
// //   };

// //   return (
// //     <div className="speech-to-text-container">
// //       <h2>Speech to Text Converter</h2>
// //       <button onClick={isRecording ? stopRecording : startRecording}>
// //         {isRecording ? "Stop Recording" : "Start Recording"}
// //       </button>
// //       <div className="transcript-container">
// //         <h3>Transcript:</h3>
// //         <p>{transcript}</p>
// //       </div>
// //     </div>
// //   );
// // };

// // export default SpeechToText;

// import React, { useState, useEffect, useRef } from "react";

// const SpeechToText = () => {
//   const [isRecording, setIsRecording] = useState(false);
//   const [transcript, setTranscript] = useState("");
//   const [previousTranscript, setPreviousTranscript] = useState("");
//   const recognitionRef = useRef(null);

//   useEffect(() => {
//     const SpeechRecognition =
//       window.SpeechRecognition || window.webkitSpeechRecognition;
//     if (!SpeechRecognition) {
//       alert("Sorry, your browser doesn't support speech recognition.");
//       return;
//     }

//     const recognition = new SpeechRecognition();
//     recognition.continuous = true;
//     recognition.interimResults = true;
//     recognition.lang = "en-US";

//     recognition.onresult = (event) => {
//       let interimTranscript = "";

//       for (let i = event.resultIndex; i < event.results.length; i++) {
//         interimTranscript += event.results[i][0].transcript;
//       }

//       // Only add to the main transcript if the interim transcript is different from the previous one
//       if (interimTranscript.trim() !== previousTranscript.trim()) {
//         setTranscript((prev) => prev + " " + interimTranscript.trim());
//         setPreviousTranscript(interimTranscript.trim()); // Update the previous transcript
//       }
//     };

//     recognition.onerror = (event) => {
//       console.error("Speech recognition error:", event.error);
//     };

//     recognitionRef.current = recognition;
//   }, [previousTranscript]);

//   const startRecording = () => {
//     setIsRecording(true);
//     recognitionRef.current.start();
//   };

//   const stopRecording = () => {
//     setIsRecording(false);
//     recognitionRef.current.stop();
//   };

//   return (
//     <div className="speech-to-text-container">
//       <h2>Speech to Text Converter</h2>
//       <button onClick={isRecording ? stopRecording : startRecording}>
//         {isRecording ? "Stop Recording" : "Start Recording"}
//       </button>
//       <div className="transcript-container">
//         <h3>Transcript:</h3>
//         <p>{transcript}</p>
//       </div>
//     </div>
//   );
// };

// export default SpeechToText;
