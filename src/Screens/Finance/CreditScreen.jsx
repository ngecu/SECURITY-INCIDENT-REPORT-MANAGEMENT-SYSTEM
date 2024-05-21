import { Card, Input } from 'antd';
import { Link } from 'react-router-dom';
import { FaEye } from 'react-icons/fa';
import { Table } from 'react-bootstrap';
import Topbar from './components/Topbar';
import Sidebar2 from './components/Sidebar2';

const CreditScreen = () => {
  const { Search } = Input;

  const handleSearch = (value) => {
    console.log('Search:', value);
    // Implement your search logic here
  };
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
  return (
    <div className="container-fluid">
      <div className="row">
      <div class="sidebar border border-right col-md-3 col-lg-2 p-0 bg-body-tertiary bg-primary">
        <div class="offcanvas-md offcanvas-end bg-body-tertiary" tabindex="-1" id="sidebarMenu" aria-labelledby="sidebarMenuLabel">
          
          <div class="offcanvas-body d-md-flex flex-column p-0 pt-lg-3 overflow-y-auto">
            <Sidebar2/>
  
       
          </div>
        </div>
      </div>

        <main className="col-md-9 col-lg-10 px-md-4 main-content">
        <Topbar/>
          <Card>
            <div className="w-100">
              <Search
                placeholder="Search by student Admission No."
                enterButton="Search"
                size="large"
                onSearch={handleSearch}
              />
            </div>

            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Student</th>
                  <th>Date & Time</th>
                  <th>Amount</th>
                  <th>Phone Number</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {data.map((item) => (
                  <tr key={item.id}>
                    <td>{item.name}</td>
                    <td>{item.dateTime}</td>
                    <td>{item.amount}</td>
                    <td>{item.phoneNumber}</td>
                    <td>{item.status}</td>
                    <td>
                      <Link to={`${item.id}`} className="ant-btn ant-btn-default">
                        <FaEye />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Card>
        </main>
      </div>
    </div>
  );
};

export default CreditScreen;
