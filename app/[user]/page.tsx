"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Tabs from "@/components/Tabs";
import PostTitleDesc from "@/components/posts/postTitleDesc";
import PostImage from "@/components/posts/postImage";

const Page = ({ params }: { params: { user: string } }) => {
  const [user, setUser] = useState<any>();
  useEffect(() => {
    axios
      .get("/api/user", { params: { username: params.user } })
      .then((response) => {
        setUser(response.data);
      })
      .catch((error) => {
        console.error("Error fetching posts:", error);
      });
  }, []);
  const tabs = [
    {
      id: 1,
      label: "Posts",
      content: user?.NewsItem.map((news: any) => {
        return (
          <div className="flex w-full items-center mb-12">
            <div className="w-full md:w-2/3">
              <PostTitleDesc post={news} />
            </div>
            <PostImage imageUrl={news?.imageUrl} />
          </div>
        );
      }),
    },
    {
      id: 2,
      label: "About",
      content: user?.about,
    },
  ];
  return (
    <div>
      <div className="flex flex-col my-4">
        {/*<div className="inline-block h-[88px] w-[88px] bg-slate-600 rounded-full ring-2 ring-white"></div>*/}
        {/*<div className="flex justify-center flex-col ml-3">*/}
        <div className="cursor-pointer font-medium text-[24px] md:text-[42px]">
          {user?.username}
        </div>
        <div className="text-[14px]">{user?.NewsItem.length} Posts</div>
        {/*</div>*/}
      </div>
      <Tabs tabs={tabs} />
    </div>
  );
};

export default Page;
