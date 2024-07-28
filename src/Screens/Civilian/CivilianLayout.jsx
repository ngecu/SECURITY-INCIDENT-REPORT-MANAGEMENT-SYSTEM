import 'react-calendar/dist/Calendar.css';
import Topbar from './components/Topbar';

import {  Col, Row,Table } from 'react-bootstrap';
import { ToastContainer,toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';



import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import Sidebar from './components/Sidebar';
import { Outlet } from 'react-router-dom';

const CivilianLayout = () => {
  const dispatch = useDispatch()

  ChartJS.register(ArcElement, Tooltip, Legend);


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
    <div class="container-fluid">
    <div class="row">
    
      <div class="sidebar border border-right col-md-3 col-lg-2 p-0 bg-body-tertiary bg-primary">
        <div class="offcanvas-md offcanvas-end bg-body-tertiary" tabindex="-1" id="sidebarMenu" aria-labelledby="sidebarMenuLabel">
          
          <div class="offcanvas-body d-md-flex flex-column p-0 pt-lg-3 overflow-y-auto">
          <Sidebar/>
  
       
          </div>
        </div>
      </div>
  
      <main class="col-md-9 ms-sm-auto col-lg-10 px-md-4 main-content">
        <Topbar/>

        <Outlet /> 
      </main>
    </div>


  </div>
 
  );
};

export default CivilianLayout;