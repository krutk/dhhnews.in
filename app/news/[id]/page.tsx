"use client";
// import { usePostsContext } from "@/components/contexts/PostsContext";
// import { formatDate } from "@/lib/utils";

// import React, { useState } from "react";

// const Page = ({ params }: { params: { id: string } }) => {
//     const { posts, loading, error } = usePostsContext();
//     const news = posts.find((p) => p.id === params.id);
//     const [showCard, setShowCard] = useState(false);
//     if (loading) {
//         return <div>Loading...</div>;
//     }

//     if (error) {
//         return <div>Error fetching posts.</div>;
//     }

//     const handleMouseEnter = () => {
//         setShowCard(true);
//       };

//       const handleMouseLeave = () => {
//         setShowCard(false);
//       };

//     return (
//         <div className=" flex justify-center">
//             <div>
//                 <div className="mt-8 font-bold text-[32px] md:text-[42px]">
//                     {news?.title}
//                 </div>
//                 <div className="flex my-4">
//                     <div className="inline-block h-[44px] w-[44px] bg-slate-600 rounded-full ring-2 ring-white"></div>
//                     <div className="flex flex-col ml-3">
//                         <div className="cursor-pointer hover:underline font-medium text-base">{news?.user.username}</div>
//                         <div className="text-[14px]">{formatDate(news?.createdAt)}</div>
//                     </div>
//                 </div>
//                 <div className="border-t border-gray-300 my-8" />
//                 <div className="text-lg md:text-xl mt-8">{news?.description}</div>
//             </div>
//         </div>
//     );
// };

// export default Page;

import React, { useState } from "react";
import UserCard from "@/components/userCard";
import { usePostsContext } from "@/components/contexts/PostsContext";
import { formatDate } from "@/lib/utils";
import Loader from "@/components/Loader";

const Page = ({ params }: { params: { id: string } }) => {
  const { posts, loading, error } = usePostsContext();
  const news = posts.find((p) => p.id === params.id);

  const [showCard, setShowCard] = useState(false);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <div>Error fetching posts.</div>;
  }

  const handleMouseEnter = () => {
    setShowCard(true);
  };

  const handleMouseLeave = () => {
    setShowCard(false);
  };

  return (
    <div className=" flex justify-center">
      <div className=" w-full md:w-2/3 xl:w-1/2">
        <div className="mt-8 font-bold text-[32px] md:text-[42px]">
          {news?.title}
        </div>
        <div className="flex my-4">
          <div className="inline-block h-[44px] w-[44px] bg-slate-600 rounded-full ring-2 ring-white"></div>
          <div className="flex flex-col ml-3">
            <div
              className="cursor-pointer hover:underline font-medium text-base"
              //   onMouseEnter={handleMouseEnter}
              //   onMouseLeave={handleMouseLeave}
            >
              {news?.user.username}
            </div>
            <div className="text-[14px]">{formatDate(news?.updatedAt)}</div>
          </div>
        </div>
        {showCard && (
          <div
            className="absolute left-[213px] top-[142px]"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <UserCard user={news?.user} />
          </div>
        )}
        <div className="border-t border-gray-300 my-8" />
        <img
          src={news?.imageUrl}
          alt={news?.title}
          className="h-auto max-w-full"
        />
        <div className="text-lg md:text-xl mt-8">{news?.description}</div>
      </div>
    </div>
  );
};

export default Page;
