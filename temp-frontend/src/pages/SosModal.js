import React, { useState } from "react";

const emergencyTypes = [
  { label: "Medical Emergency", color: "bg-red-600", value: "medical" },
  { label: "Fire", color: "bg-orange-500", value: "fire" },
  { label: "Crime/Violence", color: "bg-red-800", value: "crime" },
  { label: "Accident", color: "bg-yellow-600", value: "accident" },
  { label: "Other Emergency", color: "bg-gray-600", value: "other" },
];

export default function SosModal({ onClose, onReported }) {
  const [type, setType] = useState("");
  const [desc, setDesc] = useState("");
  const [location, setLocation] = useState(null);
  const [locStatus, setLocStatus] = useState("");

  function handleGetLocation() {
    setLocStatus("Fetching location...");
    if (!navigator.geolocation) {
      setLocStatus("Geolocation not supported.");
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude });
        setLocStatus("Location fetched!");
      },
      (err) => {
        setLocStatus("Failed to fetch location.");
      }
    );
  }

  function handleReport() {
    if (!type) {
      alert("Please select emergency type.");
      return;
    }
    const incident = {
      type,
      desc,
      location,
      time: new Date().toLocaleString(),
    };
    onReported(incident);
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-8 max-w-lg w-full shadow-2xl flex flex-col items-center">
        <h2 className="text-3xl font-black mb-3 text-center">Report Emergency</h2>
        <p className="text-gray-600 mb-6 text-center">Select the type of emergency</p>
        <textarea
          value={desc}
          onChange={e => setDesc(e.target.value)}
          placeholder="Brief description (optional)"
          className="w-full rounded-lg border px-4 py-2 mb-5"
          rows={2}
        />

        <div className="flex flex-col w-full gap-4 mb-4">
          {emergencyTypes.map((et) => (
            <button
              key={et.value}
              className={`w-full px-4 py-3 text-lg font-bold text-white rounded-lg focus:outline-none focus:ring-2 ${
                et.color
              } ${type === et.value ? "ring-2 ring-offset-2 ring-black scale-105" : ""} transition`}
              onClick={() => setType(et.value)}
            >
              {et.label}
            </button>
          ))}
        </div>

        <button
          onClick={handleGetLocation}
          className="mb-2 px-6 py-2 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
        >
          {location ? "Location Added" : "Get Location"}
        </button>
        {locStatus && <p className="text-sm text-gray-600 mb-3">{locStatus}</p>}

        <div className="flex w-full gap-4 mt-4">
          <button
            onClick={handleReport}
            className="flex-1 bg-black text-white rounded-lg px-6 py-3 font-semibold hover:bg-gray-800 transition"
          >
            Report
          </button>
          <button
            onClick={onClose}
            className="flex-1 bg-gray-200 text-gray-700 rounded-lg px-6 py-3 font-semibold hover:bg-gray-300 transition"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
