import React, { useState, useEffect } from 'react';
import Layouts from '../Layouts/Layouts';
import HomeIcons from '../Components/HomeIcons';
import { useLocation } from 'react-router-dom';
import homeData from './../utility/HomData'; // Correct the import path

function Home() {
  const location = useLocation();
  const [filteredHomeDatas, setfilteredHomeDatas] = useState([]);
  
  useEffect(() => {
    getfilteredHomeData();
  }, [location]);
  console.log(filteredHomeDatas);
  const getfilteredHomeData = () => {
    const { pathname } = location;

    if (pathname.startsWith('/Home')) {
      const temp = homeData.filter((item) => item.category.includes('Admin'));

      setfilteredHomeDatas(temp);
    } else if (pathname === '/s/Home') {
      const temp = homeData.filter((item) => item.category.includes('Student'));
      setfilteredHomeDatas(temp);
    }
    else if (pathname === '/g/Home') {
      const temp = homeData.filter((item) => item.category.includes('Teacher'));
      setfilteredHomeDatas(temp);
    }
    else if (pathname === '/r/Home') {
      const temp = homeData.filter((item) => item.category.includes('Teacher'));
      setfilteredHomeDatas(temp);
    }
    else if (pathname === '/p/Home') {
      const temp = homeData.filter((item) => item.category.includes('Project'));
      setfilteredHomeDatas(temp);
    }
    else if (pathname === '/t/Home') {
      const temp = homeData.filter((item) => item.category.includes('Teacher'));
      setfilteredHomeDatas(temp);
    }
    else if(pathname==='/Shome'){
      const temp = homeData.filter((item)=>item.relatedTo.includes('Student'));
      setfilteredHomeDatas(temp);
    }
    else if(pathname==='/Thome'){
      const temp = homeData.filter((item)=>item.relatedTo.includes('Teacher'));
      setfilteredHomeDatas(temp);
    }
    else if(pathname==='/Ghome'){
      const temp = homeData.filter((item)=>item.relatedTo.includes('Guide'));
      setfilteredHomeDatas(temp);
    }
    else if(pathname==='/Rhome'){
      const temp = homeData.filter((item)=>item.relatedTo.includes('Reviewer'));
      setfilteredHomeDatas(temp);
    }
    else if(pathname==='/Phome'){
      const temp = homeData.filter((item)=>item.relatedTo.includes('Projects'));
      setfilteredHomeDatas(temp);
    }
  };



  return (
    <Layouts>
      <div className='grid grid-cols-1 lg:grid-cols-3 md:grid-cols-4 items-center justify-between gap-10 p-10' style={{ zIndex: 0 }}>
        {filteredHomeDatas.map((data, key) => (
          <div key={key}>
            <HomeIcons src={data.src} title={data.title} toRoute={data.toRoute} />
          </div>
        ))}
      </div>
    </Layouts>
  );
}

export default Home;
