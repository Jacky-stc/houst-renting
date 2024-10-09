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
    return (
      navigator.userAgent.match(/IEMobile/i) ||
      navigator.userAgent.match(/WPDesktop/i)
    );
  },
  any: function () {
    return (
      isMobile.Android() ||
      isMobile.BlackBerry() ||
      isMobile.iOS() ||
      isMobile.Opera() ||
      isMobile.Windows()
    );
  },
};

export const regionList: { [key: string]: string } = {
  B: "北投區",
  X: "士林區",
  N: "內湖區",
  Z: "中山區",
  T: "大同區",
  S: "松山區",
  W: "萬華區",
  J: "中正區",
  A: "大安區",
  Y: "信義區",
  G: "南港區",
  E: "文山區",
  U: "三重區",
  O: "蘆洲區",
  D: "新莊區",
  C: "板橋區",
  H: "中和區",
  R: "永和區",
  I: "土城區",
  K: "新店區",
  Q: "汐止區",
};
