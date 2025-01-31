import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function formatDate(input) {
  const date = new Date(input);
  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export function absoluteUrl(path) {
  return `${process.env.NEXT_PUBLIC_APP_URL}${path}`;
}

export function convertToChildren(data) {
    // Base case: If data is not an array, return it directly
    if (!Array.isArray(data)) return data;

    return data.map((item) => {
      const convertedItem = { ...item }; // Copy the current item

      // Iterate through the keys to find level_xx arrays
      Object.keys(convertedItem).forEach((key) => {
        if (key.startsWith("level_") && Array.isArray(convertedItem[key])) {
          // Recursively convert nested levels to children
          convertedItem.children = convertToChildren(convertedItem[key]);
          delete convertedItem[key]; // Remove the original level_xx key
        }
      });

      return convertedItem;
    });
  }