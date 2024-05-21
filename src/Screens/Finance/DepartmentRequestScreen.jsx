import {  Card,Modal, Form, Input, Select, DatePicker,Result,Tabs, Radio, Checkbox, Button  } from 'antd';
import React, { useEffect, useState } from 'react';

import 'react-calendar/dist/Calendar.css';

import Topbar from './components/Topbar';
import moment from 'moment';

import { Badge, Col, Container, Row, Table } from 'react-bootstrap';

import facebook from '../../assets/facebook.png';
import youtube from '../../assets/youtube.png';
import linkedin from '../../assets/linkedin.png';
import instagram  from '../../assets/instagram.png';
import google  from '../../assets/google.png';
import AllLeadsChart from './components/AllLeadsChart'
import { FaEye } from 'react-icons/fa';
import { createStyles, useTheme } from 'antd-style';
import { allMarketLeads, registerMarketLead } from '../../actions/marketingActions';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import Sidebar2 from './components/Sidebar2';
import Loader from '../../Components/Loader';
import ReactQuill from 'react-quill';
import IntakeChart from './components/IntakeChart';
import StageChart from './components/StageChart';
import CourseChart from './components/CourseChart';
import { Link } from 'react-router-dom';
import UploadFile from './components/UploadFile';
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";

const { Meta } = Card;
const { TabPane } = Tabs;
const useStyle = createStyles(({ token }) => ({

  'my-modal-mask': {
    boxShadow: `inset 0 0 15px #fff`,
  },

}));


const DepartmentRequestScreen = () => {

    const [leaveType, setLeaveType] = useState(''); // State to manage selected leave type
    const [description, setDescription] = useState(''); // State to manage description for "Other" leave type
    const [numDaysRequested, setNumDaysRequested] = useState(0); // State to manage number of days requested
    const [leaveRequester, setLeaveRequester] = useState(''); // State to manage leave requester's full name
    const [fromDate, setFromDate] = useState(null); // State to manage from date
    const [toDate, setToDate] = useState(null); // State to manage to date
    const [showNumDaysRequested, setShowNumDaysRequested] = useState(false); // State to manage visibility of number of days requested
    const [serialNumber, setSerialNumber] = useState(1);
    const [requestedLeaves, setRequestedLeaves] = useState([
      { id: 1, name: 'John Doe', leaveType: 'Annual Leave', numDaysRequested: 5, leaveRequester: 'Jane Smith', status: 'Approved' },
      { id: 2, name: 'Alice Johnson', leaveType: 'Sick Leave', numDaysRequested: 3, leaveRequester: 'Michael Johnson', status: 'Denied' },
      { id: 2, name: 'Alice Johnson', leaveType: 'Sick Leave', numDaysRequested: 3, leaveRequester: 'Michael Johnson', status: 'Not reviewed' },
    ]);
    const [requestedRequisitions, setRequestedRequisitions] = useState([
      { id: 1, requestedBy: 'John Doe',status: 'not reviewed', requestDate: '2024-04-11', numItems: 5, items: [
        { itemName: 'Item 1', description: 'Description 1', quantity: 2 },
        { itemName: 'Item 2', description: 'Description 2', quantity: 3 },
        { itemName: 'Item 3', description: 'Description 3', quantity: 1 },
        { itemName: 'Item 4', description: 'Description 4', quantity: 4 },
        { itemName: 'Item 5', description: 'Description 5', quantity: 2 },
      ]},
      { id: 2, requestedBy: 'Alice Johnson',status: 'not reviewed', requestDate: '2024-04-10', numItems: 3, items: [
        { itemName: 'Item A', description: 'Description A', quantity: 1 },
        { itemName: 'Item B', description: 'Description B', quantity: 2 },
        { itemName: 'Item C', description: 'Description C', quantity: 5 },
      ]},
    ]);

    const [open, setOpen] = useState(false);
    const [openRequisition, setOpenRequisition] = useState(false);

    const [items, setItems] = useState([{
        id: serialNumber,
      itemName: '',
      description: '',
      quantity: 1,
      subtotal: 0,
    }]);

    // Function to handle changes in selected leave type
  const handleLeaveTypeChange = (e) => {
    setLeaveType(e.target.value);
    // If the selected leave type is not "Other", clear the description
    if (e.target.value !== 'other') {
      setDescription('');
    }
    // Show the number of days requested row if the selected leave type is applicable
    setShowNumDaysRequested(e.target.value === 'sick' || e.target.value === 'exam' || e.target.value === 'annual' || e.target.value === 'maternity' || e.target.value === 'paternity');
    // Calculate and set the "To Date" based on the selected leave type
    if (e.target.value === 'sick') {
        console.log(e.target.value);
      const toDateValue = new Date(fromDate);
      toDateValue.setDate(toDateValue.getDate() + 7);
      setToDate(toDateValue);
    } else if (e.target.value === 'exam') {
      const toDateValue = new Date(fromDate);
      toDateValue.setDate(toDateValue.getDate() + 14);
      setToDate(toDateValue);
    } else if (e.target.value === 'annual') {
      const toDateValue = new Date(fromDate);
      toDateValue.setDate(toDateValue.getDate() + 30);
      setToDate(toDateValue);
    } else if (e.target.value === 'maternity') {
      const toDateValue = new Date(fromDate);
      toDateValue.setDate(toDateValue.getDate() + 90);
      setToDate(toDateValue);
    } else if (e.target.value === 'paternity') {
      const toDateValue = new Date(fromDate);
      toDateValue.setDate(toDateValue.getDate() + 14);
      setToDate(toDateValue);
    } else {
      setToDate(null);
    }
  };

  // Function to handle changes in from date
  const handleFromDateChange = (date) => {
    setFromDate(date);
    // Recalculate and set the "To Date" based on the selected leave type
    if (leaveType === 'sick') {
      const toDateValue = new Date(date);
      toDateValue.setDate(toDateValue.getDate() + 7);
      setToDate(toDateValue);
    } else if (leaveType === 'exam') {
      const toDateValue = new Date(date);
      toDateValue.setDate(toDateValue.getDate() + 14);
      setToDate(toDateValue);
    } else if (leaveType === 'annual') {
      const toDateValue = new Date(date);
      toDateValue.setDate(toDateValue.getDate() + 30);
      setToDate(toDateValue);
    } else if (leaveType === 'maternity') {
      const toDateValue = new Date(date);
      toDateValue.setDate(toDateValue.getDate() + 90);
      setToDate(toDateValue);
    } else if (leaveType === 'paternity') {
      const toDateValue = new Date(date);
      toDateValue.setDate(toDateValue.getDate() + 14);
      setToDate(toDateValue);
    } else {
      setToDate(null);
    }
  };

  const handleApplyLeave = () => {
    // Logic to process form submission
  };


  const handleApplyRequistion = () => {
    // Logic to process form submission
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

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'not reviewed':
        return 'primary'; // Change background color to gray for "Not Reviewed"
      case 'denied':
        return 'danger'; // Change background color to red for "Denied"
      case 'approved':
        return 'success'; // Change background color to green for "Approved"
      default:
        return 'primary'; // Default background color for other statuses
    }
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
      <Button onClick={handleAddItem}>Add Item</Button>

        <Button type="link" onClick={() => handleDeleteItem(item.id)}>
          Delete
        </Button>
      </td>
    </tr>
  ));

  const handleAccept = (leaveId) => {
    // Update the status of the leave request to "Approved"
    const updatedLeaves = requestedLeaves.map((leave) => {
      if (leave.id === leaveId) {
        leave.status = 'Approved';
      }
      return leave;
    });
    setRequestedLeaves(updatedLeaves);
  };

  // Define handleDeny function
  const handleDeny = (leaveId) => {
    // Update the status of the leave request to "Denied"
    const updatedLeaves = requestedLeaves.map((leave) => {
      if (leave.id === leaveId) {
        leave.status = 'Denied';
      }
      return leave;
    });
    setRequestedLeaves(updatedLeaves);
  };

  const handleEdit = (requisitionId, itemIndex) => {
    setRequestedRequisitions(prevState => {
      const updatedRequisitions = [...prevState];
      const itemToUpdate = updatedRequisitions.find(req => req.id === requisitionId)?.items[itemIndex];
      if (itemToUpdate) {
        itemToUpdate.editing = true;
        itemToUpdate.editName = itemToUpdate.itemName;
        itemToUpdate.editDescription = itemToUpdate.description;
        itemToUpdate.editQuantity = itemToUpdate.quantity;
      }
      return updatedRequisitions;
    });
  };

  const handleEditChange = (requisitionId, itemIndex, field, value) => {
    setRequestedRequisitions(prevState => {
      const updatedRequisitions = [...prevState];
      const itemToUpdate = updatedRequisitions.find(req => req.id === requisitionId)?.items[itemIndex];
      if (itemToUpdate) {
        itemToUpdate[field] = value;
      }
      return updatedRequisitions;
    });
  };
  
  const handleSave = (requisitionId, itemIndex) => {
    setRequestedRequisitions(prevState => {
      const updatedRequisitions = [...prevState];
      const itemToUpdate = updatedRequisitions.find(req => req.id === requisitionId)?.items[itemIndex];
      if (itemToUpdate) {
        itemToUpdate.itemName = itemToUpdate.editName;
        itemToUpdate.description = itemToUpdate.editDescription;
        itemToUpdate.quantity = itemToUpdate.editQuantity;
        itemToUpdate.editing = false;
      }
      return updatedRequisitions;
    });
  };

  const handleRemove = (requisitionId, itemIndex) => {
    setRequestedRequisitions(prevState => {
      const updatedRequisitions = [...prevState];
      const requisitionToUpdate = updatedRequisitions.find(req => req.id === requisitionId);
      if (requisitionToUpdate) {
        requisitionToUpdate.items.splice(itemIndex, 1); // Remove the item at the specified index
      }
      return updatedRequisitions;
    });
  };
  
  
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
      <TabPane tab="Requested Leaves" key="1">

                <Card>
                    <h1 className='text-center'>My Department Leave Request</h1>
  <Table striped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Leave Type</th>
            <th>Number of Days Requested</th>
            <th>Leave Requester</th>
            <th>My Approval</th>
            <th></th>


          </tr>
        </thead>
        <tbody>
          {requestedLeaves.map((leave) => (
            <tr key={leave.id}>
              <td>{leave.name}</td>
              <td>{leave.leaveType}</td>
              <td>{leave.numDaysRequested}</td>
              <td>{leave.leaveRequester}</td>
              <td>
              <Badge bg={getStatusColor(leave.status)}>{leave.status}</Badge>
              
              </td>
              <td>
              {leave.status.toLowerCase() === 'not reviewed' && (
                  <Button onClick={() => setOpen(true)} className="ant-btn css-dev-only-do-not-override-11xg00t ant-btn-default">
                    <FaEye />
                  </Button>
                )} 
</td>

<Modal
        title="Reivew Leave"
        centered
        open={open}
        onOk={() => setOpen(false)}
        onCancel={() => setOpen(false)}
        footer={[

        ]}
        width={1000}
      >
                        <Table>
  <tr>
    <th>Requested By:</th>
    <td>Robinson Ngecu</td>
    <th>Position:</th>
    <td>Marketing Agent</td>
  </tr>
  <tr>
    <th>Employee No:</th>
    <td>Robinson Ngecu</td>
    <th>Department:</th>
    <td>Marketing</td>
  </tr>
  <tr>
    <th>Leave Type:</th>
    <td >
    Sick Leave
     
    </td>

         
          <th>Leave Reliever:</th>
          <td>
          John Doe
          </td>
        </tr>
        <tr>
          <th>From Date:</th>
          <td>{moment().format('YYYY-MM-DD')}</td>
          <th>To Date:</th>
          <td>{moment().format('YYYY-MM-DD')}</td>
          
        </tr>
        <tr>
  <th>Date of Application:</th>
  <td>{moment().format('YYYY-MM-DD')}</td>
  <th>Current Status:</th>
  <td>
  <Badge bg={getStatusColor(leave.status)}>{leave.status}</Badge>

  </td>
</tr>


</Table>
<Table>
  <tr>
    <thead>FOR IMMEDIATE SUPERVISOR</thead>
  </tr>
  <tr>
    <th>My decision</th>
    <td>
    {leave.status.toLowerCase() === 'not reviewed' ? (
      <>
        <Button type="primary" className="mx-2" onClick={() => handleAccept(leave.id)}>Accept</Button>
        <Button type="primary" danger onClick={() => handleDeny(leave.id)}>Deny</Button>
      </>
    ) : (
      <Badge variant={leave.status === 'Accepted' ? 'success' : 'danger'}>
        {leave.status}
      </Badge>
    )}
    </td>

  </tr>
  <tr>
    <th>Desgnated No. of Days</th>
    <td>
    <Input/>
    </td>

  </tr>
  <tr>
    <th>Leave Balance</th>
    <td>
    <Input value={3} disabled/>
    </td>

  </tr>
  <tr>
    <th>To Resume Duty On</th>
    <td>
    <Input value={'Monday 20th 2024'} disabled/>
    </td>

  </tr>
</Table>
<Table>
  <tr>
    <thead>FOR REGISTRAR</thead>
  </tr>
  <tr>
    <th>My decision</th>
    <td>
    {leave.status.toLowerCase() === 'not reviewed' ? (
      <>
        <Button type='primary' className="mx-2" onClick={() => handleAccept(leave.id)}>Accept</Button>
        <Button type="primary" danger  onClick={() => handleDeny(leave.id)}>Deny</Button>
      </>
    ) : (
      <Badge variant={leave.status === 'Accepted' ? 'success' : 'danger'}>
        {leave.status}
      </Badge>
    )}
    </td>

  </tr>
  <tr>
    <th>Desgnated No. of Days</th>
    <td>
    <Input/>
    </td>

  </tr>
  <tr>
    <th>Leave Balance</th>
    <td>
    <Input value={3} disabled/>
    </td>

  </tr>
  <tr>
    <th>To Resume Duty On</th>
    <td>
    <Input value={'Monday 20th 2024'} disabled/>
    </td>

  </tr>
</Table>
<Table>
  <tr>
    <thead>FOR PRINCIPLE</thead>
  </tr>
  <tr>
    <th>My decision</th>
    <td>
    {leave.status.toLowerCase() === 'not reviewed' ? (
      <>
        <Button type='primary' className="mx-2" onClick={() => handleAccept(leave.id)}>Accept</Button>
        <Button type="primary" danger  onClick={() => handleDeny(leave.id)}>Deny</Button>
      </>
    ) : (
      <Badge variant={leave.status === 'Accepted' ? 'success' : 'danger'}>
        {leave.status}
      </Badge>
    )}
    </td>

  </tr>
  <tr>
    <th>Desgnated No. of Days</th>
    <td>
    <Input/>
    </td>

  </tr>
  <tr>
    <th>Leave Balance</th>
    <td>
    <Input value={3} disabled/>
    </td>

  </tr>
  <tr>
    <th>To Resume Duty On</th>
    <td>
    <Input value={'Monday 20th 2024'} disabled/>
    </td>

  </tr>
</Table>
<Table>
  <tr>
    <thead>FOR DIRECTOR</thead>
  </tr>
  <tr>
    <th>My decision</th>
    <td>
    {leave.status.toLowerCase() === 'not reviewed' ? (
      <>
        <Button type='primary' className="mx-2" onClick={() => handleAccept(leave.id)}>Accept</Button>
        <Button type="primary" danger  onClick={() => handleDeny(leave.id)}>Deny</Button>
      </>
    ) : (
      <Badge variant={leave.status === 'Accepted' ? 'success' : 'danger'}>
        {leave.status}
      </Badge>
    )}
    </td>

  </tr>
  <tr>
    <th>Desgnated No. of Days</th>
    <td>
    <Input/>
    </td>

  </tr>
  <tr>
    <th>Leave Balance</th>
    <td>
    <Input value={3} disabled/>
    </td>

  </tr>
  <tr>
    <th>To Resume Duty On</th>
    <td>
    <Input value={'Monday 20th 2024'} disabled/>
    </td>

  </tr>
</Table>
      </Modal>

            </tr>
          ))}
        </tbody>
      </Table>

                </Card>
       
      </TabPane>

      <TabPane tab="Requested Requisitions" key="2">
            <Container>
                <Card>
                    <h1 className='text-center'>My department Requisitions</h1>
                    <Table striped bordered hover>
        <thead>
          <tr>
            <th>Requested By</th>
            <th>Request Date</th>
            <th>Number of Items</th>
     
            <th></th>


          </tr>
        </thead>
        <tbody>
          {requestedRequisitions.map((requisition) => (
            <tr key={requisition.id}>
              <td>{requisition.requestedBy}</td>
              <td>{requisition.requestDate}</td>
              <td>{requisition.numItems}</td>
              <td><Button onClick={() => setOpenRequisition(true)} className="ant-btn css-dev-only-do-not-override-11xg00t ant-btn-default">
                    <FaEye />
                  </Button></td>

<Modal
        title="Review Requisition"
        centered
        open={openRequisition}
        onOk={() => setOpenRequisition(false)}
        onCancel={() => setOpenRequisition(false)}
        footer={[

        ]}
        width={1000}
      >
<hr style={{border:"solid green"}} />

                        <Table>
  <tr>
    <th>Requested By:</th>
    <td>Robinson Ngecu</td>
    <th>Position:</th>
    <td>Marketing Agent</td>
  </tr>
  <tr>
    <th>Employee No:</th>
    <td>Robinson Ngecu</td>
    <th>Department:</th>
    <td>Marketing</td>
  </tr>
 

</Table>

<hr style={{border:"solid green"}} />
<Table >
   

    <thead>FOR IMMEDIATE SUPERVISOR</thead>
 
 <thead>
       <th>Item</th>
       <th>Description</th>
       <th>Quantity</th>


 </thead>
 <tbody>
  {requestedRequisitions.map((requisition) => (
    <React.Fragment key={requisition.id}>
      {requisition.items.map((item, index) => (
        <tr key={`${requisition.id}-${index}`}>
          <td>{item.editing ? (
            <input
              type="text"
              value={item.editName}
              onChange={(e) => handleEditChange(requisition.id, index, 'editName', e.target.value)}
            />
          ) : (
            <span>{item.itemName}</span>
          )}</td>
          <td>{item.editing ? (
            <input
              type="text"
              value={item.editDescription}
              onChange={(e) => handleEditChange(requisition.id, index, 'editDescription', e.target.value)}
            />
          ) : (
            <span>{item.description}</span>
          )}</td>
          <td>{item.editing ? (
            <input
              type="number"
              value={item.editQuantity}
              onChange={(e) => handleEditChange(requisition.id, index, 'editQuantity', parseInt(e.target.value))}
            />
          ) : (
            <span>{item.quantity}</span>
          )}</td>
          <td>
            {item.editing ? (
              <Button type='primary' onClick={() => handleSave(requisition.id, index)}>Save</Button>
            ) : (
              <Button className='text-white' style={{background:"#6F121F"}} onClick={() => handleEdit(requisition.id, index)}><FaEdit /></Button>
            )}
            <Button type='primary' danger  onClick={() => handleRemove(requisition.id, index)}><MdDelete /></Button>
          </td>
        </tr>
      ))}
    </React.Fragment>
  ))}
</tbody>



  <tr>
    <th>My decision</th>
    <td>
    {requisition.status.toLowerCase() === 'not reviewed' ? (
      <>
        <Button variant="success" className="mx-2" onClick={() => handleAccept(requisition.id)}>Accept</Button>
        <Button variant="danger" onClick={() => handleDeny(requisition.id)}>Deny</Button>
      </>
    ) : (
      <Badge variant={requisition.status === 'Accepted' ? 'success' : 'danger'}>
        {requisition.status}
      </Badge>
    )}
    </td>

  </tr>
 
</Table>
<hr style={{border:"solid green"}} />
<Table>
   

    <thead>FOR MADAM NORIN OR MR. OKUMU</thead>
     
    <tr>
      <td colSpan={5}>
    <Card className='w-100' title="LOCAL PURCHASEE ORDER (LPO)">
     <Table>
      
      <tr>
        <th>Date</th>
        <td>18.04.2024</td>
      </tr>

      <tr>
        <th>To</th>
        <td><Input /></td>
      </tr>
<Table>
<thead>
       <th>Item</th>
       <th>Description</th>
       <th>Quantity</th>
       <th>Unit Cost</th>
       <th>Value</th>
     


 </thead>
<tbody>
{requestedRequisitions.map((requisition) => (
    <React.Fragment key={requisition.id}>
      {requisition.items.map((item, index) => (
        <tr key={`${requisition.id}-${index}`}>
          <td>{item.editing ? (
            <input
              type="text"
              value={item.editName}
              onChange={(e) => handleEditChange(requisition.id, index, 'editName', e.target.value)}
            />
          ) : (
            <span>{item.itemName}</span>
          )}</td>
          <td>{item.editing ? (
            <input
              type="text"
              value={item.editDescription}
              onChange={(e) => handleEditChange(requisition.id, index, 'editDescription', e.target.value)}
            />
          ) : (
            <span>{item.description}</span>
          )}</td>
          <td>{item.editing ? (
            <input
              type="number"
              value={item.editQuantity}
              onChange={(e) => handleEditChange(requisition.id, index, 'editQuantity', parseInt(e.target.value))}
            />
          ) : (
            <span>{item.quantity}</span>
          )}</td>
               <td>
                
            <Input
              type="number"
              value={item.editQuantity}
              onChange={(e) => handleEditChange(requisition.id, index, 'editQuantity', parseInt(e.target.value))}
            />
         </td>
               <td><span>{item.quantity*200}</span></td>

         
        </tr>
      ))}
    </React.Fragment>
  ))}
  <tr>
    <td></td>
    <td></td>
    <td></td>

    <td>Total</td>
    <td>3000</td>

  </tr>
</tbody>
</Table>
   

      </Table>
</Card>
</td>
    </tr>

    <tr>
    <th>My decision</th>
    <td>
    {requisition.status.toLowerCase() === 'not reviewed' ? (
      <>
        <Button variant="success" className="mx-2" onClick={() => handleAccept(requisition.id)}>Accept</Button>
        <Button variant="danger" onClick={() => handleDeny(requisition.id)}>Deny</Button>
      </>
    ) : (
      <Badge variant={requisition.status === 'Accepted' ? 'success' : 'danger'}>
        {requisition.status}
      </Badge>
    )}
    </td>

  </tr>
</Table>
<hr style={{border:"solid green"}} />
<Table>
   

    <thead>DIRECTOR</thead>
    <Row>
    <Col md={6} className='my-2'>
        Amount No: 
      </Col>
      <Col md={6} className='my-2'>
        <Input placeholder='Eg.30000 Ksh' />
      </Col>

    <Col md={6} className='my-2'>
        Cheque No: 
      </Col>
      <Col md={6} className='my-2'>
        <Input placeholder='Eg.000793' />
      </Col>

      <Col md={6} className='my-2'>
        Bank Code: 
      </Col>
      <Col md={6} className='my-2'>
        <Input placeholder='Eg.060045' />
      </Col>

      <Col md={6} className='my-2'>
        Account No: 
      </Col>
      <Col md={6} className='my-2'>
        <Input placeholder='Eg.0200000645'/>
      </Col>

  

<Col md={6}>
  My Decision
</Col>
<Col md={6}>
{requisition.status.toLowerCase() === 'not reviewed' ? (
      <>
        <Button variant="success" className="mx-2" onClick={() => handleAccept(requisition.id)}>Accept</Button>
        <Button variant="danger" onClick={() => handleDeny(requisition.id)}>Deny</Button>
      </>
    ) : (
      <Badge variant={requisition.status === 'Accepted' ? 'success' : 'danger'}>
        {requisition.status}
      </Badge>
    )}
</Col>
    </Row>
  
</Table>
<hr style={{border:"solid green"}} />
<Table>
   

    <thead>MR.CHIAGA</thead>
    <Row>
    <Col md={6}>
        Date: 
      </Col>
      <Col md={6}>
        11.04/2024
      </Col>

      <Col md={6}>
        Name of Payee: 
      </Col>
      <Col md={6} className='my-2'>
        <Input placeholder='Eg.Johnan Investments' />
      </Col>

      <Col md={6} className='my-2'>
        Description Of Goods.Services
      </Col>
      <Col md={6} className='my-2'>
        <ReactQuill />
        {/* <Input placeholder='Eg.Supply of seats' /> */}
      </Col>

      <Col md={12}>
      <p>Support Document</p>
    
      <div className="d-flex justify-content-around">
      <div>
      <Checkbox id={`purchase-request`} name={`purchase-request`} value="Purchase Request" />
      <label htmlFor={`purchase-request`}>Purchase Request</label>
    </div>
    <div>
      <Checkbox id={`delivery-note`} name={`delivery-note`} value="Delivery Note" />
      <label htmlFor={`delivery-note`}>Delivery Note</label>
    </div>
    <div>
      <Checkbox id={`goods-received-note`} name={`goods-received-note`} value="Goods Received Note" />
      <label htmlFor={`goods-received-note`}>Goods Received Note</label>
    </div>
    <div>
      <Checkbox id={`payment-voucher`} name={`payment-voucher`} value="Payment Voucher" />
      <label htmlFor={`payment-voucher`}>Payment Voucher</label>
    </div>
    <div>
      <Checkbox id={`cheque`} name={`cheque`} value="Cheque" />
      <label htmlFor={`cheque`}>Cheque</label>
    </div>
      </div>
     
     
     <UploadFile style={{width:"100%"}} />
      </Col>

<Col md={6}>
  My Decision
</Col>
<Col md={6}>
{requisition.status.toLowerCase() === 'not reviewed' ? (
      <>
        <Button variant="success" className="mx-2" onClick={() => handleAccept(requisition.id)}>Accept</Button>
        <Button variant="danger" onClick={() => handleDeny(requisition.id)}>Deny</Button>
      </>
    ) : (
      <Badge variant={requisition.status === 'Accepted' ? 'success' : 'danger'}>
        {requisition.status}
      </Badge>
    )}
</Col>
    </Row>
  
</Table>
<hr style={{border:"solid green"}} />
      </Modal>

            </tr>
          ))}
        </tbody>
      </Table>
                </Card>
            </Container>
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

export default DepartmentRequestScreen;
