import { create } from "zustand";
import { persist } from "zustand/middleware";

interface PersonStore {
  person: string;
  setPerson: (_newPerson: string) => void;
}

const usePersonStore = create<PersonStore>()(
  persist(
    (set) => ({
      person: "",
      setPerson: (newPerson: string) => {
        set({ person: newPerson });
      },
    }),
    {
      name: "person-storage", // Key in localStorage
    },
  ),
);

export default usePersonStore;
