import React, { useState } from 'react';
import 'react-calendar/dist/Calendar.css';
import { Button, Modal, Form, Input, Select, DatePicker, TimePicker, message, Table, Tag, Space } from 'antd';
import moment from 'moment';
import { Calendar, momentLocalizer } from "react-big-calendar";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";


import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment);
const DnDCalendar = withDragAndDrop(Calendar);

const { Option } = Select;

const AddDutyModal = ({ visible, onCreate, onCancel }) => {
  const [form] = Form.useForm();

  return (
    <Modal
      visible={visible}
      title="Assign New Duty"
      okText="Assign"
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
        name="duty_form"
        initialValues={{
          date: moment(),
          time: moment(),
        }}
      >
        <Form.Item
          name="officer"
          label="Officer"
          rules={[{ required: true, message: 'Please select an officer!' }]}
        >
          <Select placeholder="Select an officer">
            <Option value="Officer 1">Officer 1</Option>
            <Option value="Officer 2">Officer 2</Option>
            <Option value="Officer 3">Officer 3</Option>
            <Option value="Officer 4">Officer 4</Option>
            <Option value="Officer 5">Officer 5</Option>
            <Option value="Officer 6">Officer 6</Option>
          </Select>
        </Form.Item>

        <Form.Item
          name="dutyType"
          label="Duty Type"
          rules={[{ required: true, message: 'Please select the duty type!' }]}
        >
          <Select placeholder="Select a duty type">
            <Option value="Patrol Shift 1">Patrol Shift 1</Option>
            <Option value="Patrol Shift 2">Patrol Shift 2</Option>
            <Option value="Patrol Shift 3">Patrol Shift 3</Option>
            <Option value="Desk Duty">Desk Duty</Option>
            <Option value="Investigation">Investigation</Option>
            <Option value="Training">Training</Option>
          </Select>
        </Form.Item>

        <Form.Item
          name="date"
          label="Date"
          rules={[{ required: true, message: 'Please select a date!' }]}
        >
          <DatePicker />
        </Form.Item>

        <Form.Item
          name="time"
          label="Time"
          rules={[{ required: true, message: 'Please select a time!' }]}
        >
          <TimePicker />
        </Form.Item>
      </Form>
    </Modal>
  );
};

const DutyRotation = () => {
  const [visible, setVisible] = useState(false);
  const [duties, setDuties] = useState([
    {
      start: moment().toDate(),
      end: moment().add(1, "days").toDate(),
      title: "Some title",
    },
  ],);
  const [selectedDate, setSelectedDate] = useState(new Date());


  const onEventResize = (data) => {
    const { start, end } = data;

    this.setState((state) => {
      state.events[0].start = start;
      state.events[0].end = end;
      return { events: [...state.events] };
    });
  };

  const onEventDrop = (data) => {
    console.log(data);
  };

  const onCreate = (values) => {
    const newDuty = {
      ...values,
      date: values.date.format('YYYY-MM-DD'),
      time: values.time.format('HH:mm'),
    };
    setDuties([...duties, newDuty]);
    setVisible(false);
    message.success('Duty assigned successfully!');
  };

  const onDateChange = (date) => {
    setSelectedDate(date);
    setVisible(true);
  };

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
      title: 'Officer',
      dataIndex: 'officer',
      key: 'officer',
    },
    {
      title: 'Duty Type',
      dataIndex: 'dutyType',
      key: 'dutyType',
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <Space size="middle">
          <a>Edit</a>
          <a>Delete</a>
        </Space>
      ),
    },
  ];

  return (
    <div className="row align-items-stretch">
      <div className="c-dashboardInfo col-lg-12 col-md-12">
        <div className="wrap">
        <DnDCalendar
          defaultDate={moment().toDate()}
          defaultView="month"
          events={duties}
          localizer={localizer}
          onEventDrop={onEventDrop}
          onEventResize={onEventResize}
          resizable
          style={{ height: "100vh" }}
        />
        </div>
      </div>
      
      <div className="c-dashboardInfo col-lg-12 col-md-12">
        <div className="wrap">
          <Table dataSource={duties} columns={columns} />
        </div>
      </div>
      
      <AddDutyModal
        visible={visible}
        onCreate={onCreate}
        onCancel={() => {
          setVisible(false);
        }}
      />
    </div>
  );
};

export default DutyRotation;
