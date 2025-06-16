import { useRentingData } from "../store/useRentingData";
import { HouseListData } from "../types/search";
import { regionList, rentingDataFormat } from "./utils";

const regionArray = Object.values(regionList);

export const getGoogleSheetData = async () => {
  const response = await fetch("/api/data");
  const result = await response.json();
  const data: string[][] = result.data;
  data.shift();
  const houseListData = data.map((element: string[], index) => ({
    value: element,
    index: index,
  }));
  houseListData.sort((a, b) => a.value[4].localeCompare(b.value[4]));
  return houseListData.reverse();
};

const getFilterData = (inputValue: string, HouseListData: HouseListData[]) => {
  // 搜尋區域名
  if (
    regionArray.includes(inputValue) ||
    regionArray.includes(inputValue + "區")
  ) {
    const data = HouseListData.filter(
      (data) =>
        data.value[5] === inputValue || data.value[5] === inputValue + "區",
    );
    return data;
  }
  // 搜尋地址
  const data = HouseListData.filter((item) =>
    item.value[6].includes(inputValue),
  );
  return data;
};

export const handleSearch = async (inputValue: string) => {
  if (inputValue === "") return;

  useRentingData.setState({
    searchStatus: "loading",
    pageNow: "Home",
    rentingList: [],
    rentingData: null,
  });
  const HouseListData = await getGoogleSheetData();
  if (Object.keys(regionList).includes(inputValue.slice(0, 1))) {
    const formatedData = HouseListData.map((item) =>
      rentingDataFormat(item.value, item.index.toString()),
    );
    const targetObject = formatedData.find((item) => item.編號 === inputValue);
    if (targetObject) {
      useRentingData.setState({
        rentingData: targetObject,
        searchStatus: "result",
      });
      return;
    } else {
      useRentingData.setState({
        searchStatus: "no result",
      });
      return;
    }
  }
  if (/^\d+$/.test(inputValue)) {
    const targetObject = HouseListData.filter(
      (item) =>
        typeof item.value[21] === "string" &&
        item.value[21].includes(inputValue),
    );
    if (targetObject.length > 1) {
      useRentingData.setState({
        rentingList: targetObject,
        searchStatus: "result",
      });
      return;
    } else if (targetObject.length === 1) {
      useRentingData.setState({
        rentingData: rentingDataFormat(
          targetObject[0].value,
          targetObject[0].index.toString(),
        ),
        searchStatus: "result",
      });
      return;
    } else {
      useRentingData.setState({
        searchStatus: "no result",
      });
      return;
    }
  }
  const filterData = getFilterData(inputValue, HouseListData);
  if (filterData.length === 0) {
    useRentingData.setState({ searchStatus: "no result" });
    return;
  }
  useRentingData.setState({
    rentingList: filterData,
    searchStatus: "result",
  });
  return;
};
