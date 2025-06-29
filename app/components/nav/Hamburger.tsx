"use client";
import React, { FC, useState } from "react";
import { IoPerson } from "react-icons/io5";
import { useRentingData } from "../../store/useRentingData";
import { toPageHome, toPageMyHouseList } from "../../lib/navigation";
import usePersonStore from "@/app/store/usePersonStore";
import { BiSolidReport, BiSolidSearchAlt2 } from "react-icons/bi";
import { TbMessageReportFilled } from "react-icons/tb";
import { RiLogoutBoxRFill } from "react-icons/ri";
import { signOut } from "next-auth/react";

const Hamburger: FC = () => {
  const [isOpen, setIsOpen] = useState<Boolean>(false);

  const pageNow = useRentingData((s) => s.pageNow);

  const personName = usePersonStore((s) => s.person);
  const goToPageMyHouseList = () => {
    if (pageNow === "MyHouseList") {
      return;
    }
    useRentingData.setState({
      pageNow: "MyHouseList",
      rentingData: null,
      rentingList: [],
    });
    setIsOpen(false);
    if (personName === "") {
      useRentingData.setState({ searchStatus: "noPersonName" });
      return;
    }
    toPageMyHouseList();
  };

  const toHomePage = () => {
    if (pageNow === "Home") {
      return;
    }
    setIsOpen(!isOpen);
    toPageHome();
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
          className={`bg-slate-700 dark:bg-slate-200 block transition-all duration-300 ease-out 
                            h-0.5 w-6 rounded-sm ${
                              isOpen
                                ? "rotate-45 translate-y-1"
                                : "-translate-y-0.5"
                            }`}
        ></span>
        <span
          className={`bg-slate-700 dark:bg-slate-200 block transition-all duration-300 ease-out 
                            h-0.5 w-6 rounded-sm my-0.5 ${isOpen ? "opacity-0" : "opacity-100"}`}
        ></span>
        <span
          className={`bg-slate-700 dark:bg-slate-200 block transition-all duration-300 ease-out 
                            h-0.5 w-6 rounded-sm ${
                              isOpen
                                ? "-rotate-45 -translate-y-1"
                                : "translate-y-0.5"
                            }`}
        ></span>
      </button>
      {isOpen && (
        <div className="absolute w-screen h-screen bg-white dark:bg-black opacity-95 top-0 right-0 block z-10 lg:hidden">
          <nav className="w-30 py-24">
            <ul className="mx-4">
              <li
                className={`relative my-4 px-10 py-2 rounded hover:bg-[#0831fe26] dark:hover:bg-gray-700 cursor-pointer ${pageNow === "Home" && "bg-[#0831fe26] dark:bg-gray-700"}`}
                onClick={toHomePage}
              >
                <BiSolidSearchAlt2 className="inline-block mr-2"></BiSolidSearchAlt2>
                物件查詢
                {pageNow === "Home" && (
                  <img
                    src="image/santa-hat.png"
                    alt="santa hat image"
                    className="w-10 absolute -top-3 -left-3"
                  ></img>
                )}
              </li>
              <li
                className={`relative my-4 px-10 py-2 rounded hover:bg-[#0831fe26] dark:hover:bg-gray-700 cursor-pointer ${pageNow === "MyHouseList" && "bg-[#0831fe26] dark:bg-gray-700"}`}
                onClick={goToPageMyHouseList}
              >
                <IoPerson className="inline-block mr-2"></IoPerson>
                我的物件
                {pageNow === "MyHouseList" && (
                  <img
                    src="image/santa-hat.png"
                    alt="santa hat image"
                    className="w-10 absolute -top-3 -left-3"
                  ></img>
                )}
              </li>
              <a href="https://forms.gle/Z3og9gGzQ9sANZfF7" target="_blank">
                <li className="my-4 px-10 py-2 rounded hover:bg-[#0831fe26] dark:hover:bg-gray-700 cursor-pointer">
                  <TbMessageReportFilled className="inline-block mr-2"></TbMessageReportFilled>
                  回報表單
                </li>
              </a>
              <a href="https://forms.gle/gk9ybxm464FiXLMw9" target="_blank">
                <li className="my-4 px-10 py-2 rounded hover:bg-[#0831fe26] dark:hover:bg-gray-700 cursor-pointer">
                  <BiSolidReport className="inline-block mr-2"></BiSolidReport>
                  開發表單
                </li>
              </a>
              <li
                className="my-4 px-10 py-2 rounded hover:bg-[#0831fe26] dark:hover:bg-gray-700 cursor-pointer"
                onClick={() => {
                  signOut();
                }}
              >
                <RiLogoutBoxRFill className="inline-block mr-2"></RiLogoutBoxRFill>
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
