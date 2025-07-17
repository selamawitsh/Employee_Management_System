import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "user",
  });

  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/auth/register", form);
      setMessage("Registered successfully. Redirecting to login...");
      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch (err) {
      setMessage(err.response?.data?.message || "Error registering.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-900 via-gray-900 to-black text-white">
      <div className="w-full max-w-md p-8 rounded-lg shadow-lg bg-gray-900 border border-blue-900">
        <h2 className="text-2xl font-bold mb-6 text-blue-300">Register</h2>
        <form onSubmit={handleSubmit}>
          <input
            name="name"
            placeholder="Name"
            value={form.name}
            onChange={handleChange}
            required
            className="w-full mb-4 px-4 py-2 rounded bg-gray-800 border border-blue-900 text-white focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
          <input
            name="email"
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
            className="w-full mb-4 px-4 py-2 rounded bg-gray-800 border border-blue-900 text-white focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
            className="w-full mb-4 px-4 py-2 rounded bg-gray-800 border border-blue-900 text-white focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
          <select
            name="role"
            value={form.role}
            onChange={handleChange}
            className="w-full mb-6 px-4 py-2 rounded bg-gray-800 border border-blue-900 text-white focus:outline-none focus:ring-2 focus:ring-blue-600"
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
          <button
            type="submit"
            className="w-full bg-blue-800 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded transition"
          >
            Register
          </button>
        </form>
        <p className="mt-4 text-blue-200">{message}</p>
      </div>
    </div>
  );
}

export default Register;
