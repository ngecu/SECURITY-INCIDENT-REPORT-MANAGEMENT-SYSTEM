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


const IndexStudentScreen = () => {
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
  <div class="row pt-3">
     
  <div class="col-xl-4 col-md-6 mb-4">

    <div className="row">
      <div className="col-xl-12 col-md-6 mb-4">
      <div class="card h-100">
      <div class="card-body">
        <div class="row no-gutters align-items-center">
          <div class="col-xl-12 col-md-12 mr-2">
          <div class="no-gutters align-items-center">
            <div class="text-xs font-weight-bold text-uppercase mb-1 text-center">
              <img src={userInfo.userData.photo} width={100} alt="" />
            </div>

            <div class="mt-2 mb-0 text-muted text-xs">
             
            </div>
            </div>
          </div>
          <div class="col-xl-12 col-md-12 mr-2">
          <table className='w-100'>
          <tbody>
<tr>
<td>Email:</td>
<th>{userInfo.email}</th>
</tr>

<tr>
<td>First Name:</td>
<th>{userInfo.userData.firstName}</th>
</tr>
<tr>
<td>Last Name:</td>
<th>{userInfo.userData.lastName}</th>
</tr>
<tr>
<td>Gender:</td>
<th>{userInfo.userData.gender}</th>
</tr>


<tr>
<td>Phone Number:</td>
<th>{userInfo.userData.phone}</th>
</tr>

</tbody>

</table>
          </div>
        </div>
      </div>
    </div>
      </div>

      <div className="col-xl-12 col-md-6 mb-4">
      <div class="card h-100">
      <div class="card-body">
        <div class="row no-gutters align-items-center">
       
          <div class="col-xl-12 col-md-12 mr-2">
          <table className='w-100'>
          <tbody>
<tr>
<td>Rem School Fees:</td>
<th>Ksh.100</th>
</tr>

<tr>
<td>Year of Study:</td>
<th>1</th>
</tr>
<tr>
<td>Year:</td>
<th>2024</th>
</tr>
<tr>
<td>Gender:</td>
<th>{userInfo.userData.gender}</th>
</tr>
<tr>
<td>Date of Birth:</td>
<th>{new Date(userInfo.userData.dob).toLocaleDateString()}</th>

</tr>

<tr>
<td>Religion:</td>
<th>{userInfo.userData.religion}</th>
</tr>



</tbody>

</table>
          </div>
        </div>
      </div>
    </div>
      </div>
    </div>
   
  </div>

  <div class="col-xl-8 col-md-6 mb-4">
    <div className="row">
    <div class="col-xl-12 col-md-6 mb-4">
      <div className="row">
      
      <div class="col-xl-6 col-md-6 mb-4">
<div class="card h-100">
<div class="card-body">
  <div class="row no-gutters align-items-center">
      <div class="col mr-2">
          <div class="text-xs font-weight-bold text-uppercase mb-1">latest grade</div>
          <div class="h5 mb-0 font-weight-bold text-gray-800">C - Criminal Law</div>
          <div class="mt-2 mb-0 text-muted text-xs">
          </div>
      </div>
      <div class="col-auto">
          <i class="fas fa-bell fa-2x text-warning"></i>
      </div>
  </div>
</div>
</div>
</div>

<div class="col-xl-6 col-md-6 mb-4">
<div class="card h-100">
<div class="card-body">
  <div class="row no-gutters align-items-center">
      <div class="col mr-2">
          <div class="text-xs font-weight-bold text-uppercase mb-1">COURSE</div>
          <div class="h5 mb-0 font-weight-bold text-gray-800">CERTIFICATE IN MORTUARY SCIENCE (CMS)</div>
          <div class="mt-2 mb-0 text-muted text-xs">

          </div>
      </div>
      <div class="col-auto">
          <i class="fas fa-calendar-alt fa-2x text-success"></i>
      </div>
  </div>
</div>
</div>
</div>



<div class="col-xl-12 col-md-6 mb-4">
<div class="card">
<div class="card-header">
  <h5 class="mb-0">Latest Exams</h5>
</div>
<div class="card-body">

  <table class="table">
      <thead>
          <tr>
              <th>Exam Type</th>
              <th>Course Unit</th>
              <th>Grade</th>
              <th>Date</th>
          </tr>
      </thead>
      <tbody>
          <tr>
              <td>Main</td>
              <td>Criminal Law</td>
              <td>A</td>
              <td>2023-01-01</td>
          </tr>
        

          <tr>
              <td>Cat</td>
              <td>Criminal Law</td>
              <td>C</td>
              <td>2023-02-01</td>
          </tr>
      </tbody>
  </table>

</div>
</div>
</div>



      </div>
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

export default IndexStudentScreen;
