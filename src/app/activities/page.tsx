'use client';

// src/app/activities/page.tsx
// REPLACE YOUR EXISTING activities/page.tsx WITH THIS FILE ENTIRELY

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import { ACTIVITIES } from '@/lib/activitiesData';
import { useActivityStore } from '@/store/useActivityStore';

const difficultyColor: Record<string, string> = {
  Beginner: 'bg-green-50 text-green-700 border border-green-100',
  Intermediate: 'bg-yellow-50 text-yellow-700 border border-yellow-100',
  Advanced: 'bg-red-50 text-red-700 border border-red-100',
};

export default function ActivitiesPage() {
  const router = useRouter();
  const { isCompleted, getProgress } = useActivityStore();

  // Hydration fix — start with 0 on server, update on client
  const [completedCount, setCompletedCount] = useState(0);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setCompletedCount(ACTIVITIES.filter((a) => isCompleted(a.id)).length);
    setHydrated(true);
  }, []);

  return (
    <main className="min-h-screen bg-[#EDEDED]">
      <Header />

      <div className="mx-auto max-w-6xl px-6 py-10">
        {/* Page Header */}
        <section className="mb-8">
          <div className="flex items-center gap-3">
            <span className="text-4xl">⚡</span>
            <div>
              <h1 className="text-2xl font-bold text-[#2E4862]">Activities</h1>
              <p className="mt-0.5 text-sm text-gray-500">
                Guided projects with step-by-step instructions, wiring diagrams, code, and expected output.
              </p>
            </div>
          </div>

          {/* Stats bar */}
          <div className="mt-6 flex items-center gap-4">
            <div className="rounded-xl bg-white px-4 py-2.5 shadow-sm">
              <p className="text-xs text-gray-400">Total Projects</p>
              <p className="text-lg font-bold text-[#2E4862]">{ACTIVITIES.length}</p>
            </div>
            <div className="rounded-xl bg-white px-4 py-2.5 shadow-sm">
              <p className="text-xs text-gray-400">Beginner</p>
              <p className="text-lg font-bold text-green-600">
                {ACTIVITIES.filter((a) => a.difficulty === 'Beginner').length}
              </p>
            </div>
            <div className="rounded-xl bg-white px-4 py-2.5 shadow-sm">
              <p className="text-xs text-gray-400">Intermediate</p>
              <p className="text-lg font-bold text-yellow-600">
                {ACTIVITIES.filter((a) => a.difficulty === 'Intermediate').length}
              </p>
            </div>
            <div className="rounded-xl bg-white px-4 py-2.5 shadow-sm">
              <p className="text-xs text-gray-400">Advanced</p>
              <p className="text-lg font-bold text-red-600">
                {ACTIVITIES.filter((a) => a.difficulty === 'Advanced').length}
              </p>
            </div>
            <div className="rounded-xl bg-white px-4 py-2.5 shadow-sm">
              <p className="text-xs text-gray-400">Completed</p>
              <p className="text-lg font-bold text-[#2E4862]">{completedCount}</p>
            </div>
          </div>
        </section>

        {/* Activity Cards Grid */}
        <section className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {ACTIVITIES.map((activity) => {
            const done = isCompleted(activity.id);
            const progress = getProgress(activity.id, 5); // 5 steps total

            return (
              <button
                key={activity.id}
                type="button"
                onClick={() => router.push(`/activities/${activity.id}`)}
                className={`group cursor-pointer rounded-2xl bg-white p-5 text-left shadow-sm transition-all hover:scale-[1.02] hover:shadow-md relative ${
                  done ? 'ring-2 ring-green-200' : ''
                }`}
              >
                {/* Completed badge */}
                {done && (
                  <div className="absolute top-3 right-3 rounded-full bg-green-500 px-2 py-0.5 text-[10px] font-bold text-white">
                    ✓ Done
                  </div>
                )}

                {/* Top row */}
                <div className="flex items-start justify-between">
                  <span className="text-4xl">{activity.icon}</span>
                  {!done && (
                    <span
                      className={`rounded-full px-2.5 py-0.5 text-[10px] font-semibold ${difficultyColor[activity.difficulty]}`}
                    >
                      {activity.difficulty}
                    </span>
                  )}
                </div>

                {/* Title + description */}
                <h2 className="mt-3 text-base font-bold text-[#2E4862]">{activity.title}</h2>
                <p className="mt-1 text-xs leading-relaxed text-gray-500 line-clamp-2">
                  {activity.description}
                </p>

                {/* Progress bar — shows if started but not done */}
                {!done && progress > 0 && (
                  <div className="mt-3">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[10px] text-gray-400">In progress</span>
                      <span className="text-[10px] font-semibold text-[#2E4862]">{progress}%</span>
                    </div>
                    <div className="h-1.5 w-full rounded-full bg-gray-100">
                      <div
                        className="h-1.5 rounded-full bg-[#2E4862] transition-all"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                  </div>
                )}

                {/* Tags */}
                <div className="mt-3 flex flex-wrap gap-1">
                  {activity.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-blue-100 bg-blue-50 px-2 py-0.5 text-[10px] text-blue-600"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Footer */}
                <div className="mt-4 flex items-center justify-between border-t border-gray-100 pt-3">
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-gray-400">⏱ {activity.duration}</span>
                    <span className="text-xs text-gray-400">
                      🔧 {activity.equipment.length} parts
                    </span>
                  </div>
                  <span className="text-xs font-semibold text-[#2E4862] opacity-0 transition-opacity group-hover:opacity-100">
                    {done ? 'Review →' : 'Start →'}
                  </span>
                </div>

                {/* Teaches chips */}
                <div className="mt-2 flex flex-wrap gap-1">
                  {activity.teaches.slice(0, 3).map((t) => (
                    <span
                      key={t}
                      className="rounded-full border border-green-100 bg-green-50 px-2 py-0.5 text-[10px] text-green-700"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </button>
            );
          })}

          {/* Coming Soon placeholder */}
          <div className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-gray-200 bg-white/50 p-8 text-center">
            <span className="text-3xl">🚧</span>
            <p className="mt-2 text-sm font-semibold text-gray-400">More coming soon</p>
            <p className="mt-1 text-xs text-gray-300">WiFi, MQTT, sensors & more</p>
          </div>
        </section>
      </div>
    </main>
  );
}