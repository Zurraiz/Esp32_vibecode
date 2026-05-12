'use client';

import { useParams, useRouter } from 'next/navigation';

import Header from '@/components/Header';
import { LEVELS } from '@/lib/lessonConfig';

export default function LevelPage() {
  const router = useRouter();
  const params = useParams<{ levelId: string }>();

  const levelId = Number(params.levelId);
  const level = LEVELS.find((l) => l.id === levelId);

  if (!level) {
    return (
      <main className="min-h-screen bg-[#EDEDED]">
        <Header />
        <div className="mx-auto max-w-4xl px-6 py-10">
          <div className="rounded-xl bg-white p-6 shadow-sm">
            <h1 className="text-xl font-bold text-[#2E4862]">Level not found</h1>
            <button
              type="button"
              onClick={() => router.push('/learn')}
              className="mt-3 text-sm text-gray-500 hover:text-[#2E4862]"
            >
              ← Learning Path
            </button>
          </div>
        </div>
      </main>
    );
  }

  if (level.isLocked) {
    return (
      <main className="min-h-screen bg-[#EDEDED]">
        <Header />
        <div className="mx-auto max-w-4xl px-6 py-10">
          <div className="rounded-xl bg-white p-6 shadow-sm">
            <h1 className="text-xl font-bold text-[#2E4862]">Level locked</h1>
            <p className="mt-1 text-sm text-gray-500">Complete previous levels to unlock this content.</p>
            <button
              type="button"
              onClick={() => router.push('/learn')}
              className="mt-3 text-sm text-gray-500 hover:text-[#2E4862]"
            >
              ← Learning Path
            </button>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#EDEDED]">
      <Header />

      <div className="mx-auto max-w-4xl px-6 py-10">
        <button
          type="button"
          onClick={() => router.push('/learn')}
          className="text-sm text-gray-500 hover:text-[#2E4862]"
        >
          ← Learning Path
        </button>

        <div className="mt-6">
          <div className="flex items-start gap-4">
            <div className="text-4xl">{level.icon}</div>
            <div>
              <span className="inline-flex rounded-full bg-[#2E4862]/10 px-2 py-0.5 text-xs text-[#2E4862]">
                Level {level.id}
              </span>
              <h1 className="mt-1 text-2xl font-bold text-[#2E4862]">{level.title}</h1>
              <p className="mt-1 text-sm text-gray-500">{level.description}</p>
            </div>
          </div>
        </div>

        <section className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2">
          {level.lessons.map((lesson) => (
            <button
              key={lesson.id}
              type="button"
              onClick={() => router.push(`/learn/level/${level.id}/lesson/${lesson.id}`)}
              className="rounded-2xl bg-white p-6 text-left shadow-sm cursor-pointer transition-all hover:shadow-md hover:scale-[1.01]"
            >
              <div className="flex items-center justify-between">
                <span className="text-3xl">{lesson.icon}</span>
                <span className="rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-500">
                  ⏱️ {lesson.estimatedMinutes} min
                </span>
              </div>

              <h2 className="mt-3 text-lg font-bold text-[#2E4862]">{lesson.title}</h2>
              <p className="mt-1 text-sm text-gray-500">{lesson.description}</p>

              <div className="mt-4">
                <p className="text-xs text-gray-400">{lesson.steps.length} steps</p>
                <div className="mt-1 h-1.5 rounded-full bg-gray-100">
                  <div className="h-1.5 w-0 rounded-full bg-gray-300" />
                </div>
              </div>
            </button>
          ))}
        </section>
      </div>
    </main>
  );
}
