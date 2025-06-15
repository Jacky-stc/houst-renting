import React from "react";
import { personBGColor, rentingDataFormat } from "../../lib/utils";
import { useRentingData } from "../../store/useRentingData";

interface HouseListProps {
  houseObject: string[];
  index: string;
}

const HouseList: React.FC<HouseListProps> = ({ houseObject, index }) => {
  const houseInfo = rentingDataFormat(houseObject, index);

  const handleClick = () => {
    useRentingData.setState({
      rentingData: houseInfo,
      searchStatus: "result",
    });
  };
  return (
    <div
      className={`flex flex-col my-2 pt-[0.6rem] pb-2 px-4 rounded shadow-md dark:bg-[#2b2b2be6] dark:hover:brightness-125 hover:bg-slate-300 cursor-pointer border-l-4 ${houseInfo.上架網址 ? "border-red-600" : "border-gray-500"}`}
      onClick={handleClick}
    >
      <div className="flex flex-row">
        <div className="inline-block align-sub text-[1.35rem]">
          {houseInfo.編號}
        </div>

        <span
          className={`flex justify-center items-center font-bold ml-auto rounded-2xl text-xs sm:text-xs text-center ${houseInfo.物件狀態 === "待出租" ? "text-[#1d6d3a]" : "text-red-500"}`}
        >
          {houseInfo.物件狀態}
        </span>
      </div>
      <div className="flex flex-row items-center mt-[0.3rem]">
        <span
          className={`flex justify-center items-center mr-1 w-6 h-6 rounded-full text-[0.65rem] text-center text-slate-100`}
          style={{
            background:
              personBGColor[houseInfo.業務編號 as keyof typeof personBGColor] ||
              "gray",
          }}
        >
          {houseInfo.業務編號.slice(
            houseInfo.業務編號.length - 1,
            houseInfo.業務編號.length,
          )}
        </span>
        <span className="max-w-[75%] text-ellipsis text-[0.75rem]  whitespace-nowrap overflow-hidden">
          {houseInfo.地址}
        </span>
      </div>
      <div className="flex justify-between ml-auto text-[0.75rem]  text-ellipsis whitespace-nowrap overflow-hidden">
        <span>{houseInfo.租金}元/月</span>
      </div>
    </div>
  );
};

export default HouseList;
