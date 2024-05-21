import { Card, DatePicker, Dropdown, List, Menu, Modal,Button, Tabs, Select, Badge, Form, Image } from 'antd';
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
import SidebarX from './components/Sidebar';
import { listStudents } from '../../actions/studentActions';
const { TabPane } = Tabs;


const { Option } = Select;

const FeePaymentScreen = () => {
  const dispatch = useDispatch() 
 
  const onFinish = (values) => {
    console.log('Success:', values);
  };

  useEffect(()=>{
    dispatch(listStudents())
  },[])
  const payments = [
    {
      RefID: 413428,
      'Receipt No': '202443350',
      'Paid On': '08/Apr/2024',
      Amount: 300.00,
      'For Year': 2024,
      'Payment Mode': 'M-pesa',
      'Payment Code': 'SD80IHV7LQ',
      Account: 'M-Pesa',
      TrxID: '910549',
      Notes: '',
      'Posted At': '4/8/2024 10:35:43 AM',
      Manage: 'Manage Receipt',
      Print: 'Print A5 Receipt'
    },
    {
      RefID: 413235,
      'Receipt No': '202443274',
      'Paid On': '05/Apr/2024',
      Amount: 24000.00,
      'For Year': 2024,
      'Payment Mode': 'M-PESA',
      'Payment Code': 'SD5983DHC1',
      Account: 'M-Pesa',
      TrxID: '908639',
      Notes: 'System Posting - Paid By. 2547 ***** 886',
      'Posted At': '4/5/2024 12:54:31 PM',
      Manage: 'Manage Receipt',
      Print: 'Print A5 Receipt'
    },
    // Add more payment objects here as needed
  ];

  const allStudents = useSelector((state) => state.allStudents)
  const { loading: allStudentsLoading, error: allStudentsError, students, success: allStudentsSuccess } = allStudents

  
  
  return (
    <div class="container-fluid">
    <div class="row">
      <div class="sidebar border border-right col-md-3 col-lg-2 p-0 bg-body-tertiary bg-primary">
        <div class="offcanvas-md offcanvas-end bg-body-tertiary" tabindex="-1" id="sidebarMenu" aria-labelledby="sidebarMenuLabel">
          
          <div class="offcanvas-body d-md-flex flex-column p-0 pt-lg-3 overflow-y-auto">
        
            <SidebarX/>
  
       
          </div>
        </div>
      </div>
  
      <main class="col-md-9 ms-sm-auto col-lg-10 px-md-4 main-content">
        <Topbar/>
<Card>
    <Form 
      layout='vertical'
      onFinish={onFinish}
    >
      <Row gutter={16} align="middle">
        <Col md={10}>
          
          <Form.Item name="student">
          <Select
      showSearch
      style={{ width: '100%' }} // Adjust width as needed
      placeholder="Select a Student"
      optionFilterProp="children"
      filterOption={(input, option) =>
        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
      }
    >
      {students && students.map((student) => (
        <Option key={student._id} value={student._id}>
          {student.firstName}  {student.lastName} 
        </Option>
      ))}
    </Select>
          </Form.Item>
        </Col>
    
        <Col md={2}>
          <Form.Item>
            <Button type='primary' htmlType="submit" className='w-100'>Search</Button>
          </Form.Item>
        </Col>
      </Row>
    </Form>

    <Row>
        <Col md={3}>
            <p>Name:  JOHN NJOGU KARANJA</p>
            <p>Course : CERTIFICATE IN ORTHOPEDIC AND TRAUMA MEDICINE-Y1S2 ( TERM 1</p>
           
        </Col>
        <Col md={3}>
            <Image style={{height:'100px'}} src="https://app.cloudschool.co.ke/uploads/passports/male_student_2.png" alt="" />
        </Col>

        

        <Col md={6}>
            <Row>
                <Col md={6}>
                <p>Term 1 Debits: 61,300.00</p>
            <p>Term 1 Credits: 37,300.00</p>
            <p className='text-success'>A/c Balance 0.00</p>
                </Col>
                <Col md={6}>
                <p>Year Debits: 61,300.00</p>
            <p>Year Credits: 61,300.00</p>
                   
                </Col>
            </Row>

           
        </Col>
    </Row>

</Card>

<Card title="Post Payment">
<Form
layout='vertical'
>
<Row>
    <Col md={4}>
    <Form.Item name="amount_paid" label="Amount Paid">
        <Input/>
    </Form.Item>
    </Col>
    <Col md={4}>
    <Form.Item name="payment_mode" label="Payment Mode">
    <Select className='w-100'>
              <Option value="">Select Payment Mode</Option>
              <Option value="1">Bank Slip</Option>
              <Option value="2">Mpesa</Option>
              <Option value="3">Cheque</Option>
              <Option value="4">Money Order</Option>
              <Option value="5">Director Scholarship</Option>
              <Option value="6">CDF Cheque</Option>

            </Select>
            </Form.Item>
    </Col>
    <Col md={4}>
    <Form.Item name="payment_code" label="Payment Code">
        <Input/>
    </Form.Item>
    </Col>


    <Col md={12}>
    <Form.Item name="payment_note" label="Payment Note">
        <ReactQuill/>
    </Form.Item>
    </Col>
    <Col md={12}>
          <Form.Item>
            <Button htmlType="submit" className='w-100'>Submit Payment</Button>
          </Form.Item>
        </Col>

</Row>
</Form>
</Card>

<Card>
<Accordion defaultActiveKey="0">
      <Accordion.Item eventKey="0">
        <Accordion.Header>Payment Records</Accordion.Header>
        <Accordion.Body>
        <Table striped bordered hover>
      <thead>
        <tr>
          <th>RefID</th>
          <th>Receipt No</th>
          <th>Paid On</th>
          <th>Amount</th>
          <th>For Year</th>
          <th>Payment Mode</th>
          <th>Payment Code</th>
          <th>Account</th>
          <th>TrxID</th>
          <th>Notes</th>
          <th>Posted At</th>
          <th>Manage</th>
          <th>Print</th>
        </tr>
      </thead>
      <tbody>
        {payments.map((payment) => (
          <tr key={payment.RefID}>
            <td>{payment.RefID}</td>
            <td>{payment['Receipt No']}</td>
            <td>{payment['Paid On']}</td>
            <td>{payment.Amount}</td>
            <td>{payment['For Year']}</td>
            <td>{payment['Payment Mode']}</td>
            <td>{payment['Payment Code']}</td>
            <td>{payment.Account}</td>
            <td>{payment.TrxID}</td>
            <td>{payment.Notes}</td>
            <td>{payment['Posted At']}</td>
            <td>{payment.Manage}</td>
            <td>{payment.Print}</td>
          </tr>
        ))}
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

export default FeePaymentScreen;
