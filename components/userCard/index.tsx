import React from "react";

const UserCard = ({ user }: any) => {
  return (
    <div className="bg-transparent shadow-md rounded-lg p-4">
      <img
        src={user.image}
        alt={user.username}
        className="w-24 h-24 rounded-full mx-auto"
      />
      <div className="mt-4 text-center">
        <div className="font-bold text-lg">{user.username}</div>
        {/* Add other user details here */}
      </div>
    </div>
  );
};

export default UserCard;
