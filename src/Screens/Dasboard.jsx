import { Dropdown, Menu } from 'antd';
import { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { FaHome, FaChalkboardTeacher, FaUserTie, FaBullhorn, FaStore, FaMoneyBillAlt, FaUserGraduate, FaCog, FaQuestionCircle, FaUserCog, FaSignOutAlt,FaEnvelope, FaBell, FaSearch } from 'react-icons/fa';
import { Bar, Line } from '@ant-design/charts';
import { Container, Row, Col, Card, Image, Badge } from 'react-bootstrap';
import SidebarComponent from './Finance/components/Sidebar';

const SidebarLink = ({ icon, text }) => {

   

      
  return (
    <li className="mb-2">
      <a href="#" className="flex items-center text-gray-100 hover:text-white">
        {icon}
        <span className="ml-2">{text}</span>
      </a>
    </li>
  );
};

const menu = (
    <Menu>
      <Menu.Item key="1">Option 1</Menu.Item>
      <Menu.Item key="2">Option 2</Menu.Item>
      <Menu.Item key="3">Option 3</Menu.Item>
    </Menu>
  );

const Dashboard = () => {
    const data = [
        { year: '1991', value: 3 },
        { year: '1992', value: 4 },
        { year: '1993', value: 3.5 },
        { year: '1994', value: 5 },
        { year: '1995', value: 4.9 },
        { year: '1996', value: 6 },
        { year: '1997', value: 7 },
        { year: '1998', value: 9 },
        { year: '1999', value: 13 },
      ];
    
      const config = {
        data,
        height: 400,
        xField: 'year',
        yField: 'value',
      };


  const [value, onChange] = useState<Value>(new Date());
  return (
    <div className="flex h-screen bg-primary-100">
    {/* Sidebar */}
    <div className="w-64 bg-blue-500 text-gray-100 flex flex-col justify-between" >
       <SidebarComponent/>
      </div>
    
    <div className="flex flex-col flex-1">
    <div className="bg-gray-200 p-4 flex justify-between items-center">
      {/* Welcome text */}
      <div className="text-lg font-semibold">Welcome</div>
      

      <div className="flex items-center space-x-4">
        {/* Message icon */}
    

    <Dropdown overlay={<>
        <Menu>
      <Menu.Item key="1">Option 1</Menu.Item>
      <Menu.Item key="2">Option 2</Menu.Item>
      <Menu.Item key="3">Option 3</Menu.Item>
    </Menu>
    </>}>
        <FaEnvelope className="text-gray-600 ant-dropdown-link" onClick={e => e.preventDefault()} />
        </Dropdown>

        <Dropdown overlay={<>
        <Menu>
      <Menu.Item key="1">Option 1</Menu.Item>
      <Menu.Item key="2">Option 2</Menu.Item>
      <Menu.Item key="3">Option 3</Menu.Item>
    </Menu>
    </>}>
        <FaBell className="text-gray-600 ant-dropdown-link" onClick={e => e.preventDefault()} />
        </Dropdown>
        
        
        <Dropdown overlay={<>
        <Menu>
      <Menu.Item key="1">Option 1</Menu.Item>
      <Menu.Item key="2">Option 2</Menu.Item>
      <Menu.Item key="3">Option 3</Menu.Item>
    </Menu>
    </>}>
        <FaSearch className="text-gray-600 ant-dropdown-link" onClick={e => e.preventDefault()} />
        </Dropdown>
      </div>

    </div>
      
      {/* Main content */}
      <Container fluid className="d-flex flex-column flex-1 main-content">
      <Row className="my-2">
        <Col xs={4} md={4}>
          <Card className="shadow-lg h-100 rounded overflow-hidden">
            <Card.Body className="px-6 py-4">
              <Card.Title as="h2" className="font-bold text-xl mb-2">Card 1</Card.Title>
              <Card.Text className="text-gray-700 text-base">Content for Card 1</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        
        <Col xs={4} md={4}>
          <Card className="shadow-lg h-100 rounded overflow-hidden">
            <Card.Body className="px-6 py-4">
              <Card.Title as="h2" className="font-bold text-xl mb-2">Card 2</Card.Title>
              <Card.Text className="text-gray-700 text-base">Content for Card 2</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        
        <Col xs={4} md={4}>
          {/* Replace the Calendar component with your desired component */}
          <Card className="shadow-lg rounded overflow-hidden">
            <Card.Body className="p-0">
            <Calendar onChange={onChange} value={value} />
            </Card.Body>
          </Card>
        </Col>

      </Row>
        <Row>

            
        <Col xs={4} md={4}>
          <Card className="shadow-lg rounded overflow-hidden">
            <Card.Body className="px-6 py-4">
            <div class="flex items-center justify-between mb-4">
        <h5 class="text-xl font-bold leading-none text-gray-900 dark:text-white">Staff</h5>
        <a href="#" class="text-sm font-medium text-blue-600 hover:underline dark:text-blue-500">
            View all
        </a>
   </div>
   <div class="flow-root">
        <ul role="list" class="divide-y divide-gray-200 dark:divide-gray-700">
            <li class="py-3 sm:py-4">
                <div class="flex items-center">
                    <div class="flex-shrink-0">
                        <img class="w-8 h-8 rounded-full" src="https://randomuser.me/api/portraits/men/1.jpg" alt="Neil image"/>
                    </div>
                    <div class="flex-1 min-w-0 ms-4">
                        <p class="text-sm font-medium text-gray-900 truncate dark:text-white">
                            Neil Sims
                        </p>
                        <p class="text-sm text-gray-500 truncate dark:text-gray-400">
                            email@windster.com
                        </p>
                    </div>
                    <div class="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                    <Badge bg="primary">Primary</Badge>
                    </div>
                </div>
            </li>
            <li class="py-3 sm:py-4">
                <div class="flex items-center ">
                    <div class="flex-shrink-0">
                        <img class="w-8 h-8 rounded-full" src="https://randomuser.me/api/portraits/men/1.jpg" alt="Bonnie image"/>
                    </div>
                    <div class="flex-1 min-w-0 ms-4">
                        <p class="text-sm font-medium text-gray-900 truncate dark:text-white">
                            Bonnie Green
                        </p>
                        <p class="text-sm text-gray-500 truncate dark:text-gray-400">
                            email@windster.com
                        </p>
                    </div>
                    <div class="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                    <Badge bg="primary">Primary</Badge>
                    </div>
                </div>
            </li>
         
            <li class="py-3 sm:py-4">
                <div class="flex items-center ">
                    <div class="flex-shrink-0">
                        <img class="w-8 h-8 rounded-full" src="https://randomuser.me/api/portraits/men/1.jpg" alt="Bonnie image"/>
                    </div>
                    <div class="flex-1 min-w-0 ms-4">
                        <p class="text-sm font-medium text-gray-900 truncate dark:text-white">
                            Bonnie Green
                        </p>
                        <p class="text-sm text-gray-500 truncate dark:text-gray-400">
                            email@windster.com
                        </p>
                    </div>
                    <div class="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                    <Badge bg="primary">Primary</Badge>
                    </div>
                </div>
            </li>


            <li class="py-3 sm:py-4">
                <div class="flex items-center ">
                    <div class="flex-shrink-0">
                        <img class="w-8 h-8 rounded-full" src="https://randomuser.me/api/portraits/men/1.jpg" alt="Bonnie image"/>
                    </div>
                    <div class="flex-1 min-w-0 ms-4">
                        <p class="text-sm font-medium text-gray-900 truncate dark:text-white">
                            Bonnie Green
                        </p>
                        <p class="text-sm text-gray-500 truncate dark:text-gray-400">
                            email@windster.com
                        </p>
                    </div>
                    <div class="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                    <Badge bg="primary">Primary</Badge>
                    </div>
                </div>
            </li>
            <li class="py-3 sm:py-4">
                <div class="flex items-center ">
                    <div class="flex-shrink-0">
                        <img class="w-8 h-8 rounded-full" src="https://randomuser.me/api/portraits/men/1.jpg" alt="Bonnie image"/>
                    </div>
                    <div class="flex-1 min-w-0 ms-4">
                        <p class="text-sm font-medium text-gray-900 truncate dark:text-white">
                            Bonnie Green
                        </p>
                        <p class="text-sm text-gray-500 truncate dark:text-gray-400">
                            email@windster.com
                        </p>
                    </div>
                    <div class="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                    <Badge bg="primary">Primary</Badge>
                    </div>
                </div>
            </li>
            
        </ul>
   </div>

            </Card.Body>
          </Card>
        </Col>
        
        <Col xs={8} md={8}>
          <Card className="shadow-lg rounded overflow-hidden">
            <Card.Body className="px-6 py-4">
            
                <Row>
                    <Col md={4}>
                    <div class="max-w-xs">
    <div class="bg-white shadow-xl rounded-lg py-3">
        <div class="photo-wrapper p-2">
            <img class="w-32 h-32 rounded-full mx-auto" src="https://www.gravatar.com/avatar/2acfb745ecf9d4dccb3364752d17f65f?s=260&d=mp" alt="John Doe"/>
        </div>
        <div class="p-2">
            <h3 class="text-center text-xl text-gray-900 font-medium leading-8">Joh Doe</h3>
            <div class="text-center text-gray-400 text-xs font-semibold">
                <p>Web Developer</p>
            </div>
            <table class="text-xs my-3">
                <tbody><tr>
                    <td class="px-2 py-2 text-gray-500 font-semibold">Address</td>
                    <td class="px-2 py-2">Chatakpur-3, Dhangadhi Kailali</td>
                </tr>
                <tr>
                    <td class="px-2 py-2 text-gray-500 font-semibold">Phone</td>
                    <td class="px-2 py-2">+977 9955221114</td>
                </tr>
                <tr>
                    <td class="px-2 py-2 text-gray-500 font-semibold">Email</td>
                    <td class="px-2 py-2">john@exmaple.com</td>
                </tr>
            </tbody></table>

            <div class="text-center my-3">
                <a class="text-xs text-indigo-500 italic hover:underline hover:text-indigo-600 font-medium" href="#">View Profile</a>
            </div>

        </div>
    </div>
</div>
                    </Col>

<Col md={4}>
<div class="max-w-xs">
    <div class="bg-white shadow-xl rounded-lg py-3">
        <div class="photo-wrapper p-2">
            <img class="w-32 h-32 rounded-full mx-auto" src="https://www.gravatar.com/avatar/2acfb745ecf9d4dccb3364752d17f65f?s=260&d=mp" alt="John Doe"/>
        </div>
        <div class="p-2">
            <h3 class="text-center text-xl text-gray-900 font-medium leading-8">Joh Doe</h3>
            <div class="text-center text-gray-400 text-xs font-semibold">
                <p>Web Developer</p>
            </div>
            <table class="text-xs my-3">
                <tbody><tr>
                    <td class="px-2 py-2 text-gray-500 font-semibold">Address</td>
                    <td class="px-2 py-2">Chatakpur-3, Dhangadhi Kailali</td>
                </tr>
                <tr>
                    <td class="px-2 py-2 text-gray-500 font-semibold">Phone</td>
                    <td class="px-2 py-2">+977 9955221114</td>
                </tr>
                <tr>
                    <td class="px-2 py-2 text-gray-500 font-semibold">Email</td>
                    <td class="px-2 py-2">john@exmaple.com</td>
                </tr>
            </tbody></table>

            <div class="text-center my-3">
                <a class="text-xs text-indigo-500 italic hover:underline hover:text-indigo-600 font-medium" href="#">View Profile</a>
            </div>

        </div>
    </div>
</div>
</Col>


<Col md={4}>
<div class="max-w-xs">
    <div class="bg-white shadow-xl rounded-lg py-3">
        <div class="photo-wrapper p-2">
            <img class="w-32 h-32 rounded-full mx-auto" src="https://www.gravatar.com/avatar/2acfb745ecf9d4dccb3364752d17f65f?s=260&d=mp" alt="John Doe"/>
        </div>
        <div class="p-2">
            <h3 class="text-center text-xl text-gray-900 font-medium leading-8">Joh Doe</h3>
            <div class="text-center text-gray-400 text-xs font-semibold">
                <p>Web Developer</p>
            </div>
            <table class="text-xs my-3">
                <tbody><tr>
                    <td class="px-2 py-2 text-gray-500 font-semibold">Address</td>
                    <td class="px-2 py-2">Chatakpur-3, Dhangadhi Kailali</td>
                </tr>
                <tr>
                    <td class="px-2 py-2 text-gray-500 font-semibold">Phone</td>
                    <td class="px-2 py-2">+977 9955221114</td>
                </tr>
                <tr>
                    <td class="px-2 py-2 text-gray-500 font-semibold">Email</td>
                    <td class="px-2 py-2">john@exmaple.com</td>
                </tr>
            </tbody></table>

            <div class="text-center my-3">
                <a class="text-xs text-indigo-500 italic hover:underline hover:text-indigo-600 font-medium" href="#">View Profile</a>
            </div>

        </div>
    </div>
</div>

</Col>
                </Row>
            </Card.Body>
          </Card>
        </Col>

        </Row>

        <Row>

            
<Col xs={8} md={8}>
  <Card className="shadow-lg rounded overflow-hidden">
    <Card.Body className="px-6 py-4">
 <Bar  {...config} />

    </Card.Body>
  </Card>
</Col>

<Col xs={4} md={4}>
  <Card className="shadow-lg rounded overflow-hidden">
    <Card.Body className="px-6 py-4">
    
    </Card.Body>
  </Card>
</Col>

</Row>
      
    </Container>
      
      </div>
    </div>
 
  );
};

export default Dashboard;
