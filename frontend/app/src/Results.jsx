// // import React, { useState, useEffect } from "react";
// // import axios from "axios";

// // const Results = () => {
// //   const [userId, setUserId] = useState(null);
// //   const [history, setHistory] = useState([]);
// //   const [error, setError] = useState(null);
// //   const [selectedResult, setSelectedResult] = useState(null); // State to handle the selected result for view

// //   const userEmail = localStorage.getItem("email");

// //   // Fetch userId from backend using the stored email
// //   useEffect(() => {
// //     const fetchUserId = async () => {
// //       try {
// //         const res = await axios.get("http://localhost:3000/api/details", {
// //           params: { email: userEmail },
// //         });
// //         setUserId(res.data.userId); // Set the userId state
// //       } catch (err) {
// //         setError("Error fetching user details.");
// //       }
// //     };

// //     if (userEmail) {
// //       fetchUserId();
// //     }
// //   }, [userEmail]);

// //   // Fetch history for the user
// //   useEffect(() => {
// //     const fetchHistory = async () => {
// //       try {
// //         if (userId) {
// //           const res = await axios.get(
// //             "http://localhost:3000/api/user/history",
// //             {
// //               params: { userId },
// //             }
// //           );
// //           setHistory(res.data);
// //         }
// //       } catch (err) {
// //         setError("Error fetching history.");
// //       }
// //     };

// //     if (userId) {
// //       fetchHistory();
// //     }
// //   }, [userId]);

// //   const handleViewResult = (result) => {
// //     setSelectedResult(result);
// //   };

// //   return (
// //     <div className="history-container">
// //       <h2>Video Processing History</h2>
// //       {error && <p className="error">{error}</p>}

// //       {history.length === 0 ? (
// //         <p>No history found for this user.</p>
// //       ) : (
// //         <ul className="history-list">
// //           {history.map((item) => (
// //             <li key={item._id} className="history-item">
// //               <div>
// //                 <strong>Question:</strong> {item.question}
// //               </div>
// //               <button onClick={() => handleViewResult(item)}>
// //                 View Result
// //               </button>
// //             </li>
// //           ))}
// //         </ul>
// //       )}

// //       {selectedResult && (
// //         <div className="result-details">
// //           <h3>Result Details</h3>
// //           <p>
// //             <strong>Question:</strong> {selectedResult.question}
// //           </p>
// //           <p>
// //             <strong>User Response:</strong> {selectedResult.userResponse}
// //           </p>
// //           <p>
// //             <strong>Gemini Result:</strong> {selectedResult.geminiResult}
// //           </p>

// //           <h4>Emotion Analysis</h4>
// //           <div>
// //             <strong>Dominant Emotion:</strong>{" "}
// //             {selectedResult.resultJson.analysis_result.dominant_emotion}
// //           </div>
// //           <div>
// //             <strong>FPS:</strong> {selectedResult.resultJson.fps}
// //           </div>
// //           <div>
// //             <strong>Total Frames:</strong>{" "}
// //             {selectedResult.resultJson.total_frames}
// //           </div>
// //           {/* Add more detailed frame-based emotion data here if available */}
// //         </div>
// //       )}
// //     </div>
// //   );
// // };

// // export default Results;

// import React, { useState, useEffect } from "react";
// import axios from "axios";

// // Function to format the Gemini result by replacing markdown-style bold and italics
// function formatGeminiResponse(text) {
//   // First replace bold and italic text, then handle new line
//   const formattedText = text
//     .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>") // Bold text
//     .replace(/\*(.*?)\*/g, "<em>$1</em>") // Italic text
//     .replace(/\n/g, "<br>") // Line breaks from text
//     .replace(/ \* /g, "<br>"); // A single * treated as a new line indicator

//   return formattedText;
// }

// const Results = () => {
//   const [userId, setUserId] = useState(null);
//   const [history, setHistory] = useState([]);
//   const [selectedResult, setSelectedResult] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   const userEmail = localStorage.getItem("email");

//   // Fetch userId from backend using the stored email
//   useEffect(() => {
//     const fetchUserId = async () => {
//       if (!userEmail) {
//         setError("No user email found.");
//         return;
//       }

//       setLoading(true);
//       try {
//         const res = await axios.get("http://localhost:3000/api/details", {
//           params: { email: userEmail },
//         });
//         setUserId(res.data.userId);
//       } catch (err) {
//         setError("Error fetching user details.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchUserId();
//   }, [userEmail]);

//   // Fetch history for the user
//   useEffect(() => {
//     const fetchHistory = async () => {
//       if (!userId) return;

//       setLoading(true);
//       try {
//         const res = await axios.get("http://localhost:3000/api/user/history", {
//           params: { userId },
//         });
//         setHistory(res.data);
//       } catch (err) {
//         setError("Error fetching history.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchHistory();
//   }, [userId]);

//   const handleViewResult = (result) => {
//     setSelectedResult(result);
//   };

//   return (
//     <div className="history-container">
//       <h2>Video Processing History</h2>

//       {/* Display loading spinner or message */}
//       {loading && <p>Loading...</p>}

//       {/* Error handling */}
//       {error && <div className="error-message">{error}</div>}

//       {/* Display history list or no history message */}
//       {!loading && !error && history.length === 0 && (
//         <p>No history found for this user.</p>
//       )}

//       {!loading && history.length > 0 && (
//         <ul className="history-list">
//           {history.map((item) => (
//             <li key={item._id} className="history-item">
//               <div>
//                 <strong>Question:</strong> {item.question}
//               </div>
//               <button onClick={() => handleViewResult(item)}>
//                 View Result
//               </button>
//             </li>
//           ))}
//         </ul>
//       )}

//       {/* Display selected result details */}
//       {selectedResult && (
//         <div className="result-details">
//           <h3>Result Details</h3>
//           <p>
//             <strong>Question:</strong> {selectedResult.question}
//           </p>
//           <p>
//             <strong>User Response:</strong> {selectedResult.userResponse}
//           </p>
//           <p>
//             <strong>Gemini Result:</strong>{" "}
//             <span
//               dangerouslySetInnerHTML={{
//                 __html: formatGeminiResponse(selectedResult.geminiResult),
//               }}
//             />
//           </p>

//           {/* Emotion Analysis Section */}
//           <h4>Emotion Analysis</h4>
//           <div>
//             <ul>
//               <li>
//                 Anxiety:{" "}
//                 {selectedResult.resultJson?.analysis_result?.dominant_emotions
//                   ?.fear || "N/A"}
//               </li>
//               <li>
//                 Happy:{" "}
//                 {selectedResult.resultJson?.analysis_result?.dominant_emotions
//                   ?.happy || "N/A"}
//               </li>
//               <li>
//                 Sad:{" "}
//                 {selectedResult.resultJson?.analysis_result?.dominant_emotions
//                   ?.sad || "N/A"}
//               </li>
//             </ul>
//           </div>
//           <div>
//             <strong>FPS:</strong> {selectedResult.resultJson?.fps || "N/A"}
//           </div>
//           <div>
//             <strong>Total Frames:</strong>{" "}
//             {selectedResult.resultJson?.total_frames || "N/A"}
//           </div>
//           {/* You can add more details or graphs for frame-by-frame analysis */}
//         </div>
//       )}
//     </div>
//   );
// };

// export default Results;

import React, { useState, useEffect } from "react";
import axios from "axios";

// Function to format the Gemini result by replacing markdown-style bold and italics
function formatGeminiResponse(text) {
  const formattedText = text
    .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>") // Bold text
    .replace(/\*(.*?)\*/g, "<em>$1</em>") // Italic text
    .replace(/\n/g, "<br>") // Line breaks from text
    .replace(/ \* /g, "<br>"); // A single * treated as a new line indicator

  return formattedText;
}

const Results = () => {
  const [userId, setUserId] = useState(null);
  const [history, setHistory] = useState([]);
  const [selectedResult, setSelectedResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const userEmail = localStorage.getItem("email");

  // Fetch userId from backend using the stored email
  useEffect(() => {
    const fetchUserId = async () => {
      if (!userEmail) {
        setError("No user email found.");
        return;
      }

      setLoading(true);
      try {
        const res = await axios.get("http://localhost:3000/api/details", {
          params: { email: userEmail },
        });
        setUserId(res.data.userId);
      } catch (err) {
        setError("Error fetching user details.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserId();
  }, [userEmail]);

  // Fetch history for the user
  useEffect(() => {
    const fetchHistory = async () => {
      if (!userId) return;

      setLoading(true);
      try {
        const res = await axios.get("http://localhost:3000/api/user/history", {
          params: { userId },
        });
        setHistory(res.data);
      } catch (err) {
        setError("Error fetching history.");
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, [userId]);

  const handleViewResult = (result) => {
    setSelectedResult(result);
  };

  const calculatePercentage = (emotionCount, totalFrames) => {
    if (totalFrames === 0) return 0;
    return ((emotionCount / totalFrames) * 100).toFixed(2);
  };

  const calculateNeutral = (fear, happy, sad, totalFrames) => {
    const fearPercentage = calculatePercentage(fear, totalFrames);
    const happyPercentage = calculatePercentage(happy, totalFrames);
    const sadPercentage = calculatePercentage(sad, totalFrames);

    // Calculate neutral percentage by subtracting from 100
    const neutral = (
      100 -
      (parseFloat(fearPercentage) +
        parseFloat(happyPercentage) +
        parseFloat(sadPercentage))
    ).toFixed(2);

    return neutral > 0 ? neutral : "0.00"; // Avoid negative values
  };

  return (
    <div className="history-container">
      <h2>Video Processing History</h2>

      {/* Display loading spinner or message */}
      {loading && <p>Loading...</p>}

      {/* Error handling */}
      {error && <div className="error-message">{error}</div>}

      {/* Display history list or no history message */}
      {!loading && !error && history.length === 0 && (
        <p>No history found for this user.</p>
      )}

      {!loading && history.length > 0 && (
        <ul className="history-list">
          {history.map((item) => (
            <li key={item._id} className="history-item">
              <div>
                <strong>Question:</strong> {item.question}
              </div>
              <button onClick={() => handleViewResult(item)}>
                View Result
              </button>
            </li>
          ))}
        </ul>
      )}

      {/* Display selected result details */}
      {selectedResult && (
        <div className="result-details">
          <h3>Result Details</h3>
          <p>
            <strong>Question:</strong> {selectedResult.question}
          </p>
          <p>
            <strong>User Response:</strong> {selectedResult.userResponse}
          </p>
          <p>
            <strong>Gemini Result:</strong>{" "}
            <span
              dangerouslySetInnerHTML={{
                __html: formatGeminiResponse(selectedResult.geminiResult),
              }}
            />
          </p>

          {/* Emotion Analysis Section */}
          <h4>Emotion Analysis</h4>
          <div>
            <strong>Fear:</strong>{" "}
            {calculatePercentage(
              selectedResult.resultJson?.analysis_result?.dominant_emotions
                ?.fear,
              selectedResult.resultJson?.total_frames
            )}
            %
          </div>
          <div>
            <strong>Happy:</strong>{" "}
            {calculatePercentage(
              selectedResult.resultJson?.analysis_result?.dominant_emotions
                ?.happy,
              selectedResult.resultJson?.total_frames
            )}
            %
          </div>
          <div>
            <strong>Sad:</strong>{" "}
            {calculatePercentage(
              selectedResult.resultJson?.analysis_result?.dominant_emotions
                ?.sad,
              selectedResult.resultJson?.total_frames
            )}
            %
          </div>
          <div>
            <strong>Neutral:</strong>{" "}
            {calculateNeutral(
              selectedResult.resultJson?.analysis_result?.dominant_emotions
                ?.fear,
              selectedResult.resultJson?.analysis_result?.dominant_emotions
                ?.happy,
              selectedResult.resultJson?.analysis_result?.dominant_emotions
                ?.sad,
              selectedResult.resultJson?.total_frames
            )}
            %
          </div>
        </div>
      )}
    </div>
  );
};

export default Results;
