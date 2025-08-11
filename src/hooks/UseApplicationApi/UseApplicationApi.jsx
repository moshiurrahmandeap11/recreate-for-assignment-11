import React from 'react';
import UseAxios from '../UseAxios/UseAxios';

const UseApplicationApi = () => {
    const axiosSecure = UseAxios();

const enrolledCourse = (email) => {
  if (!email) return Promise.reject("Email is required");
  return axiosSecure.get(`enrollments/byUser/${email}`).then(res => res.data);
};


const manageCourseAxios = () => {
    return axiosSecure.get("/courses").then(res => res.data)
}


    return {
        enrolledCourse,
        manageCourseAxios
    }
};

export default UseApplicationApi;  