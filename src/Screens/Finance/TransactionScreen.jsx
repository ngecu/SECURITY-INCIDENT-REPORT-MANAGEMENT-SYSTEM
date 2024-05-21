import { Card, Input } from 'antd';
import { Link } from 'react-router-dom';
import { FaEye } from 'react-icons/fa';
import { Table } from 'react-bootstrap';
import Topbar from './components/Topbar';
import Sidebar2 from './components/Sidebar2';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { listTransactions } from '../../actions/transactionActions';
import Loader from '../../Components/Loader';

const TransactionScreen = () => {
  const dispatch = useDispatch()
  const [filteredTransactions, setFilteredTransactions] = useState([]);

  const transactionList = useSelector((state) => state.transactionList)
  const { loading: allTransactionsLoading, error: allTransactionsError, transactions, success: allTransactionsSuccess } = transactionList


  const { Search } = Input;

  const handleSearch = (value) => {
    console.log('Search:', value);
    // Implement your search logic here
  };

  useEffect(()=>{
    dispatch(listTransactions())
    
  },[])

  useEffect(() => {
    if (transactions && transactions.length > 0) {
      setFilteredTransactions(transactions); // Initialize filteredLeads with leads data
    }
  }, [transactions]);

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
        {allTransactionsLoading ? (
  <Loader />
) : (
          <Card>
                      <h1>All Transactions({filteredTransactions && filteredTransactions.length})</h1>

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
                  <th>Type</th>
                  <th>Transaction Type</th>
                  <th>Amount Paid</th>
                  <th>Amount Remaining</th>

                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
              {filteredTransactions.map((item, index) => (
         
         <tr key={item.id}>
          <td>{item.type}</td>
          <td>{item.transactionType}</td>
          <td>{item.amount_paid}</td>
          <td>{item.amount_remaining}</td>



          <td>
<Link to={`${item._id}`} className="ant-btn css-dev-only-do-not-override-11xg00t ant-btn-default">
  <FaEye />
</Link>     
</td>

          </tr>)
        )}
              </tbody>
            </Table>
          </Card>
)}
        </main>
      </div>
    </div>
  );
};

export default TransactionScreen;
