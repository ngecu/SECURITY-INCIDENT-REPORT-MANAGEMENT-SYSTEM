import { Button, Card,Upload, Form, Input, Select, DatePicker,Result,Tabs, Checkbox, Radio, Modal  } from 'antd';
import { useEffect, useState } from 'react';
import { UserOutlined, PhoneOutlined,InboxOutlined } from '@ant-design/icons';

import { UploadOutlined } from '@ant-design/icons';

import 'react-calendar/dist/Calendar.css';

import Topbar from './components/Topbar';

import { Badge, Col, Row, Table } from 'react-bootstrap';

import { ToastContainer, toast } from 'react-toastify';
import Sidebar2 from './components/Sidebar2';
import { fetchAllExternalExams, fetchAllSpecialExams, fetchAllSupplementaryExams } from '../../actions/examformActions';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../../Components/Loader';

const { TabPane } = Tabs;


const ExaminerExamScreen = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
const [selectedApplication, setSelectedApplication] = useState(null);


  const dispatch = useDispatch();

  // Retrieve loading and error states from Redux store
  const { loading: loadingExternal, error: errorExternal, exams: externalExams } = useSelector(state => state.externalExamList);
  const { loading: loadingSpecial, error: errorSpecial, exams: specialExams } = useSelector(state => state.specialExamList);
  const { loading: loadingSupplementary, error: errorSupplementary, exams: supplementaryExams } = useSelector(state => state.supplementaryExamList);

  const showModal = (application) => {
    setSelectedApplication(application);
    setIsModalVisible(true);
  };
  
  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const updateApplicationStatus = async (applicationId, newStatus) => {
    console.log(applicationId);
    console.log(newStatus);
    const user_approval = {
      user:userInfo._id,
      decision:newStatus,
      stage:"Examination"  
    }
    dispatch(updateExternalExam(applicationId,user_approval))
  }
  
  useEffect(() => {
    dispatch(fetchAllExternalExams());
    dispatch(fetchAllSpecialExams());
    dispatch(fetchAllSupplementaryExams());
  }, [dispatch]);

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
   
        <Tabs defaultActiveKey="1">
      <TabPane tab="External Applications" key="1">

      {loadingExternal ? <Loader/> :

<Card title="Exernal Applications">
<Table striped bordered hover>
  <thead>
    <tr>
      <th>Name</th>
      <th>Course</th>
      <th>Status</th>
      <th>Module</th>
      <th>Contact</th>
      <th>Actions</th>
    </tr>
  </thead>
  <tbody>
    {externalExams && externalExams.map((application) => (
      <tr key={application._id}>
        <td>{`${application.student.firstName} ${application.student.lastName}`}</td>
        <td>{application.course.name}</td>
        <td>
          <Badge bg={application.status === 'Approved' ? 'success' : 'warning'}>
            {application.status}
          </Badge>
        </td>
        <td>{application.module}</td>
        <td>{application.student.phone}</td>
        <td>
        <Button variant="primary" size="sm" onClick={() => showModal(application)}>
  View
</Button>
        </td>
      </tr>
    ))}
  </tbody>
</Table>

</Card>
}

      </TabPane>

      <TabPane tab="Special Exams Application" key="2">

      {loadingSpecial ? <Loader/> :
<Card title="SPECIAL EXAM APPLICATION FORM">
<Table striped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Course</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {specialExams && specialExams.map((application) => (
            <tr key={application.id}>
              <td>{application.name}</td>
              <td>{application.course}</td>
              <td>
                <Badge bg={application.status === 'Approved' ? 'success' : 'warning'}>
                  {application.status}
                </Badge>
              </td>
              <td>
                <Button variant="primary" size="sm" onClick={() => handleActionClick('view', application)}>
                  View
                </Button>{' '}
                <Button type="primary" size="sm" onClick={() => handleActionClick('approve', application)}>
                  Approve
                </Button>{' '}
                <Button danger size="sm" onClick={() => handleActionClick('deny', application)}>
                  Deny
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
</Card>
}

      </TabPane>

  

      
       
      </Tabs>
  

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

<Modal
  title="Application Details"
  visible={isModalVisible}
  onCancel={handleCancel}
  footer={[
    <Button key="back" onClick={handleCancel}>
      Close
    </Button>,
    <Button key="approve" type="primary" onClick={() => updateApplicationStatus(selectedApplication._id, 'Approved')}>
      Approve
    </Button>,
    <Button key="deny" type="danger" onClick={() => updateApplicationStatus(selectedApplication._id, 'Denied')}>
      Deny
    </Button>
  ]}
>
  {selectedApplication && (
    <div>
      <p><strong>Name:</strong> {selectedApplication.student.firstName} {selectedApplication.student.lastName}</p>
      <p><strong>Course:</strong> {selectedApplication.course.name}</p>
      <p><strong>Status:</strong> {selectedApplication.status}</p>
      <p><strong>Module:</strong> {selectedApplication.module}</p>
      <p><strong>Contact:</strong> {selectedApplication.student.phone}</p>
      <p><strong>Admission No:</strong> {selectedApplication.admNo}</p>
      <p><strong>Date of Birth:</strong> {new Date(selectedApplication.student.dateOfBirth).toLocaleDateString()}</p>
      <p><strong>Email:</strong> {selectedApplication.student.email}</p>
      <p><strong>National ID:</strong> <a href={`http://localhost:5000/${selectedApplication.nationalId}`} target="_blank" rel="noopener noreferrer">View Document</a></p>
      <p><strong>Birth Certificate:</strong> <a href={`http://localhost:5000/${selectedApplication.birthCertificate}`} target="_blank" rel="noopener noreferrer">View Document</a></p>
      <p><strong>Result Slip:</strong> <a href={`http://localhost:5000/${selectedApplication.resultSlip}`} target="_blank" rel="noopener noreferrer">View Document</a></p>
      <p><strong>Refer Result Slip:</strong> <a href={`http://localhost:5000/${selectedApplication.referResultSlip}`} target="_blank" rel="noopener noreferrer">View Document</a></p>
    </div>
  )}
</Modal>


  </div>
 
  );
};

export default ExaminerExamScreen;
