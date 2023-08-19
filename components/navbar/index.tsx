"use client";

import React, { useState } from "react";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Index = () => {
  const { data: session, status } = useSession();
  const pathname = usePathname();
  const handleLogout = () => {
    signOut(); // Call the signOut function from next-auth to log the user out
  };

  console.log("session-->image", session);

  return (
    <div className="w-full flex py-4 sticky top-0 z-10 bg-white justify-between gap-10">
      <div className="flex flex-start items-center">
        <div className="bg-logo h-14 w-14 rounded-full bg-no-repeat bg-contain" />
        <Link href={"/"}>
          <div className="mx-4 text-2xl font-saira-stencil-one hidden md:block">
            DHHNews.in
          </div>
        </Link>
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
            <div className="cursor-pointer">
              <div className="flex items-center">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Avatar className="inline-block w-8 h-8 bg-[#FFE3CE] rounded-full ring-2 ring-white cursor-pointer">
                      <AvatarImage
                        src={session?.user?.image ?? ""}
                        className="inline-block w-8 h-8 bg-[#FFE3CE] rounded-full ring-2 ring-white cursor-pointer"
                      />
                      <AvatarFallback className="text-lg">
                        {session?.user.username[0]?.toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    {/* {session.user?.image ? (null
                      // <img
                      //   src={session.user.image}
                      //   alt={session.user?.username}
                      //   className="w-8 h-8 rounded-full bg-contain"
                      // />
                    ) : (
                      <div
                        // src={session.user.image}
                        className="relative w-8 h-8 overflow-hidden bg-avatar bg-gray-300 rounded-full bg-contain"
                      />
                    )} */}
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="absolute mt-2 right-0 w-36 py-2 bg-white border border-gray-300 rounded shadow">
                    <DropdownMenuLabel className="px-4 py-2">
                      {session?.user?.username}
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <Link href={`/${session.user.username}`}>
                      <DropdownMenuLabel className="cursor-pointer rounded-md px-4 py-2 hover:bg-[#FF994E]">
                        Profile
                      </DropdownMenuLabel>
                    </Link>
                    <Link href="/submit-news">
                      <DropdownMenuLabel className="cursor-pointer rounded-md px-4 py-2 hover:bg-[#FF994E]">
                        Submit News
                      </DropdownMenuLabel>
                    </Link>
                    <DropdownMenuLabel
                      onClick={handleLogout}
                      className="cursor-pointer rounded-md px-4 py-2 hover:bg-[#FF994E]"
                    >
                      Logout
                    </DropdownMenuLabel>
                  </DropdownMenuContent>
                </DropdownMenu>

                {/* <span className='mx-2'>{session.user.username}</span> */}
              </div>
            </div>
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
