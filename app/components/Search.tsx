'use client'
import React, { FC, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../lib/store'
import { changeSearchNumber } from '../../lib/features/search/searchSlice'

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
    const handleClick = ()=>{
        const regionCode = inputValue[0]
        const range = regionList[regionCode]
        const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${range}?key=${apiKey}`;
        console.log("clicked")
        console.log(inputValue)
        dispatch(changeSearchNumber(inputValue))
        async function getGoogleSheetData(){
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
  return (
    <div>
        <div>物件查詢系統</div>
        <input value={inputValue} onChange={e=> setInputValue(e.target.value)} className="border-2 rounded-sm px-2 py-1" placeholder="搜尋"></input><button onClick={handleClick}>搜尋</button>
        {rentingData &&
        <>
        <div className='py-4'>
        <div className='inline-block align-sub text-3xl'>{rentingData.編號}</div>
        <span className='py-1 px-2 tracking-wider ml-2 rounded-xl text-xs bg-red-500 text-slate-100'>{rentingData.物件狀態}</span>
        <div className=' text-lg align-text-top mr-2'></div>
        <div className=' text-lg align-text-top mr-2'>{rentingData.姓名} {rentingData.電話}</div>
        <div>{rentingData.格局} / {rentingData.坪數}坪 / {rentingData.型態}</div>
        <div className='text-red-600'><span className='text-2xl font-medium'>{rentingData.租金}</span> <span>元/月</span></div>
        </div>
        </>
        }
        {errorMessage && <div>{errorMessage}</div> }
    </div>
  )
}

export default Search
