import { useRentingData } from "@/app/store/useRentingData";
import React, { useState } from "react";
import Loader from "./Loader";

interface ChangeDataModalProps {
  setShowStatusChange: React.Dispatch<React.SetStateAction<boolean>>;
}

const ChangeDataModal = ({ setShowStatusChange }: ChangeDataModalProps) => {
  const [isLoading, setIsLoading] = useState<Boolean>(false);
  const [showHintMessage, setShowHintMessage] = useState<Boolean>(false);
  const [hintMessage, setHintMessage] = useState<string>("");
  const rentingData = useRentingData((s) => s.rentingData);
  const [uploadURL, setUploadURL] = useState<string>(
    rentingData?.上架網址 || "",
  );
  const [price, setPrice] = useState<string>("");

  if (!rentingData) return null;

  const handleRentingStatusChange = (status: string) => {
    setIsLoading(true);
    setHintMessage("");
    setShowHintMessage(false);
    const reqBody = {
      index: rentingData?.欄位,
      rentingStatus: status,
    };
    const changeStatus = async () => {
      try {
        const response = await fetch("/api/change", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(reqBody),
        });
        const result = await response.json();
        if (response.status === 200) {
          setIsLoading(false);
          setHintMessage("更新成功!");
          setShowHintMessage(true);
          if (
            result.rentingStatus === "待出租" ||
            result.rentingStatus === "已下架"
          ) {
            useRentingData.setState((state) => ({
              rentingData: {
                ...state.rentingData,
                物件狀態: result.rentingStatus,
              },
            }));
          } else {
            useRentingData.setState((state) => ({
              rentingData: {
                ...state.rentingData,
                上架網址: result.rentingStatus,
              },
            }));
          }
        } else {
          throw new Error("failed");
        }
      } catch (error) {
        setIsLoading(false);
        setHintMessage("更新失敗!");
        setShowHintMessage(true);
      }
    };
    changeStatus();
  };
  const handlePriceChange = (price: string) => {
    setIsLoading(true);
    setHintMessage("");
    setShowHintMessage(false);
    const reqBody = {
      index: rentingData?.欄位,
      price: price,
    };
    const changeStatus = async () => {
      try {
        const response = await fetch("/api/changePrice", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(reqBody),
        });
        const result = await response.json();
        if (response.status === 200) {
          setIsLoading(false);
          setHintMessage("更新成功!");
          setShowHintMessage(true);
          useRentingData.setState((state) => ({
            rentingData: {
              ...state.rentingData,
              租金: result.price,
            },
          }));
        } else {
          throw new Error("failed");
        }
      } catch (error) {
        setIsLoading(false);
        setHintMessage("更新失敗!");
        setShowHintMessage(true);
      }
    };
    changeStatus();
  };
  return (
    <>
      <div
        className="w-full h-full fixed top-0 right-0 left-0 bottom-0 bg-black/40 dark:bg-gray-700/40 z-10 animate-[fade-in_0.15s_both] px-[auto] motion-reduce:transition-none motion-reduce:animate-none"
        data-twe-dropdown-backdrop-ref=""
        onClick={() => {
          setShowStatusChange(false);
          setHintMessage("");
          setShowHintMessage(false);
        }}
      ></div>
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col justify-center w-56 h-fit bg-[#fff7E6] dark:bg-[#161616] z-10 rounded p-2 text-center text-sm">
        <div className="mt-3 mb-2 font-bold text-start pl-3">價格</div>
        <div className="w-full flex items-center justify-between gap-5 mt-3 mb-5 text-xs">
          <input
            className=" w-[56%] ml-3 border border-gray-500 focus:outline-slate-500 px-2 py-1"
            value={price}
            onChange={(e) => {
              setPrice(e.target.value);
            }}
          ></input>
          <button
            className="rounded bg-red-500 px-2 py-1 mx-2 text-slate-200 hover:bg-red-700"
            onClick={() => {
              handlePriceChange(price);
            }}
          >
            變更
          </button>
        </div>
        <hr className="mx-auto mt-4 mb-2 border-b border-gray-300 w-11/12"></hr>
        <div className="mt-3 mb-2 font-bold text-start pl-3">出租狀態</div>
        <div className="w-full text-xs flex items-center justify-between gap-5 mt-3 pl-3">
          <span
            className={`${rentingData.物件狀態 === "待出租" ? "text-red-500" : "text-[#6b7280]"}`}
          >
            {rentingData.物件狀態}
          </span>
          <button
            className="rounded bg-red-500 px-2 py-1 mx-2 text-slate-200 hover:bg-red-700"
            onClick={() => {
              handleRentingStatusChange(rentingData.物件狀態 || "待出租");
            }}
          >
            變更
          </button>
        </div>
        <hr className="mx-auto mt-4 mb-2 border-b border-gray-300 w-11/12"></hr>
        <div className="mt-3 mb-2 font-bold text-start pl-3">上架網址</div>
        <div className="w-full flex items-center justify-between gap-5 mt-3 mb-5 text-xs">
          <input
            className=" w-[56%] ml-3 border border-gray-500 focus:outline-slate-500 px-2 py-1"
            value={uploadURL}
            onChange={(e) => {
              setUploadURL(e.target.value);
            }}
          ></input>
          <button
            className="rounded bg-red-500 px-2 py-1 mx-2 text-slate-200 hover:bg-red-700"
            onClick={() => {
              handleRentingStatusChange(uploadURL);
            }}
          >
            變更
          </button>
        </div>
        {showHintMessage && (
          <div
            className={`text-xs ${hintMessage === "更新成功!" ? "text-red-500" : "text-gray-900"} my-2`}
          >
            {hintMessage}
          </div>
        )}
        {isLoading && <Loader></Loader>}
      </div>
    </>
  );
};

export default ChangeDataModal;
