import { formatDate } from "@/lib/utils";
import Link from "next/link";
import React from "react";

interface PostTitleDescProps {
  post: any;
  isTrending?: boolean;
}

const PostTitleDesc: React.FC<PostTitleDescProps> = ({ post, isTrending }) => {
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
          <span key={index} className="ml-2">
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
};

export default PostTitleDesc;
