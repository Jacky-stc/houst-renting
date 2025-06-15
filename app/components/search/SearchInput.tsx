import { handleSearch } from "@/app/lib/search";
import React, { useState } from "react";
import { IoSearchOutline } from "react-icons/io5";

const SearchInput = () => {
  const [inputValue, setInputValue] = useState<string>("");
  const [inputFocus, setInputFocus] = useState<Boolean>(false);
  const [isComposition, setIsComposition] = useState<Boolean>(false);

  const handleEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (isComposition) return;
    if (e.code === "Enter") {
      handleSearch(inputValue);
    }
  };
  return (
    <div
      className={`flex mx-auto items-center text-[0.9rem] px-2 py-1 w-[95%] sm:ml-auto sm:mr-4 sm:w-72 rounded-2xl ${inputFocus ? " border border-sky-400" : "border"}`}
    >
      <IoSearchOutline></IoSearchOutline>
      <div className="flex justify-between w-full sm:w-auto">
        <input
          style={{
            WebkitTapHighlightColor: "transparent",
            outline: "none",
          }}
          value={inputValue}
          onFocus={() => {
            setInputFocus(true);
          }}
          onBlur={() => {
            setInputFocus(false);
          }}
          onChange={(e) => setInputValue(e.target.value)}
          onCompositionStart={() => {
            setIsComposition(true);
          }}
          onCompositionEnd={() => {
            setIsComposition(false);
          }}
          onKeyDown={(e) => {
            handleEnter(e);
          }}
          className="bg-transparent rounded-sm px-2 py-1 mx-1 w-full sm:w-52 focus:outline-0 outline-0"
          placeholder="輸入物件編號或區域"
          spellCheck="false"
        ></input>
        <button
          onClick={() => {
            handleSearch(inputValue);
          }}
          className="hidden sm:block"
        >
          搜尋
        </button>
      </div>
    </div>
  );
};

export default SearchInput;
