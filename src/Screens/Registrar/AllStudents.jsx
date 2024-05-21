import { Button, Card,Modal, Form, Input,InputNumber , Select, DatePicker,Result,Tabs  } from 'antd';
import { useEffect, useState } from 'react';
import { FaEye } from 'react-icons/fa';
import 'react-calendar/dist/Calendar.css';

import Topbar from './components/Topbar';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { Col, Row,Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import Sidebar2 from './components/Sidebar2';
import Loader from '../../Components/Loader';
import { listEmployees } from '../../actions/userActions';
import { registerAccountant } from '../../actions/accountantActions';
import { listSchools } from '../../actions/schoolActions';
import { listStudents } from '../../actions/studentActions';


const AllStudentsScreen = () => {
  const { Search } = Input;

  const [filteredEmployees, setfilteredStudents] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedSchool, setSelectedSchool] = useState(null);
  const [selectedCourses, setSelectedCourses] = useState(null);



  const allStudents = useSelector((state) => state.allStudents)
  const { loading: allStudentsLoading, error: allStudentsError, students, success: allStudentsSuccess } = allStudents
  
  const allSchools = useSelector((state) => state.allSchools)
  const { loading: allSchoolsLoading, error: allSchoolsError, schools, success: allSchoolsSuccess } = allSchools


  const registerAccountantR = useSelector((state) => state.allEmployees)
  const { loading: registerAccountantLoading, error: registerAccountantError,  success: registerAccountantSuccess } = registerAccountantR


  const dispatch = useDispatch()

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleSearch = (value) => {
    console.log(value);
    const searchValueLowerCase = value.toLowerCase();
    const filteredEmployees = employees.filter((employee) => {
      const employeeName = `${employee.firstName} ${employee.lastName}`.toLowerCase();
      return (
        employeeName.includes(searchValueLowerCase)
      );
    });
    setfilteredStudents(filteredEmployees);
  };
  const onFinish = (values) => {
    // Handle form submission
    values.status = 'Enquiry'
    values.date =new Date()
    console.log('Form values:', values);

    const role = values.role
    if (role == "Accountant") {
      console.log("i am an accoutnat");
      dispatch(registerAccountant(values))
      
    }

  };

  useEffect(() => {
    if (registerAccountantError) {
      toast.error(registerAccountantError);
    }
  }, [registerAccountantError]);

  useEffect(()=>{
    dispatch(listSchools())
    dispatch(listStudents())
  },[])

  useEffect(() => {
    if (students && students.length > 0) {
      setfilteredStudents(students); // Initialize filteredLeads with leads data
    }
  }, [students]);

  console.log("employees ",students);

  const handleSchoolSelectChange = (value) => {
    // Find the selected school from the list of schools
    const selectedSchool = schools.find(school => school._id === value);
    
    // Set the selected school
    setSelectedSchool(selectedSchool);
  
    // If the selected school is found, set the selected courses to the courses of the selected school
    if (selectedSchool) {
      setSelectedCourses(selectedSchool.courses);
    } else {
      setSelectedCourses([]); // Reset selected courses if no school is selected
    }
  };
  
  
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

          {allStudentsLoading ? <Loader/> : allStudentsError ? (
              <Result
              status="500"
              title="500"
              subTitle="Sorry, something went wrong."
            />)
            :
          <Card title={
          <Row>
            <Col md={8}>
            <h1>All Students({students && students.length})</h1>

            </Col>
            <Col md={4} className='d-flex justify-content-end'>
            <Button className='mx-2' onClick={showModal}>Add Student</Button>
            <Button className='mx-2' danger onClick={showModal}>Convert Lead</Button>
            </Col>
          </Row>
          
          }>

           
          

          

<Row className='my-2'>
  <Col md={6}>
  <Select placeholder="Select Role" style={{ width: '100%', height: '100%' }} >
  <Option value="Agent">Agent</Option>
  <Option value="Accountant">Accountant</Option>
</Select>
  </Col>


  <Col md={6}>
  <div className='w-100'>
      <Search
        placeholder="Name/Status/Source/Agent/Phone Number"
        enterButton="Filter"
        size="large"
        onSearch={handleSearch}
      />
    </div>

  </Col>
</Row>
         

          <Table striped bordered hover>
      <thead>
        <tr>
          <th>Student ID</th>
          <th>Name</th>
          <th>Gender</th>

          <th>Contact Number</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
      {filteredEmployees.map((item, index) => (
         
          <tr key={item.studentID}>
       
            <td>{item.studentID}</td>
            <td>{`${item.firstName} ${item.lastName}`}</td>
            <td>{item.gender}</td>
            
            <td>{item.phone}</td>
            {/* <td>{moment(item.createdAt).format('MMMM Do YYYY, h:mm:ss a')}</td> */}
   
<td>
<Link to={`${item._id}`} className="ant-btn css-dev-only-do-not-override-11xg00t ant-btn-default">
  <FaEye />
</Link>     
</td>

          </tr>
        
        ))}
      </tbody>
    </Table>
          </Card>
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

<Modal
  title="Add Student"
  visible={isModalVisible}
  onOk={handleOk}
  onCancel={handleCancel}
  width={1000}
  footer={[
         
  ]}
>
<Form
  name="add_student_form"
  onFinish={onFinish}
  layout="vertical"
>
  <Row gutter={16}>
    <Col md={6}>
      <Form.Item name="firstName" label="First Name" rules={[{ required: true, message: 'Please enter first name' }]}>
        <Input />
      </Form.Item>
    </Col>
    <Col md={6}>
      <Form.Item name="lastName" label="Last Name" rules={[{ required: true, message: 'Please enter last name' }]}>
        <Input />
      </Form.Item>
    </Col>
    <Col md={6}>
      <Form.Item name="gender" label="Gender" rules={[{ required: true, message: 'Please select gender' }]}>
        <Select>
          <Option value="Male">Male</Option>
          <Option value="Female">Female</Option>
        </Select>
      </Form.Item>
    </Col>
    <Col md={6}>
      <Form.Item name="dateOfBirth" label="Date of Birth" rules={[{ required: true, message: 'Please select date of birth' }]}>
        <DatePicker style={{ width: '100%' }} />
      </Form.Item>
    </Col>
  </Row>
  <Row gutter={16}>
    <Col md={6}>
      <Form.Item name="email" label="Email" rules={[{ required: true, message: 'Please enter email' }, { type: 'email', message: 'Please enter a valid email' }]}>
        <Input />
      </Form.Item>
    </Col>
    <Col md={6}>
      <Form.Item name="phone" label="Phone Number" rules={[{ required: true, message: 'Please enter phone number' }, { type: 'string', message: 'Please enter a valid phone number' }]}>
        <Input />
      </Form.Item>
    </Col>

    <Col md={6}>
    <Form.Item
      name="enrolledSchool"
      label="School"
      rules={[{ required: true, message: 'Please select enrolled courses' }]}
    >
      <Select onChange={handleSchoolSelectChange} value={selectedSchool}>
        {schools && schools.map((school) => (
          <Option key={school._id} value={school._id}>
            {school.name}
          </Option>
        ))}
      </Select>
    </Form.Item>
    </Col>

{selectedSchool && 
    <Col md={6}>
      <Form.Item name="enrolledCourses" label="Enrolled Course" rules={[{ required: true, message: 'Please select enrolled courses' }]}>
        <Select>
            {selectedCourses && selectedCourses.map((course)=>(
                <Option key={course._id} value={course._id}>
                {course.name}
              </Option> 
            ))}
        </Select>
      </Form.Item>
    </Col>
    }
  </Row>
  <Button type="primary" htmlType="submit">
    Submit
  </Button>
</Form>

</Modal>
  </div>
 
  );
};

export default AllStudentsScreen;