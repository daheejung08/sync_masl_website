'use client';

import { useState, useEffect, use } from 'react'; // use 추가
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { supabase } from '@/lib/supabase';

export default function TeamPage() {
  const params = useParams();
  // Next.js 최신 버전 대응: params가 비어있을 때를 대비한 안전한 처리
  const teamName = params?.teamName ? decodeURIComponent(params.teamName as string) : "";
  const [players, setPlayers] = useState<any[]>([]);

  useEffect(() => {
    if (!teamName) return; // 팀명이 없으면 실행 안 함

    const fetchSquad = async () => {
      const { data } = await supabase
        .from('players')
        .select('*')
        .eq('team_name', teamName)
        .order('player_number', { ascending: true });
      setPlayers(data || []);
    };
    fetchSquad();
  }, [teamName]);

  return (
    <div className="min-h-screen bg-white pb-20 pt-32 px-6 text-black font-sans">
      <div className="max-w-6xl mx-auto">
        <Link href="/masl/26s" className="text-[0.6rem] font-black text-blue-600 uppercase tracking-[0.3em] mb-4 inline-block hover:opacity-50">
          ← Back to Hub
        </Link>
        <h1 className="text-8xl font-black italic tracking-tighter uppercase mb-20 break-all leading-none">
          {teamName}
        </h1>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {players.map(p => (
            <Link 
              href={`/masl/26s/team/${encodeURIComponent(teamName)}/player/${p.id}`} 
              key={p.id} 
              className="group"
            >
              <div className="aspect-[3/4] rounded-[2.5rem] bg-gray-50 overflow-hidden mb-4 relative border border-gray-100 group-hover:shadow-2xl transition-all group-hover:-translate-y-2">
                {p.photo_url ? (
                  <img src={p.photo_url} className="w-full h-full object-cover" alt={p.name} />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-4xl opacity-10 font-black italic">
                    {p.player_number}
                  </div>
                )}
                <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-[0.6rem] font-black italic shadow-sm">
                  No.{p.player_number}
                </div>
              </div>
              <h3 className="text-center font-black text-xl tracking-tight group-hover:text-blue-600 transition-colors">
                {p.name}
              </h3>
            </Link>
          ))}
        </div>

        {/* 데이터가 없을 때 표시 */}
        {players.length === 0 && (
          <div className="py-20 text-center bg-gray-50 rounded-[3rem] border border-dashed border-gray-200 mt-10">
            <p className="text-gray-300 font-black italic tracking-widest uppercase">No Players Found</p>
          </div>
        )}
      </div>

      <div className="mt-40 text-center opacity-10 font-black text-6xl italic tracking-tighter select-none">
        MASL <span className="text-blue-600">&</span> SYNC
      </div>
    </div>
  );
}