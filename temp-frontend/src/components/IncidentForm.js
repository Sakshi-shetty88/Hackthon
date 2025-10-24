import React, { useState } from "react";

export default function IncidentForm({ onSubmit }) {
  const [description, setDescription] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (description.trim()) {
      onSubmit(description.trim());
      setDescription("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col space-y-2">
      <textarea
        className="textarea"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Describe your emergency..."
        required
      />
      <button type="submit" className="btn">
        Submit Incident
      </button>
    </form>
  );
}
