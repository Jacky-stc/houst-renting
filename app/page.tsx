import Header from "./components/Header";
import Search from "./components/Search";

export default function Home() {
  return (
    <>
    <Header></Header>
    <main className="p-12">
      <Search></Search>
    </main>
    </>
  );
}
