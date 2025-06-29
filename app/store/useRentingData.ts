import { create } from "zustand";
import { HouseListData, RentingData, SearchStatus } from "../types/search";

type PageNow = "Home" | "MyHouseList";

interface useRentingDataType {
  isLoading: boolean;
  rentingData: RentingData | null;
  rentingList: HouseListData[];
  searchStatus: SearchStatus;
  pageNow: PageNow;
  personName: string;
  setRentingList: (_rentingList: HouseListData[]) => void;
}
export const useRentingData = create<useRentingDataType>(() => ({
  isLoading: false,
  rentingData: null,
  rentingList: [],
  searchStatus: "default",
  pageNow: "Home",
  personName: "",
  setRentingList: (rentingList) => {
    useRentingData.setState({ rentingList: rentingList, isLoading: false });
  },
}));
