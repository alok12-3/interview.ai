
# 🌟 AI-Powered Resume Interview Web Application

An intelligent web application designed to revolutionize virtual interviews. Upload a resume, get tailored questions, answer live with real-time transcription, and receive emotion analysis for valuable feedback on your performance.

---

## 📜 Features

### 🎯 Key Highlights
- **Resume-Based Questions**: Upload your resume and receive 10 personalized interview questions generated by an LLM via the Gemini API.
- **Live Interview Experience**: 
  - Answer questions while being recorded.
  - Real-time live transcription of your responses.
- **Emotion Detection**:
  - Analyze emotions in recorded video frames using DeepFace.
  - Gain insights into performance based on emotional expressions.
- **Queue-Based Video Processing**: 
  - Efficient handling of videos with a Dockerized Flask container.
  - Videos are queued if the processing container is busy.

---

## 🛠️ Tech Stack

| **Category**            | **Technologies Used**                                 |
|-------------------------|------------------------------------------------------|
| **Frontend**            | React.js (MERN stack)                                |
| **Backend**             | Node.js, Flask                                       |
| **Video Processing**    | OpenCV, DeepFace                                     |
| **Containerization**    | Docker                                               |
| **Hosting**             | DigitalOcean Ubuntu VM                               |
| **APIs**                | Gemini API                                           |

---

## 🏗️ Architecture Flow

1. **Resume Upload**: User uploads their resume via the frontend.
2. **Question Generation**: Backend sends the resume to an LLM through the Gemini API to generate 10 tailored questions.
3. **Answer Recording**:
   - User selects a question and begins video recording.
   - Live transcription is generated as the user speaks.
4. **Emotion Analysis**:
   - The recorded video is sent to the Node.js server.
   - If the Docker container for emotion detection is idle, the video is processed immediately.
   - If busy, the video is added to a processing queue.
5. **Result Delivery**:
   - Emotions detected in video frames provide insights into user responses.

---

## 🚀 Quick Start Guide

### 📋 Prerequisites
- Install [Docker](https://www.docker.com/).
- Install [Node.js](https://nodejs.org/) and npm.
- Install Python and libraries (`DeepFace`, `Flask`, `OpenCV`).

### 🖥️ Setting Up the Application

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd <repository-directory>
   ```

2. **Install dependencies**:
   ```bash
   npm install  # For frontend and backend
   ```

3. **Run the servers**:
   - **Frontend**:
     ```bash
     cd frontend
     npm start
     ```
   - **Backend**:
     ```bash
     cd backend
     node server.js
     ```

4. **Pull and run the Docker container for emotion detection**:
   ```bash
   docker pull anupunj/emotiondetectionserver
   docker run -p 5000:5000 anupunj/emotiondetectionserver
   ```

5. Access the application on `http://localhost:3000` (default for React).

---

## ⚙️ Docker Configuration

- **Port Mapping**: Map port `5000` for container-server communication.
- **Queue Management**: Videos are automatically queued when the Docker container is busy, ensuring seamless processing.

### Run Docker:
```bash
docker pull anupunj/emotiondetectionserver
docker run -p 5000:5000 anupunj/emotiondetectionserver
```

---


## 🤝 Acknowledgments

- **[Gemini API](https://example.com)**: For question generation tailored to resumes.
- **[DeepFace](https://github.com/serengil/deepface)**: For powerful emotion analysis.
- **[Docker](https://www.docker.com/)**: For containerization and scalability.
- **[DigitalOcean](https://www.digitalocean.com/)**: For hosting infrastructure.

---

## 📌 Future Improvements
- Enhance emotion detection by integrating custom-trained models.
- Add support for role-specific interview question generation.
- Scale video processing with Kubernetes for better resource management.

---

### 📧 Contact
For questions or suggestions, feel free to contact **[Anupunj Alok](anupunj1alok@gmail.com)**.

---

**⭐ Star this repository if you found it helpful!**
```
