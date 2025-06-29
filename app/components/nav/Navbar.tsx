"use client";
import React from "react";
import { IoPerson } from "react-icons/io5";
import { useRentingData } from "../../store/useRentingData";
import { toPageHome, toPageMyHouseList } from "../../lib/navigation";
import { TbMessageReportFilled } from "react-icons/tb";
import { BiSolidReport, BiSolidSearchAlt2 } from "react-icons/bi";
import usePersonStore from "@/app/store/usePersonStore";
import { RiLogoutBoxRFill } from "react-icons/ri";
import { signOut } from "next-auth/react";

const Navbar = () => {
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
    if (personName === "") {
      useRentingData.setState({ searchStatus: "noPersonName" });
      return;
    }
    toPageMyHouseList();
  };

  return (
    <nav className="w-30 border-r border-slate-400 hidden lg:block">
      <ul className="mx-[0.9rem] text-[0.9rem]">
        <li
          className={`relative my-2 px-10 py-2 rounded hover:bg-[#0831fe26] dark:hover:bg-gray-700 cursor-pointer ${pageNow === "Home" && "bg-[#0831fe26] dark:bg-gray-700"}`}
          onClick={toPageHome}
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
          className={`relative my-2 px-10 py-2 rounded hover:bg-[#0831fe26] dark:hover:bg-gray-700 cursor-pointer ${pageNow === "MyHouseList" && "bg-[#0831fe26] dark:bg-gray-700"}`}
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
          <li className="my-2 px-10 py-2 rounded hover:bg-[#0831fe26] dark:hover:bg-gray-700 cursor-pointer">
            <TbMessageReportFilled className="inline-block mr-2"></TbMessageReportFilled>
            回報表單
          </li>
        </a>
        <a href="https://forms.gle/gk9ybxm464FiXLMw9" target="_blank">
          <li className="my-2 px-10 py-2 rounded hover:bg-[#0831fe26] dark:hover:bg-gray-700 cursor-pointer">
            <BiSolidReport className="inline-block mr-2"></BiSolidReport>
            開發表單
          </li>
        </a>
        <li
          className="my-2 px-10 py-2 rounded hover:bg-[#0831fe26] dark:hover:bg-gray-700 cursor-pointer"
          onClick={() => {
            signOut();
          }}
        >
          <RiLogoutBoxRFill className="inline-block mr-2"></RiLogoutBoxRFill>
          登出
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
