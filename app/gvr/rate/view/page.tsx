'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

export default function GvrViewPage() {
  const [loading, setLoading] = useState(true);
  const [playerRatings, setPlayerRatings] = useState<any[]>([]);

  const fetchRatings = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('ratings')
      .select('score');

    if (error) {
      console.error("데이터 로드 실패:", error);
    } else if (data) {
      // DB 전체 평균값 계산
      const avg = data.length > 0 
        ? data.reduce((acc, curr) => acc + curr.score, 0) / data.length 
        : 8.5; // 데이터 없을 때 기본값
      
      const mockResult = [
        {
          pos: "FW",
          myPlayer: { name: "옥지", score: avg, team: "A Team" },
          opPlayer: { name: "빵빵이", score: 7.9, team: "B Team" }
        },
        {
          pos: "MF",
          myPlayer: { name: "철수", score: 7.4, team: "A Team" },
          opPlayer: { name: "영희", score: 9.1, team: "B Team" }
        }
      ];
      setPlayerRatings(mockResult);
    }
    setLoading(false);
  };

  useEffect(() => { fetchRatings(); }, []);

  if (loading) return <div className="min-h-screen flex items-center justify-center font-black text-gray-300 tracking-tighter">LOADING STATS...</div>;

  return (
    <div className="min-h-screen bg-white p-6 flex flex-col items-center text-black font-sans">
      <div className="w-full max-w-2xl mt-10 mb-16 text-center">
        <h1 className="text-4xl font-black tracking-tighter mb-2">GVR PERFORMANCE</h1>
        <p className="text-gray-400 text-xs font-bold uppercase tracking-[0.3em]">Player Rating Statistics</p>
      </div>

      <div className="w-full max-w-2xl space-y-4">
        {playerRatings.map((match, index) => (
          <div key={index} className="relative bg-gray-50 rounded-3xl p-8 border border-gray-100 flex items-center justify-between group hover:bg-black hover:text-white transition-all duration-300">
            
            {/* 좌측: 우리 팀 */}
            <div className="flex-1">
              <p className="text-[0.6rem] font-black text-gray-400 group-hover:text-gray-500 mb-1 uppercase tracking-widest">{match.myPlayer.team}</p>
              <h3 className="text-xl font-black mb-4">{match.myPlayer.name}</h3>
              <div className="text-4xl font-black italic">
                {match.myPlayer.score.toFixed(1)}
              </div>
            </div>

            {/* 중앙: 포지션 뱃지 */}
            <div className="px-6 flex flex-col items-center gap-2">
              <div className="w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center text-[0.7rem] font-black group-hover:border-gray-700">
                {match.pos}
              </div>
              <div className="h-12 w-[1px] bg-gray-200 group-hover:bg-gray-800"></div>
            </div>

            {/* 우측: 상대 팀 (텍스트 오른쪽 정렬) */}
            <div className="flex-1 text-right">
              <p className="text-[0.6rem] font-black text-gray-400 group-hover:text-gray-500 mb-1 uppercase tracking-widest">{match.opPlayer.team}</p>
              <h3 className="text-xl font-black mb-4">{match.opPlayer.name}</h3>
              <div className="text-4xl font-black italic">
                {match.opPlayer.score.toFixed(1)}
              </div>
            </div>
          </div>
        ))}
      </div>

      <button 
        onClick={fetchRatings}
        className="mt-20 text-[0.6rem] font-black text-gray-300 border-b border-gray-200 pb-1 hover:text-black hover:border-black transition-all"
      >
        TAP TO REFRESH DATA
      </button>
    </div>
  );
}