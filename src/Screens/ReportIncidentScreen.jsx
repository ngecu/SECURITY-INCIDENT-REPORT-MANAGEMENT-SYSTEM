import { Form, Input, Checkbox, Typography, Select } from 'antd';
import { ToastContainer, toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { Col, Container, Row, Button } from 'react-bootstrap';
import { useEffect, useState } from 'react';

import {
  toLatLon,
  toLatitudeLongitude,
  headingDistanceTo,
  moveTo,
  insidePolygon,
} from 'geolocation-utils';

import Loader from '../Components/Loader';


const { Option } = Select;
const { Title } = Typography;

const incidentTypes = [
  'Theft',
  'Assault',
  'Robbery',
  'Burglary',
  'Vandalism',
  'Accident',
  'Fraud',
  'Arson'
];

const ReportIncidentScreen = () => {

  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [error, setError] = useState(null);
  const [loading,setLoading]= useState(null);
  const [address, setAddress] = useState(null)

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLatitude(position.coords.latitude);
          setLongitude(position.coords.longitude);

       
          setAddress(`${position.coords.latitude}, ${position.coords.longitude}`);

        },
        (error) => {
          setError(error.message);
        }
      );
    } else {
      setError('Geolocation is not supported by this browser.');
    }
  };


  useEffect(() => {


    getLocation();
  }, []);


  const onFinish = (values) => {
    const { incidentType, phoneNumber, description } = values;
    // Dispatch your report incident action here
    console.log('Incident Reported: ', { incidentType, phoneNumber, description });
  };

  const getCurrentYear = () => {
    return new Date().getFullYear();
  };

  return (
    <>

        <div style={{ background: '#E6F4FF' }}>
          <Container style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <div style={{ boxShadow: 'rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px', padding: '20px', width: '800px', background: '#fff', borderRadius: '20px' }}>
              {loading ? <Loader /> :
                <Row>
                  <Col md={12} className='text-center'>
                    <h1 style={{ color: '#252664' }}>NATIONAL POLICE SERVICE</h1>
                    Emergency Incident Reporting
                  </Col>
                  <Col md={6}>
                  <small className="text-danger">
                      *please accept the location permission for us to capture your location 
                    </small>
                    <Form
                      className="w-100"
                      name="incident_report"
                      layout="vertical"
                      initialValues={{ remember: true }}
                      onFinish={onFinish}
                    >
                      <Form.Item
                        label="Incident Type"
                        name="incidentType"
                        rules={[{ required: true, message: 'Please select the incident type!' }]}
                      >
                        <Select
                          showSearch
                          placeholder="Select an incident type"
                          optionFilterProp="children"
                          filterOption={(input, option) =>
                            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                          }
                        >
                          {incidentTypes.map((type) => (
                            <Option key={type} value={type}>{type}</Option>
                          ))}
                        </Select>
                      </Form.Item>

                      <Form.Item
                        label="Phone Number"
                        name="phoneNumber"
                        rules={[{ required: true, message: 'Please input your phone number!' }]}
                      >
                        <Input placeholder="e.g. 0712345678" />
                      </Form.Item>


                      <Row>
                        <Col md={12}>
                          <Form.Item
                            wrapperCol={{
                              offset: 0,
                              span: 32,
                            }}
                          >
                            <Button variant='primary' className='w-100 my-2' type="submit" style={{ background: '#722E22', borderRadius: '70px' }}>
                              Report Incident
                            </Button>
                          </Form.Item>
                        </Col>
                      </Row>
                    </Form>
                  </Col>
                  <Col md={6} className="d-none d-md-block">
                    <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSP0aFa8XUS06MWb6GeRc85s-Ya8cUGo2J1ZWo63CGwrg&s' alt="" className='w-100' />
                  </Col>
                </Row>
              }
            </div>
          </Container>
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
    </>
  );
};

export default ReportIncidentScreen;
