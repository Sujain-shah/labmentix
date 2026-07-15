import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, History } from "lucide-react";

function ReviewHistory() {
    const [reviews, setReviews] = useState([]);
    const [search, setSearch] = useState("");
    const deleteReview = async (id) => {
        try {
            const response = await fetch(
                `https://labmentix.onrender.com/api/review/${id}`,
                {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        email: localStorage.getItem("userEmail"),
                    }),
                }
            );

            const data = await response.json();

            if (data.success) {
                setReviews(reviews.filter((review) => review.id !== id));
            }
        } catch (error) {
            console.error(error);
            alert("Delete failed");
        }
    };

    useEffect(() => {
        const email = localStorage.getItem("userEmail");

        fetch(
            `https://labmentix.onrender.com/api/review/history?email=${email}`
        )
            .then((res) => res.json())
            .then((data) => {
                if (data.success) {
                    setReviews(data.reviews);
                }
            });
    }, []);

    return (
        <div className="min-h-screen bg-[#F5EFE6] p-8">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-serif flex items-center gap-3">
                    <History />
                    Review History
                </h1>

                <Link
                    to="/dashboard"
                    className="flex items-center gap-2 text-[#8B5E3C]"
                >
                    <ArrowLeft size={18} />
                    Dashboard
                </Link>
            </div>
            <input
                type="text"
                placeholder="Search by language..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full p-4 rounded-xl border mb-6 outline-none"
            />
            <div className="mt-8 space-y-5">
                {reviews.length === 0 ? (
                    <p>No reviews found.</p>
                ) : (
                    reviews
                        .filter((review) =>
                            review.language
                                .toLowerCase()
                                .includes(search.toLowerCase())
                        )
                        .map((review) => (
                            <div
                                key={review.id}
                                className="bg-white rounded-2xl shadow p-6"
                            >
                                <h3 className="font-bold text-lg">
                                    {review.language}
                                </h3>

                                <p className="text-sm text-gray-500 mt-2">
                                    {review.created_at}
                                </p>

                                <pre className="bg-[#F5EFE6] p-4 rounded-xl mt-4 overflow-auto">
                                    {review.code}
                                </pre>

                                <div className="mt-4">
                                    <strong>Suggestions</strong>

                                    <pre className="mt-2">
                                        {review.suggestions}
                                    </pre>
                                    <button
                                        onClick={() => deleteReview(review.id)}
                                        className="mt-5 bg-red-600 text-white px-5 py-2 rounded-lg hover:bg-red-700"
                                    >
                                        Delete Review
                                    </button>
                                </div>
                            </div>
                        ))
                )}
            </div>
        </div>
    );
}

export default ReviewHistory;