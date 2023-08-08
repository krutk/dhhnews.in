"use client";
// import React from 'react'
// import { useSession } from 'next-auth/react'
// import Link from 'next/link';

// const index = () => {
//   const { data: session, status } = useSession();
//   console.log("data:session----->", session, status);
//   return (
//     <div className=' w-full flex py-4 sticky top-0 z-10 bg-white justify-between gap-10'
//     //   style={{
//     //     backgroundColor: "transparent",
//     //     backgroundImage: "radial-gradient(#70B77E 1px, transparent 1px), radial-gradient(#70B77E 1px, #F3DE8A 1px)",
//     //     backgroundPosition: "0 0, 30px 30px",
//     //     backgroundSize: "60px 60px",
//     //     borderRadius: 0
//     // }}
//     >
//       <div className='flex flex-start items-center'>
//         <div className='bg-logo h-14 w-14 rounded-full bg-no-repeat bg-contain' />
//         <div className='mx-4 text-2xl font-saira-stencil-one hidden md:block'>DHHNews.in</div>
//       </div>
//       <div className='flex items-center font-bold font-instrument-sans text-lg space-x-5'>
//         <div className='cursor-pointer'>Home</div>
//         <div className='cursor-pointer'>News</div>
//         {/* <div className='cursor-pointer'>Sign In</div> */}
//         {session ? (
//           <div className='cursor-pointer'>{session?.user?.username}</div>
//         ) : (
//           <div className='cursor-pointer'><Link href="/signin">Sign In</Link></div>
//         )}      </div>
//     </div>
//   )
// }

// export default index

import React, { useState } from "react";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Index = () => {
  const { data: session, status } = useSession();
  const pathname = usePathname();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const handleLogout = () => {
    signOut(); // Call the signOut function from next-auth to log the user out
  };

  const handleUsernameClick = () => {
    setIsDropdownOpen((prevState) => !prevState);
  };

  const handleDropdownBlur = () => {
    // Hide the dropdown when the user clicks outside of it
    setIsDropdownOpen(false);
  };

  return (
    <div className="w-full flex py-4 sticky top-0 z-10 bg-white justify-between gap-10">
      <div className="flex flex-start items-center">
        <div className="bg-logo h-14 w-14 rounded-full bg-no-repeat bg-contain" />
        <div className="mx-4 text-2xl font-saira-stencil-one hidden md:block">
          DHHNews.in
        </div>
      </div>
      <div className="flex items-center font-bold font-instrument-sans text-lg space-x-5">
        <Link href="/">
          <div className="cursor-pointer">Home</div>
        </Link>
        <Link href="/news">
          <div className="cursor-pointer">News</div>
        </Link>
        {session ? (
          <div className="relative">
            <div
              className="cursor-pointer"
              onClick={handleUsernameClick}
              onBlur={handleDropdownBlur}
            >
              <div className="flex items-center">
                {session.user?.image ? (
                  <img
                    src={session.user.image}
                    alt={session.user?.username}
                    className="w-8 h-8 bg-logo rounded-full bg-contain"
                  />
                ) : (
                  <div
                    // src={session.user.image}
                    className="relative w-8 h-8 overflow-hidden bg-avatar bg-gray-300 rounded-full bg-contain"
                  />
                )}

                {/* <span className='mx-2'>{session.user.username}</span> */}
              </div>
            </div>
            {isDropdownOpen && (
              <div className="absolute mt-2 right-0 w-36 py-2 bg-white border border-gray-300 rounded shadow">
                <div className="px-4 py-2 font-medium">
                  {/* <span className='text-gray-500'>Hello,</span>{' '} */}
                  {session?.user?.username}
                </div>
                <div className="border-t border-gray-300"></div>
                <Link href="/user">
                  <div className="cursor-pointer px-4 py-2 hover:bg-gray-100">
                    Profile
                  </div>
                </Link>
                <Link href="/submit-news">
                  <div className="cursor-pointer px-4 py-2 hover:bg-gray-100">
                    Submit News
                  </div>
                </Link>
                <div
                  className="cursor-pointer px-4 py-2 hover:bg-gray-100"
                  onClick={handleLogout}
                >
                  Logout
                </div>
              </div>
            )}
          </div>
        ) : pathname === "/signin" ? (
          <div className="cursor-pointer">
            <Link href="/register">Register</Link>
          </div>
        ) : (
          <div className="cursor-pointer">
            <Link href="/signin">Sign In</Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
