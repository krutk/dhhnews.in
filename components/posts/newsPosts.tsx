"use client"
import { formatDate } from '@/lib/utils';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

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
    const formattedDate = formatDate(post.createdAt);
    console.log("post---->", post);
    return (
        <div className="flex w-full items-center mb-12">

            <div className='w-2/3'>
                <div className='flex items-center mb-2'>
                    <div className='bg-logo w-5 h-5 rounded-full mr-2 bg-cover'></div>
                    <div className='text-gray-600 text-xs text-center font-medium'>{post.user.username}</div>
                </div>
                <div className="font-bold text-[20px]">{post.title}</div>
                <div className="text-gray-600 description text-[16px]">{post.description}</div>
                <div className="text-gray-600 text-[13px] flex items-center">
                    <span className="mr-2">{formattedDate}</span>
                    <span className="text-center w-1 h-1 bg-gray-600 rounded-full inline-block"></span>
                    {post.tags.map((tag: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | React.PromiseLikeOfReactNode | null | undefined, index: React.Key | null | undefined) => (
                        <span key={index} className="ml-2">
                            {tag}
                        </span>
                    ))}
                </div>
            </div>
            <div className="w-32 h-32 mx-8">
                {/* <div className='bg-logo w-full h-full object-cover bg-contain bg-no-repeat'></div> */}
                {post?.imageUrl ? <img src={post.imageUrl} alt={"post"} className="w-full h-full object-cover rounded" /> : null}
            </div>
        </div>
    );
};

const AllPosts = () => {
    const [posts, setPosts] = useState<Post[]>([]);

    useEffect(() => {
        axios.get('/api/posts')
            .then((response) => {
                console.log("response0----data--->", response.data);
                setPosts(response.data); // Set the fetched posts to the state
            })
            .catch((error) => {
                console.error('Error fetching posts:', error);
            });
    }, []);

    return (
        <div>
            {posts.map((post, index) => (
                <Post key={index} post={post} />
            ))}
        </div>
    );
};

export default AllPosts;
