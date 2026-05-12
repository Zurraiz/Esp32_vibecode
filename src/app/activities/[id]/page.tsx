'use client';

// src/app/activities/[id]/page.tsx
// REPLACE YOUR EXISTING [id]/page.tsx WITH THIS FILE ENTIRELY

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import { ACTIVITIES } from '@/lib/activitiesData';
import { useAppStore } from '@/store/useAppStore';
import { useActivityStore } from '@/store/useActivityStore';

// ─── Step Nav ────────────────────────────────────────────────────────────────

const STEPS = [
  { id: 0, label: 'Intro', emoji: '📋' },
  { id: 1, label: 'Equipment', emoji: '🔧' },
  { id: 2, label: 'Assemble', emoji: '🛠️' },
  { id: 3, label: 'Code', emoji: '💻' },
  { id: 4, label: 'Output', emoji: '📊' },
];

function StepNav({
  current,
  onChange,
  completed,
}: {
  current: number;
  onChange: (i: number) => void;
  completed: number[];
}) {
  return (
    <div className="flex items-center gap-0">
      {STEPS.map((step, idx) => (
        <div key={step.id} className="flex items-center">
          <button
            type="button"
            onClick={() => onChange(step.id)}
            className={`flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-semibold transition-all ${
              current === step.id
                ? 'bg-[#2E4862] text-white shadow-md'
                : completed.includes(step.id)
                ? 'bg-green-100 text-green-700'
                : 'bg-white text-gray-400 hover:text-[#2E4862]'
            }`}
          >
            <span>{completed.includes(step.id) && current !== step.id ? '✓' : step.emoji}</span>
            <span className="hidden sm:inline">{step.label}</span>
          </button>
          {idx < STEPS.length - 1 && (
            <div
              className={`h-0.5 w-6 transition-all ${
                completed.includes(step.id) ? 'bg-green-300' : 'bg-gray-200'
              }`}
            />
          )}
        </div>
      ))}
    </div>
  );
}

// ─── Step 0: Intro ───────────────────────────────────────────────────────────

function IntroStep({ activity }: { activity: any }) {
  return (
    <div className="space-y-6">
      <div className="rounded-2xl bg-[#2E4862] p-8 text-white">
        <div className="text-6xl mb-4">{activity.icon}</div>
        <h2 className="text-2xl font-bold">{activity.intro.headline}</h2>
        <div className="mt-3 flex flex-wrap gap-2">
          <span className="rounded-full bg-white/20 px-3 py-1 text-xs font-semibold">
            ⏱ {activity.duration}
          </span>
          <span className="rounded-full bg-white/20 px-3 py-1 text-xs font-semibold">
            📊 {activity.difficulty}
          </span>
          {activity.tags.map((tag: string) => (
            <span key={tag} className="rounded-full bg-white/10 px-3 py-1 text-xs">
              {tag}
            </span>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="rounded-2xl bg-white p-6 shadow-sm">
          <h3 className="mb-2 font-bold text-[#2E4862]">🎯 What you will build</h3>
          <p className="text-sm leading-relaxed text-gray-600">{activity.intro.what}</p>
        </div>
        <div className="rounded-2xl bg-white p-6 shadow-sm">
          <h3 className="mb-2 font-bold text-[#2E4862]">💡 Why this matters</h3>
          <p className="text-sm leading-relaxed text-gray-600">{activity.intro.why}</p>
        </div>
      </div>

      <div className="rounded-2xl bg-white p-6 shadow-sm">
        <h3 className="mb-3 font-bold text-[#2E4862]">📚 What you will learn</h3>
        <div className="flex flex-wrap gap-2">
          {activity.teaches.map((t: string) => (
            <span
              key={t}
              className="rounded-full border border-green-100 bg-green-50 px-3 py-1 text-xs font-semibold text-green-700"
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Step 1: Equipment ───────────────────────────────────────────────────────

function EquipmentStep({ activity }: { activity: any }) {
  return (
    <div className="space-y-4">
      <div className="rounded-2xl bg-white p-6 shadow-sm">
        <h2 className="mb-1 text-lg font-bold text-[#2E4862]">🔧 Equipment Needed</h2>
        <p className="mb-5 text-xs text-gray-400">
          Gather all components before starting. Most are available online for under $5.
        </p>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {activity.equipment.map((item: any, idx: number) => (
            <div
              key={idx}
              className="flex flex-col items-center rounded-xl border border-gray-100 bg-[#EDEDED] p-5 text-center transition-all hover:border-[#2E4862]/20 hover:shadow-sm"
            >
              <div className="flex h-20 w-20 items-center justify-center rounded-xl bg-white shadow-sm overflow-hidden">
                {item.image ? (
                  <Image
                    src={item.image}
                    alt={item.name}
                    width={80}
                    height={80}
                    className="h-full w-full object-contain p-1"
                  />
                ) : (
                  <span className="text-5xl">{item.emoji}</span>
                )}
              </div>
              <div className="mt-3">
                <p className="text-sm font-bold text-[#2E4862]">{item.name}</p>
                <p className="mt-1 text-xs text-gray-500">{item.description}</p>
                <span className="mt-2 inline-block rounded-full bg-[#2E4862]/10 px-2 py-0.5 text-[10px] font-semibold text-[#2E4862]">
                  × {item.quantity}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="rounded-xl border border-blue-100 bg-blue-50 p-4">
        <p className="text-xs font-semibold text-blue-700">
          💡 Tip: Search for an &quot;ESP32 Starter Kit&quot; on Amazon or AliExpress — it includes most
          components in this activity for under $15.
        </p>
      </div>
    </div>
  );
}

// ─── Step 2: Assemble ────────────────────────────────────────────────────────

function AssembleStep({ activity }: { activity: any }) {
  const [view, setView] = useState<'video' | 'simulation'>('simulation');

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => setView('simulation')}
          className={`rounded-full px-4 py-1.5 text-xs font-semibold transition-all ${
            view === 'simulation' ? 'bg-[#2E4862] text-white' : 'bg-white text-gray-400 hover:text-[#2E4862]'
          }`}
        >
          🧪 Live Simulation
        </button>
        <button
          type="button"
          onClick={() => setView('video')}
          className={`rounded-full px-4 py-1.5 text-xs font-semibold transition-all ${
            view === 'video' ? 'bg-[#2E4862] text-white' : 'bg-white text-gray-400 hover:text-[#2E4862]'
          }`}
        >
          ▶ Video Tutorial
        </button>
      </div>

      <div className="overflow-hidden rounded-2xl bg-white shadow-sm">
        {view === 'simulation' ? (
          <div>
            <div className="flex items-center justify-between border-b border-gray-100 px-5 py-3">
              <p className="text-xs font-semibold text-[#2E4862]">Wokwi Simulation</p>
              <a
                href={activity.assemble.wokwiUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[10px] text-blue-500 hover:underline"
              >
                Open in Wokwi ↗
              </a>
            </div>
            <iframe
              src={`${activity.assemble.wokwiUrl}?embed=1`}
              className="h-[420px] w-full"
              title="Wokwi Simulation"
              allow="fullscreen"
            />
          </div>
        ) : (
          <div>
            <div className="flex items-center border-b border-gray-100 px-5 py-3">
              <p className="text-xs font-semibold text-[#2E4862]">▶ Video Tutorial</p>
            </div>
            <iframe
              src={activity.assemble.videoUrl}
              className="h-[420px] w-full"
              title="Video Tutorial"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        )}
      </div>

      <div className="rounded-2xl bg-white p-6 shadow-sm">
        <h3 className="mb-4 font-bold text-[#2E4862]">🛠️ Wiring Steps</h3>
        <div className="space-y-3">
          {activity.assemble.steps.map((step: string, idx: number) => (
            <div key={idx} className="flex items-start gap-3">
              <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#2E4862] text-xs font-bold text-white">
                {idx + 1}
              </div>
              <p className="text-sm text-gray-600">{step}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Step 3: Code ────────────────────────────────────────────────────────────

function CodeStep({ activity }: { activity: any }) {
  const router = useRouter();
  const clearBlocks = useAppStore((state) => state.clearBlocks);
  const addBlock = useAppStore((state) => state.addBlock);

  const [tab, setTab] = useState<'arduino' | 'platform'>('platform');
  const [copied, setCopied] = useState(false);
  const [aiQuestion, setAiQuestion] = useState('');
  const [aiAnswer, setAiAnswer] = useState('');
  const [aiLoading, setAiLoading] = useState(false);
  const [showAi, setShowAi] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(activity.code.arduino);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // ← THE FIX: properly loads real blocks into useAppStore
  const handleOpenPlayground = () => {
    clearBlocks();
    // playgroundBlocks are already in the right shape for addBlock (Omit<Block, 'id'>)
    // addBlock auto-assigns IDs, so we just pass type + icon + label + params + values
    if (activity.playgroundBlocks?.length) {
      activity.playgroundBlocks.forEach((block: any) => {
        addBlock({
          type: block.type,
          icon: block.icon,
          label: block.label,
          params: block.params,
          values: block.values,
        });
      });
    }
    router.push('/');
  };

  const handleAskAi = async () => {
    if (!aiQuestion.trim()) return;
    setAiLoading(true);
    setAiAnswer('');

    try {
      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'claude-sonnet-4-20250514',
          max_tokens: 1000,
          system: `You are a helpful assistant for an ESP32 learning platform. 
A student is working on this specific project:

Activity: ${activity.title}
Difficulty: ${activity.difficulty}

Arduino Code:
${activity.code.arduino}

Expected Output:
${activity.output.expected.join('\n')}

Troubleshooting Tips from the guide:
${activity.output.tips.join('\n')}

Answer the student's question about THIS project specifically. 
Be concise, friendly, and practical. Use simple language suitable for beginners.
If the question is unrelated to this project, gently redirect them.`,
          messages: [{ role: 'user', content: aiQuestion }],
        }),
      });

      const data = await response.json();
      const text = data.content?.map((c: any) => c.text || '').join('') || 'No response received.';
      setAiAnswer(text);
    } catch {
      setAiAnswer('Something went wrong. Check your connection and try again.');
    } finally {
      setAiLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => setTab('platform')}
          className={`rounded-full px-4 py-1.5 text-xs font-semibold transition-all ${
            tab === 'platform' ? 'bg-[#2E4862] text-white' : 'bg-white text-gray-400 hover:text-[#2E4862]'
          }`}
        >
          🧩 Our Platform
        </button>
        <button
          type="button"
          onClick={() => setTab('arduino')}
          className={`rounded-full px-4 py-1.5 text-xs font-semibold transition-all ${
            tab === 'arduino' ? 'bg-[#2E4862] text-white' : 'bg-white text-gray-400 hover:text-[#2E4862]'
          }`}
        >
          ⚙️ Arduino IDE
        </button>
      </div>

      {tab === 'platform' ? (
        <div className="rounded-2xl bg-white p-6 shadow-sm">
          <h3 className="mb-2 font-bold text-[#2E4862]">🧩 Use the Block Playground</h3>
          <p className="mb-1 text-xs text-gray-400">
            Click below — all {activity.playgroundBlocks?.length ?? 0} blocks for this project will be
            pre-loaded in the Playground automatically.
          </p>
          <p className="mb-4 text-xs text-gray-500 leading-relaxed">
            {activity.code.platformDescription}
          </p>

          {/* Block preview */}
          <div className="mb-4 rounded-xl bg-[#EDEDED] p-4">
            <p className="mb-2 text-[10px] font-semibold text-gray-500 uppercase tracking-wide">
              Blocks that will be loaded ({activity.playgroundBlocks?.length ?? 0} total)
            </p>
            <div className="flex flex-wrap gap-2">
              {activity.playgroundBlocks?.map((block: any, idx: number) => (
                <span
                  key={idx}
                  className="flex items-center gap-1 rounded-lg bg-white px-2 py-1 text-[10px] font-semibold text-[#2E4862] shadow-sm"
                >
                  <span>{block.icon}</span>
                  <span>{block.type}</span>
                </span>
              ))}
            </div>
          </div>

          <button
            type="button"
            onClick={handleOpenPlayground}
            className="flex items-center gap-2 rounded-xl bg-[#2E4862] px-5 py-2.5 text-xs font-semibold text-white transition-all hover:bg-[#3a5a7a]"
          >
            🧩 Open Playground with blocks pre-loaded →
          </button>
        </div>
      ) : (
        <div className="rounded-2xl bg-white shadow-sm">
          <div className="flex items-center justify-between border-b border-gray-100 px-5 py-3">
            <p className="text-xs font-semibold text-[#2E4862]">⚙️ Arduino IDE Code</p>
            <button
              type="button"
              onClick={handleCopy}
              className="rounded-lg bg-[#EDEDED] px-3 py-1 text-[10px] font-semibold text-gray-600 transition-all hover:bg-[#2E4862] hover:text-white"
            >
              {copied ? '✓ Copied!' : '📋 Copy'}
            </button>
          </div>
          <div className="overflow-auto p-5">
            <pre className="text-xs leading-relaxed text-gray-800">
              <code>{activity.code.arduino}</code>
            </pre>
          </div>
        </div>
      )}

      {/* AI Help Panel — now actually calls Claude API */}
      <div className="rounded-2xl bg-white shadow-sm">
        <button
          type="button"
          onClick={() => setShowAi(!showAi)}
          className="flex w-full items-center justify-between px-5 py-4"
        >
          <div className="flex items-center gap-2">
            <span className="text-lg">✨</span>
            <div className="text-left">
              <p className="text-sm font-bold text-[#2E4862]">Ask AI for help</p>
              <p className="text-xs text-gray-400">Got an error? Ask AI what to do.</p>
            </div>
          </div>
          <span className="text-gray-400">{showAi ? '▲' : '▼'}</span>
        </button>

        {showAi && (
          <div className="border-t border-gray-100 px-5 pb-5">
            <div className="mt-3 flex gap-2">
              <input
                type="text"
                value={aiQuestion}
                onChange={(e) => setAiQuestion(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleAskAi()}
                placeholder={`e.g. "Why do I get nan readings?"`}
                className="flex-1 rounded-xl border border-gray-200 bg-[#EDEDED] px-4 py-2 text-xs text-gray-700 outline-none focus:border-[#2E4862]"
              />
              <button
                type="button"
                onClick={handleAskAi}
                disabled={aiLoading}
                className="rounded-xl bg-[#2E4862] px-4 py-2 text-xs font-semibold text-white transition-all hover:bg-[#3a5a7a] disabled:opacity-50"
              >
                {aiLoading ? '...' : 'Ask'}
              </button>
            </div>
            {aiAnswer && (
              <div className="mt-3 rounded-xl border border-blue-100 bg-blue-50 p-4">
                <p className="mb-1 text-[10px] font-semibold text-blue-500">✨ AI Assistant</p>
                <pre className="whitespace-pre-wrap text-xs leading-relaxed text-gray-700">
                  {aiAnswer}
                </pre>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Step 4: Output ──────────────────────────────────────────────────────────

function OutputStep({ activity }: { activity: any }) {
  return (
    <div className="space-y-4">
      <div className="rounded-2xl bg-white p-6 shadow-sm">
        <h2 className="mb-2 text-lg font-bold text-[#2E4862]">📊 Expected Output</h2>
        <p className="text-sm text-gray-500">{activity.output.description}</p>
      </div>

      <div className="rounded-2xl bg-[#1e2d3d] shadow-sm">
        <div className="flex items-center justify-between rounded-t-2xl border-b border-white/10 px-5 py-3">
          <p className="text-xs font-semibold text-gray-400">📟 Serial Monitor (115200 baud)</p>
          <div className="flex gap-1.5">
            <div className="h-2.5 w-2.5 rounded-full bg-red-400" />
            <div className="h-2.5 w-2.5 rounded-full bg-yellow-400" />
            <div className="h-2.5 w-2.5 rounded-full bg-green-400" />
          </div>
        </div>
        <div className="p-5">
          {activity.output.expected.map((line: string, idx: number) => (
            <p key={idx} className="font-mono text-xs text-green-400">
              {line.startsWith('(') ? (
                <span className="text-gray-500 italic">{line}</span>
              ) : (
                <>
                  <span className="mr-2 text-gray-600">{'>'}</span>
                  {line}
                </>
              )}
            </p>
          ))}
        </div>
      </div>

      <div className="rounded-2xl bg-white p-6 shadow-sm">
        <h3 className="mb-3 font-bold text-[#2E4862]">💡 Troubleshooting Tips</h3>
        <div className="space-y-2">
          {activity.output.tips.map((tip: string, idx: number) => (
            <div key={idx} className="flex items-start gap-2">
              <span className="mt-0.5 text-yellow-500">⚠</span>
              <p className="text-xs leading-relaxed text-gray-600">{tip}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-2xl bg-gradient-to-r from-[#2E4862] to-[#3a5a7a] p-6 text-white">
        <div className="text-3xl">🎉</div>
        <h3 className="mt-2 text-lg font-bold">Project Complete!</h3>
        <p className="mt-1 text-sm text-white/70">
          You finished <span className="font-semibold text-white">{activity.title}</span>. 
          Click &quot;Done&quot; below to save your progress.
        </p>
        <div className="mt-4 flex gap-2">
          <a
            href="/activities"
            className="rounded-xl bg-white/20 px-4 py-2 text-xs font-semibold transition-all hover:bg-white/30"
          >
            ← More Activities
          </a>
          <a
            href="/"
            className="rounded-xl bg-white px-4 py-2 text-xs font-semibold text-[#2E4862] transition-all hover:bg-white/90"
          >
            Open Playground →
          </a>
        </div>
      </div>
    </div>
  );
}

// ─── Main Page ───────────────────────────────────────────────────────────────

export default function ActivityDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const activity = ACTIVITIES.find((a) => a.id === params.id);

  // ← useActivityStore replaces local useState for step tracking
  const { markStepComplete, markActivityComplete, getLastStep, isCompleted } = useActivityStore();

  // Seed from persisted store so the student resumes where they left off
  const [currentStep, setCurrentStep] = useState(() => getLastStep(params.id));
  const [completed, setCompleted] = useState<number[]>(() => {
    const last = getLastStep(params.id);
    // All steps up to (but not including) current are completed
    return Array.from({ length: last }, (_, i) => i);
  });

  if (!activity) {
    return (
      <main className="min-h-screen bg-[#EDEDED]">
        <Header />
        <div className="flex flex-col items-center justify-center py-32">
          <p className="text-4xl">😕</p>
          <p className="mt-3 text-lg font-bold text-[#2E4862]">Activity not found</p>
          <button
            type="button"
            onClick={() => router.push('/activities')}
            className="mt-4 rounded-xl bg-[#2E4862] px-5 py-2 text-sm font-semibold text-white"
          >
            ← Back to Activities
          </button>
        </div>
      </main>
    );
  }

  const handleStepChange = (step: number) => {
    // Mark current step complete in both local state and persisted store
    if (!completed.includes(currentStep)) {
      setCompleted((prev) => [...prev, currentStep]);
      markStepComplete(activity.id, currentStep);
    }
    setCurrentStep(step);
  };

  const handleNext = () => {
    if (currentStep < STEPS.length - 1) handleStepChange(currentStep + 1);
  };

  const handlePrev = () => {
    if (currentStep > 0) setCurrentStep(currentStep - 1);
  };

  const handleDone = () => {
    // Mark all steps complete + mark the whole activity complete in store
    markStepComplete(activity.id, STEPS.length - 1);
    markActivityComplete(activity.id);
    router.push('/activities');
  };

  const alreadyCompleted = isCompleted(activity.id);

  return (
    <main className="min-h-screen bg-[#EDEDED]">
      <Header />
      <div className="mx-auto max-w-4xl px-6 py-8">
        {/* Breadcrumb */}
        <div className="mb-4 flex items-center gap-2 text-xs text-gray-400">
          <button
            type="button"
            onClick={() => router.push('/activities')}
            className="hover:text-[#2E4862]"
          >
            ⚡ Activities
          </button>
          <span>/</span>
          <span className="font-semibold text-[#2E4862]">{activity.title}</span>
          {alreadyCompleted && (
            <span className="ml-2 rounded-full bg-green-100 px-2 py-0.5 text-[10px] font-semibold text-green-700">
              ✓ Completed
            </span>
          )}
        </div>

        {/* Step nav + counter */}
        <div className="mb-6 flex items-center justify-between">
          <StepNav current={currentStep} onChange={handleStepChange} completed={completed} />
          <span className="text-xs text-gray-400">
            {currentStep + 1} / {STEPS.length}
          </span>
        </div>

        {/* Step content */}
        <div className="min-h-[400px]">
          {currentStep === 0 && <IntroStep activity={activity} />}
          {currentStep === 1 && <EquipmentStep activity={activity} />}
          {currentStep === 2 && <AssembleStep activity={activity} />}
          {currentStep === 3 && <CodeStep activity={activity} />}
          {currentStep === 4 && <OutputStep activity={activity} />}
        </div>

        {/* Prev / Next */}
        <div className="mt-8 flex items-center justify-between">
          <button
            type="button"
            onClick={handlePrev}
            disabled={currentStep === 0}
            className="rounded-xl bg-white px-5 py-2 text-sm font-semibold text-[#2E4862] shadow-sm transition-all hover:shadow-md disabled:opacity-30"
          >
            ← Previous
          </button>

          {currentStep < STEPS.length - 1 ? (
            <button
              type="button"
              onClick={handleNext}
              className="rounded-xl bg-[#2E4862] px-6 py-2 text-sm font-semibold text-white shadow-sm transition-all hover:bg-[#3a5a7a] hover:shadow-md"
            >
              Next: {STEPS[currentStep + 1].label} →
            </button>
          ) : (
            <button
              type="button"
              onClick={handleDone}
              className="rounded-xl bg-green-600 px-6 py-2 text-sm font-semibold text-white shadow-sm transition-all hover:bg-green-700"
            >
              {alreadyCompleted ? '✓ Done — Back to Activities' : '🎉 Mark Complete & Finish'}
            </button>
          )}
        </div>
      </div>
    </main>
  );
}