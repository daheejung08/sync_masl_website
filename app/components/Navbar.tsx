'use client';

import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md border-b border-gray-100 z-[100] px-6 py-4 flex justify-between items-center shadow-sm text-black font-sans">
      {/* 좌측 로고 */}
      <Link href="/" className="text-2xl font-black text-blue-600 tracking-tighter hover:opacity-80 transition-opacity">
        MASL / GVR
      </Link>

      {/* 우측 메뉴 세트 */}
      <div className="flex gap-8 font-bold text-gray-600 text-sm items-center">
        
        {/* MASL 메뉴 */}
        <div className="group relative py-1 cursor-pointer hover:text-blue-600 transition-colors">
          <span>MASL</span>
          {/* 하단 팝업과의 연결 다리 (Invisible Bridge) */}
          <div className="absolute top-full left-0 w-full h-4 bg-transparent"></div>
          
          <div className="absolute hidden group-hover:block bg-white border border-gray-100 shadow-2xl rounded-2xl p-2 w-48 mt-4 -left-12 animate-in fade-in slide-in-from-top-1">
            <p className="p-3 text-[0.6rem] font-black text-gray-300 px-4 uppercase tracking-[0.2em]">Active Season</p>
            <Link href="/masl/26s" className="block p-4 bg-blue-50 text-blue-600 rounded-xl font-black transition-all hover:bg-blue-100">
              26 Spring
            </Link>
          </div>
        </div>

        {/* GVR 메뉴 */}
        <div className="group relative py-1 cursor-pointer hover:text-blue-600 transition-colors">
          <span>GVR</span>
          {/* 하단 팝업과의 연결 다리 (Invisible Bridge) */}
          <div className="absolute top-full left-0 w-full h-4 bg-transparent"></div>
          
          <div className="absolute hidden group-hover:block bg-white border border-gray-100 shadow-2xl rounded-2xl p-2 w-48 mt-4 -left-12 animate-in fade-in slide-in-from-top-1">
            <Link href="/gvr/rate" className="block p-3 hover:bg-blue-50 hover:text-blue-600 rounded-xl transition-colors font-black">
              Rate (평가하기)
            </Link>
            <Link href="/gvr/view" className="block p-3 hover:bg-blue-50 hover:text-blue-600 rounded-xl transition-colors font-black">
              View (결과조회)
            </Link>
          </div>
        </div>

        <Link href="/champions" className="hover:text-blue-600 transition-colors">Champions</Link>
        <button className="opacity-20 cursor-not-allowed">Predictions</button>
      </div>
    </nav>
  );
}