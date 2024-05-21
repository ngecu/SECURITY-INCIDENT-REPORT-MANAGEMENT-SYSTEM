import { Button, Card, Form, Input } from 'antd';
import { Link } from 'react-router-dom';
import { FaEye } from 'react-icons/fa';
import { Col, Image, Row, Table } from 'react-bootstrap';
import Topbar from './components/Topbar';
import UploadComponent from '../../Components/Upload';
import { useState } from 'react';
import Sidebar2 from './components/Sidebar2';
import { useSelector } from 'react-redux';

const FinanceProfileScreen = () => {

  

    const [formData, setFormData] = useState({
        firstName: 'user.firstName',
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
      };
      const userLogin = useSelector((state) => state.userLogin)
      const { loading, error, userInfo,success } = userLogin

      const storedUser = JSON.parse(localStorage.getItem('userInfo'));
      const user = {
        name: userInfo?.userData?.firstName || storedUser?.userData?.firstName || 'Default Name',
          profilePicture: "https://randomuser.me/api/portraits/men/1.jpg" // Example image
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
        <div class="offcanvas-md offcanvas-end bg-body-tertiary" tabindex="-1" id="sidebarMenu" aria-labelledby="sidebarMenuLabel">
          
          <div class="offcanvas-body d-md-flex flex-column p-0 pt-lg-3 overflow-y-auto">
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

                    <Image src={user.profilePicture} alt="Profile" className="rounded-circle" style={{ height: '48px', width: '48px' }} />
            </div>
            <Row>
      <Col>
        <Row>
          <Col md={6}>
            <strong>First Name:</strong>
          </Col>
          <Col md={6}>
            Bernard
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <strong>Second Name:</strong>
          </Col>
          <Col md={6}>
            Kinyua
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <strong>National ID:</strong>
          </Col>
          <Col md={6}>
            12345678
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <strong>D.O.B:</strong>
          </Col>
          <Col md={6}>
            09/09/1995
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <strong>Address:</strong>
          </Col>
          <Col md={6}>
            Thika
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
        <Row>
          <Col md={6}>
            <strong>Email:</strong>
          </Col>
          <Col md={6}>
            bernard@gmail.com
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <strong>Department:</strong>
          </Col>
          <Col md={6}>
            Finance
          </Col>
        </Row>
      </Col>
    </Row>
                </Card>
                <Card>
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
                firstName: user.firstName,
                secondName: user.secondName,
                nationalId: user.nationalId,
                dob: user.dob,
                address: user.address,
                phoneNumber: user.phoneNumber,
                email: user.email,
                department: user.department,
              }}
            >
              <Row >
                <Col md={6}>
                  <Form.Item name="firstName" label="First Name">
                    <Input />
                  </Form.Item>
                </Col>
                <Col md={6}>
                  <Form.Item name="secondName" label="Second Name">
                    <Input />
                  </Form.Item>
                </Col>
                <Col md={6}>
                  <Form.Item name="nationalId" label="National ID">
                    <Input />
                  </Form.Item>
                </Col>
                <Col md={6}>
                  <Form.Item name="dob" label="Date of Birth">
                    <Input />
                  </Form.Item>
                </Col>
                <Col md={6}>
                  <Form.Item name="address" label="Address">
                    <Input />
                  </Form.Item>
                </Col>
                <Col md={6}>
                  <Form.Item name="phoneNumber" label="Phone Number">
                    <Input />
                  </Form.Item>
                </Col>
                <Col md={6}>
                  <Form.Item name="email" label="Email">
                    <Input />
                  </Form.Item>
                </Col>
                <Col md={6}>
                  <Form.Item name="department" label="Department">
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
    </div>
  );
};

export default FinanceProfileScreen;
