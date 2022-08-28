export type Loose<T extends K, K extends (string | number)> = T | Omit<K, T>