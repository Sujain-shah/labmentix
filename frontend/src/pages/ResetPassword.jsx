import { useState } from "react";
import { useNavigate } from "react-router-dom";

function ResetPassword() {
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleReset = async () => {
    const email = localStorage.getItem("resetEmail");

    try {
      const response = await fetch(
        "http://https://labmentix.onrender.com/api/auth/reset-password",
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
        localStorage.removeItem("resetEmail");
        navigate("/login");
      }
    } catch (error) {
      console.error(error);
      alert("Reset failed");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-[#F5EFE6]">
      <div className="bg-white p-10 rounded-3xl shadow-xl w-[420px]">
        <h2 className="text-3xl font-serif text-[#4B3425] text-center">
          Reset Password
        </h2>

        <input
          type="password"
          placeholder="Enter new password"
          className="w-full border p-4 rounded-xl mt-8"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleReset}
          className="w-full mt-6 bg-[#8B5E3C] text-white py-4 rounded-xl"
        >
          Reset Password
        </button>
      </div>
    </div>
  );
}

export default ResetPassword;