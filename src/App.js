import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import DashboardPage from "./pages/DashboardPage";
import InterviewListPage from "./pages/InterviewListPage";
import CreateInterviewPage from "./pages/CreateInterviewPage.jsx";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import CandidateInterviewPage from "./components/CandidateInterviewPage";
import "./styles.css";

export default function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <BrowserRouter>
      <div className="layout">
        <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
        <div className="main-content">
          <Navbar toggleSidebar={toggleSidebar} />
          <div className="page-content">
            <Routes>
              <Route path="/" element={<DashboardPage />} />
              <Route path="/interviews" element={<InterviewListPage />} />
              <Route path="/create-interview" element={<CreateInterviewPage />} />
              <Route path="/candidate-interview" element={<CandidateInterviewPage />} />
            </Routes>
          </div>
        </div>
      </div>
    </BrowserRouter>
  );
}
