from flask import Flask, request, jsonify
import cv2
import os
import pandas as pd
from deepface import DeepFace
import tempfile
import subprocess

app = Flask(__name__)

def extract_frames(video_path, output_folder):
    cap = cv2.VideoCapture(video_path)
    if not cap.isOpened():
        return {"error": "Couldn't open video file."}
    
    if not os.path.exists(output_folder):
        os.makedirs(output_folder)
    
    fps = cap.get(cv2.CAP_PROP_FPS)
    total_frames = int(cap.get(cv2.CAP_PROP_FRAME_COUNT))
    
    for frame_num in range(total_frames):
        ret, frame = cap.read()
        if not ret:
            break
        frame_filename = os.path.join(output_folder, f"frame_{frame_num}.jpg")
        cv2.imwrite(frame_filename, frame)
    
    cap.release()
    
    return {"fps": fps, "total_frames": total_frames, "status": "Frames extraction completed."}

def analyze_and_get_dataframe(image_folder):
    all_files = [f for f in os.listdir(image_folder) if f.endswith('.jpg')]
    dfs = []
    
    for i, file_name in enumerate(all_files):
        if i % 2 == 0:  # Process every frame (adjust this if needed)
            image_path = os.path.join(image_folder, file_name)
            try:
                objs = DeepFace.analyze(img_path=image_path, actions=['emotion'], enforce_detection=False)
                if objs and len(objs) > 0:
                    emotion_part = objs[0]['emotion']
                    dominant_part = objs[0]['dominant_emotion']
                    current_df = pd.DataFrame({**emotion_part, 'dominant_emotion': [dominant_part]})
                    dfs.append(current_df)
            except Exception as e:
                continue
    
    if dfs:
        result_df = pd.concat(dfs, ignore_index=True)
        dominant_emotion_counts = result_df['dominant_emotion'].value_counts().to_dict()
        return {"dominant_emotions": dominant_emotion_counts}
    
    return {"error": "No faces detected."}

def convert_to_mp4(input_path):
    output_path = input_path + ".mp4"
    try:
        # Convert the video to MP4 format using ffmpeg
        subprocess.run(['ffmpeg', '-i', input_path, '-c:v', 'libx264', '-preset', 'fast', '-crf', '22', output_path], check=True)
        return output_path
    except Exception as e:
        return None

@app.route('/process_video', methods=['POST'])
def process_video():
    if 'video' not in request.files:
        return jsonify({"error": "No video file provided."})
    
    video = request.files['video']
    
    with tempfile.NamedTemporaryFile(delete=False) as temp_file:
        video_path = temp_file.name
        video.save(video_path)

    # Convert to MP4 if the format is not MP4
    if not video_path.endswith(".mp4"):
        mp4_path = convert_to_mp4(video_path)
        if not mp4_path:
            os.remove(video_path)
            return jsonify({"error": "Video conversion failed."})
        os.remove(video_path)
        video_path = mp4_path

    output_folder = '/home/images'
    extraction_result = extract_frames(video_path, output_folder)
    
    if "error" in extraction_result:
        return jsonify(extraction_result)
    
    analysis_result = analyze_and_get_dataframe(output_folder)
    
    # Include FPS and total frames in the final response
    response = {
        "fps": extraction_result["fps"],
        "total_frames": extraction_result["total_frames"],
        "analysis_result": analysis_result
    }
    
    delete_images(output_folder)
    os.remove(video_path)  # Clean up the temporary video file
    
    return jsonify(response)

def delete_images(folder_path):
    if not os.path.exists(folder_path):
        return
    for filename in os.listdir(folder_path):
        file_path = os.path.join(folder_path, filename)
        if os.path.isfile(file_path):
            os.remove(file_path)

if __name__ == '__main__':
    print("Server is running on http://0.0.0.0:5000")
    app.run(host='0.0.0.0', port=5000)
