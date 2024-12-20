"use client";
import React, { useState } from "react";
import { HiOutlineDocumentReport } from "react-icons/hi";
import { IoIosLogOut, IoMdGitCompare } from "react-icons/io";
import { IoBookmarkOutline } from "react-icons/io5";
import { VscSearch } from "react-icons/vsc";

const Hamburger = () => {
  const [isOpen, setIsOpen] = useState<Boolean>(false);

  const handleClick = () => {
    setIsOpen(!isOpen);
  };
  return (
    <>
      <button
        onClick={handleClick}
        className="flex flex-col justify-center items-center lg:hidden z-50"
      >
        <span
          className={`bg-slate-700 block transition-all duration-300 ease-out 
                            h-0.5 w-6 rounded-sm ${
                              isOpen
                                ? "rotate-45 translate-y-1"
                                : "-translate-y-0.5"
                            }`}
        ></span>
        <span
          className={`bg-slate-700 block transition-all duration-300 ease-out 
                            h-0.5 w-6 rounded-sm my-0.5 ${isOpen ? "opacity-0" : "opacity-100"}`}
        ></span>
        <span
          className={`bg-slate-700 block transition-all duration-300 ease-out 
                            h-0.5 w-6 rounded-sm ${
                              isOpen
                                ? "-rotate-45 -translate-y-1"
                                : "translate-y-0.5"
                            }`}
        ></span>
      </button>
      {isOpen && (
        <div className="absolute w-screen h-screen bg-white opacity-95 top-0 right-0 block z-10 lg:hidden">
          <nav className="w-30 border-r border-slate-400 py-24">
            <ul className="mx-4">
              <li className="my-4 px-10 py-2 rounded hover:bg-[#0831fe26] cursor-pointer bg-[#0831fe26]">
                <VscSearch className="inline-block mr-2"></VscSearch>物件查詢
              </li>
              <li className="my-4 px-10 py-2 rounded hover:bg-[#0831fe26] cursor-pointer">
                <IoBookmarkOutline className="inline-block mr-2"></IoBookmarkOutline>
                收藏物件
              </li>
              <a href="https://forms.gle/Z3og9gGzQ9sANZfF7" target="_blank">
                <li className="my-4 px-10 py-2 rounded hover:bg-[#0831fe26] cursor-pointer">
                  <IoMdGitCompare className="inline-block mr-2"></IoMdGitCompare>
                  回報表單
                </li>
              </a>
              <a href="https://forms.gle/gk9ybxm464FiXLMw9" target="_blank">
                <li className="my-4 px-10 py-2 rounded hover:bg-[#0831fe26] cursor-pointer">
                  <HiOutlineDocumentReport className="inline-block mr-2"></HiOutlineDocumentReport>
                  開發表單
                </li>
              </a>
              <li className="my-4 px-10 py-2 rounded hover:bg-[#0831fe26] cursor-pointer">
                <IoIosLogOut className="inline-block mr-2"></IoIosLogOut>
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
