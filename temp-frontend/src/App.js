import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import RoleSelectionPage from "./pages/RoleSelectionPage";
import UserLogin from "./pages/UserLogin";
import AdminLogin from "./pages/AdminLogin";
import Signup from "./pages/Signup";
import UserDashboard from "./pages/UserDashboard";
import AdminDashboard from "./pages/AdminDashboard";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/select-role" element={<RoleSelectionPage />} />
        <Route path="/user" element={<UserLogin />} />
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/user-dashboard" element={<UserDashboard />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
      </Routes>
    </Router>
  );
}
