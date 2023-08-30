"use client";
// import React, { createContext, useContext, useEffect, useState } from "react";
// import axios from "axios";

type Post = {
  id: string;
  title: string;
  tags: string[];
  imageUrl: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  userId: string;
  isApproved: boolean;
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

// type PostsContextType = {
//   posts: Post[];
//   loading: boolean;
//   error: any;
// };

// const PostsContext = createContext<PostsContextType>({
//   posts: [],
//   loading: true,
//   error: null,
// });

// export const usePostsContext = () => useContext(PostsContext);

// const PostsProvider: any = ({ children }: any) => {
//   const [posts, setPosts] = useState<Post[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<any>(null);

//   useEffect(() => {
//     axios
//       .get("/api/posts")
//       .then((response) => {
//         setPosts(response.data);
//         setLoading(false);
//       })
//       .catch((error) => {
//         console.error("Error fetching posts:", error);
//         setError(error);
//         setLoading(false);
//       });
//   }, []);

//   return (
//     <PostsContext.Provider value={{ posts, loading, error }}>
//       {children}
//     </PostsContext.Provider>
//   );
// };

// export default PostsProvider;

import React, { createContext, useContext, useState } from "react";
import axios from "axios";

type PostsContextType = {
  posts: Post[];
  loading: boolean;
  error: any;
};

const PostsContext = createContext<PostsContextType>({
  posts: [],
  loading: true,
  error: null,
});

export const usePostsContext = () => useContext(PostsContext);

export async function getServerSideProps() {
  try {
    const response = await axios.get("/api/posts");
    const posts = response.data;

    return {
      props: {
        posts,
      },
    };
  } catch (error) {
    console.error("Error fetching posts:", error);
    return {
      props: {
        posts: [],
        error: "Error fetching posts",
      },
    };
  }
}

const PostsProvider: React.FC = ({ children }: any) => {
  // This can be an empty array as the data will be fetched using getServerSideProps
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any>(null);

  // No need for the useEffect here

  return (
    <PostsContext.Provider value={{ posts, loading, error }}>
      {children}
    </PostsContext.Provider>
  );
};

export default PostsProvider;
