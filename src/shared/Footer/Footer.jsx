import React from "react";
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";
import { Link } from "react-router";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-10 px-4 md:px-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">

        <div>
          <h1 className="text-2xl font-bold text-indigo-400">Coursion</h1>
          <p className="mt-2 text-sm text-gray-400">
            Empowering your journey to knowledge and growth 🌱
          </p>
          <div className="flex gap-4 mt-4 text-xl text-gray-400">
            <a href="https://facebook.com/moshiurrahmandeap" target="_blank" rel="noopener noreferrer">
              <FaFacebook className="hover:text-indigo-500 transition" />
            </a>
            <a href="https://twitter.com/@__moshiur" target="_blank" rel="noopener noreferrer">
              <FaTwitter className="hover:text-indigo-500 transition" />
            </a>
            <a href="https://instagram.com/__moshiur.rahman.deap" target="_blank" rel="noopener noreferrer">
              <FaInstagram className="hover:text-indigo-500 transition" />
            </a>
          </div>
        </div>


        <div>
          <h2 className="text-lg font-semibold mb-4">Useful Links</h2>
          <ul className="space-y-2 text-gray-400">
            <li><Link to="/" className="hover:text-white">Home</Link></li>
            <li><Link to="/courses" className="hover:text-white">Courses</Link></li>
            <li><Link to="/about" className="hover:text-white">About Us</Link></li>
          </ul>
        </div>

        <div>
          <h2 className="text-lg font-semibold mb-4">Support</h2>
          <ul className="space-y-2 text-gray-400">
            <li><Link to="/faq" className="hover:text-white">FAQ</Link></li>
            <li><Link to="/contact" className="hover:text-white">Contact</Link></li>
            <li><Link to="/terms" className="hover:text-white">Terms & Conditions</Link></li>
          </ul>
        </div>
      </div>

      <p className="text-center text-sm text-gray-500 mt-10">
        &copy; {new Date().getFullYear()} Coursion. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
