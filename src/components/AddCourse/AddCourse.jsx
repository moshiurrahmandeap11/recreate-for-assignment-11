import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../hooks/UseAuth/UseAuth";
import { toast } from "react-toastify";
import Loading from "../Loading/Loading";
import { useLocation } from "react-router";

const AddCourse = () => {
  const { user, loading } = useAuth();
  const location = useLocation();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: "",
    duration: "",
    price: "",
    level: "",
    category: "",
    lessons: "",
    language: "",
    totalSeats: "",
  });

  useEffect(() => {
    document.title = "Add Course | Coursion";
  }, [location.pathname]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "totalSeats") {
      // Prevent totalSeats > 10
      if (parseInt(value) > 10) {
        setFormData((prev) => ({
          ...prev,
          [name]: "10",
        }));
        return;
      }
    }

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newCourse = {
      ...formData,
      price: parseFloat(formData.price),
      lessons: parseInt(formData.lessons),
      totalSeats: parseInt(formData.totalSeats),
      email: user?.email,
      instructor: user?.displayName || "Unknown",
      date: new Date().toLocaleDateString(),
      createdAt: new Date().toISOString(),
    };

    try {
      const res = await axios.post(
        "https://coursion-server.vercel.app/courses",
        newCourse,
        { withCredentials: true }
      );

      if (res.data.insertedId || res.data.acknowledged) {
        toast.success("Course added successfully!");
        setFormData({
          title: "",
          description: "",
          image: "",
          duration: "",
          price: "",
          level: "",
          category: "",
          lessons: "",
          language: "",
          totalSeats: "",
        });
      }
    } catch (err) {
      console.error("Add course failed", err);
      toast.error("Something went wrong!");
    }
  };

  if (loading) return <Loading />;

  return (
    <div className="max-w-3xl mx-auto p-8 bg-white shadow-xl rounded-xl">
      <h2 className="text-3xl font-bold text-indigo-600 mb-6 text-center">
        Add New Course
      </h2>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        {/* Title */}
        <input
          type="text"
          name="title"
          placeholder="Course Title"
          value={formData.title}
          onChange={handleChange}
          className="border px-4 py-2 rounded"
          required
        />

        {/* Duration */}
        <input
          type="text"
          name="duration"
          placeholder="Duration (e.g., 6 weeks)"
          value={formData.duration}
          onChange={handleChange}
          className="border px-4 py-2 rounded"
          required
        />

        {/* Price */}
        <input
          type="number"
          name="price"
          placeholder="Price ($)"
          value={formData.price}
          onChange={handleChange}
          className="border px-4 py-2 rounded"
          required
        />

        {/* Lessons */}
        <input
          type="number"
          name="lessons"
          placeholder="Total Lessons"
          value={formData.lessons}
          onChange={handleChange}
          className="border px-4 py-2 rounded"
          required
        />

        {/* Total Seats */}
        <input
          type="number"
          name="totalSeats"
          placeholder="Total Seats (max 10)"
          value={formData.totalSeats}
          onChange={handleChange}
          className="border px-4 py-2 rounded"
          required
          max={10}
        />

        {/* Level */}
        <select
          name="level"
          value={formData.level}
          onChange={handleChange}
          className="border px-4 py-2 rounded"
          required
        >
          <option value="">Select Level</option>
          <option value="Beginner">Beginner</option>
          <option value="Intermediate">Intermediate</option>
          <option value="Advanced">Advanced</option>
        </select>

        {/* Language */}
        <select
          name="language"
          value={formData.language}
          onChange={handleChange}
          className="border px-4 py-2 rounded"
          required
        >
          <option value="">Select Language</option>
          <option value="English">English</option>
          <option value="Bangla">Bangla</option>
          <option value="Hindi">Hindi</option>
        </select>

        {/* Category */}
        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          className="border px-4 py-2 rounded"
          required
        >
          <option value="">Select Category</option>
          <option value="Web Development">Web Development</option>
          <option value="Software Development">Software Development</option>
          <option value="Mobile App (Flutter)">Mobile App (Flutter)</option>
          <option value="Backend (Laravel)">Backend (Laravel)</option>
          <option value="Data Science">Data Science</option>
          <option value="Machine Learning">Machine Learning</option>
          <option value="UI/UX Design">UI/UX Design</option>
          <option value="Cybersecurity">Cybersecurity</option>
          <option value="Cloud & DevOps">Cloud & DevOps</option>
        </select>

        {/* Image */}
        <input
          type="url"
          name="image"
          placeholder="Thumbnail Image URL"
          value={formData.image}
          onChange={handleChange}
          className="border col-span-full px-4 py-2 rounded"
          required
        />

        {/* Description */}
        <textarea
          name="description"
          placeholder="Short Description"
          value={formData.description}
          onChange={handleChange}
          className="col-span-full border px-4 py-2 rounded resize-none"
          rows="4"
          required
        ></textarea>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={!user}
          className="col-span-full mt-2 cursor-pointer py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition duration-300"
        >
          Add Course
        </button>
      </form>
    </div>
  );
};

export default AddCourse;
