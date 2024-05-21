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
import { Link, NavLink,useLocation } from 'react-router-dom';
import logo from '../../../assets/logo.png';
import { Nav, Image, ListGroup } from 'react-bootstrap';
import { FaBalanceScaleLeft, FaHome, FaUser } from 'react-icons/fa';
import { FaLandMineOn, FaMobileRetro } from 'react-icons/fa6';
import { GiBladeBite, GiLandMine } from 'react-icons/gi';
import { FaPersonCircleQuestion } from "react-icons/fa6";
import { BsSendArrowUpFill } from "react-icons/bs";
import { CgProfile } from "react-icons/cg";
import { logout } from '../../../actions/userActions';
import {Button} from 'antd'
import { useDispatch, useSelector } from 'react-redux';
import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import GridViewRoundedIcon from "@mui/icons-material/GridViewRounded";
import ReceiptRoundedIcon from "@mui/icons-material/ReceiptRounded";
import BarChartRoundedIcon from "@mui/icons-material/BarChartRounded";
import TimelineRoundedIcon from "@mui/icons-material/TimelineRounded";
import { FaFileInvoiceDollar } from "react-icons/fa";
import { RiLuggageDepositFill } from "react-icons/ri";
import { FaCodePullRequest } from "react-icons/fa6";
import { FcDepartment } from "react-icons/fc";
import { MdHowToVote, MdOutlineFeed, MdOutlinePayments, MdPayments } from "react-icons/md";
const activeLinkStyle = {
    borderRadius: '160px',
    // borderTopLeftRadius: '160px',
    backgroundColor: '#6F121F',
    // paddingRight: 0,
    // marginRight: 0
};

const SidebarX = () => {

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
      const isActive = (pathname) => location.pathname === pathname;

  return (
    <div style={{ display: 'flex', height: '100vh', overflow: 'scroll initial' }}>
 <Sidebar className="app">
        <Menu>
          <MenuItem 
           component={<Link to="/" className="link" />}
          className="menu1 my-4">
                    <div className="d-flex align-items-center justify-content-between">
                <div className="d-flex align-items-center">
                    <Image src={user.profilePicture} alt="Profile" className="rounded-circle" style={{ height: '48px', width: '48px' }} />
                    <span className="ml-2 text-light">{user.name}</span>
                </div>
            </div>
          </MenuItem>
          <MenuItem 
          component={<Link to="/" className="link" />}
          style={isActive('/') ? activeLinkStyle : {}}
          icon={<GridViewRoundedIcon />}> Dashboard </MenuItem>
          <MenuItem component={<Link to="/finance/requests"
          style={isActive('/finance/requests') ? activeLinkStyle : {}}
          className="link" />} icon={<FaCodePullRequest />}> Occurence Book </MenuItem>
        
          
          <MenuItem 
          style={isActive('/finance/fee0_payment') ? activeLinkStyle : {}}
          component={<Link to="/finance/fee_payment" className="link" />} icon={<MdPayments />}>Incident Report </MenuItem>

     
          
          <SubMenu label="Police Station" icon={<FaFileInvoiceDollar />}>
            <MenuItem component={<Link to="/finance/fee_invoicing/voteheads" className="link" />}  icon={<MdHowToVote />}> Duties </MenuItem>
            <MenuItem component={<Link to="/finance/fee_invoicing/voteheads" className="link" />}  icon={<MdHowToVote />}> Evidence Room </MenuItem>

          </SubMenu>

          

          <MenuItem component={<Button type="primary" onClick={logoutHandler} style={{ backgroundColor: 'red', borderRadius: '120px',color:'white' }}></Button>} icon={<FiLogOut className="mx-2" />}>LOGOUT </MenuItem>

        </Menu>
      </Sidebar>
    </div>
  );
};

export default SidebarX;