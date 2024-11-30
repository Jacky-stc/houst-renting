"use client";
import React, { FC, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../lib/store";
import { changeSearchNumber } from "../../lib/features/search/searchSlice";
import { IoSearchOutline } from "react-icons/io5";
import Loader from "./Loader";

import { RentingData, SearchStatus } from "../types/search";
import HouseInfo from "./HouseInfo";
import Card from "./Card";
import HouseList from "./HouseList";
import { regionList, rentingDataFormat } from "@/lib/utils";

interface Props {
  apiKey: string;
  sheetId: string;
}

type houseList = {
  value: string[];
  index: number;
}[];

const Search: FC<Props> = ({ apiKey, sheetId }) => {
  const [inputValue, setInputValue] = useState<string>("");
  const [inputFocus, setInputFocus] = useState<Boolean>(false);
  const [rentingData, setRentingData] = useState<RentingData>();
  const [houseList, setHouseList] = useState<houseList>();
  const [loading, setLoading] = useState<Boolean>(false);
  const [searchStatus, setSearchStatus] = useState<SearchStatus>({
    status: "default",
  });
  const [showHouseList, setShowHouseList] = useState<Boolean>(false);
  const [isComposition, setIsComposition] = useState<Boolean>(false);
  const searchNumber = useSelector(
    (state: RootState) => state.search.searchNumber,
  );
  const dispatch = useDispatch();

  const regionArray = Object.values(regionList);
  // Sheets 中要取得的資料範圍，格式如下
  // Sheets API 的 URL
  const handleSearch = (
    e:
      | React.KeyboardEvent<HTMLInputElement>
      | React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    e.preventDefault();
    setLoading(true);
    setHouseList(undefined);
    setRentingData(undefined);
    setSearchStatus({ status: "loading" });

    async function getSheetData(
      sheetId: string,
      range: string,
      apiKey: string,
    ) {
      const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${range}?key=${apiKey}`;
      const response = await fetch(url);
      const data = await response.json();
      // 由於在下方已經有設置搜尋內容的條件，基本上都會得到搜尋結果，所以就先不設置data.value === undefined或是400 bad request的情形
      return data.values;
    }
    dispatch(changeSearchNumber(inputValue));
    async function getGoogleSheetData() {
      try {
        if (regionArray.includes(inputValue)) {
          const data: [] = await getSheetData(sheetId, inputValue, apiKey);
          data.shift();
          const houseListData = data.map((element: string[], index) => ({
            value: element,
            index: index,
          }));
          data.length !== 0
            ? (() => {
                setHouseList(houseListData);
                setShowHouseList(true);
              })()
            : setSearchStatus({ status: "no result" });
          setLoading(false);
        } else if (Object.keys(regionList).includes(inputValue[0])) {
          const data = await getSheetData(
            sheetId,
            regionList[inputValue[0]],
            apiKey,
          );
          const targetObject = data.filter(
            (item: Array<string>) => item[3] === inputValue,
          );
          const targetIndex = data.findIndex(
            (item: Array<string>) => item[3] === inputValue,
          );
          if (targetObject.length > 0) {
            const rentingResource = rentingDataFormat(
              targetObject[0],
              (targetIndex + 1).toString(),
            );
            setRentingData(rentingResource);
            setSearchStatus({ status: "result" });
            setLoading(false);
          } else {
            setSearchStatus({ status: "no result" });
            setLoading(false);
          }
        } else {
          const data = await getSheetData(sheetId, "物件總表", apiKey);
          const targetObject = data.filter((item: string[]) =>
            item[6].includes(inputValue),
          );
          if (targetObject.length > 0) {
            const targetRegion = targetObject[0][5];
            const regionArray = data.filter(
              (item: string[]) => item[5] === targetRegion,
            );
            const targetArray = regionArray
              .map((element: string[], index: number) => ({
                value: element,
                index: index,
              }))
              .filter((item: { value: string[]; index: number }) =>
                item.value[6].includes(inputValue),
              );
            setHouseList(targetArray);
            setShowHouseList(true);
            setLoading(false);
          } else {
            setSearchStatus({ status: "no result" });
            setLoading(false);
          }
        }
      } catch (error) {
        setSearchStatus({ status: "no result" });
        setLoading(false);
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
              className="rounded-sm px-2 py-1 mx-1 w-full sm:w-52 focus:outline-0 outline-0"
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
      {(searchStatus.status === "default" ||
        searchStatus.status === "no result") && (
        <Card searchStatus={searchStatus}></Card>
      )}
      {loading && <Loader></Loader>}
      {!loading && rentingData && (
        <HouseInfo
          rentingData={rentingData}
          setRentingData={setRentingData}
          setShowHouseList={setShowHouseList}
          houseList={houseList}
        ></HouseInfo>
      )}
      {/* {showHouseList && (
        <div className="text-xs my-3 text-gray-400">
          <div className="w-1 h-4 rounded bg-red-600 inline-block align-middle ml-2 mr-2"></div>
          <span>已上架</span>
          <div className="w-1 h-4 rounded bg-green-400 inline-block align-middle ml-4 mr-2"></div>
          <span>未上架</span>
          <div className="w-1 h-4 rounded bg-gray-500 inline-block align-middle ml-4 mr-2"></div>
          <span>已下架</span>
        </div>
      )} */}
      {!loading &&
        houseList?.length !== 0 &&
        showHouseList &&
        houseList?.map((houseObject) => (
          <HouseList
            houseObject={houseObject.value}
            key={houseObject.value[3]}
            setRentingData={setRentingData}
            setShowHouseList={setShowHouseList}
            index={(houseObject.index + 2).toString()}
          ></HouseList>
        ))}
    </div>
  );
};

export default Search;
