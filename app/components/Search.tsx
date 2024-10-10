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

const Search: FC<Props> = ({ apiKey, sheetId }) => {
  const [inputValue, setInputValue] = useState<string>("");
  const [inputFocus, setInputFocus] = useState<Boolean>(false);
  const [rentingData, setRentingData] = useState<RentingData>();
  const [houseList, setHouseList] = useState<string[][]>();
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [loading, setLoading] = useState<Boolean>(false);
  const [searchStatus, setSearchStatus] = useState<SearchStatus>({
    status: "default",
  });
  const [showHouseList, setShowHouseList] = useState<Boolean>(false);
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
    setErrorMessage("");
    let range;
    if (regionArray.includes(inputValue)) {
      range = inputValue;
    } else {
      const regionCode = inputValue[0];
      range = regionList[regionCode];
    }
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${range}?key=${apiKey}`;
    dispatch(changeSearchNumber(inputValue));
    async function getGoogleSheetData() {
      setRentingData(undefined);
      setSearchStatus({ status: "loading" });
      try {
        const response = await fetch(url);
        const data = await response.json();
        if (regionArray.includes(inputValue)) {
          if (data.values && data.values.length > 0) {
            data.values.shift();
          }
          data.values.length !== 0
            ? setHouseList(data.values)
            : setErrorMessage("查詢不到物件，請重新查詢");
          setLoading(false);
          setShowHouseList(true);
        } else {
          const targetObject = data.values.filter(
            (item: Array<string>) => item[3] === inputValue,
          );
          const targetIndex = data.values.findIndex(
            (item: Array<string>) => item[3] === inputValue,
          );
          if (targetObject.length > 0) {
            const rentingResource = rentingDataFormat(
              targetObject[0],
              (targetIndex + 1).toString(),
            );
            setRentingData(rentingResource);
            setSearchStatus({ status: "result" });
            setErrorMessage("");
            setLoading(false);
          } else {
            setSearchStatus({ status: "no result" });
            setLoading(false);
          }
        }
      } catch (error) {
        setErrorMessage("查詢不到物件，請重新查詢");
        setLoading(false);
      }
    }
    getGoogleSheetData();
  };
  const handleEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
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
      {!loading &&
        houseList?.length !== 0 &&
        showHouseList &&
        houseList?.map((houseObject, index) => (
          <HouseList
            houseObject={houseObject}
            key={houseObject[3]}
            setRentingData={setRentingData}
            setShowHouseList={setShowHouseList}
            index={(index + 2).toString()}
          ></HouseList>
        ))}
      {errorMessage && <div>{errorMessage}</div>}
    </div>
  );
};

export default Search;
