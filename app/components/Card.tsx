import React from "react";
import { useRentingData } from "../store/useRentingData";
import Loader from "./common/Loader";
import { CatSVG, DogSVG } from "./common/SVG";

const Card: React.FC = () => {
  const searchStatus = useRentingData((s) => s.searchStatus);
  return (
    <div className="flex justify-evenly pt-16 sm:pt-20 flex-col items-center sm:flex-row sm:items-stretch">
      {searchStatus === "loading" && <Loader />}
      {searchStatus === "default" && (
        <>
          <div className="w-4/5 sm:w-1/2">
            <CatSVG></CatSVG>
          </div>
          <div className="text-center py-8 sm:text-start sm:pt-0 flex flex-col justify-evenly">
            <h1 className="font-bold text-2xl sm:text-3xl text-[#ef9371]">
              物件查詢
            </h1>
            <div>
              <div className="text-xs sm:text-sm pt-2 text-[#b18853]">
                輸入物件編號或物件所在地區進行查詢
              </div>
              <div className="text-xs sm:text-sm pt-1 text-[#b18853]">
                例如：N816B、文山區
              </div>
            </div>
          </div>
        </>
      )}
      {searchStatus === "no result" && (
        <>
          <div className="w-4/5 sm:w-1/2">
            <DogSVG></DogSVG>
          </div>
          <div className="text-center py-4 sm:text-start sm:pt-0 flex flex-col justify-evenly">
            <h1 className="font-bold text-2xl sm:text-3xl text-[#ff3838]">
              查無結果
            </h1>
            <div className="text-xs sm:text-sm pt-2 text-[#b45a50]">
              查詢不到符合搜尋條件的結果，請重新查詢
            </div>
          </div>
        </>
      )}
      {searchStatus === "noPersonName" && (
        <>
          <div className="w-4/5 sm:w-1/2 flex justify-center">
            <img src="image/santa.png" alt="santa image" width={"60%"}></img>
          </div>
          <div className="text-center py-4 sm:text-start sm:pt-0 flex flex-col justify-center sm:gap-10">
            <h1 className="font-bold text-2xl sm:text-3xl text-[#ff3838]">
              尚無業務姓名
            </h1>
            <div className="text-xs sm:text-sm pt-2 text-[#b45a50]">
              請點選上方選單選擇業務姓名
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Card;
