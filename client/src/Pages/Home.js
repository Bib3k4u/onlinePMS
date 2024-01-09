import React, { useState, useEffect } from 'react';
import Layouts from '../Layouts/Layouts';
import HomeIcons from '../Components/HomeIcons';
import { useLocation } from 'react-router-dom';
import filteredHomeData from './../utility/HomData'; // Correct the import path

function Home() {
  const location = useLocation();
  const [filteredHomeDatas, setfilteredHomeDatas] = useState([]);
  
  // useEffect(() => {
  //   getfilteredHomeData();
  // }, [location]);

  // const getfilteredHomeData = () => {
  //   const { pathname } = location;

  //   if (pathname.startsWith('/Home')) {
  //     setfilteredHomeDatas(filteredHomeData.filter((item)=>item.category.includes('admin')));
  //   } else if (pathname === '/s/Home') {
  //     const temp = filteredHomeData.filter((item) => item.category.includes('student'));
  //     setfilteredHomeDatas(temp);
  //   }
  //   else if (pathname === '/g/Home') {
  //     const temp = filteredHomeData.filter((item) => item.category.includes('guide'));
  //     setfilteredHomeDatas(temp);
  //   }
  //   else if (pathname === '/r/Home') {
  //     const temp = filteredHomeData.filter((item) => item.category.includes('reviewer'));
  //     setfilteredHomeDatas(temp);
  //   }
  //   else if (pathname === '/p/Home') {
  //     const temp = filteredHomeData.filter((item) => item.category.includes('project'));
  //     setfilteredHomeDatas(temp);
  //   }
  //   else if (pathname === '/t/Home') {
  //     const temp = filteredHomeData.filter((item) => item.category.includes('teacher'));
  //     setfilteredHomeDatas(temp);
  //   }
  // };



  return (
    <Layouts>
      <div className='grid grid-cols-1 lg:grid-cols-3 md:grid-cols-4 items-center justify-between gap-10 p-10' style={{ zIndex: 0 }}>
        {filteredHomeData.map((data, key) => (
          <div key={key}>
            <HomeIcons src={data.src} title={data.title} toRoute={data.toRoute} />
          </div>
        ))}
      </div>
    </Layouts>
  );
}

export default Home;
