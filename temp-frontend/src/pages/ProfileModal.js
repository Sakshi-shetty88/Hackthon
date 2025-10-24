import React, { useState } from "react";

export default function ProfileModal({ user, onClose, onSave }) {
  const [data, setData] = useState({
    name: user.name || "",
    email: user.email || "",
    bloodGroup: user.bloodGroup || "",
    password: user.password || "",
    photo: user.photo || "",
  });

  // handle field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  // handle file uploads
  const handleFile = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setData({ ...data, photo: reader.result });
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(data);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50">
      <div className="bg-white w-full max-w-md rounded-2xl p-8 shadow-xl">
        <h2 className="text-2xl font-bold mb-4 text-center">Profile</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col items-center">
            {data.photo ? (
              <img
                src={data.photo}
                alt="profile"
                className="w-24 h-24 rounded-full mb-2 border-2 border-gray-300 object-cover"
              />
            ) : (
              <div className="w-24 h-24 rounded-full bg-gray-200 mb-2 flex items-center justify-center text-gray-500 text-sm">
                No Photo
              </div>
            )}
            <input type="file" accept="image/*" onChange={handleFile} />
          </div>

          <div>
            <label className="block text-gray-600 text-sm">Name</label>
            <input
              type="text"
              name="name"
              value={data.name}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2"
            />
          </div>

          <div>
            <label className="block text-gray-600 text-sm">Email</label>
            <input
              type="email"
              value={data.email}
              readOnly
              className="w-full border rounded-lg px-3 py-2 bg-gray-100"
            />
          </div>

          <div>
            <label className="block text-gray-600 text-sm">Blood Group</label>
            <input
              type="text"
              name="bloodGroup"
              value={data.bloodGroup}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2"
            />
          </div>

          <div>
            <label className="block text-gray-600 text-sm">Change Password</label>
            <input
              type="password"
              name="password"
              value={data.password}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2"
            />
          </div>

          <div className="flex justify-between pt-4">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-200 px-5 py-2 rounded-lg hover:bg-gray-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
