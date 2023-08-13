"use client";
import React from "react";
import { usePostsContext } from "@/components/contexts/PostsContext";
import { formatDate } from "@/lib/utils";
import Link from "next/link";
import PostUser from "./postUser";
import PostTitleDesc from "./postTitleDesc";

const trendingPost = () => {
  const { posts, loading, error } = usePostsContext();

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-4">
      {posts.slice(0, 6).map((item, index) => (
        <div key={index} className=" p-4">
          {/* <div className="flex items-center mb-2">
            <div className="bg-logo w-5 h-5 rounded-full mr-2 bg-cover"></div>
            <div className="text-gray-600 text-sm">{item.user.username}</div>
          </div> */}
          <PostUser post={item} />
          <PostTitleDesc post={item} isTrending={true} />
          {/* <Link href={`/news/${item.id}`}>
            <div className="font-bold text-base">{item.title}</div>
          </Link>
          <div className="text-gray-600">{formatDate(item.updatedAt)}</div> */}
        </div>
      ))}
    </div>
  );
};

export default trendingPost;
