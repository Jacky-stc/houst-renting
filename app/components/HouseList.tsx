import React from "react";
import { RentingData } from "../types/search";
import { rentingDataFormat } from "@/lib/utils";
import { IoBookmarkOutline } from "react-icons/io5";
import { useBookmarkStore, useDisplayData } from "../store";

interface HouseListProps {
  houseObject: string[];
  setRentingData: React.Dispatch<React.SetStateAction<RentingData | undefined>>;
  index: string;
}

const HouseList: React.FC<HouseListProps> = ({
  houseObject,
  setRentingData,
  index,
}) => {
  const houseInfo = rentingDataFormat(houseObject, index);
  const bookmarkList = useBookmarkStore((state) => state.bookmarkList);
  const toggleBookmarkList = useBookmarkStore(
    (state) => state.toggleBookmarkList,
  );
  const changeDisplayData = useDisplayData((state) => state.changeDisplayData);

  const handleClick = () => {
    setRentingData(houseInfo);
    console.log(houseInfo);
    changeDisplayData("");
  };

  const handleAddBookmark = (e: React.MouseEvent<SVGElement>) => {
    e.stopPropagation();
    toggleBookmarkList(houseInfo.欄位);
  };
  return (
    <div
      className={`flex flex-col my-2 pt-4 pb-2 px-4 rounded shadow-md hover:bg-slate-300 cursor-pointer border-l-4 ${houseInfo.上架狀態 === "已上架" ? "border-red-600" : "border-gray-500"}`}
      onClick={handleClick}
    >
      <div className="flex flex-row">
        <div className="inline-block align-sub text-xl">{houseInfo.編號}</div>
        <span
          className={`py-1 px-2 ml-2 rounded-xl text-xs min-w-[60px] ${houseInfo.物件狀態 === "待出租" ? "bg-green-400" : "bg-red-500"} text-slate-100`}
        >
          {houseInfo.物件狀態}
        </span>
        <span className="max-w-[350px] align-sub text-lg ml-4 text-ellipsis whitespace-nowrap overflow-hidden">
          {houseInfo.租金} <span className="text-sm">元/月</span>
        </span>
        <div
          className={`flex ml-auto items-center p-1.5 bookmark ${bookmarkList.has(houseInfo.欄位) ? "in-bookmark" : ""} active:scale-75`}
        >
          <IoBookmarkOutline
            onClick={(e) => {
              handleAddBookmark(e);
            }}
          ></IoBookmarkOutline>
        </div>
      </div>
      <div className="mt-2 text-xs text-gray-500 text-ellipsis whitespace-nowrap overflow-hidden">
        {houseInfo.地址}
      </div>
    </div>
  );
};

export default HouseList;
