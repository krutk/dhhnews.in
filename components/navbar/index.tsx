import React from 'react'

const index = () => {
  return (
    <div className=' px-20 w-full flex py-4 sticky top-0 z-10 bg-white' 
  //   style={{
  //     backgroundColor: "transparent",
  //     backgroundImage: "radial-gradient(#70B77E 1px, transparent 1px), radial-gradient(#70B77E 1px, #F3DE8A 1px)",
  //     backgroundPosition: "0 0, 30px 30px",
  //     backgroundSize: "60px 60px",
  //     borderRadius: 0
  // }} 
  >
      <div className='w-3/4 flex items-center'>
        <div className='bg-logo h-14 w-14 rounded-full bg-no-repeat bg-contain' />
        <div className='mx-4 text-2xl font-saira-stencil-one'>DHHNews.in</div>
      </div>
      <div className='w-1/4 flex items-center font-bold font-instrument-sans justify-around text-lg'>
        <div className='cursor-pointer'>Home</div>
        <div className='cursor-pointer'>News</div>
        <div className='cursor-pointer'>Sign In</div>
      </div>
    </div>
  )
}

export default index