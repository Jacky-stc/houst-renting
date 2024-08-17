import Header from "./components/Header";
import Navbar from "./components/Navbar";
import Search from "./components/Search";

export default function Home() {
  const apiKey:string = process.env.APIKEY || ''
  const sheetId:string = process.env.SHEETID || ''
  return (
    <div className="h-screen flex flex-col font-inter">
    <Header></Header>
    <main className="px-2 py-6 flex flex-grow">
      <Navbar></Navbar>
      <Search apiKey = {apiKey} sheetId = {sheetId}></Search>
    </main>
    </div>
  );
}
