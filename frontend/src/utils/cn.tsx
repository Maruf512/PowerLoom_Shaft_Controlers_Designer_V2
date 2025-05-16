import clsx from "clsx";
import { twMerge } from "tailwind-merge";

export const cn = (...inputs: string[]) => {
  return twMerge(clsx(inputs));
};
