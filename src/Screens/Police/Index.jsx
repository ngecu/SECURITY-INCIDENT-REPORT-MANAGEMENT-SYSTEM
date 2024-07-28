import { Col, Row, Table } from "react-bootstrap";

const PoliceIndex = () => {
  let user = localStorage.getItem('login')
  user = JSON.parse(user)

    return (
<div class="row align-items-stretch">
<div class="c-dashboardInfo col-lg-12 col-md-12">
  <div class="wrap">
    <Row>
    <Col md={6} className="d-flex justify-content-center align-items-center">
      <h1 className=''>{user.firstName} {user.lastName} </h1>
  </Col>
      <Col md={6}>
      <h4 class="heading heading5 hind-font medium-font-weight c-dashboardInfo__title">Rank<svg
        class="MuiSvgIcon-root-19" focusable="false" viewBox="0 0 24 24" aria-hidden="true" role="presentation">
        <path fill="none" d="M0 0h24v24H0z"></path>
        <path
          d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z">
        </path>
      </svg></h4><span class="hind-font caption-12 c-dashboardInfo__count"> {user.rank}</span>
      <span>Police Grade : <span class="badge badge-secondary">{user.policeGrade}</span> </span>
      </Col>
    
    </Row>
  
  </div>
</div>

<div class="c-dashboardInfo col-lg-6 col-md-6">
  <div class="wrap">
    <h4 class="heading heading5 hind-font medium-font-weight c-dashboardInfo__title">INCIDENT SUMMARY </h4>
    <Table> 
      
    </Table>

  </div>
</div>

<div class="c-dashboardInfo col-lg-6 col-md-6">
  <div class="wrap">
    <h4 class="heading heading5 hind-font medium-font-weight c-dashboardInfo__title">Next Duty</h4>
    
  </div>
</div>

</div>
    )
}

export default PoliceIndex;