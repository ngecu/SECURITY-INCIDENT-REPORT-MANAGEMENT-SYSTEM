import React from 'react';
import { Col, Row, Table } from "react-bootstrap";

const CivilianIndex = () => {
  let user = localStorage.getItem('login');
  user = JSON.parse(user);

  return (
    <div className="row align-items-stretch">
      <div className="c-dashboardInfo col-lg-12 col-md-12">
        <div className="wrap">
          <Row>
            <Col md={6} className="d-flex justify-content-center align-items-center">
              <h1>{user.firstName} {user.lastName}</h1>
            </Col>
            <Col md={6}>
              <img src="https://media.istockphoto.com/id/1386479313/photo/happy-millennial-afro-american-business-woman-posing-isolated-on-white.webp?b=1&s=170667a&w=0&k=20&c=ahypUC_KTc95VOsBkzLFZiCQ0VJwewfrSV43BOrLETM=" style={{borderRadius:"50%"}} width={120} height={100} alt="" />
            </Col>
          </Row>
        </div>
      </div>

      <div className="c-dashboardInfo col-lg-12 col-md-12">
        <div className="wrap">
          <h4 className="heading heading5 hind-font medium-font-weight c-dashboardInfo__title">MY INCIDENTS SUMMARY</h4>
          <Table>
            {/* Add table content here */}
          </Table>
        </div>
      </div>
    </div>
  );
};

export default CivilianIndex;
