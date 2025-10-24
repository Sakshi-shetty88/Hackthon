import React from "react";
import { useNavigate } from "react-router-dom";

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-blue-100">
      {/* NAVBAR */}
      <nav className="flex justify-between items-center px-8 md:px-16 py-5 bg-white bg-opacity-70 backdrop-blur-lg sticky top-0 z-50 shadow-sm">
        <h2 className="text-2xl font-black text-gray-900">Community Safety</h2>
        <div className="flex gap-6">
          <button onClick={() => navigate("/user")} className="text-gray-700 font-semibold hover:text-blue-600 transition">
            User
          </button>
          <button onClick={() => navigate("/admin")} className="text-gray-700 font-semibold hover:text-blue-600 transition">
            Admin
          </button>
          <button onClick={() => navigate("/signup")} className="text-gray-700 font-semibold hover:text-blue-600 transition">
            Sign up
          </button>
        </div>
      </nav>

      {/* HERO SECTION */}
      <section className="flex flex-col items-center justify-center text-center py-20 px-6">
        <h1 className="text-5xl md:text-7xl font-extrabold text-black mb-6 leading-tight">
          Community Safety Hub
        </h1>
        <p className="text-lg md:text-2xl text-gray-600 max-w-3xl mb-10">
          Instant emergency response connecting citizens, volunteers, and first responders. Stay informed. Act fast.
        </p>
        <button
          onClick={() => navigate("/select-role")}
          className="px-10 py-5 bg-blue-600 text-white text-xl font-bold rounded-full shadow-xl hover:bg-blue-700 hover:scale-105 transition-transform"
        >
          Get Started
        </button>
      </section>

      {/* FEATURES SECTION */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Feature 1 */}
          <div className="bg-white rounded-3xl shadow-lg p-8 text-center hover:-translate-y-2 hover:shadow-2xl transition-all">
            <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-4xl">🚨</span>
            </div>
            <h3 className="text-xl font-bold text-red-600 mb-2">One-Tap SOS</h3>
            <p className="text-gray-600">Instant alerts with location.</p>
          </div>

          {/* Feature 2 */}
          <div className="bg-white rounded-3xl shadow-lg p-8 text-center hover:-translate-y-2 hover:shadow-2xl transition-all">
            <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-4xl">👥</span>
            </div>
            <h3 className="text-xl font-bold text-green-600 mb-2">Community Response</h3>
            <p className="text-gray-600">Verified responders.</p>
          </div>

          {/* Feature 3 */}
          <div className="bg-white rounded-3xl shadow-lg p-8 text-center hover:-translate-y-2 hover:shadow-2xl transition-all">
            <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-4xl">📊</span>
            </div>
            <h3 className="text-xl font-bold text-blue-600 mb-2">Safety Analytics</h3>
            <p className="text-gray-600">Heatmaps & insights.</p>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-gray-900 text-white py-8 text-center">
        <p className="text-sm">© 2025 Community Safety Hub. All rights reserved.</p>
      </footer>
    </div>
  );
}
