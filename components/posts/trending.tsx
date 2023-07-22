import React from 'react'

const jsonData = [
    {
        author: 'John Doe',
        title: 'Lorem Ipsum',
        date: '2023-07-20',
    },
    {
        author: 'Jane Smith',
        title: 'Dolor Sit Amet',
        date: '2023-07-19',
    }, {
        author: 'John Doe',
        title: 'Lorem Ipsum',
        date: '2023-07-20',
    },
    {
        author: 'Jane Smith',
        title: 'Dolor Sit Amet',
        date: '2023-07-19',
    }, {
        author: 'John Doe',
        title: 'Lorem Ipsum',
        date: '2023-07-20',
    },
    {
        author: 'Jane Smith',
        title: 'Dolor Sit Amet',
        date: '2023-07-19',
    },
];

const trendingPost = () => {
    return (
        <div className='grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-4'>
            {jsonData.slice(0, 6).map((item, index) => (
                <div key={index} className=' p-4'>
                    <div className='flex items-center mb-2'>
                        <div className='bg-logo w-5 h-5 rounded-full mr-2 bg-cover'></div>
                        <div className='text-gray-600 text-sm'>{item.author}</div>
                    </div>
                    <div className='font-bold text-base'>{item.title}</div>
                    <div className='text-gray-600'>{item.date}</div>
                </div>
            ))}
        </div>
    )
}

export default trendingPost