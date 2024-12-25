"use client";
import React, { FC, useState } from "react";
import { HiOutlineDocumentReport } from "react-icons/hi";
import { IoIosLogOut, IoMdGitCompare } from "react-icons/io";
import { IoBookmarkOutline } from "react-icons/io5";
import { VscSearch } from "react-icons/vsc";
import {
  useBookmarkStore,
  useDisplayData,
  useLoading,
  usePageNow,
  useSearchingData,
  useSearchStatus,
} from "../store";
import { getSheetData } from "@/lib/utils";

interface Props {
  apiKey: string;
  sheetId: string;
}

const Hamburger: FC<Props> = ({ apiKey, sheetId }) => {
  const [isOpen, setIsOpen] = useState<Boolean>(false);

  const changeDisplayData = useDisplayData((state) => state.changeDisplayData);
  const bookmarkList = useBookmarkStore((state) => state.bookmarkList);
  const setHouseList = useSearchingData((state) => state.setHouseList);
  const setSearchStatus = useSearchStatus((state) => state.setSearchStatus);
  const setIsLoading = useLoading((state) => state.setIsLoading);
  const pageNow = usePageNow((state) => state.pageNow);
  const setPageNow = usePageNow((state) => state.setPageNow);

  const toPageBookmark = async () => {
    if (pageNow === "Bookmark") {
      return;
    }
    setIsOpen(!isOpen);
    setIsLoading(true);
    setPageNow("Bookmark");
    setSearchStatus("loading");
    const data: [] = await getSheetData(sheetId, apiKey);
    let houseListData = data
      .map((element: string[], index: number) => ({
        value: element,
        index: index,
      }))
      .reverse();
    houseListData = houseListData.filter((data) =>
      bookmarkList.has(data.index.toString()),
    );
    if (houseListData.length === 0) {
      setSearchStatus("no bookmark");
    } else {
      setHouseList(houseListData);
    }
    changeDisplayData("showBookmarkList");
    setIsLoading(false);
  };

  const toPageHome = () => {
    if (pageNow === "Home") {
      return;
    }
    setIsOpen(!isOpen);
    setHouseList([]);
    setPageNow("Home");
    setSearchStatus("default");
  };

  const handleClick = () => {
    setIsOpen(!isOpen);
  };
  return (
    <>
      <button
        onClick={handleClick}
        className="flex flex-col justify-center items-center lg:hidden z-50"
        name="menu hamburger button"
        aria-label="hamburger menu button"
      >
        <span
          className={`bg-slate-700 block transition-all duration-300 ease-out 
                            h-0.5 w-6 rounded-sm ${
                              isOpen
                                ? "rotate-45 translate-y-1"
                                : "-translate-y-0.5"
                            }`}
        ></span>
        <span
          className={`bg-slate-700 block transition-all duration-300 ease-out 
                            h-0.5 w-6 rounded-sm my-0.5 ${isOpen ? "opacity-0" : "opacity-100"}`}
        ></span>
        <span
          className={`bg-slate-700 block transition-all duration-300 ease-out 
                            h-0.5 w-6 rounded-sm ${
                              isOpen
                                ? "-rotate-45 -translate-y-1"
                                : "translate-y-0.5"
                            }`}
        ></span>
      </button>
      {isOpen && (
        <div className="absolute w-screen h-screen bg-white opacity-95 top-0 right-0 block z-10 lg:hidden">
          <nav className="w-30 border-r border-slate-400 py-24">
            <ul className="mx-4">
              <li
                className={`relative my-4 px-10 py-2 rounded hover:bg-[#0831fe26] cursor-pointer ${pageNow === "Home" && "bg-[#0831fe26]"}`}
                onClick={toPageHome}
              >
                <VscSearch className="inline-block mr-2"></VscSearch>物件查詢
                {pageNow === "Home" && (
                  <img
                    src="image/santa-hat.png"
                    alt="santa hat image"
                    className="w-10 absolute -top-3 -left-3"
                  ></img>
                )}
              </li>
              <li
                className={`relative my-4 px-10 py-2 rounded hover:bg-[#0831fe26] cursor-pointer ${pageNow === "Bookmark" && "bg-[#0831fe26]"}`}
                onClick={toPageBookmark}
              >
                <IoBookmarkOutline className="inline-block mr-2"></IoBookmarkOutline>
                收藏物件
                {pageNow === "Bookmark" && (
                  <img
                    src="image/santa-hat.png"
                    alt="santa hat image"
                    className="w-10 absolute -top-3 -left-3"
                  ></img>
                )}
              </li>
              <a href="https://forms.gle/Z3og9gGzQ9sANZfF7" target="_blank">
                <li className="my-4 px-10 py-2 rounded hover:bg-[#0831fe26] cursor-pointer">
                  <IoMdGitCompare className="inline-block mr-2"></IoMdGitCompare>
                  回報表單
                </li>
              </a>
              <a href="https://forms.gle/gk9ybxm464FiXLMw9" target="_blank">
                <li className="my-4 px-10 py-2 rounded hover:bg-[#0831fe26] cursor-pointer">
                  <HiOutlineDocumentReport className="inline-block mr-2"></HiOutlineDocumentReport>
                  開發表單
                </li>
              </a>
              <li className="my-4 px-10 py-2 rounded hover:bg-[#0831fe26] cursor-pointer">
                <IoIosLogOut className="inline-block mr-2"></IoIosLogOut>
                登出
              </li>
            </ul>
          </nav>
        </div>
      )}
    </>
  );
};

export default Hamburger;
