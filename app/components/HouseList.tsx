import React from "react";
import { RentingData } from "../types/search";

interface HouseListProps {
  houseObject: string[];
  setRentingData: React.Dispatch<React.SetStateAction<RentingData | undefined>>;
  setShowHouseList: React.Dispatch<React.SetStateAction<Boolean>>;
}

const HouseList: React.FC<HouseListProps> = ({
  houseObject,
  setRentingData,
  setShowHouseList,
}) => {
  const houseInfo = {
    物件狀態: houseObject[0],
    上架狀態: houseObject[1],
    業務編號: houseObject[2],
    編號: houseObject[3],
    開發日期: houseObject[4],
    區域: houseObject[5],
    地址: houseObject[6],
    建物型態: houseObject[7],
    現況: houseObject[8],
    格局: houseObject[9],
    租金: houseObject[10],
    坪數: houseObject[11],
    樓層: houseObject[12],
    姓名: houseObject[13],
    電話: houseObject[14],
    對話要點: houseObject[15],
    電費: houseObject[16],
    開伙: houseObject[17],
    寵物: houseObject[18],
    服務費: houseObject[19],
    屋主網址: houseObject[20],
    上架網址: houseObject[21],
  };
  const handleClick = () => {
    setRentingData(houseInfo);
    setShowHouseList(false);
  };
  return (
    <div
      className="flex flex-col my-2 pt-4 pb-2 px-4 rounded shadow-md hover:bg-slate-300 cursor-pointer"
      onClick={handleClick}
    >
      <div className="flex flex-row">
        <div className="inline-block align-sub text-xl">{houseInfo.編號}</div>
        <span
          className={`py-1 px-2 ml-2 rounded-xl text-xs ${houseInfo.物件狀態 === "待出租" ? "bg-green-400" : "bg-red-500"} text-slate-100`}
        >
          {houseInfo.物件狀態}
        </span>
        <span className=" align-sub text-lg ml-4">
          {houseInfo.租金} <span className="text-sm">元/月</span>
        </span>
      </div>
      <div className="mt-2 text-xs text-gray-500">{houseInfo.地址}</div>
    </div>
  );
};

export default HouseList;
