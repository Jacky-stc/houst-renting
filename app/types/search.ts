export interface RentingData {
  物件狀態: string;
  上架狀態: string;
  業務編號: string;
  編號: string;
  開發日期: string;
  區域: string;
  地址: string;
  建物型態: string;
  現況: string;
  格局: string;
  租金: string;
  坪數: string;
  樓層: string;
  姓名: string;
  電話: string;
  對話要點: string;
  電費: string;
  開伙: string;
  寵物: string;
  服務費: string;
  屋主網址: string;
  上架網址: string;
  欄位: string;
  Instagram: string;
  Threads: string;
  租金包含: string;
}

export type SearchStatus = 'default' | 'loading' | 'result' | 'no result' | 'noPersonName';

export interface HouseListData {
  value: string[];
  index: number;
}
