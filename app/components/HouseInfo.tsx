import React from 'react'
import { RentingData } from '../types/search'
import { FaLocationDot, FaPhone, FaRegCalendar } from 'react-icons/fa6'
import { MdElectricBolt, MdOutlineBed, MdOutlineMeetingRoom } from 'react-icons/md'
import { BsFillDoorOpenFill, BsHouseFill, BsHouses, BsPeopleFill } from 'react-icons/bs'
import { LuDog } from 'react-icons/lu'
import { PiCookingPotBold } from 'react-icons/pi'
import { TbManFilled } from 'react-icons/tb'
import { FaRegCalendarAlt } from 'react-icons/fa'
import { GiElectric } from 'react-icons/gi'
import { Calendar } from './calendar'
import { BiSolidBed, BiSolidBuildingHouse } from 'react-icons/bi'

interface HouseInfoProps {
    rentingData: RentingData
}

const handleCalendar = ()=>{
    const event = {
        DTSTART: '20240817T120000Z', // 開始時間 (格式：YYYYMMDDTHHMMSSZ)
        DTEND: '20240817T130000Z',   // 結束時間 (格式：YYYYMMDDTHHMMSSZ)
        SUMMARY: '會議',             // 標題
        DESCRIPTION: '團隊會議',     // 描述
        TZID: 'Asia/Taipei'          // 時區
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
    const googleLinkContainer = document.createElement('a')
    googleLinkContainer.href = googleCalendarLink
    googleLinkContainer.click()
    // console.log('Google Calendar 連結:', googleCalendarLink);
    // const googleLink = document.querySelector("#googleLink") as HTMLAnchorElement
    // if(googleLink){
    //     googleLink.textContent = googleCalendarLink
    //     googleLink.href = googleCalendarLink
    // }

    // 生成 Yahoo Calendar 連結
    // const yahooCalendarLink = calendar.generateYahooCalendarURL();
    // console.log('Yahoo Calendar 連結:', yahooCalendarLink);
}

const HouseInfo: React.FC<HouseInfoProps> = ({rentingData}) => {
    let includeTitle = ''
    if(rentingData.含){
        includeTitle = '含'
    }else{
        includeTitle = ''
    }
  return (
    <>
            <div className='py-4 flex-1 '>
                <div className='my-4'>
                    <div className='inline-block align-sub text-3xl'>{rentingData.編號}</div>
                    <span className='py-1 px-2 ml-2 rounded-xl text-xs bg-red-500 text-slate-100'>{rentingData.物件狀態}</span>
                    <span className=' align-sub text-lg ml-4'>{rentingData.租金} <span className='text-sm'>元/月</span></span>
                    <div className='inline-block align-sub ml-4 cursor-pointer' onClick={handleCalendar}>
                    <FaRegCalendarAlt className='inline-block align-text-top'></FaRegCalendarAlt>
                    </div>
                </div>
                <div className='tracking-wider flex justify-between '>
                    <div>
                        <div className='my-2'>
                            <BsPeopleFill className='inline-block'></BsPeopleFill><span className='ml-1 mr-5 align-middle'>{rentingData.姓名} </span>
                            <FaPhone className='inline-block'></FaPhone>
                            <div className='inline-block ml-1 mr-5 align-middle'>{rentingData.電話}</div>
                            <div className='my-1 text-xs text-gray-500'>{rentingData.地址}</div>
                        </div>
                        <div className='mt-6 mb-1'>
                            <BiSolidBed className='inline-block' color='green'></BiSolidBed><span className='ml-1 mr-5 align-middle'>{rentingData.格局}</span>
                            <BsFillDoorOpenFill className='inline-block' color='green'></BsFillDoorOpenFill><span className='ml-1 mr-5 align-middle'>{rentingData.坪數}坪</span>
                            <BsHouseFill className='inline-block' color='green'></BsHouseFill><span className='ml-1 mr-5 align-middle'>{rentingData.型態}</span>
                            <BiSolidBuildingHouse className='inline-block' color='green'></BiSolidBuildingHouse><span className='ml-1 mr-5 align-middle'>{rentingData.現況}</span>
                        </div>
                        <div className='mb-6'>
                            <LuDog className='inline-block' color='#df8a02'></LuDog><span className='ml-1 mr-5 align-middle'>{rentingData.寵物}</span>
                            <PiCookingPotBold className='inline-block' color='#df8a02'></PiCookingPotBold><span className='ml-1 mr-5 align-middle'>{rentingData.開伙}</span>
                            <MdElectricBolt className='inline-block' color='#df8a02'></MdElectricBolt><span className='ml-1 mr-5 align-middle'>{rentingData.電}</span>
                        </div>
                        <div className='my-2'>
                            <div className='text-xs text-gray-500'>備註：服務費{rentingData.服務費}，{includeTitle}{rentingData.含}</div>
                        </div>
                    </div>
                    <div className='border rounded border-sky-500 p-3'>
                        <input type='date'/>
                        <div className="relative">
    </div>
                        <div>姓名</div>
                        <div>其他事項</div>
                    </div>
                </div>
                <div>
                    <h2 className='mt-8 mb-2 text-lg font-bold'>對話要點</h2>
                    <div className='rounded border w-full border-gray-800 p-3'>{rentingData.對話要點}</div>
                </div>
            </div>
            </>
  )
}

export default HouseInfo
