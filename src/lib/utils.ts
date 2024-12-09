import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Combines class names conditionally and merges Tailwind utility classes.
 *
 * @param inputs - An array of class names or conditions to resolve to class strings.
 * @returns A single, optimized string of class names.
 *
 * This function uses:
 * - `clsx` for conditional class name handling.
 * - `tailwind-merge` to resolve conflicting Tailwind utility classes.
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(...inputs));
}