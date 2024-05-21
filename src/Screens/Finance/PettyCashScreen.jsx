import { Card, DatePicker, Dropdown, List, Menu, Modal,Button, Tabs, Select, Badge } from 'antd';
import { useEffect, useState } from 'react';
import 'react-calendar/dist/Calendar.css';
import { FaEye, FaEdit, FaTrash } from 'react-icons/fa'; // Import relevant icons
import moment from 'moment';

import Topbar from './components/Topbar';

import { Col, Row, Table } from 'react-bootstrap';
import { Input } from 'antd';
import { Link } from 'react-router-dom';
import Sidebar2 from './components/Sidebar2';
import { getAllRequisitions } from '../../actions/requisitionActions';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../../Components/Loader';
import { getAllReimbursements } from '../../actions/reimbursmentActions';
import { getAllPettyCash } from '../../actions/pettycashActions';
const { TabPane } = Tabs;


const { Option } = Select;




const PettCashScreen = () => {
  const dispatch = useDispatch() 
  const { Search } = Input;
  const [filteredPettycash, setFilteredPettycash] = useState([]);

  const allRequisitions = useSelector((state) => state.allRequisitions)
  const { loading: allRequisitionsLoading, error: allRequisitionsError, requisitions, success: allRequisitionsSuccess } = allRequisitions

  const allReimbursements = useSelector((state) => state.allReimbursements)
  const { loading: allReimbursementsLoading, error: allReimbursementsError, reimbursments, success: allReimbursementsSuccess } = allReimbursements
  
  const allPettyCash = useSelector((state) => state.allPettyCash)
  const { loading: allPettyCashLoading, error: allPettyCashError, pettycash, success: allPettyCashSuccess } = allPettyCash

  const handleSearch = (value) => {
    console.log('Search:', value);
    // Implement your search logic here
  };


  useEffect(()=>{

    dispatch(getAllPettyCash())

  },[])

  useEffect(() => {
    if (pettycash && pettycash.length > 0) {
      setFilteredPettycash(pettycash); // Initialize filteredLeads with leads data
    }
  }, [pettycash]);

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

        {allPettyCashLoading ? (
  <Loader />
) : (
<Card>
<h1>Petty Cash ({filteredPettycash && filteredPettycash.length})</h1>

<Row className='my-2'>
<Col md={4}>
  <Select placeholder="Select status" style={{ width: '100%', height: '100%' }} >
  <Option value="Enquiry">Enquiry</Option>
  <Option value="Not Interested">Not Interested</Option>
  <Option value="Unpaid Registration and Letter Sent">Unpaid Registration and Letter Sent</Option>
  <Option value="Paid Registration">Paid Registration</Option>
  <Option value="Admissions Letter Sent">Admissions Letter Sent</Option>
</Select>
  </Col>
    <Col md={6}>
    <div className='w-100'>
      <Search
        placeholder="Enter student Admission No."
        enterButton="Search"
        size="large"
        onSearch={handleSearch}
      />
    </div>
    </Col>
    <Col md={2}>
        <Button >Request</Button>
      </Col>
      {/* <Col md={2}>
        <Button>Process Requisition</Button>
      </Col> */}

  </Row>


    <Table striped bordered hover>
      <thead>
        <tr>
          <th>S/N</th>
          <th>Requested Email</th>
          <th>Request Date</th>
          <th>IS APPROVED</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
      {filteredPettycash.map((item, index) => (
         
         <tr key={item._id}>
          
           <td>
             {item._id}
             </td>

             <td>
             {item.requested_by.email}
             </td>

             <td>
             {item.request_date}
             </td>
             <td><span className="badge badge-warning">{`${item.is_approved}`}</span></td>

           
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
       

      </main>
    </div>
  </div>
 
  );
};

export default PettCashScreen;
