import { Button, Card, Input,  Modal,Badge,Form,Select, DatePicker, TimePicker } from 'antd';
import { useEffect, useState } from 'react';
import 'react-calendar/dist/Calendar.css';
import { FaEye } from 'react-icons/fa';
import Topbar from './components/Topbar';
import { useParams } from 'react-router-dom';

import { Col, Row, Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { allMarketLeads, individualMarketLead, updateMarketLeadStatus } from '../../actions/marketingActions';
import moment from 'moment';
import Sidebar2 from './components/Sidebar2';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { getStatusBadgeColor, getStatusColor } from '../../Components/ColorStatus';
import { addCommentActions } from '../../actions/commentActions';

import { ToastContainer, toast } from 'react-toastify';

const { Meta } = Card;

const { Option } = Select;

const IndividualLeadScreen = () => {
  const [value, setValue] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [viewAllVisible, setViewAllVisible] = useState(false);
  const [isModalModalVisible, setIsModalModalVisible] = useState(false);
  const [viewAllModalVisible, setViewAllModalVisible] = useState(false);

  const [updateVisible, setUpdateVisible] = useState(false);
  const [updateCommentVisible, setUpdateCommentVisible] = useState(false);
  
  const [showReason, setShowReason] = useState(false);
  const [showMessageCode, setShowMessageCode] = useState(false);

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo, } = userLogin;
  
  const addCommentReducer = useSelector((state) => state.addCommentR);
  const { loading: commentLoading, error: commentError, success: commentSuccess } = addCommentReducer;
  
  const updateMarketLeadsStatus = useSelector((state) => state.updateMarketLeadStatus);
  const { loading: updateLoading, error: updateError, success: updateSuccess } = updateMarketLeadsStatus;


  const { Search } = Input;
  const { id } = useParams();
  const individualMarketLeads = useSelector((state) => state.individualMarketLead)
  const { loading: individualLeadLoading, error: individualLeadError, lead, success: individualLeadSuccess } = individualMarketLeads

  const dispatch = useDispatch()

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const showViewAllCommentsModal = () => {
    setIsModalModalVisible(true);
  };
  const showUpdateCommentsModal = () => {
    setUpdateCommentVisible(true);
  };

  const showViewAllModal = () => {
    setViewAllVisible(true);
  };

  const handleViewAllOk = () => {
    setViewAllVisible(false);
  };

  const handleViewAllCancel = () => {
    setViewAllVisible(false);
  };


  const showUpdateModal = () => {
    setUpdateVisible(true);
  };

  const handleUpdateOk = () => {
    setUpdateVisible(false);
  };

  const handleUpdateCancel = () => {
    setUpdateVisible(false);
  };

  const handleAddCommentOk = () => {
    setUpdateCommentVisible(false);
  };
  
  const handleAddCommentCancel = () => {
    setUpdateCommentVisible(false);
  };

  
  useEffect(()=>{
    dispatch(individualMarketLead(id))
  },[updateSuccess])

  const handleStatusChange = (value) => {
    console.log("value is ",value);

    if(value=="Not Interested"){
      setShowReason(true)
      setShowMessageCode(false)

    }
    else if(value == "Paid Registration"){
      setShowMessageCode(true)
      setShowReason(false)
      
    }
    else{
      setShowReason(false)
      setShowMessageCode(false)
    }

  };

  console.log("lead is ",lead);

  const onFinish = (values) => {
    console.log(userInfo);
    values.agent = userInfo.userData._id
    values.type = values.status

    values.message = value

    console.log('Form values:', values);
    const reasonText = values.reason ? values.reason.replace(/<[^>]+>/g, '') : '';

    if (values.status === "Paid Registration" && !values.MessageCode) {
      toast.error('Please provide a message code for Paid Registration');
      return;
    }
    if (values.status === "Not Interested" && !reasonText.trim()) {
      toast.error('Please provide a reason for Not Interested');
      return;
    }
    dispatch(updateMarketLeadStatus(id,values))

  };

  const addComment = (values) => {
    console.log(userInfo);
    values.marketingLeadId = id
    values.agent = userInfo.userData._id
    values.message = value

    console.log('Form values:', values);
    dispatch(addCommentActions(values))

  };

  useEffect(() => {
    if (commentError) {
      toast.error(commentError);
    }
    if (commentSuccess) {
      toast.success('Comment Added Successfully');
    setUpdateCommentVisible(false);

      dispatch(individualMarketLead(id))

    }
  }, [commentError, commentSuccess]);



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

   

        <Row>

      {lead && <> 
        <Col md={6} className='my-2'>
          <Badge.Ribbon  color={getStatusColor(lead.status[lead.status.length - 1].type)} text={lead.status[lead.status.length - 1].type} >
          <Card title={`${lead.firstName} ${lead.lastName} - Lead`}>
          <Table striped bordered hover>
        <tbody>
        <tr>
            <td>Phone Number</td>
            <td>{lead.phone}</td>
          </tr>
        <tr>
            <td>Comments</td>
            <td>{lead.comments ? <>{lead.comments.length}</>:<>0</>}</td>
          </tr>
          <tr>
            <td>Added On</td>
            <td>{moment(lead.createdAt).format('MMMM Do YYYY, h:mm:ss a')}</td>

          </tr>
          <tr>
            <td>Source</td>
            <td>{lead.source}</td>
          </tr>
          
        </tbody>
      </Table>
          </Card>
          </Badge.Ribbon>
          </Col>

          <Col md={6} className='my-2'>
          
          <Card title={`Lead Status History`}
          extra={
            <>
              <Button type="primary" className='mx-2' onClick={showViewAllModal}>View All</Button>
              <Button type="primary" onClick={showUpdateModal}>Update</Button>
            </>
          }
          >
          <Table striped bordered hover>
           
        <tbody>
        <tr>
        <td>{moment(lead.status[lead.status.length - 1].createdAt).format('MMMM Do YYYY, h:mm:ss a')}</td>
            <td>{lead.status[lead.status.length - 1].type}</td>
            <td>{lead.status[lead.status.length - 1].agent.firstName}</td>

          </tr>
    
        </tbody>
      </Table>
          </Card>

          <Card title={`Comment History`}
          extra={
            <>
              {/* <Button type="primary" className='mx-2' onClick={showViewAllCommentsModal}>View All</Button> */}
              <Button type="primary" className='mx-2' onClick={showUpdateCommentsModal}>Add Comment</Button>
            </>
          }
          className='my-2'>
          <Table striped bordered hover>
           
        <tbody>
          {lead.comments.length > 0 && 
        <tr>
        <td>{moment(lead.comments[lead.comments.length - 1].createdAt).format('MMMM Do YYYY, h:mm:ss a')}</td>
        {lead.comments.length > 0 && 
        <>
        <td dangerouslySetInnerHTML={{ __html: lead.comments[lead.comments.length - 1].message }}></td>
        
            <td>{lead.comments[lead.comments.length - 1]?.agent?.firstName}</td>
            </>}
          </tr>
}
    
        </tbody>
      </Table>
          </Card>

          
          
          </Col>

      </>}

          

          
        </Row>
     

      </main>
    </div>
    <Modal
        title="Add Lead"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
         
        ]}
      >
        <p>Content of the modal</p>
      </Modal>

          {lead && 
      <Modal
  title="View All"
  visible={viewAllVisible}
  onOk={handleViewAllOk}
  onCancel={handleViewAllCancel}
  footer={[
         
  ]}
>
  <Table striped bordered hover>
    <thead>
      <tr>
        <th>Time</th>
        <th>Type</th>
        <th>Agent</th>
      </tr>
    </thead>
    <tbody>
      {lead.status.map((status, index) => (
        <tr key={index}>
          <td>{moment(status.date).format('MMMM Do YYYY, h:mm:ss a')}</td>

          <td>
  <span className={`badge ${getStatusBadgeColor(status.type)}`}>{status.type}</span>
</td>
          <td>{status.agent.firstName}</td>
        </tr>
      ))}
    </tbody>
  </Table>
</Modal>
}


      {/* Update Modal */}
      <Modal
        title="Update"
        visible={updateVisible}
        onOk={handleUpdateOk}
        onCancel={handleUpdateCancel}
        footer={[
         
        ]}
      >
     <Form name="update_lead_status" onFinish={onFinish} layout="vertical">
      <Form.Item label="Status" name="status">
        <Select placeholder="Select status" onChange={handleStatusChange}>
          <Option value="Enquiry">
            <Badge status="processing" color="blue" text="Enquiry" />
          </Option>
          <Option value="Not Interested">
            <Badge status="error" text="Not Interested" />
          </Option>
          <Option value="Unpaid Registration and Letter Sent">
            <Badge status="warning" text="Unpaid Registration and Letter Sent" />
          </Option>
          <Option value="Paid Registration">
            <Badge status="success" text="Paid Registration" />
          </Option>
          <Option value="Admissions Letter Sent">
            <Badge status="default" text="Admissions Letter Sent" />
          </Option>
          {/* <Option value="Converted">
            <Badge status="processing" color="purple" text="Converted" />
          </Option>
          <Option value="Admitted">
            <Badge status="success" color="green" text="Admitted" />
          </Option> */}
          {/* Add more options as needed */}
        </Select>
      </Form.Item>
      {showReason && 

       <Form.Item label="reason" name="reason">

       <ReactQuill theme="snow" value={value} onChange={setValue} />
 
       </Form.Item>

      }

{showMessageCode && 

<Form.Item label="Message Code" name="MessageCode">

  <Input />

</Form.Item>

}


     

      <Button type="primary" htmlType="submit">
        Submit
      </Button>

    </Form>
      </Modal>

      <Modal
        title="Add Comment"
        visible={updateCommentVisible}
        onOk={handleAddCommentOk}
        onCancel={handleAddCommentCancel}
        footer={[
         
        ]}
      >
   <Form name="add_lead_comment" onFinish={addComment} layout="vertical">
      <Row>
        <Col md={12}>
          <Form.Item
            label="Comment"
            name="message"
            rules={[{ required: true, message: 'Please input your comment!' }]}
          >
            <ReactQuill theme="snow" value={value} onChange={setValue} />
          </Form.Item>
        </Col>
        <Col md={6}>
          <Form.Item
            label="Due Date"
            name="date"
            rules={[{ required: true, message: 'Please select a due date!' }]}
          >
            <DatePicker className="w-100 my-2" placeholder="Select due date" />
          </Form.Item>
        </Col>
        <Col md={6}>
          <Form.Item
            label="Due Time"
            name="time"
            rules={[{ required: true, message: 'Please select a due time!' }]}
          >
            <TimePicker className="w-100 my-2" placeholder="Select due time" format="HH:mm" />
          </Form.Item>
        </Col>
        <Col md={12}>
          <Button type="primary" className="w-100" htmlType="submit">
            Submit
          </Button>
        </Col>
      </Row>
    </Form>
      </Modal>

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

export default IndividualLeadScreen;
