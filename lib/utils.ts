import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatDate = (createdAt: string) => {
  const date = new Date(createdAt);
  const month = date.toLocaleString("default", { month: "short" });
  const day = date.getDate();
  return `${month} ${day}`;
};
