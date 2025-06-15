import { toPageMyHouseList } from "@/app/lib/navigation";
import { personBGColor } from "@/app/lib/utils";
import usePersonStore from "@/app/store/usePersonStore";
import { useState } from "react";

const SearchName = () => {
  const [isOpen, setIsOpen] = useState<Boolean>(false);
  const personNameList = ["阿聖", "K", "黑", "理查", "承恩"];
  const personName = usePersonStore((s) => s.person);

  const PersonNameItem = ({ name }: { name: string }) => {
    const handleClick = () => {
      usePersonStore.setState({ person: name });
      toPageMyHouseList();
      setIsOpen(false);
    };
    return (
      <li onClick={handleClick}>
        <a className="block px-4 py-2 hover:bg-[gainsboro]">{name}</a>
      </li>
    );
  };

  return (
    <div
      className={`flex mx-auto items-center text-[0.9rem] px-2 py-1 w-[95%] sm:ml-auto sm:mr-4 sm:w-fit rounded-2xl`}
    >
      <button
        id="dropdownDefaultButton"
        className="w-full min-w-40 flex justify-between relative text-white focus:outline-none font-medium rounded-2xl text-xs px-5 py-2.5 text-center items-center"
        type="button"
        style={{
          background:
            personBGColor[personName as keyof typeof personBGColor] || "gray",
        }}
        onClick={() => setIsOpen(!isOpen)}
      >
        {personName ? personName : "選擇業務姓名"}
        <svg
          className="w-2.5 h-2.5 ms-3"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 10 6"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m1 1 4 4 4-4"
          />
        </svg>
        <div
          id="dropdown"
          className={`${isOpen ? "h-96 border border-slate-300" : "h-0"} text-black bg-white transition-height duration-300 overflow-hidden absolute top-12 left-0 w-full max-h-fit z-10 divide-y divide-gray-100 rounded-lg shadow-md dark:bg-gray-700 `}
          //   style={{
          //     background:
          //       "linear-gradient(90deg, rgb(101 69 34) 0%, rgb(168 141 106) 50%, rgb(171 156 149) 100%)",
          //   }}
        >
          <ul className="py-2 text-sm" aria-labelledby="dropdownDefaultButton">
            {personNameList.map((name, index) => (
              <PersonNameItem name={name} key={index} />
            ))}
          </ul>
        </div>
      </button>
    </div>
  );
};

export default SearchName;
