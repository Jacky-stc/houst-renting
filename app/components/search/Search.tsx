"use client";
import React, { FC } from "react";
import HouseInfo from "../house/HouseInfo";
import Card from "../Card";
import HouseList from "../house/HouseList";
import { useToggleTheme } from "../../store";
import Snow from "../common/Snow";
import { useRentingData } from "@/app/store/useRentingData";
import { useShallow } from "zustand/shallow";
import SearchInput from "./SearchInput";
import SearchName from "./SearchName";

const Search: FC = () => {
  const rentingData = useRentingData((s) => s.rentingData);
  const pageNow = useRentingData((s) => s.pageNow);
  const personName = useRentingData((s) => s.personName);

  const theme = useToggleTheme((state) => state.theme);

  const { searchStatus, rentingList } = useRentingData(
    useShallow((s) => ({
      searchStatus: s.searchStatus,
      rentingList: s.rentingList,
    })),
  );

  return (
    <div className="relative overflow-hidden tracking-wide w-11/12 font-inter sm:w-auto flex-1">
      {theme === "dark" && <Snow></Snow>}

      {pageNow === "MyHouseList" && !personName ? (
        <SearchName />
      ) : (
        <SearchInput />
      )}

      {searchStatus !== "result" && <Card></Card>}
      {rentingData && searchStatus === "result" && (
        <HouseInfo
          rentingData={rentingData}
          houseList={rentingList}
        ></HouseInfo>
      )}
      <div className={`mt-8 px-4`}>
        {rentingList &&
          !rentingData &&
          rentingList?.map((houseObject) => (
            <HouseList
              houseObject={houseObject.value}
              key={houseObject.index}
              index={houseObject.index.toString()}
            ></HouseList>
          ))}
      </div>
      {/* {isMobile.any() && <MobileHouseInfo></MobileHouseInfo>} */}
    </div>
  );
};

export default Search;
