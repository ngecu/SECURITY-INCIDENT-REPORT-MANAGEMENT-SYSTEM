import { Button, Card,Modal, Form, Input, Select, DatePicker,Result,Tabs  } from 'antd';
import { useEffect, useState } from 'react';

import 'react-calendar/dist/Calendar.css';

import Topbar from './components/Topbar';
import moment from 'moment';

import { Col, Row } from 'react-bootstrap';

import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import Sidebar2 from './components/Sidebar2';
import Loader from '../../Components/Loader';



const AddEmployeeScreen = () => {

  const userLogin = useSelector((state) => state.userLogin)
const { loading, error, userInfo,success } = userLogin

  return (
    <div class="container-fluid">
    <div class="row">
    <div class="sidebar border border-right col-md-3 col-lg-2 p-0 bg-body-tertiary bg-primary">
        <div class="offcanvas-md offcanvas-end bg-body-tertiary" tabindex="-1" id="sidebarMenu" aria-labelledby="sidebarMenuLabel" style={{background:'blue'}}>
          
          <div class="offcanvas-body d-md-flex flex-column p-0 pt-lg-3" style={{paddingTop:'0 !important'}}>
            <Sidebar2/>
       
          </div>
        </div>
      </div>
  
      <main class="col-md-9 ms-sm-auto col-lg-10 px-md-4 main-content">
        <Topbar/>


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

export default AddEmployeeScreen;
