import { Select,DatePicker, Card, Input,  Modal,Badge } from 'antd';
import { useEffect, useState } from 'react';
import 'react-calendar/dist/Calendar.css';
import { FaEye } from 'react-icons/fa';
import Topbar from './components/Topbar';
import moment from 'moment';

import { Col, Row, Table } from 'react-bootstrap';
import { FaFacebook } from "react-icons/fa";
import facebook from '../../assets/facebook.png';
import youtube from '../../assets/youtube.png';
import linkedin from '../../assets/linkedin.png';
import instagram  from '../../assets/instagram.png';
import google  from '../../assets/google.png';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { MyMarketLead, allMarketLeads } from '../../actions/marketingActions';
import Sidebar2 from './components/Sidebar2';
import { getStatusBadgeColor, getStatusColor } from '../../Components/ColorStatus';
import Loader from '../../Components/Loader';


const { Option } = Select;

const MyClosedScreen = () => {

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
  const searchValueLowerCase = value.toLowerCase();
  const filteredLeads = leads.filter((lead) => {
    const leadName = `${lead.firstName} ${lead.lastName}`.toLowerCase();
    const agentName = `${lead.status.agent.firstName} ${lead.status.agent.lastName}`.toLowerCase();
    return (
      lead.status[lead.status.length - 1].type === 'Admissions Letter Sent' && 
      (leadName.includes(searchValueLowerCase) ||
      lead.status[lead.status.length - 1].type.toLowerCase().includes(searchValueLowerCase) ||
      lead.source.toLowerCase().includes(searchValueLowerCase) ||
      agentName.includes(searchValueLowerCase) ||
      lead.phone.includes(value))
    );
  });
  setFilteredLeads(filteredLeads);
};

const handleStatusChange = (value) => {
  const filteredLeads = leads.filter((lead) => {
    return lead.status[lead.status.length - 1].type === 'Admissions Letter Sent' && value === 'Admissions Letter Sent';
  });
  setFilteredLeads(filteredLeads);
};

const handleDateRangeChange = (dates, dateStrings) => {
  const filteredLeads = leads.filter((lead) => {
    const leadDate = moment(lead.createdAt);
    return (
      lead.status[lead.status.length - 1].type === 'Admissions Letter Sent' && 
      leadDate.isBetween(dates[0], dates[1], null, '[]')
    );
  });
  setFilteredLeads(filteredLeads);
};



  useEffect(()=>{
    dispatch(MyMarketLead(agent_id))
    
  },[])

  useEffect(() => {
    if (leads && leads.length > 0) {
      const filteredLeads = leads.filter((lead) => {
        return lead.status[lead.status.length - 1].type === 'Admissions Letter Sent';
      });
      setFilteredLeads(filteredLeads); // Initialize filteredLeads with leads data
    }
  }, [leads])

  
  



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
            
          <h1>My Sent Letters Leads({filteredLeads && filteredLeads.length})</h1>


          <Row className='my-2'>


  <Col md={6}>
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
  <Col md={6}>
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
            <Badge.Ribbon color={getStatusColor(item.status[item.status.length - 1].type)} text={`${item.status[item.status.length - 1].type}`}>
              {index + 1}
              </Badge.Ribbon>
              </td>
            
            <td>{item.firstName} {item.lastName}</td>
            
            <td>{item.phone}</td>
            <td>{moment(item.status.createdAt).format('MMMM Do YYYY, h:mm:ss a')}</td>
            <td>
      {item.source}

    </td>            
  
<td>
<Link to={`/marketing/my_leads/${item._id}`} className="ant-btn css-dev-only-do-not-override-11xg00t ant-btn-default">
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

export default MyClosedScreen;
