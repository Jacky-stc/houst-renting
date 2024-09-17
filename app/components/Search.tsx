"use client";
import React, { FC, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../lib/store";
import { changeSearchNumber } from "../../lib/features/search/searchSlice";
import { IoSearchOutline } from "react-icons/io5";
import Loader from "./Loader";

import { RentingData, SearchStatus } from "../types/search";
import HouseInfo from "./HouseInfo";
import Card from "./Card";
import HouseList from "./HouseList";

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
  const searchNumber = useSelector(
    (state: RootState) => state.search.searchNumber,
  );
  const dispatch = useDispatch();

  // const apiKey = "AIzaSyCuKxIujf0gFpdsKtcHZ8unFFwvFGO_8Mo";
  // const sheetId = "1rQXKcxnCbR2MWho2N-DHW3zr7_C1G643Rxr3rtKeNSY";
  const regionList: { [key: string]: string } = {
    N: "文山區",
    A: "大安區",
  };
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
        console.log(data.values);
        if (regionArray.includes(inputValue)) {
          if (data.values && data.values.length > 1) {
            data.values.shift();
          }
          data.values.length !== 0
            ? setHouseList(data.values)
            : setErrorMessage("查詢不到物件，請重新查詢");
          console.log(houseList);
          setLoading(false);
        } else {
          const displayText = data.values.filter(
            (item: Array<string>) => item[1] === inputValue,
          );
          console.log(displayText);
          if (displayText.length > 0) {
            console.log(displayText[0], "displaytext 0");
            console.log(displayText[0][0]);
            const rentingResource = {
              物件狀態: displayText[0][0],
              編號: displayText[0][1],
              開發日期: displayText[0][2],
              服務費: displayText[0][3],
              對話要點: displayText[0][4],
              姓名: displayText[0][5],
              電話: displayText[0][6],
              區域: displayText[0][7],
              地址: displayText[0][8],
              租金: displayText[0][9],
              含: displayText[0][10],
              格局: displayText[0][11],
              坪數: displayText[0][12],
              型態: displayText[0][13],
              現況: displayText[0][14],
              電: displayText[0][15],
              開伙: displayText[0][16],
              寵物: displayText[0][17],
            };
            console.log(rentingResource);
            setRentingData(rentingResource);
            setSearchStatus({ status: "result" });
            setErrorMessage("");
            setLoading(false);
            console.log(rentingData);
          } else {
            setSearchStatus({ status: "no result" });
            setLoading(false);
          }
        }
      } catch (error) {
        setErrorMessage("查詢不到物件，請重新查詢");
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
        <HouseInfo rentingData={rentingData}></HouseInfo>
      )}
      {!loading &&
        houseList?.length !== 0 &&
        houseList?.map((houseObject) => (
          <HouseList
            houseObject={houseObject}
            key={houseObject[1]}
            setRentingData={setRentingData}
            setHouseList={setHouseList}
          ></HouseList>
        ))}
      {errorMessage && <div>{errorMessage}</div>}
    </div>
  );
};

export default Search;
