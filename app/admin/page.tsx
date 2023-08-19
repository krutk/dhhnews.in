"use client";
import React, { useEffect, useState } from "react";
import { getSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Loader from "@/components/Loader";

const page = () => {
  const router = useRouter();
  const [isPageLoading, setIsPageLoading] = useState(true);
  useEffect(() => {
    const fetchSession = async () => {
      const session: any = await getSession();
      console.log("getSession--> ", session?.user?.role);
      if (session?.user?.role != "ADMIN") {
        router.push("/");
      } else {
        setIsPageLoading(false);
      }
    };

    fetchSession();
  }, []);
  if (isPageLoading) {
    return <Loader />;
  }

  return <div>page</div>;
};

export default page;
