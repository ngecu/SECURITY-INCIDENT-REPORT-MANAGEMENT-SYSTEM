import { Button, Card,Modal, Form, Input, Select, DatePicker,Result,Tabs  } from 'antd';
import { useEffect, useState } from 'react';

import 'react-calendar/dist/Calendar.css';

import Topbar from './components/Topbar';
import moment from 'moment';

import { Col, Row } from 'react-bootstrap';

import { createStyles, useTheme } from 'antd-style';
import { allMarketLeads, registerMarketLead } from '../../actions/marketingActions';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import Sidebar2 from './components/Sidebar2';
import Loader from '../../Components/Loader';
import ReactQuill from 'react-quill';
import { listEmployees } from '../../actions/userActions';
import { listStudents } from '../../actions/studentActions';

const { Meta } = Card;
const { TabPane } = Tabs;
const useStyle = createStyles(({ token }) => ({

  'my-modal-mask': {
    boxShadow: `inset 0 0 15px #fff`,
  },

}));


const IndexRegistrarScreen = () => {
  const [value, setValue] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [myLeads, setMyLeads] = useState([]);
  const { styles } = useStyle();
  const token = useTheme();
  
  const userLogin = useSelector((state) => state.userLogin)
const { loading, error, userInfo,success } = userLogin

const allEmployees = useSelector((state) => state.allEmployees)
const { loading: allEmployeesLoading, error: allEmployeesError, employees, success: allEmployeesSuccess } = allEmployees

const allStudents = useSelector((state) => state.allStudents)
const { loading: allStudentsLoading, error: allStudentsError, students, success: allStudentsSuccess } = allStudents

const allLeads = useSelector((state) => state.allLeads)
const { loading: allLeadsLoading, error: allLeadsError, leads, success: allLeadsSuccess } = allLeads


const storedUser = JSON.parse(localStorage.getItem('userInfo'));

  const dispatch = useDispatch()


  useEffect(()=>{
    dispatch(listEmployees())
    dispatch(listStudents())
    dispatch(allMarketLeads())
  },[])



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
        {allStudentsError ? <Result
    status="500"
    title="500"
    subTitle="Sorry, something went wrong."
  /> :
        <div class="container pt-5">
    <div class="row align-items-stretch">
      <div class="c-dashboardInfo col-lg-3 col-md-6">
        <div class="wrap">
          <h4 class="heading heading5 hind-font medium-font-weight c-dashboardInfo__title">Students<svg
              class="MuiSvgIcon-root-19" focusable="false" viewBox="0 0 24 24" aria-hidden="true" role="presentation">
              <path fill="none" d="M0 0h24v24H0z"></path>
              <path
                d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z">
              </path>
            </svg></h4><span class="hind-font caption-12 c-dashboardInfo__count">{allStudentsLoading ? <Loader/> : <>{students && <>{students.length}</>}</>}</span>
        </div>
      </div>
     
      <div class="c-dashboardInfo col-lg-3 col-md-6">
        <div class="wrap">
          <h4 class="heading heading5 hind-font medium-font-weight c-dashboardInfo__title">Employees<svg
              class="MuiSvgIcon-root-19" focusable="false" viewBox="0 0 24 24" aria-hidden="true" role="presentation">
              <path fill="none" d="M0 0h24v24H0z"></path>
              <path
                d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z">
              </path>
            </svg></h4><span class="hind-font caption-12 c-dashboardInfo__count">   {allEmployeesLoading ? <Loader/> : <>{employees && <>{employees.length}</>}</>}</span>

        </div>
      </div>

      <div class="c-dashboardInfo col-lg-3 col-md-6">
        <div class="wrap">
          <h4 class="heading heading5 hind-font medium-font-weight c-dashboardInfo__title">Leads<svg
              class="MuiSvgIcon-root-19" focusable="false" viewBox="0 0 24 24" aria-hidden="true" role="presentation">
              <path fill="none" d="M0 0h24v24H0z"></path>
              <path
                d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z">
              </path>
            </svg></h4><span class="hind-font caption-12 c-dashboardInfo__count">{allEmployeesLoading ? <Loader/> : <>{leads && <>{leads.length}</>}</>}</span>
        </div>
      </div>
      <div class="c-dashboardInfo col-lg-3 col-md-6">
        <div class="wrap">
          <h4 class="heading heading5 hind-font medium-font-weight c-dashboardInfo__title">Fees Paid<svg
              class="MuiSvgIcon-root-19" focusable="false" viewBox="0 0 24 24" aria-hidden="true" role="presentation">
              <path fill="none" d="M0 0h24v24H0z"></path>
              <path
                d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z">
              </path>
            </svg></h4><span class="hind-font caption-12 c-dashboardInfo__count">6.40%</span>
        </div>
      </div>
    </div>
  </div>
  }

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

export default IndexRegistrarScreen;
