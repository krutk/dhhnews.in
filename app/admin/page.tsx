"use client";
import React, { useEffect, useState } from "react";
import { getSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Loader from "@/components/Loader";
import { usePostsContext } from "@/components/contexts/PostsContext";
import PostTitleDesc from "@/components/posts/postTitleDesc";
import PostImage from "@/components/posts/postImage";
import Tabs from "@/components/Tabs";
import ListUser from "@/components/admin/listUsers";
import axios from "axios";

const page = () => {
  const router = useRouter();
  const [isPageLoading, setIsPageLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const [isUserLoading, setIsUserLoading] = useState(true);
  const { posts, loading, error } = usePostsContext();
  useEffect(() => {
    const fetchSession = async () => {
      const session: any = await getSession();
      console.log("getSession--> ", session?.user?.role);
      if (session?.user?.role != "ADMIN") {
        router.push("/");
      } else {
        setIsPageLoading(false);
      }
    };

    fetchSession();
  }, []);
  useEffect(() => {
    const fetchUsers = async () => {
      const users = await axios.get("/api/users");
      console.log("<--users-->", users.data);
      setUsers(users.data);
    };
    fetchUsers();
    setIsUserLoading(false);
  }, [isUserLoading]);

  if (isPageLoading) {
    return <Loader />;
  }

  const tabs = [
    {
      id: 1,
      label: "Posts",
      content: loading ? (
        <Loader />
      ) : (
        posts.map((news: any) => (
          <div key={news.id} className="flex w-full items-center mb-12">
            <div className="w-full md:w-2/3">
              <PostTitleDesc
                isAdmin={true}
                profile={true}
                setLoading={setIsPageLoading}
                post={news}
              />
            </div>
            <PostImage imageUrl={news?.imageUrl} />
          </div>
        ))
      ),
    },
    {
      id: 2,
      label: "Users",
      content: isUserLoading ? (
        <Loader />
      ) : (
        users.map((user: any) => {
          return (
            <>
              <ListUser
                key={user.id}
                setIsUserLoading={setIsUserLoading}
                user={user}
              />
            </>
          );
        })
      ),
    },
  ];

  return (
    <div>
      <Tabs tabs={tabs} />
    </div>
  );
};

export default page;
