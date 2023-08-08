import React from 'react'

const PostImage = ({ imageUrl }: any) => {
    return (
        <div className=" hidden md:block w-32 h-32 mx-8">
            {imageUrl ? (
                <img
                    src={imageUrl}
                    alt="post"
                    className="w-full h-full object-cover rounded"
                />
            ) : null}
        </div>
    )
}

export default PostImage