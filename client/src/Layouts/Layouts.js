// Layouts.js

import React, { useState } from 'react';
import Topnav from './Topnav'; 
import SideNav from './SideNav';
import Footer from './Footer';

function Layouts({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const receiveDataFromSideNav = (data) => {
    setIsSidebarOpen(data);
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Topnav */}
      <Topnav />

      {/* Main Content */}
      <div className="flex flex-row">
        {/* SideNav */}
        <div className='w-full lg:w-1/5'>
          <SideNav sendDataToLayout={receiveDataFromSideNav} />
        </div>

        {/* Main Content */}
        <div className={` w-full ${isSidebarOpen ? 'open' : 'close'}   transition-all ease-in-out duration-300`}>
          {children}
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default Layouts;
