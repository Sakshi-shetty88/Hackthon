import React from "react";

export default function RoleSelector({ onSelectRole }) {
  return (
    <div className="flex space-x-4 justify-center">
      <button className="btn" onClick={() => onSelectRole("user")}>
        User
      </button>
      <button className="btn" onClick={() => onSelectRole("admin")}>
        Admin
      </button>
    </div>
  );
}
