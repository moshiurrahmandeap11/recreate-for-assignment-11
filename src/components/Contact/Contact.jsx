import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import emailjs from "emailjs-com";
import { useLocation } from "react-router";



const Contact = () => {
  const location = useLocation();

  useEffect(() => {
  document.title = "Contact | Coursion";
}, [location.pathname]);


  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_woroemc",    
        "template_9dylp4r",  
        e.target,
        "cN285d0udWmtvrcLx"     
      )
      .then(
        (result) => {
          console.log(result.text);
          toast.success("Message sent successfully 🚀", {
          });
          e.target.reset(); 
        },
        (error) => {
          console.log(error.text);
          toast.error("Oops! Something went wrong 😢", {
          });
        }
      );
  };

  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center px-4 py-16">
      <motion.div
        className="w-full max-w-4xl bg-white p-8 rounded-xl shadow-2xl"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-4xl font-bold text-primary text-center mb-10">
          Contact Us
        </h2>

        <form className="space-y-6" onSubmit={sendEmail}>
          <div className="flex flex-col md:flex-row gap-6">
            <div className="w-full">
              <label className="text-sm font-medium text-gray-700">Full Name</label>
              <input
                type="text"
                name="user_name"
                placeholder="John Doe"
                className="w-full mt-1 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                required
              />
            </div>

            <div className="w-full">
              <label className="text-sm font-medium text-gray-700">Email Address</label>
              <input
                type="email"
                name="user_email"
                placeholder="you@example.com"
                className="w-full mt-1 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                required
              />
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">Subject</label>
            <input
              type="text"
              name="subject"
              placeholder="I have a question about..."
              className="w-full mt-1 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary transition-all"
              required
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">Message</label>
            <textarea
              rows="5"
              name="message"
              placeholder="Write your message here..."
              className="w-full mt-1 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary transition-all"
              required
            ></textarea>
          </div>

          <motion.button
            type="submit"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            className="w-full py-3 px-6 bg-primary text-white font-semibold rounded-md shadow-md hover:bg-opacity-90 transition-all duration-300"
          >
            Send Message
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};

export default Contact;
