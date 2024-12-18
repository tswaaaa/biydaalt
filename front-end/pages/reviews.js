import { useState, useEffect } from "react";
import axios from "axios";

export default function Reviews() {
  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState(null);

  // States for form fields
  const [productId, setProductId] = useState("");
  const [userId, setUserId] = useState("");
  const [rating, setRating] = useState("");
  const [reviewText, setReviewText] = useState("");

  // Fetch reviews from the backend
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get("http://localhost:4000/reviews");
        setReviews(response.data);
        setError(null);
      } catch (err) {
        setError(err.response?.data?.error || "Failed to fetch reviews");
      }
    };

    fetchReviews();
  }, []);

  // Handle form submission
  const handleCreateReview = async () => {
    try {
      // Send POST request to create a new review
      await axios.post("http://localhost:4000/createReview", {
        product_id: productId,
        user_id: userId,
        rating: rating,
        review_text: reviewText,
      });

      // Clear form fields
      setProductId("");
      setUserId("");
      setRating("");
      setReviewText("");
      setError(null);
    } catch (err) {
      setError(err.response?.data?.error || "Error creating review");
    }
  };

  return (
    <div>
      <header className="flex justify-between items-center bg-pink-500 p-4">
        <li><a href="/" className="font-extrabold text-3xl text-pink-100">Ecommerse</a></li>
        <nav>
          <ul className="flex space-x-6">
            <li><a href="/users" className="text-pink-100 font-semibold">Users</a></li>
            <li><a href="/products" className="text-pink-100 font-semibold">Products</a></li>
            <li><a href="/orders" className="text-pink-100 font-semibold">Orders</a></li>
            <li><a href="/order-items" className="text-pink-100 font-semibold">Order Items</a></li>
            <li><a href="/reviews" className="text-pink-100 font-semibold">Reviews</a></li>
          </ul>
        </nav>
      </header>

      <div className="mb-8 p-6 bg-pink-50 rounded-lg shadow-md">
  <h2 className="font-extrabold text-3xl text-pink-500 pb-4">Add a New Review</h2>

  {/* Product ID input */}
  <div className="mb-4">
    <input
      type="number"
      value={productId}
      onChange={(e) => setProductId(e.target.value)}
      placeholder="Enter Product ID"
      className="w-full p-4 text-pink-600 border-2 border-pink-400 rounded-lg focus:ring-2 focus:ring-pink-500 bg-pink-100 placeholder-pink-400 transition duration-300"
    />
  </div>

  {/* User ID input */}
  <div className="mb-4">
    <input
      type="number"
      value={userId}
      onChange={(e) => setUserId(e.target.value)}
      placeholder="Enter User ID"
      className="w-full p-4 text-pink-600 border-2 border-pink-400 rounded-lg focus:ring-2 focus:ring-pink-500 bg-pink-100 placeholder-pink-400 transition duration-300"
    />
  </div>

  {/* Rating input */}
  <div className="mb-4">
    <input
      type="number"
      value={rating}
      onChange={(e) => setRating(e.target.value)}
      placeholder="Rating (1-5)"
      className="w-full p-4 text-pink-600 border-2 border-pink-400 rounded-lg focus:ring-2 focus:ring-pink-500 bg-pink-100 placeholder-pink-400 transition duration-300"
    />
  </div>

  {/* Review text area */}
  <div className="mb-6">
    <textarea
      value={reviewText}
      onChange={(e) => setReviewText(e.target.value)}
      placeholder="Write your review here..."
      className="w-full p-4 text-pink-600 border-2 border-pink-400 rounded-lg focus:ring-2 focus:ring-pink-500 bg-pink-100 placeholder-pink-400 transition duration-300"
    />
  </div>

  {/* Display error message */}
  {error && <p className="text-red-500 text-center font-semibold mb-4">{error}</p>}

  {/* Submit button */}
  <div className="text-center">
    <button
      onClick={handleCreateReview}
      className="w-full p-4 border-2 rounded-lg bg-pink-500 font-semibold text-pink-100 hover:bg-pink-600 focus:outline-none focus:ring-2 focus:ring-pink-500 transition duration-300"
    >
      Submit Review
    </button>
  </div>
</div>


      {/* Display reviews */}
      {error && (
        <div className="text-center text-red-500 font-semibold">{error}</div>
      )}
<h1 className="text-4xl font-bold text-center text-pink-600 mb-6">Product Reviews</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-8">
        
        {reviews.map((review) => (
          <div
            key={review.review_id}
            className="border rounded-lg shadow-md p-4 bg-pink-100 border-pink-400"
          >
            <h2 className="text-xl font-bold text-pink-600 mb-2">
              Review for Product ID: {review.product_id}
            </h2>
            <p className="text-gray-700 mb-2">
              <strong>User ID:</strong> {review.user_id}
            </p>
            <p className="text-gray-700 mb-2">
              <strong>Rating:</strong> {review.rating} / 5
            </p>
            <p className="text-gray-700 mb-2">
              <strong>Review:</strong> {review.review_text}
            </p>
            <p className="text-gray-700 mb-2">
              <strong>Created At:</strong> {new Date(review.created_at).toLocaleDateString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
