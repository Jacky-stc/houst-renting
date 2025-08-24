export interface RentingData {
  物件狀態?: string | undefined;
  上架狀態?: string | undefined;
  業務編號?: string | undefined;
  編號?: string | undefined;
  開發日期?: string | undefined;
  區域?: string | undefined;
  地址?: string | undefined;
  建物型態?: string | undefined;
  現況?: string | undefined;
  格局?: string | undefined;
  租金?: string | undefined;
  坪數?: string | undefined;
  樓層?: string | undefined;
  姓名?: string | undefined;
  電話?: string | undefined;
  對話要點?: string | undefined;
  電費?: string | undefined;
  開伙?: string | undefined;
  寵物?: string | undefined;
  服務費?: string | undefined;
  屋主網址?: string | undefined;
  上架網址?: string | undefined;
  欄位?: string | undefined;
  Instagram?: string | undefined;
  Threads?: string | undefined;
}

export type SearchStatus =
  | "default"
  | "loading"
  | "result"
  | "no result"
  | "noPersonName";

export interface HouseListData {
  value: string[];
  index: number;
}
