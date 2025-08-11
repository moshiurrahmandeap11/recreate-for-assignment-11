import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";

const PopularCourses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCoursesWithCounts = async () => {
      try {
        const courseRes = await axios.get("https://coursion-server.vercel.app/courses");
        const allCourses = courseRes.data;

        const coursesWithCounts = await Promise.all(
          allCourses.map(async (course) => {
            const countRes = await axios.get(
              `https://coursion-server.vercel.app/enrollments/count/${course._id}`
            );
            return {
              ...course,
              enrollCount: countRes.data.count || 0,
            };
          })
        );

        const filtered = coursesWithCounts.filter((c) => c.enrollCount > 0);
        const sortedCourses = filtered.sort(
          (a, b) => b.enrollCount - a.enrollCount
        );

        setCourses(sortedCourses.slice(0, 6));
        setLoading(false);
      } catch (err) {
        console.error("Failed to fetch popular courses:", err);
        setLoading(false);
      }
    };

    fetchCoursesWithCounts();
  }, []);

  return (
    <div className="px-4 py-16 max-w-7xl mx-auto">
      <motion.h2
        className="text-3xl sm:text-4xl font-bold text-primary text-center mb-10"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        🔥 Popular Courses
      </motion.h2>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, idx) => (
            <div
              key={idx}
              className="animate-pulse bg-gray-100 h-48 rounded-xl"
            ></div>
          ))}
        </div>
      ) : courses.length === 0 ? (
        <p className="text-center text-gray-500">
          🚫 No popular course available right now.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <motion.div
              key={course._id}
              whileHover={{ scale: 1.03 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="bg-white rounded-xl shadow-md p-6 border border-gray-200 hover:shadow-lg transition-all"
            >
              <h3 className="text-xl font-semibold text-indigo-600 mb-2">
                {course.title}
              </h3>
              <p className="text-gray-600 mb-3 line-clamp-3">
                {course.description?.slice(0, 100)}...
              </p>
              <div className="flex justify-between items-center text-sm text-gray-500">
                <span>👨‍🏫 {course.instructor || "Unknown"}</span>
                <span>👥 {course.enrollCount} enrolled</span>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PopularCourses;
