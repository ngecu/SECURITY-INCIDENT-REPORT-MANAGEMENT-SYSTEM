import { Card, DatePicker, Dropdown, List, Menu, Modal,Button, Tabs, Select, Badge, Form, Image, Checkbox, Radio } from 'antd';
import { useEffect, useState } from 'react';
import 'react-calendar/dist/Calendar.css';


import Topbar from './components/Topbar';

import { Accordion, Col, Row, Table } from 'react-bootstrap';
import { Input } from 'antd';
import Sidebar2 from './components/Sidebar2';
import { useDispatch, useSelector } from 'react-redux';

const { TabPane } = Tabs;


const { Option } = Select;




const PaymentRecordScreen = () => {
  const dispatch = useDispatch() 

  const [modalVisible, setModalVisible] = useState(false);

  const handleNewVotehead = () => {
    setModalVisible(true);
  };

  const handleCancel = () => {
    setModalVisible(false);
  };

  const onFinish = (values) => {
    console.log('Success:', values);
    setModalVisible(false);
  };

  
  return (
    <div class="container-fluid">
    <div class="row">
      <div class="sidebar border border-right col-md-3 col-lg-2 p-0 bg-body-tertiary bg-primary">
        <div class="offcanvas-md offcanvas-end bg-body-tertiary" tabindex="-1" id="sidebarMenu" aria-labelledby="sidebarMenuLabel">
          
          <div class="offcanvas-body d-md-flex flex-column p-0 pt-lg-3 overflow-y-auto">
            <Sidebar2/>
  
       
          </div>
        </div>
      </div>
  
      <main class="col-md-9 ms-sm-auto col-lg-10 px-md-4 main-content">
        <Topbar/>
<Card>
<Row>
  <Col md={6}>
    <h4>Fee Payment Records</h4>

  </Col>

</Row>
</Card>

<Card>
<Form layout="vertical" onFinish={onFinish}>
  <Row>
    <Col md={3}>
      <Form.Item label="Select Year" name="year">
        <Select defaultValue="2021">
          <Option value="2021">2021</Option>
          <Option value="2022">2022</Option>
          <Option value="2023">2023</Option>
          <Option value="2024">2024</Option>
        </Select>
      </Form.Item>
    </Col>
    <Col md={3}>
      <Form.Item label="Course" name="course">
        <Select defaultValue="">
          {/* Add options for courses */}
        </Select>
      </Form.Item>
    </Col>
    <Col md={3}>
      <Form.Item label="Term" name="term">
        <Select defaultValue="">
          {/* Add options for sessions */}
        </Select>
      </Form.Item>
    </Col>
    <Col md={3}>
    <Form.Item name="payment_mode" label="Payment Mode">
    <Select className='w-100'>
              <Option value="">Select Payment Mode</Option>
              <Option value="1">Bank Slip</Option>
              <Option value="2">Mpesa</Option>
              <Option value="3">Cheque</Option>
              <Option value="3">Money Order</Option>

            </Select>
            </Form.Item>
    </Col>

    <Col md={3}>
    <Form.Item name="payment_account" label="Account">
    <Select className='w-100'>
              <Option value="">Select Account</Option>
              <Option value="1">Bank Of Baroda</Option>
              <Option value="1">Mpesa</Option>

            </Select>
            </Form.Item>
    </Col>

    <Col md={3}>
    <Form.Item name="payment_date_from" label="Payment Date From">
      <DatePicker className='w-100' />
    </Form.Item>
  </Col>
  <Col md={3}>
    <Form.Item name="payment_date_to" label="Payment Date To">
      <DatePicker className='w-100' />
    </Form.Item>
  </Col>


    <Col md={3}>
    <Form.Item name="studentStatus" label="Status">
    <Select className='w-100'>
              <Option value="">Current Students</Option>
              <Option value="1">Transfered Students</Option>
            </Select>
            </Form.Item>
    </Col>

    <Col md={6}>
    <Form.Item name="search_term" label="Search By AdmNo, Name, Amount or ReceiptNo">
    <Input placeholder=''/>
    </Form.Item>
    </Col>


    <Col md={6}>
      <Form.Item className='w-100'>
        <Button className='w-100' type="primary" htmlType="submit" >
          Fetch Records
        </Button>
      </Form.Item>
    </Col>
  </Row>
</Form>

      <Accordion defaultActiveKey="0">
      <Accordion.Item eventKey="0">
        <Accordion.Header>Fee Invoices Records</Accordion.Header>
        <Accordion.Body>
      <Table striped bordered hover>
      <thead>
      <tr>
  <th>Adm No</th>
  <th>Name</th>
  <th>Course</th>
  <th>Invoice Date</th>
  <th>Year</th>
  <th>Term</th>
  <th>Invoice No</th>
  <th>Amount Invoiced</th>
  <th>Status</th>
  <th>View</th>
</tr>

</thead>

      <tbody>
        {/* Add your table rows here */}
      </tbody>
    </Table>
    </Accordion.Body>
      </Accordion.Item>
   
    </Accordion>

   
    </Card>


      </main>
    </div>
  </div>
 
  );
};

export default PaymentRecordScreen;
