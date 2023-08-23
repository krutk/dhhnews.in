import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

const index = ({ setIsUserLoading, user }: any) => {
  const handleUserUpdate = async (e: any) => {
    e.preventDefault();
    const Data = { id: user.id, userRole: "ADMIN" };
    await fetch("/api/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(Data),
    });
    setIsUserLoading(true);
  };
  console.log("user in listusers", user);
  return (
    <div className="flex bg-white shadow-md rounded-md p-4 my-4 w-full md:w-1/2 ">
      <div className="flex items-center justify-center mr-4">
        <Avatar className="inline-block w-16 h-16 rounded-full ring-2 ring-white cursor-pointer">
          <AvatarImage
            src={user?.image}
            className="inline-block w-16 h-16 rounded-full ring-2 ring-white cursor-pointer"
          />
          <AvatarFallback className="text-4xl">
            {user?.username[0]?.toUpperCase()}
          </AvatarFallback>
        </Avatar>
      </div>
      <div className="mt-4">
        <Link href={`/${user.username}`} className="text-xl font-semibold">
          {user.username}
        </Link>
        <p className="text-gray-600">{user.about}</p>
        <div className="flex">
          <p className="mt-2 text-base font-medium text-gray-500 mr-4">
            {user.role}
          </p>{" "}
          <Badge
            onClick={handleUserUpdate}
            variant="outline"
            className="mt-2 text-sm font-medium text-gray-500 cursor-pointer hover:bg-gray-100"
          >
            {" change to admin"}
          </Badge>
        </div>
        <p className="mt-2 text-sm text-gray-500">{user.email}</p>
      </div>
    </div>
  );
};

export default index;
