import React, { useState } from "react";
import axios from "axios";

const PdfUploader = () => {
  const [file, setFile] = useState(null);
  const [extractedText, setExtractedText] = useState("");

  const onFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a file");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post(
        "http://localhost:3000/upload-pdf",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setExtractedText(response.data.extractedText);
    } catch (error) {
      console.error("Error uploading file", error);
    }
  };

  return (
    <div>
      <h2>Upload PDF and Extract Text</h2>
      <input type="file" onChange={onFileChange} />
      <button onClick={handleUpload}>Upload and Extract Text</button>

      {extractedText && (
        <div>
          <h3>Extracted Text:</h3>
          <pre>{extractedText}</pre>
        </div>
      )}
    </div>
  );
};

export default PdfUploader;
