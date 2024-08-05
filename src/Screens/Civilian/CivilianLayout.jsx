import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import Sidebar from './components/Sidebar';
import Topbar from './components/Topbar';
import { Outlet } from 'react-router-dom';

ChartJS.register(ArcElement, Tooltip, Legend);

const CivilianLayout = () => {
  const data = {
    labels: ['Fully Paid', 'Partially Paid', 'Unpaid'],
    datasets: [
      {
        data: [300, 150, 50], // Example data, replace with your actual data
        backgroundColor: ['#36A2EB', '#FFCE56', '#FF6384'], // Example colors, customize as needed
        hoverBackgroundColor: ['#36A2EB', '#FFCE56', '#FF6384'],
      },
    ],
  };
  
  const options = {
    responsive: true,
    maintainAspectRatio: false,
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="sidebar border border-right col-md-3 col-lg-2 p-0 bg-body-tertiary bg-primary">
          <div className="offcanvas-md offcanvas-end bg-body-tertiary" tabIndex="-1" id="sidebarMenu" aria-labelledby="sidebarMenuLabel">
            <div className="offcanvas-body d-md-flex flex-column p-0 pt-lg-3 overflow-y-auto">
              <Sidebar />
            </div>
          </div>
        </div>
        <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4 main-content">
          <Topbar />
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default CivilianLayout;
