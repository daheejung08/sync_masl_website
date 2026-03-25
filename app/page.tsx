<<<<<<< HEAD
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
=======
import Link from 'next/link'
import { supabase } from '@/lib/supabase'

type Match = {
  id: number
  team_a: string
  team_b: string
  match_date: string
  is_active: boolean
  sport?: string
  location?: string
}

const sports = [
  { name: '남자축구', emoji: '⚽', color: 'from-blue-600 to-cyan-500' },
  { name: '여자축구', emoji: '🥅', color: 'from-pink-500 to-rose-500' },
  { name: '남자농구', emoji: '🏀', color: 'from-orange-500 to-amber-500' },
  { name: '여자배구', emoji: '🏐', color: 'from-violet-500 to-purple-500' },
]

function formatMatchDate(dateString: string) {
  return new Date(dateString).toLocaleString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    weekday: 'short',
    hour: '2-digit',
    minute: '2-digit',
  })
}

export default async function HomePage() {
  const { data: matches, error } = await supabase
    .from('matches')
    .select('*')
    .eq('is_active', true)
    .order('match_date', { ascending: true })

  const upcomingMatch = (matches as Match[] | null)?.[0] ?? null

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-100 text-slate-900">
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.15),transparent_30%),radial-gradient(circle_at_left,rgba(99,102,241,0.08),transparent_25%)]" />
        <div className="relative max-w-6xl mx-auto px-6 pt-20 pb-16">
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-xs font-black uppercase tracking-[0.2em] text-blue-700">
            Official Sports Platform
          </div>

          <div className="mt-8 grid gap-8 lg:grid-cols-[1.2fr_0.8fr] items-center">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.3em] text-blue-600">
                MASL & SYNC
              </p>
              <h1 className="mt-4 text-4xl md:text-6xl font-black tracking-tight leading-tight">
                경기 일정,
                <br />
                평점,
                <span className="text-blue-600"> 토너먼트</span>를
                <br />
                한 곳에서
              </h1>
              <p className="mt-6 max-w-2xl text-base md:text-lg text-slate-600 leading-8">
                공식 경기 정보와 대진표, 참가자 경험을 한눈에 볼 수 있는
                스포츠 플랫폼입니다. 경기 일정 확인부터 평점 남기기까지
                하나의 흐름으로 연결합니다.
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  href="/gvr/rate"
                  className="inline-flex items-center justify-center rounded-full bg-blue-600 px-6 py-3 text-sm font-black text-white shadow-lg hover:bg-blue-700 transition"
                >
                  평점 남기러 가기
                </Link>
                <a
                  href="#tournaments"
                  className="inline-flex items-center justify-center rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-black text-slate-700 hover:bg-slate-50 transition"
                >
                  토너먼트 보기
                </a>
              </div>

              <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-4">
                {sports.map((sport) => (
                  <div
                    key={sport.name}
                    className="rounded-2xl border border-slate-200 bg-white/80 backdrop-blur px-4 py-4 shadow-sm"
                  >
                    <div className="text-2xl">{sport.emoji}</div>
                    <p className="mt-2 text-sm font-black text-slate-800">{sport.name}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="rounded-[2rem] bg-slate-950 p-8 text-white shadow-2xl">
                <div className="flex items-center justify-between">
                  <p className="text-xs font-black uppercase tracking-[0.25em] text-blue-300">
                    Upcoming Match
                  </p>
                  <div className="h-3 w-3 rounded-full bg-emerald-400 animate-pulse" />
                </div>

                {error ? (
                  <div className="mt-8 rounded-2xl bg-white/10 p-6">
                    <p className="text-sm font-bold text-red-300">데이터를 불러오지 못했습니다.</p>
                    <p className="mt-2 text-sm text-slate-300">{error.message}</p>
                  </div>
                ) : upcomingMatch ? (
                  <div className="mt-8">
                    <div className="rounded-[1.5rem] bg-gradient-to-br from-blue-600 to-indigo-700 p-8 shadow-xl">
                      <p className="text-sm font-bold text-blue-100">가장 가까운 공식 경기</p>
                      <div className="mt-5 text-center">
                        <p className="text-lg text-blue-100 font-semibold">MATCH DAY</p>
                        <h2 className="mt-3 text-3xl md:text-4xl font-black tracking-tight">
                          {upcomingMatch.team_a}
                        </h2>
                        <p className="my-3 text-sm font-black tracking-[0.4em] text-blue-200">
                          VS
                        </p>
                        <h2 className="text-3xl md:text-4xl font-black tracking-tight">
                          {upcomingMatch.team_b}
                        </h2>
                      </div>

                      <div className="mt-8 rounded-2xl bg-white/10 px-5 py-4">
                        <p className="text-xs font-bold uppercase tracking-[0.2em] text-blue-200">
                          Date
                        </p>
                        <p className="mt-1 text-sm font-semibold">
                          {formatMatchDate(upcomingMatch.match_date)}
                        </p>
                        {upcomingMatch.location && (
                          <>
                            <p className="mt-4 text-xs font-bold uppercase tracking-[0.2em] text-blue-200">
                              Location
                            </p>
                            <p className="mt-1 text-sm font-semibold">{upcomingMatch.location}</p>
                          </>
                        )}
                      </div>

                      <Link
                        href="/gvr/rate"
                        className="mt-6 inline-flex w-full items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-black text-blue-700 hover:bg-blue-50 transition"
                      >
                        이 경기 평점 남기기
                      </Link>
                    </div>
                  </div>
                ) : (
                  <div className="mt-8 rounded-[1.5rem] border border-dashed border-white/20 bg-white/5 p-10 text-center">
                    <p className="text-lg font-black text-slate-100">예정된 공식 경기가 없습니다</p>
                    <p className="mt-2 text-sm text-slate-300">
                      현재 활성화된 경기 일정이 등록되지 않았습니다.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-6">
        <div className="grid gap-4 md:grid-cols-3">
          <div className="rounded-3xl bg-white p-6 shadow-sm border border-slate-200">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-400">
              Active Matches
            </p>
            <p className="mt-3 text-3xl font-black text-slate-900">
              {matches?.length ?? 0}
            </p>
          </div>
          <div className="rounded-3xl bg-white p-6 shadow-sm border border-slate-200">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-400">
              Platform
            </p>
            <p className="mt-3 text-3xl font-black text-slate-900">MASL & SYNC</p>
          </div>
          <div className="rounded-3xl bg-white p-6 shadow-sm border border-slate-200">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-400">
              Category
            </p>
            <p className="mt-3 text-3xl font-black text-slate-900">4 Sports</p>
          </div>
        </div>
      </section>

      <section id="tournaments" className="max-w-6xl mx-auto px-6 py-16">
        <div className="flex items-end justify-between gap-4 flex-wrap">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.25em] text-blue-600">
              Tournament Board
            </p>
            <h2 className="mt-3 text-3xl md:text-4xl font-black tracking-tight">
              종목별 토너먼트
            </h2>
          </div>
          <p className="text-sm text-slate-500">
            대진표 이미지를 연결하거나 경기 데이터를 기반으로 확장할 수 있습니다.
          </p>
        </div>

        <div className="mt-10 grid gap-8 md:grid-cols-2">
          {sports.map((sport) => (
            <div
              key={sport.name}
              className="group overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-sm hover:shadow-xl transition"
            >
              <div className={`h-3 w-full bg-gradient-to-r ${sport.color}`} />
              <div className="p-8">
                <div className="flex items-center gap-3">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-2xl">
                    {sport.emoji}
                  </div>
                  <div>
                    <h3 className="text-2xl font-black tracking-tight">{sport.name}</h3>
                    <p className="text-sm text-slate-500">Tournament Bracket</p>
                  </div>
                </div>

                <div className="mt-6 aspect-[16/10] rounded-[1.5rem] border border-dashed border-slate-300 bg-slate-50 relative overflow-hidden">
                  <div className="absolute inset-0 bg-[radial-gradient(#dbe4f0_1px,transparent_1px)] [background-size:18px_18px] opacity-70" />
                  <div className="relative z-10 flex h-full flex-col items-center justify-center text-center px-6">
                    <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-400">
                      Bracket Placeholder
                    </p>
                    <p className="mt-2 text-lg font-bold text-slate-500">
                      {sport.name} 대진표 이미지 연결 예정
                    </p>
                    <p className="mt-2 text-sm text-slate-400">
                      public 폴더 이미지 또는 DB 기반 토너먼트 UI로 확장 가능
                    </p>
                  </div>
                </div>

                <div className="mt-6 flex gap-3">
                  <button className="rounded-full bg-slate-900 px-5 py-3 text-sm font-black text-white hover:bg-slate-800 transition">
                    대진표 업데이트
                  </button>
                  <button className="rounded-full border border-slate-300 bg-white px-5 py-3 text-sm font-black text-slate-700 hover:bg-slate-50 transition">
                    상세 보기
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 pb-24">
        <div className="rounded-[2.5rem] bg-slate-950 px-8 py-14 text-center text-white overflow-hidden relative">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.25),transparent_35%)]" />
          <div className="relative z-10">
            <p className="text-xs font-black uppercase tracking-[0.35em] text-blue-300">
              Official Sports Platform
            </p>
            <h2 className="mt-5 text-4xl md:text-6xl font-black tracking-tight italic">
              MASL <span className="text-blue-400">&</span> SYNC
            </h2>
            <p className="mt-5 max-w-2xl mx-auto text-sm md:text-base text-slate-300 leading-7">
              경기 정보, 참가자 경험, 토너먼트 관리를 하나의 브랜드 경험으로
              연결하는 스포츠 플랫폼.
            </p>
          </div>
        </div>
      </section>
    </main>
  )
>>>>>>> 564ee98 (Initial commit)
}