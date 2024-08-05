import React, { useEffect, useState } from 'react';
import { Button, message, Table, Tag } from 'antd';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import AddIncidentModal from './AddIncidentModal';
import { useIncidentMutation } from '../../features/incidentApi';

const CivilianIncidentReport = () => {
  const [visible, setVisible] = useState(false);
  const [incidents, setIncidents] = useState([]);
  const [incident, { isLoading, error, data: dataR }] = useIncidentMutation();

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

  const dataSource = [
    // Sample data
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
  ];

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
    <div className="row align-items-stretch">
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

      <div className="c-dashboardInfo col-lg-12 col-md-12">
        <div className="wrap">
          <Table dataSource={dataSource} columns={columns} />
        </div>
      </div>
    </div>
  );
};

export default CivilianIncidentReport;
