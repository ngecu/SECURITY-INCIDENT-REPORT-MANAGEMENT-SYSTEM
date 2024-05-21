import { Button, Card, DatePicker, Dropdown, List, Menu, Modal, Popconfirm, Result, Tabs } from 'antd';
import { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { LinkOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import Topbar from './components/Topbar';
import moment from 'moment';
import BalanceSheet from './components/BalanceSheet';
import IncomeStatement from './components/IncomeStatement';
import {  Col, Row,Table } from 'react-bootstrap';
import Sidebar2 from './components/Sidebar2';
import { ToastContainer,toast } from 'react-toastify';
import { creditAllStudentsFees, listTransactions } from '../../actions/transactionActions';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../../Components/Loader';
import { getAllRequisitions } from '../../actions/requisitionActions';
import { getAllReimbursements } from '../../actions/reimbursmentActions';
import { getAllPettyCash } from '../../actions/pettycashActions';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import SidebarX from './components/Sidebar';

const { TabPane } = Tabs;



const IndexFinanceScreen = () => {
  const dispatch = useDispatch()

  ChartJS.register(ArcElement, Tooltip, Legend);
  const cancel = (e) => {
    console.log(e);
    // message.error('Click on No');
  };
  const { loading,success, error } = useSelector((state) => state.transactionCreditAll);


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
          <SidebarX/>
  
       
          </div>
        </div>
      </div>
  
      <main class="col-md-9 ms-sm-auto col-lg-10 px-md-4 main-content">
        <Topbar/>

     

  <div class="row align-items-stretch">
      <div class="c-dashboardInfo col-lg-12 col-md-12">
        <div class="wrap">
          <Row>
          <Col md={6} className="d-flex justify-content-center align-items-center">
            <h1 className=''>Arrest Summary</h1>
        </Col>
            <Col md={6}>
            <h4 class="heading heading5 hind-font medium-font-weight c-dashboardInfo__title">Today's Arrests<svg
              class="MuiSvgIcon-root-19" focusable="false" viewBox="0 0 24 24" aria-hidden="true" role="presentation">
              <path fill="none" d="M0 0h24v24H0z"></path>
              <path
                d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z">
              </path>
            </svg></h4><span class="hind-font caption-12 c-dashboardInfo__count"> 0</span>
            <span>Today Payments Count : <span class="badge badge-secondary">Kshs. 1</span> </span>
            </Col>
          
          </Row>
        
        </div>
      </div>
     
      <div class="c-dashboardInfo col-lg-6 col-md-6">
        <div class="wrap">
          <h4 class="heading heading5 hind-font medium-font-weight c-dashboardInfo__title">INCIDENT SUMMARY </h4>
          <Table>
            <tr>
              <th>Fee Invoices</th>
              <td>KES 23,317,588.00</td>
            </tr>
            <tr>
              <th>Fee Payments</th>
              <td>KES 18,379,767.00</td>
            </tr>
          </Table>

        </div>
      </div>

      <div class="c-dashboardInfo col-lg-6 col-md-6">
        <div class="wrap">
          <h4 class="heading heading5 hind-font medium-font-weight c-dashboardInfo__title">OCCURENCE SUMMARY</h4>
          
        </div>
      </div>
     
    </div>



      </main>
    </div>

    <ToastContainer
position="top-right"
autoClose={5000}
hideProgressBar
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="dark"
/>

  </div>
 
  );
};

export default IndexFinanceScreen;
