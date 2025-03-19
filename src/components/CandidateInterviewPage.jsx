import React, { useState, useEffect, useRef } from "react";

const mockQuestions = [
  "Tell us about yourself.",
  "What are your strengths and weaknesses?",
  "Where do you see yourself in five years?",
  "Why do you want this job?",
  "Describe a challenging work situation and how you handled it.",
  "What motivates you?",
  "How do you handle pressure and tight deadlines?",
  "What makes you a good fit for this role?",
];

const CandidateInterviewPage = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [recording, setRecording] = useState(false);
  const [videoURL, setVideoURL] = useState(null);
  
  const mediaRecorderRef = useRef(null);
  const videoStreamRef = useRef(null);
  const chunksRef = useRef([]);

  useEffect(() => {
    startVideoStream();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (timeLeft === 0) {
      stopRecording();
      handleNextQuestion();
    }
  }, [timeLeft]);

  const startVideoStream = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      videoStreamRef.current.srcObject = stream;
      mediaRecorderRef.current = new MediaRecorder(stream);
      chunksRef.current = [];

      mediaRecorderRef.current.ondataavailable = (event) => {
        if (event.data.size > 0) chunksRef.current.push(event.data);
      };

      mediaRecorderRef.current.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: "video/mp4" });
        setVideoURL(URL.createObjectURL(blob));
      };
    } catch (error) {
      console.error("Error accessing camera: ", error);
    }
  };

  const startRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.start();
      setRecording(true);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      setRecording(false);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < mockQuestions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setTimeLeft(30);
      setVideoURL(null);
    } else {
      alert("Interview completed!");
    }
  };

  return (
    <div className="interview-container">
      <h2>Candidate Interview</h2>
      <div className="question-box">
        <p className="question">{mockQuestions[currentQuestionIndex]}</p>
        <p className="timer">Time left: {timeLeft}s</p>
      </div>

      <video ref={videoStreamRef} autoPlay playsInline className="video-preview" />

      <div>
        {!recording ? (
          <button onClick={startRecording} disabled={!videoStreamRef.current?.srcObject}>
            Start Recording
          </button>
        ) : (
          <button onClick={stopRecording}>Stop Recording</button>
        )}
      </div>

      {videoURL && (
        <div>
          <h3>Preview:</h3>
          <video src={videoURL} controls className="video-playback" />
        </div>
      )}

      <button className="next-button" onClick={handleNextQuestion} disabled={timeLeft === 0}>
        Next
      </button>
    </div>
  );
};

export default CandidateInterviewPage;
