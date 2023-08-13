"use client";
import { formatDate } from "@/lib/utils";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { usePostsContext } from "../contexts/PostsContext";
import PostTitleDesc from "./postTitleDesc";
import PostImage from "./postImage";
import PostUser from "./postUser";
import Loader from "@/components/Loader";
type Post = {
  id: string;
  title: string;
  tags: string[];
  imageUrl: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  userId: string;
  user: {
    id: string;
    username: string;
    email: string;
    emailVerified: string | null;
    image: string | null;
    hashedPassword: string;
    createdAt: string;
    updatedAt: string;
  };
};

const Post = ({ post }: { post: Post }) => {
  const formattedDate = formatDate(post.updatedAt);

  return (
    <div className="flex w-full items-center mb-12">
      <div className="w-full md:w-2/3">
        {/* <div className="flex items-center mb-2">
          <div className="bg-logo w-5 h-5 rounded-full mr-2 bg-cover"></div>
          <Link href={`/${post.user.username}`}>
            <div className="text-gray-600 text-xs text-center font-medium">
              {post.user.username}
            </div>
          </Link>
        </div> */}
        <PostUser post={post} />
        <PostTitleDesc post={post} />
      </div>
      <PostImage imageUrl={post?.imageUrl} />
    </div>
  );
};

const AllPosts = ({ selectedSortOption }: any) => {
  const { posts, loading, error } = usePostsContext();

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <div>Error fetching posts.</div>;
  }
  console.log("posts--->", posts);

  const filteredPosts = posts.filter((post) => {
    // Assuming "tags" is an array of strings in each post
    return selectedSortOption ? post.tags.includes(selectedSortOption) : posts;
  });

  return (
    <div>
      {filteredPosts.length ? (
        filteredPosts.map((post, index) => <Post key={index} post={post} />)
      ) : (
        <div className=" text-gray-600 text-lg font-bold mt-8">
          No posts found
        </div>
      )}
    </div>
  );
};

export default AllPosts;
