import { Button, Card, Form, Input } from 'antd';
import { Link } from 'react-router-dom';
import { FaEye } from 'react-icons/fa';
import { Col, Image, Row, Table } from 'react-bootstrap';
import Topbar from './components/Topbar';
import UploadComponent from '../../Components/Upload';
import { useState } from 'react';
import Sidebar2 from './components/Sidebar2';
import { useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import parse from 'html-react-parser';
import marketer from '../../assets/marketer.png'

const RegistrarProfileScreen = () => {

  const userLogin = useSelector((state) => state.userLogin)
  const { loading, error, userInfo,success } = userLogin

  
  const storedUser = JSON.parse(localStorage.getItem('userInfo'));
  const user = {
    name: userInfo?.userData?.firstName || storedUser?.userData?.firstName || 'Default Name',
      profilePicture: "https://t3.ftcdn.net/jpg/05/16/27/58/360_F_516275801_f3Fsp17x6HQK0xQgDQEELoTuERO4SsWV.jpg" // Example image
  };
  
    const [formData, setFormData] = useState({
        firstName: storedUser.userData.firstName,
        secondName: 'user.secondName',
        nationalId: 'user.nationalId',
        dob: 'user.dob',
        address: 'user.address',
        phoneNumber: 'user.phoneNumber',
        email: 'user.email',
        department: 'user.department'
      });

      const [form] = Form.useForm();

      const handleSubmit = (values) => {
        // Logic to update user profile with form values
        console.log('Form values:', values);
        const {cpassword,password} = values;

        if(cpassword != password){
          toast.error("Password Mismatch");
        }
        else{
          
        }
      };

      
    
      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
          ...formData,
          [name]: value,
        });
      };


  return (
    <div className="container-fluid">
      <div className="row">
      <div class="sidebar border border-right col-md-3 col-lg-2 p-0 bg-body-tertiary bg-primary">
        <div class="offcanvas-md offcanvas-end bg-body-tertiary" tabindex="-1" id="sidebarMenu" aria-labelledby="sidebarMenuLabel" style={{background:'blue'}}>
          
          <div class="offcanvas-body d-md-flex flex-column p-0 pt-lg-3" style={{paddingTop:'0 !important'}}>
            {/* <SidebarComponent/> */}
            <Sidebar2/>
       
          </div>
        </div>
      </div>

        <main className="col-md-9 col-lg-10 px-md-4 main-content">
        <Topbar/>
        <Row>
            <Col md={4}>
                <Card>
                <div className="p-4 d-flex align-items-center justify-content-between">

                    <Image src={marketer} alt="Profile" className="rounded-circle" style={{ height: '48px', width: '48px' }} />
            </div>
            <Row>
      <Col>
        <Row>
          <Col md={6}>
            <strong>First Name:</strong>
          </Col>
          <Col md={6}>
           {storedUser.userData.firstName}
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <strong>Last Name:</strong>
          </Col>
          <Col md={6}>
            {storedUser.userData.lastName}
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <strong>National ID:</strong>
          </Col>
          <Col md={6}>
            {storedUser.userData.nationalId}
          </Col>
        </Row>
       
        
        <Row>
          <Col md={6}>
            <strong>Phone Number:</strong>
          </Col>
          <Col md={6}>
            +254707583092
          </Col>
        </Row>
        {/* <Row>
          <Col md={6}>
            <strong>Email:</strong>
          </Col>
          <Col md={6}>
            {storedUser.email}
          </Col>
        </Row> */}
        <Row>
          <Col md={6}>
            <strong>Department:</strong>
          </Col>
          <Col md={6}>
            Marketing
            {/* {storedUser.role} */}
          </Col>
        </Row>
      </Col>
    </Row>
                </Card>
                <Card title="Update Profile Photo">
                    <UploadComponent/>
                </Card>
            </Col>
            <Col md={8}>
            <Card title="Update Profile">
                {/* <UploadComponent /> */}
                <Form
              form={form}
              layout='vertical'
              onFinish={handleSubmit}
              initialValues={{
                firstName: storedUser.userData.firstName,
                secondName: storedUser.userData.lastName,
                nationalId: storedUser.userData.nationalId,
                phoneNumber: storedUser.userData.phone,
                email: storedUser.email,
                department: storedUser.role,
              }}
            >
              <Row >
                <Col md={6}>
                  <Form.Item name="firstName" label="First Name">
                    <Input disabled />
                  </Form.Item>
                </Col>
                <Col md={6}>
                  <Form.Item name="secondName" label="Second Name">
                    <Input disabled />
                  </Form.Item>
                </Col>
                <Col md={6}>
                  <Form.Item name="nationalId" label="National ID">
                    <Input disabled />
                  </Form.Item>
                </Col>
              
                <Col md={6}>
                  <Form.Item name="phoneNumber" label="Phone Number">
                    <Input />
                  </Form.Item>
                </Col>
                <Col md={6}>
                  <Form.Item name="email" label="Email">
                    <Input disabled />
                  </Form.Item>
                </Col>
                <Col md={6}>
                  <Form.Item name="department" label="Department">
                    <Input disabled />
                  </Form.Item>
                </Col>

                <Col md={6}>
                  <Form.Item name="password" label="password">
                    <Input />
                  </Form.Item>
                </Col>

                <Col md={6}>
                  <Form.Item name="cpassword" label="Confirm Password">
                    <Input />
                  </Form.Item>
                </Col>

              </Row>
              <Row justify="end">
                <Col>
                  <Button type="primary" htmlType="submit">Update</Button>
                </Col>
              </Row>
            </Form>
            </Card>
            </Col>
        </Row>
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

export default RegistrarProfileScreen;
