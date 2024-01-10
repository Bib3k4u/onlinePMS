import React from 'react'

function SweetAlert() {
 const handleNoClick=()=>{

 }
 const handleYesClick=()=>{
    
 }
  return (
    <div>
        <div className='bg-white text-black'>
            <p>{props.text}</p>
        </div>
        <div className='flex flex-col lg:flex-row gap-10 items-center justify-around'>
            <button className='bg-red-500 text-white rounded-2xl' onClick={handleNoClick}>{props.no}</button>4
            <button className='bg-green-500 text-white rounded-2xl' onClick={handleYesClick}>{props.yes}</button>
        </div>
    </div>
  )
}

export default SweetAlert