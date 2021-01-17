export type WithValidated<T, B, P extends string> = T &
  Omit<T, P> &
  { [k in P]: B }
