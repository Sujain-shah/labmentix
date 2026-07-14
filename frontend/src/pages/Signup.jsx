import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, User } from "lucide-react";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSignup = async () => {
    try {
      const response = await fetch(
        "http://https://labmentix.onrender.com/api/auth/signup",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            email,
            password,
          }),
        }
      );

      const data = await response.json();

      alert(data.message);

      if (data.success) {
        navigate("/login");
      }
    } catch (error) {
      console.error("Signup error:", error);
      alert("Backend connection failed");
    }
  };

  return (
    <div className="min-h-screen bg-[#F5EFE6] flex justify-center items-center px-4">
      <div className="w-[430px] bg-white rounded-3xl shadow-2xl p-10">
        <h1 className="text-4xl font-serif text-center text-[#4B3425]">
          Create Account
        </h1>

        <p className="text-center text-gray-500 mt-2">
          Join AI Code Review Assistant
        </p>

        <div className="mt-8">
          <div className="flex items-center border rounded-xl px-4">
            <User className="text-[#8B5E3C]" size={20} />

            <input
              type="text"
              placeholder="Full Name"
              className="w-full p-4 outline-none"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
        </div>

        <div className="mt-5">
          <div className="flex items-center border rounded-xl px-4">
            <Mail className="text-[#8B5E3C]" size={20} />

            <input
              type="email"
              placeholder="Email Address"
              className="w-full p-4 outline-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>

        <div className="mt-5">
          <div className="flex items-center border rounded-xl px-4">
            <Lock className="text-[#8B5E3C]" size={20} />

            <input
              type="password"
              placeholder="Password"
              className="w-full p-4 outline-none"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>

        <button
          onClick={handleSignup}
          className="w-full mt-8 bg-[#8B5E3C] text-white py-4 rounded-xl hover:bg-[#6F4527]"
        >
          Create Account
        </button>

        <p className="text-center mt-6 text-gray-500">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-[#8B5E3C] font-semibold hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;