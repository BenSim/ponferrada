/**
 * Ellipsify string in the middle of it. So you can check start and end parts of the long string
 * @param full string to ellipsify
 * @param maxLength must be minimum 4 characters
 */
export declare function ellipsify(full: string, maxLength: number): string;
/**
 * Ellipsify string in the middle of it. So you can check start and end parts of the long string
 * @param full string to ellipsify
 * @param maxLength must be minimum 5 characters
 */
export declare function ellipsifyMiddle(full: string, maxLength: number): string;
/**
 * Ellipsify string in the middle of it, leaving the first 9 characters and the last 5
 * @param full string to ellipsify
 */
export declare function ellipsifyAddress(full: string): string;
