import React from 'react';
import {Skeleton} from "@/components/ui/skeleton";

const Loading = () => {
    return (
        <div className="w-full pb-6">
             {/*Sorting by Tags Section*/}
            <div className="flex flex-wrap items-center gap-4 mb-8 font-inter">
                <Skeleton className="w-20 h-7 bg-gray-300 rounded-3xl" />
                <Skeleton className="w-20 h-7 bg-gray-300 rounded-3xl" />
                <Skeleton className="w-20 h-7 bg-gray-300 rounded-3xl" />
                <Skeleton className="w-20 h-7 bg-gray-300 rounded-3xl" />
                <Skeleton className="w-20 h-7 bg-gray-300 rounded-3xl" />
                <Skeleton className="w-20 h-7 bg-gray-300 rounded-3xl" />
            </div>
            <>
                {Array.from({ length: 6 }).map((_, index) => (
                    <div key={index} className="w-full pt-8 pb-6">

                        <Skeleton className="w-1/6 h-5 mb-2 bg-gray-300"  />
                        <Skeleton className="w-3/4 h-5 mb-2 bg-gray-300" />
                        <Skeleton className="w-3/4 h-40 mb-2 bg-gray-300" />

                    </div>
                ))}

            </>
            {/*Loading...*/}
        </div>
    );
};

export default Loading;
