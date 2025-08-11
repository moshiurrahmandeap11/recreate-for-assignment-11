
import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const CourseProgress = () => {
const [courses, setCourses] = useState([]);
  const [enrollCounts, setEnrollCounts] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://coursion-server.vercel.app/courses")
      .then((res) => res.json())
      .then(async (data) => {
        setCourses(data);


        const counts = {};
        await Promise.all(
          data.map(async (course) => {
            const res = await fetch(`https://coursion-server.vercel.app/enrollments/count/${course._id}`);
            const countData = await res.json();
            counts[course._id] = countData.count || 0; 
          })
        );
        setEnrollCounts(counts);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching courses or enroll counts:", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading...</p>;

  const chartData = {
    labels: courses.map((c) => c.title),
    datasets: [
      {
        label: "Enroll Count",
        data: courses.map((c) => enrollCounts[c._id] || 0),
        backgroundColor: "rgba(59, 130, 246, 0.7)", 
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      title: {
        display: true,
        text: "Course Enrollment Count",
        font: { size: 20 },
      },
    },
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
        <h1 className="text-2xl font-bold text-primary text-center pb-6">Course Progress</h1>
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default CourseProgress;