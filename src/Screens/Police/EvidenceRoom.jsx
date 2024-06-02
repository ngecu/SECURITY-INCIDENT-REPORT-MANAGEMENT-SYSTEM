import React, { useState } from 'react';
import 'react-calendar/dist/Calendar.css';

import { Button, Modal, Form, Input, Select, DatePicker, TimePicker, Upload, message, Table, Tag, Space } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import moment from 'moment';

const { Option } = Select;

const AddEvidenceModal = ({ visible, onCreate, onCancel }) => {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);

  const handleUploadChange = ({ fileList }) => {
    setFileList(fileList);
  };

  return (
    <Modal
      visible={visible}
      title="Add Evidence"
      okText="Submit"
      cancelText="Cancel"
      onCancel={onCancel}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            form.resetFields();
            onCreate({ ...values, files: fileList });
            setFileList([]);
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
          label="Reported By"
          rules={[{ required: true, message: 'Please enter the reporter\'s name!' }]}
        >
          <Input placeholder="Enter your name" />
        </Form.Item>

        

        <Form.Item
          name="evidenceFiles"
          label="Upload Evidence"
          rules={[{ required: true, message: 'Please upload evidence files!' }]}
        >
          <Upload
            multiple
            beforeUpload={() => false}
            fileList={fileList}
            onChange={handleUploadChange}
          >
            <Button icon={<UploadOutlined />}>Upload (PDF/Word/Image)</Button>
          </Upload>
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

const EvidenceRoom = () => {
  const [visible, setVisible] = useState(false);
  const [incidents, setIncidents] = useState([]);

  const onCreate = (values) => {
    const newIncident = {
      ...values,
      date: values.date.format('YYYY-MM-DD'),
      time: values.time.format('HH:mm'),
      status: 'Open',
      key: incidents.length + 1,
    };
    setIncidents([...incidents, newIncident]);
    setVisible(false);
    message.success('Incident reported successfully!');
  };

  const handleDownload = (file) => {
   
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
      title: 'Reported By',
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
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <Space size="middle">
          <a onClick={() => handleDownload(record.files[0])}>Download</a>
        </Space>
      ),
    },
  ];

  return (
    <div className="row align-items-stretch">
      <div>
        <Button
          type="primary"
          className="my-2 w-100"
          onClick={() => {
            setVisible(true);
          }}
        >
          Add Evidence
        </Button>
        <AddEvidenceModal
          visible={visible}
          onCreate={onCreate}
          onCancel={() => {
            setVisible(false);
          }}
        />
      </div>

      <div className="c-dashboardInfo col-lg-12 col-md-12">
        <div className="wrap">
          <Table dataSource={incidents} columns={columns} />
        </div>
      </div>
    </div>
  );
};

export default EvidenceRoom;
