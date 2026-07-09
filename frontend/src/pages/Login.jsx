import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Mail,
  Lock,
  Eye,
  Sparkles,
  ShieldCheck,
  Code2,
} from "lucide-react";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [backendMessage, setBackendMessage] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:5000/api/test")
      .then((res) => res.json())
      .then((data) => {
        setBackendMessage(data.message);
      })
      .catch((error) => {
        console.error(error);
        setBackendMessage("Backend not connected");
      });
  }, []);

  const handleLogin = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
          }),
        }
      );

      const data = await response.json();

      alert(data.message);

      if (data.success) {
        navigate("/dashboard");
      }
    } catch (error) {
      console.error(error);
      alert("Backend connection failed");
    }
  };

  return (
    <div className="min-h-screen bg-[#F5EFE6] flex">
      {/* Left Section */}
      <div className="hidden lg:flex w-1/2 bg-[#E8DCCB] flex-col justify-center px-20">
        <div className="bg-white w-20 h-20 rounded-3xl flex items-center justify-center shadow-lg">
          <Code2 size={40} className="text-[#8B5E3C]" />
        </div>

        <h1 className="text-6xl font-serif text-[#4B3425] mt-10 leading-tight">
          Review Code
          <br />
          Smarter.
        </h1>

        <p className="text-xl text-[#6D5B4D] mt-8 leading-9">
          Improve your code quality using Artificial Intelligence. Detect bugs,
          security issues, performance problems and receive professional
          suggestions instantly.
        </p>

        <div className="mt-14 space-y-6">
          <div className="flex items-center gap-4">
            <Sparkles className="text-[#8B5E3C]" />

            <span className="text-lg text-[#4B3425]">
              AI Powered Code Reviews
            </span>
          </div>

          <div className="flex items-center gap-4">
            <ShieldCheck className="text-[#8B5E3C]" />

            <span className="text-lg text-[#4B3425]">
              Secure Authentication
            </span>
          </div>

          <div className="flex items-center gap-4">
            <Code2 className="text-[#8B5E3C]" />

            <span className="text-lg text-[#4B3425]">
              Supports Multiple Languages
            </span>
          </div>
        </div>
      </div>

      {/* Right Section */}
      <div className="flex-1 flex justify-center items-center px-6">
        <div className="bg-white w-[430px] rounded-3xl shadow-2xl p-10">
          <h2 className="text-4xl font-serif text-[#4B3425] text-center">
            Welcome Back
          </h2>

          <p className="text-center text-gray-500 mt-3">
            Login to continue
          </p>

          <p className="text-center text-green-700 text-sm mt-2">
            {backendMessage}
          </p>

          {/* Email */}
          <div className="mt-10">
            <label className="font-medium text-[#4B3425]">
              Email
            </label>

            <div className="flex items-center border rounded-xl px-4 mt-2">
              <Mail className="text-[#8B5E3C]" size={20} />

              <input
                type="email"
                placeholder="Enter your email"
                className="w-full p-4 outline-none"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          {/* Password */}
          <div className="mt-6">
            <label className="font-medium text-[#4B3425]">
              Password
            </label>

            <div className="flex items-center border rounded-xl px-4 mt-2">
              <Lock className="text-[#8B5E3C]" size={20} />

              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                className="w-full p-4 outline-none"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <Eye
                size={20}
                className="cursor-pointer text-[#8B5E3C]"
                onClick={() => setShowPassword(!showPassword)}
              />
            </div>
          </div>

          <div className="flex justify-end mt-3">
            <button className="text-[#8B5E3C] text-sm hover:underline">
              Forgot Password?
            </button>
          </div>

          <button
            onClick={handleLogin}
            className="w-full mt-8 bg-[#8B5E3C] text-white py-4 rounded-xl hover:bg-[#6F4527] transition"
          >
            Login
          </button>

          <p className="text-center mt-8 text-gray-500">
            Don't have an account?{" "}

            <Link
              to="/signup"
              className="text-[#8B5E3C] font-semibold hover:underline"
            >
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;