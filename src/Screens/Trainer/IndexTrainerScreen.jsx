import React, { useState, useEffect } from 'react';
import { Table, Form, Button, Row, Col, ListGroup, Container } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import Sidebar2 from './components/Sidebar2';
import { ToastContainer, toast } from 'react-toastify';
import Topbar from './components/Topbar';

const IndexTrainerScreen = () => {

  const location = useLocation();
  const { pathname } = location;

  console.log(pathname);

  const dispatch = useDispatch();

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;



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

    <div class="row pt-3">
     
     <div class="col-xl-4 col-md-6 mb-4">
       <div class="card h-100">
         <div class="card-body">
           <div class="row no-gutters align-items-center">
             <div class="col mr-2">
               <div class="text-xs font-weight-bold text-uppercase mb-1">Students</div>
               <div class="h5 mb-0 mr-3 font-weight-bold text-gray-800">0</div>
               <div class="mt-2 mb-0 text-muted text-xs">
                
               </div>
             </div>
             <div class="col-auto">
               <i class="fas fa-users fa-2x text-info"></i>
             </div>
           </div>
         </div>
       </div>
     </div>

     <div class="col-xl-4 col-md-6 mb-4">
                   <div class="card h-100">
                     <div class="card-body">
                       <div class="row no-gutters align-items-center">
                         <div class="col mr-2">
                           <div class="text-xs font-weight-bold text-uppercase mb-1">Lecturers</div>
                           <div class="h5 mb-0 font-weight-bold text-gray-800">1</div>
                           <div class="mt-2 mb-0 text-muted text-xs">
                          
                           </div>
                         </div>
                         <div class="col-auto">
                           <i class="fas fa-chalkboard-teacher fa-2x text-danger"></i>
                         </div>
                       </div>
                     </div>
                   </div>
                 </div>
   
     <div class="col-xl-4 col-md-6 mb-4">
       <div class="card h-100">
         <div class="card-body">
           <div class="row align-items-center">
             <div class="col mr-2">
             <div class="text-xs font-weight-bold text-uppercase mb-1">Courses</div>
               <div class="h5 mb-0 font-weight-bold text-gray-800">0</div>
               <div class="mt-2 mb-0 text-muted text-xs">
               
               </div>
             </div>
             <div class="col-auto">
               <i class="fas fa-chalkboard fa-2x text-primary"></i>
             </div>
           </div>
         </div>
       </div>
     </div>

     <div class="col-xl-12 col-md-12 mb-4">

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
<td>Date of Birth:</td>
<th>{userInfo.userData.dob}</th>
</tr>

<tr>
<td>Religion:</td>
<th>{userInfo.userData.religion}</th>
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


</div>

</div>
 </div>


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

export default IndexTrainerScreen;
