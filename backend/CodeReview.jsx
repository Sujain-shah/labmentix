import { useState } from "react";
import { ArrowLeft, Code2 } from "lucide-react";
import { Link } from "react-router-dom";
import Editor from "@monaco-editor/react";

function CodeReview() {
    const [language, setLanguage] = useState("JavaScript");
    const [code, setCode] = useState("");
    const [suggestions, setSuggestions] = useState([]);
    const [metrics, setMetrics] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const [aiReview, setAiReview] = useState("");

    const handleReview = async () => {
        if (!code.trim()) {
            alert("Please enter some code.");
            return;
        }

        try {
            // Static Analysis
            const response = await fetch(
                "https://labmentix.onrender.com/api/review",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        language,
                        code,
                    }),
                }
            );

            const data = await response.json();

            if (data.success) {
                setSuggestions(data.suggestions);
                setMetrics(data.metrics);
            } else {
                alert(data.message);
            }

            // AI Review
            const aiResponse = await fetch(
                "https://labmentix.onrender.com/api/ai",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        language,
                        code,
                    }),
                }
            );

            const aiData = await aiResponse.json();

            console.log("AI Response:", aiData);
            alert(JSON.stringify(aiData));

            if (aiData.success) {
                setAiReview(aiData.review);
            } else {
                alert(aiData.message || "AI Review Failed");
            }

        } catch (error) {
            console.error(error);
            alert("Backend connection failed");
        }
    };


    const handleFileUpload = async () => {
        if (!selectedFile) {
            alert("Please select a file.");
            return;
        }

        const formData = new FormData();
        formData.append("codeFile", selectedFile);

        try {
            const response = await fetch(
                "https://labmentix.onrender.com/api/review/upload",
                {
                    method: "POST",
                    body: formData,
                }
            );

            const data = await response.json();

            if (data.success) {
                setSuggestions(data.suggestions);
                setMetrics(data.metrics);

                // AI Review
                const aiResponse = await fetch(
                    "https://labmentix.onrender.com/api/ai",
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            language,
                            code,
                        }),
                    }
                );

                const aiData = await aiResponse.json();

                console.log("AI Response:", aiData);
                alert(JSON.stringify(aiData));

                if (aiData.success) {
                    setAiReview(aiData.review);
                } else {
                    alert(aiData.message || "AI Review Failed");
                }

            } else {
                alert(data.message);
            }

        } catch (error) {
            console.error(error);
            alert("File upload failed");
        }
    }