import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const urgencyColors = {
  high: "bg-red-500 text-white",
  medium: "bg-yellow-400 text-gray-900",
  low: "bg-green-500 text-white",
};

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [incidents, setIncidents] = useState([]);
  const [focus, setFocus] = useState("all");

  // Auto-refreshing incidents every few seconds
  useEffect(() => {
    const update = () => {
      const data = JSON.parse(localStorage.getItem("incidents") || "[]");
      setIncidents(data);
    };
    update();
    const interval = setInterval(update, 3000);
    return () => clearInterval(interval);
  }, []);

  // Counters
  const total = incidents.length;
  const pending = incidents.filter((x) => !x.resolved).length;
  const resolved = incidents.filter((x) => x.resolved).length;
  const activeUsers = new Set(incidents.map((x) => x.user)).size;

  const filtered = incidents.filter((x) => {
    if (focus === "resolved") return x.resolved;
    if (focus === "pending") return !x.resolved;
    return true;
  });

  const markResolved = (id) => {
    const updated = incidents.map((x) =>
      x.id === id ? { ...x, resolved: true } : x
    );
    localStorage.setItem("incidents", JSON.stringify(updated));
    setIncidents(updated);
  };

  const viewLocation = (location) => {
    if (location?.lat && location?.lng) {
      const url = `https://www.google.com/maps?q=${location.lat},${location.lng}`;
      window.open(url, "_blank");
    } else {
      alert("No location data available for this incident.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50">
      {/* NAVBAR */}
      <nav className="bg-white shadow-md px-8 py-4 flex justify-between items-center">
        <h2 className="text-2xl font-black text-gray-900">Admin Portal</h2>
        <div className="flex gap-4 items-center">
          <button
            onClick={() => navigate("/")}
            className="text-gray-700 font-semibold hover:text-orange-600 transition"
          >
            Home
          </button>
          <button
            onClick={() => {
              localStorage.removeItem("currentAdmin");
              navigate("/");
            }}
            className="px-6 py-2 bg-red-500 text-white font-bold rounded-lg hover:bg-red-600 transition"
          >
            Logout
          </button>
        </div>
      </nav>

      {/* MAIN CONTENT */}
      <div className="px-8 py-12">
        <h1 className="text-4xl font-black text-gray-900 mb-8">
          Admin Dashboard
        </h1>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <button
            className={`bg-white rounded-2xl shadow-lg p-6 border-2 ${
              focus === "all" ? "border-black" : "border-transparent"
            }`}
            onClick={() => setFocus("all")}
          >
            🚨
            <h3 className="text-3xl font-bold">{total}</h3>
            <p className="text-gray-600 text-sm">Total Incidents</p>
          </button>

          <button
            className={`bg-white rounded-2xl shadow-lg p-6 border-2 ${
              focus === "resolved" ? "border-black" : "border-transparent"
            }`}
            onClick={() => setFocus("resolved")}
          >
            ✅
            <h3 className="text-3xl font-bold">{resolved}</h3>
            <p className="text-gray-600 text-sm">Resolved</p>
          </button>

          <button
            className={`bg-white rounded-2xl shadow-lg p-6 border-2 ${
              focus === "pending" ? "border-black" : "border-transparent"
            }`}
            onClick={() => setFocus("pending")}
          >
            ⏳
            <h3 className="text-3xl font-bold">{pending}</h3>
            <p className="text-gray-600 text-sm">Pending</p>
          </button>

          <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl">
            👥
            <h3 className="text-3xl font-bold">{activeUsers}</h3>
            <p className="text-gray-600 text-sm">Active Users</p>
          </div>
        </div>

        {/* INCIDENTS SECTION */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            {focus === "resolved"
              ? "Resolved Incidents"
              : focus === "pending"
              ? "Pending Incidents"
              : "All Incidents"}
          </h2>

          {filtered.length === 0 ? (
            <div className="text-gray-500 text-center py-10">
              No incidents found.
            </div>
          ) : (
            <div className="space-y-6">
              {filtered
                .sort((a, b) => {
                  const order = { high: 3, medium: 2, low: 1 };
                  return (order[b.urgency] || 0) - (order[a.urgency] || 0);
                })
                .map((incident) => (
                  <div
                    key={incident.id}
                    className="flex flex-col md:flex-row md:items-center justify-between border-b pb-5"
                  >
                    <div>
                      <div className="flex items-center gap-3">
                        <span className="font-semibold text-lg capitalize">
                          {incident.type || "Unknown Type"}
                        </span>
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            urgencyColors[incident.urgency] ||
                            "bg-gray-400 text-white"
                          }`}
                        >
                          {incident.urgency
                            ? incident.urgency.charAt(0).toUpperCase() +
                              incident.urgency.slice(1)
                            : "N/A"}{" "}
                          Urgency
                        </span>
                        {incident.resolved && (
                          <span className="ml-2 px-3 py-1 rounded-full text-xs bg-green-200 text-green-800 font-semibold">
                            Resolved
                          </span>
                        )}
                      </div>

                      <p className="text-gray-600 text-sm mb-1">
                        {incident.desc || "No description provided."}
                      </p>
                      <p className="text-gray-500 text-xs mb-1">
                        Reported by: {incident.user || "Anonymous"}
                      </p>
                      <p className="text-xs text-gray-400 mb-1">
                        Time: {incident.time || "Unknown time"}
                      </p>

                      {incident.location ? (
                        <button
                          onClick={() => viewLocation(incident.location)}
                          className="text-blue-600 font-semibold text-sm hover:underline"
                        >
                          📍 View Location
                        </button>
                      ) : (
                        <p className="text-gray-400 text-xs italic">
                          No location recorded
                        </p>
                      )}
                    </div>

                    {!incident.resolved && (
                      <button
                        onClick={() => markResolved(incident.id)}
                        className="mt-3 md:mt-0 px-5 py-2 rounded-lg bg-green-600 hover:bg-green-700 text-white font-bold shadow-sm"
                      >
                        Mark as Resolved
                      </button>
                    )}
                  </div>
                ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
