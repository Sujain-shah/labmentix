import { useState } from "react";
import { useNavigate } from "react-router-dom";

function ForgotPassword() {
    const [email, setEmail] = useState("");
    const navigate = useNavigate();

    const handleContinue = async () => {
        if (!email) {
            alert("Please enter your email");
            return;
        }

        try {
            const response = await fetch(
                "https://labmentix.onrender.com/api/auth/forgot-password",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ email }),
                }
            );

            const data = await response.json();

            alert(data.message);

            if (data.success) {
                localStorage.setItem("resetEmail", email);

                window.location.href = "/reset-password";
            }
        } catch (error) {
            console.error(error);
            alert("Backend connection failed");
        }
    };

    return (
        <div className="min-h-screen flex justify-center items-center bg-[#F5EFE6]">
            <div className="bg-white p-10 rounded-3xl shadow-xl w-[420px]">
                <h2 className="text-3xl font-serif text-[#4B3425] text-center">
                    Forgot Password
                </h2>

                <p className="text-center text-gray-500 mt-3">
                    Enter your registered email
                </p>

                <input
                    type="email"
                    placeholder="Enter your email"
                    className="w-full border p-4 rounded-xl mt-8 outline-none"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <button
                    onClick={handleContinue}
                    className="w-full mt-6 bg-[#8B5E3C] text-white py-4 rounded-xl hover:bg-[#6F4527]"
                >
                    Continue
                </button>
            </div>
        </div>
    );
}

export default ForgotPassword;