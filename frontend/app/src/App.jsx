// src/App.js
import React from "react";
import UploadVideo from "./UploadVideo";
import SpeechToText from "./SpeechToText";

function App() {
  return (
    <div className="App">
      <SpeechToText />
      <UploadVideo />
    </div>
  );
}

export default App;
