import React from 'react'

const poster = () => {
  return (
    // <div className='bg-[#FF6D00] w-full h-auto min-h-[800px] '>
    //   <div className='bg-rapperBG h-[800px] bg-cover filter-'></div>
    //   <div className='relative grid w-[1fr] font-elsie h-auto'>DHHNEWS</div>
    // </div>
//     <div className='bg-[#FF6D00] w-full h-auto min-h-[800px]' style={{position: "relative"}}>
//   <div className='bg-rapperBG h-[800px] bg-cover' style={{filter: "brightness(0)"}}></div>
//   <div className='absolute top-0 left-0 w-full h-full flex justify-center items-center text-white text-9xl font-bold' style={{textShadow: "9px 5px 7px rgba(0, 0, 0, 0.5)"}}>
//     DHHNEWS
//   </div>
// </div>
<div className='bg-[#FF6D00] w-full h-auto min-h-[600px] md:min-h-[800px]' style={{ position: "relative" }}>
  <div className='bg-rapperBG min-h-[600px] md:min-h-[800px] bg-cover bg-no-repeat bg-center' style={{ filter: "brightness(0)" }}></div>
  <div className='absolute top-0 left-0 w-full h-full flex flex-col justify-center items-center text-white font-bold' style={{ textShadow: "9px 5px 7px rgba(0, 0, 0, 0.5)", fontSize: "14vw" }}>
    DHHNEWS
  {/* </div> */}
  <div className='w-1/2 md:w-1/4 text-base flex flex-col md:flex-row justify-between items-center font-serif font-light text-white'>
    <div>Home</div>
    <div>Submit</div>
    <div>Contact</div>
  </div>
  </div>
</div>


  )
}

export default poster