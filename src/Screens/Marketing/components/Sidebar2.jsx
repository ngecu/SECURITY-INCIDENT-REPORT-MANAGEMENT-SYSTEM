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
import { GiLandMine } from 'react-icons/gi';
import { FaPersonCircleQuestion } from "react-icons/fa6";
import { BsSendArrowUpFill } from "react-icons/bs";
import { CgProfile } from "react-icons/cg";
import { logout } from '../../../actions/userActions';
import {Button} from 'antd'
import { useDispatch, useSelector } from 'react-redux';
import marketer from '../../../assets/marketer.png'


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
const storedUser = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null;
const shouldShowNavLink = storedUser && storedUser.isHead;

 const user = {
  name: userInfo?.userData?.firstName || storedUser?.userData?.firstName || 'Default Name',
    profilePicture: "https://t3.ftcdn.net/jpg/05/16/27/58/360_F_516275801_f3Fsp17x6HQK0xQgDQEELoTuERO4SsWV.jpg" // Example image
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
                    <Image src={marketer} alt="Profile" className="rounded-circle" style={{ height: '48px', width: '48px' }} />
                    <span className="ml-2 text-light">{user.name}</span>
                </div>
            </div>
        </CDBSidebarHeader>

        <CDBSidebarContent className="sidebar-content" style={{paddingTop:'0 !important'}}>
          <CDBSidebarMenu>
            <NavLink exact to="/"  >
              <CDBSidebarMenuItem style={location.pathname === '/' ? activeLinkStyle : {}}> <FaHome className='mx-2' />Dashboard</CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/marketing/all_leads" activeClassName="activeClicked" >
            <CDBSidebarMenuItem  style={location.pathname === '/marketing/all_leads' ? activeLinkStyle : {}}> <FaLandMineOn className='mx-2' />All Leads </CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/marketing/my_leads" activeClassName="activeClicked">
            <CDBSidebarMenuItem style={location.pathname === '/marketing/my_leads' ? activeLinkStyle : {}}> <GiLandMine className='mx-2' /> My Leads</CDBSidebarMenuItem>            </NavLink>

            <NavLink exact to="/marketing/requests" activeClassName="activeClicked">
            <CDBSidebarMenuItem style={location.pathname === '/marketing/requests' ? activeLinkStyle : {}}> <BsSendArrowUpFill className='mx-2' />Requests</CDBSidebarMenuItem>  </NavLink>
            
<React.Fragment>
            {shouldShowNavLink && (
                <NavLink exact to="/marketing/department_requests" activeClassName="activeClicked">
                    <CDBSidebarMenuItem style={location.pathname === '/marketing/department_requests' ? activeLinkStyle : {}} icon="column">
                        <BsSendArrowUpFill className='mx-2' /> Department Requests
                    </CDBSidebarMenuItem>
                </NavLink>
            )}
            </React.Fragment>
                       
            <NavLink exact to="/marketing/profile" activeClassName="activeClicked">
            <CDBSidebarMenuItem style={location.pathname === '/marketing/profile' ? activeLinkStyle : {}}> <CgProfile className='mx-2' />My  Profile</CDBSidebarMenuItem>  </NavLink>

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