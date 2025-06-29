"use client";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Loader from "./common/Loader";

export default function Login() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);
    const res = await signIn("credentials", {
      username,
      password,
      redirect: false,
    });
    if (res?.error) {
      setError("帳號或密碼輸入錯誤");
    } else {
      router.replace("/");
    }
    setIsLoading(false);
  };

  return (
    <div className="flex items-center justify-center py-8 px-2">
      <form
        onSubmit={handleSubmit}
        autoComplete="off"
        className="bg-white p-8 rounded w-80 flex flex-col gap-4"
      >
        <h2 className="text-xl font-bold mb-4 text-center">登入</h2>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="border p-2 rounded"
          required
          autoComplete="off"
        />
        <input
          //   type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border p-2 rounded"
          required
          autoComplete="new-password"
        />
        {error && (
          <div className="text-red-500 text-sm text-center">{error}</div>
        )}
        <button
          type="submit"
          className="bg-[#1b1d20] text-white py-2 rounded hover:bg-[#3a3a3a]"
        >
          {isLoading ? <Loader /> : "Login"}
        </button>
      </form>
    </div>
  );
}
