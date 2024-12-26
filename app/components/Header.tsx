import React from "react";
import Hamburger from "./Hamburger";
import ToggleButton from "./ToggleButton";

const Header = () => {
  const apiKey: string = process.env.APIKEY || "";
  const sheetId: string = process.env.SHEETID || "";
  return (
    <header>
      <nav className="px-4 sm:px-12 py-6 flex items-center justify-between">
        <div>
          <img
            alt="company logo"
            src="image/house-renting.png"
            className="w-28 sm:w-44"
          />
        </div>
        <div className="flex gap-8">
          <ToggleButton></ToggleButton>
          <Hamburger apiKey={apiKey} sheetId={sheetId}></Hamburger>
        </div>
      </nav>
    </header>
  );
};

export default Header;
