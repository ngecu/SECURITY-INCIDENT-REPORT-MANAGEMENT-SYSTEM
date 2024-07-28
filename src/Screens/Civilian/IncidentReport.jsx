import 'react-calendar/dist/Calendar.css';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Modal, Form, Input, Select, DatePicker, TimePicker, message } from 'antd';
import moment from 'moment';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import {    Space, Table, Tag } from 'antd';
import { useEffect, useState } from 'react';
import { useIncidentMutation } from '../../features/incidentApi';


const AddIncidentModal = ({ visible, onCreate, onCancel }) => {
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    console.log("values is ",values);
  };

  return (
    <Modal
      visible={visible}
      title="Report New Incident"
      okText="Submit"
      cancelText="Cancel"
      onCancel={onCancel}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            form.resetFields();
            onCreate(values);
          })
          .catch((info) => {
            console.log('Validate Failed:', info);
          });
      }}
    >
      <Form
        form={form}
        layout="vertical"
        name="incident_form"
        initialValues={{
          status: 'Open',
          date: moment(),
          time: moment(),
        }}
        onFinish={onFinish}
      >
        <Form.Item
          name="incidentType"
          label="Incident Type"
          rules={[{ required: true, message: 'Please select the incident type!' }]}
        >
          <Select placeholder="Select an incident type">
            <Option value="Theft">Theft</Option>
            <Option value="Assault">Assault</Option>
            <Option value="Robbery">Robbery</Option>
            <Option value="Burglary">Burglary</Option>
            <Option value="Vandalism">Vandalism</Option>
            <Option value="Accident">Accident</Option>
            <Option value="Fraud">Fraud</Option>
            <Option value="Arson">Arson</Option>
          </Select>
        </Form.Item>

        <Form.Item
          name="description"
          label="Description"
          rules={[{ required: true, message: 'Please enter a description!' }]}
        >
          <Input.TextArea placeholder="Describe the incident..." />
        </Form.Item>

        <Form.Item
          name="reportedBy"
          label="Reported To"
          rules={[{ required: true, message: 'Please enter the reporter\'s name!' }]}
        >
          <Input placeholder="Enter your name" />
        </Form.Item>

        <Form.Item
          name="date"
          label="Date"
          style={{ display: 'none' }}
        >
          <DatePicker />
        </Form.Item>

        <Form.Item
          name="time"
          label="Time"
          style={{ display: 'none' }}
        >
          <TimePicker />
        </Form.Item>

        <Form.Item
          name="status"
          label="Status"
          style={{ display: 'none' }}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};

const CivilianIncidentReport = () => {

  const [visible, setVisible] = useState(false);
  const [incidents, setIncidents] = useState([]);
  const [incident, { isLoading, error, data:dataR }] = useIncidentMutation();

  useEffect(() => {
    if (error) {
      message.error('Incident Report Submission Failed!!');
    }
    if (dataR) {
        message.success('Incident reported successfully!');
        setVisible(false);
    }
  }, [error, dataR]);

  
  const onCreate = async (values) => {
    const newIncident = {
      ...values,
      date: values.date.format('YYYY-MM-DD'),
      time: values.time.format('HH:mm'),
      status: 'Open',
    };
    await incident(newIncident);

    setIncidents([...incidents, newIncident]);
   
  };

  const dispatch = useDispatch()

  ChartJS.register(ArcElement, Tooltip, Legend);
  const cancel = (e) => {
    console.log(e);
    // message.error('Click on No');
  };


  const data = {
    labels: ['Fully Paid', 'Partially Paid', 'Unpaid'],
    datasets: [
      {
        data: [300, 150, 50], // Example data, replace with your actual data
        backgroundColor: ['#36A2EB', '#FFCE56', '#FF6384'], // Example colors, customize as needed
        hoverBackgroundColor: ['#36A2EB', '#FFCE56', '#FF6384'],
      },
    ],
  };
  
  const options = {
    responsive: true,
    maintainAspectRatio: false,
  };

  const [dataSource, setDataSource] = useState([
    {
      key: '1',
      date: '2024-05-21',
      time: '14:30',
      incidentType: 'Theft',
      description: 'Reported theft of a bicycle.',
      reportedBy: 'John Doe',
      status: 'Open',
    },
    {
      key: '2',
      date: '2024-05-21',
      time: '15:00',
      incidentType: 'Assault',
      description: 'Reported physical assault in market area.',
      reportedBy: 'Jane Smith',
      status: 'In Progress',
    },

    {
      key: '1',
      date: '2024-05-21',
      time: '14:30',
      incidentType: 'Theft',
      description: 'Reported theft of a bicycle.',
      reportedBy: 'John Doe',
      status: 'Open',
    },
    {
      key: '2',
      date: '2024-05-21',
      time: '15:00',
      incidentType: 'Assault',
      description: 'Reported physical assault in market area.',
      reportedBy: 'Jane Smith',
      status: 'In Progress',
    },


    {
      key: '1',
      date: '2024-05-21',
      time: '14:30',
      incidentType: 'Theft',
      description: 'Reported theft of a bicycle.',
      reportedBy: 'John Doe',
      status: 'Open',
    },
    {
      key: '2',
      date: '2024-05-21',
      time: '15:00',
      incidentType: 'Assault',
      description: 'Reported physical assault in market area.',
      reportedBy: 'Jane Smith',
      status: 'In Progress',
    },


    {
      key: '1',
      date: '2024-05-21',
      time: '14:30',
      incidentType: 'Theft',
      description: 'Reported theft of a bicycle.',
      reportedBy: 'John Doe',
      status: 'Open',
    },
    {
      key: '2',
      date: '2024-05-21',
      time: '15:00',
      incidentType: 'Assault',
      description: 'Reported physical assault in market area.',
      reportedBy: 'Jane Smith',
      status: 'In Progress',
    },


    {
      key: '1',
      date: '2024-05-21',
      time: '14:30',
      incidentType: 'Theft',
      description: 'Reported theft of a bicycle.',
      reportedBy: 'John Doe',
      status: 'Open',
    },
    {
      key: '2',
      date: '2024-05-21',
      time: '15:00',
      incidentType: 'Assault',
      description: 'Reported physical assault in market area.',
      reportedBy: 'Jane Smith',
      status: 'In Progress',
    },
    // Add more entries as needed
  ]);

  // Define columns for the table
  const columns = [
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: 'Time',
      dataIndex: 'time',
      key: 'time',
    },
    {
      title: 'Incident Type',
      dataIndex: 'incidentType',
      key: 'incidentType',
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Reported To',
      dataIndex: 'reportedBy',
      key: 'reportedBy',
    },
    {
      title: 'Status',
      key: 'status',
      dataIndex: 'status',
      render: status => {
        let color = status === 'Open' ? 'volcano' : status === 'In Progress' ? 'geekblue' : 'green';
        return (
          <Tag color={color} key={status}>
            {status.toUpperCase()}
          </Tag>
        );
      },
    }
  ];

  return (

  <div class="row align-items-stretch">

  <div>
      <Button
        type="primary"
        className='my-2 w-100'
        onClick={() => {
          setVisible(true);
        }}
      >
        Report Incident
      </Button>
      <AddIncidentModal
        visible={visible}
        onCreate={onCreate}
        onCancel={() => {
          setVisible(false);
        }}
      />
    </div>

      <div class="c-dashboardInfo col-lg-12 col-md-12">
        <div class="wrap">
        <Table dataSource={dataSource} columns={columns} />
        
        </div>
      </div>
     
   
     
    </div>

  );
};

export default CivilianIncidentReport;