import React, { useEffect, useState } from "react";
import { useAuth } from "../../hooks/UseAuth/UseAuth";
import { useLocation, useNavigate } from "react-router";
import axios from "axios";
import { toast } from "react-toastify";
import { motion, AnimatePresence } from "framer-motion";
import Loading from "../Loading/Loading";
import UseApplicationApi from "../../hooks/UseApplicationApi/UseApplicationApi";

const ManageCourse = () => {
  const { user, loading } = useAuth();
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { manageCourseAxios } = UseApplicationApi();

  useEffect(() => {
    document.title = "Manage Course | Coursion";
  }, [location.pathname]);

  // Fetch courses when user info available
  useEffect(() => {
    if (user?.email && user?.accessToken) {
      const fetchCourses = async () => {
        try {
          const res = await manageCourseAxios();
          setCourses(res);
        } catch (err) {
          console.error("Error fetching courses:", err);
          toast.error("Failed to load your courses.");
        }
      };

      fetchCourses();
    }
  }, [user?.email, user?.accessToken, manageCourseAxios]);

  // Handle Delete
  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://coursion-server.vercel.app/courses/${id}`);
      toast.success("Course deleted successfully!");
      setCourses((prev) => prev.filter((course) => course._id !== id));
      setSelectedCourse(null);
    } catch (err) {
      console.error("Error deleting course:", err);
      toast.error("Failed to delete course.");
    }
  };

  if (loading) return <Loading />;

  return (
    <div className="p-4 max-w-7xl mx-auto animate-fade-in">
      <h1 className="text-3xl font-bold text-center mb-8 text-indigo-700">
        Manage Your Courses
      </h1>

      <div className="overflow-x-auto shadow-md rounded-xl">
        <table className="min-w-full text-sm bg-white">
          <thead className="bg-indigo-200 text-indigo-900">
            <tr>
              <th className="px-6 py-3 text-left">Title</th>
              <th className="px-6 py-3 text-left">Description</th>
              <th className="px-6 py-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {courses.map((course) => (
              <motion.tr
                key={course._id}
                className="hover:bg-gray-50 border-t"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <td className="px-6 py-4 font-semibold text-indigo-800">
                  {course.title}
                </td>
                <td className="px-6 py-4 text-gray-700">
                  {course.description?.slice(0, 60)}...
                </td>
                <td className="px-6 py-4 text-center space-x-3">
                  <button
                    onClick={() => navigate(`/edit-course/${course._id}`)}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition duration-200"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => setSelectedCourse(course)}
                    className="px-4 py-2 bg-red-500 text-white rounded-lg shadow hover:bg-red-600 transition duration-200"
                  >
                    Delete
                  </button>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {selectedCourse && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white p-6 rounded-lg w-full max-w-md shadow-xl"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
            >
              <h2 className="text-xl font-semibold mb-4 text-red-600">
                Confirm Deletion
              </h2>
              <p className="mb-6 text-gray-700">
                Are you sure you want to delete{" "}
                <strong>{selectedCourse.title}</strong>?
              </p>
              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => setSelectedCourse(null)}
                  className="px-4 py-2 bg-gray-300 text-gray-900 rounded hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleDelete(selectedCourse._id)}
                  className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                >
                  Delete
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ManageCourse;
