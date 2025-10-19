import { useRentingData } from '@/app/store/useRentingData';
import React, { useState } from 'react';
import Loader from './Loader';
import { RentingData } from '@/app/types/search';

interface ChangeDataModalProps {
  setShowStatusChange: React.Dispatch<React.SetStateAction<boolean>>;
}

export type ChangeType = 'uploadURL' | 'instagram' | 'threads';

const DataTypeMap = { uploadURL: '上架網址', instagram: 'Instagram', threads: 'Threads' };

const ChangeDataModal = ({ setShowStatusChange }: ChangeDataModalProps) => {
  const [isLoading, setIsLoading] = useState<Boolean>(false);
  const [showHintMessage, setShowHintMessage] = useState<Boolean>(false);
  const [hintMessage, setHintMessage] = useState<string>('');
  const rentingData = useRentingData((s) => s.rentingData);
  const [uploadURL, setUploadURL] = useState<string>(rentingData?.上架網址 || '');
  const [instagramURL, setInstagramURL] = useState<string>('');
  const [threadsURL, setThreadsURL] = useState<string>('');

  if (!rentingData) return null;

  const handleDataChange = (type: ChangeType, content: string) => {
    setIsLoading(true);
    setHintMessage('');
    setShowHintMessage(false);
    const reqBody = { index: rentingData?.欄位, type: type, changeContent: content };
    const changeStatus = async () => {
      try {
        const response = await fetch('/api/change', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify(reqBody),
        });
        const result = await response.json();
        if (response.status === 200) {
          const newRentingData = { ...rentingData, [DataTypeMap[type]]: result.changeContent } as RentingData;
          useRentingData.setState({ rentingData: newRentingData });
          setHintMessage('更新成功!');
        } else {
          throw new Error('failed');
        }
      } catch (error) {
        setHintMessage('更新失敗!');
      }
      setIsLoading(false);
      setShowHintMessage(true);
    };
    changeStatus();
  };
  return (
    <>
      <div
        className="w-full h-full fixed top-0 right-0 left-0 bottom-0 bg-black/40 dark:bg-gray-700/40 z-10 animate-[fade-in_0.15s_both] px-[auto] motion-reduce:transition-none motion-reduce:animate-none"
        data-twe-dropdown-backdrop-ref=""
        onClick={() => {
          setShowStatusChange(false);
          setHintMessage('');
          setShowHintMessage(false);
        }}
      ></div>
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 py-4 flex flex-col justify-center sm:w-[40%] w-[90%] h-fit bg-[#fff7E6] dark:bg-[#161616] z-10 rounded p-2 text-center text-sm">
        <div className="my-1 font-bold text-start pl-3">上架網址</div>
        <div className="w-full flex items-center justify-between gap-5 mt-3 mb-3 text-xs">
          <input
            className=" w-[56%] rounded ml-3 border border-gray-500 focus:outline-slate-500 px-2 py-1"
            value={uploadURL}
            onChange={(e) => {
              setUploadURL(e.target.value);
            }}
          ></input>
          <button
            className="rounded bg-red-500 px-2 py-1 mx-2 text-slate-200 hover:bg-red-700"
            onClick={() => {
              handleDataChange('uploadURL', uploadURL);
            }}
          >
            變更
          </button>
        </div>
        <hr className="mx-auto my-2 border-b border-gray-300 w-11/12"></hr>
        <div className="my-1 font-bold text-start pl-3">Instagram/Facebook</div>
        <div className="w-full flex items-center justify-between gap-5 mt-3 mb-3 text-xs">
          <input
            className=" w-[56%] rounded ml-3 border border-gray-500 focus:outline-slate-500 px-2 py-1"
            value={instagramURL}
            onChange={(e) => {
              setInstagramURL(e.target.value);
            }}
          ></input>
          <button
            className="rounded bg-red-500 px-2 py-1 mx-2 text-slate-200 hover:bg-red-700"
            onClick={() => {
              handleDataChange('instagram', instagramURL);
            }}
          >
            變更
          </button>
        </div>
        <hr className="mx-auto my-2 border-b border-gray-300 w-11/12"></hr>
        <div className="my-1 font-bold text-start pl-3">Threads</div>
        <div className="w-full flex items-center justify-between gap-5 mt-3 mb-3 text-xs">
          <input
            className=" w-[56%] rounded ml-3 border border-gray-500 focus:outline-slate-500 px-2 py-1"
            value={threadsURL}
            onChange={(e) => {
              setThreadsURL(e.target.value);
            }}
          ></input>
          <button
            className="rounded bg-red-500 px-2 py-1 mx-2 text-slate-200 hover:bg-red-700"
            onClick={() => {
              handleDataChange('threads', threadsURL);
            }}
          >
            變更
          </button>
        </div>
        {showHintMessage && (
          <div className={`text-xs ${hintMessage === '更新成功!' ? 'text-red-500' : 'text-gray-900'} my-2`}>{hintMessage}</div>
        )}
        {isLoading && <Loader></Loader>}
      </div>
    </>
  );
};

export default ChangeDataModal;
