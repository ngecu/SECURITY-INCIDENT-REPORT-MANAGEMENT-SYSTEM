import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TiTick } from "react-icons/ti";
import { Link, useLocation } from 'react-router-dom';
import Sidebar2 from './components/Sidebar2'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Button, Card, Form, Input, Result, Table, Tabs } from 'antd';
import Topbar from './components/Topbar';
import { ToastContainer, toast } from 'react-toastify';
import { useGeolocated } from "react-geolocated";
import { MdOutlineWrongLocation } from "react-icons/md";
import { Tag } from 'antd';
import ReactQuill from 'react-quill';
import { createFeedback } from '../../actions/feedbackActions';
import Loader from '../../Components/Loader';
const localizer = momentLocalizer(moment) // or globalizeLocalizer



const TrainerFeedbackScreen = () => {
  const [message, setMessage] = useState(null);


  const location = useLocation();
  const { pathname } = location;
  const { TabPane } = Tabs;
  console.log(pathname);

  const dispatch = useDispatch();

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const { loading: loadingFeedback, error: errorFeedback,success:successFeedback } = useSelector(state => state.createFeedback);


  const [form] = Form.useForm();
  const [content, setContent] = useState('');

  const onFinish = async (values) => {
    // Combine form values and content from React-Quill
    
    values.content = content
    values.user = userInfo._id
    console.log('Success:', values);
    dispatch(createFeedback(values))
    
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
    message.error('Submit failed!');
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
    {loadingFeedback ? <Loader/> : successFeedback ? (
    <Result
        status="success"
        title="Successfully Submitted Feedback"
    />
) : ( 
      <Card title="Anonymous Feedback Form">
        <span className="text-danger">*We know your time is limited but your opinion/feedback is valuable for us.Please help us improve ourselves by sending any complaints/suggestions directly to our directors</span>
      <Form
        form={form}
        name="rich-text-editor-form"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        layout="vertical"
        className='my-2'
      >
        <Form.Item
          name="title"
          label="Title"
          rules={[{ required: true, message: 'Please input the title!' }]}
        >
          <Input />
        </Form.Item>
        
        <Form.Item
          name="content"
          label="Content"
          rules={[{ required: true, message: 'Please input the content!' }]}
        >
          <ReactQuill theme="snow" value={content} onChange={setContent} />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
 </Card>
)}



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

export default TrainerFeedbackScreen;
