import { useDispatch, useSelector } from "react-redux";
import { logout } from '../../../actions/userActions';
import { useEffect, useState } from "react";
import { NavDropdown } from "react-bootstrap";
import { FaBell, FaSearch } from 'react-icons/fa';
import { fetchMyTodaysComments } from "../../../actions/commentActions";

const Topbar = () => {
  const dispatch = useDispatch();
  const [currentDateTime, setCurrentDateTime] = useState(new Date());


  const myTodaysComments = useSelector((state) => state.MyMarketLeads)
  const { loading: myTodaysCommentsLoading, error: myTodaysCommentsError, myComments, success: myTodaysCommentsSuccess } = myTodaysComments
  
  const userLogin = useSelector((state) => state.userLogin)
  const { loading, error, userInfo,success } = userLogin

  
  const agent_id = userInfo?.userData?._id || storedUser?.userData?._id


  useEffect(()=>{
    dispatch(fetchMyTodaysComments(agent_id))
  },[])

  useEffect(() => {
    console.log(myComments);  // Check if it's ever defined
}, [myComments]);


  useEffect(() => {

    if (Notification.permission !== 'denied' || Notification.permission === 'default') {
      Notification.requestPermission();
    }

    const intervalId = setInterval(() => {

      setCurrentDateTime(new Date());

      // if (new Date().getSeconds() % 30 === 0) {
      //   showNotification();
      // }

  


    }, 1000);

    return () => clearInterval(intervalId);

    
  }, []);

  const showNotification = () => {
    if (Notification.permission === 'granted') {
      const notification = new Notification('Hello!', {
        body: 'This is your notification at 30-second intervals!',
        icon: '/path/to/icon.png' // optional icon path
      });
    }
  };




  // console.log(currentDateTime);

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
        👋 {getGreeting()} MARKETING AGENT
        </li>
      </ul>

      <ul className="navbar-nav ml-auto">
        {currentDateTime.toLocaleString()}
      </ul>
    </nav>
  );
};

export default Topbar;
