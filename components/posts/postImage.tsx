import React from "react";

const PostImage = ({ imageUrl }: any) => {
  return (
    <div className=" hidden md:block w-32 h-32 mx-8">
      {imageUrl ? (
        <img
          src={imageUrl}
          alt="post"
          className="w-full h-full object-cover rounded"
        />
      ) : (
        <img
          src={
            "https://res.cloudinary.com/dexfnfjrx/image/upload/v1692909000/dhh-collage_ih2zah.jpg"
          }
          alt="post"
          className="w-full h-full object-cover rounded"
        />
      )}
    </div>
  );
};

export default PostImage;
