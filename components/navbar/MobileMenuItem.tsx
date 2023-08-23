import React from "react";
import Link from "next/link";

type MobileMenuItemProps = {
  href: string;
  children: string;
};

const MobileMenuItem = ({ href, children }: MobileMenuItemProps) => (
  <Link
    href={href}
    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-[#FF994E]"
  >
    {children}
  </Link>
);

export default MobileMenuItem;
