import { Card, DatePicker, Dropdown, List, Menu, Modal,Button, Tabs, Select, Badge, Form, Image, Checkbox, Radio } from 'antd';
import { useEffect, useState } from 'react';
import 'react-calendar/dist/Calendar.css';
import { FaEye, FaEdit, FaTrash } from 'react-icons/fa'; // Import relevant icons
import moment from 'moment';

import Topbar from './components/Topbar';

import { Accordion, Col, Row, Table } from 'react-bootstrap';
import { Input } from 'antd';
import { Link } from 'react-router-dom';
import Sidebar2 from './components/Sidebar2';
import { getAllRequisitions } from '../../actions/requisitionActions';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../../Components/Loader';
import { getAllReimbursements } from '../../actions/reimbursmentActions';
import { getAllPettyCash } from '../../actions/pettycashActions';
import ReactQuill from 'react-quill';
import SidebarX from './components/Sidebar';
import { createVotehead, listVoteheads } from '../../actions/voteheadActions';
const { TabPane } = Tabs;

const { Option } = Select;

const VoteheadScreen = () => {

  const userLogin = useSelector((state) => state.userLogin)
  const { loading, error, userInfo,success } = userLogin

  const voteheadList = useSelector((state) => state.voteheadList)
  const { voteheads } = voteheadList

  
  const dispatch = useDispatch() 

  const [modalVisible, setModalVisible] = useState(false);

  const handleNewVotehead = () => {
    setModalVisible(true);
  };

  const handleCancel = () => {
    setModalVisible(false);
  };

  const onFinish = (values) => {
    console.log('Success:', values);
    setModalVisible(false);
    values.createdBy = userInfo._id
    dispatch(createVotehead(values))
  };

  useEffect(()=>{
    dispatch(listVoteheads())
  },[])
  
  return (
    <div class="container-fluid">
    <div class="row">
      <div class="sidebar border border-right col-md-3 col-lg-2 p-0 bg-body-tertiary bg-primary">
        <div class="offcanvas-md offcanvas-end bg-body-tertiary" tabindex="-1" id="sidebarMenu" aria-labelledby="sidebarMenuLabel">
          
          <div class="offcanvas-body d-md-flex flex-column p-0 pt-lg-3 overflow-y-auto">
            <SidebarX/>
  
       
          </div>
        </div>
      </div>
  
      <main class="col-md-9 ms-sm-auto col-lg-10 px-md-4 main-content">
        <Topbar/>
<Card>
<Row>
  <Col md={8}>
    <h4>Fee Income Voteheads/Accounts</h4>
    <small>N/B Voteheads are Income Accounts related to schools fees like Tuition, Swimming, Boarding etc. If your school has a mixture of boarding and day students, specify voteheads for each category</small>
  </Col>
  <Col md={4}>
                <Button type="primary" onClick={handleNewVotehead}>New Votehead</Button>
              </Col>
</Row>
</Card>

<Card>
      <Form layout="vertical" onFinish={onFinish}>
        <Row>
          <Col md={2}>
            <Form.Item
            
            label="Select Category" name="category">
              <Select defaultValue="A">
                <Option value="A">All Students</Option>
                <Option value="B">All Boarders</Option>
                <Option value="D">All Day Scholars</Option>
              </Select>
            </Form.Item>
          </Col>
          <Col md={2}>
            <Form.Item label="Active Status" name="activeStatus">
              <Select defaultValue="1" title="Select active status">
                <Option value="1">Active Voteheads</Option>
                <Option value="0">Inactive Voteheads</Option>
              </Select>
            </Form.Item>
          </Col>
          <Col md={2}>
            <Form.Item label="Order By" name="orderBy">
              <Select defaultValue="I" className="w-100">
                <Option value="I">Latest Added</Option>
                <Option value="N">Name</Option>
                <Option value="P">Priority & Name</Option>
              </Select>
            </Form.Item>
          </Col>
          <Col md={2}>
            <Form.Item label="Billing Cycle" name="billingCycle">
              <Select className="w-100" defaultValue="">
                <Option value="">Select..</Option>
                <Option value="TERMLY">TERMLY</Option>
                <Option value="MONTHLY">MONTHLY</Option>
                <Option value="ANNUALLY">ANNUALLY</Option>
                <Option value="WEEKLY">WEEKLY</Option>
                <Option value="DAILY">DAILY</Option>
                <Option value="OPEN">OPEN</Option>
              </Select>
            </Form.Item>
          </Col>
          <Col md={2}>
            <Form.Item label="Search by name" name="search">
              <Input placeholder="Search by name" className="w-100" />
            </Form.Item>
          </Col>
          <Col md={2}>
            <Form.Item>
              <Button type="primary" htmlType="submit" className="w-100">
                Search
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
      <Accordion defaultActiveKey="0">
      <Accordion.Item eventKey="0">
        <Accordion.Header>Current Voteheads</Accordion.Header>
        <Accordion.Body>
      <Table striped bordered hover>
      <thead>
        <tr>
          <th>Votehead Name</th>
          <th>Mandatory</th>
          <th>Priority</th>
          <th>Billing Cycle</th>
          <th>Active</th>
          <th>Email Creator</th>
          <th>Added</th>
         
        </tr>
      </thead>
      <tbody>
  {voteheads && voteheads.map((votehead, index) => (
    <tr key={index}>
      <td>{votehead.voteheadName}</td>
      <td>{votehead.mandatory ? 'Yes' : 'No'}</td>
      <td>{votehead.priority}</td>
      <td>{votehead.billingCycle}</td>
      <td>{votehead.active ? 'Active' : 'Inactive'}</td>
      <td>{votehead.createdBy?.email}</td>
      <td>{moment(votehead.added).format('DD/MM/YYYY')}</td>
   
    </tr>
  ))}
</tbody>

    </Table>
    </Accordion.Body>
      </Accordion.Item>
   
    </Accordion>
    </Card>
<Modal
            title="New Votehead"
            visible={modalVisible}
            onCancel={handleCancel}
            footer={null}
            width={1000}
          >
            <Form layout="vertical" onFinish={onFinish}>
              <Row>
                <Col md={3}>
                <Form.Item
                
                label="This voteheads applies to?" name="appliesTo" rules={[{ required: true, message: 'Please select applies to' }]}>
                <Select>
                  <Option value="allStudents">All Students</Option>
                  <Option value="allBorders">All Borders</Option>
                  <Option value="allDayScholars">All Day Scholars</Option>
                </Select>
              </Form.Item>
                </Col>
                <Col md={3}>
                <Form.Item label="Is Active" name="isActive" rules={[{ required: true, message: 'Please select applies to' }]}>
                <Select>
                  <Option value="yes">Yes</Option>
                  <Option value="no">No</Option>
                </Select>
              </Form.Item>
                </Col>
                <Col md={3}>
                <Form.Item label="Billing Cycle" name="billingCycle" rules={[{ required: true, message: 'Please select applies to' }]}>
                <Select>
                  <Option value="termly">TERMLY</Option>
                  <Option value="monthly">MONTHLY</Option>
                  <Option value="annually">ANNUALLY</Option>
                  <Option value="weekly">WEEKLY</Option>
                  <Option value="daily">DAILY</Option>
                  <Option value="open">OPEN</Option>

                </Select>
              </Form.Item>
                </Col>
                <Col md={3}>
                <Form.Item label="Academic Patner(Optional)" name="academicPatner" rules={[{ required: false, message: 'Please select applies to' }]}>
                <Select>
                  <Option value="cdacc">TVET-CDACC</Option>
                  <Option value="knec">KNEC</Option>
                  <Option value="nita">NITA</Option>
                  <Option value="icm">ICM</Option>

                </Select>
              </Form.Item>
                </Col>

                <Col md={4}>
                <Form.Item label="Votehead Name" name="voteheadName" rules={[{ required: true, message: 'Please select applies to' }]}>
                  <Input/>
              </Form.Item>
                </Col>

                <Col md={4}>
                <Form.Item label="Votehead Type" name="voteheadType" rules={[{ required: true, message: 'Please select applies to' }]}>
                <Select>
                  <Option value="mandatory">Mandatory</Option>
                  <Option value="optional">Optional</Option>
                </Select>
              </Form.Item>
                </Col>

                <Col md={4}>
                <Form.Item label="Priority" name="priority" rules={[{ required: true, message: 'Please select applies to' }]}>
                <Select>
                  <Option value="1">1</Option>
                  <Option value="2">2</Option>
                  <Option value="3">3</Option>
                  <Option value="4">4</Option>
                  <Option value="5">5</Option>
                  <Option value="6">6</Option>
                  <Option value="7">7</Option>
                  <Option value="8">8</Option>
                  <Option value="9">9</Option>
                  <Option value="10">10</Option>
                  <Option value="last">last</Option>

                </Select>
              </Form.Item>
                </Col>

                <Col md={3}>
                <Checkbox
  name="allowIncomeAccount"
  defaultChecked // This is equivalent to checked="checked" in HTML
>
  Allow Income Account
</Checkbox>
                </Col>

                <Col md={3}>
                <Checkbox
  name="allowExpenseAccount"
  defaultChecked // This is equivalent to checked="checked" in HTML
>
  Allow Income Account
</Checkbox>
                </Col>

                <Col md={3}>
                <Form.Item label="Income Account (Optional)" name="incomeAccount" rules={[{ required: false }]}>
  <Select placeholder="Select Income Acc">
    <Option value="">Select Income Acc</Option>
    <Option value="4-0-1">TUTION</Option>
    <Option value="4-0-2">SWIMMING</Option>
    <Option value="4-0-3">ADMISSION FEE</Option>
    <Option value="4-0-4">STUDENT ID</Option>
    <Option value="4-0-5">ACTIVITY FEE</Option>
    <Option value="4-0-6">COMPUTER + INTERNET FEE</Option>
    <Option value="4-0-7">MEDICAL FEE</Option>
    <Option value="4-0-8">ACADEMIC TRIPS</Option>
    <Option value="4-0-9">EXAMINATION FEE</Option>
    <Option value="4-0-10">CLINICAL PRACTICE</Option>
    <Option value="4-0-11">LIBRARY FEE</Option>
    <Option value="4-0-12">TRANSPORT</Option>
    <Option value="4-0-13">INSURANCE</Option>
    <Option value="4-0-14">STUDENT WELFARE</Option>
    <Option value="4-0-15">HEPATITIS B VACCINE</Option>
    <Option value="4-0-16">ATTACHMENT FEE</Option>
    <Option value="4-0-17">MENTORING TOOL</Option>
    <Option value="4-0-18">GRADUATION FEE</Option>
    <Option value="4-0-19">HOSTEL</Option>
    <Option value="4-0-20">HOSTEL TEST 1</Option>
    <Option value="4-0-21">HOSTEL TEST 2</Option>
    <Option value="4-0-22">TUTION FEE</Option>
    <Option value="4-0-23">HOSPITAL SCRUBS</Option>
    <Option value="4-0-24">KNEC EXAMS</Option>
    <Option value="4-0-25">ARREARS</Option>
    <Option value="4-0-26">GRADUATION GOWN</Option>
    <Option value="4-0-27">ALUMNI FEE</Option>
    <Option value="4-0-28">REGISTRATION FEE</Option>
    <Option value="4-0-29">TVET/CDACC</Option>
    <Option value="4-0-30">UNIFORM</Option>
    <Option value="4-0-31">RETAKE</Option>
    <Option value="4-0-32">HTS</Option>
    <Option value="4-0-33">GOWN HIRING FEE</Option>
    <Option value="4-0-34">PRACTICAL FEE</Option>
    <Option value="4-0-35">CBET EXAMS</Option>
    <Option value="4-0-36">SUPPLEMENTARY EXAMS</Option>
    <Option value="4-0-37">KNEC EXAM ADJ.</Option>
    <Option value="4-0-38">SPECIAL EXAM</Option>
    <Option value="4-0-39">RD CHEQUE PENALTY</Option>
    <Option value="4-0-40">FIRST AID</Option>
    <Option value="4-0-41">REGISTRATION</Option>
    <Option value="4-0-42">SUPP-MED TERMINOLOGIES</Option>
    <Option value="4-0-43">CBET MODULE 2</Option>
    <Option value="4-0-44">CBET MODULE 3</Option>
    <Option value="4-0-45">LOST STUDENT ID</Option>
  </Select>
</Form.Item>

                </Col>

                <Col md={3}>
                <Form.Item label="Expense Account (Optional)" name="ddlExpenseAcc" rules={[{ required: false, message: 'Please select an expense account' }]}>
  <Select>
    <Option value="">Select Expense Acc</Option>
    <Option value="3-0-1">Tuition Expense</Option>
    <Option value="3-0-2">Swimming Expense</Option>
    <Option value="3-0-3">Admission Fee Expense</Option>
    <Option value="3-0-4">Student ID Expense</Option>
    <Option value="3-0-5">Activity Fee Expense</Option>
    <Option value="3-0-6">Computer + Internet Fee Expense</Option>
    <Option value="3-0-7">Medical Fee Expense</Option>
    <Option value="3-0-8">Academic Trips Expense</Option>
    <Option value="3-0-9">Examination Fee Expense</Option>
    <Option value="3-0-10">Clinical Practice Expense</Option>
    <Option value="3-0-11">Library Fee Expense</Option>
    <Option value="3-0-12">Transport Expense</Option>
    <Option value="3-0-13">Insurance Expense</Option>
    <Option value="3-0-14">Student Welfare Expense</Option>
    <Option value="3-0-15">Hepatitis B Vaccine Expense</Option>
    <Option value="3-0-16">Attachment Fee Expense</Option>
    <Option value="3-0-17">Mentoring Tool Expense</Option>
    <Option value="3-0-18">Graduation Fee Expense</Option>
    <Option value="3-0-19">Hostel Expense</Option>
    <Option value="3-0-20">Hostel Test 1 Expense</Option>
    <Option value="3-0-21">Hostel Test 2 Expense</Option>
    <Option value="3-0-22">Tuition Fee Expense</Option>
    <Option value="3-0-23">Hospital Scrubs Expense</Option>
    {/* Add more options as needed */}
  </Select>
</Form.Item>
                </Col>
                <Col md={3}>
                <Form.Item label="Votehead For (Optional)" name="ddlCategory" rules={[{ required: false, message: 'Please select a category' }]}>
  <Select>
    <Option value="">Select Category</Option>
    <Option value="Activity">Student Activities</Option>
    <Option value="Transport">Transport</Option>
    <Option value="Meals">Meals</Option>
    <Option value="Uniform">Uniform</Option>
    <Option value="Admission">Admission</Option>
  </Select>
</Form.Item>

                </Col>
                <Col md={4}>
                <Form.Item label="Is Taxable?" name="isTaxable" rules={[{ required: true, message: 'Please select taxable status' }]}>
  <Radio.Group>
    <Radio value="yes">Yes</Radio>
    <Radio value="no">No</Radio>
  </Radio.Group>
</Form.Item>

                </Col>

                <Col md={6}>
                <Form.Item name="mandatoryForNewStudents" valuePropName="checked">
      <Checkbox>Mandatory for new students (Optional for existing)</Checkbox>
    </Form.Item>
                </Col>
                <Col md={6}>
                <Form.Item name="availableAtAdmission" valuePropName="checked">
      <Checkbox>Available at student admission application?</Checkbox>
    </Form.Item>
                </Col>
              </Row>
         
              {/* Add other form items as per your requirements */}
              <Form.Item>
                <Button type="primary" htmlType="submit">Submit</Button>
              </Form.Item>
            </Form>
          </Modal>

      </main>
    </div>
  </div>
 
  );
};

export default VoteheadScreen;
