import { Button, Card,Modal, Form, Input, Select, DatePicker,Result,Tabs, List, Skeleton, Avatar, TimePicker  } from 'antd';
import { useEffect, useState } from 'react';

import 'react-calendar/dist/Calendar.css';

import Topbar from './components/Topbar';
import moment from 'moment';
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import { Badge, Col, Row } from 'react-bootstrap';

import { createStyles, useTheme } from 'antd-style';
import { allMarketLeads, registerMarketLead } from '../../actions/marketingActions';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import Sidebar2 from './components/Sidebar2';
import Loader from '../../Components/Loader';
import ReactQuill from 'react-quill';
import { IoIosAddCircle } from "react-icons/io";
import { IoMdDoneAll } from "react-icons/io";
import { FaRegEdit } from "react-icons/fa";
import { addEventToTermDate, listTermDates } from '../../actions/termDateActions';
import { Calendar, momentLocalizer } from 'react-big-calendar'

const count = 4;
const fakeDataUrl = `https://randomuser.me/api/?results=${count}&inc=name,gender,email,nat,picture&noinfo`;

const { Meta } = Card;
const { TabPane } = Tabs;
const useStyle = createStyles(({ token }) => ({

  'my-modal-mask': {
    boxShadow: `inset 0 0 15px #fff`,
  },

}));


const localizer = momentLocalizer(moment) // or globalizeLocalizer

const MyCalendar = (props) => {
  const today = new Date();
  const tomorrow = new Date();
  tomorrow.setDate(today.getDate() + 1);

  // Generate events for today, tomorrow, and this week
  const events = [
    {
      title: 'Staff Term Opening Meeting',
      start: moment("2024-05-03T09:00:00").toDate(),
      end: moment("2024-05-03T11:00:00").toDate(),
    },
    {
      title: 'Opening of Continuing Students - Signing of Nominal Rolls',
      start: moment("2024-05-06").toDate(),
      end: moment("2024-05-06").toDate(),
    },
    {
      title: 'Declaration of April 2024 Results',
      start: moment("2024-05-06").toDate(),
      end: moment("2024-05-06").toDate(),
    },
    {
      title: 'Deadline for Registration of External Examinations (KNEC Technical/CDACC)',
      start: moment("2024-05-06").toDate(),
      end: moment("2024-05-06").toDate(),
    },
    {
      title: 'May 2024 Intake',
      start: moment("2024-05-06").toDate(),
      end: moment("2024-05-31").toDate(),
    },
    {
      title: 'Deadline for Submitting Scholarship Forms',
      start: moment("2024-05-06").toDate(),
      end: moment("2024-05-06").toDate(),
    },
    {
      title: 'Deadline for Payment of KNEC and CBET External Exams',
      start: moment("2024-05-06").toDate(),
      end: moment("2024-05-06").toDate(),
    },
    {
      title: 'Commencement of May - August 2024 Term',
      start: moment("2024-05-06").toDate(),
      end: moment("2024-08-16").toDate(),
    },
    {
      title: 'Publication of April 2024 Results in the Student Portal',
      start: moment("2024-05-10").toDate(),
      end: moment("2024-05-10").toDate(),
    },
    {
      title: 'March End Term, Special/Supplementary Exams',
      start: moment("2024-05-13").toDate(),
      end: moment("2024-05-17").toDate(),
    },
    {
      title: 'Deadline for Submission of PCS',
      start: moment("2024-05-17").toDate(),
      end: moment("2024-05-17").toDate(),
    },
    {
      title: 'Deadline for Submission of Continuous Assessment Test',
      start: moment("2024-05-17").toDate(),
      end: moment("2024-05-17").toDate(),
    },
    {
      title: 'Signing of Performance Contract',
      start: moment("2024-05-17").toDate(),
      end: moment("2024-05-17").toDate(),
    },
    {
      title: 'May 2024 Clinical Rotation',
      start: moment("2024-05-20").toDate(),
      end: moment("2024-05-31").toDate(),
    },
    {
      title: 'Orientation for May 2024 Intake and Prayer Day',
      start: moment("2024-05-24").toDate(),
      end: moment("2024-05-24").toDate(),
    },
    {
      title: 'Deadline for Verification of June/July 2024 POES',
      start: moment("2024-05-31").toDate(),
      end: moment("2024-05-31").toDate(),
    },
    {
      title: 'Student Welfare Sensitization',
      start: moment("2024-05-31").toDate(),
      end: moment("2024-05-31").toDate(),
    },
    {
      title: 'Moderation of Continuous Assessment Tests',
      start: moment("2024-06-05").toDate(),
      end: moment("2024-06-06").toDate(),
    },
    {
      title: 'Staff Capacity Training',
      start: moment("2024-06-07").toDate(),
      end: moment("2024-06-07").toDate(),
    },
    {
      title: 'Deadline for Submission of August Written Assessments, September Special and Supplementary Written Assessment and Marking Schemes',
      start: moment("2024-06-07").toDate(),
      end: moment("2024-06-07").toDate(),
    },
    {
      title: 'Applied Science Departmental Meeting (Mentorship Program)',
      start: moment("2024-06-13").toDate(),
      end: moment("2024-06-13").toDate(),
    },
    {
      title: 'Health Sciences Departmental Meeting (Mentorship)',
      start: moment("2024-06-14").toDate(),
      end: moment("2024-06-14").toDate(),
    },
    {
      title: 'Moderation of the Written Assessments and Marking Schemes',
      start: moment("2024-06-19").toDate(),
      end: moment("2024-06-21").toDate(),
    },
    {
      title: '1st Student-Trainer Evaluation',
      start: moment("2024-06-17").toDate(),
      end: moment("2024-06-21").toDate(),
    },
    {
      title: 'JFC CSR Activity',
      start: moment("2024-06-22").toDate(),
      end: moment("2024-06-22").toDate(),
    },
    {
      title: 'Student Examination Orientation Meeting',
      start: moment("2024-06-27").toDate(),
      end: moment("2024-06-27").toDate(),
    },
    {
      title: 'COMET',
      start: moment("2024-06-28").toDate(),
      end: moment("2024-06-28").toDate(),
    },
    {
      title: 'JFC Family Prayer Day',
      start: moment("2024-06-30").toDate(),
      end: moment("2024-06-30").toDate(),
    },
    {
      title: 'Continuous Assessment Test (CAT)',
      start: moment("2024-07-01").toDate(),
      end: moment("2024-07-05").toDate(),
    },
    {
      title: 'July 2024 Intake',
      start: moment("2024-07-01").toDate(),
      end: moment("2024-07-12").toDate(),
    },
    {
      title: 'Assessment of Students on May - August 2024 Clinical Attachment',
      start: moment("2024-07-08").toDate(),
      end: moment("2024-07-26").toDate(),
    },
    {
      title: '2nd Student – Trainer Evaluation',
      start: moment("2024-07-22").toDate(),
      end: moment("2024-07-26").toDate(),
    },
    {
      title: 'Special CAT',
      start: moment("2024-07-24").toDate(),
      end: moment("2024-07-26").toDate(),
    },
    {
      title: 'Staff Appraisal',
      start: moment("2024-08-05").toDate(),
      end: moment("2024-08-09").toDate(),
    },
    {
      title: 'End of Term Written Assessment',
      start: moment("2024-08-05").toDate(),
      end: moment("2024-08-16").toDate(),
    },
    {
      title: 'September 2024 Intake',
      start: moment("2024-09-02").toDate(),
      end: moment("2024-09-30").toDate(),
    },
    {
      title: 'Reporting of Continuous Students',
      start: moment("2024-09-04").toDate(),
      end: moment("2024-09-04").toDate(),
    }
  ];
  
  
  // Continue adding the rest of the events using the same pattern
  // The entire list would be lengthy and may need to be split or managed differently depending on the application
  
  
  // Display or process the 'events' array as needed in your application
  

  return (
    <div style={{ height: '100vh' }}>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
      />
    </div>
  );
};



const TermScheduleScreen = () => {
  const [value, setValue] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [myLeads, setMyLeads] = useState([]);
  const { styles } = useStyle();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentEvent, setCurrentEvent] = useState(null);

  const handleEventClick = ({ event }) => {
    // Convert the event API's event object to a more friendly format if necessary
    console.log("show modal");
    const eventData = {
      id: event.id,
      title: event.title,
      startDate: event.start,
      endDate: event.end,
      description: event.extendedProps.description // assuming you pass description here
    };
    setCurrentEvent(eventData);
    setIsModalOpen(true);
  };

  const token = useTheme();
  
  const registerLead = useSelector((state) => state.registerLead)
  const { loading: registerLoading, error: registerError,  success: registerSuccess } = registerLead
  
  const allLeads = useSelector((state) => state.allLeads)
  const { loading: allLeadsLoading, error: allLeadsError, leads, success: allLeadsSuccess } = allLeads
  
  const termDatesList = useSelector((state) => state.termDatesList)
  const { loading: alltermDatesListLoading, error: alltermDatesListError, termDates, success: alltermDatesListSuccess } = termDatesList
  
  const userLogin = useSelector((state) => state.userLogin)
const { loading, error, userInfo,success } = userLogin

const storedUser = JSON.parse(localStorage.getItem('userInfo'));
const [visible, setVisible] = useState(false);

    const showModalToDo = () => {
      setVisible(true);
    };

    const handleCancelToDo = () => {
      setVisible(false);
    };

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


  const handleDateRangeChange = (dates, dateStrings) => {
    console.log('Selected Range: ', dates);
    console.log('Formatted Selected Range: ', dateStrings);
  };

  useEffect(() => {
    if (registerError) {
      toast.error(registerError);
    }
    if (registerSuccess) {
      console.log("successfully created");
      toast.success('Lead Created Successfully');
      handleCancel();
      dispatch(allMarketLeads());
    }
  }, [registerError, registerSuccess, dispatch]);

  useEffect(()=>{
    dispatch(allMarketLeads())
    dispatch(listTermDates())

  },[])


  useEffect(() => {
    if (leads) {
      const myLeads = leads.filter(lead => {
        // Check if any status object in the lead's status array has the agent ID of the stored user
        return lead.status.some(statusObj => statusObj.agent?._id === storedUser?.userData?._id || userInfo?.userData?.firstName);
      });
      setMyLeads(myLeads);
    }
  }, [storedUser]);
  


  const classNames = {
    body: styles['my-modal-body'],
    mask: styles['my-modal-mask'],
    header: styles['my-modal-header'],
    footer: styles['my-modal-footer'],
    content: styles['my-modal-content'],
  };
  const modalStyles = {
    header: {
      borderLeft: `5px solid ${token.colorPrimary}`,
      borderRadius: 0,
      paddingInlineStart: 5,
    },
   
    mask: {
      backdropFilter: 'blur(10px)',
    },

  };

  const [initLoading, setInitLoading] = useState(true);
  // const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [list, setList] = useState([]);



  const handleFormSubmit = () => {
    // Form submission logic will go here
  };

  const onFinish = (values) => {
    console.log('Received values from form: ', values);
    dispatch(addEventToTermDate("662a097e6fc11f1098bccbfd",values))
  };

  const { TextArea } = Input;


  const events = termDates && termDates[0] ? termDates[0].events.map(event => ({
    title: event.name,
    start: event.startDate,
    end: event.endDate
  })) : [];

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
        {alltermDatesListLoading ? <Loader/> :alltermDatesListError  ?  <Result
              status="500"
              title="500"
              subTitle="Sorry, something went wrong."
            /> :
        
          <Row>
        {/* <Col md={12}>
                <Button type='primary' className='w-100 my-2' onClick={showModalToDo}> <IoIosAddCircle className='mx-2 ' />Add Event</Button>

                <Modal
      title="Add Event"
      visible={visible}
      onCancel={handleCancel}
      onOk={handleFormSubmit}
      footer={[
       
      ]}
    >
<Form 
onFinish={onFinish}
layout='vertical'
>
      <Row gutter={16}>
     
        <Col className="my-2" md={12}>
          <Form.Item
            name="name"
            label="Event Name"
            rules={[{ required: true, message: 'Please input the event name!' }]}
          >
            <Input placeholder="Enter event name" />
          </Form.Item>
        </Col>
        <Col className="my-2" md={12}>
          <Form.Item
            name="description"
            label="Description"
          >
            <TextArea placeholder="Enter description" />
          </Form.Item>
        </Col>
        <Col className="my-2" md={6}>
          <Form.Item
            name="startDate"
            label="Start Date"
            rules={[{ required: true, message: 'Please select the start date!' }]}
          >
            <DatePicker
              placeholder="Select start date"
              style={{ width: '100%' }}
              format="YYYY-MM-DD"
            />
          </Form.Item>
        </Col>
        <Col className="my-2" md={6}>
          <Form.Item
            name="endDate"
            label="End Date"
            rules={[{ required: true, message: 'Please select the end date!' }]}
          >
            <DatePicker
              placeholder="Select end date"
              style={{ width: '100%' }}
              format="YYYY-MM-DD"
            />
          </Form.Item>
        </Col>
        <Col md={12}>
          <Form.Item>
            <Button type="primary" className='w-100' htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Col>
      </Row>
    </Form>
    </Modal>

              </Col> */}

              <Card>
                <Row>
                <Col md={12}>
        <MyCalendar  />

<Modal
  title="Event Details"
  visible={isModalOpen}
  onOk={() => setIsModalOpen(false)}
  onCancel={() => setIsModalOpen(false)}
>
  {currentEvent ? (
    <>
      <p><strong>Title:</strong> {currentEvent.title}</p>
      <p><strong>Start Date:</strong> {moment(currentEvent.startDate).format('YYYY-MM-DD HH:mm')}</p>
      <p><strong>End Date:</strong> {moment(currentEvent.endDate).format('YYYY-MM-DD HH:mm')}</p>
      <p><strong>Description:</strong> {currentEvent.description}</p>
    </>
  ) : (
    <p>No event details available.</p>
  )}
</Modal>
              </Col>
                </Row>
              </Card>
             
             
              </Row>
            }
  
       
     

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

export default TermScheduleScreen;

function renderEventContent(eventInfo) {

  const showModalx = () => {
    setIsModalOpen(true);
  };


  return (
    <>
    <Badge className='w-100' type="primary">{eventInfo.event.title}</Badge>
    </>
  )
}