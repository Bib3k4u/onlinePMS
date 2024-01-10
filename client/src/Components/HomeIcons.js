import React from 'react'
import { useNavigate } from 'react-router-dom';
function HomeIcons(props) {
    const navigate = useNavigate();
    const toRoute = props.toRoute;
    const handleClick = ()=>{
        navigate(toRoute,{replace:true});
    }
  return (
    <div className='flex flex-col items-center gap-2' onClick={handleClick}>
        <img src={props.src} alt='data' width={100} className='rounded-full bg-bgBlueDark'/>
        <label className='text-xl '>
        {props.title}
    </label>
    </div>
  )
}

export default HomeIcons