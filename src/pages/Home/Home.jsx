import React, { useEffect } from 'react';
import Banner from '../../components/Banner/Banner';
import Courses from '../../components/Courses/Courses';
import PopularCourses from '../../components/PopularCourses/PopularCourses';
import Testimonials from '../../components/Testimonials/Testimonials';
import CourseProgress from '../../components/CourseProgress/CourseProgress';
import { useLocation } from 'react-router';

const Home = () => {
      const location = useLocation();

  useEffect(() => {
  document.title = "Home | Coursion";
}, [location.pathname]);
    return (
        <div>
            <Banner></Banner>
            <Courses></Courses>
            <PopularCourses></PopularCourses>
            <Testimonials></Testimonials>
            <CourseProgress></CourseProgress>
        </div>
    );
};

export default Home;