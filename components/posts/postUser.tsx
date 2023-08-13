import Link from "next/link";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

const postUser = ({ post }: any) => {
  return (
    <div className="flex items-center mb-2">
      <Avatar className="w-5 h-5 rounded-full mr-2 bg-cover">
        <AvatarImage src={post?.user?.image} />
        <AvatarFallback>{post?.user?.username[0]}</AvatarFallback>
      </Avatar>
      <Link href={`/${post.user.username}`}>
        <div className="text-gray-600 text-xs text-center font-medium">
          {post.user.username}
        </div>
      </Link>
    </div>
  );
};

export default postUser;
