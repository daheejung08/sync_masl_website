// app/page.tsx
import { supabase } from '@/lib/supabase';
import Link from 'next/link';

export default async function HomePage() {
  const { data: matches } = await supabase
    .from('matches')
    .select('*')
    .eq('is_active', true)
    .order('match_date', { ascending: true });

  const sports = ["남자축구", "여자축구", "남자농구", "여자배구"];

  return (
    <div className="min-h-screen bg-gray-50 pb-20 font-sans text-black pt-20">
      {/* 1. 상단 하이라이트 */}
      <section className="px-6 py-10 max-w-4xl mx-auto text-center">
        <h2 className="text-xs font-black mb-6 text-blue-600 uppercase tracking-[0.2em]">Upcoming Match</h2>
        {matches && matches.length > 0 ? (
          <div className="bg-gradient-to-br from-blue-700 to-indigo-900 rounded-[3rem] p-12 text-white shadow-2xl relative overflow-hidden group hover:shadow-2xl transition-all">
             {/* 배경 데코레이션 */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-blue-400/10 rounded-full -mr-20 -mt-20 blur-3xl group-hover:bg-blue-400/20 transition-colors" />
            
             <p className="text-2xl font-black">{matches[0].team_a} VS {matches[0].team_b}</p>
             <p className="mt-4 text-blue-200 text-sm font-bold">{new Date(matches[0].match_date).toLocaleString('ko-KR')}</p>
             <Link href="/gvr/rate" className="inline-block mt-8 bg-white text-blue-600 px-8 py-3 rounded-full font-black text-sm hover:bg-blue-50 transition-all shadow-xl">
               평점 남기러 가기
             </Link>
          </div>
        ) : (
          <div className="bg-white p-16 rounded-[3rem] border-2 border-dashed border-gray-200 text-gray-400 text-center shadow-inner">
            <p className="text-gray-300 font-black text-xl mb-2">NO UPCOMING MATCHES</p>
            <p className="text-gray-400 text-sm">현재 예정된 공식 경기가 없습니다.</p>
          </div>
        )}
      </section>

      {/* 2. 종목별 토너먼트 (스크롤) */}
      <section className="px-6 py-10 max-w-4xl mx-auto space-y-20">
        {sports.map((sport) => (
          <div key={sport}>
            <h3 className="text-2xl font-black mb-6 italic tracking-tight">{sport} <span className="text-blue-600">토너먼트</span></h3>
            <div className="aspect-[16/9] bg-white border border-gray-100 rounded-[2.5rem] shadow-sm flex items-center justify-center text-gray-300 font-bold italic relative group overflow-hidden">
               {/* 임시 Placeholder 디자인 */}
              <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:20px_20px] opacity-50" />
              <div className="relative z-10 text-center">
                <p className="text-gray-300 font-black mb-1 uppercase tracking-[0.2em] text-xs">Bracket Update Needed</p>
                <p className="text-gray-400 text-[0.65rem] italic font-medium">[ 대진표 사진 업데이트 예정 ]</p>
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* ⭐ 하단 문구 수정 반영 (MASL & SYNC) */}
      <div className="mt-32 mb-10 text-center select-none">
        <div className="inline-block px-8 py-2 bg-gray-100 rounded-full mb-4 shadow-inner border border-gray-200">
          <p className="text-[0.6rem] font-black text-gray-400 uppercase tracking-[0.4em]">
            Official Sports Platform
          </p>
        </div>
        <div className="opacity-10 font-black text-6xl md:text-8xl italic tracking-tighter text-gray-900 leading-none">
          MASL <span className="text-blue-600">&</span> SYNC
        </div>
      </div>
    </div>
  );
}