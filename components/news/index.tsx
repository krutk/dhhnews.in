import React from 'react'
import NewsPosts from "../posts/newsPosts"

const index = () => {
    return (
        <div className='w-full pt-8 pb-6 px-20 '>
            {/* Sorting by Tags Section */}
            <div className='flex flex-wrap items-center gap-4 mb-8 font-inter'>
                <div className='font-medium text-base px-3 py-1 bg-gray-400 rounded-3xl cursor-pointer'>Refresh</div>
                <div className='font-medium text-base px-3 py-1 bg-gray-400 rounded-3xl cursor-pointer'>Lafda</div>
                <div className='font-medium text-base px-3 py-1 bg-gray-400 rounded-3xl cursor-pointer'>Song</div>
                <div className='font-medium text-base px-3 py-1 bg-gray-400 rounded-3xl cursor-pointer'>Album</div>
                <div className='font-medium text-base px-3 py-1 bg-gray-400 rounded-3xl cursor-pointer'>Update</div>
            </div>
            <NewsPosts />
        </div>
    )
}

export default index