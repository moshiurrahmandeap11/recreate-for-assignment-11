import React, { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router";
import axios from "axios";
import { toast } from "react-toastify";
import { motion } from "framer-motion";

const EditCourse = () => {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
    const location = useLocation();

  useEffect(() => {
  document.title = "Edit Course | Coursion";
}, [location.pathname]);

  useEffect(() => {
    axios
      .get(`https://coursion-server.vercel.app/courses/${id}`)
      .then((res) => {
        setCourse(res.data);
        setLoading(false);
      })
      .catch((err) => {
        toast.error("Failed to load course data");
        console.error(err);
      });
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCourse((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put(`https://coursion-server.vercel.app/courses/${id}`, course)
      .then(() => {
        toast.success("Course updated successfully");
        navigate("/managecourse");
      })
      .catch((err) => {
        console.error(err);
        toast.error("Failed to update course");
      });
  };

  if (loading) return <p className="text-center mt-10">Loading...</p>;

  return (
    <motion.div
      className="max-w-3xl mx-auto p-6"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <h1 className="text-2xl font-bold mb-4 text-center text-indigo-600">
        Edit Course
      </h1>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block font-semibold">Title</label>
          <input
            type="text"
            name="title"
            value={course.title || ""}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring focus:border-blue-500"
            required
          />
        </div>

        <div>
          <label className="block font-semibold">Instructor</label>
          <input
            type="text"
            name="instructor"
            value={course.instructor || ""}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring focus:border-blue-500"
            required
          />
        </div>

        <div>
          <label className="block font-semibold">Description</label>
          <textarea
            name="description"
            value={course.description || ""}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded resize-none focus:outline-none focus:ring focus:border-blue-500"
            rows={5}
            required
          ></textarea>
        </div>

        <div>
          <label className="block font-semibold">Photo URL</label>
          <input
            type="url"
            name="image"
            value={course.image || ""}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring focus:border-blue-500"
            required
          />
        </div>

        <div>
          <label className="block font-semibold">Duration</label>
          <input
            type="text"
            name="duration"
            value={course.duration || ""}
            onChange={handleChange}
            placeholder="e.g. 4 weeks"
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring focus:border-blue-500"
            required
          />
        </div>

        <div>
          <label className="block font-semibold">Price ($)</label>
          <input
            type="number"
            name="price"
            value={course.price || ""}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring focus:border-blue-500"
            required
          />
        </div>

        <div>
          <label className="block font-semibold">Level</label>
          <select
            name="level"
            value={course.level || ""}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring focus:border-blue-500"
            required
          >
            <option value="">Select Level</option>
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced">Advanced</option>
          </select>
        </div>
        <div>
          <label className="block font-semibold">Category</label>
          <select
            name="category"
            value={course.category || ""}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring focus:border-blue-500"
            required
          >
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
        </div>



        <div>
          <label className="block font-semibold">Language</label>
        <select
          name="language"
          value={course.language}
          onChange={handleChange}
          className="border w-full px-4 py-2 rounded"
          required
        >
          <option value="">Select Language</option>
          <option value="English">English</option>
          <option value="Bangla">Bangla</option>
          <option value="Hindi">Hindi</option>
        </select>
        </div>

        <div>
          <label className="block font-semibold">Number of Lessons</label>
          <input
            type="number"
            name="lessons"
            value={course.lessons || ""}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring focus:border-blue-500"
            required
          />
        </div>


        <button
          type="submit"
          className="bg-blue-600 cursor-pointer text-white px-5 py-2 rounded hover:bg-blue-700 transition-all"
        >
          Update Course
        </button>
      </form>
    </motion.div>
  );
};

export default EditCourse;
