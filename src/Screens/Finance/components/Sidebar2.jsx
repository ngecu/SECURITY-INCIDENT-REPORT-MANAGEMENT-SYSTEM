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
    profilePicture: "https://randomuser.me/api/portraits/men/1.jpg" // Example image
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
            <NavLink exact to="/finance/requests" activeClassName="activeClicked">
            <CDBSidebarMenuItem style={location.pathname === '/finance/requests' ? activeLinkStyle : {}}> <GiLandMine className='mx-2' /> Occurence Book</CDBSidebarMenuItem>            
            </NavLink>
            <NavLink exact to="/finance/department_requests" activeClassName="activeClicked">
            <CDBSidebarMenuItem style={location.pathname === '/finance/requests' ? activeLinkStyle : {}}> <GiLandMine className='mx-2' /> Department Requests</CDBSidebarMenuItem>            
            </NavLink>
            <NavLink exact to="/finance/requisitions" activeClassName="activeClicked">
            <CDBSidebarMenuItem style={location.pathname === '/finance/requisitions' ? activeLinkStyle : {}}> <GiLandMine className='mx-2' /> Requisitions</CDBSidebarMenuItem>            
            </NavLink>
            
            <NavLink exact to="/finance/fee_payment" activeClassName="activeClicked" >
            <CDBSidebarMenuItem  style={location.pathname === '/finance/fee_payment' ? activeLinkStyle : {}}> <FaLandMineOn className='mx-2' />Fee Payment </CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/finance/fee_invoicing/voteheads" activeClassName="activeClicked" >
            <CDBSidebarMenuItem  style={location.pathname === '/finance/fee_invoicing/voteheads' ? activeLinkStyle : {}}> <FaLandMineOn className='mx-2' />F.I - Voteheads </CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/finance/fee_invoicing/fee_structure" activeClassName="activeClicked" >
            <CDBSidebarMenuItem  style={location.pathname === '/finance/fee_invoicing/fee_structure' ? activeLinkStyle : {}}> <FaLandMineOn className='mx-2' />F.I - Fee Structure </CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/finance/fee_invoicing/fee_debit" activeClassName="activeClicked" >
            <CDBSidebarMenuItem  style={location.pathname === '/finance/fee_invoicing/fee_debit' ? activeLinkStyle : {}}> <FaLandMineOn className='mx-2' />F.I - Fee Debits </CDBSidebarMenuItem>
            </NavLink>

            <NavLink exact to="/finance/fee_records/payments" activeClassName="activeClicked" >
            <CDBSidebarMenuItem  style={location.pathname === '/finance/fee_records/payments' ? activeLinkStyle : {}}> <FaLandMineOn className='mx-2' />F.R - Payment Records </CDBSidebarMenuItem>
            </NavLink>

            <NavLink exact to="/finance/fee_records/fee_balance" activeClassName="activeClicked" >
            <CDBSidebarMenuItem  style={location.pathname === '/finance/fee_records/fee_balance' ? activeLinkStyle : {}}> <FaLandMineOn className='mx-2' />F.R - Fee Balances </CDBSidebarMenuItem>
            </NavLink>

            <NavLink exact to="/finance/fee_records/mpesa" activeClassName="activeClicked" >
            <CDBSidebarMenuItem  style={location.pathname === '/finance/fee_records/mpesa' ? activeLinkStyle : {}}> <FaLandMineOn className='mx-2' />F.R - Mpesa Transactions </CDBSidebarMenuItem>
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