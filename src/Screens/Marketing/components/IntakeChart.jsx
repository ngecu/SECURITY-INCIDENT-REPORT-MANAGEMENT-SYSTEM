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

const IntakeChart = ({ agent,leads }) => {

  console.log("leads ",leads);
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

  const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

  // Replace the sample data with your actual data
  const data = {
    labels,
    datasets: [
      {
        label: 'Intakes',
        data: [300, 400, 500, 600, 700, 800, 900], // Replace with actual data
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      }
    ],
  };

  return <Bar options={options} data={data} />;
};

export default IntakeChart;

