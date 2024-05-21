import {  Card,Modal, Form, Input, Select, DatePicker,Result,Tabs, Radio, Checkbox, Button  } from 'antd';
import React, { useEffect, useState } from 'react';

import 'react-calendar/dist/Calendar.css';

import Topbar from './components/Topbar';
import moment from 'moment';

import { Badge, Col, Container, Row, Table } from 'react-bootstrap';

import { FaEye } from 'react-icons/fa';
import { createStyles, useTheme } from 'antd-style';
import { allMarketLeads, registerMarketLead } from '../../actions/marketingActions';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import Sidebar2 from './components/Sidebar2';
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { approveRequisition, fetchDepartmentRequisitions } from '../../actions/requisitionActions';

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
    const [fromDate, setFromDate] = useState(null); // State to manage from date
    const [toDate, setToDate] = useState(null); // State to manage to date
    const [showNumDaysRequested, setShowNumDaysRequested] = useState(false); // State to manage visibility of number of days requested
    const [serialNumber, setSerialNumber] = useState(1);
    const [openRequisition, setOpenRequisition] = useState(false);
    const [currentRequisition, setCurrentRequisition] = useState(null);
    
    const [requestedLeaves, setRequestedLeaves] = useState([
      { id: 1, name: 'John Doe', leaveType: 'Annual Leave', numDaysRequested: 5, leaveRequester: 'Jane Smith', status: 'Approved' },
      { id: 2, name: 'Alice Johnson', leaveType: 'Sick Leave', numDaysRequested: 3, leaveRequester: 'Michael Johnson', status: 'Denied' },
      { id: 2, name: 'Alice Johnson', leaveType: 'Sick Leave', numDaysRequested: 3, leaveRequester: 'Michael Johnson', status: 'Not reviewed' },
    ]);
    

    const handleOpenModal = (requisition) => {
      console.log(requisition);
      setCurrentRequisition(requisition);
      setOpenRequisition(true);
  };

  const handleCloseModal = () => {
      setOpenRequisition(false);
      setCurrentRequisition(null);
  };

    const [open, setOpen] = useState(false);

    const [items, setItems] = useState([{
        id: serialNumber,
      itemName: '',
      description: '',
      quantity: 1,
      subtotal: 0,
    }]);


  const newItemTemplate = {
    itemName: '',
    description: '',
    quantity: 1, // or 0, depending on how you want to initialize it
    editing: true // Optionally start with editing true if you want the fields to be immediately editable
};


  const addItem = () => {
    if (currentRequisition) {
        const updatedRequisition = {
            ...currentRequisition,
            items: [...currentRequisition.items, newItemTemplate]
        };
        setCurrentRequisition(updatedRequisition);
    } else {
        console.log("No requisition is currently selected or loaded.");
    }
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

  const handleEdit = (index) => {
    // Update currentRequisition to set the item at index to be editable
    let updatedRequisition = { ...currentRequisition };
    let itemToEdit = updatedRequisition.items[index];

    // Initialize edit values
    itemToEdit.editing = true;
    itemToEdit.editName = itemToEdit.itemName;
    itemToEdit.editDescription = itemToEdit.description;
    itemToEdit.editQuantity = itemToEdit.quantity;

    // Update the item
    updatedRequisition.items[index] = itemToEdit;
    setCurrentRequisition(updatedRequisition);
};



const handleSave = async (index) => {
  // Construct a new item array with the updated item
  const updatedItems = currentRequisition.items.map((item, idx) => {
      if (idx === index) {
          return {
              ...item,
              editing: false,  // Turn off editing mode
              itemName: item.editName,
              description: item.editDescription,
              quantity: item.editQuantity
          };
      }
      return item;
  });

  // Update the currentRequisition with the new items array
  const updatedRequisition = {
      ...currentRequisition,
      items: updatedItems
  };

  setCurrentRequisition(updatedRequisition);

  // Optionally send updated data to the server here
  try {
      const response = await axios.put(`/api/requisitions/${currentRequisition.id}`, updatedRequisition);
      console.log('Save successful:', response.data);
      // Update the UI with server-confirmed data, if necessary
      setCurrentRequisition(response.data);
  } catch (error) {
      console.error('Error saving item:', error);
  }
};



const handleRemove = (index) => {
  let updatedRequisition = { ...currentRequisition };
  updatedRequisition.items.splice(index, 1);

  setCurrentRequisition(updatedRequisition);
};

const storedUser = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null;

const handleAccept = (requisitionId) => {
  // API call to update the requisition status to 'Accepted'
  console.log(`Requisition ${requisitionId} accepted ${currentRequisition}`);
  dispatch(approveRequisition(requisitionId,storedUser._id,"Accepted","Supervisor"))
};

const handleReject = (requisitionId) => {
  // API call to update the requisition status to 'Rejected'
  console.log(`Requisition ${requisitionId} rejected`);
};


const handleEditChange = (index, fieldName, newValue) => {
  // Clone the currentRequisition for immutability
  let updatedRequisition = { ...currentRequisition };

  // Update the specific field in the item
  updatedRequisition.items[index] = {
      ...updatedRequisition.items[index],
      [fieldName]: newValue
  };

  // Update the currentRequisition state
  setCurrentRequisition(updatedRequisition);

  console.log(updatedRequisition);
};

  

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchDepartmentRequisitions('Marketing'))
  }, [dispatch]);
  

  const departmentRequisitionList = useSelector((state) => state.departmentRequisitionList);
const { loading: departmentRequisitionLoading, success: departmentRequisitionSuccess,requisitions, error: departmentRequisitionError } = departmentRequisitionList;


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
            <th>Status</th>

     
            <th></th>


          </tr>
        </thead>
        <tbody>
          {requisitions && requisitions.map((requisition) => (
            <tr key={requisition._id}>
              <td>{requisition.requested_by.email}</td>
              <td>{moment(requisition.request_date).format('LL')}</td>
              <td>{requisition.items.length}</td>
              <td>
              <span className={`badge ${requisition.user_approval.length === 0 ? 'badge-warning' : 'badge-success'}`}>
  {requisition.user_approval.length === 0 ? 'Not Reviewed' : 'Reviewed'}
</span>

              </td>
              <td>
              <Button onClick={() => handleOpenModal(requisition)} className="btn-icon">
                                      <FaEye />
                                  </Button>
              </td>
{currentRequisition && (
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
    <td>{currentRequisition.requested_by.email}</td>
    <th>Position:</th>
    <td>Marketing Agent</td>
  </tr>
  <tr>
  
    <th>Department:</th>
    <td>Marketing</td>
    <td></td>

    <td> <Button className='text-light' style={{padding:'4px 15px',background:"#0D6EFD"}} onClick={addItem}>Add Item</Button></td>

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
 {currentRequisition.items.map((item, index) => (
    <tr key={index}>
        <td>{item.editing ? (
            <input
                type="text"
                value={item.editName}
                onChange={(e) => handleEditChange(index, 'editName', e.target.value)}
            />
        ) : (
            <span>{item.itemName}</span>
        )}</td>
        <td>{item.editing ? (
            <input
                type="text"
                value={item.editDescription}
                onChange={(e) => handleEditChange(index, 'editDescription', e.target.value)}
            />
        ) : (
            <span>{item.description}</span>
        )}</td>
        <td>{item.editing ? (
            <input
                type="number"
                value={item.editQuantity}
                onChange={(e) => handleEditChange(index, 'editQuantity', parseInt(e.target.value))}
            />
        ) : (
            <span>{item.quantity}</span>
        )}</td>
        <td>
            {item.editing ? (
                <Button type='primary' onClick={() => handleSave(index)}>Save</Button>
            ) : (
                <Button className='text-white' style={{background:"#6F121F"}} onClick={() => handleEdit(index)}><FaEdit /></Button>
            )}
            <Button type='primary' danger onClick={() => handleRemove(index)}><MdDelete /></Button>
        </td>
    </tr>
))}

</tbody>



<tr>
    <th>My decision</th>
    <td>
        <Button type='primary' className='mx-2 btn-primary bg-primary text-light' onClick={() => handleAccept(requisition._id)}>
            Accept
        </Button>
        <Button className='mx-2' type='primary' danger onClick={() => handleReject(requisition._id)}>
            Reject
        </Button>
    </td>
</tr>

 
</Table>
{/* <hr style={{border:"solid green"}} />
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
{requisitions && requisitions.map((requisition) => (
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
    {/* {requisition.status.toLowerCase() === 'not reviewed' ? (
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
{/* {requisition.status.toLowerCase() === 'not reviewed' ? (
      <>
        <Button variant="success" className="mx-2" onClick={() => handleAccept(requisition.id)}>Accept</Button>
        <Button variant="danger" onClick={() => handleDeny(requisition.id)}>Deny</Button>
      </>
    ) : (
      <Badge variant={requisition.status === 'Accepted' ? 'success' : 'danger'}>
        {requisition.status}
      </Badge>
    )} *
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
        {/* <Input placeholder='Eg.Supply of seats' /> 
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
{/* {requisition.status.toLowerCase() === 'not reviewed' ? (
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
<hr style={{border:"solid green"}} /> */}
      </Modal>
)}

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
