import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import LandingPage from "./pages/LandingPage";
import TasksPage from "./pages/TasksPage";
import DashboardsPage from "./pages/DashboardsPage";
import ChatPage from "./pages/ChatPage";
import DocsPage from "./pages/DocsPage";
import WhiteboardsPage from "./pages/Whiteboardspage";
import GoalsPage from "./pages/GoalsPage";
import TeamPage from "./pages/teamPage";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />

      <Route element={<Layout />}>  
        <Route path="/tasks" element={<TasksPage />} />
        <Route path="dashboards" element={<DashboardsPage />} />
        <Route path="/docs" element={<DocsPage />} />
        <Route path="/chat" element={<ChatPage />} />
        <Route path="/whiteboards" element={<WhiteboardsPage/>} />
        <Route path="/goals" element={<GoalsPage />} />
        <Route path="/team" element={<TeamPage />} />
      </Route>
      </Routes>
    </Router>
  );
}