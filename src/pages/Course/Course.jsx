import React, { useEffect, useState } from "react";
import { useAuth } from "../../hooks/UseAuth/UseAuth";
import Loading from "../../components/Loading/Loading";
import axios from "axios";
import moment from "moment";
import { Link, useLocation } from "react-router";

const Course = () => {
  const {  loading } = useAuth();
  const [course, setCourse] = useState([]);
  const location = useLocation();

  useEffect(() => {
    document.title = "Courses | Coursion";
  }, [location.pathname]);

  useEffect(() => {
    // axios
      .get("https://coursion-server.vercel.app/courses")
      .then((res) => {
        setCourse(res.data);
      })
      .catch((err) => {
        console.log("error", err);
      });
  }, []);

  if (loading) {
    return <Loading />;
  }

  if (course.length === 0) {
    return (
      <div className="py-10 px-4 max-w-7xl mx-auto text-center text-xl font-semibold text-gray-700">
        No Course Available Right Now
      </div>
    );
  }

  return (
    <div className="py-10 px-4 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {course.map((single) => (
          <div
            key={single._id}
            className="bg-white shadow-lg rounded-lg overflow-hidden transition hover:shadow-2xl"
          >
            <img
              src={single.image}
              alt={single.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {single.title}
              </h3>
              <p className="text-sm text-gray-500 mb-2">
                Added on: {moment(single.createdAt).format("MMMM D, YYYY")}
              </p>
              {single.instructor && (
                <p className="text-sm text-gray-600">
                  Instructor: {single.instructor}
                </p>
              )}
              {single.price && (
                <p className="text-sm text-gray-600 mb-2">
                  Price: ${single.price}
                </p>
              )}
              <Link
                to={`/course-details/${single._id}`}
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

export default Course;
