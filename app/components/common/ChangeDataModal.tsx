import { useRentingData } from '@/app/store/useRentingData';
import React, { useState } from 'react';
import Loader from './Loader';
import { RentingData } from '@/app/types/search';

export type ChangeType = 'uploadURL' | 'instagram' | 'threads';

const DataTypeMap = { uploadURL: '上架網址', instagram: 'Instagram', threads: 'Threads' };

interface DataFieldConfig {
  type: ChangeType;
  label: string;
  value: string;
  onChange: (_value: string) => void;
}

interface DataFieldInputProps {
  config: DataFieldConfig;
  onSubmit: (_type: ChangeType, _content: string) => void;
}

const DataFields: { type: ChangeType; label: string }[] = [
  { type: 'uploadURL', label: '上架網址' },
  { type: 'instagram', label: 'Instagram/Facebook' },
  { type: 'threads', label: 'Threads' },
];

const DataFieldInput = ({ config, onSubmit }: DataFieldInputProps) => (
  <>
    <div className="my-1 font-bold text-start pl-3">{config.label}</div>
    <div className="w-full flex items-center justify-between gap-5 mt-3 mb-3 text-xs">
      <input
        className="w-[56%] rounded ml-3 border border-gray-500 focus:outline-slate-500 px-2 py-1"
        value={config.value}
        onChange={(e) => config.onChange(e.target.value)}
      />
      <button
        className="rounded bg-red-500 px-2 py-1 mx-2 text-slate-200 hover:bg-red-700"
        onClick={() => onSubmit(config.type, config.value)}
      >
        變更
      </button>
    </div>
    <hr className="mx-auto my-2 border-b border-gray-300 w-11/12" />
  </>
);

const ChangeDataModal = () => {
  const [isLoading, setIsLoading] = useState<Boolean>(false);
  const [showHintMessage, setShowHintMessage] = useState<Boolean>(false);
  const [hintMessage, setHintMessage] = useState<string>('');
  const rentingData = useRentingData((s) => s.rentingData);
  const [fieldValues, setFieldValues] = useState({
    uploadURL: rentingData?.上架網址 || '',
    instagram: '',
    threads: '',
  });

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
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 py-4 flex flex-col justify-center sm:w-[40%] w-[90%] h-fit bg-[#fff7E6] dark:bg-[#161616] z-10 rounded p-2 text-center text-sm">
        {DataFields.map((field) => (
          <DataFieldInput
            key={field.type}
            config={{
              type: field.type,
              label: field.label,
              value: fieldValues[field.type],
              onChange: (value) => setFieldValues({ ...fieldValues, [field.type]: value }),
            }}
            onSubmit={handleDataChange}
          />
        ))}
        {showHintMessage && (
          <div className={`text-xs ${hintMessage === '更新成功!' ? 'text-red-500' : 'text-gray-900'} my-2`}>{hintMessage}</div>
        )}
        {isLoading && <Loader></Loader>}
      </div>
    </>
  );
};

export default ChangeDataModal;
