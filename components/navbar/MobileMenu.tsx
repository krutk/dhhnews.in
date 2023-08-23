import React, { MouseEventHandler } from "react";
import Link from "next/link";
import MobileMenuItem from "./MobileMenuItem";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

type MobileMenuProps = {
  setMobileMenuOpen: Function;
  session: any;
  pathname: string;
  handleLogout: MouseEventHandler<HTMLDivElement>;
};

const MobileMenu = ({
  setMobileMenuOpen,
  session,
  pathname,
  handleLogout,
}: MobileMenuProps) => (
  <div className="sm:hidden">
    {session && (
      <Link
        href={"/${session.user.username}"}
        className=" -mx-3 items-center flex rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-[#FF994E]"
      >
        <Avatar className=" w-8 h-8 bg-[#FFE3CE] rounded-full ">
          <AvatarImage
            src={session?.user?.image ?? ""}
            className="inline-block w-8 h-8 bg-[#FFE3CE] rounded-full ring-2 ring-white cursor-pointer"
          />
          <AvatarFallback className="text-lg">
            {session?.user.username[0]?.toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <div className="pl-2">{session?.user.username}</div>
      </Link>
    )}
    <MobileMenuItem setMobileMenuOpen={setMobileMenuOpen} href="/">
      Home
    </MobileMenuItem>
    <MobileMenuItem setMobileMenuOpen={setMobileMenuOpen} href="/submit-news">
      Submit News
    </MobileMenuItem>
    <MobileMenuItem setMobileMenuOpen={setMobileMenuOpen} href="/news">
      News
    </MobileMenuItem>
    <MobileMenuItem setMobileMenuOpen={setMobileMenuOpen} href="/about">
      About
    </MobileMenuItem>
    {session.user.role === "ADMIN" && (
      <MobileMenuItem setMobileMenuOpen={setMobileMenuOpen} href="/admin">
        Admin
      </MobileMenuItem>
    )}
    {session ? (
      // <div
      //   className="cursor-pointer -mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-[#FF994E]"
      //   onClick={handleLogout}
      // >
      <MobileMenuItem setMobileMenuOpen={setMobileMenuOpen} href="/about">
        Logout
      </MobileMenuItem>
    ) : (
      // Logout
      // </div>
      <>
        {pathname === "/signin" && (
          <MobileMenuItem
            setMobileMenuOpen={setMobileMenuOpen}
            href="/register"
          >
            Register
          </MobileMenuItem>
        )}
        {pathname === "/register" && (
          <MobileMenuItem setMobileMenuOpen={setMobileMenuOpen} href="/signin">
            Sign In
          </MobileMenuItem>
        )}
        {pathname !== "/signin" && pathname !== "/register" && (
          <MobileMenuItem setMobileMenuOpen={setMobileMenuOpen} href="/signin">
            Sign In
          </MobileMenuItem>
        )}
      </>
    )}
  </div>
);

export default MobileMenu;
