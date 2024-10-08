import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Formats a date or timestamp into a specified string format.
 * @param date - The date or timestamp to format.
 * @param options - Options for formatting the date and/or time.
 * @returns A formatted date-time string.
 */
export function formatDateTime(
  date: string | number | Date,
  options: Intl.DateTimeFormatOptions = {
    dateStyle: "medium",
    timeStyle: "short",
  }
): string {
  const parsedDate =
    typeof date === "string" || typeof date === "number" ? new Date(date) : date

  // Use the built-in Intl.DateTimeFormat for formatting
  return new Intl.DateTimeFormat("en-US", options).format(parsedDate)
}
