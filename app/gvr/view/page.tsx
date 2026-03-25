'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

export default function GvrViewPage() {
  const seasons = ["26 Spring", "25 Fall"]; // 시즌 추가 가능
  const sports = ["남자축구", "여자축구", "남자농구", "여자배구"];

  const [selectedSeason, setSelectedSeason] = useState("26 Spring");
  const [selectedSport, setSelectedSport] = useState("남자축구");
  const [matches, setMatches] = useState<any[]>([]);
  const [selectedMatch, setSelectedMatch] = useState<any>(null);
  
  const [playerRatings, setPlayerRatings] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  // 1. 선택된 시즌과 종목에 해당하는 경기 목록 가져오기
  useEffect(() => {
    const fetchMatches = async () => {
      setLoading(true);
      const { data } = await supabase
        .from('matches')
        .select('*')
        .eq('sport_type', selectedSport)
        // .eq('season_id', selectedSeason) // 테이블에 season_id 컬럼 추가 시 활성화
        .order('match_date', { ascending: false });
      
      if (data) {
        setMatches(data);
        setSelectedMatch(data.length > 0 ? data[0] : null);
      }
      setLoading(false);
    };
    fetchMatches();
  }, [selectedSeason, selectedSport]);

  // 2. 선택된 경기의 실시간 평점 리포트 계산
  useEffect(() => {
    if (!selectedMatch) {
      setPlayerRatings([]);
      return;
    }

    const fetchReport = async () => {
      const { data: ratingData } = await supabase
        .from('ratings')
        .select('player_id, score')
        .eq('match_id', selectedMatch.id);

      const { data: playerData } = await supabase
        .from('players')
        .select('*')
        .or(`team_name.eq.${selectedMatch.team_a},team_name.eq.${selectedMatch.team_b}`);

      if (playerData) {
        const results = playerData.map(p => {
          const pRatings = ratingData?.filter(r => r.player_id === p.id) || [];
          const avg = pRatings.length > 0 
            ? pRatings.reduce((acc, curr) => acc + curr.score, 0) / pRatings.length 
            : 0;
          return { ...p, avgScore: avg.toFixed(1), voteCount: pRatings.length };
        });
        // 점수 높은 순으로 정렬
        setPlayerRatings(results.sort((a, b) => Number(b.avgScore) - Number(a.avgScore)));
      }
    };
    fetchReport();
  }, [selectedMatch]);

  return (
    <div className="min-h-screen bg-white pb-20 pt-32 px-6 text-black font-sans">
      
      {/* --- 필터 섹션 --- */}
      <div className="max-w-5xl mx-auto mb-16 space-y-8">
        <h1 className="text-6xl font-black italic tracking-tighter uppercase leading-none">
          GVR <span className="text-blue-600">Report</span>
        </h1>

        <div className="grid md:grid-cols-3 gap-4">
          {/* 시즌 선택 */}
          <div className="space-y-2">
            <p className="text-[0.6rem] font-black text-gray-400 uppercase tracking-widest ml-1">Select Season</p>
            <select 
              value={selectedSeason} 
              onChange={(e) => setSelectedSeason(e.target.value)}
              className="w-full p-4 bg-gray-50 rounded-2xl font-black border-none focus:ring-2 focus:ring-blue-600 outline-none"
            >
              {seasons.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>

          {/* 종목 선택 */}
          <div className="space-y-2">
            <p className="text-[0.6rem] font-black text-gray-400 uppercase tracking-widest ml-1">Select Sport</p>
            <select 
              value={selectedSport} 
              onChange={(e) => setSelectedSport(e.target.value)}
              className="w-full p-4 bg-gray-50 rounded-2xl font-black border-none focus:ring-2 focus:ring-blue-600 outline-none"
            >
              {sports.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>

          {/* 경기 선택 */}
          <div className="space-y-2">
            <p className="text-[0.6rem] font-black text-gray-400 uppercase tracking-widest ml-1">Select Match</p>
            <select 
              value={selectedMatch?.id || ""} 
              onChange={(e) => setSelectedMatch(matches.find(m => m.id === e.target.value))}
              className="w-full p-4 bg-black text-white rounded-2xl font-black border-none focus:ring-2 focus:ring-blue-600 outline-none"
            >
              {matches.length > 0 ? (
                matches.map(m => <option key={m.id} value={m.id}>{m.team_a} VS {m.team_b}</option>)
              ) : (
                <option value="">경기 데이터 없음</option>
              )}
            </select>
          </div>
        </div>
      </div>

      {/* --- 리포트 결과 섹션 --- */}
      <div className="max-w-5xl mx-auto">
        {loading ? (
          <div className="py-20 text-center font-black text-gray-200 animate-pulse uppercase tracking-widest">Calculating Stats...</div>
        ) : selectedMatch ? (
          <div className="grid gap-4">
            <h3 className="text-xl font-black mb-4 italic uppercase tracking-widest border-b-4 border-black inline-block pb-1">Match Rating Leaderboard</h3>
            {playerRatings.map((p, idx) => (
              <div key={p.id} className="flex items-center justify-between p-6 bg-gray-50 rounded-[2.5rem] hover:bg-black hover:text-white transition-all group border border-transparent hover:border-blue-600">
                <div className="flex items-center gap-6">
                  <span className="font-black italic text-gray-300 group-hover:text-blue-600 text-xl w-6">
                    {idx + 1}
                  </span>
                  <div className="w-14 h-14 bg-white rounded-full overflow-hidden border border-gray-100 flex items-center justify-center text-xl font-black italic text-gray-100">
                    {p.photo_url ? <img src={p.photo_url} className="w-full h-full object-cover" /> : p.player_number}
                  </div>
                  <div>
                    <p className="text-[0.6rem] font-black text-blue-600 mb-1 uppercase tracking-widest">{p.team_name}</p>
                    <h4 className="text-xl font-black tracking-tight">{p.name}</h4>
                  </div>
                </div>
                <div className="flex items-center gap-12">
                   <div className="hidden md:block text-right">
                    <p className="text-[0.5rem] font-black text-gray-300 group-hover:text-gray-600 uppercase tracking-widest">Votes</p>
                    <p className="font-black italic">{p.voteCount}명</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[0.5rem] font-black text-gray-300 group-hover:text-gray-600 uppercase tracking-widest leading-none">Rating</p>
                    <p className="text-4xl font-black italic text-blue-600 leading-tight">{p.avgScore}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-32 text-center bg-gray-50 rounded-[3rem] border border-dashed border-gray-200">
            <p className="text-gray-300 font-black italic">해당 조건에 맞는 경기 데이터가 없습니다.</p>
          </div>
        )}
      </div>

      {/* 하단 문구 */}
      <div className="mt-40 text-center opacity-10 font-black text-6xl italic tracking-tighter select-none text-gray-900 leading-none">
        MASL <span className="text-blue-600">&</span> SYNC
      </div>
    </div>
  );
}