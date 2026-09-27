import { useMemo } from "react";

/** English-only copy helper retained for consistent page copy. */
export function LanguageProvider({ children }: { children: React.ReactNode }) {
  return children;
}

export function useLanguage() {
  return useMemo(() => ({ t: (value: string) => value }), []);
}
