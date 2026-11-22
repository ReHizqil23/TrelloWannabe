import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import TasksPage from "./pages/TasksPage";
import DashboardsPage from "./pages/DashboardsPage";
import ChatPage from "./pages/ChatPage";
import DocsPage from "./pages/DocsPage";

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Ini adalah rute untuk halaman utama (Landing Page) */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/tasks" element={<TasksPage />} />
        <Route path="dashboards" element={<DashboardsPage />} />
        <Route path="/docs" element={<DocsPage />} />
        <Route path="/chat" element={<ChatPage />} />
        {/* Nanti rute lainnya ditambahkan di sini */}
        {/* <Route path="/tasks" element={<TasksPage />} /> */}
        {/* <Route path="/chat" element={<ChatPage />} /> */}
      </Routes>
    </Router>
  );
}