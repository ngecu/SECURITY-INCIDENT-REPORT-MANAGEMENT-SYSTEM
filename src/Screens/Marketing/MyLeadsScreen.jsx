import { Select,DatePicker, Card, Input,  Modal,Badge, Button } from 'antd';
import { useEffect, useState } from 'react';
import 'react-calendar/dist/Calendar.css';
import { FaEye, FaRegFileExcel } from 'react-icons/fa';
import Topbar from './components/Topbar';
import moment from 'moment';

import { Col, Row, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { MyMarketLead,  downloadLeadsByAgentExcel } from '../../actions/marketingActions';
import Sidebar2 from './components/Sidebar2';
import { getStatusColor } from '../../Components/ColorStatus';
import Loader from '../../Components/Loader';


const { Option } = Select;

const MyLeadsScreen = () => {

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [filteredLeads, setFilteredLeads] = useState([]);


  const { Search } = Input;

  const MyMarketLeads = useSelector((state) => state.MyMarketLeads)
  const { loading: allLeadsLoading, error: allLeadsError, leads, success: allLeadsSuccess } = MyMarketLeads

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

  const userLogin = useSelector((state) => state.userLogin)
  const { loading, error, userInfo,success } = userLogin

const agent_id = userInfo?.userData?._id || storedUser?.userData?._id

const handleSearch = (value) => {
  console.log(value);
  const searchValueLowerCase = value.toLowerCase();
  const filteredLeads = leads.filter((lead) => {
    const leadName = `${lead.firstName} ${lead.lastName}`.toLowerCase();
    const agentName = `${lead.status.agent.firstName} ${lead.status.agent.lastName}`.toLowerCase();
    return (
      leadName.includes(searchValueLowerCase) ||
      lead.status[lead.status.length - 1].type.toLowerCase().includes(searchValueLowerCase) ||
      lead.source.toLowerCase().includes(searchValueLowerCase) ||
      agentName.includes(searchValueLowerCase) ||
      lead.phone.includes(value)
    );
  });
  setFilteredLeads(filteredLeads);
};

const handleStatusChange = (value) => {
  const filteredLeads = leads.filter((lead) => lead.status[lead.status.length - 1].type === value);
  setFilteredLeads(filteredLeads);
};

const handleDateRangeChange = (dates, dateStrings) => {
  console.log('Selected Range: ', dates);
  console.log('Formatted Selected Range: ', dateStrings);
  // Filter leads based on selected date range
  const filteredLeads = leads.filter((lead) => {
    const leadDate = moment(lead.createdAt);
    console.log("lead date is ",leadDate);
    return leadDate.isBetween(dates[0], dates[1], null, '[]');
  });
  setFilteredLeads(filteredLeads);
};


  useEffect(()=>{
    dispatch(MyMarketLead(agent_id))
    
  },[])

  useEffect(() => {
    if (leads && leads.length > 0) {
      setFilteredLeads(leads); // Initialize filteredLeads with leads data
    }
  }, [leads]);

  const handleExportAllLeads = () => {
    dispatch(downloadLeadsByAgentExcel(agent_id))
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

   

        <Row>
     

          <Col md={12} className='my-2'>
          {allLeadsLoading ? (
  <Loader />
) : (
          <Card >
            
            <div className="d-flex justify-content-between align-items-center">
  <h1>My Leads ({filteredLeads && filteredLeads.length})</h1>
  <Button className='btn-warning' onClick={handleExportAllLeads}> <FaRegFileExcel className='mx-2' /> Export My Leads</Button>
</div>

      

          <Row className='my-2'>
  <Col md={4}>
  <Select placeholder="Select status" style={{ width: '100%', height: '100%' }} onChange={handleStatusChange}>
  <Option value="Enquiry">Enquiry</Option>
  <Option value="Not Interested">Not Interested</Option>
  <Option value="Unpaid Registration and Letter Sent">Unpaid Registration and Letter Sent</Option>
  <Option value="Paid Registration">Paid Registration</Option>
  <Option value="Admissions Letter Sent">Admissions Letter Sent</Option>
</Select>
  </Col>

  <Col md={4}>
  <DatePicker.RangePicker
      ranges={{
        Today: [moment(), moment()],
        'This Week': [moment().startOf('week'), moment().endOf('week')],
        'This Month': [moment().startOf('month'), moment().endOf('month')],
      }}
      onChange={handleDateRangeChange}
      style={{ width: '100%',height:'100%' }}
    />
  </Col>
  <Col md={4}>
  <div className='w-100'>
      <Search
        placeholder="Name/Status/Source/Agent/Phone Number"
        enterButton="Filter"
        size="large"
        onSearch={handleSearch}
      />
    </div>

  </Col>
</Row>


          

          <Table striped bordered hover>
      <thead>
        <tr>
          <th>Status</th>
          <th>Name</th>
          <th>Contact Number</th>
          <th>Date</th>
          <th>Source</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
      {filteredLeads.map((item, index) => (
         
          <tr key={item.id}>
           
            <td>
            <Badge.Ribbon color={getStatusColor(item.status[item.status.length - 1]?.type)} text={`${item.status[item.status.length - 1]?.type}`}>
              {index + 1}
              </Badge.Ribbon>
              </td>
            
            <td>{item.firstName} {item.lastName}</td>
            
            <td>{item.phone}</td>
            <td>{moment(item.status.createdAt).format('MMMM Do YYYY, h:mm:ss a')}</td>
            <td>{item.source}</td>       
  
<td>
<Link to={`${item._id}`} className="ant-btn css-dev-only-do-not-override-11xg00t ant-btn-default">
  <FaEye />
</Link>     
</td>

          </tr>
        
        ))}
      </tbody>
    </Table>
          </Card>
)}
          </Col>

          
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

  </div>
 
  );
};

export default MyLeadsScreen;
