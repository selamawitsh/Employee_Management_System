import { useNavigate } from "react-router-dom";

function Landing() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-900 via-gray-900 to-black text-white">
      <h1 className="text-4xl font-bold mb-8 text-blue-300">
        Welcome to Employee Management System
      </h1>
      <div className="flex gap-4">
        <button
          onClick={() => navigate("/login")}
          className="bg-blue-800 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded transition"
        >
          Login
        </button>
        <button
          onClick={() => navigate("/register")}
          className="bg-gray-700 hover:bg-gray-600 text-white font-semibold py-2 px-6 rounded transition"
        >
          Register
        </button>
      </div>
    </div>
  );
}

export default Landing;
