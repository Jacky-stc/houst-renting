import React, { useEffect, useState } from 'react';
import { RentingData } from '../../types/search';
import { FaPhone } from 'react-icons/fa6';
import { MdElectricBolt } from 'react-icons/md';
import { BsFillDoorOpenFill, BsHouseFill, BsPeopleFill } from 'react-icons/bs';
import { LuDog } from 'react-icons/lu';
import { PiCookingPotBold } from 'react-icons/pi';
import { FaRegCalendarAlt } from 'react-icons/fa';
import { BiSolidBed, BiSolidBuildingHouse } from 'react-icons/bi';
import { phoneNumberFormat } from '../../lib/utils';
import { useRentingData } from '../../store/useRentingData';
import { TbMessageReportFilled } from 'react-icons/tb';
import ChangeDataModal from '../common/ChangeDataModal';
import { FaceBookSVG, InstagramSVG, OpenNewPageSVG, ReturnSVG, ThreadsSVG } from '../common/SVG';
import { HouseConfig } from './HouseConfig';
import { CalendarForm } from './CalendarForm';

interface HouseInfoProps {
  rentingData: RentingData;
  houseList: { value: string[]; index: number }[] | undefined;
}

type RentContentType = '水費' | '網路' | '第四台' | '瓦斯' | '管理費';

const HouseInfo: React.FC<HouseInfoProps> = ({ rentingData, houseList }) => {
  const [showCalendarForm, setShowCalendarForm] = useState<boolean>(false);
  const [showStatusChange, setShowStatusChange] = useState<boolean>(false);
  const rentContent = rentingData.租金包含?.split(',');
  const rentContentList: Record<RentContentType, boolean> = {
    水費: rentContent?.includes('水費') || false,
    網路: rentContent?.includes('網路') || false,
    第四台: rentContent?.includes('第四台') || false,
    瓦斯: rentContent?.includes('瓦斯') || false,
    管理費: rentContent?.includes('管理費') || false,
  };

  const houseConfig = [
    { icon: BiSolidBed, text: rentingData.格局 },
    { icon: BsFillDoorOpenFill, text: `${rentingData.坪數}坪` },
    { icon: BsHouseFill, text: rentingData.建物型態 },
    { icon: BiSolidBuildingHouse, text: rentingData.現況 },
    { icon: LuDog, text: rentingData.寵物 },
    { icon: PiCookingPotBold, text: rentingData.開伙 },
    { icon: MdElectricBolt, text: rentingData.電費 },
  ];

  const handleReturn = () => {
    useRentingData.setState({ rentingData: null });
  };

  const closePopUp = () => {
    setShowCalendarForm(false);
    setShowStatusChange(false);
  };

  const formattedNumber: string = phoneNumberFormat(rentingData.電話 || '');
  const isInstagram = rentingData.Instagram?.includes('instagram');
  const isFaceBook = rentingData.Instagram?.includes('facebook');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="px-4">
      <div className="py-4 flex-1">
        {houseList && houseList.length > 0 && (
          <div className="w-fit border-b select-none hover:border-gray-700  border-white cursor-pointer" onClick={handleReturn}>
            <ReturnSVG />
            <span className="ml-1 sm:inline hidden">返回</span>
          </div>
        )}
        <div className={`my-4 pl-2 border-l-4 ${rentingData.上架網址 ? 'border-red-600' : 'border-gray-500'}`}>
          <div className="inline-block align-sub text-3xl">{rentingData.編號}</div>
          <span
            className={`py-1 px-2 ml-2 rounded-xl text-xs select-none ${rentingData.物件狀態 === '待出租' ? 'bg-green-400' : 'bg-red-500'} text-slate-100`}
            onClick={() => {
              setShowStatusChange(true);
            }}
          >
            {rentingData.物件狀態}
          </span>
          <span className=" align-sub sm:text-lg sm:ml-4 ml-1 text-base whitespace-nowrap">
            {rentingData.租金} <span className="text-sm">元/月</span>
          </span>
        </div>
        <div className="tracking-wider flex justify-between flex-col md:flex-row">
          <div>
            <div className="my-2">
              <BsPeopleFill className="inline-block" />
              <span className="ml-1 sm:mr-5 mr-2 align-middle">{rentingData.姓名} </span>
              <FaPhone className="inline-block" />
              <div className="inline-block ml-1 mr-5 align-middle">
                <a href={`tel:+886${formattedNumber.slice(1, 10)}`}>
                  {formattedNumber.slice(0, 4)}-{formattedNumber.slice(4, 7)}-{formattedNumber.slice(7)}
                </a>
              </div>
              <div className="my-1 text-xs text-gray-500">
                <a href={`https://www.google.com/maps/search/?api=1&query=${rentingData.地址}`} target="_blank">
                  {rentingData.地址}
                </a>
              </div>
            </div>
            <HouseConfig houseConfig={houseConfig} />
            <div className="flex mb-6 flex-wrap gap-y-3 whitespace-nowrap">
              {(Object.keys(rentContentList) as RentContentType[]).map((item) => (
                <div
                  key={item}
                  className={`rounded text-xs py-1 px-3 mr-2 ${rentContentList[item] ? 'bg-[#fff7e6] text-[#a16426]' : 'bg-gray-200 text-gray-400'}`}
                >
                  {item}
                </div>
              ))}
            </div>
            <div className="my-2">
              <div className="text-xs text-gray-500">
                備註：服務費：{rentingData.服務費}，樓層：{rentingData.樓層}
                ，業務編號：{rentingData.業務編號}
              </div>
            </div>
            {rentingData.屋主網址 && (
              <div className="mt-3 inline-block mr-3">
                <div className="px-3 py-2 bg-[#fff7e6] dark:bg-[#2f2613] text-xs text-[#a16426] dark:text-[#ffc58a] w-fit rounded select-none cursor-pointer hover:bg-[#f7c968]">
                  <a href={`${rentingData.屋主網址}`} target="_blank">
                    <span>查看屋主物件</span>
                    <OpenNewPageSVG />
                  </a>
                </div>
              </div>
            )}
            {rentingData.上架網址 && (
              <div className="mt-3 inline-block">
                <div className="px-3 py-2 bg-[#fff7e6] dark:bg-[#2f2613] text-xs text-[#a16426] dark:text-[#ffc58a] w-fit rounded select-none cursor-pointer hover:bg-[#f7c968]">
                  <a href={`${rentingData.上架網址}`} target="_blank">
                    <span>查看上架物件</span>
                    <OpenNewPageSVG />
                  </a>
                </div>
              </div>
            )}
            <div className="flex">
              {rentingData.Instagram && (
                <div className="mt-3 w-12 h-12 inline-block mr-3">
                  <div className="w-12 select-none cursor-pointer ">
                    <a href={rentingData.Instagram} target="_blank">
                      {isInstagram && <InstagramSVG />}
                      {isFaceBook && <FaceBookSVG />}
                    </a>
                  </div>
                </div>
              )}
              {rentingData.Threads && (
                <div className="mt-3 mr-3 w-12 h-12 flex justify-center items-center">
                  <div className="w-12 select-none cursor-pointer ">
                    <a href={rentingData.Threads} target="_blank">
                      <ThreadsSVG />
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>
          <CalendarForm rentingData={rentingData} showCalendarForm={showCalendarForm} />
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
        <div className="rounded border w-11/12 sm:w-full border-gray-800 dark:border-gray-200 p-3 break-words">{rentingData.對話要點}</div>
      </div>
      {(showCalendarForm || showStatusChange) && (
        <div
          className="w-full h-full fixed top-0 right-0 left-0 bottom-0 bg-black/40 dark:bg-gray-700/40 z-10 animate-[fade-in_0.15s_both] px-[auto] motion-reduce:transition-none motion-reduce:animate-none"
          onClick={closePopUp}
        ></div>
      )}
      {showStatusChange && <ChangeDataModal />}
    </div>
  );
};

export default HouseInfo;
