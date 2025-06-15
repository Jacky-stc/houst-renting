import { create } from "zustand";
import { persist } from "zustand/middleware";

interface UseToggleTheme {
  theme: string;
  setTheme: (theme: string) => void;
}

export const useToggleTheme = create<UseToggleTheme>()(
  persist(
    (set) => ({
      theme: "light",
      setTheme: (theme: string) =>
        set(() => ({
          theme: theme,
        })),
    }),
    {
      name: "theme",
    },
  ),
);
