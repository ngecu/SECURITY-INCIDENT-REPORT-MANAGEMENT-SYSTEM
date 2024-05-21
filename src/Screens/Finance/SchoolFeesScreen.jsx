import { Alert, AutoComplete, Button, Card, Drawer, Form, InputNumber, Modal, Tabs } from 'antd';
import { useEffect, useState } from 'react';
import 'react-calendar/dist/Calendar.css';
import { FaEye, FaEdit, FaTrash } from 'react-icons/fa'; // Import relevant icons


import Topbar from './components/Topbar';

import { Col, Row, Table } from 'react-bootstrap';
import { Input } from 'antd';
import { Link } from 'react-router-dom';
import Sidebar2 from './components/Sidebar2';
import { listStudents } from '../../actions/studentActions';
import { useDispatch, useSelector } from 'react-redux';
import { getAllFeePaymentTransactions, getTransactionsByStudent, paySchoolFeesAction } from '../../actions/transactionActions';
import Loader from '../../Components/Loader';
import { initiateSTKPush } from '../../actions/mpesaActions';
import logo from '../../assets/logo.png';

const SchoolFeesScreen = () => {
  const dispatch = useDispatch()
    const { Search } = Input;
    const [filteredTransactions, setFilteredTransactions] = useState([]);
    const [payingAmount, setpayingAmount] = useState(0);
    const [remainingAmount, setremainingAmount] = useState(0);
    const [invoiceNumber,setInvoiceNumber] = useState(0)
    const [payment_distributions,setPaymentDistributions]= useState([])
    const [mpesaCode, setMpesaCode] = useState('');


  const [isModalVisible, setIsModalVisible] = useState(false);
  const [recordPaymentModalVisible, setRecordPaymentModalVisible] = useState(false);
  const [promptPaymentModalVisible, setPromptPaymentModalVisible] = useState(false);

  const [recordPaymentDrawerVisible, setRecordPaymentDrawerVisible] = useState(false);
  const [receiptModalVisible, setReceiptModalVisible] = useState(false);

  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth() + 1; // January is 0, so we add 1 to get the correct month
  const currentDay = now.getDate();
  
  // Format the date as desired (e.g., YYYY-MM-DD)
  const currentDateOnly = `${currentYear}/${currentMonth < 10 ? '0' + currentMonth : currentMonth}/${currentDay < 10 ? '0' + currentDay : currentDay}`;



  // Function to show receipt modal and close drawer
  const showReceipt = () => {
    setRecordPaymentDrawerVisible(false); // Close the drawer
    setReceiptModalVisible(true); // Show the receipt modal
    setInvoiceNumber(Math.floor(Math.random() * 900000) + 100000)
  };

  const handleReceiptModalClose = () => {
    setReceiptModalVisible(false); // Close the receipt modal
  };


  const [form] = Form.useForm();

const handleRecordPaymentDrawerClose = () => {
  setRecordPaymentDrawerVisible(false);
};

  const handleRecordPaymentClick = () => {
    setRecordPaymentDrawerVisible(true);
  };

  const handlePromptPaymentClick = () => {
    setPromptPaymentModalVisible(true);
  };

  const handleRecordPaymentModalClose = () => {
    setRecordPaymentModalVisible(false);
  };

  const handlePromptPaymentModalClose = () => {
    setPromptPaymentModalVisible(false);
  };

  const handleSearch = (value) => {
    console.log('Search:', value);
    dispatch(getTransactionsByStudent(value))
  };
  const handleMpesaCodeChange = (e) => {
    setMpesaCode(e.target.value);
  };

  const handleSearchMain = (value) => {
    console.log(value);
    const searchValueLowerCase = value.toLowerCase();
    const filteredTransactions = all_fee_transactions.filter((transaction) => {
      return (
        transaction.student.studentID.toLowerCase().includes(searchValueLowerCase) 
        
      );
    });
    setFilteredTransactions(filteredTransactions);
  };

  const [loading, setLoading] = useState(false);

  const onFinish = (values) => {
    console.log("values ",values);
    dispatch(initiateSTKPush(values.amount,values.phoneNumber))
  };
  const allStudents = useSelector((state) => state.allStudents)
  const { loading: allStudentsLoading, error: allStudentsError, students, success: allStudentsSuccess } = allStudents

  const transactionsByStudent = useSelector((state)=> state.transactionsByStudent)
  const { loading: transactionsByStudentLoading, error: transactionsByStudentError, transactions, success: transactionsByStudentSuccess } = transactionsByStudent

  const allFeePaymentTransactions = useSelector((state)=> state.allFeePaymentTransactions)
  const { loading: allFeePaymentTransactionsLoading, error: allFeePaymentTransactionsError, all_fee_transactions, success: allFeePaymentTransactionsSuccess } = allFeePaymentTransactions

  const paySchoolFeesR = useSelector((state)=> state.paySchoolFeesR)
  const { loading: paySchoolFeesLoading, error: paySchoolFeesError, success: paySchoolFeesSuccess } = paySchoolFeesR

  const userLogin = useSelector((state) => state.userLogin)
  const {  userInfo,success } = userLogin


  
  useEffect(()=>{
    dispatch(listStudents())

    dispatch(getAllFeePaymentTransactions())
  },[])

  useEffect(()=>{
    dispatch(getAllFeePaymentTransactions())
  },[paySchoolFeesSuccess])

  

  useEffect(() => {
    if (all_fee_transactions && all_fee_transactions.length > 0) {
      setFilteredTransactions(all_fee_transactions); // Initialize filteredLeads with leads data
    }
  }, [all_fee_transactions]);


  const getRandomInvoiceNumber = () => {
    const x = Math.floor(Math.random() * 900000) + 100000;
    setInvoiceNumber(Math.floor(Math.random() * 900000) + 100000)
   
  };
  
const paySchoolFees = ()=>{
  const values = {}
  values.serial_no = invoiceNumber
  values.date = currentDateOnly
  values.accountant = userInfo._id
  values.amount_paid = payingAmount
  values.amount_remaining = remainingAmount
  values.distributions = payment_distributions
  values.student = transactions[0].student._id
  values.code = mpesaCode
  
  console.log("am paying fees ",values);
  dispatch(paySchoolFeesAction(values))

}


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

<Card>
<h1>School Fees Record </h1>

  <Row className='my-2'>
    <Col md={8}>

    </Col>
    <Col md={2}>
        <Button onClick={handleRecordPaymentClick}>Record Payment</Button>
      </Col>
      <Col md={2}>
        <Button danger onClick={handlePromptPaymentClick}>Prompt Payment</Button>
      </Col>

      {/* Record Payment Modal */}
      <Drawer
  title="Record Payment"
  placement="right"
  closable={true}
  onClose={handleRecordPaymentDrawerClose}
  visible={recordPaymentDrawerVisible}
  width={400}
>
<div className='w-100'>

      <Search 
      
      placeholder="Enter student Admission No."
      enterButton="Search"
      size="large"
      onSearch={handleSearch}
      />

<div>
      {transactionsByStudentLoading ? (
        <Loader/>
      ) : transactionsByStudentError ? (
        <Alert message="Error" description={transactionsByStudentError} type="error" showIcon />
      ) : transactions && (
        <Row gutter={[16, 16]}>
          <Col md={12}>
          <p>Student Name: {transactions?.length > 0 ? transactions[0].student.firstName + ' ' + transactions[0].student.lastName : 'N/A'} {transactions?.length > 0 ? transactions[0].student.studentID : 'N/A'}</p>
          <p>Last Payment: Ksh.{transactions?.length > 0 ? transactions[transactions.length - 1].amount_paid: 'N/A'} </p>
<p>Remaining Fee: Ksh.{transactions?.length > 0 ? transactions[transactions.length - 1].amount_remaining: 'N/A'}</p>

          </Col>
       
          <Col md={12}>
            {/* Render form to pay school fees here */}
           
            <Form
      layout="vertical"
      onFinish={showReceipt}
      form={form}
    >
      <Row>
        <Col md={12}>
        <Form.Item
        name="code"
        label="Mpesa Code/Bank Cheque Number"
        rules={[{ required: true, message: 'Please enter code' }]}
      >
        <Input value={mpesaCode} onChange={handleMpesaCodeChange} />
      </Form.Item>

        </Col>
        <Col md={6}>
        <Form.Item
  name="amountPaid"
  label="Amount To Pay"
  rules={[{ required: true, message: 'Please enter amount paid' }]}
>
  <InputNumber
    type="number"
    onChange={(value) => {
      // Calculate the new amount remaining
      const currentAmountRemaining = transactions[transactions.length - 1].amount_remaining;
      const newAmountRemaining = currentAmountRemaining - value;

      // Set the new amount remaining in the form
      form.setFieldsValue({ amountRemaining: newAmountRemaining });
      setremainingAmount(newAmountRemaining)
      setpayingAmount(value)
    }}
  />
</Form.Item>
        </Col>

        <Col md={6}>
        <Form.Item
  name="amountRemaining"
  label="To Remaining"
  rules={[{ required: true, message: 'Please enter amount remaining' }]}
>
  <InputNumber type="number" disabled />
</Form.Item>

        </Col>

        <Col md={12}>
        <Form.Item>
        <Button className='w-100' type="primary" htmlType="submit">Generate Receipt</Button>
      </Form.Item>
        </Col>
      </Row>
      
    </Form>
          </Col>
        </Row>
      )}
    </div>
  
    
    </div>      </Drawer>

      {/* Prompt Payment Modal */}
      <Modal
      title="Prompt Payment"
      visible={promptPaymentModalVisible}
      onCancel={handlePromptPaymentModalClose}
      footer={null}
    >
      <Form  onFinish={onFinish} layout="vertical">
        <Form.Item
          name="phoneNumber"
          label="Phone Number"
          rules={[
            {
              required: true,
              message: 'Please enter phone number',
            },
          ]}
        >
          <Input placeholder="Eg.254707583092" />
        </Form.Item>
        <Form.Item
          name="amount"
          label="Amount"
          rules={[
            {
              required: true,
              message: 'Please enter amount',
            },
          ]}
        >
          <Input type="number" placeholder="Eg.1,000" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  </Row>
<div className='w-100'>
      <Search
        placeholder="Enter student Admission No."
        enterButton="Search"
        size="large"
        onSearch={handleSearchMain}
      />
    </div>

    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Student</th>
          <th>Admission Number</th>
          <th>Paid Amount</th>
          <th>Remaining Amount</th>
          <th>Actions</th> 
        </tr>
      </thead>
      <tbody>
  {allFeePaymentTransactionsLoading ? (
    <Loader />
  ) : (
    filteredTransactions && filteredTransactions.map((transaction) => {
      // Calculate the percentage paid
      const percentagePaid = ((transaction.amount_paid / transaction.amount) * 100).toFixed(2);

      return (
        <tr key={transaction._id}>
          <td>{transaction.student.firstName} {transaction.student.lastName}</td>
          <td>{transaction.student.studentID}</td>
          <td>Ksh.{transaction.amount_paid}</td>
          <td>Ksh.{transaction.amount_remaining}</td>
          <td>
<Link to={`${transaction.student.studentID}`} className="ant-btn css-dev-only-do-not-override-11xg00t ant-btn-default">
 <FaEye />
</Link>     
</td>        </tr>
      );
    })
  )}
</tbody>

    </Table>

</Card>
       

      </main>
    </div>

    <Modal
  title="Receipt"
  visible={receiptModalVisible}
  onCancel={handleReceiptModalClose}
  footer={null}
>
  <section class="invoice">
    <div class="row">
      <div class="col-xs-12">
        <h2 class="page-header">
          <Row>
            <Col md={4}>
              <img src={logo} alt="" style={{width:"100px"}} />
            </Col>
            <Col md={8}>
              <small class="pull-right">DATE: {currentDateOnly}</small>
            </Col>
          </Row>
        </h2>
      </div>
    </div>

    <div class="row invoice-info">
      <div class="col-sm-4 invoice-col">
        From
        <address>
          <strong>JFC Munene.</strong><br/>
        </address>
      </div>

      <div class="col-sm-4 invoice-col">
        To
        <address>
          <strong>{transactions?.length > 0 ? transactions[0].student.firstName + ' ' + transactions[0].student.lastName : 'N/A'}</strong><br/>
        </address>
      </div>

      <div class="col-sm-4 invoice-col">
        <b>Invoice #{invoiceNumber}</b><br/>
        <b>Paid: Ksh.{payingAmount.toFixed(2)}</b><br/>
      </div>
    </div>

    <div class="row">
      <div class="col-xs-12 table-responsive">
        <table class="table table-striped">
          <thead>
            <tr>
              <th>#</th>
              <th>Description</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            {transactions && transactions[0].FeeStructure.overheads &&
              transactions[0].FeeStructure.overheads
                .sort((a, b) => a.priority - b.priority) // Sort by priority
                .map((overhead,index) => (
                  <tr key={overhead._id}>
                    <td>{index + 1 }</td>
                    <td>{overhead.name}</td>
                    <td>
                      {/* Calculate the amount based on the percentage paid */}
                      Ksh.{((overhead.male / transactions[0].amount) * payingAmount).toFixed(2)}
                    </td>
                  </tr>
                ))}
            <tr>
              <td colSpan="2">Total to Pay:</td>
              <td>
                Ksh.{transactions &&
                  transactions[0].FeeStructure.overheads.reduce(
                    (total, overhead) => total + ((overhead.male / transactions[0].amount) * payingAmount),
                    0
                  ).toFixed(2)}
              </td>
            </tr>
       
<tr style={{background:"white !important"}}>
  <td colSpan="2">Remaining Amount:</td>
  <td>
    Ksh.{transactions && (transactions[transactions.length - 1].amount_remaining - payingAmount).toFixed(2)}
  </td>
</tr>
          </tbody>
        </table>
      </div>
    </div>

    <div class="row no-print">
      <div class="col-xs-12">
        <Row>
          <Col md={12}>
            <Button onClick={paySchoolFees} type="primary" className='w-100'  ><i class="fa fa-credit-card mx-2"></i> Submit Payment</Button>
          </Col>
        </Row>
      </div>
    </div>
  </section>
</Modal>


  </div>
 
  );
};

export default SchoolFeesScreen;
