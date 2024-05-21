import { Button, Card,Upload, Form, Input, Select, DatePicker,Result,Tabs, Checkbox, Radio, Modal  } from 'antd';
import { useEffect, useState,useRef  } from 'react';
import { UserOutlined, PhoneOutlined,InboxOutlined } from '@ant-design/icons';

import { UploadOutlined } from '@ant-design/icons';

import 'react-calendar/dist/Calendar.css';

import Topbar from './components/Topbar';

import { Badge, Col, Row, Table } from 'react-bootstrap';

import { ToastContainer, toast } from 'react-toastify';
import Sidebar2 from './components/Sidebar2';
import ReactQuill from 'react-quill';
import { useReactToPrint } from 'react-to-print';
import { ComponentToPrint } from './components/ComponentToPrint';


const incidents = [
  {
    id: 1,
    date: '2024-01-01',
    course: 'Mathematics',
    admissionNo: '12345',
    candidateName: 'John Doe',
    examPaper: 'Math101',
    typeOfIncident: 'Use of mobile phone',
    description: 'The candidate was found using a mobile phone during the examination.',
    candidateContacts: '0123456789',
    parentContacts: '9876543210',
    invigilator1: 'Jane Smith',
    invigilator2: 'Doe Ray',
    coordinatorComment: 'Severe breach of examination rules.',
  },
  {
    id: 2,
    date: '2024-02-15',
    course: 'Biology',
    admissionNo: '67890',
    candidateName: 'Alice Johnson',
    examPaper: 'Bio202',
    typeOfIncident: 'Copying from each other',
    description: 'Candidates were observed exchanging notes during the exam.',
    candidateContacts: '0234567891',
    parentContacts: '9876503211',
    invigilator1: 'Mark Bale',
    invigilator2: 'Sara Crow',
    coordinatorComment: 'Action taken with immediate effect to stop the malpractice.',
  },
  {
    id: 3,
    date: '2024-03-10',
    course: 'Chemistry',
    admissionNo: '54321',
    candidateName: 'Emily Clark',
    examPaper: 'Chem300',
    typeOfIncident: 'Unauthorized material in exam room',
    description: 'Found a cheat sheet hidden under the exam paper.',
    candidateContacts: '0345678912',
    parentContacts: '9876432100',
    invigilator1: 'Lucas Grant',
    invigilator2: 'Nora Grey',
    coordinatorComment: 'Candidate was disqualified from the exam session.',
  },
  {
    id: 4,
    date: '2024-04-25',
    course: 'History',
    admissionNo: '98765',
    candidateName: 'Robert Frost',
    examPaper: 'Hist101',
    typeOfIncident: 'Use of mobile phone',
    description: 'Candidate was caught texting during the exam.',
    candidateContacts: '0456789123',
    parentContacts: '9876321000',
    invigilator1: 'Diane Poe',
    invigilator2: 'Sam Neil',
    coordinatorComment: 'Further investigation required to determine penalties.',
  },
  {
    id: 5,
    date: '2024-05-30',
    course: 'Physics',
    admissionNo: '11223',
    candidateName: 'Lisa Ray',
    examPaper: 'Phys201',
    typeOfIncident: 'Others',
    description: 'Disturbance in the exam hall caused by the candidate.',
    candidateContacts: '0567891234',
    parentContacts: '9876210000',
    invigilator1: 'Terry Gill',
    invigilator2: 'Robin Bird',
    coordinatorComment: 'Reviewing CCTV footage for clarity on the incident.',
  },
  ];

const { Meta } = Card;
const { TabPane } = Tabs;


const counties = {
    "Nairobi": ["Westlands", "Kasarani", "Langata", "Starehe"],
    "Kiambu": ["Thika", "Kiambu", "Limuru", "Gatundu"],
    "Mombasa": ["Mvita", "Likoni", "Nyali"],
    // Add other counties and their sub-counties similarly
  };


const ExaminerToPrintScreen = () => {
    const storedUser = JSON.parse(localStorage.getItem('userInfo'));
const [selectedCounty, setSelectedCounty] = useState('');
  const [subCounties, setSubCounties] = useState([]);
  const [showUpload, setShowUpload] = useState(false);
  const [selectedCourses, setSelectedCourses] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedIncident, setSelectedIncident] = useState(null);

  const handleShowModal = (incident) => {
    setSelectedIncident(incident);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  // Example course data
  const courses = [
    { id: 1, name: "Introduction to Psychology" },
    { id: 2, name: "Fundamentals of Computer Science" },
    { id: 3, name: "Modern World History" },
    { id: 4, name: "Environmental Science" },
    { id: 5, name: "Calculus II" },
  ];

    const [form] = Form.useForm();

    
  const handleCourseChange = (value) => {
    console.log("Selected:", value);
    setSelectedCourses(value);
  };


    const onFinish = (values) => {
      console.log('Received values of form:', values);
    };

    const handleCountyChange = (value) => {
        setSelectedCounty(value);
        setSubCounties(counties[value] || []);
        form.setFieldsValue({ subCounty: '' });
      };

    const normFile = (e) => {
        if (Array.isArray(e)) {
          return e;
        }
        return e?.fileList;
      };

      const onEvidenceCheckboxChange = (e) => {
        setShowUpload(e.target.checked);
      };

  // Example of how to structure unit entries
  const basicUnits = [
    { title: "Demonstrate communication skills" },
    { title: "Demonstrate numeracy skills" },
    { title: "Demonstrate digital literacy" },
    { title: "Demonstrate entrepreneurial skills" },
    { title: "Demonstrate employability skills" },
    { title: "Demonstrate environmental literacy" },
    { title: "Demonstrate occupational safety and health practices" }
  ];

  const commonUnits = [
    { title: "Apply nutrition in community health" },
    { title: "Apply epidemiology in community health works" },
    { title: "Apply Human anatomy and physiology" },
    { title: "Apply basic microbiology and parasitology" }
  ];

  const coreUnits = [
    { title: "Provide community health care" },
    { title: "Conduct community-based health care" },
    { title: "Maintain community health information systems" },
    { title: "Conduct community health linkages" },
    { title: "Conduct community health service strategies" },
    { title: "Monitor gender, orphans and vulnerable groups" }
  ];

  // Render units with checkboxes and radio buttons
  const renderUnits = (units) => (
    units.map(unit => (
      <Row key={unit.title}>
        <Col md={10}>
          <Checkbox>{unit.title}</Checkbox>
        </Col>
        <Col md={2}>
          <Radio.Group>
            <Radio value="yes">Yes</Radio>
            <Radio value="no">No</Radio>
          </Radio.Group>
        </Col>
      </Row>
    ))
  );
  
  const showModal = (incident) => {
    setSelectedIncident(incident);
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const applications = [
    {
      id: 1,
      name: 'John Doe',
      course: 'Artisan In Community Health',
      status: 'Pending',
      admissionNo: '12345'
    },
    {
      id: 2,
      name: 'Jane Smith',
      course: 'Artisan In Community Health',
      status: 'Approved',
      admissionNo: '67890'
    },

    {
      id: 1,
      name: 'John Doe',
      course: 'Artisan In Community Health',
      status: 'Pending',
      admissionNo: '12345'
    },
    {
      id: 2,
      name: 'Jane Smith',
      course: 'Artisan In Community Health',
      status: 'Approved',
      admissionNo: '67890'
    },


    {
      id: 1,
      name: 'John Doe',
      course: 'Artisan In Community Health',
      status: 'Pending',
      admissionNo: '12345'
    },
    {
      id: 2,
      name: 'Jane Smith',
      course: 'Artisan In Community Health',
      status: 'Approved',
      admissionNo: '67890'
    },

    {
      id: 1,
      name: 'John Doe',
      course: 'Artisan In Community Health',
      status: 'Pending',
      admissionNo: '12345'
    },
    {
      id: 2,
      name: 'Jane Smith',
      course: 'Artisan In Community Health',
      status: 'Approved',
      admissionNo: '67890'
    },

    {
      id: 1,
      name: 'John Doe',
      course: 'Artisan In Community Health',
      status: 'Pending',
      admissionNo: '12345'
    },
    {
      id: 2,
      name: 'Jane Smith',
      course: 'Artisan In Community Health',
      status: 'Approved',
      admissionNo: '67890'
    },


    // Add more applications as necessary
  ];

  // Function to handle the modal and button actions could go here
  const handleActionClick = (action, application) => {
    console.log(`${action} action for`, application);
    // Implement modal actions or state changes based on the action
  };

  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

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
  <TabPane tab="Cats(10)" key="1">
    <Card>
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
          {applications.map((application) => (
            <tr key={application.id}>
              <td>{application.name}</td>
              <td>{application.course}</td>
              <td>
                <Badge bg={application.status === 'Approved' ? 'success' : 'warning'}>
                  {application.status}
                </Badge>
              </td>
              <td>
              <div>
      <ComponentToPrint ref={componentRef} style={{display:'none'}} />
      <Button onClick={handlePrint}>Print this out!</Button>
    </div>
               
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Card>
  </TabPane>

  <TabPane tab="Exams(10)" key="2">
    <Card>
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
          {applications.map((application) => (
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
                <Button variant="success" size="sm" onClick={() => handleActionClick('approve', application)}>
                  Approve
                </Button>{' '}
                <Button variant="danger" size="sm" onClick={() => handleActionClick('deny', application)}>
                  Deny
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Card>
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

  </div>
 
  );
};

export default ExaminerToPrintScreen;
