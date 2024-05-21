import { Card, DatePicker, Dropdown, List, Menu, Modal,Button, Tabs, Select, Badge, Form, Image, Checkbox, Radio, Result } from 'antd';
import { useEffect, useState } from 'react';
import 'react-calendar/dist/Calendar.css';
import { FaEye, FaEdit, FaTrash } from 'react-icons/fa'; // Import relevant icons
import moment from 'moment';

import Topbar from './components/Topbar';

import { Accordion, Col, Row, Table } from 'react-bootstrap';
import { Input } from 'antd';
import Sidebar2 from './components/Sidebar2';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../../Components/Loader';

import { listVoteheads } from '../../actions/voteheadActions';
import { createFeeStructure, listFeeStructures } from '../../actions/feeActions';
const { TabPane } = Tabs;


const { Option } = Select;




const FeeStructureScreenRegistrar = () => {
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
    dispatch(createFeeStructure(values))
    // setModalVisible(false);
  };

  const voteheadList = useSelector((state) => state.voteheadList)
  const { voteheads } = voteheadList


  const getAllFeeStructures = useSelector((state)=> state.getAllFeeStructures)
  const {feeStructures,loading,error} = getAllFeeStructures


  useEffect(()=>{
    dispatch(listVoteheads())
    dispatch(listFeeStructures())
  },[])
  
  return (
    <div class="container-fluid">
    <div class="row">
      <div class="sidebar border border-right col-md-3 col-lg-2 p-0 bg-body-tertiary bg-primary">
        <div class="offcanvas-md offcanvas-end bg-body-tertiary" tabindex="-1" id="sidebarMenu" aria-labelledby="sidebarMenuLabel">
          
          <div class="offcanvas-body d-md-flex flex-column p-0 pt-lg-3 overflow-y-auto">
          <Sidebar2/>
  
       
          </div>
        </div>
      </div>
  
      <main class="col-md-9 ms-sm-auto col-lg-10 px-md-4 main-content">
        <Topbar/>
        {loading ? <Loader/> : error ? (
 <Result
 status="500"
 title="500"
 subTitle="Sorry, something went wrong."
/>
        ):
        <>

<Card>
<Row>
  <Col md={12}>
    <h4>Fee Structure</h4>
    <small>
    Note: Debit the students after setting up the fee structure or editing it. Fee structure is per class and either all students, borders or day scholars.
System will only debit mandatory voteheads for batch debits. Optional voteheads to be invoiced from optional debit menu.
    </small>
  </Col>

</Row>
</Card>

<Card>
<Form layout="vertical" onFinish={onFinish}>
  <Row>
    <Col md={3}>
      <Form.Item label="Select Year" name="year">
        <Select defaultValue="2021">
          <Option value="2021">2021</Option>
          <Option value="2022">2022</Option>
          <Option value="2023">2023</Option>
          <Option value="2024">2024</Option>
        </Select>
      </Form.Item>
    </Col>
    <Col md={3}>
      <Form.Item label="Course" name="course">
      <Select
  className="selectpicker"
  showSearch
  style={{ width: '100%' }} // Adjust width as needed
  placeholder="Select Class"
  optionFilterProp="children"
  filterOption={(input, option) =>
    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
  }
>
  <Option value="Select Course">Select Course</Option>
  <Option value="CERTIFICATE IN MORTUARY SCIENCE (CMS)">CERTIFICATE IN MORTUARY SCIENCE (CMS)</Option>
  <Option value="ARTISAN IN COMMUNITY HEALTH & DEVELOPMENT (ACHD)">ARTISAN IN COMMUNITY HEALTH & DEVELOPMENT (ACHD)</Option>
  <Option value="ARTISAN IN COUNSELLING PSYCHOLOGY (ACP)">ARTISAN IN COUNSELLING PSYCHOLOGY (ACP)</Option>
  <Option value="ARTISAN IN SOCIAL WORK AND COMMUNITY DEVELOPMENT (ASW)">ARTISAN IN SOCIAL WORK AND COMMUNITY DEVELOPMENT (ASW)</Option>
  <Option value="CRAFT IN SOCIAL WORK AND COMMUNITY DEVELOPMENT (CSW)">CRAFT IN SOCIAL WORK AND COMMUNITY DEVELOPMENT (CSW)</Option>
  <Option value="TRADE IN COMMUNITY HEALTH (TCH)">TRADE IN COMMUNITY HEALTH (TCH)</Option>
  <Option value="CRAFT IN BIOTECHNOLOGY (CBT)">CRAFT IN BIOTECHNOLOGY (CBT)</Option>
  <Option value="CRAFT IN HEALTH SERVICE SUPPORT (CHSS)">CRAFT IN HEALTH SERVICE SUPPORT (CHSS)</Option>
  <Option value="CRAFT IN MEDICAL ENGINEERING (CME)">CRAFT IN MEDICAL ENGINEERING (CME)</Option>
  <Option value="CRAFT IN ORTHOPEDIC TECHNICIAN (COT)">CRAFT IN ORTHOPEDIC TECHNICIAN (COT)</Option>
  <Option value="CRAFT IN PERIOPERATIVE THEATRE TECHNOLOGY (CPTT)">CRAFT IN PERIOPERATIVE THEATRE TECHNOLOGY (CPTT)</Option>
  <Option value="CRAFT IN COMMUNITY HEALTH AND DEVELOPMENT (CCHD)">CRAFT IN COMMUNITY HEALTH AND DEVELOPMENT (CCHD)</Option>
  <Option value="CRAFT IN COMMUNITY HEALTH AND HIV AIDS MANAGEMENT (CCHH)">CRAFT IN COMMUNITY HEALTH AND HIV AIDS MANAGEMENT (CCHH)</Option>
  <Option value="CRAFT IN COUNSELLING PSYCHOLOGY (CCP)">CRAFT IN COUNSELLING PSYCHOLOGY (CCP)</Option>
  <Option value="CRAFT IN EMERGENCY MEDICAL TECHNICIAN (EMT)">CRAFT IN EMERGENCY MEDICAL TECHNICIAN (EMT)</Option>
  <Option value="CRAFT IN HIV AIDS MANAGEMENT (CHM)">CRAFT IN HIV AIDS MANAGEMENT (CHM)</Option>
  <Option value="CRAFT IN SCIENCE LAB TECHNOLOGY (CSL)">CRAFT IN SCIENCE LAB TECHNOLOGY (CSL)</Option>
  <Option value="CRAFT IN INFORMATION COMMUNICATION & TECHNOLOGY (CICT)">CRAFT IN INFORMATION COMMUNICATION & TECHNOLOGY (CICT)</Option>
  <Option value="ARTISAN IN HEALTH SERVICE SUPPORT (AHSS)">ARTISAN IN HEALTH SERVICE SUPPORT (AHSS)</Option>
  <Option value="CRAFT IN HEALTH RECORDS AND IT (CHRIT)">CRAFT IN HEALTH RECORDS AND IT (CHRIT)</Option>
  <Option value="CRAFT IN NUTRITION AND DIETETICS (CND)">CRAFT IN NUTRITION AND DIETETICS (CND)</Option>
  <Option value="DIPLOMA IN APPLIED BIOLOGY (DAB)">DIPLOMA IN APPLIED BIOLOGY (DAB)</Option>
  <Option value="DIPLOMA IN BIOTECHNOLOGY (DBT)">DIPLOMA IN BIOTECHNOLOGY (DBT)</Option>
  <Option value="DIPLOMA IN COUNSELLING PSYCHOLOGY (DCP)">DIPLOMA IN COUNSELLING PSYCHOLOGY (DCP)</Option>
  <Option value="DIPLOMA IN MEDICAL ENGINEERING (DME)">DIPLOMA IN MEDICAL ENGINEERING (DME)</Option>
  <Option value="DIPLOMA IN MORTUARY SCIENCE (DMS)">DIPLOMA IN MORTUARY SCIENCE (DMS)</Option>
  <Option value="DIPLOMA IN OPTOMETRY TECHNOLOGY (DOPT)">DIPLOMA IN OPTOMETRY TECHNOLOGY (DOPT)</Option>
  <Option value="DIPLOMA IN SCIENCE LAB TECHNOLOGY (DSL)">DIPLOMA IN SCIENCE LAB TECHNOLOGY (DSL)</Option>
  <Option value="DIPLOMA IN SOCIAL WORK AND COMMUNITY DEVELOPMENT (DSW)">DIPLOMA IN SOCIAL WORK AND COMMUNITY DEVELOPMENT (DSW)</Option>
  <Option value="DIPLOMA IN ASSISTANT COMMUNITY HEALTH OFFICER (DACHO)">DIPLOMA IN ASSISTANT COMMUNITY HEALTH OFFICER (DACHO)</Option>
  <Option value="DIPLOMA IN INFORMATION COMMUNICATION & TECHNOLOGY (DICT)">DIPLOMA IN INFORMATION COMMUNICATION & TECHNOLOGY (DICT)</Option>
  <Option value="CERTIFICATE IN ORTHOPEDIC AND TRAUMA MEDICINE (COTM)">CERTIFICATE IN ORTHOPEDIC AND TRAUMA MEDICINE (COTM)</Option>
  <Option value="DIPLOMA IN COMMUNITY HEALTH AND DEVELOPMENT (DCHD)">DIPLOMA IN COMMUNITY HEALTH AND DEVELOPMENT (DCHD)</Option>
  <Option value="DIPLOMA IN HIV AIDS MANAGEMENT (DHM)">DIPLOMA IN HIV AIDS MANAGEMENT (DHM)</Option>
  <Option value="DIPLOMA IN PERIOPERATIVE THEATRE TECHNOLOGY (DPTT)">DIPLOMA IN PERIOPERATIVE THEATRE TECHNOLOGY (DPTT)</Option>
  <Option value="DIPLOMA IN COMMUNITY HEALTH AND HIV MANAGEMENT (DCHH)">DIPLOMA IN COMMUNITY HEALTH AND HIV MANAGEMENT (DCHH)</Option>
  <Option value="DIPLOMA IN HEALTH RECORDS & INFORMATION TECHNOLOGY (DHRIT)">DIPLOMA IN HEALTH RECORDS & INFORMATION TECHNOLOGY (DHRIT)</Option>
  <Option value="DIPLOMA IN NUTRITION AND DIETETICS (DND)">DIPLOMA IN NUTRITION AND DIETETICS (DND)</Option>
  <Option value="DIPLOMA IN ORTHOPEDIC AND TRAUMA MEDICINE (DOTM)">DIPLOMA IN ORTHOPEDIC AND TRAUMA MEDICINE (DOTM)</Option>
  <Option value="ALUMNI (Alum)">ALUMNI (Alum)</Option>
</Select>

      </Form.Item>
    </Col>
    <Col md={3}>
      <Form.Item label="Session" name="session">
        <Select defaultValue="">
        <Option value="Y1">Y1</Option>
        <Option value="Y2">Y2</Option>

        </Select>
      </Form.Item>
    </Col>
    <Col md={3}>
      <Form.Item label="Fee Structure For" name="studentType">
        <Select defaultValue="">
        <Option value="allStudents">All Students</Option>
        <Option value="allBoarders">All Boarders</Option>
        </Select>
      </Form.Item>
    </Col>
  
    <Col md={3}>
      <Form.Item label="Votehead" name="votehead">
        <Select defaultValue="">
        {voteheads && voteheads.map((votehead, index) => (
          <Option value={votehead._id}>{votehead.voteheadName}</Option>
        ))}
        
        </Select>
      </Form.Item>
    </Col>
    <Col md={3}>
      <Form.Item label="Term 1 Amount" name="term1Amount">
        <Input placeholder="Term 1 Amount" />
      </Form.Item>
    </Col>
    <Col md={3}>
      <Form.Item label="Term 2 Amount" name="term2Amount">
        <Input placeholder="Term 2 Amount" />
      </Form.Item>
    </Col>
    <Col md={3}>
      <Form.Item label="Term 3 Amount" name="term3Amount">
        <Input placeholder="Term 3 Amount" />
      </Form.Item>
    </Col>
    <Col md={12}>
      <Form.Item className='w-100'>
        <Button className='w-100' type="primary" htmlType="submit" >
          Submit
        </Button>
      </Form.Item>
    </Col>
  </Row>
</Form>

      <Accordion defaultActiveKey="0">
      <Accordion.Item eventKey="0">
        <Accordion.Header>Current Fee Structure Records</Accordion.Header>
        <Accordion.Body>
      <Table striped bordered hover>
      <thead>
  <tr>
    <th>Votehead</th>
    <th>Year</th>
    <th>Term 1</th>
    <th>Term 2</th>
    <th>Term 3</th>
    <th>Fee For</th>
    <th>Course</th>
    <th>Session</th>
  </tr>
</thead>

<tbody>
  {feeStructures && feeStructures.map((feeStructure) => (
    <tr key={feeStructure._id}>
      <td>{feeStructure.votehead.voteheadName}</td> {/* Assuming 'name' is a property of 'votehead' */}
      <td>{new Date().getFullYear()}</td> {/* Example for current year, adjust if 'year' is part of your data */}
      <td>{feeStructure.term1Amount} Ksh</td>
      <td>{feeStructure.term2Amount} Ksh</td>
      <td>{feeStructure.term3Amount} Ksh</td>
      <td>{feeStructure.studentType}</td>
      <td>{feeStructure.course}</td> {/* Assuming 'name' is a property of 'course' */}
      <td>{feeStructure.session}</td>
    </tr>
  ))}
</tbody>

    </Table>
    </Accordion.Body>
      </Accordion.Item>
   
    </Accordion>
    </Card>
    </>
}

      </main>
    </div>
  </div>
 
  );
};

export default FeeStructureScreenRegistrar;
