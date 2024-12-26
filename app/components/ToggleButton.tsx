"use client";
import React, { useState } from "react";
import { useToggleTheme } from "../store";

const ToggleButton = () => {
  const theme = useToggleTheme((state) => state.theme);
  const setTheme = useToggleTheme((state) => state.setTheme);
  function changeTheme() {
    console.log("theme");
    setTheme(theme === "light" ? "dark" : "light");
    document.documentElement.classList.toggle("dark");
  }
  return (
    <button
      title="Toggle Theme"
      onClick={changeTheme}
      className="
        w-12 
        h-6 
        rounded-full 
        p-1 
        bg-black
        dark:bg-[#d6d6d6]
        relative 
        transition-colors 
        duration-500 
        ease-in
        focus:outline-none 
      focus:border-transparent
      "
    >
      <div
        id="toggle"
        className="flex justify-center items-center rounded-full w-4 h-4 bg-white dark:bg-black  relative ml-0 dark:ml-6 pointer-events-none transition-all duration-300 ease-out
        "
      >
        {theme === "light" ? (
          <svg
            fill="#000"
            id="Capa_1"
            width="12px"
            height="12px"
            viewBox="0 0 292.548 292.548"
          >
            <g>
              <path d="M221.253,146.83c0,39.842-32.396,72.231-72.223,72.231c-39.839,0-72.238-32.401-72.238-72.231   c0-39.833,32.405-72.231,72.238-72.231C188.851,74.598,221.253,107.002,221.253,146.83z M149.03,47.105   c3.984,0,7.221-3.239,7.221-7.224V9.776c0-3.996-3.23-7.224-7.221-7.224c-3.996,0-7.23,3.233-7.23,7.224v30.105   C141.8,43.866,145.028,47.105,149.03,47.105z M220.917,83.821c1.849,0,3.698-0.703,5.104-2.114l25.881-25.875   c2.822-2.832,2.822-7.41,0-10.226c-2.822-2.811-7.386-2.811-10.208,0l-25.881,25.887c-2.822,2.828-2.822,7.397,0,10.214   C217.224,83.119,219.067,83.821,220.917,83.821z M60.504,81.708c1.414,1.405,3.267,2.114,5.104,2.114   c1.853,0,3.702-0.703,5.116-2.114c2.822-2.822,2.822-7.386,0-10.214L44.832,45.607c-2.822-2.811-7.386-2.811-10.208,0   c-2.822,2.822-2.822,7.395,0,10.226L60.504,81.708z M143.263,245.447c-3.99,0-7.218,3.242-7.218,7.224v30.102   c0,3.987,3.233,7.224,7.218,7.224s7.232-3.23,7.232-7.224V252.67C150.495,248.689,147.253,245.447,143.263,245.447z M66.26,210.847   l-25.88,25.88c-2.822,2.822-2.822,7.398,0,10.208c1.414,1.412,3.267,2.12,5.116,2.12c1.852,0,3.69-0.702,5.104-2.12l25.881-25.88   c2.822-2.822,2.822-7.398,0-10.208C73.658,208.031,69.082,208.031,66.26,210.847z M231.785,210.847   c-2.822-2.816-7.392-2.816-10.214,0c-2.822,2.822-2.822,7.386,0,10.208l25.881,25.88c1.41,1.412,3.26,2.12,5.115,2.12   c1.85,0,3.688-0.702,5.099-2.12c2.822-2.822,2.822-7.386,0-10.208L231.785,210.847z M46.96,146.83c0-3.996-3.249-7.224-7.233-7.224   H7.218c-3.99,0-7.218,3.228-7.218,7.224c0,3.993,3.233,7.224,7.218,7.224h32.51C43.718,154.053,46.96,150.823,46.96,146.83z    M285.324,139.606h-38.527c-3.987,0-7.218,3.228-7.218,7.224c0,3.993,3.23,7.224,7.218,7.224h38.527   c3.987,0,7.224-3.23,7.224-7.224C292.548,142.833,289.312,139.606,285.324,139.606z" />
            </g>
          </svg>
        ) : (
          <svg
            fill="#fff"
            id="Capa_1"
            width="12px"
            height="12px"
            viewBox="0 0 30.457 30.457"
          >
            <g>
              <path d="M29.693,14.49c-0.469-0.174-1-0.035-1.32,0.353c-1.795,2.189-4.443,3.446-7.27,3.446c-5.183,0-9.396-4.216-9.396-9.397   c0-2.608,1.051-5.036,2.963-6.835c0.366-0.347,0.471-0.885,0.264-1.343c-0.207-0.456-0.682-0.736-1.184-0.684   C5.91,0.791,0,7.311,0,15.194c0,8.402,6.836,15.238,15.238,15.238c8.303,0,14.989-6.506,15.219-14.812   C30.471,15.118,30.164,14.664,29.693,14.49z" />
            </g>
          </svg>
        )}
      </div>
    </button>
  );
};

export default ToggleButton;
