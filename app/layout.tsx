import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: 'P.M.I 总管理处 | PMI Head Office',
  description: 'P.M.I.总管理处下辖 8 家事业单位，在国内 14 个省市、泰国 4 个城市开设有生产基地，拥有员工近 7,500 人',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}

export { geistSans, geistMono };
