// src/pages/LoginPage.js
import React, { useEffect } from 'react';
import { Form, Input, Checkbox, message, Spin } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { Col, Container, Row, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useLoginMutation } from '../features/userApi.js';

const Login = () => {
  const navigate = useNavigate();
  const [login, { isLoading, error, data }] = useLoginMutation();

  useEffect(() => {
    if (error) {
      message.error(error.data.message || 'Login failed');
    }
    if (data) {
      message.success('Login successful');
      navigate('/dashboard'); // Redirect to a dashboard or home page upon successful login
    }
  }, [error, data, navigate]);

  const onFinish = async (values) => {
    const { email, password } = values;
    await login({ email, password });
  };

  const getCurrentYear = () => {
    return new Date().getFullYear();
  };

  return (
    <>
      <Spin spinning={isLoading} size="large">
        <div style={{ background: '#E6F4FF' }}>
          <Container style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
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
                  Sign in to start your session
                </Col>
                <Col md={6}>
                  <Form
                    className="w-100"
                    name="normal_login"
                    layout="vertical"
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    labelCol={{
                      span: 32,
                    }}
                    wrapperCol={{
                      span: 32,
                    }}
                  >
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
                      rules={[{ required: true, message: 'Please input your Password!' }]}
                    >
                      <Input
                        prefix={<LockOutlined className="site-form-item-icon" />}
                        type="password"
                        placeholder="Password"
                      />
                    </Form.Item>

                    <Row>
                      <Col md={6} className="d-flex justify-content-center align-items-center">
                        <Form.Item
                          name="remember"
                          valuePropName="checked"
                          wrapperCol={{
                            offset: 0,
                            span: 32,
                          }}
                          style={{ marginBottom: 0 }}
                        >
                          <Checkbox>Remember me</Checkbox>
                        </Form.Item>
                      </Col>

                      <Col md={6}>
                        <Form.Item
                          wrapperCol={{
                            offset: 0,
                            span: 32,
                          }}
                          style={{ marginBottom: 0 }}
                        >
                          <Button variant="primary" className="w-100 my-2" type="submit" htmlType="submit" style={{ background: '#722E22', borderRadius: '70px' }}>
                            Login
                          </Button>
                        </Form.Item>
                      </Col>

                      <Col md={12} className="d-flex justify-content-center align-items-center">
                        <Link to="report-incident">Need help?🆘Click me👈</Link>
                      </Col>

                      <Col md={12}>
                        <div className="text-center mt-4 text-gray-500">© {getCurrentYear()} National Police Service. All rights reserved.</div>
                      </Col>
                    </Row>
                  </Form>
                </Col>
                <Col md={6} className="d-none d-md-block">
                  <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSP0aFa8XUS06MWb6GeRc85s-Ya8cUGo2J1ZWo63CGwrg&s" alt="" className="w-100" />
                </Col>
              </Row>
            </div>
          </Container>
        </div>
      </Spin>
    </>
  );
};

export default Login;
