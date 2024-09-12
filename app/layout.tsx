import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "./reactDatePicker.css";
import { Providers } from "@/lib/provider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import ReactQueryProvider from "@/lib/reactQueryProvider";

const queryClient = new QueryClient();

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "柏瑞房地產物件查詢系統",
  description: "用於查詢與柏瑞房地產合作之房屋物件資料",
  generator: "Next.js",
  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ReactQueryProvider>
          <Providers>{children}</Providers>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
