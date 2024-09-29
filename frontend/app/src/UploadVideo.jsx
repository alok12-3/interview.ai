// // // import React, { useState, useRef } from "react";
// // // import axios from "axios";

// // // const UploadVideo = () => {
// // //   const [file, setFile] = useState(null);
// // //   const [response, setResponse] = useState(null);
// // //   const [error, setError] = useState(null);
// // //   const [isRecording, setIsRecording] = useState(false);
// // //   const [recordedBlob, setRecordedBlob] = useState(null);
// // //   const videoRef = useRef(null);
// // //   const mediaRecorderRef = useRef(null);
// // //   const streamRef = useRef(null);

// // //   const startRecording = async () => {
// // //     setError(null);
// // //     try {
// // //       const stream = await navigator.mediaDevices.getUserMedia({
// // //         video: { frameRate: { ideal: 25, max: 25 } }, // Setting frame rate to 25 FPS
// // //       });
// // //       streamRef.current = stream;
// // //       videoRef.current.srcObject = stream;
// // //       videoRef.current.play();

// // //       mediaRecorderRef.current = new MediaRecorder(stream);
// // //       mediaRecorderRef.current.ondataavailable = (event) => {
// // //         if (event.data.size > 0) {
// // //           setRecordedBlob(URL.createObjectURL(event.data));
// // //           setFile(new Blob([event.data], { type: "video/webm" }));
// // //         }
// // //       };
// // //       mediaRecorderRef.current.start();
// // //       setIsRecording(true);
// // //     } catch (err) {
// // //       setError("Error accessing camera.");
// // //       console.error(err);
// // //     }
// // //   };

// // //   const stopRecording = () => {
// // //     if (mediaRecorderRef.current) {
// // //       mediaRecorderRef.current.stop();
// // //       if (streamRef.current) {
// // //         streamRef.current.getTracks().forEach((track) => track.stop());
// // //       }
// // //       setIsRecording(false);
// // //     }
// // //   };

// // //   const handleSubmit = async (event) => {
// // //     event.preventDefault();
// // //     if (!file) {
// // //       setError("Please record a video.");
// // //       return;
// // //     }

// // //     const formData = new FormData();
// // //     formData.append("video", file);

// // //     try {
// // //       const res = await axios.post(
// // //         "http://165.22.217.74/trigger-video-processing",
// // //         formData,
// // //         {
// // //           headers: {
// // //             "Content-Type": "multipart/form-data",
// // //           },
// // //         }
// // //       );
// // //       setResponse(res.data);
// // //       setError(null);
// // //     } catch (err) {
// // //       setError("Error uploading video.");
// // //       console.error(err);
// // //     }
// // //   };

// // //   return (
// // //     <div>
// // //       <h1>Record and Upload Video</h1>
// // //       <div>
// // //         <video ref={videoRef} width="640" height="480" autoPlay muted />
// // //       </div>
// // //       <div>
// // //         {isRecording ? (
// // //           <button onClick={stopRecording}>Stop Recording</button>
// // //         ) : (
// // //           <button onClick={startRecording}>Start Recording</button>
// // //         )}
// // //       </div>
// // //       {recordedBlob && !isRecording && (
// // //         <div>
// // //           <h2>Preview</h2>
// // //           <video width="640" height="480" controls src={recordedBlob} />
// // //         </div>
// // //       )}
// // //       <form onSubmit={handleSubmit}>
// // //         <button type="submit" disabled={!recordedBlob}>
// // //           Upload
// // //         </button>
// // //       </form>
// // //       {response && (
// // //         <div>
// // //           <h2>Processing Result</h2>
// // //           <pre>{JSON.stringify(response, null, 2)}</pre>
// // //         </div>
// // //       )}
// // //       {error && <p style={{ color: "red" }}>{error}</p>}
// // //     </div>
// // //   );
// // // };

// // // export default UploadVideo;

// // import React, { useState, useRef } from "react";
// // import axios from "axios";

// // const UploadVideo = () => {
// //   const [file, setFile] = useState(null);
// //   const [response, setResponse] = useState(null);
// //   const [error, setError] = useState(null);
// //   const [isRecording, setIsRecording] = useState(false);
// //   const [recordedBlob, setRecordedBlob] = useState(null);
// //   const videoRef = useRef(null);
// //   const mediaRecorderRef = useRef(null);
// //   const streamRef = useRef(null);

// //   const startRecording = async () => {
// //     setError(null);
// //     try {
// //       const stream = await navigator.mediaDevices.getUserMedia({
// //         video: { frameRate: { ideal: 25, max: 25 } }, // Setting frame rate to 25 FPS
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
// //     } catch (err) {
// //       setError("Error accessing camera.");
// //       console.error(err);
// //     }
// //   };

// //   const stopRecording = () => {
// //     if (mediaRecorderRef.current) {
// //       mediaRecorderRef.current.stop();
// //       if (streamRef.current) {
// //         streamRef.current.getTracks().forEach((track) => track.stop());
// //       }
// //       setIsRecording(false);
// //     }
// //   };

// //   const handleSubmit = async (event) => {
// //     event.preventDefault();
// //     if (!file) {
// //       setError("Please record a video.");
// //       return;
// //     }

// //     const formData = new FormData();
// //     formData.append("video", file);

// //     try {
// //       const res = await axios.post(
// //         "http://165.22.217.74/trigger-video-processing",
// //         formData,
// //         {
// //           headers: {
// //             "Content-Type": "multipart/form-data",
// //           },
// //         }
// //       );
// //       setResponse(res.data);
// //       setError(null);
// //     } catch (err) {
// //       setError("Error uploading video.");
// //       console.error(err);
// //     }
// //   };

// //   return (
// //     <div>
// //       <h1>Record and Upload Video</h1>
// //       <div>
// //         <video ref={videoRef} width="640" height="480" autoPlay muted />
// //       </div>
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
// //       <form onSubmit={handleSubmit}>
// //         <button type="submit" disabled={!recordedBlob}>
// //           Upload
// //         </button>
// //       </form>
// //       {response && (
// //         <div>
// //           <h2>Processing Result</h2>
// //           <pre>{JSON.stringify(response, null, 2)}</pre>
// //         </div>
// //       )}
// //       {error && <p style={{ color: "red" }}>{error}</p>}
// //     </div>
// //   );
// // };

// // export default UploadVideo;

// import React, { useState, useRef } from "react";
// import axios from "axios";

// const UploadVideo = () => {
//   const [file, setFile] = useState(null);
//   const [response, setResponse] = useState(null);
//   const [error, setError] = useState(null);
//   const [isRecording, setIsRecording] = useState(false);
//   const [recordedBlob, setRecordedBlob] = useState(null);
//   const videoRef = useRef(null);
//   const mediaRecorderRef = useRef(null);
//   const streamRef = useRef(null);

//   const userEmail = localStorage.getItem("email");

//   const startRecording = async () => {
//     setError(null);
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
//     } catch (err) {
//       setError("Error accessing camera.");
//     }
//   };

//   const stopRecording = () => {
//     if (mediaRecorderRef.current) {
//       mediaRecorderRef.current.stop();
//       if (streamRef.current) {
//         streamRef.current.getTracks().forEach((track) => track.stop());
//       }
//       setIsRecording(false);
//     }
//   };

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     if (!file) {
//       setError("Please record a video.");
//       return;
//     }

//     const formData = new FormData();
//     formData.append("video", file);
//     formData.append("email", userEmail); // Add email to the request

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
//       <h1>Record and Upload Video</h1>
//       <div>
//         <video ref={videoRef} width="640" height="480" autoPlay muted />
//       </div>
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
//       <form onSubmit={handleSubmit}>
//         <button type="submit" disabled={!recordedBlob}>
//           Upload
//         </button>
//       </form>
//       {response && (
//         <div>
//           <h2>Processing Result</h2>
//           <pre>{JSON.stringify(response, null, 2)}</pre>
//         </div>
//       )}
//       {error && <p style={{ color: "red" }}>{error}</p>}
//     </div>
//   );
// };

// export default UploadVideo;

import React, { useState, useRef, useEffect } from "react";
import axios from "axios";

const UploadVideo = () => {
  const [file, setFile] = useState(null);
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const [recordedBlob, setRecordedBlob] = useState(null);
  const videoRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const streamRef = useRef(null);
  const [userId, setUserId] = useState(null); // New state for userId

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
    setError(null);
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
    } catch (err) {
      setError("Error accessing camera.");
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
      }
      setIsRecording(false);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
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
    formData.append("email", userEmail); // Add email to the request
    formData.append("userId", userId); // Send userId as well

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
      setResponse(res.data);
      setError(null);
    } catch (err) {
      setError("Error uploading video.");
    }
  };

  return (
    <div>
      <h1>Record and Upload Video</h1>
      <div>
        <video ref={videoRef} width="640" height="480" autoPlay muted />
      </div>
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
      <form onSubmit={handleSubmit}>
        <button type="submit" disabled={!recordedBlob}>
          Upload
        </button>
      </form>
      {response && (
        <div>
          <h2>Processing Result</h2>
          <pre>{JSON.stringify(response, null, 2)}</pre>
        </div>
      )}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default UploadVideo;
