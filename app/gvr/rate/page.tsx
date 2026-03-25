'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

export default function GvrRatePage() {
  const [matches, setMatches] = useState<any[]>([]);
  const [selectedMatch, setSelectedMatch] = useState<any>(null);
  const [players, setPlayers] = useState<any[]>([]);
  const [selectedPlayer, setSelectedPlayer] = useState<any>(null);
  const [score, setScore] = useState(8.0);
  const [studentId, setStudentId] = useState('');
  const [loading, setLoading] = useState(true);

  // 1. 현재 평가 가능한 경기 목록 가져오기
  useEffect(() => {
    const fetchMatches = async () => {
      const { data } = await supabase
        .from('matches')
        .select('*')
        .eq('is_active', true)
        .order('match_date', { ascending: true });
      if (data) {
        setMatches(data);
        if (data.length > 0) setSelectedMatch(data[0]);
      }
      setLoading(false);
    };
    fetchMatches();
  }, []);

  // 2. 선택된 경기의 선수 라인업 및 평균 평점 가져오기
  useEffect(() => {
    if (!selectedMatch) return;

    const fetchLineup = async () => {
      // 해당 경기에 참여하는 팀들의 선수들 가져오기
      const { data: playerData } = await supabase
        .from('players')
        .select('*')
        .or(`team_name.eq.${selectedMatch.team_a},team_name.eq.${selectedMatch.team_b}`);

      // 각 선수별 평균 평점 계산 (ratings 테이블 조인 대신 간단히 구현)
      const { data: ratingData } = await supabase
        .from('ratings')
        .select('player_id, score')
        .eq('match_id', selectedMatch.id);

      if (playerData) {
        const playersWithAvg = playerData.map(p => {
          const pRatings = ratingData?.filter(r => r.player_id === p.id) || [];
          const avg = pRatings.length > 0 
            ? pRatings.reduce((acc, curr) => acc + curr.score, 0) / pRatings.length 
            : 0;
          return { ...p, avgScore: avg.toFixed(1) };
        });
        setPlayers(playersWithAvg);
      }
    };
    fetchLineup();
  }, [selectedMatch]);

  // 3. 평점 제출 로직
  const submitRating = async () => {
    if (!studentId) return alert('학번을 입력해주세요.');
    
    const { error } = await supabase.from('ratings').insert([{
      match_id: selectedMatch.id,
      player_id: selectedPlayer.id,
      student_id: studentId,
      score: score
    }]);

    if (error) {
      if (error.code === '23505') alert('이미 이 선수에게 투표하셨습니다!');
      else alert('오류가 발생했습니다.');
    } else {
      alert(`${selectedPlayer.name} 선수에게 ${score}점을 주었습니다!`);
      setSelectedPlayer(null); // 팝업 닫기
    }
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center font-black text-gray-200">LOADING GVR...</div>;

  return (
    <div className="min-h-screen bg-white pb-20 pt-32 px-6 text-black font-sans">
      
      {/* --- 상단: 경기 선택 섹션 --- */}
      <div className="max-w-5xl mx-auto mb-16">
        <h1 className="text-5xl font-black italic tracking-tighter mb-8 uppercase">Live <span className="text-blue-600">Rating</span></h1>
        <div className="flex gap-4 overflow-x-auto no-scrollbar pb-4">
          {matches.map(m => (
            <button 
              key={m.id}
              onClick={() => setSelectedMatch(m)}
              className={`px-8 py-6 rounded-[2rem] border-2 transition-all whitespace-nowrap ${
                selectedMatch?.id === m.id ? 'border-black bg-black text-white' : 'border-gray-100 bg-gray-50 text-gray-400'
              }`}
            >
              <p className="text-[0.6rem] font-black uppercase opacity-60 mb-1">{m.sport_type}</p>
              <p className="font-black text-lg">{m.team_a} VS {m.team_b}</p>
            </button>
          ))}
        </div>
      </div>

      {/* --- 중앙: 선수 라인업 그리드 --- */}
      <div className="max-w-5xl mx-auto">
        <h2 className="text-xl font-black mb-8 italic uppercase tracking-widest border-b-4 border-black inline-block pb-1">Lineup & Real-time Stats</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {players.map(p => (
            <div key={p.id} className="text-center group">
              {/* 선수 사진 클릭 시 평점 팝업 오픈 */}
              <div 
                onClick={() => setSelectedPlayer(p)}
                className="relative aspect-[3/4] bg-gray-100 rounded-[2.5rem] overflow-hidden mb-4 cursor-pointer border-4 border-transparent hover:border-blue-600 transition-all shadow-sm group-hover:shadow-xl"
              >
                {p.photo_url ? (
                  <img src={p.photo_url} className="w-full h-full object-cover" alt={p.name} />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-4xl opacity-10 font-black italic">{p.player_number}</div>
                )}
                {/* 오버레이 효과 */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="text-white font-black text-sm uppercase tracking-widest">Rate Now</span>
                </div>
              </div>
              
              <h3 className="font-black text-lg">{p.name}</h3>
              <div className="inline-block mt-2 px-4 py-1 bg-blue-50 rounded-full">
                <p className="text-[0.7rem] font-black text-blue-600 italic">★ {p.avgScore === "0.0" ? "평가 전" : p.avgScore}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* --- ⭐ 평점 입력 팝업 (모달) --- */}
      {selectedPlayer && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-[2000] flex items-center justify-center p-6 animate-in fade-in duration-200" onClick={() => setSelectedPlayer(null)}>
          <div className="bg-white rounded-[4rem] p-10 max-w-sm w-full shadow-2xl animate-in zoom-in-95 duration-200" onClick={e => e.stopPropagation()}>
            <div className="text-center mb-8">
              <p className="text-blue-600 font-black text-[0.6rem] uppercase tracking-widest mb-1">Rate for {selectedPlayer.team_name}</p>
              <h2 className="text-4xl font-black italic text-black uppercase">{selectedPlayer.name}</h2>
            </div>

            <div className="space-y-8">
              {/* 학번 입력 */}
              <div>
                <p className="text-[0.6rem] font-black text-gray-400 uppercase mb-3 ml-2">Student ID</p>
                <input 
                  type="text" 
                  placeholder="학번 8자리 입력" 
                  value={studentId}
                  onChange={e => setStudentId(e.target.value)}
                  className="w-full p-5 bg-gray-50 rounded-2xl border-none font-black text-center focus:ring-2 focus:ring-blue-600"
                />
              </div>

              {/* 평점 슬라이더 */}
              <div>
                <div className="flex justify-between items-end mb-4 px-2">
                  <p className="text-[0.6rem] font-black text-gray-400 uppercase">Score</p>
                  <p className="text-5xl font-black italic text-blue-600 leading-none">{score.toFixed(1)}</p>
                </div>
                <input 
                  type="range" min="7.0" max="10.0" step="0.1" 
                  value={score}
                  onChange={e => setScore(parseFloat(e.target.value))}
                  className="w-full h-3 bg-gray-100 rounded-lg appearance-none cursor-pointer accent-blue-600"
                />
                <div className="flex justify-between mt-2 text-[0.5rem] font-black text-gray-300 uppercase tracking-widest px-1">
                  <span>Standard</span>
                  <span>Legendary</span>
                </div>
              </div>

              <button 
                onClick={submitRating}
                className="w-full py-6 bg-black text-white rounded-[2rem] font-black text-sm uppercase tracking-widest hover:bg-blue-600 transition-all shadow-xl"
              >
                Submit Rating
              </button>
              <button 
                onClick={() => setSelectedPlayer(null)}
                className="w-full py-2 text-gray-300 font-black text-[0.6rem] uppercase hover:text-red-500 transition-colors"
              >
                Cancel
              </button>
            </div>
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