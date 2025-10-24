import React from "react";
import { useNavigate } from "react-router-dom";

export default function RoleSelectionPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-indigo-100 via-blue-50 to-purple-100 relative overflow-hidden">
      {/* Animated Background Blobs */}
      <div className="absolute top-10 left-10 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse delay-700"></div>
      <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-1000"></div>

      {/* Content */}
      <div className="z-10 flex flex-col items-center">
        <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-3 drop-shadow-md text-center">
          Your Safety Journey Starts Here
        </h2>
        <p className="text-gray-600 text-lg md:text-xl mb-10 font-medium text-center">
          Choose your role and make an impact today
        </p>

        {/* Vertical Button Stack */}
        <div className="flex flex-col gap-6 w-full max-w-sm">
          <button
            onClick={() => navigate("/user")}
            className="group relative px-8 py-6 bg-gradient-to-r from-blue-500 to-blue-700 text-white text-xl font-bold rounded-2xl shadow-lg hover:scale-105 hover:shadow-blue-500/50 transition-all duration-300"
          >
            <span className="flex items-center justify-center gap-3">
              <span className="text-3xl">👤</span>
              User
            </span>
          </button>

          <button
            onClick={() => navigate("/admin")}
            className="group relative px-8 py-6 bg-gradient-to-r from-orange-400 to-red-500 text-white text-xl font-bold rounded-2xl shadow-lg hover:scale-105 hover:shadow-orange-500/50 transition-all duration-300"
          >
            <span className="flex items-center justify-center gap-3">
              <span className="text-3xl">🛡️</span>
              Admin
            </span>
          </button>

          <button
            onClick={() => navigate("/signup")}
            className="group relative px-8 py-6 bg-gradient-to-r from-green-500 to-teal-500 text-white text-xl font-bold rounded-2xl shadow-lg hover:scale-105 hover:shadow-green-500/50 transition-all duration-300"
          >
            <span className="flex items-center justify-center gap-3">
              <span className="text-3xl">✍️</span>
              Create Account
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
