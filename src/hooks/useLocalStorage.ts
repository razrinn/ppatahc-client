import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { LOCAL_STORAGE_PREFIX } from "../utils/constants";

export function useLocalStorage<T>(
  key: string,
  initialValue: T | (() => T)
): [T, Dispatch<SetStateAction<T>>] {
  const prefixedKey = LOCAL_STORAGE_PREFIX + key;
  const [value, setValue] = useState<T>(() => {
    const cached = localStorage.getItem(prefixedKey);
    if (cached !== null) return JSON.parse(cached);
    if (typeof cached === "function") {
      return (initialValue as () => T)();
    } else {
      return initialValue;
    }
  });

  useEffect(() => {
    localStorage.setItem(prefixedKey, JSON.stringify(value));
  }, [prefixedKey, value]);

  return [value, setValue];
}
