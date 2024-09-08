import React, { useState } from "react";
import { RentingData } from "../types/search";
import { FaLocationDot, FaPhone, FaRegCalendar } from "react-icons/fa6";
import {
  MdElectricBolt,
  MdOutlineBed,
  MdOutlineMeetingRoom,
} from "react-icons/md";
import {
  BsFillDoorOpenFill,
  BsHouseFill,
  BsHouses,
  BsPeopleFill,
} from "react-icons/bs";
import { LuDog } from "react-icons/lu";
import { PiCookingPotBold } from "react-icons/pi";
import { TbManFilled } from "react-icons/tb";
import { FaRegCalendarAlt } from "react-icons/fa";
import { GiElectric } from "react-icons/gi";
import { Calendar } from "./calendar";
import { BiSolidBed, BiSolidBuildingHouse } from "react-icons/bi";
import DatePicker from "react-datepicker";
import test from "node:test";
import CalendarCard from "./CalendarCard";

interface HouseInfoProps {
  rentingData: RentingData;
}

const handleCalendar = () => {
  const event = {
    DTSTART: "20240817T120000Z", // 開始時間 (格式：YYYYMMDDTHHMMSSZ)
    DTEND: "20240817T130000Z", // 結束時間 (格式：YYYYMMDDTHHMMSSZ)
    SUMMARY: "會議", // 標題
    DESCRIPTION: "團隊會議", // 描述
    TZID: "Asia/Taipei", // 時區
  };
  // 建立 Calendar 實例
  const calendar = new Calendar(event);

  // 生成 iCal 連結
  // const icalLink = calendar.generateICS();
  // console.log('iCal 連結:', icalLink);
  // const icalLinkNode = document.querySelector("#icalLink") as HTMLAnchorElement
  // if(icalLinkNode){
  //     icalLinkNode.textContent = icalLink
  //     icalLinkNode.href = icalLink
  // }
  // const webCalLink = calendar.generateWEBCAL()
  // console.log('webCal 連結:', webCalLink);
  // const webCalLinkNode = document.querySelector("#webCalLink") as HTMLAnchorElement
  // if(webCalLinkNode){
  //     webCalLinkNode.textContent = webCalLink
  //     webCalLinkNode.href = webCalLink
  // }

  // 生成 Google Calendar 連結
  const googleCalendarLink = calendar.generateGoogleCalendarURL();
  const googleLinkContainer = document.createElement("a");
  googleLinkContainer.href = googleCalendarLink;
  googleLinkContainer.click();
  // console.log('Google Calendar 連結:', googleCalendarLink);
  // const googleLink = document.querySelector("#googleLink") as HTMLAnchorElement
  // if(googleLink){
  //     googleLink.textContent = googleCalendarLink
  //     googleLink.href = googleCalendarLink
  // }

  // 生成 Yahoo Calendar 連結
  // const yahooCalendarLink = calendar.generateYahooCalendarURL();
  // console.log('Yahoo Calendar 連結:', yahooCalendarLink);
};

let hourArray: string[] = [];
let minuteArray: string[] = [];
for (let i = 1; i <= 24; i++) {
  hourArray.push(i.toString());
}
for (let i = 0; i < 60; i++) {
  minuteArray.push(i.toString());
}

const HouseInfo: React.FC<HouseInfoProps> = ({ rentingData }) => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [reservationDate, setReserVationDate] = useState<string>("");
  const [reservationMinute, setReserVationMinute] = useState<string>("");
  const [reservationHour, setReserVationHour] = useState<string>("");
  const [reservationName, setReservationName] = useState<string>("");
  const [reservationText, setReservationText] = useState<string>("");
  const [showCalendarForm, setShowCalendarForm] = useState<Boolean>(false);
  let includeTitle = "";
  if (rentingData.含) {
    includeTitle = "含";
  } else {
    includeTitle = "";
  }

  const handleAddCalendar = () => {
    selectedDate.setHours(
      parseInt(reservationHour),
      parseInt(reservationMinute),
    );
    const UTCyear = selectedDate.toISOString().slice(0, 4);
    const UTCmonth = selectedDate.toISOString().slice(5, 7);
    const UTCday = selectedDate.toISOString().slice(8, 10);
    const UTChour = selectedDate.toISOString().slice(11, 13);
    const UTCmin = selectedDate.toISOString().slice(14, 16);
    const UTChourPlus = (parseInt(UTChour) + 1).toString();

    const event = {
      DTSTART: `${UTCyear}${UTCmonth}${UTCday}T${UTChour}${UTCmin}00Z`, // 開始時間 (格式：YYYYMMDDTHHMMSSZ)
      DTEND: `${UTCyear}${UTCmonth}${UTCday}T${UTChourPlus.length > 1 ? UTChourPlus : "0" + UTChourPlus}${UTCmin}00Z`, // 結束時間 (格式：YYYYMMDDTHHMMSSZ)
      SUMMARY: `${reservationName}預約看房`, // 標題
      DESCRIPTION: reservationText, // 描述,
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
    googleLinkContainer.click();
    // setShowCalendarForm(false);
  };
  return (
    <>
      <div className="py-4 flex-1 ">
        <div className="my-4">
          <div className="inline-block align-sub text-3xl">
            {rentingData.編號}
          </div>
          <span className="py-1 px-2 ml-2 rounded-xl text-xs bg-red-500 text-slate-100">
            {rentingData.物件狀態}
          </span>
          <span className=" align-sub text-lg ml-4">
            {rentingData.租金} <span className="text-sm">元/月</span>
          </span>
        </div>
        <div className="tracking-wider flex justify-between flex-col md:flex-row">
          <div>
            <div className="my-2">
              <BsPeopleFill className="inline-block"></BsPeopleFill>
              <span className="ml-1 mr-5 align-middle">
                {rentingData.姓名}{" "}
              </span>
              <FaPhone className="inline-block"></FaPhone>
              <div className="inline-block ml-1 mr-5 align-middle">
                {rentingData.電話}
              </div>
              <div className="my-1 text-xs text-gray-500">
                {rentingData.地址}
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
              <span className="ml-1 mr-5 align-middle">{rentingData.型態}</span>
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
              <span className="ml-1 mr-5 align-middle">{rentingData.電}</span>
            </div>
            <div className="my-2">
              <div className="text-xs text-gray-500">
                備註：服務費{rentingData.服務費}，{includeTitle}
                {rentingData.含}
              </div>
            </div>
          </div>
          <div
            className={`${showCalendarForm ? "block bg-white z-50" : "hidden bg-white md:block"} border rounded border-sky-200 p-4 w-[300px] absolute top-1/2 left-1/2 md:top-auto md:left-auto bg-white -translate-y-1/2 -translate-x-1/2 md:translate-x-0 md:translate-y-0 md:relative md:w-auto text-sm`}
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
        >
          <FaRegCalendarAlt className="inline-block mr-2"></FaRegCalendarAlt>
          <span className="text-sm">建立行事曆</span>
        </button>
      </div>
      <div>
        <h2 className="mt-8 mb-2 text-lg font-bold">對話要點</h2>
        <div className="rounded border w-full border-gray-800 p-3">
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
