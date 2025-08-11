import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation } from "react-router";

const faqData = [
  {
    question: "What is Coursion?",
    answer:
      "Coursion is an online learning platform where students can explore and enroll in high-quality courses taught by industry experts.",
  },
  {
    question: "How do I enroll in a course?",
    answer:
      "Once you're logged in, just browse courses, click the one you like, and hit the enroll button. Easy as that!",
  },
  {
    question: "Is there a certificate after completion?",
    answer:
      "Yup! You’ll receive a digital certificate after completing each course. Perfect for your CV or LinkedIn.",
  },
  {
    question: "Are there free courses?",
    answer:
      "Absolutely! We offer both free and premium courses so that anyone can start learning—no wallet stress!",
  },
];

const AccordionItem = ({ qna, isOpen, toggle }) => {
    const location = useLocation();

  useEffect(() => {
  document.title = "FAQ | Coursion";
}, [location.pathname]);
  return (
    <div className="border-b border-gray-300">
      <button
        onClick={toggle}
        className="w-full flex justify-between items-center py-4 text-left focus:outline-none"
      >
        <span className="text-lg font-medium text-gray-800">{qna.question}</span>
        <span className="text-xl font-bold">{isOpen ? "-" : "+"}</span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden pb-4"
          >
            <p className="text-gray-600">{qna.answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const Faq = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleAccordion = (index) => {
    setOpenIndex(index === openIndex ? null : index);
  };

  return (
    <div className="min-h-screen bg-base-200 py-16 px-4 md:px-8">
      <motion.div
        className="max-w-3xl mx-auto"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-4xl font-bold text-primary mb-8 text-center">
          Frequently Asked Questions
        </h2>

        <div className="bg-white shadow-xl rounded-xl p-6 space-y-4">
          {faqData.map((item, index) => (
            <AccordionItem
              key={index}
              qna={item}
              isOpen={openIndex === index}
              toggle={() => toggleAccordion(index)}
            />
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default Faq;
