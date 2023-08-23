"use client";
// import React, { useState } from "react";
// import { useSession, signOut } from "next-auth/react";
// import Link from "next/link";
// import { usePathname } from "next/navigation";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuLabel,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
// import { XMarkIcon, Bars3Icon } from "@heroicons/react/24/outline";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// const Navbar = () => {
//   const { data: session, status } = useSession();
//   const pathname = usePathname();
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

//   const handleLogout = () => {
//     signOut();
//   };

//   return (
//     <header className="bg-white sticky top-0 z-10">
//       <nav className="mx-auto  flex justify-between items-center py-4 gap-10">
//         <div className="flex items-center">
//           <div className="bg-logo h-10 w-10 rounded-full bg-no-repeat bg-contain" />
//           <Link href="/">
//             <div className="ml-4 text-xl font-saira-stencil-one hidden sm:block">
//               DHHNews.in
//             </div>
//           </Link>
//         </div>
//         <div className="sm:hidden">
//           <button
//             type="button"
//             className="p-2"
//             onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
//           >
//             {mobileMenuOpen ? (
//               <>
//                 <span className="sr-only">Close menu</span>
//                 <XMarkIcon className="h-6 w-6" aria-hidden="true" />
//               </>
//             ) : (
//               <>
//                 <span className="sr-only">Open main menu</span>
//                 <Bars3Icon className="h-6 w-6" aria-hidden="true" />
//               </>
//             )}
//             {/* Your mobile menu icon */}
//           </button>
//         </div>
//         <div className="hidden sm:flex items-center font-bold font-instrument-sans text-lg space-x-5">
//           <Link href="/">
//             <div className="cursor-pointer">Home</div>
//           </Link>
//           <Link href="/news">
//             <div className="cursor-pointer">News</div>
//           </Link>
//           {session ? (
//             <div className="relative">
//               <div className="cursor-pointer">
//                 <div className="flex items-center">
//                   <DropdownMenu>
//                     <DropdownMenuTrigger asChild>
//                       <Avatar className="inline-block w-8 h-8 bg-[#FFE3CE] rounded-full ring-2 ring-white cursor-pointer">
//                         <AvatarImage
//                           src={session?.user?.image ?? ""}
//                           className="inline-block w-8 h-8 bg-[#FFE3CE] rounded-full ring-2 ring-white cursor-pointer"
//                         />
//                         <AvatarFallback className="text-lg">
//                           {session?.user.username[0]?.toUpperCase()}
//                         </AvatarFallback>
//                       </Avatar>
//                     </DropdownMenuTrigger>
//                     <DropdownMenuContent className=" absolute mt-2 right-0 w-36 py-2 bg-white border border-gray-300 rounded shadow">
//                       <DropdownMenuLabel className="px-4 py-2">
//                         {session?.user?.username}
//                       </DropdownMenuLabel>
//                       <DropdownMenuSeparator />
//                       <Link href={`/${session.user.username}`}>
//                         <DropdownMenuLabel className="cursor-pointer rounded-md px-4 py-2 hover:bg-[#FF994E]">
//                           Profile
//                         </DropdownMenuLabel>
//                       </Link>
//                       <Link href="/submit-news">
//                         <DropdownMenuLabel className="cursor-pointer rounded-md px-4 py-2 hover:bg-[#FF994E]">
//                           Submit News
//                         </DropdownMenuLabel>
//                       </Link>
//                       <DropdownMenuLabel
//                         onClick={handleLogout}
//                         className="cursor-pointer rounded-md px-4 py-2 hover:bg-[#FF994E]"
//                       >
//                         Logout
//                       </DropdownMenuLabel>
//                     </DropdownMenuContent>
//                   </DropdownMenu>
//                 </div>
//               </div>{" "}
//             </div>
//           ) : pathname === "/signin" ? (
//             <div className="cursor-pointer">
//               <Link href="/register">Register</Link>
//             </div>
//           ) : (
//             <div className="cursor-pointer">
//               <Link href="/signin">Sign In</Link>
//             </div>
//           )}
//         </div>
//       </nav>
//       {/* Mobile Menu */}
//       {mobileMenuOpen && (
//         <div className="sm:hidden">
//           {session && (
//             <Link
//               href={"/${session.user.username}"}
//               className=" -mx-3 items-center flex rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-[#FF994E]"
//             >
//               <Avatar className=" w-8 h-8 bg-[#FFE3CE] rounded-full ">
//                 <AvatarImage
//                   src={session?.user?.image ?? ""}
//                   className="inline-block w-8 h-8 bg-[#FFE3CE] rounded-full ring-2 ring-white cursor-pointer"
//                 />
//                 <AvatarFallback className="text-lg">
//                   {session?.user.username[0]?.toUpperCase()}
//                 </AvatarFallback>
//               </Avatar>
//               <div className="pl-2">{session?.user.username}</div>
//             </Link>
//           )}
//           <Link
//             href={"/"}
//             className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-[#FF994E]"
//           >
//             Home
//           </Link>
//           <Link
//             href={"/news"}
//             className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-[#FF994E]"
//           >
//             News
//           </Link>
//           <Link
//             href={"/submit-news"}
//             className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-[#FF994E]"
//           >
//             Submit News
//           </Link>
//           {session && (
//             <div
//               onClick={handleLogout}
//               className="-mx-3 cursor-pointer block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-[#FF994E]"
//             >
//               Logout
//             </div>
//           )}
//           {!session && pathname === "/signin" && (
//             <Link
//               href="/register"
//               className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-[#FF994E]"
//             >
//               Register
//             </Link>
//           )}{" "}
//           {!session && pathname === "/register" && (
//             <Link
//               href="/signin"
//               className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-[#FF994E]"
//             >
//               Sign In
//             </Link>
//           )}
//         </div>
//       )}
//     </header>
//   );
// };

// export default Navbar;

import React, { useState } from "react";
import { useSession, signOut } from "next-auth/react";
import { usePathname } from "next/navigation";
import { XMarkIcon, Bars3Icon } from "@heroicons/react/24/outline";
import MobileMenu from "./MobileMenu";
import DesktopMenu from "./DesktopMenu";
import Link from "next/link";

const Navbar = () => {
  const { data: session } = useSession();
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    signOut();
  };

  return (
    <header className="bg-white sticky top-0 z-10 sm:px-20 px-4 shadow-lg">
      <nav className="mx-auto flex justify-between items-center py-4 gap-10">
        <div className="flex items-center">
          <div className="bg-logo h-10 w-10 rounded-full bg-no-repeat bg-contain" />
          <Link href="/">
            <div className="ml-4 text-xl font-saira-stencil-one hidden sm:block">
              DHHNews.in
            </div>
          </Link>
        </div>
        <div className="sm:hidden">
          <button
            type="button"
            className="p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <>
                <span className="sr-only">Close menu</span>
                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
              </>
            ) : (
              <>
                <span className="sr-only">Open main menu</span>
                <Bars3Icon className="h-6 w-6" aria-hidden="true" />
              </>
            )}
            {/* Your mobile menu icon */}
          </button>
        </div>
        <DesktopMenu
          setMobileMenuOpen={setMobileMenuOpen}
          session={session}
          handleLogout={handleLogout}
        />
      </nav>
      {mobileMenuOpen && (
        <MobileMenu
          setMobileMenuOpen={setMobileMenuOpen}
          session={session}
          pathname={pathname}
          handleLogout={handleLogout}
        />
      )}
    </header>
  );
};

export default Navbar;
