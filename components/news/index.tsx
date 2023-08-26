"use client";
import React, { Suspense, useEffect, useState } from "react";
const NewsPosts = React.lazy(() => import("../posts/newsPosts"));
import Loading from "@/app/news/loading";
import { useRouter, usePathname } from "next/navigation";

const tags = [
  "Lafda",
  "Review",
  "Opinion",
  "Article",
  "Song",
  "Album/EP/Mixtape",
  "Views",
  "Interview",
  "Playlist",
  "Live Show",
];

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [selectedSortOption, setSelectedSortOption] = useState("");
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Simulate API call delay
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  const handleSortOptionClick = (option: React.SetStateAction<string>) => {
    if (selectedSortOption === option) {
      setSelectedSortOption(""); // Deselect if already selected
    } else {
      setSelectedSortOption(option); // Select if unselected
    }
    // Perform sorting or other operations based on the selected option
    console.log(option);
  };

  return (
    <div className="w-full pt-8 pb-6">
      {/* Sorting by Tags Section */}
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <div className="flex flex-wrap items-center gap-4 mb-8 font-inter">
            <div
              onClick={() => {
                if (pathname === "/news") {
                  window.location.reload();
                } else {
                  router.push("/news");
                }
              }}
              className={`font-normal sm:font-medium text-xs px-2 py-1 sm:text-base sm:px-3 sm:py-1 rounded-3xl cursor-pointer bg-[#FFE3CE]
                                }`}
            >
              Refresh
            </div>
            {/* <div
              onClick={() => handleSortOptionClick("Lafda")}
              className={`font-medium text-base px-3 py-1 rounded-3xl cursor-pointer ${
                selectedSortOption === "Lafda" ? "bg-[#FF994E]" : "bg-[#FFE3CE]"
              }`}
            >
              Lafda
            </div>
            <div
              onClick={() => handleSortOptionClick("Song")}
              className={`font-medium text-base px-3 py-1 rounded-3xl cursor-pointer ${
                selectedSortOption === "Song" ? "bg-[#FF994E]" : "bg-[#FFE3CE]"
              }`}
            >
              Song
            </div>
            <div
              onClick={() => handleSortOptionClick("Album")}
              className={`font-medium text-base px-3 py-1 rounded-3xl cursor-pointer ${
                selectedSortOption === "Album" ? "bg-[#FF994E]" : "bg-[#FFE3CE]"
              }`}
            >
              Album
            </div>
            <div
              onClick={() => handleSortOptionClick("Update")}
              className={`font-medium text-base px-3 py-1 rounded-3xl cursor-pointer ${
                selectedSortOption === "Update"
                  ? "bg-[#FF994E]"
                  : "bg-[#FFE3CE]"
              }`}
            >
              Update
            </div> */}
            {pathname === "/news" &&
              tags.map((tag) => {
                return (
                  <div
                    key={tag}
                    onClick={() => handleSortOptionClick(tag)}
                    className={`font-normal sm:font-medium text-xs px-2 py-1 sm:text-base sm:px-3 sm:py-1 rounded-3xl cursor-pointer ${
                      selectedSortOption === tag
                        ? "bg-[#FF994E]"
                        : "bg-[#FFE3CE]"
                    }`}
                  >
                    {tag}{" "}
                    {/* Use curly braces to render the actual tag value */}
                  </div>
                );
              })}
          </div>
          <NewsPosts selectedSortOption={selectedSortOption} />
        </>
      )}
    </div>
  );
};

export default Index;
