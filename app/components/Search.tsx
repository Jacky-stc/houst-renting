'use client'
import React, { FC, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../lib/store'
import { changeSearchNumber } from '../../lib/features/search/searchSlice'
import { IoSearchOutline } from 'react-icons/io5'
import { FaLocationDot, FaPhone, FaRegCalendar } from 'react-icons/fa6'
import { MdOutlineBed, MdOutlineMeetingRoom } from 'react-icons/md'
import { BsHouses } from 'react-icons/bs'
import { LuDog } from 'react-icons/lu'
import { PiCookingPotBold } from 'react-icons/pi'
import { TbManFilled } from 'react-icons/tb'
import { Calendar } from './calendar'
import Loader from './Loader'
import { FcCalendar } from 'react-icons/fc'
import { FaRegCalendarAlt } from 'react-icons/fa'

interface Props {
    apiKey: string,
    sheetId: string,
}

interface rentingDataType  {
    物件狀態:string
    編號:string
    開發日期:string
    服務費:string
    對話要點:string
    姓名:string
    電話:string
    區域:string
    地址:string
    租金:string
    含:string,
    格局:string,
    坪數:string,
    型態:string,
    現況:string,
    電:string,
    開伙:string,
    寵物:string,
}

const event = {
    DTSTART: '20240817T120000Z', // 開始時間 (格式：YYYYMMDDTHHMMSSZ)
    DTEND: '20240817T130000Z',   // 結束時間 (格式：YYYYMMDDTHHMMSSZ)
    SUMMARY: '會議',             // 標題
    DESCRIPTION: '團隊會議',     // 描述
    TZID: 'Asia/Taipei'          // 時區
  };

const Search:FC<Props> = ({apiKey, sheetId}) => {
    const [inputValue, setInputValue] = useState<string>('')
    const [inputFocus, setInputFocus] = useState<Boolean>(false)
    const [rentingData, setRentingData] = useState<rentingDataType>()
    const [errorMessage, setErrorMessage] = useState<string>('')
    const [loading, setLoading] = useState<Boolean>(false)
    const searchNumber = useSelector((state: RootState)=> state.search.searchNumber)
    const dispatch = useDispatch()
    
    // const apiKey = "AIzaSyCuKxIujf0gFpdsKtcHZ8unFFwvFGO_8Mo";
    // const sheetId = "1rQXKcxnCbR2MWho2N-DHW3zr7_C1G643Rxr3rtKeNSY";
    const regionList:{ [key: string]: string} = {
        'N':'文山區',
        'A':'大安區',
    }
    // Sheets 中要取得的資料範圍，格式如下
    // Sheets API 的 URL
    const handleSearch = ()=>{
        const regionCode = inputValue[0]
        const range = regionList[regionCode]
        const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${range}?key=${apiKey}`;
        dispatch(changeSearchNumber(inputValue))
        async function getGoogleSheetData(){
            console.log(apiKey)
            console.log(url)
            setLoading(true)
            const response = await fetch(url)
            const data = await response.json()
            console.log(data)
            if(data.values){
                const displayText = data.values.filter((item: Array<string>)=> item[1] === inputValue)
                console.log(displayText)
                if(displayText.length > 0){
                    console.log(displayText[0])
                    console.log(displayText[0][0])
                    const rentingResource = {
                        物件狀態:displayText[0][0],
                        編號:displayText[0][1],
                        開發日期:displayText[0][2],
                        服務費:displayText[0][3],
                        對話要點:displayText[0][4],
                        姓名:displayText[0][5],
                        電話:displayText[0][6],
                        區域:displayText[0][7],
                        地址:displayText[0][8],
                        租金:displayText[0][9],
                        含:displayText[0][10],
                        格局:displayText[0][11],
                        坪數:displayText[0][12],
                        型態:displayText[0][13],
                        現況:displayText[0][14],
                        電:displayText[0][15],
                        開伙:displayText[0][16],
                        寵物:displayText[0][17],
                    }
                    console.log(rentingResource)
                    setRentingData(rentingResource)
                    setErrorMessage("")
                    setLoading(false)
                    console.log(rentingData)
                }else{
                    setErrorMessage("no item")
                }
            }
        }
        getGoogleSheetData()
    }
    const handleEnter = (e: React.KeyboardEvent<HTMLInputElement>)=>{
        if(e.code === 'Enter'){
            handleSearch()
        }
    }
    const handleCalendar = ()=>{
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
  return (
    <div className='mx-6 font-inter tracking-wide'>
        <div className={`flex items-center px-2 py-1 w-full sm:w-72 rounded ${inputFocus?' border border-sky-400':'border'}`}>
            <IoSearchOutline></IoSearchOutline>
            <input style={{WebkitTapHighlightColor: 'transparent'}} type='search' value={inputValue} onFocus={()=>{setInputFocus(true)}} onBlur={()=>{setInputFocus(false)}} onChange={e=> setInputValue(e.target.value)} onKeyDown={(e)=>{handleEnter(e)}} className="rounded-sm px-2 py-1 mx-1 focus:outline-0" placeholder="輸入物件編號或區域"></input>
            <button onClick={handleSearch}>搜尋</button>
        </div>
        {loading? <Loader></Loader>:rentingData &&
            <>
            <div className='py-4'>
                <div className='my-4'>
                    <div className='inline-block align-sub text-3xl'>{rentingData.編號}</div>
                    <span className='py-1 px-2 ml-2 rounded-xl text-xs bg-red-500 text-slate-100'>{rentingData.物件狀態}</span>
                    <span className=' align-sub text-lg ml-4'>{rentingData.租金} <span className='text-sm'>元/月</span></span>
                    <div className='inline-block align-sub ml-4 cursor-pointer' onClick={handleCalendar}>
                    <FaRegCalendarAlt className='inline-block align-text-top'></FaRegCalendarAlt>
                    </div>
                </div>
                <div className='tracking-wider'>
                    <div className='my-2'>
                        <FaLocationDot className='inline-block'></FaLocationDot>
                        <span className='mx-2'>{rentingData.地址}</span>
                    </div>
                    <div className='my-2'>
                        <MdOutlineBed className='inline-block' color='green'></MdOutlineBed><span className='ml-1.5 mr-5 align-middle'>{rentingData.格局}</span>
                        <MdOutlineMeetingRoom className='inline-block' color='green'></MdOutlineMeetingRoom><span className='ml-1.5 mr-5 align-middle'>{rentingData.坪數}坪</span>
                        <BsHouses className='inline-block' color='green'></BsHouses><span className='ml-1.5 mr-5 align-middle'>{rentingData.型態}</span>
                        <BsHouses className='inline-block' color='green'></BsHouses><span className='ml-1.5 mr-5 align-middle'>{rentingData.現況}</span>
                    </div>
                    <div className='my-2'>
                        <LuDog className='inline-block' color='#df8a02'></LuDog><span className='ml-1.5 mr-5 align-middle'>{rentingData.寵物}</span>
                        <PiCookingPotBold className='inline-block'></PiCookingPotBold><span className='ml-1.5 mr-5 align-middle'>{rentingData.開伙}</span>
                    </div>
                    <div className='my-2'>
                        <TbManFilled className='inline-block'></TbManFilled><span className='ml-1.5 mr-5 align-middle'>{rentingData.姓名} </span>
                        <FaPhone className='inline-block'></FaPhone>
                        <div className='inline-block ml-1.5 mr-5 align-middle'>{rentingData.電話}</div>
                    </div>
                </div>
                <div>
                    <h2 className='mt-8 mb-2 text-lg font-bold'>對話要點</h2>
                    <div>{rentingData.對話要點}</div>
                </div>
            </div>
            </>
            }    
        {errorMessage && <div>{errorMessage}</div> }
    </div>
  )
}

export default Search
