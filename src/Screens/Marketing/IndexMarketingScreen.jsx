import { Button, Card,Modal, Form, Input, Select, DatePicker,Result,Tabs, List, Skeleton, Avatar, TimePicker  } from 'antd';
import React, { useEffect, useState } from 'react';
import 'react-calendar/dist/Calendar.css';
import Topbar from './components/Topbar';
import moment from 'moment';

import { Badge, Col, ListGroup, Row, Table } from 'react-bootstrap';

import IntakeChart from './components/IntakeChart';
import StageChart from './components/StageChart';
import CourseChart from './components/CourseChart';

import { createStyles, useTheme } from 'antd-style';
import { MyMarketLead, allMarketLeads, registerMarketLead } from '../../actions/marketingActions';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import Sidebar2 from './components/Sidebar2';
import Loader from '../../Components/Loader';
import ReactQuill from 'react-quill';
import { IoIosAddCircle } from "react-icons/io";

import { ImUsers } from "react-icons/im";
import { FaUsers } from 'react-icons/fa6';
import { FaBlenderPhone, FaEye } from 'react-icons/fa';
import { getStatusColor } from '../../Components/ColorStatus';
import { fetchCommentsByAgentId, fetchMyTodaysComments } from '../../actions/commentActions';
import { Link } from 'react-router-dom';
const count = 4;
const fakeDataUrl = `https://randomuser.me/api/?results=${count}&inc=name,gender,email,nat,picture&noinfo`;

const { Meta } = Card;
const { TabPane } = Tabs;
const useStyle = createStyles(({ token }) => ({

  'my-modal-mask': {
    boxShadow: `inset 0 0 15px #fff`,
  },

}));


const IndexMarketingScreen = () => {
  const [value, setValue] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [myLeads, setMyLeads] = useState([]);
  const { styles } = useStyle();
  const token = useTheme();
  
  const registerLead = useSelector((state) => state.registerLead)
  const { loading: registerLoading, error: registerError,  success: registerSuccess } = registerLead
  
  const allLeads = useSelector((state) => state.allLeads)
  const { loading: allLeadsLoading, error: allLeadsError, leads, success: allLeadsSuccess } = allLeads
  
  const MyMarketLeads = useSelector((state) => state.MyMarketLeads)
  const { loading: myLeadsLoading, error: myLeadsError, leads:myLeadss, success: myLeadsSuccess } = MyMarketLeads

  const myTodaysComments = useSelector((state) => state.myTodaysComments)
  const { loading: myTodaysCommentsLoading, error: myTodaysCommentsError, myComments, success: myTodaysCommentsSuccess } = myTodaysComments


  const userLogin = useSelector((state) => state.userLogin)
const { loading, error, userInfo,success } = userLogin

const storedUser = JSON.parse(localStorage.getItem('userInfo'));
const [visibleToDo, setVisibleToDo] = useState(false);

    const showModalToDo = () => {
      setVisibleToDo(true);
    };

    const handleCancelToDo = () => {
      setVisibleToDo(false);
    };

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


  const handleDateRangeChange = (dates, dateStrings) => {
    console.log('Selected Range: ', dates);
    console.log('Formatted Selected Range: ', dateStrings);
  };

  useEffect(() => {
    if (registerError) {
      toast.error(registerError);
    }
    if (registerSuccess) {
      console.log("successfully created");
      toast.success('Lead Created Successfully');
      handleCancel();
      dispatch(allMarketLeads());
    }
  }, [registerError, registerSuccess, dispatch]);
  const agent_id = userInfo?.userData?._id || storedUser?.userData?._id

  useEffect(()=>{
    dispatch(allMarketLeads())
    dispatch(MyMarketLead(agent_id))
    dispatch(fetchCommentsByAgentId(agent_id))
    dispatch(fetchMyTodaysComments(agent_id))
  },[])


  useEffect(() => {
    if (leads) {

      const myLeads = leads.filter(lead => {
        // Check if any status object in the lead's status array has the agent ID of the stored user
        return lead.status.some(statusObj => statusObj.agent?._id === storedUser?.userData?._id || userInfo?.userData?.firstName);
      });
      setMyLeads(myLeads);
    }
  }, []);
  

  const onFinish = (values) => {
    // Handle form submission
    values.status = 'Enquiry'
    values.date =new Date()

    values.agent = storedUser.userData._id

    console.log('Form values:', values);

    dispatch(registerMarketLead(values))
  };

  const classNames = {
    body: styles['my-modal-body'],
    mask: styles['my-modal-mask'],
    header: styles['my-modal-header'],
    footer: styles['my-modal-footer'],
    content: styles['my-modal-content'],
  };
  const modalStyles = {
    header: {
      borderLeft: `5px solid ${token.colorPrimary}`,
      borderRadius: 0,
      paddingInlineStart: 5,
    },
   
    mask: {
      backdropFilter: 'blur(10px)',
    },

  };

  const [initLoading, setInitLoading] = useState(true);
  // const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [list, setList] = useState([]);
  useEffect(() => {
    fetch(fakeDataUrl)
      .then((res) => res.json())
      .then((res) => {
        setInitLoading(false);
        setData(res.results);
        setList(res.results);
      });
  }, []);
  const onLoadMore = () => {
    setLoading(true);
    setList(
      data.concat(
        [...new Array(count)].map(() => ({
          loading: true,
          name: {},
          picture: {},
        })),
      ),
    );
    fetch(fakeDataUrl)
      .then((res) => res.json())
      .then((res) => {
        const newData = data.concat(res.results);
        setData(newData);
        setList(newData);
        setLoading(false);
        // Resetting window's offsetTop so as to display react-virtualized demo underfloor.
        // In real scene, you can using public method of react-virtualized:
        // https://stackoverflow.com/questions/46700726/how-to-use-public-method-updateposition-of-react-virtualized
        window.dispatchEvent(new Event('resize'));
      });
  };

  const { TextArea } = Input;

  const enquiryCount = myLeadss && myLeadss.reduce((count, lead) => {
    // Check if the last status type in each lead's status array is 'enquiry'
    if (lead.status.length > 0 && lead.status[lead.status.length - 1].type === 'Enquiry') {
      return count + 1;  // Increment count if true
    }
    return count;  // Otherwise, return the current count
  }, 0);


  const convertedCount = myLeadss && myLeadss.reduce((count, lead) => {
    // Check if the last status type in each lead's status array is 'enquiry'
    if (lead.status.length > 0 && lead.status[lead.status.length - 1].type === 'Converted') {
      return count + 1;  // Increment count if true
    }
    return count;  // Otherwise, return the current count
  }, 0);

  

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

    
        {leads && leads.length > 0 && (
  <Button  type='primary' className='w-100' onClick={showModal}> <IoIosAddCircle className='mx-2' /> Add Lead</Button>
)}

        <Row className='my-2'>
 

<div class="col-xl-3 col-sm-6 col-12 my-2 c-dashboardInfo "> 
        <div class="card">
          <div class="card-content">
            <div class="card-body">
              <div class="media d-flex">
                <div class="align-self-center">
                <ImUsers style={{fontSize:"70px"}}  className="font-large-2 float-left"/>
                 
                </div>
                <div class="media-body text-right">
                  <h3>{leads && leads.length}</h3>
                  <span>Total Leads</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="col-xl-3 col-sm-6 col-12 my-2"> 
        <div class="card">
          <div class="card-content">
            <div class="card-body">
              <div class="media d-flex">
                <div class="align-self-center">
                {/* <ImUsers  className="font-large-2 float-left"/> */}
                <FaUsers style={{color:'#0D6EFD',fontSize:"70px"}} className="font-large-2 float-left" />
                </div>
                <div class="media-body text-right">
                  <h3>{myLeadss && enquiryCount}</h3>
                  <span>My Enquiries </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="col-xl-3 col-sm-6 col-12 my-2"> 
        <div class="card">
          <div class="card-content">
            <div class="card-body">
              <div class="media d-flex">
                <div class="align-self-center">
                <ImUsers style={{color:'green',fontSize:"70px"}}  className="font-large-2 float-left"/>
                 
                </div>
                <div class="media-body text-right">
                  <h3>{convertedCount}</h3>
                  <span>Converted</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="col-xl-3 col-sm-6 col-12 my-2"> 
        <div class="card">
          <div class="card-content">
            <div class="card-body">

              
              <div class="media d-flex">
                <div class="align-self-center">
                {/* <ImUsers  className="font-large-2 float-left"/> */}
                <FaBlenderPhone style={{fontSize:"70px"}} className="font-large-2 float-left" />
                </div>
                <div class="media-body text-right">
                  <h3>{myComments && myComments.length}</h3>
                  <span>Today's Calls</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

<React.Fragment>
{storedUser.isHead == false ? 
<Row>
<Col md={6}>
  <Card className='recent' title="Recently Added Leads">
    <Table striped bordered>
    <thead>
                    <tr>
                       
                        <th>Name</th>
                        <th>Date Added</th>
                        <th>Status</th>
                    </tr>
                </thead>
                {leads && leads.slice(0,2).map((lead, index) => (
    <tr key={index}>
        <td>{lead.firstName}</td>
        <td>{lead.source}</td>
        <td>
        {lead.status[lead.status.length - 1].type}
        </td>
    </tr>
))}

    </Table>
  </Card>
</Col>


        <>{myComments && myComments > 1 ?  <Col md={6}>
  <Card title="Today's Calls">
  <ListGroup as="ol" numbered>
  {myComments && myComments.map((comment) => (
      <ListGroup.Item as="li">{comment.marketingLead.firstName} {comment.marketingLead.lastName} 
      
      <Link to={`/marketing/all_leads/${comment.marketingLead._id}`} className="ant-btn css-dev-only-do-not-override-11xg00t ant-btn-default">
  <FaEye />
</Link>    

      </ListGroup.Item>
  ))}
    </ListGroup>
  </Card>
</Col>
: 
<Col md={6}>
  
<Result
    status="warning"
    title="There are no call reminders today"
  />
  </Col>
}

</>
      
          

            </Row>

            :
<Tabs defaultActiveKey="1">
      <TabPane tab="Intakes" key="1">
      <Row>
 


{allLeadsLoading ? (
  <Loader />
) : (
  <>
    {leads && leads.length === 0 ? (
      <Card>
      <Result
        status="warning"
        title="There are currently no leads"
        extra={<Button type="primary" key="console" onClick={showModal}>Add Lead</Button>}
      />
      </Card>
    ) : (
      <>
        <Col md={6} className='my-2'>
          <Card >
            <IntakeChart agent={`Tabitha`}  leads={leads}/>
          </Card>
        </Col>
        <Col md={6} className='my-2'>
          <Card >
            <IntakeChart agent={`Mulunga`}  leads={leads}/>
          </Card>
        </Col>
        <Col md={6} className='my-2'>
          <Card >
            <IntakeChart agent={`Grace`}  leads={leads}/>
          </Card>
        </Col>

        <Col md={6} className='my-2'>
          <Card >
            <IntakeChart agent={`Teddy`}  leads={leads}/>
          </Card>
        </Col>

      </>
    )}
  </>
)}

       


        </Row>
      </TabPane>
      <TabPane tab="Stage" key="2">
        <Row>
        <>
        <Col md={6} className='my-2'>
          <Card >
            <StageChart agent={`Tabitha`}  leads={leads}/>
          </Card>
        </Col>
        <Col md={6} className='my-2'>
          <Card >
            <StageChart agent={`Mulunga`}  leads={leads}/>
          </Card>
        </Col>
        <Col md={6} className='my-2'>
          <Card >
            <StageChart agent={`Grace`}  leads={leads}/>
          </Card>
        </Col>

        <Col md={6} className='my-2'>
          <Card >
            <StageChart agent={`Teddy`}  leads={leads}/>
          </Card>
        </Col>

      </>
        </Row>
      </TabPane>
      <TabPane tab="Courses" key="3">
      <Row>
        <>
        <Col md={6} className='my-2'>
          <Card >
            <CourseChart agent={`Tabitha`}  leads={leads}/>
          </Card>
        </Col>
        <Col md={6} className='my-2'>
          <Card >
            <CourseChart agent={`Mulunga`}  leads={leads}/>
          </Card>
        </Col>
        <Col md={6} className='my-2'>
          <Card >
            <CourseChart agent={`Grace`}  leads={leads}/>
          </Card>
        </Col>

        <Col md={6} className='my-2'>
          <Card >
            <CourseChart agent={`Teddy`}  leads={leads}/>
          </Card>
        </Col>

      </>
        </Row>
        </TabPane>
       
      </Tabs>
}
</React.Fragment>
</Row>

           



       
     

      </main>
    </div>
    <Modal
        title="Add Lead"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        width={1000}
        footer={[
         
        ]}
      >
        <Form
        name="add_lead_form"
        onFinish={onFinish}
        layout='vertical'
        initialValues={{ source: 'Facebook' }} // Set initial values if needed
      >
      <Row gutter={16}>
        <Col md={6}>
          <Form.Item name="firstName" label="First Name" rules={[{ required: true, message: 'Please enter first name' }]}>
            <Input />
          </Form.Item>
        </Col>
        <Col md={4}>
          <Form.Item name="lastName" label="Last Name" rules={[{ required: true, message: 'Please enter last name' }]}>
            <Input />
          </Form.Item>
        </Col>
        <Col md={2}>
        <Form.Item name="gender" label="Gender" rules={[{ required: true, message: 'Please enter lead gender ' }]}>
            <Select>
              <Option value="Male">Male</Option>
              <Option value="Female">Female</Option>

            </Select>
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col md={6}>
          <Form.Item name="alias" label="Alias">
            <Input />
          </Form.Item>
        </Col>
        <Col md={6}>
          <Form.Item name="phone" label="Phone" rules={[{ required: true, message: 'Please enter phone number' }]}>
            <Input />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        
        <Col md={6}>
          <Form.Item name="kcseGrade" label="KCSE Grade">
            <Input />
          </Form.Item>
        </Col>

        <Col md={6}>
          <Form.Item name="source" label="Source" rules={[{ required: true, message: 'Please select source' }]}>
            <Select>
              <Option value="Facebook">Facebook</Option>
              <Option value="Tik Tok">Tik Tok</Option>
              <Option value="Instagram">Instagram</Option>
              <Option value="Twitter">Twitter</Option>
              <Option value="Radio">Radio</Option>
              <Option value="TV">TV</Option>
              <Option value="WalkIn">Walk In</Option>
             
            </Select>
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col md={3}>
          <Form.Item name="courseAdvised" label="Course Advised" >
            <Select>
              {/* Options for Courses */}
            </Select>
          </Form.Item>
        </Col>
        <Col md={3}>
          <Form.Item name="courseEnquired" label="Course Enquired" >
            <Select>
              {/* Options for Courses */}
            </Select>
          </Form.Item>
        </Col>
        <Col md={6}>
          <Form.Item name="mpesaCode" label="Mpesa Code">
            <Input />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col md={3}>
          <Form.Item name="entry" label="Intake Date">
            <DatePicker />
          </Form.Item>
        </Col>

        <Col md={3}>
          <Form.Item name="probabilty"  label="Probability %">
            <Input  />
          </Form.Item>
        </Col>

        <Col md={6}>
      <Form.Item name="comment" label="Comment">
    
        <ReactQuill theme="snow" value={value} onChange={setValue} />

      </Form.Item>
    </Col>
        
      </Row>

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

export default IndexMarketingScreen;
