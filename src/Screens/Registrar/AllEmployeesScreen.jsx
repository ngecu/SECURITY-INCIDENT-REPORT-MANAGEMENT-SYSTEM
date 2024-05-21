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
import { listEmployees, toggleUserActive } from '../../actions/userActions';
import { registerAccountant } from '../../actions/accountantActions';


const AllEmployeeScreen = () => {
  const { Search } = Input;

  const [filteredEmployees, setfilteredEmployees] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const allEmployees = useSelector((state) => state.allEmployees)
  const { loading: allEmployeesLoading, error: allEmployeesError, employees, success: allEmployeesSuccess } = allEmployees
  
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
    setfilteredEmployees(filteredEmployees);
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
  const toggleStatus = (userId)=>{
    dispatch(toggleUserActive(userId))
  }

  useEffect(() => {
    if (registerAccountantError) {
      toast.error(registerAccountantError);
    }
  }, [registerAccountantError]);

  useEffect(()=>{
    dispatch(listEmployees())
  },[])

  useEffect(() => {
    if (employees && employees.length > 0) {
      setfilteredEmployees(employees); // Initialize filteredLeads with leads data
    }
  }, [employees]);

  console.log("employees ",employees);



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


        {allEmployeesLoading ? <Loader /> :  allEmployeesError ? (
  <Result
    status="500"
    title="500"
    subTitle="Sorry, something went wrong."
  />) : (

          <Card title={
          <Row>
            <Col md={8}>
            <h1>All Employees({filteredEmployees && filteredEmployees.length})</h1>

            </Col>
            <Col md={4} className='d-flex justify-content-end'>
            <Button onClick={showModal}>Add Employee</Button>

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
          <th>Employee ID</th>
          <th>Name</th>
          <th>Role</th>
          
          <th></th>
        </tr>
      </thead>
      <tbody>
      {filteredEmployees.map((item, index) => (
         
          <tr key={item.employeeId}>
       
            <td>{item.userData?.firstName} {item.userData?.lastName}</td>
            <td>{item.employeeId}</td>

            <td>{item.role}</td>
               
<td>
{item.isActive ? (
                <button className="btn btn-warning btn-sm" onClick={() => toggleStatus(item._id)}>
                  <i className="fas fa-times"></i> Deactivate
                </button>
              ) : (
                <button className="btn btn-primary btn-sm" onClick={() => toggleStatus(item._id)}>
                  <i className="fas fa-check"></i> Activate
                </button>
              )}

</td>

          </tr>
        
        ))}
      </tbody>
    </Table>
          </Card>
)}
      
     

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
  title="Add Employee"
  visible={isModalVisible}
  onOk={handleOk}
  onCancel={handleCancel}
  width={1000}
  footer={[
         
  ]}
>
  <Form
    name="add_employee_form"
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
        <Form.Item name="email" label="Email" rules={[{ required: true, message: 'Please enter email' }, { type: 'email', message: 'Please enter a valid email' }]}>
          <Input />
        </Form.Item>
      </Col>
      <Col md={6}>
        <Form.Item name="role" label="Role" rules={[{ required: true, message: 'Please select role' }]}>
          <Select>
          <Option value="Agent">Marketing Agent</Option>
              <Option value="Accountant">Accountant</Option>
          </Select>
        </Form.Item>
      </Col>

      <Col md={6}>
        <Form.Item name="nationalId" label="National ID" 
        rules={[
          { required: true, message: 'Please enter employee National ID' },
          { type: 'number', message: 'Please enter a valid number' },
        ]}
        >
        <InputNumber className='w-100'  />
        </Form.Item>
      </Col>

      <Col md={6}>
        <Form.Item name="phone" label="Phone Number" 
        rules={[
          { type: 'number', message: 'Please enter a valid number' },
        ]}
        >
        <InputNumber className='w-100' />
        </Form.Item>
      </Col>

   
   
    
    </Row>
    <Button type="primary" htmlType="submit">
      Submit
    </Button>
  </Form>
</Modal>
  </div>
 
  );
};

export default AllEmployeeScreen;