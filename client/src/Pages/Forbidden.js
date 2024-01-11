import React from 'react'

function Forbidden() {
  return (
    <div className='h-screen w-full flex flex-col bg-bgBlue justify-center items-center'>

   <h3 style={{fontSize:'400px'}} className='text-white'>404</h3>
   <p className='text-white text-3xl underline'>Forbidden Access Denied , You Are Not Allowed</p>

    </div>
  )
}

export default Forbidden