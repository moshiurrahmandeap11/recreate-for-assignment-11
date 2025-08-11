import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import { motion } from "framer-motion";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axios from "axios";
import { useAuth } from "../../hooks/UseAuth/UseAuth";
import Loading from "../Loading/Loading";

const Banner = () => {
  const [slides, setSlides] = useState([]);
  const {loading} = useAuth();

  
  useEffect(() => {
    axios.get("https://coursion-server.vercel.app/banners")
    .then((res) => setSlides(res.data))
    .catch((err) => console.error("Failed to fetch slides:", err));
  }, []);
  
  const settings = {
    dots: true,
    infinite: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    arrows: false,
  };
  
  if(loading){
    return <Loading></Loading>
  }
  return (
    <div className="relative">
      <Slider {...settings}>
        {slides.map((slide) => (
          <div key={slide.id} className="relative h-[85vh]">
            {/* Background image with overlay */}
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${slide.image})` }}
            >
              <div className="absolute inset-0 bg-black/60"></div>
            </div>

            {/* Animated content */}
            <div className="relative z-10 flex flex-col justify-center items-center h-full text-center text-white px-4">
              <motion.h1
                initial={{ opacity: 0, y: -30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-4xl md:text-6xl font-bold mb-4"
              >
                {slide.title}
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
                className="text-lg md:text-2xl"
              >
                {slide.subtitle}
              </motion.p>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Banner;
