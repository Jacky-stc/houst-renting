"use client";
import Header from "./components/Header";
import Navbar from "./components/nav/Navbar";
import Search from "./components/search/Search";

export default function Home() {
  return (
    <div className="h-screen flex flex-col font-inter">
      <Header></Header>
      <main className=" justify-center sm:justify-normal my-4 flex flex-grow">
        <Navbar></Navbar>
        <Search></Search>
      </main>
    </div>
  );
}
