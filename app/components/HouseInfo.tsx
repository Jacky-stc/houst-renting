import React, { useEffect, useState } from "react";
import { RentingData } from "../types/search";
import { FaPhone, FaRegCalendar } from "react-icons/fa6";
import { MdElectricBolt } from "react-icons/md";
import { BsFillDoorOpenFill, BsHouseFill, BsPeopleFill } from "react-icons/bs";
import { LuDog } from "react-icons/lu";
import { PiCookingPotBold } from "react-icons/pi";
import { FaRegCalendarAlt } from "react-icons/fa";
import { Calendar } from "./calendar";
import { BiSolidBed, BiSolidBuildingHouse } from "react-icons/bi";
import DatePicker from "react-datepicker";

interface HouseInfoProps {
  rentingData: RentingData;
}

let hourArray: string[] = [];
let minuteArray: string[] = ["00", "10", "20", "30", "40", "50"];
for (let i = 1; i <= 24; i++) {
  hourArray.push(i.toString());
}

const HouseInfo: React.FC<HouseInfoProps> = ({ rentingData }) => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [reservationMinute, setReserVationMinute] = useState<string>("00");
  const [reservationHour, setReserVationHour] = useState<string>(
    new Date().getHours().toString(),
  );
  const [reservationName, setReservationName] = useState<string>("");
  const [reservationText, setReservationText] = useState<string>("");
  const [showCalendarForm, setShowCalendarForm] = useState<Boolean>(false);
  const [isMobileText, setIsMobileText] = useState<string>("");

  useEffect(() => {
    const isMobile = {
      Android: function () {
        return navigator.userAgent.match(/Android/i);
      },
      BlackBerry: function () {
        return navigator.userAgent.match(/BlackBerry/i);
      },
      iOS: function () {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
      },
      Opera: function () {
        return navigator.userAgent.match(/Opera Mini/i);
      },
      Windows: function () {
        return (
          navigator.userAgent.match(/IEMobile/i) ||
          navigator.userAgent.match(/WPDesktop/i)
        );
      },
      any: function () {
        return (
          isMobile.Android() ||
          isMobile.BlackBerry() ||
          isMobile.iOS() ||
          isMobile.Opera() ||
          isMobile.Windows()
        );
      },
    };
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
    console.log(event);
    //   // 建立 Calendar 實例
    const calendar = new Calendar(event);
    // 生成 Google Calendar 連結
    const googleCalendarLink = calendar.generateGoogleCalendarURL();
    const googleLinkContainer = document.createElement("a");
    googleLinkContainer.href = googleCalendarLink;
    googleLinkContainer.target = "_blank";
    console.log(googleCalendarLink);
    googleLinkContainer.click();
    // const icsLink = calendar.generateICS();
    // console.log(icsLink);
    // const icsLinkContainer = document.createElement("a");
    // icsLinkContainer.href = icsLink;
    // icsLinkContainer.click();
    // setShowCalendarForm(false);
  };

  return (
    <>
      <div className="py-4 flex-1 ">
        <div className="my-4">
          <div className="inline-block align-sub text-3xl">
            {rentingData.編號}
          </div>
          <span
            className={`py-1 px-2 ml-2 rounded-xl text-xs ${rentingData.物件狀態 === "待出租" ? "bg-green-400" : "bg-red-500"} text-slate-100`}
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
                <a href={`tel:+886${rentingData.電話.slice(1, 10)}`}>
                  {rentingData.電話.slice(0, 4)}-{rentingData.電話.slice(4, 7)}-
                  {rentingData.電話.slice(7, 10)}
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
        <div className="rounded border w-11/12 sm:w-full border-gray-800 p-3">
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
    </>
  );
};

export default HouseInfo;
