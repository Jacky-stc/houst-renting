import React from "react";
import { HiOutlineDocumentReport } from "react-icons/hi";
import { IoMdGitCompare } from "react-icons/io";
import { IoBookmarkOutline } from "react-icons/io5";
import { VscSearch } from "react-icons/vsc";

const Navbar = () => {
  return (
    <nav className="w-30 border-r border-slate-400 hidden lg:block">
      <ul className="mx-4">
        <li className="my-2 px-10 py-2 rounded hover:bg-[#0831fe26] cursor-pointer bg-[#0831fe26]">
          <VscSearch className="inline-block mr-2"></VscSearch>物件查詢
        </li>
        <li className="my-2 px-10 py-2 rounded hover:bg-[#0831fe26] cursor-pointer">
          <IoBookmarkOutline className="inline-block mr-2"></IoBookmarkOutline>
          收藏物件
        </li>
        <a href="https://forms.gle/Z3og9gGzQ9sANZfF7" target="_blank">
          <li className="my-2 px-10 py-2 rounded hover:bg-[#0831fe26] cursor-pointer">
            <IoMdGitCompare className="inline-block mr-2"></IoMdGitCompare>
            回報表單
          </li>
        </a>
        <a href="https://forms.gle/gk9ybxm464FiXLMw9" target="_blank">
          <li className="my-2 px-10 py-2 rounded hover:bg-[#0831fe26] cursor-pointer">
            <HiOutlineDocumentReport className="inline-block mr-2"></HiOutlineDocumentReport>
            開發表單
          </li>
        </a>
      </ul>
    </nav>
  );
};

export default Navbar;
