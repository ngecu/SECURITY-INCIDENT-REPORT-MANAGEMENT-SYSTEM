import React, { useEffect } from 'react';
import { Form, Input, Select, DatePicker, message, Spin } from 'antd';
import { UserOutlined, LockOutlined, PhoneOutlined, HomeOutlined, IdcardOutlined } from '@ant-design/icons';
import { Col, Container, Row, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useRegisterMutation } from '../features/userApi'; // Correct import
import logo from '../assets/logo.png';

const { Option } = Select;

const SignUp = () => {
  const navigate = useNavigate();
  const [register, { isLoading, error, data }] = useRegisterMutation();

  useEffect(() => {
    if (error) {
      message.error(error.data.message || 'Registration failed');
    }
    if (data) {
      message.success('Registration successful');
      navigate('/login');
    }
  }, [error, data, navigate]);

  const onFinish = async (values) => {
    await register(values);
  };

  const getCurrentYear = () => {
    return new Date().getFullYear();
  };

  return (
    <>
      <Spin spinning={isLoading} size="large">
        <div style={{ background: '#E6F4FF' }}>
          <Container style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <div
              style={{
                boxShadow: 'rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px',
                padding: '20px',
                width: '800px',
                background: '#fff',
                borderRadius: '20px',
              }}
            >
              <Row>
                <Col md={12} className="text-center">
                  <h1 style={{ color: '#252664' }}>NATIONAL POLICE SERVICE</h1>
                  Create your account
                </Col>
                <Col md={12}>
                  <Form
                    className="w-100"
                    name="register"
                    layout="vertical"
                    onFinish={onFinish}
                    labelCol={{
                      span: 32,
                    }}
                    wrapperCol={{
                      span: 32,
                    }}
                  >
                    <Form.Item
                      label="First Name"
                      name="firstName"
                      rules={[{ required: true, message: 'Please input your first name!' }]}
                    >
                      <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="First Name" />
                    </Form.Item>

                    <Form.Item
                      label="Last Name"
                      name="lastName"
                      rules={[{ required: true, message: 'Please input your last name!' }]}
                    >
                      <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Last Name" />
                    </Form.Item>

                    <Form.Item
                      label="Email"
                      name="email"
                      rules={[{ required: true, message: 'Please input your email!' }]}
                    >
                      <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Email" />
                    </Form.Item>

                    <Form.Item
                      label="Password"
                      name="password"
                      rules={[{ required: true, message: 'Please input your password!' }]}
                    >
                      <Input prefix={<LockOutlined className="site-form-item-icon" />} type="password" placeholder="Password" />
                    </Form.Item>

                    <Form.Item
                      label="Confirm Password"
                      name="confirmPassword"
                      dependencies={['password']}
                      hasFeedback
                      rules={[
                        { required: true, message: 'Please confirm your password!' },
                        ({ getFieldValue }) => ({
                          validator(_, value) {
                            if (!value || getFieldValue('password') === value) {
                              return Promise.resolve();
                            }
                            return Promise.reject(new Error('The two passwords do not match!'));
                          },
                        }),
                      ]}
                    >
                      <Input prefix={<LockOutlined className="site-form-item-icon" />} type="password" placeholder="Confirm Password" />
                    </Form.Item>

                    <Row>
                      <Col md={6}>
                        <Form.Item
                          name="phoneNumber"
                          rules={[{ required: true, message: 'Please input your phone number!' }]}
                        >
                          <Input prefix={<PhoneOutlined className="site-form-item-icon" />} placeholder="Phone Number" />
                        </Form.Item>
                      </Col>

                      <Col md={6}>
                        <Form.Item
                          name="address"
                          rules={[{ required: true, message: 'Please input your address!' }]}
                        >
                          <Input prefix={<HomeOutlined className="site-form-item-icon" />} placeholder="Address" />
                        </Form.Item>
                      </Col>
                    </Row>

                    <Row>
                      <Col md={6}>
                        <Form.Item
                          name="dateOfBirth"
                          rules={[{ required: true, message: 'Please select your date of birth!' }]}
                        >
                          <DatePicker placeholder="Date of Birth" style={{ width: '100%' }} />
                        </Form.Item>
                      </Col>

                      <Col md={6}>
                        <Form.Item
                          name="idNumber"
                          rules={[{ required: true, message: 'Please input your ID number!' }]}
                        >
                          <Input prefix={<IdcardOutlined className="site-form-item-icon" />} placeholder="ID Number" />
                        </Form.Item>
                      </Col>
                    </Row>

                    <Row>
                      <Col md={6}>
                        <Form.Item
                          name="gender"
                          rules={[{ required: true, message: 'Please select your gender!' }]}
                        >
                          <Select placeholder="Gender">
                            <Option value="male">Male</Option>
                            <Option value="female">Female</Option>
                            <Option value="other">Other</Option>
                          </Select>
                        </Form.Item>
                      </Col>
                    </Row>

                    <Row>
                      <Col md={6}>
                        <Form.Item
                          wrapperCol={{
                            offset: 0,
                            span: 32,
                          }}
                          style={{ marginBottom: 0 }}
                        >
                          <Button variant="primary" className="w-100 my-2" type="submit" htmlType="submit" style={{ background: '#722E22', borderRadius: '70px' }}>
                            Sign Up
                          </Button>
                        </Form.Item>
                      </Col>

                      <Col md={12} className="d-flex justify-content-center align-items-center">
                        <Link to="/login">Already have an account? Log in</Link>
                      </Col>

                      <Col md={12}>
                        <div className="text-center mt-4 text-gray-500">© {getCurrentYear()} National Police Service. All rights reserved.</div>
                      </Col>
                    </Row>
                  </Form>
                </Col>
               
              </Row>
            </div>
          </Container>
        </div>
      </Spin>
    </>
  );
};

export default SignUp;
