import { create } from "zustand";
import { persist } from "zustand/middleware";

interface UseBookmarkStore {
  bookmarkList: Set<string>;
  toggleBookmarkList: (index: string) => void;
  setBookmarkList: (list: string[]) => void;
}

interface UseDisplayData {
  displayData: string;
  changeDisplayData: (dataType: string) => void;
}

interface UseSearchingData {
  houseList: { value: string[]; index: number }[];
  setHouseList: (houseListData: { value: string[]; index: number }[]) => void;
}

interface UseSearchingStatus {
  searchStatus: string;
  setSearchStatus: (status: string) => void;
}

interface UseLoading {
  isLoading: boolean;
  setIsLoading: (status: boolean) => void;
}

interface UsePageNow {
  pageNow: string;
  setPageNow: (page: string) => void;
}

interface UseToggleTheme {
  theme: string;
  setTheme: (theme: string) => void;
}

export const useBookmarkStore = create<UseBookmarkStore>()(
  persist(
    (set) => ({
      bookmarkList: new Set<string>(),

      toggleBookmarkList: (index: string) =>
        set((state) => {
          const newSet = new Set(state.bookmarkList);
          if (newSet.has(index)) {
            newSet.delete(index);
          } else {
            newSet.add(index);
          }
          return { bookmarkList: newSet };
        }),

      setBookmarkList: (list: string[]) =>
        set(() => ({
          bookmarkList: new Set(list),
        })),
    }),
    {
      name: "bookmark-storage", // localStorage 的 key,
      partialize: (state) => ({
        bookmarkList: Array.from(state.bookmarkList),
      }),
      merge: (persistedState, currentState) => {
        const parsedState = persistedState as { bookmarkList?: string[] };
        return {
          ...currentState,
          bookmarkList: new Set(parsedState?.bookmarkList || []), // Array 轉回 Set
        };
      },
    },
  ),
);

export const useDisplayData = create<UseDisplayData>((set) => ({
  displayData: "Search",
  changeDisplayData: (dataType: string) =>
    set(() => ({
      displayData: dataType,
    })),
}));

export const useSearchingData = create<UseSearchingData>((set) => ({
  houseList: [],
  rentingData: [],
  setHouseList: (houseListData) =>
    set(() => ({
      houseList: houseListData,
    })),
}));

export const useSearchStatus = create<UseSearchingStatus>((set) => ({
  searchStatus: "default",
  setSearchStatus: (status: string) =>
    set(() => ({
      searchStatus: status,
    })),
}));

export const useLoading = create<UseLoading>((set) => ({
  isLoading: false,
  setIsLoading: (status: boolean) =>
    set(() => ({
      isLoading: status,
    })),
}));

export const usePageNow = create<UsePageNow>((set) => ({
  pageNow: "Home",
  setPageNow: (page: string) =>
    set(() => ({
      pageNow: page,
    })),
}));

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
