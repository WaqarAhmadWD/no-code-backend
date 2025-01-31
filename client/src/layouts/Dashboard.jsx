import  { useState } from 'react';

import Sidebar from '../components/dashboard/Sidebar';
import Header from '../components/dashboard/Header';
// import FilterButton from '../components/DropdownFilter';
// import Datepicker from '../components/Datepicker';
// import DashboardCard01 from '../components/dashboard/cards/DashboardCard01';
// import DashboardCard05 from '../components/dashboard/cards/DashboardCard05';
// import DashboardCard06 from '../components/dashboard/cards/DashboardCard06';
// import DashboardCard07 from '../components/dashboard/cards/DashboardCard07';
// import DashboardCard08 from '../components/dashboard/cards/DashboardCard08';
// import DashboardCard09 from '../components/dashboard/cards/DashboardCard09';
// import DashboardCard10 from '../components/dashboard/cards/DashboardCard10';
// import DashboardCard11 from '../components/dashboard/cards/DashboardCard11';
// import DashboardCard12 from '../components/dashboard/cards/DashboardCard12';
// import DashboardCard13 from '../components/dashboard/cards/DashboardCard13';
import Footer from '../components/dashboard/Footer';
import PropTypes from 'prop-types';
Dashboard.propTypes = {
  Element: PropTypes.elementType,
  permissions: PropTypes.func,
};

function Dashboard({Element,permissions}) {

  const [sidebarOpen, setSidebarOpen] = useState(false);
 
  return (
    <>
      <div className="flex h-screen overflow-hidden">

        {/* Sidebar */}
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        {/* Content area */}
        <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">

          {/*  Site header */}
          <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

          <Element permissions={permissions}/>

        </div>
      </div>
      <Footer />
    </>
  );
}

export default Dashboard;