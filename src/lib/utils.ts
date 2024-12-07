import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Utility function to combine and merge class names
 * using clsx and tailwind-merge for conditional and optimized class management.
 */
export function cn(...inputs: ClassValue[]): string {
  // Merge the classnames using clsx and tailwind-merge
  return twMerge(clsx(...inputs));
}