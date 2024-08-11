'use client'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../lib/store'
import { changeSearchNumber } from '../../lib/features/search/searchSlice'

const Search = () => {
    const [sheetData, setSheetData] = useState([])
    const [inputValue, setInputValue] = useState<string>('')
    const [text,setText] = useState<string>('')
    const searchNumber = useSelector((state: RootState)=> state.search.searchNumber)
    const dispatch = useDispatch()
    
    const apiKey = "AIzaSyCuKxIujf0gFpdsKtcHZ8unFFwvFGO_8Mo";
    const sheetId = "1rQXKcxnCbR2MWho2N-DHW3zr7_C1G643Rxr3rtKeNSY";
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
                    setText(displayText)
                }else{
                    setText("no item")
                }
            }
        }
        getGoogleSheetData()
    }
  return (
    <div>
        <input value={inputValue} onChange={e=> setInputValue(e.target.value)} className="border-2 rounded-sm px-2 py-1" placeholder="搜尋"></input><button onClick={handleClick}>搜尋</button>
        <div>{text}</div>
    </div>
  )
}

export default Search
