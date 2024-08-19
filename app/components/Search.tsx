'use client'
import React, { FC, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../lib/store'
import { changeSearchNumber } from '../../lib/features/search/searchSlice'
import { IoSearchOutline } from 'react-icons/io5'
import { FaLocationDot, FaPhone } from 'react-icons/fa6'
import { MdOutlineBed, MdOutlineMeetingRoom } from 'react-icons/md'
import { BsHouses } from 'react-icons/bs'
import { LuDog } from 'react-icons/lu'
import { PiCookingPotBold } from 'react-icons/pi'
import { TbManFilled } from 'react-icons/tb'

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

const Search:FC<Props> = ({apiKey, sheetId}) => {
    const [inputValue, setInputValue] = useState<string>('')
    const [inputFocus, setInputFocus] = useState<Boolean>(false)
    const [rentingData, setRentingData] = useState<rentingDataType>()
    const [errorMessage, setErrorMessage] = useState<string>('')
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
            const response = await fetch(url)
            const data = await response.json()
            console.log(data)
            if(data.values){
                console.log("yes")
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
        const event = `BEGIN:VCALENDAR
            VERSION:2.0
            BEGIN:VEVENT
            DTSTART:20240819T170000Z
            DTEND:20240819T180000Z
            SUMMARY:Sample Event
            DESCRIPTION:This is a sample event description.
            END:VEVENT
            END:VCALENDAR`;
        const blob = new Blob([event], {type: 'text/calendar'})
        const url = URL.createObjectURL(blob)
        console.log(url)
        const link = document.createElement('a')
        link.href = url
        link.textContent = 'link'
        link.download = 'event.ics'
        document.querySelector("#cLink")?.appendChild(link)
        // const OAuth2Client = new 
        // async function getCalendar(){
        //     const response = await fetch(`https://www.googleapis.com/calendar/v3/users/me/calendarList?key=${apiKey}`)
        //     const result = await response.json()
        //     console.log(result)
        // }
        // getCalendar()
    }
  return (
    <div className='mx-6 font-inter tracking-wide'>
        <div className={`flex items-center px-2 py-1 w-full sm:w-72 rounded ${inputFocus?' border border-sky-400':'border'}`}>
            <IoSearchOutline></IoSearchOutline>
            <input value={inputValue} onFocus={()=>{setInputFocus(true)}} onBlur={()=>{setInputFocus(false)}} onChange={e=> setInputValue(e.target.value)} onKeyDown={(e)=>{handleEnter(e)}} className="rounded-sm px-2 py-1 mx-1 focus:outline-0" placeholder="輸入物件編號或區域"></input>
            <button onClick={handleSearch}>搜尋</button>
        </div>
        {rentingData &&
        <>
        <div className='py-4'>
        <div className='my-4'>
            <div className='inline-block align-sub text-3xl'>{rentingData.編號}</div>
            <span className='py-1 px-2 tracking-wider ml-2 rounded-xl text-xs bg-red-500 text-slate-100'>{rentingData.物件狀態}</span>
            <span className=' align-sub text-lg ml-4'>{rentingData.租金} <span className='text-sm'>元/月</span></span>
            <button id='cLink' type='button' className='align-sub ml-4 underline' onClick={handleCalendar}>test</button>
        </div>
        <div className='my-1'>
            <FaLocationDot className='inline-block'></FaLocationDot>
            <span className='mx-2'>{rentingData.地址}</span>
        </div>
        <div className='my-1'>
            <TbManFilled className='inline-block'></TbManFilled><span className='mx-2'>{rentingData.姓名} </span>
            <FaPhone className='inline-block'></FaPhone>
            <div className='inline-block mx-2 align-text-top mr-2'>{rentingData.電話}</div>
        </div>
        <div className='my-1'>
            <MdOutlineBed className='inline-block' color='green'></MdOutlineBed><span className='ml-1.5 mr-6 align-middle'>{rentingData.格局}</span>
            <MdOutlineMeetingRoom className='inline-block' color='green'></MdOutlineMeetingRoom><span className='ml-1.5 mr-6 align-middle'>{rentingData.坪數}坪</span>
            <BsHouses className='inline-block' color='green'></BsHouses><span className='ml-1.5 mr-6 align-middle'>{rentingData.型態}</span>
            <BsHouses className='inline-block' color='green'></BsHouses><span className='ml-1.5 mr-6 align-middle'>{rentingData.現況}</span>
        </div>
        <div className='my-1'>
            <LuDog className='inline-block' color='#df8a02'></LuDog><span className='mx-2'>{rentingData.寵物}</span>
            <PiCookingPotBold className='inline-block'></PiCookingPotBold><span className='mx-2'>{rentingData.開伙}</span>
        </div>
        <div className='text-red-600'><span className='text-xl font-medium'>{rentingData.租金}</span> <span>元/月</span></div>
        </div>
        </>
        }
        {errorMessage && <div>{errorMessage}</div> }
    </div>
  )
}

export default Search
