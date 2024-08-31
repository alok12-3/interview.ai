// // // src/UploadVideo.js
// // import React, { useState } from "react";
// // import axios from "axios";

// // const UploadVideo = () => {
// //   const [file, setFile] = useState(null);
// //   const [response, setResponse] = useState(null);
// //   const [error, setError] = useState(null);

// //   const handleFileChange = (event) => {
// //     setFile(event.target.files[0]);
// //   };

// //   const handleSubmit = async (event) => {
// //     event.preventDefault();
// //     if (!file) {
// //       setError("Please upload a video file.");
// //       return;
// //     }

// //     const formData = new FormData();
// //     formData.append("video", file);

// //     try {
// //       const res = await axios.post(
// //         "http://localhost:3000/trigger-video-processing",
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
// //       <h1>Upload Video</h1>
// //       <form onSubmit={handleSubmit}>
// //         <input type="file" accept="video/*" onChange={handleFileChange} />
// //         <button type="submit">Upload</button>
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

//***************************************************************************** */

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

//   // Start recording
//   const startRecording = async () => {
//     setError(null);
//     try {
//       const stream = await navigator.mediaDevices.getUserMedia({ video: true });
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
//       console.error(err);
//     }
//   };

//   // Stop recording
//   const stopRecording = () => {
//     if (mediaRecorderRef.current) {
//       mediaRecorderRef.current.stop();
//       if (streamRef.current) {
//         streamRef.current.getTracks().forEach((track) => track.stop());
//       }
//       setIsRecording(false);
//     }
//   };

//   // Upload recorded video
//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     if (!file) {
//       setError("Please record a video.");
//       return;
//     }

//     const formData = new FormData();
//     formData.append("video", file);

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
//       console.error(err);
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

import React, { useState, useRef } from "react";
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

  // Start recording with 25 FPS
  const startRecording = async () => {
    setError(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { frameRate: { ideal: 25, max: 25 } }, // Setting frame rate to 25 FPS
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
      console.error(err);
    }
  };

  // Stop recording
  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
      }
      setIsRecording(false);
    }
  };

  // Upload recorded video
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!file) {
      setError("Please record a video.");
      return;
    }

    const formData = new FormData();
    formData.append("video", file);

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
      console.error(err);
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

//*********************************************************************************************

// import React, { useState, useRef } from "react";
// import axios from "axios";
// import { createFFmpeg, fetchFile } from "@ffmpeg/ffmpeg";

// const ffmpeg = createFFmpeg({ log: true });

// const UploadVideo = () => {
//   const [file, setFile] = useState(null);
//   const [response, setResponse] = useState(null);
//   const [error, setError] = useState(null);
//   const [isRecording, setIsRecording] = useState(false);
//   const [recordedBlob, setRecordedBlob] = useState(null);
//   const videoRef = useRef(null);
//   const mediaRecorderRef = useRef(null);
//   const streamRef = useRef(null);

//   const loadFFmpeg = async () => {
//     if (!ffmpeg.isLoaded()) {
//       await ffmpeg.load();
//     }
//   };

//   const startRecording = async () => {
//     setError(null);
//     try {
//       const stream = await navigator.mediaDevices.getUserMedia({ video: true });
//       streamRef.current = stream;
//       videoRef.current.srcObject = stream;
//       videoRef.current.play();

//       mediaRecorderRef.current = new MediaRecorder(stream);
//       mediaRecorderRef.current.ondataavailable = (event) => {
//         if (event.data.size > 0) {
//           setFile(new Blob([event.data], { type: "video/webm" }));
//           setRecordedBlob(URL.createObjectURL(event.data));
//         }
//       };
//       mediaRecorderRef.current.start();
//       setIsRecording(true);
//     } catch (err) {
//       setError("Error accessing camera.");
//       console.error(err);
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

//   const convertToMP4 = async (webmBlob) => {
//     await loadFFmpeg();

//     const webmFile = new File([webmBlob], "video.webm", { type: "video/webm" });
//     const inputFile = await fetchFile(webmFile);
//     ffmpeg.FS("writeFile", "input.webm", new Uint8Array(inputFile));

//     await ffmpeg.run("-i", "input.webm", "output.mp4");
//     const data = ffmpeg.FS("readFile", "output.mp4");

//     const mp4Blob = new Blob([data.buffer], { type: "video/mp4" });
//     return URL.createObjectURL(mp4Blob);
//   };

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     if (!recordedBlob) {
//       setError("Please record a video.");
//       return;
//     }

//     try {
//       const mp4BlobURL = await convertToMP4(file);
//       const mp4Blob = await fetch(mp4BlobURL).then((res) => res.blob());

//       const formData = new FormData();
//       formData.append("video", mp4Blob, "video.mp4");

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
//       console.error(err);
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
