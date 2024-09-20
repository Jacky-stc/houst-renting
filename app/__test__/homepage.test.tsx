import { test, describe, expect, vitest, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import Search from "../components/Search";
import * as redux from "react-redux";

vi.mock("react-redux", () => ({
  useDispatch: vi.fn(),
  useSelector: vi.fn(),
}));
vi.spyOn(redux, "useDispatch");
vi.spyOn(redux, "useSelector");

describe("homepage render", () => {
  test("should render instruction of the search page", () => {
    render(
      <Search
        apiKey={process.env.APIKEY || ""}
        sheetId={process.env.SHEETID || ""}
      />,
    );
    expect(screen.getByText("物件查詢")).toBeDefined();
  });
});
