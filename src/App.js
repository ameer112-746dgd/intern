import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import DashboardPage from "./pages/DashboardPage";
import InterviewListPage from "./pages/InterviewListPage";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
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
            </Routes>
          </div>
        </div>
      </div>
    </BrowserRouter>
  );
}
