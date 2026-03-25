'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
// @/lib/supabase가 안 되면 ../../../lib/supabase 로 수정하세요.
import { supabase } from '@/lib/supabase'; 

// 반드시 'export default function'이 붙어있어야 합니다.
export default function Masl26sPage() {
  const sports = ["남자축구", "여자축구", "남자농구", "여자배구"];
  const [activeTab, setActiveTab] = useState("남자축구");
  const [teams, setTeams] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadHubData = async () => {
      setLoading(true);
      
      // players 테이블에서 해당 종목의 team_name들만 가져오기
      const { data, error } = await supabase
        .from('players')
        .select('team_name')
        .eq('sport_type', activeTab);

      if (data) {
        // 중복 제거하여 팀 이름 리스트 생성
        const uniqueTeams = Array.from(new Set(data.map(p => p.team_name)));
        setTeams(uniqueTeams as string[]);
      }
      setLoading(false);
    };
    loadHubData();
  }, [activeTab]);

  return (
    <div className="min-h-screen bg-white pb-20 pt-32 px-6 font-sans text-black">
      {/* 제목 섹션 */}
      <div className="max-w-5xl mx-auto mb-16">
        <h1 className="text-7xl font-black italic tracking-tighter mb-4 uppercase">
          26 <span className="text-blue-600">Spring</span> Hub
        </h1>
        
        {/* 종목 선택 탭 */}
        <div className="flex gap-4 overflow-x-auto no-scrollbar py-4 border-b border-gray-100">
          {sports.map(s => (
            <button 
              key={s} 
              onClick={() => setActiveTab(s)}
              className={`px-8 py-3 rounded-full font-black text-sm transition-all ${
                activeTab === s ? 'bg-black text-white' : 'bg-gray-100 text-gray-400 hover:bg-gray-200'
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-5xl mx-auto grid lg:grid-cols-3 gap-12">
        {/* 왼쪽: 대진표 */}
        <div className="lg:col-span-2">
          <h3 className="text-xl font-black mb-6 italic uppercase tracking-widest text-gray-300">Tournament Bracket</h3>
          <div className="aspect-video bg-gray-50 rounded-[3rem] border border-gray-100 flex items-center justify-center">
             <p className="text-gray-300 font-black italic">[ 대진표 업데이트 예정 ]</p>
          </div>
        </div>

        {/* 오른쪽: 팀 리스트 */}
        <div className="space-y-4">
          <h3 className="text-xl font-black mb-6 italic uppercase tracking-widest">Participating Teams</h3>
          {loading ? (
            <div className="text-gray-300 font-bold animate-pulse">데이터 로딩 중...</div>
          ) : teams.length > 0 ? (
            teams.map(name => (
              <Link href={`/masl/26s/team/${encodeURIComponent(name)}`} key={name} className="block group">
                <div className="p-6 bg-gray-50 rounded-2xl flex items-center justify-between border border-transparent group-hover:border-blue-600 group-hover:bg-white transition-all shadow-sm">
                  <span className="font-black text-lg tracking-tight italic">{name}</span>
                  <span className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-xs group-hover:bg-blue-600 group-hover:text-white font-black transition-colors">→</span>
                </div>
              </Link>
            ))
          ) : (
            <p className="text-gray-300 text-sm font-bold p-10 bg-gray-50 rounded-2xl text-center">등록된 팀이 없습니다.</p>
          )}
        </div>
      </div>
    </div>
  );
}