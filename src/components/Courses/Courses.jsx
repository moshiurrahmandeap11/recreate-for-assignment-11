import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router";
import moment from "moment";
import { useAuth } from "../../hooks/UseAuth/UseAuth";
import Loading from "../Loading/Loading";

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const { loading } = useAuth();

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const { data } = await axios.get("https://coursion-server.vercel.app/courses");

        const latest = [...data]
          .filter(course => course.createdAt)
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          .slice(0, 6);

        setCourses(latest);
      } catch (err) {
        console.error("Error fetching courses:", err);
      }
    };

    fetchCourses();
  }, []);

  if (loading) {
    return <Loading />;
  }

  if (courses.length === 0) {
    return (
      <div className="py-10 px-4 max-w-7xl mx-auto text-center text-xl font-semibold text-gray-700">
              <h2 className="text-3xl font-bold text-center mb-8 text-indigo-600">
        Latest Courses
      </h2>
        No Latest Course Available Right Now.. Please Visit{" "}
        <Link to="/courses" className="text-indigo-600 underline hover:text-indigo-800">
          All Course
        </Link>
      </div>
    );
  }

  return (
    <div className="py-10 px-4 max-w-7xl mx-auto">
      <h2 className="text-3xl font-bold text-center mb-8 text-indigo-600">
        Latest Courses
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {courses.map((course) => (
          <div
            key={course._id}
            className="bg-white shadow-lg rounded-lg overflow-hidden transition hover:shadow-2xl"
          >
            <img
              src={course.image}
              alt={course.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {course.title}
                </h3>
                <p className="bg-accent p-1 rounded-full shadow-2xl px-2 font-semibold">
                  {course.category}
                </p>
              </div>

              {course.instructor && (
                <p className="text-sm text-gray-600 font-medium">
                  Instructor: {course.instructor}
                </p>
              )}

              <p className="text-sm text-gray-500">
                Added {course.createdAt ? moment(course.createdAt).fromNow() : "a while ago"}
              </p>

              <p className="text-sm text-gray-500">
                Added on: {course.createdAt ? moment(course.createdAt).format("MMMM D, YYYY") : "Unknown"}
              </p>

              <Link
                to={`/course-details/${course._id}`}
                className="inline-block mt-4 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition"
              >
                Details
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Courses;
