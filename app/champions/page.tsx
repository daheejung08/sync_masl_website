'use client';

import { useState } from 'react';

export default function ChampionsPage() {
  const sportsTabs = ["남자축구", "여자축구", "남자농구", "여자배구"];
  const [activeTab, setActiveTab] = useState("남자축구");
  const [selectedWinner, setSelectedWinner] = useState<any>(null);

  const hallOfFame = [
    {
      sport: "남자축구",
      emoji: "⚽",
      history: [
        { season: "26 Spring", winner: "옥지의 축구교실", class: "24학번 중심", photo: "" },
        { season: "25 Fall", winner: "FC 빵빵", class: "23학번 중심", photo: "https://via.placeholder.com/600x400?text=CHAMPION+MOMENT" },
      ]
    },
    {
      sport: "여자축구",
      emoji: "⚽",
      history: [{ season: "25 Fall", winner: "슈팅스타", class: "연합팀", photo: "" }]
    },
    // ... 나머지 데이터
  ];

  const filteredData = hallOfFame.filter(item => item.sport === activeTab);

  return (
    <div className="min-h-screen bg-white pb-20 pt-32 px-6 font-sans text-black relative">
      
      {/* 1. 타이틀 섹션 */}
      <div className="max-w-3xl mx-auto mb-16">
        <h1 className="text-6xl font-black italic tracking-tighter mb-4 text-black">CHAMPIONS</h1>
        <div className="h-2 w-20 bg-blue-600 mb-6"></div>
        <p className="text-gray-400 font-bold text-xs uppercase tracking-[0.5em]">Official Winners Archive</p>
      </div>

      {/* 2. 종목 탭 */}
      <div className="max-w-3xl mx-auto mb-16 border-b border-gray-100 flex gap-1 overflow-x-auto no-scrollbar py-2">
        {sportsTabs.map((tab) => (
          <button 
            key={tab} 
            onClick={() => setActiveTab(tab)} 
            className={`px-6 py-4 font-black text-sm whitespace-nowrap transition-all relative ${activeTab === tab ? 'text-blue-600' : 'text-gray-400 hover:text-black'}`}
          >
            {tab}
            {activeTab === tab && <div className="absolute bottom-0 left-0 w-full h-1 bg-blue-600 rounded-full"></div>}
          </button>
        ))}
      </div>

      {/* 3. 우승팀 리스트 */}
      <div className="max-w-3xl mx-auto space-y-4">
        {filteredData.map((item) => (
          <div key={item.sport} className="grid gap-3">
            {item.history.map((record, idx) => (
              <div 
                key={idx} 
                onClick={() => setSelectedWinner(record)} // 클릭 시 페이지만 내에서 상태 변경
                className="group flex items-center justify-between p-8 bg-gray-50 rounded-[2.5rem] cursor-pointer hover:bg-black hover:text-white transition-all duration-300 shadow-sm border border-transparent hover:border-blue-600"
              >
                <div>
                  <p className="text-[0.6rem] font-black text-blue-600 group-hover:text-blue-400 mb-1 uppercase tracking-widest">{record.season}</p>
                  <h3 className="text-2xl font-black tracking-tight italic group-hover:scale-105 origin-left transition-transform duration-300">{record.winner}</h3>
                </div>
                <div className="text-right flex items-center gap-4">
                  <span className="text-[0.6rem] font-bold text-gray-300 group-hover:text-gray-700 uppercase tracking-widest border border-gray-200 group-hover:border-gray-800 px-3 py-1 rounded-full">{record.class}</span>
                  <span className="text-2xl">🏆</span>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* ⭐ 4. 우승 사진 팝업 (작고 세련된 모달) */}
      {selectedWinner && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[1000] flex items-center justify-center p-6 animate-in fade-in duration-200"
          onClick={() => setSelectedWinner(null)} // 바탕 클릭 시 닫기 (이동 없음)
        >
          <div 
            className="bg-white rounded-[3rem] p-6 max-w-sm w-full shadow-2xl animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()} // 사진창 안을 눌렀을 땐 안 닫히게
          >
            <div className="text-center mb-6">
              <p className="text-blue-600 font-black text-[0.6rem] uppercase tracking-widest mb-1">Winner of {selectedWinner.season}</p>
              <h2 className="text-3xl font-black italic tracking-tighter text-black uppercase leading-tight">{selectedWinner.winner}</h2>
            </div>
            
            <div className="relative aspect-square w-full rounded-[2rem] overflow-hidden bg-gray-100 border border-gray-100 shadow-inner">
              {selectedWinner.photo ? (
                <img src={selectedWinner.photo} className="w-full h-full object-cover" alt="Champion" />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center text-gray-200">
                  <span className="text-5xl mb-2">📸</span>
                  <p className="text-[0.6rem] font-black uppercase">Image Pending</p>
                </div>
              )}
            </div>

            <button 
              onClick={() => setSelectedWinner(null)}
              className="mt-6 w-full py-4 bg-gray-50 hover:bg-black hover:text-white text-gray-400 font-black text-[0.7rem] rounded-2xl transition-all uppercase tracking-widest"
            >
              Close Archive
            </button>
          </div>
        </div>
      )}

      {/* 하단 문구 */}
      <div className="mt-40 text-center opacity-10 font-black text-6xl italic tracking-tighter select-none text-gray-900 leading-none">
        MASL <span className="text-blue-600">&</span> SYNC
      </div>
    </div>
  );
}