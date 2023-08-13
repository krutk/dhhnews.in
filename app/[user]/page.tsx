"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Tabs from "@/components/Tabs";
import PostTitleDesc from "@/components/posts/postTitleDesc";
import PostImage from "@/components/posts/postImage";
import { PencilIcon } from "@heroicons/react/24/solid";
import Loader from "@/components/Loader";
import UserUpdateForm from "@/components/UpdateProfile";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import EnlargedImageModal from "@/components/EnlargedImageModal";
import { useSession } from "next-auth/react";

const Page = ({ params }: { params: { user: string } }) => {
  const { data: session } = useSession();
  const [user, setUser] = useState<any>();
  const [loading, setLoading] = useState(true);
  const [edit, setEdit] = useState(false);
  const [enlargedImage, setEnlargedImage] = useState<string | null>(null); // Track clicked image URL
  const [isModalOpen, setIsModalOpen] = useState(false); // Track modal state

  useEffect(() => {
    console.log("sessions", session);
    axios
      .get("/api/user", { params: { username: params.user } })
      .then((response) => {
        setUser(response.data);
      })
      .catch((error) => {
        console.error("Error fetching posts:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);
  const navigateToUpdatePage = () => {
    setEdit(!edit);
  };
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
  const openImageModal = (imageUrl: string) => {
    setEnlargedImage(imageUrl);
    setIsModalOpen(true);
  };

  const closeImageModal = () => {
    setEnlargedImage(null);
    setIsModalOpen(false);
  };
  if (loading) {
    return <Loader />;
  }
  return (
    <div>
      <div className="flex flex-col my-4">
        {/* <div className="inline-block h-[88px] w-[88px] bg-slate-600 rounded-full ring-2 ring-white"></div> */}
        {/* <img
          src={user?.image}
          alt={user.username}
          className="inline-block h-[88px] w-[88px] bg-slate-600 rounded-full ring-2 ring-white cursor-pointer"
          onClick={() => openImageModal(user?.image)}
        /> */}
        <Avatar className="inline-block h-[88px] w-[88px] bg-slate-600 rounded-full ring-2 ring-white cursor-pointer">
          <AvatarImage
            src={user?.image}
            className="inline-block h-[88px] w-[88px] bg-slate-600 rounded-full ring-2 ring-white cursor-pointer"
            onClick={() => openImageModal(user?.image)}
          />
          <AvatarFallback>{user.username[0]}</AvatarFallback>
        </Avatar>

        {/* <div className="flex justify-center flex-col ml-3"> */}
        <div className=" flex font-medium text-[24px] md:text-[42px]">
          <div className="cursor-pointer">{user?.username}</div>
          {session?.user.id === user?.id && (
            <PencilIcon
              className="fill-[#FF6D00] h-auto w-7 ml-6 cursor-pointer"
              onClick={navigateToUpdatePage} // Apply the function on icon click
            />
          )}
        </div>
        <div className="text-[14px]">{user?.NewsItem.length} Posts</div>
      </div>
      {edit ? <UserUpdateForm /> : <Tabs tabs={tabs} />}
      {isModalOpen && (
        <EnlargedImageModal
          imageUrl={enlargedImage}
          onClose={closeImageModal}
        />
      )}
    </div>
  );
};

export default Page;
