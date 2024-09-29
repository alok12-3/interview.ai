// // import React, { useState, useRef, useEffect } from "react";
// // import axios from "axios";

// // const SpeechRecognition =
// //   window.SpeechRecognition || window.webkitSpeechRecognition;
// // const recognition = new SpeechRecognition();

// // recognition.continuous = true;
// // recognition.interimResults = true;
// // recognition.lang = "en-US";

// // const UploadVideoAndSpeech = ({ question }) => {
// //   const [file, setFile] = useState(null);
// //   const [transcript, setTranscript] = useState("");
// //   const [isListening, setIsListening] = useState(false);
// //   const [isRecording, setIsRecording] = useState(false);
// //   const [recordedBlob, setRecordedBlob] = useState(null);
// //   const videoRef = useRef(null);
// //   const mediaRecorderRef = useRef(null);
// //   const streamRef = useRef(null);
// //   const userEmail = localStorage.getItem("email");

// //   // Start recording video
// //   const startRecording = async () => {
// //     try {
// //       const stream = await navigator.mediaDevices.getUserMedia({
// //         video: { frameRate: { ideal: 25, max: 25 } },
// //       });
// //       streamRef.current = stream;
// //       videoRef.current.srcObject = stream;
// //       videoRef.current.play();

// //       mediaRecorderRef.current = new MediaRecorder(stream);
// //       mediaRecorderRef.current.ondataavailable = (event) => {
// //         if (event.data.size > 0) {
// //           setRecordedBlob(URL.createObjectURL(event.data));
// //           setFile(new Blob([event.data], { type: "video/webm" }));
// //         }
// //       };
// //       mediaRecorderRef.current.start();
// //       setIsRecording(true);

// //       // Start speech-to-text
// //       setIsListening(true);
// //       recognition.start();
// //     } catch (err) {
// //       console.error("Error accessing camera.", err);
// //     }
// //   };

// //   const stopRecording = () => {
// //     if (mediaRecorderRef.current) {
// //       mediaRecorderRef.current.stop();
// //       if (streamRef.current) {
// //         streamRef.current.getTracks().forEach((track) => track.stop());
// //       }
// //       setIsRecording(false);

// //       // Stop speech-to-text
// //       recognition.stop();
// //       setIsListening(false);
// //     }
// //   };

// //   useEffect(() => {
// //     recognition.onresult = (event) => {
// //       let interim = "";
// //       let final = "";

// //       for (let i = event.resultIndex; i < event.results.length; i++) {
// //         const transcriptPart = event.results[i][0].transcript;

// //         if (event.results[i].isFinal) {
// //           final += transcriptPart + " ";
// //         } else {
// //           interim += transcriptPart;
// //         }
// //       }

// //       setTranscript((prevTranscript) => prevTranscript + final);
// //     };

// //     recognition.onerror = (event) => {
// //       console.error("Speech Recognition Error", event.error);
// //     };

// //     return () => {
// //       recognition.stop();
// //     };
// //   }, []);

// //   const handleSubmit = async () => {
// //     const formData = new FormData();
// //     formData.append("video", file);
// //     formData.append("email", userEmail);
// //     formData.append("question", question); // Send the attempted question
// //     formData.append("userResponse", transcript); // Send the spoken response

// //     try {
// //       const res = await axios.post("http://localhost:3000/trigger-video-processing", formData, {
// //         headers: {
// //           "Content-Type": "multipart/form-data",
// //         },
// //       });
// //       console.log("Upload successful:", res.data);
// //     } catch (err) {
// //       console.error("Error uploading:", err);
// //     }
// //   };

// //   return (
// //     <div>
// //       <h3>Attempting Question: {question}</h3>
// //       <video ref={videoRef} width="640" height="480" autoPlay muted />
// //       <div>
// //         {isRecording ? (
// //           <button onClick={stopRecording}>Stop Recording</button>
// //         ) : (
// //           <button onClick={startRecording}>Start Recording</button>
// //         )}
// //       </div>
// //       {recordedBlob && !isRecording && (
// //         <div>
// //           <h2>Preview</h2>
// //           <video width="640" height="480" controls src={recordedBlob} />
// //         </div>
// //       )}
// //       <p>Transcript: {transcript}</p>
// //       <button onClick={handleSubmit} disabled={!recordedBlob || !transcript}>
// //         Submit Attempt
// //       </button>
// //     </div>
// //   );
// // };

// // export default UploadVideoAndSpeech;

import React, { useState, useRef, useEffect } from "react";
import axios from "axios";

const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

recognition.continuous = true;
recognition.interimResults = true;
recognition.lang = "en-US";

const UploadVideoAndSpeech = ({ question }) => {
  const [file, setFile] = useState(null);
  const [transcript, setTranscript] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [recordedBlob, setRecordedBlob] = useState(null);
  const [userId, setUserId] = useState(null); // New state for userId
  const [error, setError] = useState(null); // Error state
  const videoRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const streamRef = useRef(null);
  const userEmail = localStorage.getItem("email");

  // Fetch userId from backend using the stored email
  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/details", {
          params: { email: userEmail },
        });
        setUserId(res.data.userId); // Set the userId state
      } catch (err) {
        setError("Error fetching user details.");
      }
    };

    if (userEmail) {
      fetchUserId();
    }
  }, [userEmail]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { frameRate: { ideal: 25, max: 25 } },
      });
      streamRef.current = stream;
      videoRef.current.srcObject = stream;
      videoRef.current.play();

      mediaRecorderRef.current = new MediaRecorder(stream);
      mediaRecorderRef.current.ondataavailable = (event) => {
        if (event.data.size > 0) {
          setRecordedBlob(URL.createObjectURL(event.data));
          setFile(new Blob([event.data], { type: "video/webm" }));
        }
      };
      mediaRecorderRef.current.start();
      setIsRecording(true);

      setIsListening(true);
      recognition.start();
    } catch (err) {
      console.error("Error accessing camera.", err);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
      }
      setIsRecording(false);

      recognition.stop();
      setIsListening(false);
    }
  };

  useEffect(() => {
    recognition.onresult = (event) => {
      let interim = "";
      let final = "";

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcriptPart = event.results[i][0].transcript;

        if (event.results[i].isFinal) {
          final += transcriptPart + " ";
        } else {
          interim += transcriptPart;
        }
      }

      setTranscript((prevTranscript) => prevTranscript + final);
    };

    recognition.onerror = (event) => {
      console.error("Speech Recognition Error", event.error);
    };

    return () => {
      recognition.stop();
    };
  }, []);

  const handleSubmit = async () => {
    if (!file) {
      setError("Please record a video.");
      return;
    }

    if (!userId) {
      setError("User ID not found.");
      return;
    }

    const formData = new FormData();
    formData.append("video", file);
    formData.append("userId", userId); // Add userId to the form data
    formData.append("question", question);
    formData.append("userResponse", transcript);

    try {
      const res = await axios.post(
        "http://localhost:3000/trigger-video-processing",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Upload successful:", res.data);
    } catch (err) {
      console.error("Error uploading:", err);
      setError("Error uploading video.");
    }
  };

  return (
    <div>
      <h3>Attempting Question: {question}</h3>
      <video ref={videoRef} width="640" height="480" autoPlay muted />
      <div>
        {isRecording ? (
          <button onClick={stopRecording}>Stop Recording</button>
        ) : (
          <button onClick={startRecording}>Start Recording</button>
        )}
      </div>
      {recordedBlob && !isRecording && (
        <div>
          <h2>Preview</h2>
          <video width="640" height="480" controls src={recordedBlob} />
        </div>
      )}
      <p>Transcript: {transcript}</p>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <button onClick={handleSubmit} disabled={!recordedBlob || !transcript}>
        Submit Attempt
      </button>
    </div>
  );
};

export default UploadVideoAndSpeech;

// import React, { useState, useRef, useEffect } from "react";
// import axios from "axios";

// const SpeechRecognition =
//   window.SpeechRecognition || window.webkitSpeechRecognition;
// const recognition = new SpeechRecognition();

// recognition.continuous = true;
// recognition.interimResults = true;
// recognition.lang = "en-US";

// const UploadVideoAndSpeech = () => {
//   const [file, setFile] = useState(null);
//   const [transcript, setTranscript] = useState("");
//   const [isListening, setIsListening] = useState(false);
//   const [isRecording, setIsRecording] = useState(false);
//   const [recordedBlob, setRecordedBlob] = useState(null);
//   const [userId, setUserId] = useState(null);
//   const [error, setError] = useState(null);
//   const [response, setResponse] = useState(null); // New state for response from backend
//   const videoRef = useRef(null);
//   const mediaRecorderRef = useRef(null);
//   const streamRef = useRef(null);
//   const userEmail = localStorage.getItem("email");

//   useEffect(() => {
//     const fetchUserId = async () => {
//       try {
//         const res = await axios.get("http://localhost:3000/api/details", {
//           params: { email: userEmail },
//         });
//         setUserId(res.data.userId);
//       } catch (err) {
//         setError("Error fetching user details.");
//       }
//     };

//     if (userEmail) {
//       fetchUserId();
//     }
//   }, [userEmail]);

//   const startRecording = async () => {
//     try {
//       const stream = await navigator.mediaDevices.getUserMedia({
//         video: { frameRate: { ideal: 25, max: 25 } },
//       });
//       streamRef.current = stream;
//       videoRef.current.srcObject = stream;
//       videoRef.current.play();

//       mediaRecorderRef.current = new MediaRecorder(stream);
//       mediaRecorderRef.current.ondataavailable = (event) => {
//         if (event.data.size > 0) {
//           setRecordedBlob(URL.createObjectURL(event.data));
//           setFile(new Blob([event.data], { type: "video/webm" }));
//         }
//       };
//       mediaRecorderRef.current.start();
//       setIsRecording(true);
//       setIsListening(true);
//       recognition.start();
//     } catch (err) {
//       console.error("Error accessing camera.", err);
//     }
//   };

//   const stopRecording = () => {
//     if (mediaRecorderRef.current) {
//       mediaRecorderRef.current.stop();
//       if (streamRef.current) {
//         streamRef.current.getTracks().forEach((track) => track.stop());
//       }
//       setIsRecording(false);
//       recognition.stop();
//       setIsListening(false);
//     }
//   };

//   useEffect(() => {
//     recognition.onresult = (event) => {
//       let interim = "";
//       let final = "";

//       for (let i = event.resultIndex; i < event.results.length; i++) {
//         const transcriptPart = event.results[i][0].transcript;

//         if (event.results[i].isFinal) {
//           final += transcriptPart + " ";
//         } else {
//           interim += transcriptPart;
//         }
//       }

//       setTranscript((prevTranscript) => prevTranscript + final);
//     };

//     recognition.onerror = (event) => {
//       console.error("Speech Recognition Error", event.error);
//     };

//     return () => {
//       recognition.stop();
//     };
//   }, []);

//   const handleSubmit = async (event) => {
//     event.preventDefault(); // Prevent default form submission
//     if (!file) {
//       setError("Please record a video.");
//       return;
//     }

//     if (!userId) {
//       setError("User ID not found.");
//       return;
//     }

//     const formData = new FormData();
//     formData.append("video", file);
//     formData.append("email", userEmail); // Add email to the request
//     formData.append("userId", userId); // Send userId as well

//     try {
//       const res = await axios.post(
//         "http://localhost:3000/trigger-video-processing",
//         formData,
//         {
//           headers: {
//             "Content-Type": "multipart/form-data",
//           },
//         }
//       );
//       setResponse(res.data);
//       setError(null);
//     } catch (err) {
//       setError("Error uploading video.");
//     }
//   };

//   return (
//     <div>
//       <h3>Upload Video</h3>
//       <video ref={videoRef} width="640" height="480" autoPlay muted />
//       <div>
//         {isRecording ? (
//           <button onClick={stopRecording}>Stop Recording</button>
//         ) : (
//           <button onClick={startRecording}>Start Recording</button>
//         )}
//       </div>
//       {recordedBlob && !isRecording && (
//         <div>
//           <h2>Preview</h2>
//           <video width="640" height="480" controls src={recordedBlob} />
//         </div>
//       )}
//       <p>Transcript: {transcript}</p>
//       {error && <p style={{ color: "red" }}>{error}</p>}
//       <button onClick={handleSubmit} disabled={!recordedBlob || !transcript}>
//         Submit Attempt
//       </button>
//       {response && <p>{JSON.stringify(response)}</p>}{" "}
//       {/* Display backend response */}
//     </div>
//   );
// };

// export default UploadVideoAndSpeech;
