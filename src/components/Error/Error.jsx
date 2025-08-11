import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router';
import { XOctagon } from 'lucide-react';

const Error = () => {
    const location = useLocation();

  useEffect(() => {
  document.title = "404 Error | Coursion";
}, [location.pathname]);
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: -50 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="text-center bg-white rounded-2xl shadow-2xl p-10 max-w-md w-full"
      >
        <motion.div
          initial={{ rotate: -10 }}
          animate={{ rotate: 0 }}
          transition={{ delay: 0.3, type: "spring", stiffness: 120 }}
          className="flex justify-center mb-6"
        >
          <XOctagon size={60} className="text-red-500" />
        </motion.div>
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Oops!</h1>
        <p className="text-lg text-gray-600 mb-6">
          The page you’re looking for doesn’t exist or has been moved.
        </p>
        <Link to="/" className="inline-block px-6 py-3 bg-red-500 text-white rounded-xl hover:bg-red-600 transition-all">
          Back to Home
        </Link>
      </motion.div>
    </div>
  );
};

export default Error;
