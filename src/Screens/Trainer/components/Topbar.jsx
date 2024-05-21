import { useDispatch, useSelector } from "react-redux";
import { logout } from '../../../actions/userActions';
import { useEffect, useState } from "react";
import { NavDropdown } from "react-bootstrap";
import { FaBell, FaSearch } from 'react-icons/fa';

const Topbar = () => {
  const dispatch = useDispatch();
  const [currentDateTime, setCurrentDateTime] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const logoutHandler = () => {
    dispatch(logout());
  };

  // Define state for showing/hiding message and notification dropdowns
  const [showMessageDropdown, setShowMessageDropdown] = useState(false);
  const [showNotificationDropdown, setShowNotificationDropdown] = useState(false);
  const [showSearchInput, setShowSearchInput] = useState(false);

  // Function to toggle message dropdown
  const toggleMessageDropdown = () => {
    setShowMessageDropdown(!showMessageDropdown);
  };

  // Function to toggle notification dropdown
  const toggleNotificationDropdown = () => {
    setShowNotificationDropdown(!showNotificationDropdown);
  };

  // Function to toggle search input
  const toggleSearchInput = () => {
    setShowSearchInput(!showSearchInput);
  };

  // Function to get greeting based on time
  const getGreeting = () => {
    const hour = currentDateTime.getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 18) return "Good Afternoon";
    if (hour < 22) return "Good Evening";
    return "Good Night";
  };

  return (
    <nav className="main-header navbar navbar-expand navbar-white navbar-light">
      <ul className="navbar-nav">
        <li className="nav-item justify-content-center">
        👋 {getGreeting()} TRAINER
        </li>
      </ul>

      <ul className="navbar-nav ml-auto">
        {currentDateTime.toLocaleString()}
      </ul>
    </nav>
  );
};

export default Topbar;
