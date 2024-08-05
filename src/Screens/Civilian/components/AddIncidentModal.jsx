import React from 'react';
import { Form, Input, Select, DatePicker, TimePicker, Modal } from 'antd';
import moment from 'moment';

const { Option } = Select;

const AddIncidentModal = ({ visible, onCreate, onCancel }) => {
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    console.log("values:", values);
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

export default AddIncidentModal;
