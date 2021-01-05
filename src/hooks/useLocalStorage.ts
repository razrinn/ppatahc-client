import { useEffect, useState } from "react";
import { LOCAL_STORAGE_PREFIX } from "../utils/constants";

export function useLocalStorage(key: string, initialValue: any) {
  const prefixedKey = LOCAL_STORAGE_PREFIX + key;
  const [value, setValue] = useState(() => {
    const cached = localStorage.getItem(prefixedKey);
    if (cached !== null) return JSON.parse(cached);
    if (typeof cached === "function") {
      return initialValue();
    } else {
      return initialValue;
    }
  });

  useEffect(() => {
    localStorage.setItem(prefixedKey, JSON.stringify(value));
  }, [prefixedKey, value]);

  return [value, setValue];
}
