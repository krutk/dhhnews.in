"use client"
// import React, { Suspense, useEffect, useState } from 'react'
// const NewsPosts = React.lazy(() => import('../posts/newsPosts'));
// import Loading from '@/app/news/loading'

// const index = () => {
//     const [isLoading, setIsLoading] = useState(true);

//     useEffect(() => {
//         // Simulate API call delay
//         setTimeout(() => {
//             setIsLoading(false);
//         }, 3000);
//     }, []);
//     return (
//         <div className='w-full pt-8 pb-6 '>
//             {/* Sorting by Tags Section */}
//             {isLoading ? <Loading /> :
//                 (<><div className='flex flex-wrap items-center gap-4 mb-8 font-inter'>
//                     <div className='font-medium text-base px-3 py-1 bg-gray-400 rounded-3xl cursor-pointer'>Refresh</div>
//                     <div className='font-medium text-base px-3 py-1 bg-gray-400 rounded-3xl cursor-pointer'>Lafda</div>
//                     <div className='font-medium text-base px-3 py-1 bg-gray-400 rounded-3xl cursor-pointer'>Song</div>
//                     <div className='font-medium text-base px-3 py-1 bg-gray-400 rounded-3xl cursor-pointer'>Album</div>
//                     <div className='font-medium text-base px-3 py-1 bg-gray-400 rounded-3xl cursor-pointer'>Update</div>
//                 </div>
//                     <NewsPosts /></>)}
//         </div>
//     )
// }

// export default index

import React, { Suspense, useEffect, useState } from 'react';
const NewsPosts = React.lazy(() => import('../posts/newsPosts'));
import Loading from '@/app/news/loading';

const Index = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [selectedSortOption, setSelectedSortOption] = useState('');

    useEffect(() => {
        // Simulate API call delay
        setTimeout(() => {
            setIsLoading(false);
        }, 1000);
    }, []);

    const handleSortOptionClick = (option: React.SetStateAction<string>) => {
        setSelectedSortOption(option);
        // Perform sorting or other operations based on the selected option
        console.log(option);
    };

    return (
        <div className='w-full pt-8 pb-6'>
            {/* Sorting by Tags Section */}
            {isLoading ? (
                <Loading />
            ) : (
                <>
                    <div className='flex flex-wrap items-center gap-4 mb-8 font-inter'>
                        <div
                            onClick={() => handleSortOptionClick('Refresh')}
                            className={`font-medium text-base px-3 py-1 rounded-3xl cursor-pointer ${selectedSortOption === 'Refresh' ? 'bg-gray-400' : 'bg-gray-100'
                                }`}
                        >
                            Refresh
                        </div>
                        <div
                            onClick={() => handleSortOptionClick('Lafda')}
                            className={`font-medium text-base px-3 py-1 rounded-3xl cursor-pointer ${selectedSortOption === 'Lafda' ? 'bg-gray-400' : 'bg-gray-100'
                                }`}
                        >
                            Lafda
                        </div>
                        <div
                            onClick={() => handleSortOptionClick('Song')}
                            className={`font-medium text-base px-3 py-1 rounded-3xl cursor-pointer ${selectedSortOption === 'Song' ? 'bg-gray-400' : 'bg-gray-100'
                                }`}
                        >
                            Song
                        </div>
                        <div
                            onClick={() => handleSortOptionClick('Album')}
                            className={`font-medium text-base px-3 py-1 rounded-3xl cursor-pointer ${selectedSortOption === 'Album' ? 'bg-gray-400' : 'bg-gray-100'
                                }`}
                        >
                            Album
                        </div>
                        <div
                            onClick={() => handleSortOptionClick('Update')}
                            className={`font-medium text-base px-3 py-1 rounded-3xl cursor-pointer ${selectedSortOption === 'Update' ? 'bg-gray-400' : 'bg-gray-100'
                                }`}
                        >
                            Update
                        </div>
                    </div>
                    <NewsPosts selectedSortOption={selectedSortOption} />
                </>
            )}
        </div>
    );
};

export default Index;
