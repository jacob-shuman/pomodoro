import { useReducer } from "react";

export const useReduction = <T,>(initialState?: T) =>
  useReducer<(p: T, u: Partial<T>) => T>(
    (prev, updated) => ({ ...prev, ...updated }),
    initialState
  );

export default useReduction;
