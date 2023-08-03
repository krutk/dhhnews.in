import React from 'react'
import TrendingPosts from "../posts/trending"

const index = () => {
  return (
    <div className='w-full pt-12 pb-6 '>
      {/* Trending Section */}
      <div className='flex items-center mb-4'>
        <div className='bg-trending w-[28px] h-[29px] bg-no-repeat scale-150 pr-2'></div>
        <div className='font-bold text-xl ml-2'>Trending</div>
      </div>
      {/* Rendering the six data items */}
      <TrendingPosts />

    </div>


  )
}

export default index