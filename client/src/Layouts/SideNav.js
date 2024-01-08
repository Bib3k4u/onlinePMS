import React, { useState } from "react";
import { Link } from "react-router-dom";
import { AlignJustify, Cross, LogOutIcon, SquareStack, UserRound, X } from "lucide-react";

import student from './../assests/images/Icons/student.png';
import guide from './../assests/images/Icons/teacher.png';
import reveiwer from './../assests/images/Icons/teacher(1).png';
import project from './../assests/images/Icons/solution.png'
 

function SideNav({ sendDataToLayout }) {
   
  const[crossClicked,setCrossClicked] = useState(false);
  const handleCorssClicked = ()=>{
    setCrossClicked(!crossClicked);
    sendDataToLayout(crossClicked);
  }
  return (
    <div className={`sidebar relative sidebar bg-bgBlue h-screen  p-5  flex flex-col  gap-10 text-textColor1 text-lg ${crossClicked?'w-fit':'w-full'}`} >
         <div className="justify-self-end self-end lg:block hover:cursor-pointer" onClick={handleCorssClicked}>{crossClicked?<AlignJustify/>:<X color='white' />}</div>
      
         <div>
       
        <Link
          to="/Home"
          className="flex flex-row gap-2  text-black items-center rounded-3xl"
        >
          <div className="bg-white p-2 rounded-full ">
            <img src={student} width={30} className="rounded-full" />
          </div>{" "}
          <div className={` bg-white w-full p-2 text-center rounded-3xl ${crossClicked?'hidden':''}  `}>
            Admin
          </div>
        </Link>
      </div>
      <div>
       
        <Link
          to="/s"
          className="flex flex-row gap-2  text-black items-center rounded-3xl"
        >
          <div className="bg-white p-2 rounded-full ">
            <img src={student} width={30} className="rounded-full" />
          </div>{" "}
          <div className={` bg-white w-full p-2 text-center rounded-3xl ${crossClicked?'hidden':''}  `}>
            Student
          </div>
        </Link>
      </div>
      <div>
        <Link
          to="/g"
          className="flex flex-row gap-2  text-black items-center rounded-3xl"
        >
          <div className="bg-white p-2 rounded-full ">
            <img src={guide} width={30} className="rounded-full" />
          </div>{" "}
          <div className={` bg-white w-full p-2 text-center rounded-3xl ${crossClicked?'hidden':''}  `}>
            Guide
          </div>
        </Link>
      </div>
      <div>
        <Link
          to="/r"
          className="flex flex-row gap-2  text-black items-center rounded-3xl"
        >
          <div className="bg-white p-2 rounded-full ">
          <img src={reveiwer} width={30} className="rounded-full" />
          </div>{" "}
          <div className={` bg-white w-full p-2 text-center rounded-3xl ${crossClicked?'hidden':''}  `}>
            Reviewer
          </div>
        </Link>
      </div>
      <div>
        <Link
          to="/p"
          className="flex flex-row gap-2  text-black items-center rounded-3xl"
        >
          <div className="bg-white p-2 rounded-full ">
          <img src={project} width={30} className="rounded-full" />
          </div>{" "}
          <div className={` bg-white w-full p-2 text-center rounded-3xl ${crossClicked?'hidden':''}  `}>
            Projects
          </div>
        </Link>
      </div>
      <div className={`absolute bottom-10 right-2 flex flex-row gap-2 `}><LogOutIcon /><div className={`${crossClicked?'hidden':''}`}>Logout</div></div>
    </div>
  );
}

export default SideNav;
