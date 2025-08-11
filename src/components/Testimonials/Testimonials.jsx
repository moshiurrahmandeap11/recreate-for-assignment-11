import React, { useState, useEffect } from "react";
import { FaStar } from "react-icons/fa";
import { motion } from "framer-motion";
import { useAuth } from "../../hooks/UseAuth/UseAuth";
import Loading from "../Loading/Loading";
import { useLocation } from "react-router";
import axios from "axios";

const Testimonials = () => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(null);
  const [review, setReview] = useState("");
  const [allReviews, setAllReviews] = useState([]);
  const { user, loading } = useAuth();
  const name = user?.displayName;
  const email = user?.email;
    const location = useLocation();

  useEffect(() => {
  document.title = "Testimonials | Coursion";
}, [location.pathname]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await axios.get("https://coursion-server.vercel.app/reviews");
        const data = (res.data);
        setAllReviews(data);
      } catch (err) {
        console.error("Error fetching reviews:", err);
      }
    };
    fetchReviews();
  }, []);

  const handleSubmit = async () => {
    if (rating === 0 || review.trim() === "") {
      alert("Please provide a rating and a review!");
      return;
    }

    const newReview = {
      name,
      email,
      rating,
      review,
      avatar: user?.photoURL || "https://i.ibb.co/SBqvNHD/user.png",
    };

    try {
      const res = await fetch("https://coursion-server.vercel.app/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newReview),
      });

      const data = await res.json();

      if (res.ok) {
        setAllReviews((prev) => [data, ...prev]);
        setRating(0);
        setReview("");
        document.getElementById("review_modal").close();
      } else {
        console.error("Failed to post review:", data.message);
      }
    } catch (err) {
      console.error("Something went wrong!", err);
    }
  };

  if (loading) return <Loading />;

  return (
    <section className="max-w-7xl mx-auto px-6 py-16 sm:px-8 md:px-12">

      <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6">
        <h2 className="text-4xl font-extrabold text-primary tracking-wide drop-shadow-sm">
          Student Testimonials
        </h2>
        {user && (
          <button
            onClick={() => document.getElementById("review_modal").showModal()}
            className="bg-primary cursor-pointer hover:bg-primary-dark text-white px-6 py-3 rounded-lg font-semibold shadow-lg transition duration-300 ease-in-out"
          >
            Add Review
          </button>
        )}
      </div>


      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {allReviews.length === 0 ? (
          <p className="text-center text-gray-500 col-span-full">No reviews yet! Be the first to add one.</p>
        ) : (
          allReviews.map((rev, idx) => (
            <motion.article
              key={rev._id || idx}
              className="bg-white rounded-2xl p-6 shadow-xl border border-gray-200 flex flex-col justify-between hover:shadow-2xl transition-shadow duration-400"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
            >
              <p className="text-gray-700 italic mb-5 flex-grow">"{rev.review}"</p>
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <FaStar
                    key={i}
                    className={`text-xl ${
                      i < rev.rating ? "text-yellow-400" : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              <div className="flex items-center gap-4">
                <img
                  src={rev.avatar}
                  alt={rev.name}
                  className="w-12 h-12 rounded-full object-cover border-2 border-primary"
                  loading="lazy"
                />
                <span className="text-gray-900 font-semibold text-lg">{rev.name}</span>
              </div>
            </motion.article>
          ))
        )}
      </div>

      {/* Modal */}
      <dialog
        id="review_modal"
        className="modal bg-black bg-opacity-60 backdrop-blur-sm"
        style={{ border: "none", padding: 0 }}
      >
        <form method="dialog" className="modal-box max-w-lg p-8 rounded-xl bg-white shadow-2xl flex flex-col gap-6">
          <h3 className="text-2xl font-bold text-primary mb-4">Add Your Review</h3>

          <label className="block">
            <span className="text-gray-600 font-medium">Name</span>
            <input
              value={name || ""}
              disabled
              className="w-full mt-1 p-3 border border-gray-300 rounded-md bg-gray-100 cursor-not-allowed text-gray-700"
            />
          </label>

          <label className="block">
            <span className="text-gray-600 font-medium mb-1">Rating</span>
            <div className="flex space-x-2">
              {[...Array(5)].map((_, i) => {
                const rateValue = i + 1;
                return (
                  <FaStar
                    key={i}
                    size={28}
                    onClick={() => setRating(rateValue)}
                    onMouseEnter={() => setHover(rateValue)}
                    onMouseLeave={() => setHover(null)}
                    className={`cursor-pointer transition-colors duration-200 ${
                      rateValue <= (hover || rating)
                        ? "text-yellow-400"
                        : "text-gray-300"
                    }`}
                  />
                );
              })}
            </div>
          </label>

          <label className="block">
            <span className="text-gray-600 font-medium mb-1">Your Review</span>
            <textarea
              rows={5}
              value={review}
              onChange={(e) => setReview(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Write your honest feedback here..."
            />
          </label>

          <div className="flex justify-end gap-3">
            <button
              type="button"
              className="px-5 py-2 cursor-pointer rounded-md border border-gray-300 hover:bg-gray-100 transition"
              onClick={() => document.getElementById("review_modal").close()}
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              className="px-5 py-2 cursor-pointer rounded-md bg-primary hover:bg-primary-dark text-white font-semibold transition"
            >
              Submit
            </button>
          </div>
        </form>
      </dialog>
    </section>
  );
};

export default Testimonials;
