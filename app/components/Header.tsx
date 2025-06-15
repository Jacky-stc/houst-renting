"use client";
import React from "react";
import Hamburger from "./nav/Hamburger";
import ToggleButton from "./ToggleButton";
import { toPageHome } from "../lib/navigation";

const Header = () => {
  return (
    <header>
      <nav className="px-4 sm:px-12 py-6 flex items-center justify-between">
        <div>
          <img
            alt="company logo"
            src="image/house-renting.png"
            className="w-28 sm:w-44 cursor-pointer"
            onClick={toPageHome}
          />
        </div>
        <div className="flex gap-8">
          <ToggleButton></ToggleButton>
          <Hamburger></Hamburger>
        </div>
      </nav>
    </header>
  );
};

export default Header;
