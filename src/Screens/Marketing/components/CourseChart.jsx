import React from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const CourseChart = ({ agent }) => {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: agent, // Set title text dynamically based on agent prop
      },
    },
  };

  // Define health and science course codes
  const labels = ['H101', 'H102', 'H103', 'S101', 'S102']; // Update with health and science course codes

  // Replace the sample data with your actual data
  const data = {
    labels,
    datasets: [
      {
        label: 'Courses',
        data: [300, 400, 500, 600, 700], // Update with actual data for health and science courses
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      }
    ],
  };

  return <Bar options={options} data={data} />;
};

export default CourseChart;
