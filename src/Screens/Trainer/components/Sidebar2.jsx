import React from 'react';
import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarFooter,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
} from 'cdbreact';
import { FiLogOut } from "react-icons/fi";
import { NavLink,useLocation } from 'react-router-dom';
import logo from '../../../assets/logo.png';
import { Nav, Image, ListGroup } from 'react-bootstrap';
import { FaHome, FaUser } from 'react-icons/fa';
import { FaLandMineOn } from 'react-icons/fa6';
import { logout } from '../../../actions/userActions';
import {Button} from 'antd'
import { useDispatch, useSelector } from 'react-redux';
import { GiLandMine } from 'react-icons/gi';



const activeLinkStyle = {
    borderRadius: '160px',
    // borderTopLeftRadius: '160px',
    backgroundColor: '#6F121F',
    // paddingRight: 0,
    // marginRight: 0
};

const Sidebar2 = () => {

  const userLogin = useSelector((state) => state.userLogin)
const { loading, error, userInfo,success } = userLogin
const storedUser = JSON.parse(localStorage.getItem('userInfo'));

 const user = {
  name: userInfo?.userData?.firstName || storedUser?.userData?.firstName || 'Default Name',
    profilePicture: "https://media.licdn.com/dms/image/D4D03AQGt9xkGfEpjvg/profile-displayphoto-shrink_800_800/0/1669132091975?e=2147483647&v=beta&t=eYCPqN0M-WYfnlLKYhRYv7k_gBsk46YL44g67AGnsxg"
};

    const location = useLocation();
    const dispatch = useDispatch()
    const logoutHandler = () => {
        dispatch(logout())
      }

  return (
    <div style={{ display: 'flex', height: '100vh', overflow: 'scroll initial' }}>
      <CDBSidebar textColor="#fff" backgroundColor="#0D6EFD" style={{width:'100%',minWidth:'100%',zIndex:0,paddingTop:0}}>
        <CDBSidebarHeader >
        <div className="d-flex align-items-center justify-content-between">
                <div className="d-flex align-items-center">
                    <Image src={user.profilePicture} alt="Profile" className="rounded-circle" style={{ height: '48px', width: '48px' }} />
                    <span className="ml-2 text-light">{user.name}</span>
                </div>
            </div>
        </CDBSidebarHeader>

        <CDBSidebarContent className="sidebar-content" style={{paddingTop:'0 !important'}}>
          <CDBSidebarMenu>
            <NavLink exact to="/"  >
              <CDBSidebarMenuItem style={location.pathname === '/' ? activeLinkStyle : {}}> <FaHome className='mx-2' />Dashboard</CDBSidebarMenuItem>
            </NavLink>

            <NavLink exact to="/trainer/requests" activeClassName="activeClicked" >
            <CDBSidebarMenuItem  style={location.pathname === '/trainer/requests' ? activeLinkStyle : {}}> <FaLandMineOn className='mx-2' />Request </CDBSidebarMenuItem>
            </NavLink>

            <NavLink exact to="/trainer/exams" activeClassName="activeClicked" >
            <CDBSidebarMenuItem  style={location.pathname === '/trainer/exams' ? activeLinkStyle : {}}> <FaLandMineOn className='mx-2' />Exams </CDBSidebarMenuItem>
            </NavLink>
  

            <NavLink exact to="/trainer/exam_schedule" activeClassName="activeClicked" >
            <CDBSidebarMenuItem  style={location.pathname === '/trainer/exam_schedule' ? activeLinkStyle : {}}> <FaLandMineOn className='mx-2' />Exam Schedule </CDBSidebarMenuItem>
            </NavLink>

            <NavLink exact to="/trainer/exam_grades" activeClassName="activeClicked" >
            <CDBSidebarMenuItem  style={location.pathname === '/trainer/exam_grades' ? activeLinkStyle : {}}> <FaLandMineOn className='mx-2' />Exam Grades </CDBSidebarMenuItem>
            </NavLink>
  
            <NavLink exact to="/trainer/routine" activeClassName="activeClicked" >
            <CDBSidebarMenuItem  style={location.pathname === '/trainer/routine' ? activeLinkStyle : {}}> <FaLandMineOn className='mx-2' />Class Routine </CDBSidebarMenuItem>
            </NavLink>
{/* 
            <NavLink exact to="/trainer/attendance" activeClassName="activeClicked" >
            <CDBSidebarMenuItem  style={location.pathname === '/trainer/attendance' ? activeLinkStyle : {}}> <FaLandMineOn className='mx-2' />Attendance </CDBSidebarMenuItem>
            </NavLink> */}

            
            <NavLink exact to="/trainer/feedback" activeClassName="activeClicked" >
            <CDBSidebarMenuItem  style={location.pathname === '/trainer/feedback' ? activeLinkStyle : {}}> <FaLandMineOn className='mx-2' />Feedback </CDBSidebarMenuItem>
            </NavLink>

            
          </CDBSidebarMenu>
        </CDBSidebarContent>

        <CDBSidebarFooter className="sidebar-footer" style={{padding:'0 17%'}}>
          <Button type="primary" onClick={logoutHandler} style={{ backgroundColor: 'red', borderRadius: '120px' }}>
            <FiLogOut className="mx-2" /> Logout
          </Button>
        </CDBSidebarFooter>

   
      </CDBSidebar>
    </div>
  );
};

export default Sidebar2;