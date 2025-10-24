import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // TODO: POST to your backend: await api.signup({ name, email, password, role })
    // On success, send them to the correct login page:
    navigate(role === "admin" ? "/admin-login" : "/login");
  };

  return (
    <div style={{ minHeight: "100vh", display: "grid", placeItems: "center", background: "#fafafa" }}>
      <div style={{ width: "92vw", maxWidth: 420, background: "#fff", border: "1px solid #eee", borderRadius: 12, padding: 24, boxShadow: "0 6px 24px rgba(0,0,0,0.08)" }}>
        <h2 style={{ textAlign: "center", marginBottom: 16 }}>Create your account</h2>
        <form onSubmit={handleSubmit} style={{ display: "grid", gap: 12 }}>
          <input placeholder="Full name" value={name} onChange={(e) => setName(e.target.value)} required />
          <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          <select value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="user">User</option>
            <option value="admin">Admin / Volunteer</option>
          </select>
          <button type="submit" style={{ padding: "10px 12px", borderRadius: 8, background: "#0d6efd", color: "#fff", border: "none", fontWeight: 600 }}>
            Sign up
          </button>
        </form>
        <p style={{ marginTop: 10, textAlign: "center" }}>
          Already have an account? <Link to="/login">Login</Link>
        </p>
        <p style={{ marginTop: 6, textAlign: "center" }}>
          Back to <Link to="/">Home</Link>
        </p>
      </div>
    </div>
  );
}
