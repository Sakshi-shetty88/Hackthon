import React from "react";

export default function Sidebar({ currentPage, onNavigate }) {
  return (
    <nav className="fixed top-6 right-8 flex gap-4 z-10">
      <button
        className={`flex items-center gap-2 px-6 py-2 rounded-2xl bg-white/20 text-white font-semibold shadow hover:bg-white/40 transition-all
        ${currentPage === "home" ? "backdrop-blur border border-white" : ""}`}
        onClick={() => onNavigate("home")}
      >
        <span role="img" aria-label="home">🏠</span>
        Home
      </button>
      <button
        className={`flex items-center gap-2 px-6 py-2 rounded-2xl bg-white/20 text-white font-semibold shadow hover:bg-white/40 transition-all
        ${currentPage === "dashboard" ? "backdrop-blur border border-white" : ""}`}
        onClick={() => onNavigate("dashboard")}
      >
        <span role="img" aria-label="dashboard">📊</span>
        Dashboard
      </button>
      <button
        className="flex items-center gap-2 px-6 py-2 rounded-2xl bg-white/20 text-white font-semibold shadow hover:bg-white/40 transition-all"
        onClick={() => onNavigate("logout")}
      >
        <span role="img" aria-label="logout">📋</span>
        Logout
      </button>
    </nav>
  );
}
