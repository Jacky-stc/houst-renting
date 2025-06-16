"use client";
import React, { useEffect, useRef } from "react";
import { useShallow } from "zustand/shallow";
import useDrag from "@/app/lib/useDrag";
import { useRentingData } from "@/app/store/useRentingData";
import HouseInfo from "./HouseInfo";

const MobileHouseInfo = () => {
  const targetRef = useRef<HTMLDivElement>(null);
  const { translateX, isDragging, height } = useDrag(targetRef);
  const rentingData = useRentingData((s) => s.rentingData);
  const { rentingList } = useRentingData(
    useShallow((s) => ({
      rentingList: s.rentingList,
    })),
  );

  useEffect(() => {
    console.log(height);
  }, [height]);

  return (
    <div
      ref={targetRef}
      className={`${rentingData ? "translate-x-0" : "translate-x-full"} touch-pan-y absolute top-12 px-4 w-full h-full bg-white  ${isDragging ? "transition-none" : "transition-transform duration-300 ease-in-out"}`}
      style={{
        transform: `translateX(${rentingData ? translateX + "px" : "100%"})`,
      }}
    >
      {rentingData && (
        <HouseInfo rentingData={rentingData} houseList={rentingList} />
      )}
    </div>
  );
};

export default MobileHouseInfo;
