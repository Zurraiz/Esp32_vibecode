export type LessonStep = {
  id: string;
  type: 'content' | 'explore' | 'concept' | 'challenge' | 'mapping';
  title: string;
  description: string;
  content?: string;
  pdfLabel?: string;
  pdfUrl?: string;
  allowedBlocks?: string[];
  challengeBlocks?: string[];
  simulationId?: string;
  challengeStrict?: boolean;
  challengePinValues?: Record<string, number>;
  hint?: string;
};

export type Lesson = {
  id: string;
  title: string;
  description: string;
  icon: string;
  estimatedMinutes: number;
  steps: LessonStep[];
};

export type Level = {
  id: number;
  title: string;
  description: string;
  icon: string;
  isLocked: boolean;
  lessons: Lesson[];
};

export const LEVELS: Level[] = [
  {
    id: 1,
    title: 'ESP32 Fundamentals',
    description: 'Build confidence with the core concepts behind digital output and timing.',
    icon: '🟢',
    isLocked: false,
    lessons: [
      {
        id: '1-1',
        title: 'Your First Control',
        description: 'Control a basic LED sequence with proper setup and logic.',
        icon: '💡',
        estimatedMinutes: 20,
        steps: [
          {
            id: 'intro',
            type: 'content',
            title: 'Introduction',
            description: 'Learn the basics of LED control',
            content: `
<div class="space-y-8">
  <div class="group relative aspect-video bg-gray-100 rounded-2xl flex items-center justify-center text-gray-400 border-2 border-dashed border-gray-200 overflow-hidden transition-all duration-500 hover:border-blue-400 hover:bg-blue-50/30">
    <div class="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
    <span class="relative z-10 font-medium group-hover:text-blue-500 transition-colors">[IMAGE: Introduction - First ESP32 Control]</span>
  </div>
  
  <p class="text-xl text-gray-800 font-medium leading-relaxed animate-in fade-in slide-in-from-bottom-4 duration-700">
    In this lesson, you will build your first working ESP32 program.
  </p>

  <div class="relative bg-blue-50 border-l-4 border-blue-500 p-6 rounded-r-2xl transition-all duration-300 hover:shadow-md">
    <p class="text-blue-900 leading-relaxed">
      You will control a small LED using blocks and make it turn ON. This is the first time you will see how instructions you create in the system directly affect a physical (or simulated) output.
    </p>
  </div>

  <div class="space-y-5">
    <h3 class="text-xl font-bold text-[#2E4862] flex items-center gap-2">
      <span class="w-8 h-8 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center text-sm">🎯</span>
      The goal of this lesson is:
    </h3>
    <ul class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <li class="bg-white p-5 rounded-xl border border-gray-100 shadow-sm flex items-start gap-4 transition-all duration-300 hover:shadow-xl hover:border-blue-200 hover:-translate-y-1 group cursor-default">
        <div class="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center text-2xl group-hover:bg-blue-500 group-hover:text-white transition-all duration-300">📝</div>
        <div class="flex-1">
          <p class="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">Instructions</p>
          <p class="text-sm text-gray-500">Your blocks are direct instructions for the device.</p>
        </div>
      </li>
      <li class="bg-white p-5 rounded-xl border border-gray-100 shadow-sm flex items-start gap-4 transition-all duration-300 hover:shadow-xl hover:border-purple-200 hover:-translate-y-1 group cursor-default">
        <div class="w-12 h-12 rounded-full bg-purple-50 flex items-center justify-center text-2xl group-hover:bg-purple-500 group-hover:text-white transition-all duration-300">⚡</div>
        <div class="flex-1">
          <p class="font-semibold text-gray-900 group-hover:text-purple-600 transition-colors">Execution</p>
          <p class="text-sm text-gray-500">The ESP32 executes those instructions instantly.</p>
        </div>
      </li>
      <li class="bg-white p-5 rounded-xl border border-gray-100 shadow-sm flex items-start gap-4 transition-all duration-300 hover:shadow-xl hover:border-amber-200 hover:-translate-y-1 group cursor-default">
        <div class="w-12 h-12 rounded-full bg-amber-50 flex items-center justify-center text-2xl group-hover:bg-amber-500 group-hover:text-white transition-all duration-300">💡</div>
        <div class="flex-1">
          <p class="font-semibold text-gray-900 group-hover:text-amber-600 transition-colors">Visible Output</p>
          <p class="text-sm text-gray-500">The hardware output changes based on your logic.</p>
        </div>
      </li>
      <li class="bg-white p-5 rounded-xl border border-gray-100 shadow-sm flex items-start gap-4 transition-all duration-300 hover:shadow-xl hover:border-green-200 hover:-translate-y-1 group cursor-default">
        <div class="w-12 h-12 rounded-full bg-green-50 flex items-center justify-center text-2xl group-hover:bg-green-500 group-hover:text-white transition-all duration-300">🔄</div>
        <div class="flex-1">
          <p class="font-semibold text-gray-900 group-hover:text-green-600 transition-colors">Control Cycle</p>
          <p class="text-sm text-gray-500">Create a complete working cycle of behavior.</p>
        </div>
      </li>
    </ul>
  </div>
</div>
`,
          },
          {
            id: 'explore',
            type: 'explore',
            title: 'Exploration',
            description: 'Experiment freely with the available blocks',
            content: `
<div class="space-y-8">
  <div class="relative group bg-amber-50 p-6 rounded-2xl border border-amber-100 overflow-hidden transition-all duration-500 hover:shadow-lg">
    <div class="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-150 transition-transform duration-700">
      <span class="text-6xl">🚀</span>
    </div>
    <h3 class="text-xl font-bold text-amber-900 mb-2 flex items-center gap-2">
      Exploration Goal
    </h3>
    <p class="text-amber-800 leading-relaxed">
      In this phase, there is no fixed task. You are encouraged to experiment freely with the blocks to understand how each one behaves.
    </p>
  </div>

  <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
    <div class="p-6 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 group">
      <h4 class="font-bold text-[#2E4862] mb-4 flex items-center gap-2">
        <span class="w-6 h-6 rounded bg-blue-50 text-blue-500 flex items-center justify-center text-xs group-hover:bg-blue-500 group-hover:text-white transition-all">✓</span>
        You can:
      </h4>
      <ul class="text-sm text-gray-600 space-y-3">
        <li class="flex items-center gap-2 hover:translate-x-1 transition-transform cursor-default">
          <span class="w-1.5 h-1.5 rounded-full bg-blue-400"></span>
          Connect blocks in any order
        </li>
        <li class="flex items-center gap-2 hover:translate-x-1 transition-transform cursor-default">
          <span class="w-1.5 h-1.5 rounded-full bg-blue-400"></span>
          Try different combinations of HIGH and LOW
        </li>
        <li class="flex items-center gap-2 hover:translate-x-1 transition-transform cursor-default">
          <span class="w-1.5 h-1.5 rounded-full bg-blue-400"></span>
          Change the sequence of actions
        </li>
      </ul>
    </div>

    <div class="p-6 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 group">
      <h4 class="font-bold text-[#2E4862] mb-4 flex items-center gap-2">
        <span class="w-6 h-6 rounded bg-amber-50 text-amber-500 flex items-center justify-center text-xs group-hover:bg-amber-500 group-hover:text-white transition-all">?</span>
        Questions to ask:
      </h4>
      <ul class="text-sm text-gray-600 space-y-3">
        <li class="p-2 rounded-lg hover:bg-amber-50 transition-colors cursor-default">
          What happens if you only use HIGH?
        </li>
        <li class="p-2 rounded-lg hover:bg-amber-50 transition-colors cursor-default">
          What happens if you remove the delay?
        </li>
        <li class="p-2 rounded-lg hover:bg-amber-50 transition-colors cursor-default">
          What happens if LOW comes before HIGH?
        </li>
      </ul>
    </div>
  </div>

  <div class="bg-slate-900 text-slate-300 p-5 rounded-xl flex items-center gap-4 transition-all hover:scale-[1.01]">
    <div class="text-2xl animate-pulse">💡</div>
    <p class="text-sm">
      <strong>Purpose:</strong> Build intuition before formal explanation. Observe patterns and outcomes — there are no wrong answers here!
    </p>
  </div>
</div>
`,
            allowedBlocks: ['dw_high', 'dw_low', 'pinMode', 'delay_ms'],
          },
          {
            id: 'concept',
            type: 'concept',
            title: 'Concept Building',
            description: 'Understanding ESP32, Pins, and Digital Control',
            simulationId: 'missing-delay',
            content: `
<div class="space-y-12 pb-12">
  <!-- 3.1 What is ESP32? -->
  <section class="space-y-4 group">
    <div class="flex items-center gap-3">
      <span class="text-2xl group-hover:rotate-12 transition-transform duration-500">⚙️</span>
      <h3 class="text-2xl font-bold text-[#2E4862]">3.1 What is ESP32?</h3>
    </div>
    <div class="p-6 rounded-2xl bg-white border border-gray-100 shadow-sm transition-all duration-500 hover:shadow-xl hover:border-blue-100">
      <p class="text-gray-700 leading-relaxed text-lg">
        The ESP32 is a small programmable <strong>microcontroller</strong>. Think of it as a compact computer designed specifically for control tasks.
      </p>
      
      <div class="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div class="relative p-5 rounded-2xl bg-slate-50 border border-slate-200 group/item overflow-hidden transition-all hover:bg-white hover:shadow-md">
          <div class="absolute top-0 right-0 p-3 text-slate-200 group-hover/item:text-slate-400 transition-colors">💻</div>
          <p class="font-bold text-slate-700 mb-2">Standard Computer</p>
          <p class="text-sm text-slate-500 leading-relaxed">Designed for general-purpose tasks like browsing, gaming, or running complex applications.</p>
        </div>
        <div class="relative p-5 rounded-2xl bg-blue-50 border border-blue-200 group/item overflow-hidden transition-all hover:bg-white hover:shadow-md">
          <div class="absolute top-0 right-0 p-3 text-blue-200 group-hover/item:text-blue-400 transition-colors">⚡</div>
          <p class="font-bold text-blue-700 mb-2">ESP32 (Microcontroller)</p>
          <p class="text-sm text-blue-600 leading-relaxed">Designed for <strong>specific control tasks</strong>. Its main purpose is to receive instructions and control physical outputs repeatedly.</p>
        </div>
      </div>
    </div>
  </section>

  <!-- 3.2 What are Blocks? -->
  <section class="space-y-6">
    <div class="flex items-center gap-3">
      <span class="text-2xl">🧩</span>
      <h3 class="text-2xl font-bold text-[#2E4862]">3.2 What are Blocks?</h3>
    </div>
    <div class="space-y-4">
      <p class="text-gray-700 text-lg leading-relaxed">
        In this system, you use blocks instead of traditional code. Each block represents a <strong>specific instruction</strong> that the ESP32 can understand.
      </p>
      
      <div class="bg-indigo-50 border border-indigo-100 p-6 rounded-2xl space-y-4">
        <div class="flex items-start gap-4">
          <div class="w-10 h-10 rounded-full bg-indigo-600 text-white flex items-center justify-center shrink-0 shadow-lg">1</div>
          <p class="text-indigo-900 leading-relaxed pt-1">
            <strong>Visual Programming:</strong> Much like assembling building pieces, you drag and drop blocks from the sidebar into the workspace.
          </p>
        </div>
        <div class="flex items-start gap-4">
          <div class="w-10 h-10 rounded-full bg-indigo-600 text-white flex items-center justify-center shrink-0 shadow-lg">2</div>
          <p class="text-indigo-900 leading-relaxed pt-1">
            <strong>Sequence Matters:</strong> Blocks are executed from <strong>top to bottom</strong>. The order in which you arrange them determines what the ESP32 does first, second, and so on.
          </p>
        </div>
      </div>

      <div class="relative group aspect-video bg-gray-100 rounded-3xl flex items-center justify-center text-gray-400 border-2 border-dashed border-gray-200 transition-all duration-500 hover:border-indigo-400 hover:bg-indigo-50/20 shadow-inner">
        [IMAGE: Block Based Programming Interface]
      </div>
    </div>
  </section>

  <!-- 3.3 What is a Pin? -->
  <section class="space-y-6">
    <div class="flex items-center gap-3">
      <span class="text-2xl">🔌</span>
      <h3 class="text-2xl font-bold text-[#2E4862]">3.3 What is a Pin?</h3>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
      <div class="space-y-6">
        <p class="text-gray-700 leading-relaxed text-lg">
          A pin is a physical connection point on the ESP32. Each pin can be thought of as a <strong>control interface</strong> between the ESP32 and external components.
        </p>
        
        <details class="group bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all">
          <summary class="flex items-center justify-between p-4 cursor-pointer font-bold text-[#2E4862] hover:bg-gray-50 list-none">
            <span>How do Pins work with LEDs?</span>
            <span class="transition-transform group-open:rotate-180">▼</span>
          </summary>
          <div class="p-4 pt-0 text-sm text-gray-600 border-t border-gray-50 leading-relaxed">
            The ESP32 controls whether electricity flows to the LED through the pin. This determines whether the LED turns <strong>ON</strong> or <strong>OFF</strong>. In this lesson, we use the pin as an <strong>output</strong>.
          </div>
        </details>
      </div>
      <div class="aspect-square bg-gray-100 rounded-3xl flex items-center justify-center text-gray-400 border-2 border-dashed border-gray-200 transition-all hover:border-gray-400 hover:bg-gray-50 group">
         <span class="group-hover:scale-110 transition-transform">[IMAGE: ESP32 Pinout]</span>
      </div>
    </div>
  </section>

  <!-- 3.4 Why do we set Pin Mode? -->
  <section class="space-y-6">
    <div class="flex items-center gap-3">
      <span class="text-2xl">📌</span>
      <h3 class="text-2xl font-bold text-[#2E4862]">3.4 Why do we set Pin Mode?</h3>
    </div>
    <div class="p-6 rounded-3xl bg-orange-50 border border-orange-200 transition-all hover:bg-white hover:shadow-xl">
      <p class="text-gray-800 text-lg leading-relaxed mb-4">
        Before using a pin, we must define its behaviour. This is done using <strong>"Set Pin Mode"</strong>.
      </p>
      <div class="p-4 bg-white rounded-xl border border-orange-100 shadow-sm">
        <h4 class="font-bold text-orange-700 mb-1">Output Mode</h4>
        <p class="text-sm text-orange-600 leading-relaxed">
          The ESP32 will <strong>send signals out</strong> through the pin. This step is required because the ESP32 needs to know how each pin will be used before executing instructions.
        </p>
      </div>
    </div>
  </section>

  <!-- 3.5 What is Digital Write (HIGH and LOW)? -->
  <section class="space-y-6">
    <div class="flex items-center gap-3">
      <span class="text-2xl">⚡</span>
      <h3 class="text-2xl font-bold text-[#2E4862]">3.5 Digital Write (HIGH and LOW)</h3>
    </div>
    <p class="text-gray-700 text-lg leading-relaxed">
      Digital signals have only two states: <strong>HIGH</strong> and <strong>LOW</strong>. This is like a light switch — it's either fully ON or fully OFF.
    </p>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div class="group relative bg-white p-8 rounded-3xl border-2 border-green-100 transition-all duration-300 hover:bg-green-50 hover:border-green-300 hover:-translate-y-2 cursor-default">
        <div class="absolute top-4 right-4 text-4xl opacity-20 group-hover:opacity-100 group-hover:scale-110 transition-all">💡</div>
        <h4 class="text-3xl font-black text-green-600 mb-2">HIGH</h4>
        <div class="space-y-1">
          <p class="text-green-800 font-bold">Signal is ON</p>
          <p class="text-sm text-green-600">Electrical signal flows through the pin, turning the LED <strong>ON</strong>.</p>
        </div>
      </div>
      <div class="group relative bg-white p-8 rounded-3xl border-2 border-slate-100 transition-all duration-300 hover:bg-slate-50 hover:border-slate-300 hover:-translate-y-2 cursor-default">
        <div class="absolute top-4 right-4 text-4xl opacity-20 group-hover:opacity-100 group-hover:scale-110 transition-all">🌑</div>
        <h4 class="text-3xl font-black text-slate-600 mb-2">LOW</h4>
        <div class="space-y-1">
          <p class="text-slate-800 font-bold">Signal is OFF</p>
          <p class="text-sm text-slate-600">No current flows, turning the LED <strong>OFF</strong>.</p>
        </div>
      </div>
    </div>
  </section>

  <!-- 3.6 What actually happens when your program runs? -->
  <section class="space-y-6">
    <div class="flex items-center gap-3">
      <span class="text-2xl">🔄</span>
      <h3 class="text-2xl font-bold text-[#2E4862]">3.6 What actually happens?</h3>
    </div>
    <div class="p-6 rounded-3xl bg-blue-50 border border-blue-200 space-y-6 shadow-sm">
      <p class="text-blue-900 font-medium leading-relaxed">
        When you connect your blocks, the ESP32 executes them in order. Even though you only created the sequence once, the ESP32 keeps running it <strong>repeatedly</strong>.
      </p>
      
      <div class="space-y-3">
        <div class="flex items-center gap-4 bg-white p-4 rounded-xl shadow-sm border border-blue-100 transition-all hover:translate-x-2">
          <span class="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold">1</span>
          <p class="text-sm text-gray-800">The ESP32 reads the first block and sets the pin mode to output.</p>
        </div>
        <div class="flex items-center gap-4 bg-white p-4 rounded-xl shadow-sm border border-blue-100 transition-all hover:translate-x-2">
          <span class="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold">2</span>
          <p class="text-sm text-gray-800">It moves to the next block and turns the LED <strong>ON</strong> at Pin 2.</p>
        </div>
        <div class="flex items-center gap-4 bg-white p-4 rounded-xl shadow-sm border border-blue-100 transition-all hover:translate-x-2">
          <span class="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold">3</span>
          <p class="text-sm text-gray-800">It moves to the next block and turns the LED <strong>OFF</strong> at Pin 2.</p>
        </div>
      </div>
      
      <div class="bg-white/60 p-3 rounded-lg border border-blue-100">
        <p class="text-blue-700 text-sm font-bold italic flex items-center gap-2">
          <span class="animate-pulse">✨</span>
          This repetition is automatic. This is why the LED keeps blinking!
        </p>
      </div>
    </div>
  </section>

  <!-- 3.8 Key Insight -->
  <section class="relative bg-slate-900 text-white p-10 rounded-[2.5rem] shadow-2xl overflow-hidden group">
    <div class="absolute top-0 right-0 w-80 h-80 bg-white/5 rounded-full -mr-40 -mt-40 transition-transform duration-1000 group-hover:scale-125"></div>
    <div class="relative z-10">
      <h3 class="text-3xl font-black mb-6 flex items-center gap-3">
        <span class="animate-bounce text-yellow-400">💡</span>
        3.8 Key Insight
      </h3>
      <div class="space-y-4">
        <p class="text-2xl text-white font-medium leading-tight">
          You are not manually repeating actions. The system is repeating them for you.
        </p>
        <p class="text-lg text-slate-300 leading-relaxed">
          Your block sequence becomes a <strong>cycle</strong> that runs continuously. This is the foundation of all embedded systems behavior.
        </p>
      </div>
      
      <div class="mt-10 pt-10 border-t border-white/10 flex flex-wrap gap-8">
        <div class="space-y-1">
          <p class="text-[10px] text-slate-500 uppercase tracking-widest font-black">Concept</p>
          <p class="text-lg font-bold">Automation</p>
        </div>
        <div class="space-y-1">
          <p class="text-[10px] text-slate-500 uppercase tracking-widest font-black">Mechanism</p>
          <p class="text-lg font-bold">Main Loop</p>
        </div>
        <div class="space-y-1">
          <p class="text-[10px] text-slate-500 uppercase tracking-widest font-black">Outcome</p>
          <p class="text-lg font-bold">Infinite Cycle</p>
        </div>
      </div>
    </div>
  </section>
</div>
`,
          },
          {
            id: 'challenge',
            type: 'challenge',
            title: 'Student Task',
            description: 'Create Your First LED Control System',
            content: `
<div class="space-y-8">
  <div class="p-8 rounded-3xl bg-gradient-to-br from-[#2E4862] to-[#3a5a7a] text-white shadow-xl transform transition-transform hover:scale-[1.01]">
    <h3 class="text-2xl font-bold mb-3 flex items-center gap-3">
      <span class="animate-pulse w-3 h-3 rounded-full bg-green-400"></span>
      Objective
    </h3>
    <p class="text-blue-100 text-lg">Create a system that turns an LED ON and then OFF.</p>
  </div>

  <div class="space-y-4">
    <h4 class="text-xl font-bold text-[#2E4862] px-2">Requirements:</h4>
    <div class="grid grid-cols-1 gap-3">
      <div class="flex items-center gap-4 p-5 rounded-2xl bg-white border border-gray-100 hover:border-blue-200 transition-all hover:shadow-md group">
        <span class="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center font-black group-hover:bg-blue-500 group-hover:text-white transition-all">1</span>
        <p class="text-gray-700 font-medium">Use <strong>Set Pin Mode</strong> correctly (Pin 2, OUTPUT)</p>
      </div>
      <div class="flex items-center gap-4 p-5 rounded-2xl bg-white border border-gray-100 hover:border-blue-200 transition-all hover:shadow-md group">
        <span class="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center font-black group-hover:bg-blue-500 group-hover:text-white transition-all">2</span>
        <p class="text-gray-700 font-medium">Use <strong>Digital Write</strong> HIGH and LOW</p>
      </div>
      <div class="flex items-center gap-4 p-5 rounded-2xl bg-white border border-gray-100 hover:border-blue-200 transition-all hover:shadow-md group">
        <span class="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center font-black group-hover:bg-blue-500 group-hover:text-white transition-all">3</span>
        <p class="text-gray-700 font-medium">Ensure correct <strong>order of execution</strong></p>
      </div>
    </div>
  </div>

  <div class="bg-amber-50 p-6 rounded-2xl border border-amber-100 flex items-start gap-4">
    <div class="text-3xl">👀</div>
    <div>
      <h4 class="font-bold text-amber-900 mb-1">Expected Behavior:</h4>
      <p class="text-amber-800">The LED should turn ON, then immediately turn OFF. The system will repeat this cycle indefinitely.</p>
    </div>
  </div>
</div>
`,
            allowedBlocks: ['pinMode', 'dw_high', 'dw_low'],
            challengeBlocks: ['pinMode', 'dw_high', 'dw_low'],
            simulationId: 'missing-delay',
            challengeStrict: false,
            hint: 'Set the pin mode first, then turn the LED on, then turn it off',
          },
          {
            id: 'mapping',
            type: 'mapping',
            title: 'Arduino Mapping',
            description: 'See how your blocks become real C++ code',
          },
        ],
      },
      {
        id: '1-2',
        title: 'Making Changes Visible (Using Delays)',
        description: 'Understand timing control for smooth and readable behavior.',
        icon: '⏱️',
        estimatedMinutes: 15,
        steps: [
          {
            id: 'intro',
            type: 'content',
            title: 'Introduction',
            description: 'Learn how timing changes program behavior',
            pdfLabel: 'Level1_Delays_Intro.pdf',
            pdfUrl: '/pdfs/level-1/lesson-1-2/introduction.pdf',
          },
          {
            id: 'explore',
            type: 'explore',
            title: 'Exploration',
            description: 'Experiment with short and long delays on LED output',
            allowedBlocks: ['pinMode', 'dw_high', 'dw_low', 'delay_ms', 'delay_sec'],
          },
          {
            id: 'concept',
            type: 'concept',
            title: 'Concept Building',
            description: 'Blocking delays vs responsive loops',
            pdfLabel: 'Timing_Control_Concepts.pdf',
            pdfUrl: '/pdfs/level-1/lesson-1-2/concept-building.pdf',
          },
          {
            id: 'challenge',
            type: 'challenge',
            title: 'Student Task',
            description: 'Build a proper blinking LED program with delays',
            allowedBlocks: ['pinMode', 'dw_high', 'dw_low', 'delay_ms', 'delay_sec'],
            challengeBlocks: ['pinMode', 'dw_high', 'delay_ms', 'dw_low', 'delay_ms'],
            simulationId: 'led-delay',
            challengeStrict: false,
            hint: 'Set the pin mode, turn the LED on, wait, turn it off, then wait again',
          },
          {
            id: 'mapping',
            type: 'mapping',
            title: 'Arduino Mapping',
            description: 'See how your blocks become real C++ code',
          },
        ],
      },
    ],
  },
  {
    id: 2,
    title: 'Sensors & Input',
    description: 'Read buttons and environmental sensors to make your projects reactive.',
    icon: '🔒',
    isLocked: true,
    lessons: [
      {
        id: '2-1',
        title: 'Reading a Button',
        description: 'Capture digital input from a button and react in code.',
        icon: '🔘',
        estimatedMinutes: 20,
        steps: [
          {
            id: 'intro',
            type: 'content',
            title: 'Introduction',
            description: 'Understand digital input with pull-up and pull-down logic',
            content: '<p>Buttons are your first step into interactive systems...</p>',
          },
        ],
      },
      {
        id: '2-2',
        title: 'Temperature Sensor',
        description: 'Read and use temperature values from a connected sensor.',
        icon: '🌡️',
        estimatedMinutes: 25,
        steps: [
          {
            id: 'intro',
            type: 'content',
            title: 'Introduction',
            description: 'Learn how to sample and interpret temperature data',
            content: '<p>Temperature sensors help your projects sense the environment...</p>',
          },
        ],
      },
    ],
  },
  {
    id: 3,
    title: 'WiFi & Cloud',
    description: 'Connect ESP32 projects to networks and cloud messaging workflows.',
    icon: '🔒',
    isLocked: true,
    lessons: [
      {
        id: '3-1',
        title: 'Connect to WiFi',
        description: 'Join a network and verify connectivity from your device.',
        icon: '📶',
        estimatedMinutes: 20,
        steps: [
          {
            id: 'intro',
            type: 'content',
            title: 'Introduction',
            description: 'Set up reliable WiFi connectivity for IoT projects',
            content: '<p>WiFi unlocks communication between your ESP32 and web services...</p>',
          },
        ],
      },
      {
        id: '3-2',
        title: 'MQTT Messaging',
        description: 'Publish and subscribe to cloud topics for real-time IoT control.',
        icon: '☁️',
        estimatedMinutes: 30,
        steps: [
          {
            id: 'intro',
            type: 'content',
            title: 'Introduction',
            description: 'Learn lightweight publish/subscribe communication',
            content: '<p>MQTT is a common protocol for efficient IoT messaging...</p>',
          },
        ],
      },
    ],
  },
];
