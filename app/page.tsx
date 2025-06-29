import Header from "./components/Header";
import Navbar from "./components/nav/Navbar";
import Search from "./components/search/Search";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/authOptions";
import Login from "./components/Login";

export default async function Home() {
  const session = await getServerSession(authOptions);

  return (
    <div className="h-screen flex flex-col font-inter">
      <Header session={session}></Header>
      {session?.user ? (
        <main className=" justify-center sm:justify-normal my-4 flex flex-grow">
          <Navbar></Navbar>
          <Search></Search>
        </main>
      ) : (
        <Login />
      )}
    </div>
  );
}
