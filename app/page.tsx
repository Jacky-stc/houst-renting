import Header from "./components/Header";
import Navbar from "./components/Navbar";
import Search from "./components/Search";
import Snow from "./components/Snow";

export default function Home() {
  const apiKey: string = process.env.APIKEY || "";
  const sheetId: string = process.env.SHEETID || "";
  return (
    <div className="h-screen flex flex-col font-inter">
      {/* <Snow></Snow> */}
      <Header></Header>
      <main className="px-2 justify-center sm:justify-normal py-6 flex flex-grow">
        <Navbar apiKey={apiKey} sheetId={sheetId}></Navbar>
        <Search apiKey={apiKey} sheetId={sheetId}></Search>
      </main>
    </div>
  );
}
