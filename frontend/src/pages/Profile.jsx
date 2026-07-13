import { useState, useEffect } from "react";

function Profile() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  if (!user) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        No user found
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F5EFE6] flex justify-center items-center">
      <div className="bg-white p-10 rounded-3xl shadow-xl w-[450px]">
        <h1 className="text-3xl font-serif text-[#4B3425] text-center">
          My Profile
        </h1>

        <div className="mt-8">
          <label className="font-semibold">Name</label>

          <input
            type="text"
            value={user.name}
            readOnly
            className="w-full border p-4 rounded-xl mt-2 bg-gray-100"
          />
        </div>

        <div className="mt-5">
          <label className="font-semibold">Email</label>

          <input
            type="email"
            value={user.email}
            readOnly
            className="w-full border p-4 rounded-xl mt-2 bg-gray-100"
          />
        </div>
      </div>
    </div>
  );
}

export default Profile;