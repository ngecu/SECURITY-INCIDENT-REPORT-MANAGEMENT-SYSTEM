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
    },

    {
      title: 'Event for Today',
      start: today,
      end: today,
    },
    {
      title: 'Event for Today',
      start: today,
      end: today,
    },
    {
      title: 'Event for Today',
      start: today,
      end: today,
    },
    {
      title: 'Event for Tomorrow',
      start: tomorrow,
      end: tomorrow,
    },
    {
      title: 'Event for This Week',
      start: moment().startOf('week').toDate(),
      end: moment().endOf('week').toDate(),
    },
    // Add more events as needed
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

const StudentGradeScreen = () => {

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
  
  const columns = [
   
    {
      title: 'Subject',
      dataIndex: 'subject',
      key: 'subject',
    },
    {
      title: 'Grade',
      dataIndex: 'grade',
      key: 'grade',
      render: grade => {
        let color = grade >= 90 ? 'green' : grade >= 75 ? 'geekblue' : 'volcano';
        return <Tag color={color} key={grade}>{grade}</Tag>;
      }
    },
    {
      title: 'Result',
      dataIndex: 'result',
      key: 'result',
      render: result => result ? <Tag color="success">Passed</Tag> : <Tag color="error">Failed</Tag>
    }
  ];

  const data = [
    {
      key: '1',
      name: 'John Doe',
      subject: 'Mathematics',
      grade: 92,
      result: true,
    },
    {
      key: '2',
      name: 'Jane Smith',
      subject: 'Science',
      grade: 78,
      result: true,
    },
    {
      key: '3',
      name: 'Jim Brown',
      subject: 'History',
      grade: 64,
      result: false,
    },

    {
      key: '1',
      name: 'John Doe',
      subject: 'Mathematics',
      grade: 92,
      result: true,
    },
    {
      key: '2',
      name: 'Jane Smith',
      subject: 'Science',
      grade: 78,
      result: true,
    },
    {
      key: '3',
      name: 'Jim Brown',
      subject: 'History',
      grade: 64,
      result: false,
    },

    {
      key: '1',
      name: 'John Doe',
      subject: 'Mathematics',
      grade: 92,
      result: true,
    },
    {
      key: '2',
      name: 'Jane Smith',
      subject: 'Science',
      grade: 78,
      result: true,
    },
    {
      key: '3',
      name: 'Jim Brown',
      subject: 'History',
      grade: 64,
      result: false,
    },

    {
      key: '1',
      name: 'John Doe',
      subject: 'Mathematics',
      grade: 92,
      result: true,
    },
    {
      key: '2',
      name: 'Jane Smith',
      subject: 'Science',
      grade: 78,
      result: true,
    },
    {
      key: '3',
      name: 'Jim Brown',
      subject: 'History',
      grade: 64,
      result: false,
    },

    {
      key: '1',
      name: 'John Doe',
      subject: 'Mathematics',
      grade: 92,
      result: true,
    },
    {
      key: '2',
      name: 'Jane Smith',
      subject: 'Science',
      grade: 78,
      result: true,
    },
    {
      key: '3',
      name: 'Jim Brown',
      subject: 'History',
      grade: 64,
      result: false,
    },
    // Add more students as needed
  ];
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

      <Card style={{overflow:"auto"}}>
      <Table columns={columns} dataSource={data} pagination={true} />
 </Card>



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

export default StudentGradeScreen;
