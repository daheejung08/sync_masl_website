import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar"; // 1. 여기서 한 번만 불러오기!

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MASL / GVR 스포츠 커뮤니티",
  description: "스포츠 매치 정보 및 유저 평점 시스템",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ko"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-gray-50 text-black">
        {/* 2. 상단 바 배치 */}
        <Navbar />

        {/* 상단 바 높이만큼 여백 주며 본문 표시 */}
        <main className="flex-grow pt-20">
          {children}
        </main>

        <footer className="py-6 text-center text-gray-400 text-sm border-t border-gray-100 bg-white">
          © 2026 MASL / GVR. All rights reserved.
        </footer>
      </body>
    </html>
  );
}