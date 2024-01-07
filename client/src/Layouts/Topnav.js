import { ChevronDown, ChevronUp, LogOut, Settings, User, UserCog2 } from 'lucide-react'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useLoginManager } from '../StateManagement/UserManagement'
import Select from "react-select";
function Topnav() {
  const navigate = useNavigate();
  const{user,userRole} = useLoginManager();
  const isSessionHasData =sessionStorage.getItem('sessionData')
  let userData;
  if(isSessionHasData)
  {
    userData = JSON.parse(isSessionHasData);
  }
  const[profileClicked,setProfileClicked] = useState(false);
  const handleprofileClick =()=>{
    setProfileClicked(!profileClicked);
  }
  const handleLogout=()=>{
      navigate('/',{replace:true})
  }
 console.log(user);
  return (
    <div className='relative'>
    <div className='flex flex-row hidden md:inline-flex lg:inline-flex justify-between bg-bgBlue border-b border-white p-2 text-textColor1 items-center w-full'>
            <div className='w-fit'>Galgotias University</div>
            <div className='flex flex-col'>
              <div className='flex flex-row items-center w-fit bg-bgBlueDark p-2 gap-2 rounded-xl hover:cursor-pointer' onClick={handleprofileClick}><p>{userData&&userData.data[0].Name}</p>{profileClicked?<ChevronUp />:<ChevronDown />}</div>
             
            </div>
    </div>
    {profileClicked&&<div className='absolute top-12 right-0 right-2 bg-bgBlueDark p-2 text-textColor1 flex flex-col gap-4  ' style={{zIndex:1,width:'10%'}}>
      <button  className='hover:bg-white hover:text-black hover:p-2 hover:rounded-xl flex flex-row gap-2 justify-center'><UserCog2 />Profile</button>
      <button  className='hover:bg-white hover:text-black hover:p-2 hover:rounded-xl flex felx-row gap-2 justify-center'><Settings />Setting</button>
      
      <div className='bg-textColor1' style={{height:'1px'}}></div>
      <button onClick={handleLogout} className='hover:bg-white hover:text-black hover:p-2 hover:rounded-xl flex flex-row gap-2 justify-center'><LogOut />Logout</button>
    </div>}
    </div>
  )
}

export default Topnav