import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TiTick } from "react-icons/ti";
import { Link, useLocation } from 'react-router-dom';
import Sidebar2 from './components/Sidebar2'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Card, Table, Tabs } from 'antd';
import Topbar from './components/Topbar';
import { ToastContainer, toast } from 'react-toastify';
import { useGeolocated } from "react-geolocated";
import { MdOutlineWrongLocation } from "react-icons/md";
import { Tag } from 'antd';
const localizer = momentLocalizer(moment) // or globalizeLocalizer


const StudentScheduleScreen = () => {

  const location = useLocation();
  const { pathname } = location;
  const { TabPane } = Tabs;
  console.log(pathname);

  const dispatch = useDispatch();

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const logoutHandler = () => {
    dispatch(logout());
  };

  
  const localizer = momentLocalizer(moment) // or globalizeLocalizer

  const MyCalendar = (props) => {
    const today = new Date();
    const tomorrow = new Date();
    tomorrow.setDate(today.getDate() + 1);
  
    // Generate events for today, tomorrow, and this week
    const events = [
      {
        title: 'S for Today',
        start: moment(today).set({ hour: 10, minute: 0, second: 0 }).toDate(),
        end: moment(today).set({ hour: 11, minute: 0, second: 0 }).toDate(),
        color: 'green', // Custom color
      },
      {
        title: 'Event for Today',
        start: today,
        end: today,
        color: 'red', // Custom color
      },
      {
        title: 'Event for Tomorrow',
        start: tomorrow,
        end: tomorrow,
        color: 'green', // Custom color
      },
      {
        title: 'Event for This Week',
        start: moment().startOf('week').toDate(),
        end: moment().endOf('week').toDate(),
        color: 'purple', // Custom color
      },
    ];
    
  
    return (
      <div style={{ height: '100vh' }}>
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
        />
      </div>
    );
  };
  
  return (

<div class="container-fluid">
<div class="row">
<div class="sidebar border border-right col-md-3 col-lg-2 p-0 bg-body-tertiary bg-primary">
    <div class="offcanvas-md offcanvas-end bg-body-tertiary" tabindex="-1" id="sidebarMenu" aria-labelledby="sidebarMenuLabel" style={{background:'blue'}}>
      
      <div class="offcanvas-body d-md-flex flex-column p-0 pt-lg-3" style={{paddingTop:'0 !important'}}>
        {/* <SidebarComponent/> */}
        <Sidebar2/>
   
      </div>
    </div>
  </div>

  <main class="col-md-9 ms-sm-auto col-lg-10 px-md-4 main-content">
    <Topbar/>

   <MyCalendar/>


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

export default StudentScheduleScreen;
