import React, { useState, useEffect } from "react";

const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

recognition.continuous = true;
recognition.interimResults = true;
recognition.lang = "en-US";

function SpeechToText() {
  const [transcript, setTranscript] = useState("");
  const [interimTranscript, setInterimTranscript] = useState("");
  const [isListening, setIsListening] = useState(false);

  // Start listening
  const startListening = () => {
    setIsListening(true);
    recognition.start();
  };

  // Stop listening
  const stopListening = () => {
    setIsListening(false);
    recognition.stop();
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
      setInterimTranscript(interim);
    };

    recognition.onerror = (event) => {
      console.error("Speech Recognition Error", event.error);
    };

    // Restart speech recognition if it stops unexpectedly
    recognition.onend = () => {
      if (isListening) {
        recognition.start(); // Restart recognition if the user is still listening
      }
    };

    return () => {
      recognition.stop();
    };
  }, [isListening]);

  return (
    <div className="app-container">
      <h1>Real-Time Speech-to-Text</h1>
      <div className="controls">
        <button onClick={startListening} disabled={isListening}>
          Start Listening
        </button>
        <button onClick={stopListening} disabled={!isListening}>
          Stop Listening
        </button>
      </div>
      <div className="transcript-container">
        <h2>Transcript</h2>
        <p>{transcript}</p>
        <p style={{ color: "gray" }}>{interimTranscript}</p>
      </div>
    </div>
  );
}

export default SpeechToText;
