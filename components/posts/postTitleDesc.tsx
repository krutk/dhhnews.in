import { formatDate } from '@/lib/utils'
import Link from 'next/link'
import React from 'react'

const PostTitleDesc = ({ post }: any) => {
    return (<div>
        <Link href={`/news/${post.id}`}>
            <div className="font-bold text-[16px] md:text-[20px] cursor-pointer">
                {post.title}
            </div>
        </Link>
        <div className="text-gray-600 description text-[16px] line-clamp-2 md:line-clamp-3">
            {post.description}
        </div>
        <div className="text-gray-600 text-[13px] flex items-center">
            <span className="mr-2">{formatDate(post.createdAt)}</span>
            <span className="text-center w-1 h-1 bg-gray-600 rounded-full inline-block"></span>
            {post.tags.map((tag: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | React.PromiseLikeOfReactNode | null | undefined, index: React.Key | null | undefined) => (
                <span key={index} className="ml-2">
                    {tag}
                </span>
            ))}
        </div>
    </div>
    )
}

export default PostTitleDesc