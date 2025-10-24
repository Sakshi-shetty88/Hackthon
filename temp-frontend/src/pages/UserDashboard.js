import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SosModal from "./SosModal";
import ProfileModal from "./ProfileModal";

export default function UserDashboard() {
  const navigate = useNavigate();
  const currentUser = JSON.parse(localStorage.getItem("currentUser") || "{}");
  const [incidents, setIncidents] = useState([]);
  const [showSos, setShowSos] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [focus, setFocus] = useState("active");

  // get incidents live
  useEffect(() => {
    const fetchData = () => {
      const all = JSON.parse(localStorage.getItem("incidents") || "[]");
      const userReports = all.filter((item) => item.user === currentUser.email);
      setIncidents(userReports);
    };
    fetchData();
    const interval = setInterval(fetchData, 3000);
    return () => clearInterval(interval);
  }, [currentUser.email]);

  const activeAlerts = incidents.filter((x) => !x.resolved).length;
  const resolvedIncidents = incidents.filter((x) => x.resolved).length;
  const volunteers = 8;

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
      <nav className="bg-white shadow-md px-8 py-4 flex justify-between items-center">
        <h2 className="text-2xl font-black text-gray-900">Community Safety Hub</h2>

        <div className="flex gap-4 items-center">
          <button
            onClick={() => setShowProfile(true)}
            className="text-gray-700 font-semibold hover:text-blue-600 transition"
          >
            Profile
          </button>
          <button
            onClick={() => navigate("/")}
            className="text-gray-700 font-semibold hover:text-blue-600 transition"
          >
            Home
          </button>
          <button
            onClick={handleLogout}
            className="px-6 py-2 bg-red-500 text-white font-bold rounded-lg hover:bg-red-600 transition"
          >
            Logout
          </button>
        </div>
      </nav>

      <div className="px-8 py-12">
        <h1 className="text-4xl font-black text-gray-900 mb-8">User Dashboard</h1>

        {/* 3 Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <button
            className={`bg-white rounded-2xl shadow-xl p-6 border-2 ${
              focus === "active" ? "border-blue-600" : "border-transparent"
            }`}
            onClick={() => setFocus("active")}
          >
            🚨 <h3 className="text-3xl font-bold">{activeAlerts}</h3>
            <p className="text-gray-600 text-sm">Active Alerts</p>
          </button>

          <button
            className={`bg-white rounded-2xl shadow-xl p-6 border-2 ${
              focus === "resolved" ? "border-blue-600" : "border-transparent"
            }`}
            onClick={() => setFocus("resolved")}
          >
            ✅ <h3 className="text-3xl font-bold">{resolvedIncidents}</h3>
            <p className="text-gray-600 text-sm">Resolved Incidents</p>
          </button>

          <button
            className={`bg-white rounded-2xl shadow-xl p-6 border-2 ${
              focus === "volunteer" ? "border-blue-600" : "border-transparent"
            }`}
            onClick={() => setFocus("volunteer")}
          >
            👥 <h3 className="text-3xl font-bold">{volunteers}</h3>
            <p className="text-gray-600 text-sm">Nearby Volunteers</p>
          </button>
        </div>

        {/* SOS Button */}
        <div className="flex justify-center my-10">
          <button
            onClick={() => setShowSos(true)}
            className="bg-gradient-to-r from-red-500 to-red-700 text-white font-extrabold py-6 px-12 rounded-2xl shadow-2xl hover:scale-105 transition text-2xl"
          >
            🚨 Report Emergency
          </button>
        </div>

        {/* Display Reports */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mt-12">
          <h2 className="text-2xl font-bold mb-6">Your Reports</h2>
          {incidents.length === 0 ? (
            <p className="text-gray-500 text-center py-6">No incidents reported yet.</p>
          ) : (
            incidents
              .filter((x) =>
                focus === "resolved"
                  ? x.resolved
                  : focus === "active"
                  ? !x.resolved
                  : true
              )
              .map((incident) => (
                <div
                  key={incident.id}
                  className="border-b py-5 flex justify-between items-center"
                >
                  <div>
                    <p className="font-semibold capitalize">{incident.type}</p>
                    <p className="text-gray-700 text-sm">{incident.desc || "No details"}</p>
                    <p className="text-gray-500 text-xs">{incident.time}</p>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-semibold ${
                      incident.urgency === "high"
                        ? "bg-red-500 text-white"
                        : incident.urgency === "medium"
                        ? "bg-yellow-400 text-black"
                        : "bg-green-500 text-white"
                    }`}
                  >
                    {incident.urgency || "N/A"}
                  </span>
                </div>
              ))
          )}
        </div>
      </div>

      {showSos && (
        <SosModal
          onClose={() => setShowSos(false)}
          onReported={(incident) => {
            const all = JSON.parse(localStorage.getItem("incidents") || "[]");
            const report = {
              ...incident,
              user: currentUser.email,
              userName: currentUser.name,
              resolved: false,
            };
            localStorage.setItem("incidents", JSON.stringify([report, ...all]));
            setShowSos(false);
          }}
        />
      )}

      {showProfile && (
        <ProfileModal
          user={currentUser}
          onClose={() => setShowProfile(false)}
          onSave={(updated) => {
            localStorage.setItem("currentUser", JSON.stringify(updated));
            alert("Profile updated successfully!");
            setShowProfile(false);
          }}
        />
      )}
    </div>
  );
}
