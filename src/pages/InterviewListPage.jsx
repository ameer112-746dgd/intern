import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Card from "../components/ui/card";
import Button from "../components/ui/button";
import "../styles.css";

const InterviewListPage = () => {
  const navigate = useNavigate();
  const [interviews, setInterviews] = useState([]);

  useEffect(() => {
    const fetchInterviews = () => {
      const savedInterviews = JSON.parse(localStorage.getItem("interviews")) || [];
      setInterviews(savedInterviews);
    };

    fetchInterviews();

    const handleStorageChange = () => fetchInterviews();
    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const handleCreateInterview = () => {
    navigate("/create-interview");
  };

  return (
    <div className="interview-list-container">
      <h2 className="page-title">Interview List</h2>
      <div className="button-group">
        <Button onClick={handleCreateInterview}>Create Interview</Button>
        <button className="start-button" onClick={() => navigate("/candidate-interview")}>
          Start Interview
        </button>
      </div>
      <Card>
        <table className="interview-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Status</th>
              <th>Date Created</th>
            </tr>
          </thead>
          <tbody>
            {interviews.length > 0 ? (
              interviews.map((interview) => (
                <tr key={interview.id}>
                  <td>{interview.title}</td>
                  <td>{interview.status}</td>
                  <td>{interview.date}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="no-data">No interviews found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </Card>
    </div>
  );
};

export default InterviewListPage;
