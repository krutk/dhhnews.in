import React, { MouseEventHandler } from "react";
import Link from "next/link";
import MobileMenuItem from "./MobileMenuItem";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { usePathname } from "next/navigation";

type DesktopMenuProps = {
  setMobileMenuOpen: Function;
  session: any;
  handleLogout: MouseEventHandler<HTMLDivElement>;
};

const DesktopMenu = ({
  setMobileMenuOpen,
  session,
  handleLogout,
}: DesktopMenuProps) => {
  const pathname = usePathname();

  return (
    <div className="hidden sm:flex items-center font-bold font-instrument-sans text-lg space-x-5">
      <MobileMenuItem setMobileMenuOpen={setMobileMenuOpen} href="/">
        Home
      </MobileMenuItem>
      <MobileMenuItem setMobileMenuOpen={setMobileMenuOpen} href="/about">
        About
      </MobileMenuItem>
      <MobileMenuItem setMobileMenuOpen={setMobileMenuOpen} href="/news">
        News
      </MobileMenuItem>
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
                </DropdownMenuTrigger>
                <DropdownMenuContent className=" absolute mt-2 right-0 w-36 py-2 bg-white border border-gray-300 rounded shadow">
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

                  {session?.user?.role === "ADMIN" && (
                    <Link href="/admin">
                      <DropdownMenuLabel className="cursor-pointer rounded-md px-4 py-2 hover:bg-[#FF994E]">
                        Admin
                      </DropdownMenuLabel>
                    </Link>
                  )}

                  <DropdownMenuLabel
                    onClick={handleLogout}
                    className="cursor-pointer rounded-md px-4 py-2 hover:bg-[#FF994E]"
                  >
                    Logout
                  </DropdownMenuLabel>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>{" "}
        </div>
      ) : (
        // <div className="cursor-pointer">
        //   <Link href="/signin">Sign In</Link>
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
            <MobileMenuItem
              setMobileMenuOpen={setMobileMenuOpen}
              href="/signin"
            >
              Sign In
            </MobileMenuItem>
          )}
          {pathname !== "/signin" && pathname !== "/register" && (
            <MobileMenuItem
              setMobileMenuOpen={setMobileMenuOpen}
              href="/signin"
            >
              Sign In
            </MobileMenuItem>
          )}
        </>
      )}
    </div>
  );
};

export default DesktopMenu;
