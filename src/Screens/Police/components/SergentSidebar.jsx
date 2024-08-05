import React from 'react';
import { Nav } from 'react-bootstrap';

const SergeantSidebar = () => (
  <Nav className="flex-column">
    <Nav.Link href="/dashboard">Dashboard</Nav.Link>
    <Nav.Link href="/occurrence-book">Occurrence Book</Nav.Link>
    <Nav.Link href="/reports">Reports</Nav.Link>
    <Nav.Link href="/team-management">Team Management</Nav.Link>
    {/* Add other links relevant to Sergeant */}
  </Nav>
);

export default SergeantSidebar;
