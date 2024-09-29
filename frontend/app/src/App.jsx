// // src/App.js
// import React from "react";
// import UploadVideo from "./UploadVideo";
// import SpeechToText from "./SpeechToText";
// import GeminiApiComponent from "./resinput";
// import PdfUploader from "./PdfText";

// function App() {
//   return (
//     <div className="App">
//       <PdfUploader />
//       <GeminiApiComponent />
//       <SpeechToText />
//       <UploadVideo />
//     </div>
//   );
// }

// export default App;

import React, { useState, useEffect } from "react";
import UploadVideo from "./UploadVideo";
import Login from "./Authentication/Login";
import Signup from "./Authentication/Signup";
import SpeechToText from "./SpeechToText";
import GeminiApiComponent from "./resinput";
import PdfUploader from "./PdfText";
import Results from "./Results";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState(
    localStorage.getItem("email") || ""
  );

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  if (!isLoggedIn) {
    return (
      <div>
        <Login setIsLoggedIn={setIsLoggedIn} setUserEmail={setUserEmail} />
        <Signup setIsLoggedIn={setIsLoggedIn} setUserEmail={setUserEmail} />
      </div>
    );
  }

  return (
    <div className="App">
      <h1>Welcome, {userEmail}</h1>

      <GeminiApiComponent />

      <Results />
    </div>
  );
}

export default App;
