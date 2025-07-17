import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/auth/login", form);
      localStorage.setItem("user", JSON.stringify(res.data));
      navigate("/dashboard");
    } catch (err) {
      setMessage(err.response.data.message || "Login failed.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-900 via-gray-900 to-black text-white">
      <div className="w-full max-w-md p-8 rounded-lg shadow-lg bg-gray-900 border border-blue-900">
        <h2 className="text-2xl font-bold mb-6 text-blue-300">Login</h2>
        <form onSubmit={handleSubmit}>
          <input
            name="email"
            placeholder="Email"
            onChange={handleChange}
            className="w-full mb-4 px-4 py-2 rounded bg-gray-800 border border-blue-900 text-white focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
          <input
            name="password"
            placeholder="Password"
            type="password"
            onChange={handleChange}
            className="w-full mb-6 px-4 py-2 rounded bg-gray-800 border border-blue-900 text-white focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
          <button
            type="submit"
            className="w-full bg-blue-800 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded transition"
          >
            Login
          </button>
        </form>
        <p className="mt-4 text-blue-200">{message}</p>
      </div>
    </div>
  );
}

export default Login;
