import usePersonStore from "../store/usePersonStore";
import { useRentingData } from "../store/useRentingData";
import { getGoogleSheetData } from "./search";

export const toPageHome = () => {
  const pageNow = useRentingData.getState().pageNow;
  if (pageNow === "Home") {
    return;
  }
  useRentingData.setState({
    pageNow: "Home",
    searchStatus: "default",
    rentingData: null,
    rentingList: [],
  });
};

export const toPageMyHouseList = async () => {
  useRentingData.setState({
    searchStatus: "loading",
    rentingData: null,
    rentingList: [],
  });
  const data = await getGoogleSheetData();
  const personName = usePersonStore.getState().person;
  const houseListData = data.filter((data) => {
    return data.value[2] === personName;
  });
  if (houseListData.length === 0) {
    useRentingData.setState({ searchStatus: "no result" });
  } else {
    useRentingData.setState({
      rentingList: houseListData,
      searchStatus: "result",
    });
  }
};
