"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

type User = {
  id: string;
  username: string;
  email: string;
  emailVerified: string | null;
  verificationToken: string;
  resetToken: string;
  about: string;
  image: string | null;
  hashedPassword: string;
  createdAt: string;
  updatedAt: string;
  role: string;
  isVerified: boolean;
};

type UsersContextType = {
  users: User[];
  loading: boolean;
  error: any;
};

const UsersContext = createContext<UsersContextType>({
  users: [],
  loading: true,
  error: null,
});

export const useUsersContext = () => useContext(UsersContext);

const UsersProvider: any = ({ children }: any) => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    axios
      .get("/api/users")
      .then((response) => {
        setUsers(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching posts:", error);
        setError(error);
        setLoading(false);
      });
  }, []);

  return (
    <UsersContext.Provider value={{ users, loading, error }}>
      {children}
    </UsersContext.Provider>
  );
};

export default UsersProvider;
