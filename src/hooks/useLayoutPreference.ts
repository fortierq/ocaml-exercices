import { useEffect, useState } from 'react';

export function useLayoutPreference(key: string, fallback: number, min: number, max: number) {
  const [value, setValue] = useState(() => {
    try {
      const stored = localStorage.getItem(key);
      const parsed = stored === null ? fallback : Number(stored);
      return Number.isFinite(parsed) ? Math.min(max, Math.max(min, parsed)) : fallback;
    } catch {
      return fallback;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(key, String(value));
    } catch {
      // Resizing still works when browser storage is unavailable.
    }
  }, [key, value]);

  return [value, setValue] as const;
}
