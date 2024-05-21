import { Button, Card,Upload, Form, Input, Select, DatePicker,message ,Tabs, Checkbox, Radio, Modal, Result  } from 'antd';
import { useEffect, useState } from 'react';
import { UserOutlined, PhoneOutlined } from '@ant-design/icons';
import { InboxOutlined } from '@ant-design/icons';

import 'react-calendar/dist/Calendar.css';

import Topbar from './components/Topbar';

import { Col, Row, Table } from 'react-bootstrap';

import { ToastContainer, toast } from 'react-toastify';
import Sidebar2 from './components/Sidebar2';
import ReactQuill from 'react-quill';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../../Components/Loader';
import { submitExternalExamForm, submitSpecialExamForm, submitSupplementaryExamForm } from '../../actions/examformActions';



const { Meta } = Card;
const { TabPane } = Tabs;


const counties = {
    "Nairobi": ["Westlands", "Kasarani", "Langata", "Starehe"],
    "Kiambu": ["Thika", "Kiambu", "Limuru", "Gatundu"],
    "Mombasa": ["Mvita", "Likoni", "Nyali"],
    // Add other counties and their sub-counties similarly
  };


const StudentExamScreen = () => {
    const storedUser = JSON.parse(localStorage.getItem('userInfo'));
const [selectedCounty, setSelectedCounty] = useState('');
  const [subCounties, setSubCounties] = useState([]);
  const [uploadedExternalFiles, setUploadedExternalFiles] = useState([]);
  const [uploadedEvidenceFiles, setUploadedEvidenceFiles] = useState([]);

  const [showUpload, setShowUpload] = useState(false);
  const [selectedCourses, setSelectedCourses] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedIncident, setSelectedIncident] = useState(null);
  const [checkedStates, setCheckedStates] = useState([]);

  const userLogin = useSelector((state) => state.userLogin)
  const { loading, error, userInfo,success } = userLogin

  const { loading: loadingExternal, error: errorExternal, data: dataExternal,success:successExternal } = useSelector(state => state.submitexternalExamForm);
  const { loading: loadingSpecial, error: errorSpecial, data: dataSpecial,success:successSpecial } = useSelector(state => state.submitspecialExamForm);
  const { loading: loadingSupplementary, error: errorSupplementary, data: dataSupplementary,success:successSupplementary } = useSelector(state => state.submitsupplementaryExamForm);

  const dispatch = useDispatch()

   // Example of how you might handle effects based on state changes
   useEffect(() => {
    if (errorExternal) {
        toast.error(`External Form Error: ${errorExternal}`);
    }
    if (errorSpecial) {
        toast.error(`Special Form Error: ${errorSpecial}`);
    }
    if (errorSupplementary) {
        toast.error(`Supplementary Form Error: ${errorSupplementary}`);
    }

    if (dataExternal) {
        toast.success('External form submitted successfully!');
    }
    if (dataSpecial) {
        toast.success('Special exam form submitted successfully!');
    }
    if (dataSupplementary) {
        toast.success('Supplementary exam form submitted successfully!');
    }
}, [errorExternal, errorSpecial, errorSupplementary, dataExternal, dataSpecial, dataSupplementary]);

// Rest of your component code...


  const handleCheckboxChange = (title) => {
    const updatedCheckedStates = {
      ...checkedStates,
      [title]: !checkedStates[title]
    };
    setCheckedStates(updatedCheckedStates);
  };

  const handleShowModal = (incident) => {
    setSelectedIncident(incident);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  // Example course data
  const courses = [
    { id: 1, name: "Introduction to Psychology" },
    { id: 2, name: "Fundamentals of Computer Science" },
    { id: 3, name: "Modern World History" },
    { id: 4, name: "Environmental Science" },
    { id: 5, name: "Calculus II" },
  ];

    const [form] = Form.useForm();
    const [formSpecial] = Form.useForm();
    const [formSupplementary] = Form.useForm();
    
  const handleCourseChange = (value) => {
    console.log("Selected:", value);
    setSelectedCourses(value);
  };


    const onFinish = (values) => {
      values.student = userInfo.userData._id
      values.course = userInfo.userData.enrolledCourse
      values.checkedStates = checkedStates
      values.uploadedExternalFiles = uploadedExternalFiles
      dispatch(submitExternalExamForm(values))
    };

    const onFinishSpecial = (values)=>{
      values.student = userInfo.userData._id
      values.course = userInfo.userData.enrolledCourse
      values.checkedStates = checkedStates
      values.uploadedExternalFiles = uploadedExternalFiles
      dispatch(submitSpecialExamForm(values))
    }

    const onFinishSupplementary = (values)=>{
      console.log("supplementart");
      values.student = userInfo.userData._id
      values.cours = userInfo.userData.enrolledCourse
      values.checkedStates = checkedStates
      console.log('Received values of form:', values);
      dispatch(submitSupplementaryExamForm(values))
    }

    const handleCountyChange = (value) => {
        setSelectedCounty(value);
        setSubCounties(counties[value] || []);
        form.setFieldsValue({ subCounty: '' });
      };

    const normFile = (e) => {
        if (Array.isArray(e)) {
          return e;
        }
        return e?.fileList;
      };

      const onEvidenceCheckboxChange = (e) => {
        setShowUpload(e.target.checked);
      };

  // Example of how to structure unit entries
  const basicUnits = [
    { title: "Demonstrate communication skills" },
    { title: "Demonstrate numeracy skills" },
    { title: "Demonstrate digital literacy" },
    { title: "Demonstrate entrepreneurial skills" },
    { title: "Demonstrate employability skills" },
    { title: "Demonstrate environmental literacy" },
    { title: "Demonstrate occupational safety and health practices" }
  ];

  const commonUnits = [
    { title: "Apply nutrition in community health" },
    { title: "Apply epidemiology in community health works" },
    { title: "Apply Human anatomy and physiology" },
    { title: "Apply basic microbiology and parasitology" }
  ];

  const coreUnits = [
    { title: "Provide community health care" },
    { title: "Conduct community-based health care" },
    { title: "Maintain community health information systems" },
    { title: "Conduct community health linkages" },
    { title: "Conduct community health service strategies" },
    { title: "Monitor gender, orphans and vulnerable groups" }
  ];

  
  // Render units with checkboxes and radio buttons
  const renderUnits = (units) => (
    units.map((unit,index) => (
      
        <Col md={6}>
          <Checkbox
  checked={checkedStates[unit.title]}
  onChange={() => handleCheckboxChange(unit.title)}
  key={unit.title}
>
  {unit.title}
</Checkbox>
        </Col>
        
      
    ))
  );
  
  const showModal = (incident) => {
    setSelectedIncident(incident);
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const props = {
    action: 'http://localhost:5000/api/upload',
    listType: 'text',
    beforeUpload: (file) => {
      const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
      const isPdf = file.type === 'application/pdf';
      if (!isJpgOrPng && !isPdf) {
        toast.error('You can only upload JPG/PNG image files or PDF files!')

      }
      return isJpgOrPng || isPdf ? true : Upload.LIST_IGNORE;
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

  const propsEvidence = {
    action: 'http://localhost:5000/api/upload',
    listType: 'text',
    beforeUpload: (file) => {
      const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
      const isPdf = file.type === 'application/pdf';
      if (!isJpgOrPng && !isPdf) {
        toast.error('You can only upload JPG/PNG image files or PDF files!')

      }
      return isJpgOrPng || isPdf ? true : Upload.LIST_IGNORE;
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
      <TabPane tab="External Application" key="1">
      {loadingExternal ? <Loader/> : successExternal ? (
        <Result
        status="success"
        title="Successfully submitted"
      />
      ) :
        <Card title="EXTERNAL EXAM APPLICATION FORM">
        <div>

        <Table>
          <tr>
            <th>Name:</th>
            <td>{storedUser.userData.firstName} {storedUser.userData.lastName}</td>
            <th>Course:</th>
            <td>Artisan In Community Health</td>
          </tr>


        </Table>

        <hr style={{borderBottom:"solid green 10px"}} />

              <Form form={form} layout="vertical" onFinish={onFinish}>
                <Row className='w-100'>
                  <Col md={6}>
                    <Form.Item
                      name="candidateName"
                      label="Name of Candidate (As Per KCSE)"
                      rules={[{ required: true, message: 'Please input your name!' }]}
                    >
                      <Input placeholder="Full Name" prefix={<UserOutlined />} />
                    </Form.Item>
                  </Col>
                  <Col md={6}>
                    <Form.Item
                      name="admNo"
                      label="Adm. No"
                      rules={[{ required: true, message: 'Please input your Admission Number!' }]}
                    >
                      <Input placeholder="Admission Number" />
                    </Form.Item>
                  </Col>
                  <Col md={6}>
                    <Form.Item
                      name="mobileNo"
                      label="Mobile No"
                      rules={[{ required: true, message: 'Please input your mobile number!' }]}
                    >
                      <Input placeholder="Mobile Number" prefix={<PhoneOutlined />} />
                    </Form.Item>
                  </Col>
                  <Col md={6}>
                    <Form.Item
                      name="module"
                      label="Module"
                      rules={[{ required: true, message: 'Please select your module!' }]}
                    >
                      <Select placeholder="Select Module">
                        <Select.Option value="I">I</Select.Option>
                        <Select.Option value="II">II</Select.Option>
                        <Select.Option value="III">III</Select.Option>
                      </Select>
                    </Form.Item>
                  </Col>
                  <Col md={6}>
                    <Form.Item
                      name="dateOfBirth"
                      label="Date of Birth"
                      rules={[{ required: true, message: 'Please input your date of birth!' }]}
                    >
                      <DatePicker style={{ width: '100%' }} />
                    </Form.Item>
                  </Col>
                  <Col md={6}>
                    <Form.Item
                      name="birthCertNo"
                      label="Birth Cert No"
                      rules={[{ required: true, message: 'Please input your birth certificate number!' }]}
                    >
                      <Input />
                    </Form.Item>
                  </Col>
                  <Col md={6}>
                    <Form.Item
                      name="county"
                      label="County"
                      rules={[{ required: true, message: 'Please select your county!' }]}
                    >
                      <Select onChange={handleCountyChange} placeholder="Select a county">
                        {Object.keys(counties).map((county) => (
                          <Select.Option key={county} value={county}>{county}</Select.Option>
                        ))}
                      </Select>
                    </Form.Item>
                  </Col>
                  <Col md={6}>
                    <Form.Item
                      name="subCounty"
                      label="Sub-County"
                      rules={[{ required: true, message: 'Please select your sub-county!' }]}
                    >
                      <Select placeholder="Select a sub-county" disabled={!selectedCounty}>
                        {subCounties.map((subCounty) => (
                          <Select.Option key={subCounty} value={subCounty}>{subCounty}</Select.Option>
                        ))}
                      </Select>
                    </Form.Item>
                  </Col>

              <hr style={{borderBottom:"solid green 10px"}} />

                  <Col md={6}>
                    <Form.Item
                      name="nationalId"
                      label="Copy of National ID"
                      valuePropName="fileList"
                      getValueFromEvent={normFile}
                      rules={[{ required: true, message: 'Please upload your National ID!' }]}
                    >
                      <Upload name="nationalId" {...props}   >
                        <Button icon={<InboxOutlined />}>Click to upload</Button>
                      </Upload>
                    </Form.Item>
                  </Col>
                  <Col md={6}>
                    <Form.Item
                      name="birthCertificate"
                      label="Copy of Birth Certificate"
                      valuePropName="fileList"
                      getValueFromEvent={normFile}
                      rules={[{ required: true, message: 'Please upload your Birth Certificate!' }]}
                    >
                      <Upload name="birthCertificate" {...props} >
                        <Button icon={<InboxOutlined />}>Click to upload</Button>
                      </Upload>
                    </Form.Item>
                    </Col>
                    <Col md={6}>
                    <Form.Item
                      name="resultSlip"
                      label="Copy of Previous or Recent Result Slip"
                      valuePropName="fileList"
                      getValueFromEvent={normFile}
                      rules={[{ required: true, message: 'Please upload your result slip!' }]}
                    >
                      <Upload name="resultSlip" {...props} >
                        <Button icon={<InboxOutlined />}>Click to upload</Button>
                      </Upload>
                    </Form.Item>
                    </Col>
                    <Col md={6}>
                    <Form.Item
                      name="referResultSlip"
                      label="Copy of the Result Slip bearing the referred paper"
                      valuePropName="fileList"
                      getValueFromEvent={normFile}
                      rules={[{ required: true, message: 'Please upload your referred paper result slip!' }]}
                    >
                      <Upload name="referResultSlip" {...props} >
                        <Button icon={<InboxOutlined />}>Click to upload</Button>
                      </Upload>
                    </Form.Item>
                    </Col>

                    <Col md={12}>
                    <Form.Item name="examReady" valuePropName="checked">
                      <Checkbox>Are you ready to sit for exam?</Checkbox>
                    </Form.Item>
                  </Col>

                  <hr style={{borderBottom:"solid green 10px"}} />

                  <h3>Basic Units of Learning</h3>
                  <small className='text-danger'>*Tick the Units and If P.O.E is Available</small>
                <Row>
                {renderUnits(basicUnits)}
                </Row>
                <h3>Common Units of Learning</h3>
                <small className='text-danger'>*Tick the Units and If P.O.E is Available</small>

                {renderUnits(commonUnits)}

                <h3>Core Units of Learning</h3>
                {renderUnits(coreUnits)}


                </Row>

                {/* Units of Learning sections here... */}
                {/* Remember to handle checkbox groups or individual checkboxes for unit selections */}

                <Form.Item>
                  <Button type="primary" htmlType="submit" className='w-100'>
                    Submit
                  </Button>
                </Form.Item>
              </Form>
            </div>
        </Card>
        }
      </TabPane>

      <TabPane tab="Special Exams Application" key="2">
      {loadingSpecial ? <Loader/> : successSpecial ? (
    <Result
        status="success"
        title="Successfully Submitted Special Exam Application"
    />
) : ( 
<Card title="SPECIAL EXAM APPLICATION FORM">
<div>

<Table>
  <tr>
    <th>Name:</th>
    <td>{storedUser.userData.firstName} {storedUser.userData.lastName}</td>
    <th>Course:</th>
    <td>Artisan In Community Health</td>

    <th>Admin No:</th>
    <td>{storedUser.userData.studentID}</td>

  </tr>


</Table>

<hr style={{borderBottom:"solid green 10px"}} />

      <Form form={formSpecial} layout="vertical" onFinish={onFinishSpecial}>
        <Row className='w-100'>
          <Col md={12}>
            <Form.Item
              name="reason"
              label="Indicate the reasons for taking the special exam"
              rules={[{ required: true, message: 'Please input your name!' }]}
            >
             <ReactQuill />
            </Form.Item>
          </Col>

      <Col md={12}>
            <Form.Item name="evidence" valuePropName="checked">
              <Checkbox onChange={onEvidenceCheckboxChange}>Attach Evidence</Checkbox>
            </Form.Item>
          </Col>

          {showUpload && (
            <Col md={12}>
              <Form.Item
                name="evidence"
                label="Attach the evidence for your reason"
                rules={[{ required: true, message: 'Please input the reasons!' }]}
              >
                <Upload name="evidence" {...propsEvidence}>
                  <Button icon={<InboxOutlined />}>Click to upload</Button>
                </Upload>
              </Form.Item>
            </Col>
          )}
      
      <hr style={{borderBottom:"solid green 10px"}} />

      <Col md={12}>
          <Form.Item
            name="courses"
            label="Select Course Units you are applying for"
            rules={[{ required: true, message: 'Please select your courses!' }]}
          >
            <Select
              mode="multiple"
              style={{ width: '100%' }}
              placeholder="Select courses"
              onChange={handleCourseChange}
              value={selectedCourses}
            >
              {courses.map(course => (
                <Select.Option key={course.id} value={course.name}>{course.name}</Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Col>

        

        </Row>

        {/* Units of Learning sections here... */}
        {/* Remember to handle checkbox groups or individual checkboxes for unit selections */}

        <Form.Item>
          <Button type="primary" htmlType="submit" className='w-100'>
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
</Card> )}

      </TabPane>

      <TabPane tab="Supplementary Application" key="3">
      {loadingSupplementary ? <Loader/> : successSupplementary ? (
    <Result
        status="success"
        title="Successfully Submitted Supplementary Exam Application"
    />
) : (
<Card title="SUPPLEMENTARY EXAM APPLICATION">
<div>

<Table>
  <tr>
    <th>Name:</th>
    <td>{storedUser.userData.firstName} {storedUser.userData.lastName}</td>
    <th>Course:</th>
    <td>Artisan In Community Health</td>

    <th>Admin No:</th>
    <td>{storedUser.userData.studentID}</td>

  </tr>


</Table>

<hr style={{borderBottom:"solid green 10px"}} />

      <Form form={formSupplementary} layout="vertical" onFinish={onFinishSupplementary}>
        <Row className='w-100'>
 
       <Col md={12}>
          <Form.Item
            name="courses"
            label="Select Course Units you are applying for"
            rules={[{ required: true, message: 'Please select your courses!' }]}
          >
            <Select
              mode="multiple"
              style={{ width: '100%' }}
              placeholder="Select courses"
              onChange={handleCourseChange}
              value={selectedCourses}
            >
              {courses.map(course => (
                <Select.Option key={course.id} value={course.name}>{course.name}</Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Col>

        

        </Row>


        <Form.Item>
          <Button type="primary" htmlType="submit" className='w-100'>
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
</Card>
)}

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

export default StudentExamScreen;
