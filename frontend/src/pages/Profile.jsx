import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Profile() {
    const [user, setUser] = useState(null);
    const [name, setName] = useState("");

    useEffect(() => {
        const email = localStorage.getItem("userEmail") || "";

        fetch(`https://labmentix.onrender.com/api/auth/profile?email=${email}`)
            .then((res) => res.json())
            .then((data) => {
                if (data.success) {
                    setUser(data.user);
                    setName(data.user.name);
                }
            })
            .catch(console.error);
    }, []);

    if (!user) {
        return (
            <div className="min-h-screen flex justify-center items-center">
                Loading...
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#F5EFE6] flex justify-center items-center">
            <div className="bg-white p-10 rounded-3xl shadow-xl w-[450px]">
                <h2 className="text-3xl font-serif text-[#4B3425] text-center">
                    My Profile
                </h2>

                <div className="mt-8 space-y-5">
                    <div>
                        <p className="font-semibold">Name</p>
                        <input
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full border p-3 rounded-xl mt-2"
                        />
                    </div>

                    <div>
                        <p className="font-semibold">Email</p>
                        <input
                            value={user.email}
                            readOnly
                            className="w-full border p-3 rounded-xl mt-2"
                        />
                    </div>

                    <div>
                        <p className="font-semibold">Joined</p>
                        <input
                            value={user.created_at}
                            readOnly
                            className="w-full border p-3 rounded-xl mt-2"
                        />
                    </div>
                </div>
                <button
                    onClick={async () => {
                        const response = await fetch(
                            "https://labmentix.onrender.com/api/auth/profile",
                            {
                                method: "PUT",
                                headers: {
                                    "Content-Type": "application/json",
                                },
                                body: JSON.stringify({
                                    email: user.email,
                                    name,
                                }),
                            }
                        );

                        const data = await response.json();
                        alert(data.message);

                        if (data.success) {
                            localStorage.setItem("userName", name);
                        }
                    }}
                    className="w-full mt-6 bg-[#8B5E3C] text-white py-3 rounded-xl"
                >
                    Update Profile
                </button>

                <Link to="/dashboard">
                    <button className="w-full mt-8 bg-[#8B5E3C] text-white py-3 rounded-xl">
                        Back
                    </button>
                </Link>
            </div>
        </div>
    );
}

export default Profile;