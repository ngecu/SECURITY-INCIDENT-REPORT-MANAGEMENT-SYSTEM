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
    profilePicture: "https://jfccollege.ac.ke/wp-content/uploads/2023/11/Bev.jpg" // Example image
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
            <NavLink exact to="/registrar/all_employees" activeClassName="activeClicked" >
            <CDBSidebarMenuItem  style={location.pathname === '/registrar/all_employees' ? activeLinkStyle : {}}> <FaLandMineOn className='mx-2' />All Employees </CDBSidebarMenuItem>
            </NavLink>
  

            <NavLink exact to="/registrar/all_students" activeClassName="activeClicked" >
            <CDBSidebarMenuItem  style={location.pathname === '/registrar/all_students' ? activeLinkStyle : {}}> <FaLandMineOn className='mx-2' />All Students </CDBSidebarMenuItem>
            </NavLink>

            <NavLink exact to="/registrar/term_schedule" activeClassName="activeClicked" >
            <CDBSidebarMenuItem  style={location.pathname === '/registrar/term_schedule' ? activeLinkStyle : {}}> <FaLandMineOn className='mx-2' />Term Schedule </CDBSidebarMenuItem>
            </NavLink>

            <NavLink exact to="/registrar/voteheads" activeClassName="activeClicked" >
            <CDBSidebarMenuItem  style={location.pathname === '/registrar/voteheads' ? activeLinkStyle : {}}> <FaLandMineOn className='mx-2' />Voteheads </CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/registrar/fee_structure" activeClassName="activeClicked" >
            <CDBSidebarMenuItem  style={location.pathname === '/registrar/fee_structure' ? activeLinkStyle : {}}> <FaLandMineOn className='mx-2' />Fee Structure </CDBSidebarMenuItem>
            </NavLink>

            <NavLink exact to="/registrar/requests" activeClassName="activeClicked">
            <CDBSidebarMenuItem style={location.pathname === '/registrar/requests' ? activeLinkStyle : {}}> <GiLandMine className='mx-2' /> Requests</CDBSidebarMenuItem>            
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