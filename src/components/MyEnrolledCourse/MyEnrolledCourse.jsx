import React, { useEffect, useState } from "react";
import { useAuth } from "../../hooks/UseAuth/UseAuth";
import axios from "axios";
import { motion } from "framer-motion";
import Loading from "../Loading/Loading";
import Swal from "sweetalert2";
import { useLocation, Link } from "react-router";
import UseApplicationApi from "../../hooks/UseApplicationApi/UseApplicationApi";

const MyEnrolledCourse = () => {
  const { user, loading } = useAuth();
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [isLoadingCourses, setIsLoadingCourses] = useState(true);
  const email = user?.email;
  const location = useLocation();
  const {enrolledCourse} = UseApplicationApi();

  useEffect(() => {
    document.title = "Enrolled Course | Coursion";
  }, [location.pathname]);

  useEffect(() => {
    const fetchEnrolledCourses = async () => {
      if (!email || !user?.accessToken) return;

      setIsLoadingCourses(true);

try {
  const enrollmentData = await enrolledCourse(user.email); 

  const courseResponses = await Promise.all(
    enrollmentData.map((enroll) =>
      axios.get(`https://coursion-server.vercel.app/courses/${enroll.courseId}`)
    )
  );

  const courses = courseResponses.map((r) => r.data);
  setEnrolledCourses(courses);
} catch (err) {
  console.error("Failed to fetch enrolled courses:", err);
} finally {
  setIsLoadingCourses(false);
}

    };

    fetchEnrolledCourses();
  }, [email, user]);

  const handleRemove = async (courseId) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to undo this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, remove it!",
    });

    if (result.isConfirmed) {
      try {
        await axios.delete(
          `https://coursion-server.vercel.app/enrollments/${email}/${courseId}`,
          {
            withCredentials: true,
            headers: {
              Authorization: `Bearer ${user?.accessToken}`,
            },
          }
        );


        setEnrolledCourses((prev) =>
          prev.filter((c) => c._id !== courseId)
        );

        Swal.fire("Removed!", "The course has been removed.", "success");
      } catch (err) {
        console.error("Failed to remove course:", err);
        Swal.fire("Oops!", "Something went wrong.", "error");
      }
    }
  };

  if (loading || isLoadingCourses) return <Loading />;

  return (
    <motion.div
      className="max-w-5xl mx-auto px-4 py-10"
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      <h2 className="text-3xl font-semibold text-center text-indigo-700 mb-8">
        My Enrolled Courses
      </h2>

      {enrolledCourses.length > 0 ? (
        <div className="overflow-x-auto bg-white shadow-lg rounded-xl">
          <table className="min-w-full text-sm">
            <thead className="bg-indigo-100 text-indigo-600">
              <tr>
                <th className="p-4 text-left">#</th>
                <th className="p-4 text-left">Course</th>
                <th className="p-4 text-left">Instructor</th>
                <th className="p-4 text-left">Price</th>
                <th className="p-4 text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {enrolledCourses.map((course, i) => (
                <motion.tr
                  key={course._id}
                  className="border-b hover:bg-indigo-50"
                >
                  <td className="p-4">{i + 1}</td>
                  <td className="p-4">{course.title}</td>
                  <td className="p-4">{course.instructor}</td>
                  <td className="p-4">${course.price}</td>
                  <td className="p-4 text-center">
                    <motion.button
                      onClick={() => handleRemove(course._id)}
                      whileTap={{ scale: 0.95 }}
                      className="bg-red-500 cursor-pointer text-white px-4 py-1.5 rounded-md hover:bg-red-600 transition-colors"
                    >
                      Remove
                    </motion.button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <motion.div
          className="text-center text-gray-500 mt-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <p className="text-lg">You haven't enrolled in any courses yet.</p>
          <p className="text-sm text-gray-400 mt-2">
            Browse our <Link className="text-indigo-600 underline" to="/courses">course catalog</Link> and get started 🎓
          </p>
        </motion.div>
      )}
    </motion.div>
  );
};

export default MyEnrolledCourse;
