import Header from "./components/Header";
import Search from "./components/Search";

export default function Home() {
  return (
    <>
    <Header></Header>
    <main className="px-12 py-6">
      <Search></Search>
    </main>
    </>
  );
}
