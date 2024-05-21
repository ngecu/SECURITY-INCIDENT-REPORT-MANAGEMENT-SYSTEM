import { Card, DatePicker, Dropdown, List, Menu, Modal,Button, Tabs, Select, Badge, Form } from 'antd';
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
import ReactQuill from 'react-quill';
import Loader from '../../Components/Loader';
const { TabPane } = Tabs;

const data = [
  { id: 1, name: 'Arjun Singh Shekhawat', dateTime: '03 April 2023', amount: 'KShs 80,000', phoneNumber: '+254732568412', status: 'Incomplete' },
  { id: 2, name: 'Arjun Singh Shekhawat', dateTime: '03 April 2023', amount: 'KShs 80,000', phoneNumber: '+254732568412', status: 'Incomplete' },
  { id: 3, name: 'Arjun Singh Shekhawat', dateTime: '03 April 2023', amount: 'KShs 80,000', phoneNumber: '+254732568412', status: 'Incomplete' },
  { id: 4, name: 'Arjun Singh Shekhawat', dateTime: '03 April 2023', amount: 'KShs 80,000', phoneNumber: '+254732568412', status: 'Incomplete' },
  { id: 5, name: 'Arjun Singh Shekhawat', dateTime: '03 April 2023', amount: 'KShs 80,000', phoneNumber: '+254732568412', status: 'Incomplete' },
  { id: 6, name: 'Arjun Singh Shekhawat', dateTime: '03 April 2023', amount: 'KShs 80,000', phoneNumber: '+254732568412', status: 'Incomplete' },
  { id: 7, name: 'Arjun Singh Shekhawat', dateTime: '03 April 2023', amount: 'KShs 80,000', phoneNumber: '+254732568412', status: 'Incomplete' },
  { id: 8, name: 'Arjun Singh Shekhawat', dateTime: '03 April 2023', amount: 'KShs 80,000', phoneNumber: '+254732568412', status: 'Incomplete' },
  { id: 9, name: 'Arjun Singh Shekhawat', dateTime: '03 April 2023', amount: 'KShs 80,000', phoneNumber: '+254732568412', status: 'Incomplete' },
  { id: 10, name: 'Arjun Singh Shekhawat', dateTime: '03 April 2023', amount: 'KShs 80,000', phoneNumber: '+254732568412', status: 'Incomplete' },
  { id: 11, name: 'Arjun Singh Shekhawat', dateTime: '03 April 2023', amount: 'KShs 80,000', phoneNumber: '+254732568412', status: 'Incomplete' },
  { id: 12, name: 'Arjun Singh Shekhawat', dateTime: '03 April 2023', amount: 'KShs 80,000', phoneNumber: '+254732568412', status: 'Incomplete' },
  { id: 13, name: 'Arjun Singh Shekhawat', dateTime: '03 April 2023', amount: 'KShs 80,000', phoneNumber: '+254732568412', status: 'Incomplete' },
  { id: 14, name: 'Arjun Singh Shekhawat', dateTime: '03 April 2023', amount: 'KShs 80,000', phoneNumber: '+254732568412', status: 'Incomplete' },
  { id: 15, name: 'Arjun Singh Shekhawat', dateTime: '03 April 2023', amount: 'KShs 80,000', phoneNumber: '+254732568412', status: 'Incomplete' },
  { id: 16, name: 'Arjun Singh Shekhawat', dateTime: '03 April 2023', amount: 'KShs 80,000', phoneNumber: '+254732568412', status: 'Incomplete' },
  { id: 17, name: 'Arjun Singh Shekhawat', dateTime: '03 April 2023', amount: 'KShs 80,000', phoneNumber: '+254732568412', status: 'Incomplete' },
  { id: 18, name: 'Arjun Singh Shekhawat', dateTime: '03 April 2023', amount: 'KShs 80,000', phoneNumber: '+254732568412', status: 'Incomplete' },
  { id: 19, name: 'Arjun Singh Shekhawat', dateTime: '03 April 2023', amount: 'KShs 80,000', phoneNumber: '+254732568412', status: 'Incomplete' },
  { id: 20, name: 'Arjun Singh Shekhawat', dateTime: '03 April 2023', amount: 'KShs 80,000', phoneNumber: '+254732568412', status: 'Incomplete' },

];
const { Option } = Select;




const RequisitionScreen = () => {
  const dispatch = useDispatch() 
  const { Search } = Input;
  const [filteredRequisitions, setFilteredRequisitions] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [value, setValue] = useState('');

  const allRequisitions = useSelector((state) => state.allRequisitions)
  const { loading: allRequisitionsLoading, error: allRequisitionsError, requisitions, success: allRequisitionsSuccess } = allRequisitions


  const handleSearch = (value) => {
    console.log('Search:', value);
    // Implement your search logic here
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  useEffect(()=>{
    dispatch(getAllRequisitions())
  },[])

  useEffect(() => {
    if (requisitions && requisitions.length > 0) {
      setFilteredRequisitions(requisitions); // Initialize filteredLeads with leads data
    }
  }, [requisitions]);
  const onFinish = (values) => {
    // Handle form submission
    values.status = 'Enquiry'
    values.date =new Date()

    values.agent = storedUser.userData._id

    console.log('Form values:', values);

  };
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

        {allRequisitionsLoading ? (
  <Loader />
) : (
<Card>
<h1>All Requisitions ({filteredRequisitions && filteredRequisitions.length})</h1>

<Row className='my-2'>
<Col md={10}>

</Col>
    <Col md={2}>
        <Button onClick={showModal} >Request Requisition</Button>
      </Col>
      {/* <Col md={2}>
        <Button>Process Requisition</Button>
      </Col> */}

  </Row>

  <Modal
  title="Request Requisition"
  visible={isModalVisible}
  onOk={handleOk}
  onCancel={handleCancel}
  width={1000}
  footer={[]}
>
  <Form
    name="add_requisition_form"
    onFinish={onFinish}
    layout="vertical"
  >
    <Row gutter={16}>
      <Col md={12}>
        <Form.Item
          name="description"
          label="Description"
          rules={[{ required: true, message: 'Please enter description' }]}
        >
          <Input.TextArea />
        </Form.Item>
      </Col>
    </Row>
    <Row gutter={16}>
      <Col md={12}>
        <Form.Item
          name="quotations"
          label="Quotations"
          rules={[{ required: true, message: 'Please enter quotations' }]}
        >
          <Input.TextArea />
        </Form.Item>
      </Col>
    </Row>
    <Button type="primary" htmlType="submit">
      Submit
    </Button>
  </Form>
</Modal>



    <Table striped bordered hover>
      <thead>
        <tr>
          <th>S/N</th>
          <th>Requested By</th>
          <th>Request Date</th>
          <th>IS APPROVED</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
      {filteredRequisitions.map((item, index) => (
         
         <tr key={item.id}>
          
           <td>
             {item.serial_no}
             </td>

             <td>
             {item.requested_by}
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

export default RequisitionScreen;
