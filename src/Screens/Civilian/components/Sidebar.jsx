import React from 'react';
import { CDBSidebar, CDBSidebarContent, CDBSidebarFooter, CDBSidebarHeader, CDBSidebarMenu, CDBSidebarMenuItem } from 'cdbreact';
import { FiLogOut } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <CDBSidebar>
      <CDBSidebarHeader>Dashboard</CDBSidebarHeader>
      <CDBSidebarContent>
        <CDBSidebarMenu>
          <CDBSidebarMenuItem>
            <Link to="/">Home</Link>
          </CDBSidebarMenuItem>
          <CDBSidebarMenuItem>
            <Link to="/incident-report">Report Incident</Link>
          </CDBSidebarMenuItem>
          <CDBSidebarMenuItem>
            <Link to="/settings">Settings</Link>
          </CDBSidebarMenuItem>
          <CDBSidebarMenuItem icon={<FiLogOut />}>
            <Link to="/logout">Logout</Link>
          </CDBSidebarMenuItem>
        </CDBSidebarMenu>
      </CDBSidebarContent>
      <CDBSidebarFooter>
        Footer Content
      </CDBSidebarFooter>
    </CDBSidebar>
  );
};

export default Sidebar;
