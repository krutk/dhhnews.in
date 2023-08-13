import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// export const formatDate = (createdAt: any) => {
//   const date = new Date(createdAt);
//   const month = date.toLocaleString("default", { month: "short" });
//   const day = date.getDate();
//   return `${month} ${day}`;
// };

export const formatDate = (createdAt: any) => {
  const currentDate = new Date();
  const postDate = new Date(createdAt);

  const currentYear = currentDate.getFullYear();
  const postYear = postDate.getFullYear();

  const month = postDate.toLocaleString("default", { month: "short" });
  const day = postDate.getDate();

  let formattedDate = `${month} ${day}`;

  if (postDate.toDateString() === currentDate.toDateString()) {
    const hours = postDate.getHours();
    const minutes = postDate.getMinutes();
    const ampm = hours >= 12 ? "pm" : "am";
    const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
    const formattedMinutes = minutes.toString().padStart(2, "0");
    formattedDate = `${formattedDate}, ${formattedHours}:${formattedMinutes} ${ampm}`;
  } else if (currentYear !== postYear) {
    formattedDate = `${formattedDate}, '${postYear.toString().slice(-2)}`;
  }

  return formattedDate;
};
