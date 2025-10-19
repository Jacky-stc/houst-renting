import { PersonName } from '../store/usePersonStore';

export const rentingDataFormat = (data: string[], index: string) => {
  const rentingObject = {
    物件狀態: data[0],
    上架狀態: data[1],
    業務編號: data[2],
    編號: data[3],
    開發日期: data[4],
    區域: data[5],
    地址: data[6],
    建物型態: data[7],
    現況: data[8],
    格局: data[9],
    租金: data[10],
    坪數: data[11],
    樓層: data[12],
    姓名: data[13],
    電話: data[14],
    對話要點: data[15],
    電費: data[16],
    開伙: data[17],
    寵物: data[18],
    服務費: data[19],
    屋主網址: data[20],
    上架網址: data[21],
    租金包含: data[22],
    Instagram: data[23],
    Threads: data[24],
    欄位: index,
  };
  return rentingObject;
};

export const isMobile = {
  Android: function () {
    return navigator.userAgent.match(/Android/i);
  },
  BlackBerry: function () {
    return navigator.userAgent.match(/BlackBerry/i);
  },
  iOS: function () {
    return navigator.userAgent.match(/iPhone|iPad|iPod/i);
  },
  Opera: function () {
    return navigator.userAgent.match(/Opera Mini/i);
  },
  Windows: function () {
    return navigator.userAgent.match(/IEMobile/i) || navigator.userAgent.match(/WPDesktop/i);
  },
  any: function () {
    return isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows();
  },
};

export const phoneNumberFormat = (phone: string) => {
  let formattedNumber = phone;
  if (phone.includes('-')) {
    formattedNumber = phone.replaceAll('-', '');
  }
  return formattedNumber;
};

export const regionList: { [key: string]: string } = {
  B: '北投區',
  X: '士林區',
  N: '內湖區',
  Z: '中山區',
  T: '大同區',
  S: '松山區',
  W: '萬華區',
  J: '中正區',
  A: '大安區',
  Y: '信義區',
  G: '南港區',
  E: '文山區',
  U: '三重區',
  O: '蘆洲區',
  D: '新莊區',
  C: '板橋區',
  H: '中和區',
  R: '永和區',
  I: '土城區',
  K: '新店區',
  Q: '汐止區',
  L: '樹林區',
};

export const personList: { name: PersonName; BGColor: string }[] = [
  {
    name: '承恩',
    BGColor: 'linear-gradient(90deg, rgb(69 130 167) 0%, rgb(87 93 159) 50%, rgb(56 56 168) 100%)',
  },
  { name: '黑', BGColor: 'linear-gradient(to right, #485563, #29323c)' },
  {
    name: 'K',
    BGColor: 'linear-gradient(90deg, rgb(175 19 19) 0%, rgb(186 47 47) 50%, rgb(255 113 47) 100%)',
  },
  {
    name: '查',
    BGColor: 'linear-gradient(90deg, rgb(101 69 34) 0%, rgb(168 141 106) 50%, rgb(171 156 149) 100%)',
  },
  { name: '阿聖', BGColor: 'linear-gradient(to right, #780206, #061161)' },
  {
    name: '至倫',
    BGColor: 'linear-gradient(to right, #aa4b6b, #6b6b83, #3b8d99)',
  },
  { name: '小豪', BGColor: 'linear-gradient(to right, #1a2980, #26d0ce)' },
  { name: '岳', BGColor: 'linear-gradient(to right, #134e5e, #71b280)' },
  { name: '威翔', BGColor: 'linear-gradient(to right, #5c258d, #4389a2)' },
];
