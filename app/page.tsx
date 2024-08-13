import Header from "./components/Header";
import Search from "./components/Search";

export default function Home() {
  const apiKey:string = process.env.APIKEY || ''
  const sheetId:string = process.env.SHEETID || ''
  return (
    <>
    <Header></Header>
    <main className="px-12 py-6">
      <Search apiKey = {apiKey} sheetId = {sheetId}></Search>
    </main>
    </>
  );
}
