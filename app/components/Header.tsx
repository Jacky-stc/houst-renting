import Image from "next/image";
import React from "react";
import company_logo from "../../public/image/house-renting-logo2.png";
import Hamburger from "./Hamburger";

const Header = () => {
  return (
    <header>
      <nav className="px-4 sm:px-12 py-6 flex items-center justify-between">
        <div>
          <img src="image/house-renting-logo.png" className="w-28 sm:w-44" />
        </div>
        <Hamburger></Hamburger>
      </nav>
    </header>
  );
};

export default Header;
