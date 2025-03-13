import React from "react";
import Card from "../components/ui/card";
import Button from "../components/ui/button";


const mockInterviews = [
  { id: 1, title: "Frontend Interview", status: "Pending", date: "2025-03-10" },
  { id: 2, title: "Backend Interview", status: "Completed", date: "2025-03-08" },
];

const InterviewListPage = () => {
  return (
    <div style={{ padding: "20px" }}>
      <h2>Interview List</h2>
      <Button style={{ marginBottom: "20px" }}>Create Interview</Button>
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
            {mockInterviews.map((interview) => (
              <tr key={interview.id}>
                <td style={{ padding: "8px" }}>{interview.title}</td>
                <td style={{ padding: "8px" }}>{interview.status}</td>
                <td style={{ padding: "8px" }}>{interview.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
};

export default InterviewListPage;
