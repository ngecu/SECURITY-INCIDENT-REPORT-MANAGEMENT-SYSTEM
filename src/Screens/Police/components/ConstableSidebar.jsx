import React from 'react';
import { Nav } from 'react-bootstrap';

const ConstableSidebar = () => (
  <Nav className="flex-column">
    <Nav.Link href="/dashboard">Dashboard</Nav.Link>
    <Nav.Link href="/occurrence-book">Occurrence Book</Nav.Link>
    <Nav.Link href="/reports">Reports</Nav.Link>
    {/* Add other links relevant to Constable */}
  </Nav>
);

export default ConstableSidebar;
