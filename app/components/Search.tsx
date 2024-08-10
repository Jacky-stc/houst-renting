'use client'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../lib/store'
import { changeSearchNumber } from '../../lib/features/search/searchSlice'

const Search = () => {
    const [sheetData, setSheetData] = useState([])
    const [inputValue, setInputValue] = useState<string>('')
    const searchNumber = useSelector((state: RootState)=> state.search.searchNumber)
    const dispatch = useDispatch()
    
    const apiKey = "AIzaSyCuKxIujf0gFpdsKtcHZ8unFFwvFGO_8Mo";
    const sheetId = "1rQXKcxnCbR2MWho2N-DHW3zr7_C1G643Rxr3rtKeNSY";
    // Sheets 中要取得的資料範圍，格式如下
    const range = "sheet1!A1:C3";
    // Sheets API 的 URL
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${range}?key=${apiKey}`;
    useEffect(()=>{
        // 使用 fetch 打 API
        fetch(url)
        .then((response) => response.json())
        .then((data) => {
            console.log(data.values);
            setSheetData(data.values)
        })
        .catch((error) => console.error("Error:", error));
    },[url])
    const handleClick = ()=>{
        console.log("clicked")
        console.log(inputValue)
        dispatch(changeSearchNumber(inputValue))
        console.log(searchNumber)
    }
  return (
    <div>
        <input value={inputValue} onChange={e=> setInputValue(e.target.value)} className="border-2 rounded-sm px-2 py-1" placeholder="搜尋"></input><button onClick={handleClick}>搜尋</button>
        <div>{searchNumber}</div>
    </div>
  )
}

export default Search
