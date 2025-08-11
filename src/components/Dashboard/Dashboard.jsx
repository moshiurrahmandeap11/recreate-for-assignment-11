import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { useAuth } from "../../hooks/UseAuth/UseAuth";
import { useLocation, useNavigate } from "react-router";

const Dashboard = () => {
  const { user, loading: authLoading } = useAuth();
  const [enrollments, setEnrollments] = useState([]);
  const [courses, setCourses] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    document.title = "Dashboard | Coursion";
  }, [location.pathname]);

  const fetchJson = async (url, options = {}) => {
    const res = await fetch(url, options);
    if (!res.ok) throw new Error(`Failed to fetch: ${url}`);
    return res.json();
  };

  useEffect(() => {
    if (!user?.email) return;

    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const enrollmentsData = await fetchJson(
          `https://coursion-server.vercel.app/enrollments/byUser/${user.email}`,
          {
            headers: {
              Authorization: `Bearer ${user.accessToken}`,
            },
            credentials: "include",
          }
        );

        setEnrollments(enrollmentsData);

        const allCourses = await fetchJson(`https://coursion-server.vercel.app/courses`);
        setCourses(allCourses);

        const allReviews = await fetchJson(`https://coursion-server.vercel.app/reviews`);
        setReviews(allReviews);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user]);

  if (authLoading || loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-indigo-600 text-xl font-semibold">Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto p-6 text-red-500 font-semibold">
        Error: {error}
      </div>
    );
  }


  const myCourses = courses.filter((c) => c.email === user.email);
  const enrolledCourseIds = enrollments.map((e) => e.courseId);
  const enrolledCourses = courses.filter((c) =>
    enrolledCourseIds.includes(c._id)
  );
  const myReviews = reviews.filter((r) => r.email === user.email);
  const averageReviewScore =
    myReviews.reduce((acc, cur) => acc + cur.rating, 0) /
    (myReviews.length || 1);


  const data = [
    { name: "My Courses", value: myCourses.length * 10 },
    { name: "Enrolled", value: enrolledCourses.length * 10 },
    { name: "Reviews", value: myReviews.length * 10 },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="max-w-7xl mx-auto p-6 space-y-10"
    >
      <h1 className="text-3xl font-bold text-indigo-600">Dashboard</h1>


      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <motion.div
          whileHover={{ scale: 1.05 }}
          onClick={() => navigate("/addcourse")}
          className="bg-white rounded-xl shadow-md p-6 cursor-pointer transition-transform"
        >
          <h2 className="text-xl font-semibold mb-2">Add Course</h2>
          <p className="text-gray-600">Create new courses easily.</p>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.05 }}
          onClick={() => navigate("/managecourse")}
          className="bg-white rounded-xl shadow-md p-6 cursor-pointer transition-transform"
        >
          <h2 className="text-xl font-semibold mb-2">My Course</h2>
          <p className="text-gray-600">{myCourses.length} courses created</p>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.05 }}
          onClick={() => navigate("/my-enrolled-course")}
          className="bg-white rounded-xl shadow-md p-6 cursor-pointer transition-transform"
        >
          <h2 className="text-xl font-semibold mb-2">Enrolled Course</h2>
          <p className="text-gray-600">
            {enrolledCourses.length} courses enrolled
          </p>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.05 }}
          className="bg-white rounded-xl shadow-md p-6 cursor-pointer transition-transform"
        >
          <h2 className="text-xl font-semibold mb-2">My Reviews</h2>
          <p className="text-gray-600">
            {myReviews.length} reviews, avg rating:{" "}
            {averageReviewScore.toFixed(2)}
          </p>
        </motion.div>
      </div>


      <div className="bg-white rounded-xl shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">Overall Performance</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            data={data}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis domain={[0, 100]} />
            <Tooltip />
            <Bar dataKey="value" fill="#6366f1" radius={[5, 5, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
};

export default Dashboard;
