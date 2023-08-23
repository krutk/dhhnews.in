import React from "react";
import Link from "next/link";

type MobileMenuItemProps = {
  setMobileMenuOpen: Function;
  href: string;
  children: string;
};

const MobileMenuItem = ({
  href,
  children,
  setMobileMenuOpen,
}: MobileMenuItemProps) => (
  <Link
    href={href}
    onClick={() => setMobileMenuOpen(false)}
    className="-mx-3 w-fit block rounded-lg px-3 py-2 text-lg font-semibold leading-7 text-gray-900 group transition duration-300"
  >
    <div>{children}</div>
    <span className="block max-w-0 group-hover:max-w-full transition-all duration-500 h-0.5 bg-[#FF6D00]"></span>
  </Link>
);

export default MobileMenuItem;
