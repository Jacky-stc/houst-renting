import React from "react";
import { RentingData } from "../types/search";
import { rentingDataFormat } from "@/lib/utils";

interface HouseListProps {
  houseObject: string[];
  setRentingData: React.Dispatch<React.SetStateAction<RentingData | undefined>>;
  setShowHouseList: React.Dispatch<React.SetStateAction<Boolean>>;
  index: string;
}

const HouseList: React.FC<HouseListProps> = ({
  houseObject,
  setRentingData,
  setShowHouseList,
  index,
}) => {
  const houseInfo = rentingDataFormat(houseObject, index);
  const handleClick = () => {
    setRentingData(houseInfo);
    setShowHouseList(false);
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
      </div>
      <div className="mt-2 text-xs text-gray-500 text-ellipsis whitespace-nowrap overflow-hidden">
        {houseInfo.地址}
      </div>
    </div>
  );
};

export default HouseList;
