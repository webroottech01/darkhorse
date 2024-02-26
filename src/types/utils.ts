/**
 * Simplify a type by merging intersections if possible
 * @param T - type to simplify
 */
export type Simplify<T> = T extends unknown ? { [K in keyof T]: T[K] } : T
