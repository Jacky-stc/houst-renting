import React from 'react'
import { RentingData } from '../types/search'

interface HouseListProps {
  houseObject: string[],
  setRentingData:React.Dispatch<React.SetStateAction<RentingData | undefined>>,
  setHouseList: React.Dispatch<React.SetStateAction<string[][] | undefined>>,
}

const HouseList: React.FC<HouseListProps> = ({houseObject, setRentingData, setHouseList}) => {
  const houseInfo = {
    物件狀態:houseObject[0],
    編號:houseObject[1],
    開發日期:houseObject[2],
    服務費:houseObject[3],
    對話要點:houseObject[4],
    姓名:houseObject[5],
    電話:houseObject[6],
    區域:houseObject[7],
    地址:houseObject[8],
    租金:houseObject[9],
    含:houseObject[10],
    格局:houseObject[11],
    坪數:houseObject[12],
    型態:houseObject[13],
    現況:houseObject[14],
    電:houseObject[15],
    開伙:houseObject[16],
    寵物:houseObject[17],
}
  const handleClick = ()=>{
    setRentingData(houseInfo)
    setHouseList(undefined)
  }
  return (
    <div className='flex flex-col my-2 pt-4 pb-2 px-4 rounded shadow-md hover:bg-slate-300 cursor-pointer' onClick={handleClick}>
      <div className='flex flex-row'>
        <div className='inline-block align-sub text-xl'>{houseInfo.編號}</div>
        <span className='py-1 px-2 ml-2 rounded-xl text-xs bg-red-500 text-slate-100'>{houseInfo.物件狀態}</span>
        <span className=' align-sub text-lg ml-4'>{houseInfo.租金} <span className='text-sm'>元/月</span></span>
      </div>
      <div className='mt-2 text-xs text-gray-500'>{houseInfo.地址}</div>
    </div>
  )
}

export default HouseList
