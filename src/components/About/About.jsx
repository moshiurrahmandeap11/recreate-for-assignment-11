import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { FaGraduationCap, FaLaptopCode, FaUsers } from "react-icons/fa";
import { useLocation } from "react-router";

const About = () => {
  const location = useLocation();
  useEffect(() => {
    document.title = "About | Coursion";
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-base-200 py-16 px-4 md:px-10">
      <motion.div
        className="max-w-6xl mx-auto text-center"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <h1 className="text-4xl font-bold text-primary mb-6">About Coursion</h1>
        <p className="text-gray-600 text-lg max-w-3xl mx-auto">
          Coursion is your ultimate destination to learn, grow, and succeed.
          Whether you're just starting your journey or looking to sharpen your
          skills, we've got a course for everyone!
        </p>
      </motion.div>

      <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        <motion.div
          className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition"
          whileHover={{ scale: 1.05 }}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <FaGraduationCap size={40} className="text-indigo-600 mb-4 mx-auto" />
          <h3 className="text-xl font-semibold mb-2">Quality Education</h3>
          <p className="text-gray-600 text-sm">
            Learn from industry experts with practical, real-world projects and
            personalized feedback.
          </p>
        </motion.div>

        <motion.div
          className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition"
          whileHover={{ scale: 1.05 }}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <FaLaptopCode size={40} className="text-indigo-600 mb-4 mx-auto" />
          <h3 className="text-xl font-semibold mb-2">Flexible Learning</h3>
          <p className="text-gray-600 text-sm">
            Study at your own pace, anytime and anywhere. We support both
            beginners and pros!
          </p>
        </motion.div>

        <motion.div
          className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition"
          whileHover={{ scale: 1.05 }}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          <FaUsers size={40} className="text-indigo-600 mb-4 mx-auto" />
          <h3 className="text-xl font-semibold mb-2">Global Community</h3>
          <p className="text-gray-600 text-sm">
            Join thousands of learners from around the world and connect through
            knowledge.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default About;
