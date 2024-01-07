import React, { useState, useEffect } from 'react';
import Layouts from '../Layouts/Layouts';
import HomeIcons from '../Components/HomeIcons';
import { useLocation } from 'react-router-dom';
import homeData from './../utility/HomData'; // Correct the import path

function Home() {
  const location = useLocation();
  const [homeDatas, setHomeDatas] = useState([]);

  useEffect(() => {
    getHomeData();
  }, [location]);

  const getHomeData = () => {
    const { pathname } = location;

    if (pathname.startsWith('/Home')) {
      setHomeDatas(homeData.filter((item)=>item.category.includes('admin')));
    } else if (pathname === '/s/Home') {
      const temp = homeData.filter((item) => item.category.includes('student'));
      setHomeDatas(temp);
    }
    else if (pathname === '/g/Home') {
      const temp = homeData.filter((item) => item.category.includes('guide'));
      setHomeDatas(temp);
    }
    else if (pathname === '/r/Home') {
      const temp = homeData.filter((item) => item.category.includes('reviewer'));
      setHomeDatas(temp);
    }
    else if (pathname === '/p/Home') {
      const temp = homeData.filter((item) => item.category.includes('project'));
      setHomeDatas(temp);
    }
    else if (pathname === '/t/Home') {
      const temp = homeData.filter((item) => item.category.includes('teacher'));
      setHomeDatas(temp);
    }
  };



  return (
    <Layouts>
      <div className='grid grid-cols-1 lg:grid-cols-3 md:grid-cols-4 items-center justify-between gap-10 p-10' style={{ zIndex: 0 }}>
        {homeDatas.map((data, key) => (
          <div key={key}>
            <HomeIcons src={data.src} title={data.title} toRoute={data.toRoute} />
          </div>
        ))}
      </div>
    </Layouts>
  );
}

export default Home;
