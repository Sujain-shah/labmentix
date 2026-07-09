import {
  Code2,
  FileCode2,
  History,
  LogOut,
  Sparkles,
} from "lucide-react";

function Dashboard() {
  return (
    <div className="min-h-screen bg-[#F5EFE6]">
      {/* Navbar */}
      <nav className="bg-[#4B3425] text-white px-8 py-5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Code2 size={30} />

          <h1 className="text-2xl font-serif">
            AI Code Review
          </h1>
        </div>

        <button className="flex items-center gap-2 hover:text-[#E8DCCB]">
          <LogOut size={20} />
          Logout
        </button>
      </nav>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-6 py-12">
        <div>
          <h2 className="text-4xl font-serif text-[#4B3425]">
            Welcome to your Dashboard
          </h2>

          <p className="text-[#6D5B4D] mt-3">
            Review your code, find issues and improve code quality using AI.
          </p>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-7 mt-12">
          <div className="bg-white rounded-3xl p-7 shadow-lg">
            <div className="w-14 h-14 bg-[#E8DCCB] rounded-2xl flex items-center justify-center">
              <FileCode2
                size={28}
                className="text-[#8B5E3C]"
              />
            </div>

            <h3 className="text-xl font-semibold text-[#4B3425] mt-6">
              New Code Review
            </h3>

            <p className="text-gray-500 mt-3">
              Submit your code and receive AI-powered suggestions.
            </p>

            <button className="mt-7 bg-[#8B5E3C] text-white px-5 py-3 rounded-xl hover:bg-[#6F4527]">
              Review Code
            </button>
          </div>

          <div className="bg-white rounded-3xl p-7 shadow-lg">
            <div className="w-14 h-14 bg-[#E8DCCB] rounded-2xl flex items-center justify-center">
              <History
                size={28}
                className="text-[#8B5E3C]"
              />
            </div>

            <h3 className="text-xl font-semibold text-[#4B3425] mt-6">
              Review History
            </h3>

            <p className="text-gray-500 mt-3">
              View your previously submitted code reviews.
            </p>

            <button className="mt-7 border border-[#8B5E3C] text-[#8B5E3C] px-5 py-3 rounded-xl hover:bg-[#F5EFE6]">
              View History
            </button>
          </div>

          <div className="bg-white rounded-3xl p-7 shadow-lg">
            <div className="w-14 h-14 bg-[#E8DCCB] rounded-2xl flex items-center justify-center">
              <Sparkles
                size={28}
                className="text-[#8B5E3C]"
              />
            </div>

            <h3 className="text-xl font-semibold text-[#4B3425] mt-6">
              AI Suggestions
            </h3>

            <p className="text-gray-500 mt-3">
              Get intelligent suggestions for cleaner and safer code.
            </p>

            <button className="mt-7 border border-[#8B5E3C] text-[#8B5E3C] px-5 py-3 rounded-xl hover:bg-[#F5EFE6]">
              Explore
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Dashboard;