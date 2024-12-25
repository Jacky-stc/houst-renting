import React from "react";
import Hamburger from "./Hamburger";

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
        <Hamburger apiKey={apiKey} sheetId={sheetId}></Hamburger>
      </nav>
    </header>
  );
};

export default Header;
