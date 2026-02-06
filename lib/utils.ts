import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function cleanTitle(text: string): string {
  if (!text) return "";
  // Remove leading numbers followed by dot/underscore/dash (e.g., "1. ", "01_", "10.Storage")
  // Also replace underscores with spaces for readability
  return text
    .replace(/^\d+[._-]+\s*/, "")
    .replace(/_/g, " ")
    .replace(/\.md$/, "") // just in case
    .trim();
}
