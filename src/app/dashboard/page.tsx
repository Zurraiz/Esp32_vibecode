'use client';

import { useRouter } from 'next/navigation';

import Header from '@/components/Header';
import { useAppStore } from '@/store/useAppStore';

export default function DashboardPage() {
  const router = useRouter();
  const activeDeviceId = useAppStore((state) => state.activeDeviceId);

  return (
    <main className="min-h-screen bg-[#EDEDED]">
      <Header />

      <div className="mx-auto max-w-6xl px-6 py-10">
        <section>
          <h1 className="text-2xl font-bold text-[#2E4862]">Welcome back! 👋</h1>
          <p className="mt-1 text-sm text-gray-500">What would you like to do today?</p>
        </section>

        <section className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
          <div
            onClick={() => router.push('/')}
            className="cursor-pointer rounded-2xl bg-[#2E4862] p-6 text-white shadow-lg transition-transform hover:scale-[1.02]"
          >
            <div className="text-5xl">🧩</div>
            <h2 className="mt-4 text-xl font-bold">Playground</h2>
            <p className="mt-2 text-sm leading-relaxed text-white/70">
              Build freely with blocks or English. Test your ideas on real hardware instantly.
            </p>
            <p className="mt-6 text-sm font-semibold text-white/90">Open Playground →</p>
          </div>

          <div
            onClick={() => router.push('/learn')}
            className="cursor-pointer rounded-2xl bg-white p-6 shadow-sm transition-all hover:scale-[1.02] hover:shadow-md"
          >
            <div className="text-5xl">📚</div>
            <h2 className="mt-4 text-xl font-bold text-[#2E4862]">Learn</h2>
            <p className="mt-2 text-sm leading-relaxed text-gray-500">
              Structured lessons from LED basics to IoT cloud projects. Learn step by step.
            </p>
            <div className="mt-6 flex items-center gap-2">
              <span className="rounded-full bg-[#2E4862]/10 px-3 py-1 text-xs font-semibold text-[#2E4862]">
                5 Levels
              </span>
              <span className="rounded-full bg-[#2E4862]/10 px-3 py-1 text-xs font-semibold text-[#2E4862]">
                25 Lessons
              </span>
            </div>
          </div>

          <div
            onClick={() => {}}
            className="cursor-pointer rounded-2xl bg-white p-6 shadow-sm transition-all hover:scale-[1.02] hover:shadow-md"
          >
            <div className="text-5xl">⚡</div>
            <h2 className="mt-4 text-xl font-bold text-[#2E4862]">Activities</h2>
            <p className="mt-2 text-sm leading-relaxed text-gray-500">
              Quick challenges and mini-projects to practice specific skills.
            </p>
            <span className="mt-6 w-fit rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-400">
              Coming Soon
            </span>
          </div>
        </section>

        <section className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-4">
          <div className="rounded-xl bg-white p-4 shadow-sm">
            <p className="text-xs text-gray-500">🎯 Current Level</p>
            <p className="mt-1 text-sm font-semibold text-[#2E4862]">Level 1</p>
          </div>

          <div className="rounded-xl bg-white p-4 shadow-sm">
            <p className="text-xs text-gray-500">✅ Lessons Done</p>
            <p className="mt-1 text-sm font-semibold text-[#2E4862]">0 / 25</p>
          </div>

          <div className="rounded-xl bg-white p-4 shadow-sm">
            <p className="text-xs text-gray-500">🔥 Day Streak</p>
            <p className="mt-1 text-sm font-semibold text-[#2E4862]">1 day</p>
          </div>

          <div className="rounded-xl bg-white p-4 shadow-sm">
            <p className="text-xs text-gray-500">📡 Device</p>
            <p className="mt-1 text-sm font-semibold text-[#2E4862]">{activeDeviceId || 'Not linked'}</p>
          </div>
        </section>

        <section className="mt-10">
          <h3 className="mb-4 text-lg font-bold text-[#2E4862]">Recent Activity</h3>
          <div className="rounded-xl bg-white p-6 shadow-sm">
            <div className="flex flex-col items-center justify-center text-center">
              <div className="text-2xl">📭</div>
              <p className="mt-2 text-sm text-gray-400">
                No activity yet. Start with the Playground or a lesson!
              </p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
