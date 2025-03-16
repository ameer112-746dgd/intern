import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Card from "../components/ui/card";
import Button from "../components/ui/button";

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
    <div style={{ padding: "20px" }}>
      <h2>Interview List</h2>
      <Button style={{ marginBottom: "20px" }} onClick={handleCreateInterview}>
        Create Interview
      </Button>
      <Card>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th style={{ textAlign: "left", padding: "8px" }}>Title</th>
              <th style={{ textAlign: "left", padding: "8px" }}>Status</th>
              <th style={{ textAlign: "left", padding: "8px" }}>Date Created</th>
            </tr>
          </thead>
          <tbody>
            {interviews.length > 0 ? (
              interviews.map((interview) => (
                <tr key={interview.id}>
                  <td style={{ padding: "8px" }}>{interview.title}</td>
                  <td style={{ padding: "8px" }}>{interview.status}</td>
                  <td style={{ padding: "8px" }}>{interview.date}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" style={{ textAlign: "center", padding: "8px" }}>
                  No interviews found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </Card>
    </div>
  );
};

export default InterviewListPage;
