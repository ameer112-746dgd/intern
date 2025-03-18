import React, { useState, useEffect } from "react";

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

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (timeLeft === 0) {
      if (currentQuestionIndex < mockQuestions.length - 1) {
        setCurrentQuestionIndex((prev) => prev + 1);
        setTimeLeft(30);
      } else {
        alert("Interview completed!");
      }
    }
  }, [timeLeft, currentQuestionIndex]);

  const handleNextQuestion = () => {
    if (currentQuestionIndex < mockQuestions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setTimeLeft(30);
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
      <button 
        className="next-button" 
        onClick={handleNextQuestion} 
        disabled={timeLeft === 0}
      >
        Next
      </button>
    </div>
  );
};

export default CandidateInterviewPage;
