import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router";
import axios from "axios";
import { useAuth } from "../../hooks/UseAuth/UseAuth";
import { toast } from "react-toastify";
import Loading from "../Loading/Loading";

const CourseDetails = () => {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEnrolled, setIsEnrolled] = useState(null);
  const [enrolledCount, setEnrolledCount] = useState(0);
  const { user } = useAuth();
  const location = useLocation();

  useEffect(() => {
    document.title = "Details | Coursion";
  }, [location.pathname]);

  // Fetch course details
  useEffect(() => {
    axios
      .get(`https://coursion-server.vercel.app/courses/${id}`)
      .then((res) => {
        setCourse(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching course details", err);
        setLoading(false);
      });
  }, [id]);

  // Enrolled count
  useEffect(() => {
    if (id) {
      axios
        .get(`https://coursion-server.vercel.app/enrollments/count/${id}`)
        .then((res) => {
          setEnrolledCount(res.data.count || 0);
        })
        .catch((err) => {
          console.error("Error fetching enrolled count", err);
        });
    }
  }, [id, isEnrolled]);

  // Check if user is enrolled
  useEffect(() => {
    if (user?.email) {
      axios
        .get(
          `https://coursion-server.vercel.app/enrollments?email=${user.email}&courseId=${id}`
        )
        .then((res) => {
          setIsEnrolled(res.data.enrolled);
        })
        .catch((err) => {
          console.error("Error checking enrollment status", err);
          setIsEnrolled(false);
        });
    } else {
      setIsEnrolled(false);
    }
  }, [user, id]);


  const handleToggleEnroll = () => {
    if (!user?.email) return;

    if (isEnrolled) {
      // UNENROLL
      axios
        .delete(
          `https://coursion-server.vercel.app/enrollments/${user.email}/${id}`,
          {
            withCredentials: true,
            headers: {
              Authorization: `Bearer ${user?.accessToken}`,
            },
          }
        )
        .then(() => {
          toast.info("You’ve been unenrolled.");
          setIsEnrolled(false);
        })
        .catch((err) => {
          console.error("Error unenrolling from course", err);
          toast.error("Couldn’t unenroll. Try again.");
        });
    } else {
      // ENROLL
      axios
        .post("https://coursion-server.vercel.app/enrollments", {
          email: user.email,
          courseId: id,
        })
        .then(() => {
          toast.success("Successfully enrolled!");
          setIsEnrolled(true);
        })
        .catch((err) => {
          console.error("Error enrolling in course", err);

          if (
            err.response?.status === 400 &&
            err.response?.data?.message?.includes("maximum")
          ) {
            toast.warn("You can’t enroll in more than 3 courses.");
          } else if (err.response?.status === 409) {
            toast.warn("You’re already enrolled in this course.");
          } else {
            toast.error("Enrollment failed. Try again later.");
          }
        });
    }
  };

  if (loading) return <Loading />;
  if (!course)
    return <p className="text-center py-10 text-red-500">Course not found.</p>;

  return (
    <div className="max-w-5xl mx-auto p-6 md:p-10 bg-white rounded-lg shadow-md">
      <img
        src={course.image}
        alt={course.title}
        className="w-full h-[350px] object-cover rounded-xl mb-6"
      />

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
        <h1 className="text-3xl font-bold text-indigo-700">{course.title}</h1>
        <span className="text-gray-500">📅 {course.date}</span>
      </div>

      <div className="flex flex-wrap gap-4 mb-6 text-sm">
        <span className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full">
          👨‍🏫 Instructor: {course.instructor || "N/A"}
        </span>
        <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full">
          💲 Price: ${course.price || 0}
        </span>
        <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full">
          🕒 Duration: {course.duration}
        </span>
        <span className="bg-pink-100 text-pink-700 px-3 py-1 rounded-full">
          📚 Lessons: {course.lessons}
        </span>
        <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full">
          🚀 Level: {course.level}
        </span>
        <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full">
          🏷️ Category: {course.category}
        </span>
        <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full">
          🌍 Language: {course.language}
        </span>
      </div>

      <p className="text-gray-700 leading-relaxed text-lg mb-8">
        {course.description}
      </p>

      <div className="flex flex-col sm:flex-row sm:items-center gap-3">
        <button
          onClick={handleToggleEnroll}
          disabled={
            isEnrolled === null ||
            (!isEnrolled && (!user || course.totalSeats - enrolledCount <= 0))
          }
          className={`w-full sm:w-fit px-6 py-3 rounded-lg font-semibold transition ${
            isEnrolled === null
              ? "bg-gray-300 cursor-wait text-white"
              : !isEnrolled && (!user || course.totalSeats - enrolledCount <= 0)
              ? "bg-gray-300 cursor-not-allowed text-white"
              : isEnrolled
              ? "bg-red-600 hover:bg-red-700 cursor-pointer text-white"
              : "bg-indigo-600 hover:bg-indigo-700 cursor-pointer text-white"
          }`}
        >
          {isEnrolled === null
            ? "Checking..."
            : isEnrolled
            ? "Unenroll"
            : !user
            ? "Login to Enroll"
            : course.totalSeats - enrolledCount <= 0
            ? "No Seats Left"
            : "Enroll Now"}
        </button>

        <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full">
          🎟️ Seats Left: {course.totalSeats - enrolledCount}
        </span>

        {!user && (
          <p className="text-sm text-red-500">
            You must be logged in to enroll.
          </p>
        )}
      </div>
    </div>
  );
};

export default CourseDetails;
