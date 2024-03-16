/**
 * Converts a JavaScript Date object to Unix timestamp.
 * @param date - The Date object to convert.
 * @returns The Unix timestamp (number of seconds since January 1, 1970).
 */
export function toUnixTimestamp(date: Date): number {
  return Math.floor(date.getTime() / 1000);
}
