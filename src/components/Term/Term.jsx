import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { useLocation } from "react-router";

const Term = () => {
    const location = useLocation();

  useEffect(() => {
  document.title = "Term & Condition | Coursion";
}, [location.pathname]);
  return (
    <div className="min-h-screen bg-base-200 px-4 py-12 flex items-center justify-center">
      <motion.div
        className="max-w-5xl w-full bg-white p-8 md:p-12 rounded-xl shadow-lg"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-4xl font-bold text-primary mb-6 text-center">
          Terms & Conditions
        </h1>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-6 text-gray-700 leading-relaxed"
        >
          <p>
            Welcome to <strong>Courseion</strong>. By accessing or using our platform, you agree to comply with and be bound by the following terms and conditions.
          </p>

          <h2 className="text-2xl font-semibold text-primary">1. Account Usage</h2>
          <p>
            Users must be at least 13 years old to create an account. You are responsible for maintaining the confidentiality of your account and password.
          </p>

          <h2 className="text-2xl font-semibold text-primary">2. Course Content</h2>
          <p>
            All course materials are owned by Courseion or the respective instructors. You may not copy, distribute, or share the materials without permission.
          </p>

          <h2 className="text-2xl font-semibold text-primary">3. Payments & Refunds</h2>
          <p>
            Payments are handled securely. Refunds are only applicable under specific conditions, which are outlined on our refund policy page.
          </p>

          <h2 className="text-2xl font-semibold text-primary">4. Termination</h2>
          <p>
            We reserve the right to suspend or terminate accounts that violate our terms or engage in harmful behavior.
          </p>

          <h2 className="text-2xl font-semibold text-primary">5. Changes to Terms</h2>
          <p>
            Courseion reserves the right to update these terms at any time. Continued use of the platform constitutes your agreement to the new terms.
          </p>

          <p>
            If you have any questions about these terms, feel free to{" "}
            <a
              href="/contact"
              className="text-indigo-600 underline hover:text-indigo-800 transition"
            >
              contact us
            </a>
            .
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Term;
