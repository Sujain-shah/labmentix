import { useState } from "react";
import { ArrowLeft, Code2 } from "lucide-react";
import { Link } from "react-router-dom";
import Editor from "@monaco-editor/react";

function CodeReview() {
    const [language, setLanguage] = useState("JavaScript");
    const [code, setCode] = useState("");
    const [suggestions, setSuggestions] = useState([]);

    const handleReview = async () => {
        if (!code.trim()) {
            alert("Please enter some code.");
            return;
        }

        try {
            const response = await fetch("http://localhost:5000/api/review", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    language,
                    code,
                }),
            });

            const data = await response.json();

            if (data.success) {
                setSuggestions(data.suggestions);
            } else {
                alert(data.message);
            }
        } catch (error) {
            console.error(error);
            alert("Backend connection failed");
        }
    };

    return (
        <div className="min-h-screen bg-[#F5EFE6]">
            {/* Navbar */}
            <nav className="bg-[#4B3425] text-white px-8 py-5 flex justify-between items-center">
                <div className="flex items-center gap-3">
                    <Code2 size={28} />
                    <h1 className="text-2xl font-serif">AI Code Review</h1>
                </div>

                <Link
                    to="/dashboard"
                    className="flex items-center gap-2 hover:text-[#E8DCCB]"
                >
                    <ArrowLeft size={20} />
                    Dashboard
                </Link>
            </nav>

            <div className="max-w-6xl mx-auto py-10 px-6">
                <h2 className="text-4xl font-serif text-[#4B3425]">
                    New Code Review
                </h2>

                <p className="text-gray-600 mt-2">
                    Paste your source code and let AI analyze it.
                </p>

                {/* Language */}
                <div className="mt-8">
                    <label className="font-semibold text-[#4B3425]">
                        Programming Language
                    </label>

                    <select
                        value={language}
                        onChange={(e) => setLanguage(e.target.value)}
                        className="w-full mt-3 p-4 rounded-xl border outline-none"
                    >
                        <option>JavaScript</option>
                        <option>Python</option>
                        <option>C</option>
                        <option>C++</option>
                        <option>Java</option>
                    </select>
                </div>

                {/* Code */}
                <div className="mt-8">
                    <label className="font-semibold text-[#4B3425]">
                        Source Code
                    </label>

                    <Editor
                        height="500px"
                        language={language.toLowerCase()}
                        value={code}
                        onChange={(value) => setCode(value || "")}
                        theme="vs-dark"
                        options={{
                            fontSize: 16,
                            minimap: {
                                enabled: false,
                            },
                            automaticLayout: true,
                        }}
                    />
                </div>

                <button
                    onClick={handleReview}
                    className="mt-8 bg-[#8B5E3C] text-white px-8 py-4 rounded-xl hover:bg-[#6F4527]"
                >
                    Review Code
                </button>

                {/* Result */}
                <div className="bg-white mt-10 rounded-3xl shadow-lg p-8">
                    <h3 className="text-2xl font-semibold text-[#4B3425]">
                        Review Result
                    </h3>

                    {suggestions.length === 0 ? (
                        <p className="text-gray-500 mt-4">
                            Your AI review will appear here.
                        </p>
                    ) : (
                        <ul className="mt-5 space-y-3">
                            {suggestions.map((item, index) => (
                                <li
                                    key={index}
                                    className="bg-[#F5EFE6] p-4 rounded-xl border"
                                >
                                    ✅ {item}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
        </div>
    );
}

export default CodeReview;