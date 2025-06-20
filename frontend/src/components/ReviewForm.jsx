import { useState } from "react";
import axios from "axios";

const ReviewForm = ({ bookId, onReviewSubmitted }) => {
  const [text, setText] = useState("");
  const [rating, setRating] = useState(5);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const token = localStorage.getItem("token");

    if (!token) {
      setError("You must be logged in to submit a review.");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/api/reviews",
        {
          bookId,
          text,
          rating,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Optionally call parent refresh
      if (onReviewSubmitted) onReviewSubmitted();

      setText("");
      setRating(5);
    } catch (err) {
      console.error("Error submitting review:", err);
      setError(
        err.response?.data?.message ||
          "Something went wrong while submitting review."
      );
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && <p className="text-red-500">{error}</p>}
      <textarea
        className="w-full p-2 border"
        placeholder="Write your review..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        required
      />
      <select
        value={rating}
        onChange={(e) => setRating(Number(e.target.value))}
        className="border p-2"
      >
        {[1, 2, 3, 4, 5].map((n) => (
          <option key={n} value={n}>
            {n} Star
          </option>
        ))}
      </select>
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 hover:bg-blue-700"
      >
        Submit Review
      </button>
    </form>
  );
};

export default ReviewForm;
