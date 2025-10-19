import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface PersonStore {
  person: PersonName;
  setPerson: (_newPerson: PersonName) => void;
}

export type PersonName = '阿聖' | 'K' | '黑' | '查' | '承恩' | '至倫' | '小豪' | '岳' | '威翔' | '';

const usePersonStore = create<PersonStore>()(
  persist(
    (set) => ({
      person: '',
      setPerson: (newPerson: PersonName) => {
        set({ person: newPerson });
      },
    }),
    {
      name: 'person-storage', // Key in localStorage
    }
  )
);

export default usePersonStore;
