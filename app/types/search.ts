export interface RentingData {
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

export interface SearchStatus {
    status:'default' | 'loading' | 'result' | 'no result'
}