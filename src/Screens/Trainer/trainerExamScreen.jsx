import { Button, Card,Upload, Form, Input, Select, DatePicker, TimePicker,Result,Tabs, Checkbox, Radio, Modal  } from 'antd';
import { useEffect, useState } from 'react';
import { InboxOutlined } from '@ant-design/icons';
import { UploadOutlined } from '@ant-design/icons';

import 'react-calendar/dist/Calendar.css';
import moment from 'moment';
import Topbar from './components/Topbar';

import { Col, Row, Table } from 'react-bootstrap';

import { ToastContainer, toast } from 'react-toastify';
import Sidebar2 from './components/Sidebar2';
import { createExam } from '../../actions/examActions';
import { useDispatch } from 'react-redux';

const { Meta } = Card;
const { TabPane } = Tabs;

const TrainerExamScreen = () => {
  const [uploadedExternalFiles, setUploadedExternalFiles] = useState([]);

    const [form] = Form.useForm();
    const [examform] = Form.useForm();

    const dispatch = useDispatch();

    const props = {
      action: 'http://localhost:5000/api/upload',
      listType: 'text',
      beforeUpload: (file) => {
        const isPdf = file.type === 'application/pdf';
        if (!isPdf) {
          toast.error('You can only upload JPG/PNG image files or PDF files!')
  
        }
        return isPdf ? true : Upload.LIST_IGNORE;
      },
      onChange(info) {
        if (info.file.status !== 'uploading') {
          console.log(info.file, info.fileList);
        }
        if (info.file.status === 'done') {
          toast.success(`${info.file.name} file uploaded successfully`);
          setUploadedExternalFiles(prevFiles => [...prevFiles, info.file.response.fileDetails]);
          // message.success(`${info.file.name} file uploaded successfully`);
        } else if (info.file.status === 'error') {
          toast.error(`${info.file.name} file upload failed.`);
          // message.error(`${info.file.name} file upload failed.`);
        }
      },
    };

    const handleSubmit = async (values) => {
      const formattedValues = {
        ...values,
        date: values.date.format('YYYY-MM-DD'), // format date to string
        startTime: values.startTime.format('HH:mm'), // format time to string
      };
      formattedValues.createdBy = userInfo.userData._id
      // Call onSubmit prop passed down from parent component
      dispatch(createExam(formattedValues))
    };

    const onFinish = (values) => {
      console.log('Received values of form:', values);
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

      <TabPane tab="Incident Report" key="1">

        <Card title="Incident Report">
        <Form
      form={form}
      layout="vertical"
      onFinish={onFinish}
      autoComplete="off"
    >
      <Row >
        <Col md={6}>
          <Form.Item
            name="date"
            label="Date"
            rules={[{ required: true, message: 'Please select the date of the incident!' }]}
          >
            <DatePicker style={{ width: '100%' }} />
          </Form.Item>
        </Col>
        <Col md={6}>
          <Form.Item
            name="course"
            label="Course"
            rules={[{ required: true, message: 'Please enter the course name!' }]}
          >
            <Input placeholder="Enter course name" />
          </Form.Item>
        </Col>
        <Col md={6}>
          <Form.Item
            name="admissionNo"
            label="Admission No"
            rules={[{ required: true, message: 'Please enter the admission number!' }]}
          >
            <Input placeholder="Enter admission number" />
          </Form.Item>
        </Col>
        <Col md={6}>
          <Form.Item
            name="candidateName"
            label="Name of the Candidate"
            rules={[{ required: true, message: 'Please enter the candidate name!' }]}
          >
            <Input placeholder="Enter candidate name" />
          </Form.Item>
        </Col>
        <Col md={12}>
          <Form.Item
            name="examinationPaper"
            label="Examination Paper"
            rules={[{ required: true, message: 'Please enter the examination paper!' }]}
          >
            <Input placeholder="Enter examination paper" />
          </Form.Item>
        </Col>
        <Col md={24}>
          <Form.Item
            name="typeOfIncident"
            label="Type of Incident"
            rules={[{ required: true, message: 'Please select the type of incident!' }]}
          >
            <Checkbox.Group style={{ width: '100%' }}>
              <Row>
                <Col md={4}><Checkbox value="mobile">Use of mobile phone</Checkbox></Col>
                <Col md={4}><Checkbox value="copying">Copying from each other</Checkbox></Col>
                <Col md={4}><Checkbox value="unauthorized">Unauthorized material in exam room</Checkbox></Col>
              </Row>
            </Checkbox.Group>
          </Form.Item>
         
        </Col>
        <Col md={12}>
          <Form.Item
            name="description"
            label="Description"
            rules={[{ required: true, message: 'Please enter a description of the incident!' }]}
          >
            <Input.TextArea rows={4} placeholder="Describe the incident" />
          </Form.Item>
        </Col>
        <Col md={12}>
          <Form.Item
            name="candidateContacts"
            label="Candidate's Contacts"
            rules={[{ required: true, message: 'Please enter candidate contacts!' }]}
          >
            <Input placeholder="Enter candidate's contact number" />
          </Form.Item>
        </Col>
        <Col md={12}>
          <Form.Item
            name="parentsContacts"
            label="Parent's/Guardian's Contacts"
            rules={[{ required: true, message: 'Please enter parents/guardians contacts!' }]}
          >
            <Input placeholder="Enter parent's/guardian's contact number" />
          </Form.Item>
        </Col>

        <Col md={6}>
          <Form.Item
            name="invigilator1"
            label="Invigilator 1"
            rules={[{ required: true, message: 'Please enter the admission number!' }]}
          >
            <Input placeholder="Enter Invigilator's number" />
          </Form.Item>
        </Col>

        <Col md={6}>
          <Form.Item
            name="invigilator2"
            label="Invigilator 2"
            rules={[{ required: true, message: 'Please enter the admission number!' }]}
          >
            <Input placeholder="Enter Invigilator's number" />
          </Form.Item>
        </Col>

        <Col md={12}>
          <Form.Item
            name="examicodinatorcomment"
            label="Examination’s Coordinator comment"
            rules={[{ required: true, message: 'Please enter a description of the incident!' }]}
          >
            <Input.TextArea rows={4} placeholder="Describe the incident" />
          </Form.Item>
        </Col>
       

        <Col md={24}>
          <Form.Item
            name="attachments"
            label="Please attach:"
            valuePropName="fileList"
            getValueFromEvent={(e) => {
              if (Array.isArray(e)) {
                return e;
              }
              return e && e.fileList;
            }}
          >
            <Upload action="/upload.do" listType="text">
              <Button icon={<UploadOutlined />}>Click to upload (Exhibit, Candidate’s statement)</Button>
            </Upload>
          </Form.Item>
        </Col>
        <Col md={24}>
          <Form.Item>
            <Button type="primary" htmlType="submit" className='w-100'>
              Submit Incident Report
            </Button>
          </Form.Item>
        </Col>
      </Row>
    </Form>
        </Card>
    
      </TabPane>

      <TabPane tab="Create Exam" key="2">

<Card>
<Form
      form={examform}
      layout="vertical"
      onFinish={handleSubmit}
      initialValues={{
        date: moment(), // default today
        startTime: moment(), // default now
      }}
    >
      <Row>
        <Col md={12}>
        <Form.Item
        name="title"
        label="Exam Title"
        rules={[{ required: true, message: 'Please enter the exam title!' }]}
      >
        <Input placeholder="Enter exam title" />
      </Form.Item>
        </Col>
        <Col md={6}>

        <Form.Item
        name="date"
        label="Exam Date"
        rules={[{ required: true, message: 'Please select exam date!' }]}
      >
        <DatePicker className='w-100' />
      </Form.Item>
        </Col>
        <Col md={6}>
        <Form.Item
        name="startTime"
        label="Start Time"
        rules={[{ required: true, message: 'Please select start time!' }]}
      >
        <TimePicker className='w-100' format='HH:mm' />
      </Form.Item>
        </Col>
        <Col md={6}>
        <Form.Item
        name="examType"
        label="Exam Type"
        rules={[{ required: true, message: 'Please select the exam type!' }]}
      >
        <Select placeholder="Select exam type">
          <Option value="Ordinary">Ordinary</Option>
          <Option value="Cat">Cat</Option>
          <Option value="Special">Special</Option>
          <Option value="Supplementary">Supplementary</Option>
        </Select>
      </Form.Item>
          </Col>

          <Col md={6}>

          <Form.Item
        name="course"
        label="Course"
        rules={[{ required: true, message: 'Please select a course!' }]}
      >
        <Select placeholder="Select a course">
         
        </Select>
      </Form.Item>
          </Col>

          <Col md={6}>
          <Form.Item
        name="courseUnit"
        label="Course Unit"
        rules={[{ required: true, message: 'Please select a course unit!' }]}
      >
        <Select placeholder="Select a course unit">
         
        </Select>
      </Form.Item>
          </Col>

          <Col md={6}>
          <Form.Item
        name="yearOfStudy"
        label="Year of Study"
        rules={[{ required: true, message: 'Please input the year of study!' }]}
      >
        <Select placeholder="Select year of study">
          <Select.Option  value={1}>1</Select.Option>
          <Select.Option value={2}>2</Select.Option>
         </Select>
      </Form.Item>
          </Col>

          <Col md={6}>
  <Form.Item
    name="invigilator1"
    label="Invigilator 1"
    rules={[{ required: true, message: 'Please input the name of Invigilator 1!' }]}
  >
    <Input placeholder="Enter Invigilator 1's name" />
  </Form.Item>
</Col>

<Col md={6}>
  <Form.Item
    name="invigilator2"
    label="Invigilator 2"
    rules={[{ required: true, message: 'Please input the name of Invigilator 2!' }]}
  >
    <Input placeholder="Enter Invigilator 2's name" />
  </Form.Item>
</Col>

<Col md={6}>
  <Form.Item
    name="room"
    label="Room"
    rules={[{ required: true, message: 'Please input the room number!' }]}
  >
    <Input placeholder="Enter room number" />
  </Form.Item>
</Col>


          <Col md={6}>

          <Form.Item
        name="document"
        label="Document"
        rules={[{ required: true, message: 'Please input the document URL!' }]}
      >
       
       <Upload name="exam_document" {...props}   >
                        <Button icon={<InboxOutlined />}>Click to upload</Button>
                      </Upload>

      </Form.Item>

          </Col>
          <Col md={12}>
              <Form.Item>
            <Button type="primary" className='w-100' htmlType="submit">
              Submit Exam
            </Button>
          </Form.Item>
          </Col>

      </Row>

    


    
    </Form>
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

export default TrainerExamScreen;
