"use client";
import React, { FC, useEffect, useState } from "react";
import { IoSearchOutline } from "react-icons/io5";
import Loader from "./Loader";

import { RentingData } from "../types/search";
import HouseInfo from "./HouseInfo";
import Card from "./Card";
import HouseList from "./HouseList";
import { getSheetData, regionList, rentingDataFormat } from "@/lib/utils";
import {
  useDisplayData,
  useLoading,
  usePageNow,
  useSearchingData,
  useSearchStatus,
  useToggleTheme,
} from "../store";
import Snow from "./Snow";

interface Props {
  apiKey: string;
  sheetId: string;
}

const Search: FC<Props> = ({ apiKey, sheetId }) => {
  const [inputValue, setInputValue] = useState<string>("");
  const [inputFocus, setInputFocus] = useState<Boolean>(false);
  const [rentingData, setRentingData] = useState<RentingData>();
  const [isComposition, setIsComposition] = useState<Boolean>(false);

  const theme = useToggleTheme((state) => state.theme);
  const searchStatus = useSearchStatus((state) => state.searchStatus);
  const setSearchStatus = useSearchStatus((state) => state.setSearchStatus);
  const displayData = useDisplayData((state) => state.displayData);
  const changeDisplayData = useDisplayData((state) => state.changeDisplayData);
  const houseList = useSearchingData((state) => state.houseList);
  const setHouseList = useSearchingData((state) => state.setHouseList);
  const isLoading = useLoading((state) => state.isLoading);
  const setIsLoading = useLoading((state) => state.setIsLoading);
  const setPageNow = usePageNow((state) => state.setPageNow);

  const regionArray = Object.values(regionList);
  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    }
  });

  const handleSearch = (
    e:
      | React.KeyboardEvent<HTMLInputElement>
      | React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    e.preventDefault();
    if (inputValue === "") {
      return;
    }
    setIsLoading(true);
    setPageNow("Home");
    setHouseList([]);
    setRentingData(undefined);
    setSearchStatus("loading");

    async function getGoogleSheetData() {
      try {
        const data: [] = await getSheetData(sheetId, apiKey);
        data.shift();
        let houseListData = data
          .map((element: string[], index) => ({
            value: element,
            index: index,
          }))
          .reverse();
        if (
          regionArray.includes(inputValue) ||
          regionArray.includes(inputValue + "區")
        ) {
          houseListData = houseListData.filter(
            (data) =>
              data.value[5] === inputValue ||
              data.value[5] === inputValue + "區",
          );
          data.length !== 0
            ? (() => {
                setHouseList(houseListData);
                changeDisplayData("showHouseList");
              })()
            : setSearchStatus("no result");
          setIsLoading(false);
        } else if (Object.keys(regionList).includes(inputValue[0])) {
          const targetObject = houseListData.filter(
            (item) => item.value[3] === inputValue,
          );
          if (targetObject.length > 0) {
            const rentingResource = rentingDataFormat(
              targetObject[0].value,
              targetObject[0].index.toString(),
            );
            setRentingData(rentingResource);
            setSearchStatus("houseInfo");
            setIsLoading(false);
          } else {
            setSearchStatus("no result");
            setIsLoading(false);
          }
        } else {
          const targetArray = houseListData.filter((item) =>
            item.value[6].includes(inputValue),
          );
          if (targetArray.length > 0) {
            setHouseList(targetArray);
            changeDisplayData("showHouseList");
            setIsLoading(false);
          } else {
            setSearchStatus("no result");
            setIsLoading(false);
          }
        }
      } catch (error) {
        setSearchStatus("no result");
        setIsLoading(false);
      }
    }
    getGoogleSheetData();
  };
  const handleEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (isComposition) {
      return;
    }
    if (e.code === "Enter") {
      // 防止form submit redirect
      e.preventDefault();

      handleSearch(e);
    }
  };

  return (
    <div className="mx-3 sm:mx-6 tracking-wide w-11/12 font-inter sm:w-auto flex-1">
      {theme === "dark" && <Snow></Snow>}
      <div
        className={`flex items-center px-2 py-1 w-11/12 sm:ml-auto sm:w-72 rounded ${inputFocus ? " border border-sky-400" : "border"}`}
      >
        <IoSearchOutline></IoSearchOutline>
        <div className="flex justify-between w-full sm:w-auto">
          <form
            action={"."}
            className="flex w-full"
            onSubmit={() => {
              return false;
            }}
          >
            <input
              style={{
                WebkitTapHighlightColor: "transparent",
                outline: "none",
              }}
              type="search"
              value={inputValue}
              onFocus={() => {
                setInputFocus(true);
              }}
              onBlur={() => {
                setInputFocus(false);
              }}
              onChange={(e) => setInputValue(e.target.value)}
              onCompositionStart={() => {
                setIsComposition(true);
              }}
              onCompositionEnd={(e) => {
                setIsComposition(false);
              }}
              onKeyDown={(e) => {
                handleEnter(e);
              }}
              className="bg-transparent rounded-sm px-2 py-1 mx-1 w-full sm:w-52 focus:outline-0 outline-0"
              placeholder="輸入物件編號或區域"
              spellCheck="false"
            ></input>
            <button
              onClick={(e) => {
                handleSearch(e);
              }}
              className="hidden sm:block"
            >
              搜尋
            </button>
          </form>
        </div>
      </div>
      {(searchStatus === "default" ||
        searchStatus === "no result" ||
        searchStatus === "no bookmark") && <Card></Card>}
      {isLoading && <Loader></Loader>}
      {!isLoading && rentingData && searchStatus === "houseInfo" && (
        <HouseInfo
          rentingData={rentingData}
          setRentingData={setRentingData}
          houseList={houseList}
        ></HouseInfo>
      )}
      {!isLoading &&
        houseList?.length !== 0 &&
        (displayData === "showHouseList" ||
          displayData === "showBookmarkList") &&
        houseList?.map((houseObject) => (
          <HouseList
            houseObject={houseObject.value}
            key={houseObject.index}
            setRentingData={setRentingData}
            index={houseObject.index.toString()}
          ></HouseList>
        ))}
    </div>
  );
};

export default Search;
