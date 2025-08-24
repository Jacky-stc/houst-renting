import React, { useEffect, useState } from "react";
import { RentingData } from "../../types/search";
import { FaPhone } from "react-icons/fa6";
import { MdElectricBolt } from "react-icons/md";
import { BsFillDoorOpenFill, BsHouseFill, BsPeopleFill } from "react-icons/bs";
import { LuDog } from "react-icons/lu";
import { PiCookingPotBold } from "react-icons/pi";
import { FaRegCalendarAlt } from "react-icons/fa";
import { Calendar } from "../calendar";
import { BiSolidBed, BiSolidBuildingHouse } from "react-icons/bi";
import DatePicker from "react-datepicker";
import { isMobile, phoneNumberFormat } from "../../lib/utils";
import { useRentingData } from "../../store/useRentingData";
import { TbMessageReportFilled } from "react-icons/tb";
import ChangeDataModal from "../common/ChangeDataModal";
import {
  DateSVG,
  InstagramSVG,
  OpenNewPageSVG,
  ReturnSVG,
  ThreadsSVG,
} from "../common/SVG";

interface HouseInfoProps {
  rentingData: RentingData;
  houseList: { value: string[]; index: number }[] | undefined;
}

const hourArray: string[] = [];
const minuteArray: string[] = ["00", "10", "20", "30", "40", "50"];
for (let i = 1; i <= 24; i++) {
  hourArray.push(i.toString());
}

const HouseInfo: React.FC<HouseInfoProps> = ({ rentingData, houseList }) => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [reservationMinute, setReserVationMinute] = useState<string>("00");
  const [reservationHour, setReserVationHour] = useState<string>(
    new Date().getHours().toString()
  );
  const [reservationName, setReservationName] = useState<string>("");
  const [reservationText, setReservationText] = useState<string>("");
  const [showCalendarForm, setShowCalendarForm] = useState<boolean>(false);
  const [isMobileText, setIsMobileText] = useState<string>("");
  const [showStatusChange, setShowStatusChange] = useState<boolean>(false);

  useEffect(() => {
    if (isMobile.any()) {
      setIsMobileText("Z");
    } else {
      setIsMobileText("");
    }
  }, [isMobileText]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleAddCalendar = () => {
    const selectedDateString = selectedDate.toLocaleDateString().split("/");
    const selectedYear = selectedDateString[0];
    const selectedMonth = selectedDateString[1];
    const selectedDay = selectedDateString[2];
    const reservationHourPlus = (parseInt(reservationHour) + 1).toString();

    const event = {
      DTSTART: `${selectedYear}${selectedMonth.length > 1 ? selectedMonth : "0" + selectedMonth}${selectedDay.length > 1 ? selectedDay : "0" + selectedDay}T${reservationHour.length > 1 ? reservationHour : "0" + reservationHour}${reservationMinute}00`, // 開始時間 (格式：YYYYMMDDTHHMMSSZ)
      DTEND: `${selectedYear}${selectedMonth.length > 1 ? selectedMonth : "0" + selectedMonth}${selectedDay.length > 1 ? selectedDay : "0" + selectedDay}T${reservationHourPlus.length > 1 ? reservationHourPlus : "0" + reservationHourPlus}${reservationMinute}00`, // 結束時間 (格式：YYYYMMDDTHHMMSSZ)
      SUMMARY: `${rentingData.編號} ${reservationName}預約看房`, // 標題
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
    useRentingData.setState({
      rentingData: null,
    });
  };
  const formattedNumber: string = phoneNumberFormat(rentingData.電話 || "");

  return (
    <div className="px-4">
      <div className="py-4 flex-1">
        {houseList && houseList.length > 0 && (
          <div
            className="w-fit border-b select-none hover:border-gray-700  border-white cursor-pointer"
            onClick={handleReturn}
          >
            <ReturnSVG />
            <span className="ml-1 sm:inline hidden">返回</span>
          </div>
        )}
        <div
          className={`my-4 pl-2 border-l-4 ${rentingData.上架網址 ? "border-red-600" : "border-gray-500"}`}
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
              <BsPeopleFill className="inline-block" />
              <span className="ml-1 sm:mr-5 mr-2 align-middle">
                {rentingData.姓名}{" "}
              </span>
              <FaPhone className="inline-block" />
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
              <BiSolidBed className="inline-block" color="green" />
              <span className="ml-1 mr-5 align-middle">{rentingData.格局}</span>
              <BsFillDoorOpenFill className="inline-block" color="green" />
              <span className="ml-1 mr-5 align-middle">
                {rentingData.坪數}坪
              </span>
              <div className="my-1 block md:hidden"></div>
              <BsHouseFill className="inline-block" color="green" />
              <span className="ml-1 mr-5 align-middle">
                {rentingData.建物型態}
              </span>
              <BiSolidBuildingHouse className="inline-block" color="green" />
              <span className="ml-1 mr-5 align-middle">{rentingData.現況}</span>
            </div>
            <div className="mb-6">
              <LuDog className="inline-block" color="#df8a02"></LuDog>
              <span className="ml-1 mr-5 align-middle">{rentingData.寵物}</span>
              <PiCookingPotBold className="inline-block" color="#df8a02" />
              <span className="ml-1 mr-5 align-middle">{rentingData.開伙}</span>
              <MdElectricBolt className="inline-block" color="#df8a02" />
              <span className="ml-1 mr-5 align-middle">{rentingData.電費}</span>
            </div>
            <div className="my-2">
              <div className="text-xs text-gray-500">
                備註：服務費：{rentingData.服務費}，樓層：{rentingData.樓層}
                ，業務編號：{rentingData.業務編號}
              </div>
            </div>
            {rentingData.屋主網址 && (
              <div className="mt-3 inline-block mr-3">
                <div className="px-1 py-2 bg-[#fff7e6] dark:bg-[#2f2613] text-xs text-[#a16426] dark:text-[#ffc58a] w-fit rounded select-none cursor-pointer hover:bg-[#f7c968]">
                  <a href={`${rentingData.屋主網址}`} target="_blank">
                    <span>查看屋主物件</span>
                    <OpenNewPageSVG />
                  </a>
                </div>
              </div>
            )}
            {rentingData.上架網址 && (
              <div className="mt-3 inline-block">
                <div className="px-1 py-2 bg-[#fff7e6] dark:bg-[#2f2613] text-xs text-[#a16426] dark:text-[#ffc58a] w-fit rounded select-none cursor-pointer hover:bg-[#f7c968]">
                  <a href={`${rentingData.上架網址}`} target="_blank">
                    <span>查看上架物件</span>
                    <OpenNewPageSVG />
                  </a>
                </div>
              </div>
            )}
            <div className="flex">
              {rentingData.Instagram && (
                <div className="mt-3 inline-block mr-3">
                  <div className="w-10 select-none cursor-pointer ">
                    <a href={rentingData.Instagram} target="_blank">
                      <InstagramSVG />
                    </a>
                  </div>
                </div>
              )}
              {rentingData.Threads && (
                <div className="mt-3 mr-3 w-10 h-10 flex justify-center items-center">
                  <div className="w-[1.8rem] select-none cursor-pointer ">
                    <a href={rentingData.Threads} target="_blank">
                      <ThreadsSVG />
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div
            className={`${showCalendarForm ? "block bg-white dark:bg-[#0f0f14fa] z-50" : "hidden bg-white dark:bg-[#0f0f14fa] md:block"} border rounded border-sky-200 p-4 w-[300px] absolute top-1/2 left-1/2 md:top-auto md:left-auto -translate-y-1/2 -translate-x-1/2 md:translate-x-0 md:translate-y-0 md:relative md:w-auto text-sm`}
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
                icon={<DateSVG />}
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
        <a
          target="_blank"
          href={`https://docs.google.com/forms/d/e/1FAIpQLSd8qa_9ieO4AqlstbAPUu4CeglvhUyqV6os_OgUfTES_-TAyQ/viewform?usp=pp_url&entry.1283753739=${rentingData.編號}`}
        >
          <button className="border rounded border-gray-500 py-2 px-8 mr-auto block md:hidden mt-4 w-5/6 hover:bg-slate-200">
            <TbMessageReportFilled className="inline-block mr-2"></TbMessageReportFilled>
            <span className="text-sm">回報物件</span>
          </button>
        </a>
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
        <div className="rounded border w-11/12 sm:w-full border-gray-800 dark:border-gray-200 p-3 break-words">
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
        <ChangeDataModal setShowStatusChange={setShowStatusChange} />
      )}
    </div>
  );
};

export default HouseInfo;
