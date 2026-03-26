type PageProps = {
  params: Promise<{
    teamName: string
    playerId: string
  }>
}

export default async function PlayerPage({ params }: PageProps) {
  const { teamName, playerId } = await params

  return (
    <main className="min-h-screen bg-white text-slate-900 px-6 py-16">
      <div className="max-w-3xl mx-auto">
        <p className="text-sm font-bold uppercase tracking-[0.2em] text-blue-600">
          Player Detail
        </p>

        <h1 className="mt-4 text-4xl font-black tracking-tight">
          선수 상세 페이지
        </h1>

        <div className="mt-8 rounded-3xl border border-slate-200 bg-slate-50 p-8 shadow-sm">
          <p className="text-sm text-slate-500">Team Name</p>
          <p className="mt-1 text-xl font-bold text-slate-900">{teamName}</p>

          <p className="mt-6 text-sm text-slate-500">Player ID</p>
          <p className="mt-1 text-xl font-bold text-slate-900">{playerId}</p>
        </div>
      </div>
    </main>
  )
}