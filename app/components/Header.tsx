"use client";
import React from "react";
import Hamburger from "./nav/Hamburger";
import ToggleButton from "./common/ToggleButton";
import { toPageHome } from "../lib/navigation";
import { Session } from "next-auth";

const Header = ({ session }: { session: Session | null }) => {
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
          {session?.user && <Hamburger></Hamburger>}
        </div>
      </nav>
    </header>
  );
};

export default Header;
