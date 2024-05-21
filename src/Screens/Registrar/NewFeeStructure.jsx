import {  Card, Modal, Form, Input, Button,Tabs, Select, Result } from 'antd';
import { useEffect, useState } from 'react';
import 'react-calendar/dist/Calendar.css';
import Topbar from './components/Topbar';
import moment from 'moment';
import { Col, Row, } from 'react-bootstrap';
import { createStyles, useTheme } from 'antd-style';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import Sidebar2 from './components/Sidebar2';
import Loader from '../../Components/Loader';
import ReactQuill from 'react-quill';
import { listEmployees } from '../../actions/userActions';
import logo from '../../assets/logo.png';
import { MdOutlineDeleteOutline } from "react-icons/md";
import { createFeeStructure } from '../../actions/feeActions';
import { listCourses } from '../../actions/courseActions';

const { Option } = Select;


const useStyle = createStyles(({ token }) => ({
  'my-modal-mask': {
    boxShadow: `inset 0 0 15px #fff`,
  },
}));

const NewFeeStructure = () => {
  const [value, setValue] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [myLeads, setMyLeads] = useState([]);
  const [overheads, setOverheads] = useState([]); // State to store overheads
  const { styles } = useStyle();
  const token = useTheme();
  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo, success } = userLogin;

  const courseList = useSelector((state) => state.courseList);
  const { loading: courseListLoading, error: courseListError, courses, success: courseListSuccess } = courseList;

  const createFeeStructure2 = useSelector((state)=>state.createFeeStructure)
  const {loading: createFeeStructureLoading, error: createFeeStructureError, success: createFeeStructureSuccess} = createFeeStructure2
  
  const storedUser = JSON.parse(localStorage.getItem('userInfo'));
  const { Option } = Select;
  
  const months = [
    { value: '01', label: 'January' },
    { value: '02', label: 'February' },
    { value: '03', label: 'March' },
    { value: '04', label: 'April' },
    { value: '05', label: 'May' },
    { value: '06', label: 'June' },
    { value: '07', label: 'July' },
    { value: '08', label: 'August' },
    { value: '09', label: 'September' },
    { value: '10', label: 'October' },
    { value: '11', label: 'November' },
    { value: '12', label: 'December' },
  ];

 

  const dispatch = useDispatch();

  const handleOverheadNameChange = (e, index) => {
    console.log("e is ",e);
    const updatedOverheads = [...overheads];
    updatedOverheads[index].name = e;
    setOverheads(updatedOverheads);
  };
  

  
  const handleOverheadPriorityChange = (e, index) => {
    const updatedOverheads = [...overheads];
    updatedOverheads[index].priority = e.target.value;
    setOverheads(updatedOverheads);
  };
  const handleDeleteOverhead = (indexToDelete) => {
    // Create a copy of the overheads array
    const updatedOverheads = [...overheads];
    
    // Remove the overhead at the specified index
    updatedOverheads.splice(indexToDelete, 1);
    
    // Update the state with the modified array
    setOverheads(updatedOverheads);
  };
  
  
  const handleAddOverhead = () => {
    // Add a new overhead object to the overheads state
    setOverheads([...overheads, { name: '',  priority: '' }]);
  };

  const handleShowModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
    // Logic to handle saving the overheads to the database or wherever needed
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const onFinish = (values) => {
    values.overheads = overheads;
  
    // Check for duplicate priorities
    const priorities = new Set();
    let hasDuplicatePriorities = false;
    for (const overhead of values.overheads) {
      if (priorities.has(overhead.priority)) {
        hasDuplicatePriorities = true;
        break;
      }
      priorities.add(overhead.priority);
    }
  
    // Check for duplicate overhead names
    const overheadNames = new Set();
    let hasDuplicateNames = false;
    for (const overhead of values.overheads) {
      if (overheadNames.has(overhead.name)) {
        hasDuplicateNames = true;
        break;
      }
      overheadNames.add(overhead.name);
    }
  
    // Check if any overhead has "All" selected as courses and if there are other courses selected along with it
    let hasAllCoursesWithOthers = false;
    for (const overhead of values.overheads) {
      if (overhead.courses.includes("all") && overhead.courses.length > 1) {
        hasAllCoursesWithOthers = true;
        break;
      }
    }
  
    if (hasDuplicatePriorities || hasDuplicateNames || hasAllCoursesWithOthers) {
      let errorMessage = "";
      if (hasDuplicatePriorities) {
        errorMessage += "Duplicate priorities detected. ";
        toast.error("Duplicate priorities detected.");
      }
      if (hasDuplicateNames) {
        errorMessage += "Duplicate overhead names detected. ";
        toast.error("Duplicate overhead names detected.");
      }
      if (hasAllCoursesWithOthers) {
        errorMessage += "Overhead cannot have 'All' courses along with others.";
        toast.error("Overhead cannot have 'All' courses along with others.");
      }
    } else {
      dispatch(createFeeStructure(values));
    }
  };
  
  
  

  const handleMaleChange = (e, index) => {
    const updatedOverheads = [...overheads];
    updatedOverheads[index].male = e.target.value;
    setOverheads(updatedOverheads);
  };
  
  const handleFemaleChange = (e, index) => {
    const updatedOverheads = [...overheads];
    updatedOverheads[index].female = e.target.value;
    setOverheads(updatedOverheads);
  };
  
  const handleCoursesChange = (value, index) => {
    const updatedOverheads = [...overheads];
    updatedOverheads[index].courses = value;
    setOverheads(updatedOverheads);
  };

  const descriptions = [
    { value: 'Registration fee', label: 'Registration fee' },
    { value: 'Admission fee', label: 'Admission fee' },
    { value: 'Student ID', label: 'Student ID' },
    { value: 'Activity fee', label: 'Activity fee' },
    { value: 'Computer fee+ Internet', label: 'Computer fee+ Internet' },
    { value: 'First Aid Certification', label: 'First Aid Certification' },
    { value: 'Medical fee', label: 'Medical fee' },
    { value: 'Academic trips', label: 'Academic trips' },
    { value: 'Examination fee', label: 'Examination fee' },
    { value: 'Clinical Practice Term 3', label: 'Clinical Practice Term 3' },
    { value: 'Clinical Practice Term 4 & 6', label: 'Clinical Practice Term 4 & 6' },
    { value: 'Library fee', label: 'Library fee' },
    { value: 'Transport', label: 'Transport' },
    { value: 'Insurance', label: 'Insurance' },
    { value: 'Student Welfare', label: 'Student Welfare' },
    { value: 'Hepatitis B Vaccine', label: 'Hepatitis B Vaccine' },
    { value: 'Attachment fee', label: 'Attachment fee' },
    { value: 'Mentoring Tool', label: 'Mentoring Tool' },
    { value: 'Graduation Fee', label: 'Graduation Fee' },
    { value: 'KNDI Indexing', label: 'KNDI Indexing' },
    { value: 'Conversion for international students', label: 'Conversion for international students' },
  ];

  // Filter out descriptions that are already selected as overhead names
const filteredDescriptions = descriptions.filter(description => {
  // Check if the description is already selected as an overhead name
  return !overheads.some(overhead => {
  console.log(overhead.name);
    return overhead.name === description.label});
});


useEffect(() => {
  if (createFeeStructureError) {
    toast.error(createFeeStructureError);
  }

}, [createFeeStructureError]);

useEffect(()=>{
  dispatch(listCourses())
  
},[])


  return (
    <div class="container-fluid">
      <div class="row">
        <div class="sidebar border border-right col-md-3 col-lg-2 p-0 bg-body-tertiary bg-primary">
          <div class="offcanvas-md offcanvas-end bg-body-tertiary" tabindex="-1" id="sidebarMenu" aria-labelledby="sidebarMenuLabel" style={{ background: 'blue' }}>
            <div class="offcanvas-body d-md-flex flex-column p-0 pt-lg-3" style={{ paddingTop: '0 !important' }}>
              <Sidebar2 />
            </div>
          </div>
        </div>
        <main class="col-md-9 ms-sm-auto col-lg-10 px-md-4 main-content">
          <Topbar />
          <Row>
            <Col md={12} className='my-2'>
              <Row>
                <Col md={12}>
                  {createFeeStructureLoading ? (
  <Loader />
) : createFeeStructureSuccess ? (
  <Result
    status="success"
    title="Fee Structure Created Successfully"
    subTitle="Order number: 2017182818828182881. Fee structure has been successfully created."
    extra={[
      <Button type="primary" key="console">
        Dashboard
      </Button>,
     
    ]}
  />
):(
<>
  {loadingVoteheadList ? <Loader/> : <>
  <Card>
                  <Button onClick={handleAddOverhead}>Add Vote Head</Button> {/* Button to add overhead */}
          <Button onClick={handleShowModal}>Show Fee Structure</Button> {/* Button to show modal */}

                    <Row>
                    <Form
className="w-100"
  name="normal_login"
  // className="login-form"
  layout="vertical"
  initialValues={{
    year: '2024', // Example initial value for year input
    month: 'May', // Example initial value for month input
    overheads: overheads.map((overhead, index) => ({
      [`overheadName${index}`]: overhead.name,
      [`male${index}`]: overhead.male,
      [`female${index}`]: overhead.female,
      [`priority${index}`]: overhead.priority,
      [`courses${index}`]: overhead.courses,
    })),
  }}
  onFinish={onFinish}
  labelCol={{
    span: 32,
  }}
  wrapperCol={{
    span: 32,
  }}
>  
<Row>
                      <Col md={3} className='my-2'>
                        <Form.Item name="year" label="Year Intake" rules={[{ required: true, message: 'Please enter the year' }]}>
                          <Input />
                        </Form.Item>
                      </Col>
                     <Col md={3} className='my-2'>
  <Form.Item
    name="month"
    label="Month Intake"
    rules={[{ required: true, message: 'Please select the month' }]}
  >
    <Select placeholder="Select a month">
      {months.map(month => (
        <Option key={month.value} value={month.label}>
          {month.label}
        </Option>
      ))}
    </Select>
  </Form.Item>
</Col>

<Col md={3} className='my-2'>
                        <Form.Item name="budget_estimate" label="Budget Estimate" rules={[{ required: true, message: 'Please enter the year' }]}>
                          <Input />
                        </Form.Item>
                      </Col>

                      <Col md={3} className='my-2'>
  <Form.Item
    name="student_type"
    label="Student Type"
    rules={[{ required: true, message: 'Please select the month' }]}
  >
    <Select placeholder="Select a month">
        <Option key={`Regular`} value={`Regular`}>
          {`Regular`}
        </Option>
        <Option key={`Distance Learner`} value={`Distance Learner`}>
          {`Distance Learner`}
        </Option>
    </Select>
  </Form.Item>
</Col>
            

                      <Col md={12}>
                      {overheads.map((overhead, index) => (
                        <Row key={index}>
                          <Col md={2}>
                          <Form.Item label={`Votehead ${index + 1}`} name={`Overhead Name ${index + 1}`} rules={[{ required: true, message: 'Please enter Overhead Name' }]}>
                          <Select 
                            placeholder="Select description"
                            onChange={(value) => handleOverheadNameChange(value, index)}
                            value={overhead.name} // Set the value of the select to the name property of the overhead object
                          >
                            {filteredDescriptions.map(item => (
                              <Option key={item.value} value={item.label}>
                                {item.label}
                              </Option>
                            ))}
                          </Select>
                        </Form.Item>


                          </Col>
                                                  <Col md={2}>
                          <Form.Item label={`Male`} name={`Male ${index + 1}`} rules={[{ required: true, message: 'Please enter the male charges' }]}>
                            <Input value={overhead.male} onChange={(e) => handleMaleChange(e, index)} />
                          </Form.Item>
                        </Col>
                        <Col md={2}>
                          <Form.Item label={`Female`} name={`Female ${index + 1}`} rules={[{ required: true, message: 'Please enter the female charges' }]}>
                            <Input value={overhead.male} checked={overhead.female} onChange={(e) => handleFemaleChange(e, index)} />
                          </Form.Item>
                        </Col>
                        <Col md={2}>
                          <Form.Item label={`Courses`} name={`Courses ${index + 1}`} rules={[{ required: true, message: 'Please enter the courses' }]}>
                            <Select
                              mode="multiple"
                              placeholder="Select courses"
                              value={overhead.courses}
                              onChange={(value) => handleCoursesChange(value, index)}
                            >
                              <Option value="all">
                                All
                              </Option>
                            
                              {courses && courses.map(item => (
                              <Option key={item._id} value={item._id}>
                                {item.name}
                              </Option>
                            ))}
                            </Select>
                          </Form.Item>
                        </Col>

                          <Col md={3}>
                            <Form.Item label={`Priority`} name={`Priority ${index + 1}`} rules={[{ required: true, message: 'Please enter the priority' }]}>
                              <Input type="number" value={overhead.priority} onChange={(e) => handleOverheadPriorityChange(e, index)} />
                            </Form.Item>
                          </Col>
                          <Col md={1} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <Button type="primary" danger onClick={() => handleDeleteOverhead(index)}><MdOutlineDeleteOutline /></Button>
                          </Col>
                        </Row>
                      ))}

                      </Col>
                      <Button type='primary' className='my-2'  htmlType="submit" >
Submit
</Button>
</Row>
                      </Form>
                    </Row>
                  </Card>
                  </>}
                  </>
)
                
}
                </Col>
              </Row>
            </Col>
          </Row>
          <Modal
           
            visible={isModalVisible}
            onOk={handleOk}
            onCancel={handleCancel}
            footer={[
         
            ]}
          >
            <div className="text-center">
            <img src={logo} alt="" className='w-25' />
            <h6>JFC MUNENE COLLEGE</h6>
            </div>
           
            <table className="table">
  <thead>
    <tr>
      <th>Description</th>
      <th>Male</th>
      <th>Female</th>
      {/* <th>Courses</th> */}
    </tr>
  </thead>
  <tbody>
    {overheads
      .sort((a, b) => a.priority - b.priority) // Sort overheads by priority
      .map((overhead, index) => (
        <tr key={index}>
          <td>{overhead.name}</td>
          <td>{overhead.male}</td> 
          <td>{overhead.female}</td> 
          {/* <td>{overhead?.courses?.length}</td>  */}
        </tr>
      ))}
  </tbody>
</table>
    
  <Row>
    <Col md={6}>
    JFC MUNENE COLLEGE OF HEALTH SCIENCES <br/>
    CO- OPERATIVE BANK <br/>
    ACCOUNT NO. 01192833397700 <br/>
    THIKA-MAKONGENI BRANCH <br/>
    SWIFTCODE- KCOOKENA
    <br/><br/>
    JFC MUNENE COLLEGE OF HEALTH SCIENCES <br/>
    BANK OF BARODA <br/>
    Account No. 95840200000645 <br/>
    Branch: THIKA
    </Col>
    <Col md={6}>
    LIPA NA MPESA <br/>
Paybill No. 400222<br/>
Account No. 536271#name 
<br/><br/>

LIPA NA MPESA
Paybill No. 902363
Account No. 95840200000645
    </Col>
  </Row>
          </Modal>
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

export default NewFeeStructure;
