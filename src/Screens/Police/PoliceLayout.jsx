import React from 'react';
import Topbar from './components/Topbar';
import { Outlet } from 'react-router-dom';
import ConstableSidebar from './components/ConstableSidebar';
import SergeantSidebar from './components/SergeantSidebar';
import InspectorSidebar from './components/InspectorSidebar';
import ConstableDashboard from './components/ConstableDashboard';
import SergeantDashboard from './components/SergeantDashboard';
import InspectorDashboard from './components/InspectorDashboard';

const PoliceLayout = () => {
  const user = JSON.parse(localStorage.getItem('login'));
  const { rank } = user;

  const renderSidebar = () => {
    switch (rank) {
      case 'Constable':
        return <ConstableSidebar />;
      case 'Sergeant':
        return <SergeantSidebar />;
      case 'Inspector':
        return <InspectorSidebar />;
      default:
        return null;
    }
  };

  const renderDashboard = () => {
    switch (rank) {
      case 'Constable':
        return <ConstableDashboard />;
      case 'Sergeant':
        return <SergeantDashboard />;
      case 'Inspector':
        return <InspectorDashboard />;
      default:
        return null;
    }
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="sidebar border border-right col-md-3 col-lg-2 p-0 bg-body-tertiary bg-primary">
          <div className="offcanvas-md offcanvas-end bg-body-tertiary" tabIndex="-1" id="sidebarMenu" aria-labelledby="sidebarMenuLabel">
            <div className="offcanvas-body d-md-flex flex-column p-0 pt-lg-3 overflow-y-auto">
              {renderSidebar()}
            </div>
          </div>
        </div>
        <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4 main-content">
          <Topbar />
          {renderDashboard()}
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default PoliceLayout;
