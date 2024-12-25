"use client";
import React, { FC } from "react";
import { HiOutlineDocumentReport } from "react-icons/hi";
import { IoMdGitCompare } from "react-icons/io";
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

const Navbar: FC<Props> = ({ apiKey, sheetId }) => {
  const changeDisplayData = useDisplayData((state) => state.changeDisplayData);
  const bookmarkList = useBookmarkStore((state) => state.bookmarkList);
  const setHouseList = useSearchingData((state) => state.setHouseList);
  const setSearchStatus = useSearchStatus((state) => state.setSearchStatus);
  const setIsLoading = useLoading((state) => state.setIsLoading);
  const pageNow = usePageNow((state) => state.pageNow);
  const setPageNow = usePageNow((state) => state.setPageNow);

  const toPageBookmark = async () => {
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
    console.log(houseListData);
    if (houseListData.length === 0) {
      console.log("yes");
      setSearchStatus("no bookmark");
    } else {
      setHouseList(houseListData);
    }
    changeDisplayData("showBookmarkList");
    setIsLoading(false);
  };

  const toPageHome = () => {
    setHouseList([]);
    setPageNow("Home");
    setSearchStatus("default");
  };
  return (
    <nav className="w-30 border-r border-slate-400 hidden lg:block">
      <ul className="mx-4">
        <li
          className={`relative my-2 px-10 py-2 rounded hover:bg-[#0831fe26] cursor-pointer ${pageNow === "Home" && "bg-[#0831fe26]"}`}
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
          className={`relative my-2 px-10 py-2 rounded hover:bg-[#0831fe26] cursor-pointer ${pageNow === "Bookmark" && "bg-[#0831fe26]"}`}
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
          <li className="my-2 px-10 py-2 rounded hover:bg-[#0831fe26] cursor-pointer">
            <IoMdGitCompare className="inline-block mr-2"></IoMdGitCompare>
            回報表單
          </li>
        </a>
        <a href="https://forms.gle/gk9ybxm464FiXLMw9" target="_blank">
          <li className="my-2 px-10 py-2 rounded hover:bg-[#0831fe26] cursor-pointer">
            <HiOutlineDocumentReport className="inline-block mr-2"></HiOutlineDocumentReport>
            開發表單
          </li>
        </a>
      </ul>
    </nav>
  );
};

export default Navbar;
