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
import SidebarX from './components/Sidebar';
const { TabPane } = Tabs;


const { Option } = Select;




const AllMpesaScreen = () => {
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
          <SidebarX/>
  
       
          </div>
        </div>
      </div>
  
      <main class="col-md-9 ms-sm-auto col-lg-10 px-md-4 main-content">
        <Topbar/>
<Card>
<Row>
  <Col md={6}>
    <h4>All Mpesa Payments</h4>

  </Col>

</Row>
</Card>

<Card>
<Form layout="vertical" onFinish={onFinish}>
  <Row>

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
    <Form.Item name="trx_code" label="Trx Code">
    <Input placeholder=''/>
    </Form.Item>
    </Col>


    <Col md={3}>
      <Form.Item className='w-100'>
        <Button className='w-100' type="primary" htmlType="submit" >
        Search
        </Button>
      </Form.Item>
    </Col>
  </Row>
</Form>
    </Card>

<Card title="Mpesa Transactions" className='my-2'>
<Table striped bordered hover responsive>
            <thead>
                <tr>
                    <th>Date</th>
                    <th>Phone</th>
                    <th>Reference</th>
                    <th>Account</th>
                    <th>Amount</th>
                    <th>FirstName</th>
                   
                    <th>Status</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>4/20/2024 11:53:31 AM</td>
                    <td>2547 ***** 989</td>
                    <td>SDK2QYMQX6</td>
                    <td>DPTT/551/M23</td>
                   
                    <td>8,000.00</td>
                    <td>DORRIS</td>
                    
                    <td><Badge class="badge badge-success"> POSTED </Badge></td>
                </tr>
                <tr>
                    <td>4/20/2024 11:53:31 AM</td>
                    <td>2547 ***** 989</td>
                    <td>SDK2QYMQX6</td>
                    <td>DPTT/551/M23</td>
                   
                    <td>8,000.00</td>
                    <td>DORRIS</td>
               
                    <td><Badge class="badge badge-danger"> UNPOSTED </Badge></td>
                </tr>
            </tbody>
        </Table>
  </Card>

      </main>
    </div>
  </div>
 
  );
};

export default AllMpesaScreen;
