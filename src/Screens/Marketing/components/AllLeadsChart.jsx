import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

const AllLeadsChart = ({ leads }) => {
  ChartJS.register(ArcElement, Tooltip, Legend);

  // Initialize an object to store lead counts by status
  const leadCountsByStatus = {};

  // Count the leads by status
  leads && leads.forEach(lead => {
    lead.status.forEach(statusObj => { // Iterate through status array
      const statusType = statusObj.type; // Extract the status type
      if (!leadCountsByStatus[statusType]) {
        leadCountsByStatus[statusType] = 1;
      } else {
        leadCountsByStatus[statusType]++;
      }
    });
  });

  // Generate data for the doughnut chart
  const data = {
    labels: Object.keys(leadCountsByStatus), // Use status types as labels
    datasets: [
      {
        label: 'Leads by Status',
        data: Object.values(leadCountsByStatus), // Use lead counts as data
        backgroundColor: [
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          // Add more colors as needed
        ],
        borderColor: [
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          // Add more colors as needed
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div style={{ width: '100%', height: '100%' }}>
      <Doughnut data={data} />
    </div>
  );
};

export default AllLeadsChart;
