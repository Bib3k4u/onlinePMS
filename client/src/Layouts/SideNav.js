import React, { useState,useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { AlignJustify, ArrowBigRightDash, Book, BookAIcon, CheckCircleIcon, Cross, HomeIcon, InspectionPanelIcon, LogOutIcon, PersonStanding, Route, RouterIcon, SquareStack, User, UserRound, X } from "lucide-react";

import student from './../assests/images/Icons/student.png';
import guide from './../assests/images/Icons/teacher.png';
import reveiwer from './../assests/images/Icons/teacher(1).png';
import project from './../assests/images/Icons/solution.png'
 

function SideNav({ sendDataToLayout }) {
  let role = sessionStorage.getItem('role');
  const[crossClicked,setCrossClicked] = useState(false);
  const [height, setHeight] = useState(window.innerHeight);
  const[number,setNumber] =useState(0);
  const handleCorssClicked = ()=>{
    setCrossClicked(!crossClicked);
    sendDataToLayout(crossClicked);


  }
  useEffect(() => {
    const handleResize = () => {
      setHeight(window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
 const  location = useLocation();
 const{pathname} = location;
 const splitLocation = pathname.split('/')
 console.log(splitLocation);
 const changeNumber = (value)=>{
  setNumber(value);
 }
  return (
    <div style={{ height: `${height}px` }} className={`sidebar relative sidebar bg-bgBlue   p-5  flex flex-col  gap-10 text-textColor1 text-lg ${crossClicked?'w-fit':'w-full'}`} >
         <div className="justify-self-end self-end lg:block hover:cursor-pointer" onClick={handleCorssClicked}>{crossClicked?<AlignJustify/>:<X color='white' />}</div>
    
        {role==='Student'&&
        <>
        
        
          <NavLink to='/s/Home' onClick={()=>changeNumber(0)} >
          <div className={`flex flex-row  gap-10 p-5 rounded-full justify-between  items-center ${splitLocation&&splitLocation[2]==='Home'?'bg-white text-blue-700':'text-white'}`}>
            <div><HomeIcon  size={40}/></div>
            <p className={` font-bold text-3xl ${crossClicked?'hidden':''}`}>Home</p>
            <div className={`${crossClicked?'hidden':''}`}><ArrowBigRightDash  size={32}/></div>
            </div>
          </NavLink>

          <NavLink to='/projects/myguide' onClick={()=>changeNumber(1)}>
          <div className={`flex flex-row  gap-10 p-5 rounded-full justify-between  items-center ${splitLocation&&splitLocation[2]==='myguide'?'bg-white text-blue-700':'text-white'}`}>
            <div><RouterIcon  size={40}/></div>
            <p className={`font-bold text-3xl  ${crossClicked?'hidden':''}`}>My Guide</p>
            <div className={` ${crossClicked?'hidden':''}`}><ArrowBigRightDash  size={32}/></div>
            </div>
          </NavLink>

          <NavLink to='/projects/myreviewer' onClick={()=>changeNumber(2)}>
          <div className={`flex flex-row  gap-10 p-5 rounded-full justify-between  items-center ${splitLocation&&splitLocation[2]==='myreviewer'?'bg-white text-blue-700':'text-white'}`}>
            <div><CheckCircleIcon  size={40}/></div>
            <p className={`font-bold text-3xl  ${crossClicked?'hidden':''}`}>My Reviewer</p>
            <div className={` ${crossClicked?'hidden':''}`}><ArrowBigRightDash  size={32}/></div>
            </div>
          </NavLink>
  

          <NavLink to='/projects/myProject' onClick={()=>changeNumber(3)}>
          <div className={`flex flex-row  gap-10 p-5 rounded-full justify-between  items-center ${splitLocation&&splitLocation[2]==='myProject'?'bg-white text-blue-700':'text-white'}`}>
            <div><BookAIcon  size={40}/></div>
            <p className={`font-bold text-3xl  ${crossClicked?'hidden':''}`}>My Project</p>
            <div className={` ${crossClicked?'hidden':''}`}><ArrowBigRightDash  size={32}/></div>
            </div>
          </NavLink>
        </>}


{role==="Teacher"&&<>


<NavLink to='/t/Home' onClick={()=>changeNumber(0)} >
          <div className={`flex flex-row  gap-10 p-5 rounded-full justify-between  items-center ${splitLocation&&splitLocation[2]==='Home'?'bg-white text-blue-700':'text-white'}`}>
            <div><HomeIcon  size={40}/></div>
            <p className={` font-bold text-3xl ${crossClicked?'hidden':''}`}>Home</p>
            <div className={`${crossClicked?'hidden':''}`}><ArrowBigRightDash  size={32}/></div>
            </div>
          </NavLink>

          <NavLink to='/g/allProjects' onClick={()=>changeNumber(1)}>
          <div className={`flex flex-row  gap-10 p-5 rounded-full justify-between  items-center ${splitLocation&&splitLocation[1]==='g'?'bg-white text-blue-700':'text-white'}`}>
            <div><RouterIcon  size={40}/></div>
            <p className={`font-bold text-3xl  ${crossClicked?'hidden':''}`}>To Guide</p>
            <div className={` ${crossClicked?'hidden':''}`}><ArrowBigRightDash  size={32}/></div>
            </div>
          </NavLink>

          <NavLink to='/r/allProjects' onClick={()=>changeNumber(2)}>
          <div className={`flex flex-row  gap-10 p-5 rounded-full justify-between  items-center ${splitLocation&&splitLocation[1]==='r'?'bg-white text-blue-700':'text-white'}`}>
            <div><CheckCircleIcon  size={40}/></div>
            <p className={`font-bold text-3xl  ${crossClicked?'hidden':''}`}>To Reveiw</p>
            <div className={` ${crossClicked?'hidden':''}`}><ArrowBigRightDash  size={32}/></div>
            </div>
          </NavLink>
  

</>}


{role==='Admin'&&

<>
<NavLink to='/Home' onClick={()=>changeNumber(0)} >
          <div className={`flex flex-row  gap-10 p-5 rounded-full justify-between  items-center ${splitLocation&&splitLocation[1]==='Home'?'bg-white text-blue-700':'text-white'}`}>
            <div><HomeIcon  size={40}/></div>
            <p className={` font-bold text-3xl ${crossClicked?'hidden':''}`}>Home</p>
            <div className={`${crossClicked?'hidden':''}`}><ArrowBigRightDash  size={32}/></div>
            </div>
          </NavLink>

          <NavLink to='/Shome' onClick={()=>changeNumber(1)}>
          <div className={`flex flex-row  gap-10 p-5 rounded-full justify-between  items-center ${splitLocation&&splitLocation[1]==='Shome'?'bg-white text-blue-700':'text-white'}`}>
            <div><User  size={40}/></div>
            <p className={`font-bold text-3xl  ${crossClicked?'hidden':''}`}>Students</p>
            <div className={` ${crossClicked?'hidden':''}`}><ArrowBigRightDash  size={32}/></div>
            </div>
          </NavLink>

          <NavLink to='/Thome' onClick={()=>changeNumber(2)}>
          <div className={`flex flex-row  gap-10 p-5 rounded-full justify-between  items-center ${splitLocation&&splitLocation[1]==='Thome'?'bg-white text-blue-700':'text-white'}`}>
            <div><PersonStanding  size={40}/></div>
            <p className={`font-bold text-3xl  ${crossClicked?'hidden':''}`}>Teacher</p>
            <div className={` ${crossClicked?'hidden':''}`}><ArrowBigRightDash  size={32}/></div>
            </div>
          </NavLink>

          <NavLink to='/Ghome' onClick={()=>changeNumber(2)}>
          <div className={`flex flex-row  gap-10 p-5 rounded-full justify-between  items-center ${splitLocation&&splitLocation[1]==='Ghome'?'bg-white text-blue-700':'text-white'}`}>
            <div><Book  size={40}/></div>
            <p className={`font-bold text-3xl  ${crossClicked?'hidden':''}`}>Guide</p>
            <div className={` ${crossClicked?'hidden':''}`}><ArrowBigRightDash  size={32}/></div>
            </div>
          </NavLink>

          <NavLink to='/Rhome' onClick={()=>changeNumber(2)}>
          <div className={`flex flex-row  gap-10 p-5 rounded-full justify-between  items-center ${splitLocation&&splitLocation[1]==='Rhome'?'bg-white text-blue-700':'text-white'}`}>
            <div><CheckCircleIcon  size={40}/></div>
            <p className={`font-bold text-3xl  ${crossClicked?'hidden':''}`}>Reveiwer</p>
            <div className={` ${crossClicked?'hidden':''}`}><ArrowBigRightDash  size={32}/></div>
            </div>
          </NavLink>
          <NavLink to='/Phome' onClick={()=>changeNumber(2)}>
          <div className={`flex flex-row  gap-10 p-5 rounded-full justify-between  items-center ${splitLocation&&splitLocation[1]==='Phome'?'bg-white text-blue-700':'text-white'}`}>
            <div><InspectionPanelIcon  size={40}/></div>
            <p className={`font-bold text-3xl  ${crossClicked?'hidden':''}`}>Projects</p>
            <div className={` ${crossClicked?'hidden':''}`}><ArrowBigRightDash  size={32}/></div>
            </div>
          </NavLink>
      </>}
      <div className={`absolute bottom-10 right-2 flex flex-row gap-2 `}><LogOutIcon /><div className={`${crossClicked?'hidden':''}`}>Logout</div></div>
    </div>
  );
}

export default SideNav;
