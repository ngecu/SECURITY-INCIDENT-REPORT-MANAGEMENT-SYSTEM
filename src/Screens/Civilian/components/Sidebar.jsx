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
import { GiLandMine } from 'react-icons/gi';
import {Button} from 'antd'
import { useDispatch, useSelector } from 'react-redux';



const activeLinkStyle = {
    borderRadius: '160px',
    // borderTopLeftRadius: '160px',
    backgroundColor: '#E4C11F',
    color:'black'
    // paddingRight: 0,
    // marginRight: 0
};

const Sidebar = () => {

const storedUser = JSON.parse(localStorage.getItem('userInfo'));

 const user = {
  name:  'Default Name',
    profilePicture: "https://randomuser.me/api/portraits/men/1.jpg" // Example image
};

    const location = useLocation();
    const dispatch = useDispatch()


  return (
    <div style={{ display: 'flex', height: '100vh', overflow: 'scroll initial' }}>
      <CDBSidebar textColor="#fff" backgroundColor="#713131" style={{width:'100%',minWidth:'100%',zIndex:0,paddingTop:0}}>
        <CDBSidebarHeader >
        <div className="d-flex align-items-center justify-content-between">
                <div className="d-flex align-items-center">
                <img width={50} className='rounded-circle mx-2' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSP0aFa8XUS06MWb6GeRc85s-Ya8cUGo2J1ZWo63CGwrg&s" />
                    <h5 className='text-light'>POLICE SERVICE</h5>
                </div>
            </div>
        </CDBSidebarHeader>

        <CDBSidebarContent className="sidebar-content" style={{paddingTop:'0 !important'}}>
          <CDBSidebarMenu>
            <NavLink exact to="/civilian"  >
              <CDBSidebarMenuItem style={location.pathname === '/civilian' ? activeLinkStyle : {}}> <FaHome className='mx-2' />Dashboard</CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/civilian/incidents" activeClassName="activeClicked">
            <CDBSidebarMenuItem style={location.pathname === '/civilian/incidents' ? activeLinkStyle : {}}> <GiLandMine className='mx-2' /> My Incidents</CDBSidebarMenuItem>            
            </NavLink>
              

          </CDBSidebarMenu>
        </CDBSidebarContent>

        <CDBSidebarFooter className="sidebar-footer" style={{padding:'0 17%'}}>
          <NavLink exact to="/" >
          <Button type="primary" style={{ backgroundColor: 'red', borderRadius: '120px' }}>
            <FiLogOut className="mx-2" /> Logout
          </Button>
          </NavLink>
         
        </CDBSidebarFooter>

   
      </CDBSidebar>
    </div>
  );
};

export default Sidebar;