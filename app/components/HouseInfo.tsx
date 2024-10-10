import React, { useEffect, useState } from "react";
import { RentingData } from "../types/search";
import { FaPhone } from "react-icons/fa6";
import { MdElectricBolt } from "react-icons/md";
import { BsFillDoorOpenFill, BsHouseFill, BsPeopleFill } from "react-icons/bs";
import { LuDog } from "react-icons/lu";
import { PiCookingPotBold } from "react-icons/pi";
import { FaRegCalendarAlt } from "react-icons/fa";
import { Calendar } from "./calendar";
import { BiSolidBed, BiSolidBuildingHouse } from "react-icons/bi";
import DatePicker from "react-datepicker";
import { isMobile, phoneNumberFormat } from "@/lib/utils";
import Loader from "./Loader";

interface HouseInfoProps {
  rentingData: RentingData;
  setRentingData: React.Dispatch<React.SetStateAction<RentingData | undefined>>;
  setShowHouseList: React.Dispatch<React.SetStateAction<Boolean>>;
  houseList: string[][] | undefined;
}

let hourArray: string[] = [];
let minuteArray: string[] = ["00", "10", "20", "30", "40", "50"];
for (let i = 1; i <= 24; i++) {
  hourArray.push(i.toString());
}

const HouseInfo: React.FC<HouseInfoProps> = ({
  rentingData,
  setRentingData,
  setShowHouseList,
  houseList,
}) => {
  console.log(rentingData.上架狀態);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [reservationMinute, setReserVationMinute] = useState<string>("00");
  const [reservationHour, setReserVationHour] = useState<string>(
    new Date().getHours().toString(),
  );
  const [reservationName, setReservationName] = useState<string>("");
  const [reservationText, setReservationText] = useState<string>("");
  const [showCalendarForm, setShowCalendarForm] = useState<Boolean>(false);
  const [isMobileText, setIsMobileText] = useState<string>("");
  const [showStatusChange, setShowStatusChange] = useState<Boolean>(false);
  const [isLoading, setIsLoading] = useState<Boolean>(false);

  useEffect(() => {
    if (isMobile.any()) {
      setIsMobileText("Z");
    } else {
      setIsMobileText("");
    }
  }, [isMobileText]);

  const handleAddCalendar = () => {
    console.log(selectedDate);
    const selectedDateString = selectedDate.toLocaleDateString().split("/");
    const selectedYear = selectedDateString[0];
    const selectedMonth = selectedDateString[1];
    const selectedDay = selectedDateString[2];
    const reservationHourPlus = (parseInt(reservationHour) + 1).toString();

    const event = {
      DTSTART: `${selectedYear}${selectedMonth.length > 1 ? selectedMonth : "0" + selectedMonth}${selectedDay.length > 1 ? selectedDay : "0" + selectedDay}T${reservationHour.length > 1 ? reservationHour : "0" + reservationHour}${reservationMinute}00`, // 開始時間 (格式：YYYYMMDDTHHMMSSZ)
      DTEND: `${selectedYear}${selectedMonth.length > 1 ? selectedMonth : "0" + selectedMonth}${selectedDay.length > 1 ? selectedDay : "0" + selectedDay}T${reservationHourPlus.length > 1 ? reservationHourPlus : "0" + reservationHourPlus}${reservationMinute}00`, // 結束時間 (格式：YYYYMMDDTHHMMSSZ)
      SUMMARY: `${reservationName}預約看房`, // 標題
      DESCRIPTION: rentingData.對話要點 + "，" + reservationText, // 描述,
      LOCATION: rentingData.地址,
      TZID: "Asia/Taipei", // 時區
    };
    //   // 建立 Calendar 實例
    const calendar = new Calendar(event);
    // 生成 Google Calendar 連結
    const googleCalendarLink = calendar.generateGoogleCalendarURL();
    const googleLinkContainer = document.createElement("a");
    googleLinkContainer.href = googleCalendarLink;
    googleLinkContainer.target = "_blank";
    googleLinkContainer.click();
  };
  const handleReturn = () => {
    setRentingData(undefined);
    setShowHouseList(true);
  };
  const formattedNumber: string = phoneNumberFormat(rentingData.電話) || "";

  const handleRentingStatusChange = () => {
    setIsLoading(true);
    const changeRentingStatus = async () => {
      const response = fetch(
        `https://sheets.googleapis.com/v4/spreadsheets/{spreadsheetId}/values/{range}`,
      );
    };
  };

  return (
    <>
      <div className="py-4 flex-1 ">
        {houseList && (
          <div
            className="w-fit border-b select-none hover:border-gray-700  border-white cursor-pointer"
            onClick={handleReturn}
          >
            <svg
              fill="#000000"
              width="20px"
              height="20px"
              viewBox="0 0 24 24"
              className="inline"
            >
              <g data-name="Layer 2">
                <g data-name="arrow-back">
                  <rect
                    width="24"
                    height="24"
                    transform="rotate(90 12 12)"
                    opacity="0"
                  />

                  <path d="M19 11H7.14l3.63-4.36a1 1 0 1 0-1.54-1.28l-5 6a1.19 1.19 0 0 0-.09.15c0 .05 0 .08-.07.13A1 1 0 0 0 4 12a1 1 0 0 0 .07.36c0 .05 0 .08.07.13a1.19 1.19 0 0 0 .09.15l5 6A1 1 0 0 0 10 19a1 1 0 0 0 .64-.23 1 1 0 0 0 .13-1.41L7.14 13H19a1 1 0 0 0 0-2z" />
                </g>
              </g>
            </svg>
            <span className="ml-1 sm:inline hidden">返回</span>
          </div>
        )}
        <div
          className={`my-4 pl-2 border-l-4 ${rentingData.上架狀態 === "已上架" ? "border-red-600" : "border-gray-500"}`}
        >
          <div className="inline-block align-sub text-3xl">
            {rentingData.編號}
          </div>
          <span
            className={`py-1 px-2 ml-2 rounded-xl text-xs select-none ${rentingData.物件狀態 === "待出租" ? "bg-green-400" : "bg-red-500"} text-slate-100`}
            onClick={() => {
              setShowStatusChange(true);
            }}
          >
            {rentingData.物件狀態}
          </span>
          <span className=" align-sub sm:text-lg sm:ml-4 ml-1 text-base">
            {rentingData.租金} <span className="text-sm">元/月</span>
          </span>
        </div>
        <div className="tracking-wider flex justify-between flex-col md:flex-row">
          <div>
            <div className="my-2">
              <BsPeopleFill className="inline-block"></BsPeopleFill>
              <span className="ml-1 sm:mr-5 mr-2 align-middle">
                {rentingData.姓名}{" "}
              </span>
              <FaPhone className="inline-block"></FaPhone>
              <div className="inline-block ml-1 mr-5 align-middle">
                <a href={`tel:+886${formattedNumber.slice(1, 10)}`}>
                  {formattedNumber.slice(0, 4)}-{formattedNumber.slice(4, 7)}-
                  {formattedNumber.slice(7)}
                </a>
              </div>
              <div className="my-1 text-xs text-gray-500">
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${rentingData.地址}`}
                  target="_blank"
                >
                  {rentingData.地址}
                </a>
              </div>
            </div>
            <div className="mt-6 mb-1">
              <BiSolidBed className="inline-block" color="green"></BiSolidBed>
              <span className="ml-1 mr-5 align-middle">{rentingData.格局}</span>
              <BsFillDoorOpenFill
                className="inline-block"
                color="green"
              ></BsFillDoorOpenFill>
              <span className="ml-1 mr-5 align-middle">
                {rentingData.坪數}坪
              </span>
              <div className="my-1 block md:hidden"></div>
              <BsHouseFill className="inline-block" color="green"></BsHouseFill>
              <span className="ml-1 mr-5 align-middle">
                {rentingData.建物型態}
              </span>
              <BiSolidBuildingHouse
                className="inline-block"
                color="green"
              ></BiSolidBuildingHouse>
              <span className="ml-1 mr-5 align-middle">{rentingData.現況}</span>
            </div>
            <div className="mb-6">
              <LuDog className="inline-block" color="#df8a02"></LuDog>
              <span className="ml-1 mr-5 align-middle">{rentingData.寵物}</span>
              <PiCookingPotBold
                className="inline-block"
                color="#df8a02"
              ></PiCookingPotBold>
              <span className="ml-1 mr-5 align-middle">{rentingData.開伙}</span>
              <MdElectricBolt
                className="inline-block"
                color="#df8a02"
              ></MdElectricBolt>
              <span className="ml-1 mr-5 align-middle">{rentingData.電費}</span>
            </div>
            <div className="my-2">
              <div className="text-xs text-gray-500">
                備註：服務費{rentingData.服務費}
              </div>
            </div>
            {rentingData.屋主網址 && (
              <div className="mt-3">
                <div className="px-1 py-2 bg-[#fff7e6] text-xs text-[#a16426] w-fit rounded select-none cursor-pointer hover:bg-[#f7c968]">
                  <a href={`${rentingData.屋主網址}`} target="_blank">
                    <span>查看591物件</span>
                    <svg
                      width="16px"
                      height="16px"
                      viewBox="0 0 18 18"
                      mirror-in-rtl="true"
                      className="inline align-top mx-1"
                    >
                      <path
                        fill="#a16426"
                        d="M12.1.6a.944.944 0 0 0 .2 1.04l1.352 1.353L10.28 6.37a.956.956 0 0 0 1.35 1.35l3.382-3.38 1.352 1.352a.944.944 0 0 0 1.04.2.958.958 0 0 0 .596-.875V.96a.964.964 0 0 0-.96-.96h-4.057a.958.958 0 0 0-.883.6z"
                      />
                      <path
                        fill="#a16426"
                        d="M14 11v5a2.006 2.006 0 0 1-2 2H2a2.006 2.006 0 0 1-2-2V6a2.006 2.006 0 0 1 2-2h5a1 1 0 0 1 0 2H2v10h10v-5a1 1 0 0 1 2 0z"
                      />
                    </svg>
                  </a>
                </div>
              </div>
            )}
          </div>
          <div
            className={`${showCalendarForm ? "block bg-white z-50" : "hidden bg-white md:block"} border rounded border-sky-200 p-4 w-[300px] absolute top-1/2 left-1/2 md:top-auto md:left-auto bg-white -translate-y-1/2 -translate-x-1/2 md:translate-x-0 md:translate-y-0 md:relative md:w-auto text-sm`}
            data-testid="calendar-form"
          >
            <div>
              <DatePicker
                showIcon
                toggleCalendarOnIconClick
                selected={selectedDate}
                // readOnly
                onChange={(date) => {
                  if (date) {
                    setSelectedDate(date);
                  }
                }}
                icon={
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="1em"
                    height="1em"
                    viewBox="0 0 48 48"
                  >
                    <mask id="ipSApplication0">
                      <g
                        fill="none"
                        stroke="#fff"
                        strokeLinejoin="round"
                        strokeWidth="4"
                      >
                        <path
                          strokeLinecap="round"
                          d="M40.04 22v20h-32V22"
                        ></path>
                        <path
                          fill="#fff"
                          d="M5.842 13.777C4.312 17.737 7.263 22 11.51 22c3.314 0 6.019-2.686 6.019-6a6 6 0 0 0 6 6h1.018a6 6 0 0 0 6-6c0 3.314 2.706 6 6.02 6c4.248 0 7.201-4.265 5.67-8.228L39.234 6H8.845l-3.003 7.777Z"
                        ></path>
                      </g>
                    </mask>
                    <path
                      fill="currentColor"
                      d="M0 0h48v48H0z"
                      mask="url(#ipSApplication0)"
                    ></path>
                  </svg>
                }
              />
            </div>
            <div>
              <select
                className="inline-block border border-gray-300 text-gray-900 text-sm rounded-lg  py-1.5 px-2.5 my-1"
                onChange={(e) => {
                  console.log(e.target.value);
                  setReserVationHour(e.target.value);
                }}
                value={reservationHour}
              >
                {hourArray.map((hour) => (
                  <option key={hour}>{hour}</option>
                ))}
              </select>
              <span className="mx-1">時</span>
              <select
                className="inline-block border border-gray-300 text-gray-900 text-sm rounded-lg py-1.5 px-2.5 my-1"
                onChange={(e) => {
                  console.log(e.target.value);
                  setReserVationMinute(e.target.value);
                }}
                value={reservationMinute}
              >
                {minuteArray.map((minute) => (
                  <option key={minute}>{minute}</option>
                ))}
              </select>
              <span className="mx-1">分</span>
            </div>
            <div className="my-2">
              <span className="mr-2 text-sm">姓名</span>
              <input
                type="name"
                className="text-base border rounded inline=block w-1/2 focus:outline-sky-300 focus:outline-1 pl-1"
                onChange={(e) => {
                  setReservationName(e.target.value);
                }}
                value={reservationName}
              ></input>
            </div>
            <div className="my-2">
              <span className="mr-2 text-sm flex-1 text-nowrap">備註</span>
              <input
                type="text"
                className="text-base border rounded inline-block w-3/4 focus:outline-sky-300 focus:outline-1 pl-1"
                onChange={(e) => {
                  setReservationText(e.target.value);
                }}
                value={reservationText}
              ></input>
            </div>
            <button
              className="block  border rounded border-gray-500 py-2 md:py-1 px-8 mx-auto mt-8 md:mt-4 hover:bg-slate-200"
              onClick={handleAddCalendar}
            >
              <FaRegCalendarAlt className="inline-block mr-2"></FaRegCalendarAlt>
              <span className="text-sm">添加到行事曆</span>
            </button>
          </div>
        </div>
        <button
          className="border rounded border-gray-500 py-2 px-8 mr-auto block md:hidden mt-4 w-5/6 hover:bg-slate-200"
          onClick={() => {
            setShowCalendarForm(!showCalendarForm);
          }}
          data-testid="generate-calendar"
        >
          <FaRegCalendarAlt className="inline-block mr-2"></FaRegCalendarAlt>
          <span className="text-sm">建立行事曆</span>
        </button>
      </div>
      <div>
        <h2 className="mt-8 mb-2 text-lg font-bold">對話要點</h2>
        <div className="rounded border w-11/12 sm:w-full border-gray-800 p-3 break-words">
          {rentingData.對話要點}
        </div>
      </div>
      {showCalendarForm && (
        <div
          className="block md:hidden w-full h-full fixed top-0 right-0 left-0 bottom-0 bg-black/40 z-10 animate-[fade-in_0.15s_both] px-[auto] motion-reduce:transition-none motion-reduce:animate-none"
          data-twe-dropdown-backdrop-ref=""
          onClick={() => {
            setShowCalendarForm(false);
          }}
        ></div>
      )}
      {showStatusChange && (
        <>
          <div
            className="w-full h-full fixed top-0 right-0 left-0 bottom-0 bg-black/40 z-10 animate-[fade-in_0.15s_both] px-[auto] motion-reduce:transition-none motion-reduce:animate-none"
            data-twe-dropdown-backdrop-ref=""
            onClick={() => {
              setShowStatusChange(false);
            }}
          ></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col justify-center w-56 h-fit bg-[#fff7E6] z-10 rounded p-2 text-center text-sm">
            <div className="mt-3 mb-2">是否要變更上架狀態？</div>
            <div className="mb-2 text-xs">目前狀態：{rentingData.上架狀態}</div>
            {isLoading && <Loader></Loader>}
            <div className="w-full flex items-center justify-center gap-5 mt-5">
              <button
                className="rounded border border-slate-900 px-2 py-1"
                onClick={() => {
                  setShowStatusChange(false);
                }}
              >
                取消
              </button>
              <button
                className="rounded bg-red-500 px-2 py-1 mx-2 text-slate-200"
                onClick={handleRentingStatusChange}
              >
                變更
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default HouseInfo;
