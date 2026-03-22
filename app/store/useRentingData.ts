import { create } from 'zustand';
import { HouseListData, RentingData, SearchStatus } from '../types/search';

type PageNow = 'Home' | 'MyHouseList';

interface useRentingDataType {
  rentingData: RentingData | null;
  rentingList: HouseListData[];
  searchStatus: SearchStatus;
  pageNow: PageNow;
  personName: string;
}
export const useRentingData = create<useRentingDataType>(() => ({
  rentingData: null,
  rentingList: [],
  searchStatus: 'default',
  pageNow: 'Home',
  personName: '',
}));
