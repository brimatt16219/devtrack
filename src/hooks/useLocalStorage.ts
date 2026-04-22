import { useState, useEffect } from "react";

export function useLocalStorage<T>(key: string, initialValue: T) {
  const [value, setValue] = useState<T>(() => {
    // Lazy initializer — only runs once on mount, not every render
    try {
      const stored = localStorage.getItem(key);
      return stored ? (JSON.parse(stored) as T) : initialValue;
    } catch {
      // localStorage can throw in private browsing or if JSON is corrupted
      return initialValue;
    }
  });

  useEffect(() => {
    // Whenever value changes, write it to localStorage
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {
      // Silently fail — app still works, just won't persist
    }
  }, [key, value]);

  // Return the exact same signature as useState
  return [value, setValue] as const;
}