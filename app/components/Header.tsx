import React from "react";
import Hamburger from "./Hamburger";

const Header = () => {
  return (
    <header>
      <nav className="px-4 sm:px-12 py-6 flex items-center justify-between">
        <div>
          <img src="image/house-renting.png" className="w-28 sm:w-44" />
        </div>
        <Hamburger></Hamburger>
      </nav>
    </header>
  );
};

export default Header;
