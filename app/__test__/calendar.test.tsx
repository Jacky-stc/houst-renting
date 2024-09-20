import { fireEvent, render, screen } from "@testing-library/react";
import { expect, test } from "vitest";
import HouseInfo from "../components/HouseInfo";

test("click should show calendar form", () => {
  const mockRentingData = {
    物件狀態: "出租",
    編號: "N816B",
    開發日期: "20240830",
    服務費: "1/2",
    對話要點: "test",
    姓名: "test",
    電話: "0912345678",
    區域: "test",
    地址: "test",
    租金: "12800",
    含: "test",
    格局: "test",
    坪數: "test",
    型態: "test",
    現況: "test",
    電: "5",
    開伙: "test",
    寵物: "test",
  };
  render(<HouseInfo rentingData={mockRentingData} />);
  expect(screen.getByTestId("generate-calendar")).toBeDefined();
  const button = screen.getByTestId("generate-calendar");
  fireEvent.click(button);
  expect(screen.getByTestId("calendar-form")).toBeDefined();
});
