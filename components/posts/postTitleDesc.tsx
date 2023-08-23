import { formatDate } from "@/lib/utils";
import { TrashIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import React from "react";
import { Badge } from "@/components/ui/badge";

interface PostTitleDescProps {
  post: any;
  isTrending?: boolean;
  session?: any;
  setLoading: Function;
  profile?: boolean;
  isAdmin?: boolean;
}

const PostTitleDesc: React.FC<PostTitleDescProps> = ({
  post,
  isTrending,
  session,
  setLoading,
  profile,
  isAdmin,
}) => {
  console.log("post: " + JSON.stringify(post));
  const handleDeletePost = async () => {
    setLoading(true);
    const PostData = { id: post.id };
    const deletePostResponse = await fetch("/api/delete-post", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(PostData),
    });
    setLoading(false);
  };
  const handleApproval = async () => {
    setLoading(true);
    const Data = { id: post.id, isApproved: post.isApproved };
    await fetch("/api/news/update", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(Data),
    });
    setLoading(false);
  };
  console.log("post approve-->", post);

  return (
    <div>
      <Link href={`/news/${post.id}`}>
        <div
          className={`font-bold ${
            isTrending ? "text-base" : "text-[16px] md:text-[20px]"
          } cursor-pointer`}
        >
          {post.title}
        </div>
      </Link>
      {!isTrending && (
        <div className="text-gray-600 description text-[16px] line-clamp-2 md:line-clamp-3">
          {post.description}
        </div>
      )}
      <div className="text-gray-600 text-[13px] flex items-center">
        <span className="mr-2">{formatDate(post.updatedAt)}</span>
        <span className="text-center w-1 h-1 bg-gray-600 rounded-full inline-block"></span>
        {post.tags.map((tag: any, index: React.Key | null | undefined) => (
          // <span key={index} className="ml-2">
          //   {tag}
          // </span>
          <Badge
            key={index}
            className="ml-2 text-gray-700 bg-[#FFE3CE] hover:bg-[#FF994E]"
          >
            {tag}
          </Badge>
        ))}
        {profile && session?.user.id === post?.userId && (
          <>
            <span className="text-center ml-2 w-1 h-1 bg-gray-600 rounded-full inline-block"></span>
            {post?.isApproved ? (
              <span className="ml-2 text-[#0092FF]">Approved</span>
            ) : (
              <span className="ml-2 text-[#FF6D00] font-semibold">
                In Approval
              </span>
            )}
          </>
        )}

        {session?.user.id === post?.userId ||
          (isAdmin && (
            <>
              <span className="text-center ml-2 w-1 h-1 bg-gray-600 rounded-full inline-block"></span>
              <TrashIcon
                className="fill-[#FF6D00] h-auto w-4 ml-2 cursor-pointer"
                onClick={handleDeletePost} // Apply the function on icon click
              />
            </>
          ))}
        {isAdmin && (
          <>
            <span className="text-center ml-2 w-1 h-1 bg-gray-600 rounded-full inline-block"></span>
            {/* <div className="cursor-pointer  "> */}
            {post?.isApproved ? (
              <Badge
                onClick={handleApproval}
                className="cursor-pointer ml-2 bg-[#CEEAFF] text-[#0092FF] font-semibold hover:bg-[#FFE3CE]"
              >
                UnApprove
              </Badge>
            ) : (
              <Badge
                onClick={handleApproval}
                className="cursor-pointer ml-2 bg-[#FFE3CE] font-semibold text-[#FF6D00] hover:bg-[#CEEAFF]"
              >
                Approve
              </Badge>
            )}
            {/* </div> */}
          </>
        )}
      </div>
    </div>
  );
};

export default PostTitleDesc;
