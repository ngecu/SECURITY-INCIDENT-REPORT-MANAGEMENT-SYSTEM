import { Card, DatePicker, Dropdown, List, Menu, Modal,Button, Tabs, Select, Badge, Form, Image, Checkbox, Radio, InputNumber } from 'antd';
import { useEffect, useState } from 'react';
import 'react-calendar/dist/Calendar.css';
import { FaEye, FaEdit, FaTrash } from 'react-icons/fa'; // Import relevant icons
import moment from 'moment';

import Topbar from './components/Topbar';

import { Accordion, Col, Row, Table } from 'react-bootstrap';
import { Input } from 'antd';
import { Link } from 'react-router-dom';
import Sidebar2 from './components/Sidebar2';
import { getAllRequisitions } from '../../actions/requisitionActions';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../../Components/Loader';
import { getAllReimbursements } from '../../actions/reimbursmentActions';
import { getAllPettyCash } from '../../actions/pettycashActions';
import ReactQuill from 'react-quill';
const { TabPane } = Tabs;


const { Option } = Select;




const FeeBalanceScreen = () => {
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
    <h4>Fee Balances</h4>

  </Col>
  <Col md={6}>
    <Button type="primary">
      Send Email Reminder
    </Button>
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
  <Form.Item name="balance_type" label="Balance Type">
    <Select >
      <Option value="1">Balances</Option>
      <Option value="2">Overpayments</Option>
      <Option value="3">Zero Balance</Option>
      <Option value="5">Cleared</Option>
      <Option value="4">All Records</Option>
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
    <Form.Item name="greater_than" label="Greater Than">
    <InputNumber/>
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
      <Form.Item label="Session" name="session">
        <Select defaultValue="">
          {/* Add options for sessions */}
        </Select>
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
<Row>
  <Col md={7} className='my-2'>
  <h5>TOTALS - CERTIFICATE IN MORTUARY SCIENCE (CMS)</h5>

  </Col>
  <Col md={5}>

  </Col>
  <Col md={2} className='text-primary'>
    <p  className='text-primary'>TOTAL DEBITS:</p>
    <p className='text-primary'>387,900.00</p>
  </Col>

  <Col md={2} >
    <p  >TOTAL DISCOUNTS:</p>
    <p >387,900.00</p>
  </Col>

  <Col md={2} className='text-success'>
    <p>TOTAL PAYMENTS:</p>
    <p>387,900.00</p>
  </Col>
  
  <Col md={4} className='text-primary'>
    <p  className='text-primary'>OVERPAYMENTS:</p>
    <p className='text-primary'>-62,100.00</p>
  </Col>

  <Col md={2} className='text-danger'>
    <p>FEE BALANCES::</p>
    <p>36,700.00</p>
  </Col>

</Row>
      <Accordion defaultActiveKey="0">
      <Accordion.Item eventKey="0">
        <Accordion.Header></Accordion.Header>
        <Accordion.Body>
      <Table striped bordered hover>
      <thead>
      <tr>
  <th>AdmNo</th>
  <th>Name</th>
  <th>Course</th>
  <th>Debits</th>
  <th>Other Credits</th>
  <th>Payments</th>
  <th>Balance</th>
  <th>Stmt</th>
</tr>


</thead>

      <tbody>
        {/* Add your table rows here */}
      </tbody>
    </Table>
    </Accordion.Body>
      </Accordion.Item>
   
    </Accordion>

    <Row className='my-4'>
      <Col md={2}>
      <h6>NET BALANCES:</h6>
      <p>-25,400.00 </p>
      <small>(Fee Balance-overpayments)</small>
      </Col>

      <Col md={2}>
      <h6>TOTAL INVOICED STUDENTS:</h6>
      <p className='text-success'>11 </p>
      </Col>

      <Col md={2}>
      <h6>TOTAL FULLY PAID:</h6>
      <p className='text-success'>11 </p>
      </Col>

      <Col md={2}>
      <h6>TOTAL PARTIALLY PAID:</h6>
      <p className='text-success'>11 </p>
      </Col>


      <Col md={2}>
      <h6>TOTAL UNPAID:</h6>
      <p className='text-success'>11 </p>
      </Col>


      <Col md={2}>
      <h6>STUDENTS COUNT</h6>
      <p className='text-success'>11 </p>
      </Col>
      
    </Row>

    <hr/>

    

    <Accordion defaultActiveKey="0">
      <Accordion.Item eventKey="0">
        <Accordion.Header>Fee Analysis Records per Course</Accordion.Header>
        <Accordion.Body>

    <Table striped bordered hover>
            <thead>
                <tr>
                    <th>Course</th>
                    <th>Total Debits</th>
                    <th>Total Credits</th>
                    <th>Total Payment</th>
                    <th>Total Balances</th>
                    <th>Total Overpayments</th>
                    <th>(Balance - Overpayments)</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>CERTIFICATE IN MORTUARY SCIENCE</td>
                    <td>387,900.00</td>
                    <td>0.00</td>
                    <td>413,300.00</td>
                    <td>36,700.00</td>
                    <td>-62,100.00</td>
                    <td>-25,400.00</td>
                </tr>
                <tr>
                    <td></td>
                    <td>387,900.00</td>
                    <td>0.00</td>
                    <td>413,300.00</td>
                    <td>36,700.00</td>
                    <td>-62,100.00</td>
                    <td></td>
                </tr>
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

export default FeeBalanceScreen;
