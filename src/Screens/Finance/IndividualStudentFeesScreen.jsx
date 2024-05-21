import { Button, Card, Input,  Modal,Badge,Form,Select } from 'antd';
import { useEffect, useState } from 'react';
import 'react-calendar/dist/Calendar.css';
import { FaEye } from 'react-icons/fa';
import Topbar from './components/Topbar';
import { useParams } from 'react-router-dom';

import { Col, Row, Table } from 'react-bootstrap';
import { FaFacebook } from "react-icons/fa";
import facebook from '../../assets/facebook.png';
import youtube from '../../assets/youtube.png';
import linkedin from '../../assets/linkedin.png';
import instagram  from '../../assets/instagram.png';
import google  from '../../assets/google.png';
import { Link } from 'react-router-dom';
import { FaFileExcel } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import { allMarketLeads, individualMarketLead, updateMarketLeadStatus } from '../../actions/marketingActions';
import moment from 'moment';
import Sidebar2 from './components/Sidebar2';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { getStatusBadgeColor, getStatusColor } from '../../Components/ColorStatus';
import { addCommentActions } from '../../actions/commentActions';
import { ToastContainer, toast } from 'react-toastify';
import { getTransactionsByStudent } from '../../actions/transactionActions';
import Loader from '../../Components/Loader';

const { Meta } = Card;

const { Option } = Select;

const IndividualStudentFeesScreen = () => {
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

  const transactionsByStudent = useSelector((state)=> state.transactionsByStudent)
  const { loading: transactionsByStudentLoading, error: transactionsByStudentError, transactions, success: transactionsByStudentSuccess } = transactionsByStudent

  const { Search } = Input;
  const { id } = useParams();
  const individualMarketLeads = useSelector((state) => state.individualMarketLead)
  const { loading: individualLeadLoading, error: individualLeadError, lead, success: individualLeadSuccess } = individualMarketLeads

  const dispatch = useDispatch()


  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };


  const handleViewAllOk = () => {
    setViewAllVisible(false);
  };

  const handleViewAllCancel = () => {
    setViewAllVisible(false);
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
    dispatch(getTransactionsByStudent(id))
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

          <>
            {transactionsByStudentLoading ? (
                <Loader/>) : transactions && (
                    <Row>
                <Col md={6}>
                    <Card>
                      
                        <img src="https://t3.ftcdn.net/jpg/05/16/27/58/360_F_516275801_f3Fsp17x6HQK0xQgDQEELoTuERO4SsWV.jpg" style={{width:"100px",textAlign:"center"}} />
                    <Table>
                        <tr>
                            <td>First Name</td>
                            <td>{transactions && transactions[0]?.student?.firstName}</td>
                        </tr>
                        <tr>
                            <td>Second Name</td>
                            <td>{transactions && transactions[0]?.student?.lastName}</td>
                        </tr>
                        <tr>
                        <td>Phone </td>
                            <td>{transactions && transactions[0]?.student?.phone}</td>

                        </tr>
                    </Table>
                    </Card>
                </Col>
                <Col md={6}>
                    <Card>
                    <Table>
                        <thead>
                            <th>AMOUNT PAID</th>
                            <th>AMOUNT REMAINING</th>
                            <th>DATE</th>

                        </thead>
                    {transactions.map((transaction) => 
(
    <tr key={transaction._id}>
    <td>Ksh.{transaction.amount_paid}</td>
    <td>Ksh.{transaction.amount_remaining}</td>
    <td>{transaction.date}</td>

    
       </tr>
))}
                    

                    </Table>
                    </Card>
                </Col>
            </Row>
                )}
                </>
     

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
        title="Add Commennt"
        visible={updateCommentVisible}
        onOk={handleAddCommentOk}
        onCancel={handleAddCommentCancel}
        footer={[
         
        ]}
      >
     <Form name="add_lead_comment" onFinish={addComment} layout="vertical">
  

       <Form.Item label="comment" name="comment">

       <ReactQuill theme="snow" value={value} onChange={setValue} />
 
       </Form.Item>

      



     

      <Button type="primary" htmlType="submit">
        Submit
      </Button>

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

export default IndividualStudentFeesScreen;
