import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "./reactDatePicker.css";
import "./bookmark.css";
// #070910

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
      <body className={inter.className}>{children}</body>
    </html>
  );
}
