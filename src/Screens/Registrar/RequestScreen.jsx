import {  Card,Modal, Form, Input, Select, DatePicker,Result,Tabs, Radio, Button  } from 'antd';
import { useEffect, useState } from 'react';

import 'react-calendar/dist/Calendar.css';

import Topbar from './components/Topbar';
import moment from 'moment';

import { Col, Container, Row, Table } from 'react-bootstrap';
import { createStyles, useTheme } from 'antd-style';
import { allMarketLeads, registerMarketLead } from '../../actions/marketingActions';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import Sidebar2 from './components/Sidebar2';
import Loader from '../../Components/Loader';
import ReactQuill from 'react-quill';
import { IoIosAddCircle } from "react-icons/io";
import { MdDeleteOutline } from "react-icons/md";
import { createLeave } from '../../actions/leaveActions';
import { createRequisition } from '../../actions/requisitionActions';
const { Meta } = Card;
const { TabPane } = Tabs;
const useStyle = createStyles(({ token }) => ({

  'my-modal-mask': {
    boxShadow: `inset 0 0 15px #fff`,
  },

}));


const RequestRegistrarScreen = () => {

    const [leaveType, setLeaveType] = useState(''); // State to manage selected leave type
    const [description, setDescription] = useState(''); // State to manage description for "Other" leave type
    const [numDaysRequested, setNumDaysRequested] = useState(0); // State to manage number of days requested
    const [leaveRequester, setLeaveRequester] = useState(''); // State to manage leave requester's full name
    const [fromDate, setFromDate] = useState(null); // State to manage from date
    const [toDate, setToDate] = useState(null); // State to manage to date
    const [showNumDaysRequested, setShowNumDaysRequested] = useState(false); // State to manage visibility of number of days requested
    const [serialNumber, setSerialNumber] = useState(1);
    const [daysAllowed,setDaysAllowed] = useState(0)
    const [items, setItems] = useState([{
        id: serialNumber,
      itemName: '',
      description: '',
      quantity: 1,
      subtotal: 0,
    }]);
    const dispatch = useDispatch()

    

    // Function to handle changes in selected leave type
  const handleLeaveTypeChange = (e) => {
    console.log(e.target.value);
    setLeaveType(e.target.value);
    // If the selected leave type is not "Other", clear the description
    if (e.target.value !== 'other') {
      setDescription('');
    }

    if (e.target.value === 'sick') {
      setDaysAllowed(7)
    
  } else if (e.target.value === 'exam') {
    setDaysAllowed(14)

  } else if (e.target.value === 'annual') {
    setDaysAllowed(30)

  } else if (e.target.value === 'maternity') {
    setDaysAllowed(90)

  } else if (e.target.value === 'paternity') {
    setDaysAllowed(14)

  } else {
    setToDate(null);
  }
   
  };


  const handleApplyLeave = (values) => {
   console.log("values ",values);
   dispatch(createLeave(values))
  };


  const handleApplyRequistion = () => {
    // console.log(items);
    dispatch(createRequisition(items))
  };

  const handleAddItem = () => {
    // Create a new item object with default values
    const newItem = {
      id: serialNumber,
      itemName: '',
      description: '',
      quantity: 1,
      subtotal: 0,
    };
    // Increment the serial number for the next item
    setSerialNumber(serialNumber + 1);
    // Add the new item to the items list
    setItems([...items, newItem]);
  };

  // Function to handle removing an item
  const handleDeleteItem = (id) => {
    // Filter out the item with the specified id
    const updatedItems = items.filter((item) => item.id !== id);
    // Update the items list
    setItems(updatedItems);
  };

  // Function to handle changes in item quantity
  const handleQuantityChange = (id, newQuantity) => {
    // Update the quantity of the item with the specified id
    const updatedItems = items.map((item) =>
      item.id === id ? { ...item, quantity: newQuantity } : item
    );
    // Update the items list
    setItems(updatedItems);
  };

  const handleItemNameChange = (id, newName) => {
    // Update the name of the item with the specified id
    const updatedItems = items.map((item) =>
      item.id === id ? { ...item, itemName: newName } : item
    );
    // Update the items list
    setItems(updatedItems);
  };

  // Function to handle changes in item description
  const handleDescriptionChange = (id, newDescription) => {
    // Update the description of the item with the specified id
    const updatedItems = items.map((item) =>
      item.id === id ? { ...item, description: newDescription } : item
    );
    // Update the items list
    setItems(updatedItems);
  };


  // Function to calculate subtotal for an item
  const calculateSubtotal = (quantity) => {
    // Define your calculation logic here
    return quantity * 10; // Example: $10 per item
  };

const itemRows = items.map((item) => (
    <tr key={item.id}>
      <td>{item.id}</td>
      <td>
        <Input
          value={item.itemName}
          onChange={(e) => handleItemNameChange(item.id, e.target.value)}
        />
      </td>
      <td>
        <Input
          value={item.description}
          onChange={(e) => handleDescriptionChange(item.id, e.target.value)}
        />
      </td>
      <td>
        <Input
          type="number"
          value={item.quantity}
          onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value))}
        />
      </td>
      <td>
      <Button type='primary' onClick={handleAddItem}><IoIosAddCircle /></Button>

        <Button type="primary" danger  onClick={() => handleDeleteItem(item.id)}>
        <MdDeleteOutline />
        </Button>
      </td>
    </tr>
  ));

  const userLogin = useSelector((state) => state.userLogin)
const {  userInfo } = userLogin


const leaveCreate = useSelector((state) => state.leaveCreate)
const { loading,success,error } = leaveCreate

useEffect(() => {
  if (error) {
    toast.error(error);
  }
  if (success) {
    toast.success('Logged in successfully');
  }
}, [error, success]);

  const storedUser = JSON.parse(localStorage.getItem('userInfo'));

  function disabledDate(current) {
    // Can not select days before today and today
    return current && current < moment().endOf('day');
  }
  function getDefaultEndDate(startDate, numDays) {
    console.log(moment(startDate).add(numDays, 'days'));
    return moment(startDate).add(numDays, 'days');
    
  }

  const applyRequisition = ()=>{
    console.log("items are ",items);
  }

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

        <Tabs defaultActiveKey="1">
      <TabPane tab="Request Leave" key="1">
           
                <Card style={{overflowX:"auto"}}>
                   {loading ? <Loader/> : <>
                   <h1 className='text-center'>Leave Request Form</h1>
                    <Form onFinish={handleApplyLeave}>             
                    <Table>
  <tr>
    <th>Name:</th>
    <td>{storedUser.userData.firstName} {storedUser.userData.lastName}</td>
    <th>Position:</th>
    <td>Marketing Agent</td>
  </tr>
  <tr>
    <th>Employee No:</th>
    <td>{storedUser.employeeId}</td>
    <th>Department:</th>
    <td>Marketing</td>
  </tr>
  <tr>
    <th>Leave Type:</th>
    <td colSpan={3}>
    <Form.Item name="leaveType">
      <Radio.Group onChange={handleLeaveTypeChange}>
        <Radio value="sick">Sick Leave</Radio>
        <Radio value="compassionate">Compassionate</Radio>
        <Radio value="exam">Exam Leave</Radio>
        <Radio value="annual">Annual Leave</Radio>
        <Radio value="maternity">Maternity Leave</Radio>
        <Radio value="paternity">Paternity Leave</Radio>
        <Radio value="other">Other</Radio>
      </Radio.Group>
    </Form.Item>
      {daysAllowed != 0 && <small className='text-danger'>Days Allowed: {daysAllowed}</small> }
    </td>
  </tr>
  {leaveType === 'other' && (
    <tr>
      <Form.Item name="description">
      <th>Description:</th>
      <td colSpan={3}>
        <ReactQuill theme="snow" value={description} onChange={setDescription} />
      </td>
      </Form.Item>
    </tr>
  )}
  {daysAllowed != 0 && (
    <>
      <tr>
          <th>Number of Days Requested:</th>
          <td>
          <Form.Item name="numDaysRequested">
          <Input 
    type="number" 
    value={numDaysRequested} 
    onChange={(e) => {
        const newValue = Math.min(parseInt(e.target.value), daysAllowed); // Limit to maximum of 14
        setNumDaysRequested(newValue);
    }} 
    max={daysAllowed} 
/>    
</Form.Item>
      </td>
          <th>Leave Reliever:</th>
          <td>
          <Form.Item name="leaveReliever">
            <Select style={{height:"100%", width: '100%'}} value={leaveRequester} onChange={(value) => setLeaveRequester(value)} >
              <Select.Option value="John Doe">John Doe</Select.Option>
              <Select.Option value="Jane Smith">Jane Smith</Select.Option>
              <Select.Option value="Michael Johnson">Michael Johnson</Select.Option>
            </Select>
            </Form.Item>
          </td>
        </tr>
        <tr>
          <th>From Date:</th>
          <td>
          <Form.Item name="fromDate">
          <DatePicker 
  value={fromDate} 
  onChange={(date) => setFromDate(date)} 
  disabledDate={disabledDate} 
/>    
</Form.Item>
      </td>
          <th>To Date:</th>
          <td>
          <Form.Item name="toDate">
          <DatePicker disabled />
            </Form.Item>
               </td>
        </tr>
        <tr>
  <th>Date of Application:</th>
  <td>{moment().format('YYYY-MM-DD')}</td>
  <th>Signature:</th>
  <td>{/* Place signature component here */}</td>
</tr>

<tr>
                    <td colSpan={4} style={{ textAlign: 'center' }}>
                      <Button onClick={handleApplyLeave}type="primary" htmlType="submit" style={{width:"100%"}}>
                        Apply
                      </Button>
                    </td>
                  </tr>

    </>
  )}

</Table>
</Form>
                   </>} 

                </Card>
            
      </TabPane>

      <TabPane tab="Request Requisition" key="2">
           
                <Card>
                    <h1 className='text-center'>Request Requisition</h1>
                    <Table>
  <tr>
    <th>Requested By:</th>
    <td>{storedUser.userData.firstName} {storedUser.userData.lastName}</td>
    <th>Deparment:</th>
    <td>Marketing</td>
  </tr>

        <tr>
  <th>Date of Request:</th>
  <td>{moment().format('YYYY-MM-DD')}</td>
  <th>Signature:</th>
  <td>{/* Place signature component here */}</td>
</tr>
</Table>

<Table>
        {/* Table headers */}
        <thead>
          <tr>
            <th>S/N</th>
            <th>Item</th>
            <th>Description</th>
            <th>Quantity</th>
           
            <th>Action</th>
          </tr>
        </thead>
        {/* Table body */}
        <tbody>
          {/* Render the item rows */}
          {itemRows}
          {/* Row for total */}
          <td colSpan={6} style={{ textAlign: 'center' }}>
                      <Button type="primary" onClick={handleApplyRequistion} style={{width:"100%"}}>
                        Apply
                      </Button>
                    </td>
        </tbody>
      </Table>

                </Card>
           
      </TabPane>
    
      </Tabs>
       

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

export default RequestRegistrarScreen;
