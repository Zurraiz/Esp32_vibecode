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
  explorationSimulationId?: string;
  challengeSimulationId?: string;
  mappingSimulationId?: string;
  mappingCodeComponent?: string;
  showSerialOutput?: boolean;
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
        title: 'Your First Blink',
        description: 'Control a basic LED sequence with proper setup and timing.',
        icon: '💡',
        estimatedMinutes: 20,
        steps: [
          {
            id: 'intro',
            type: 'content',
            title: 'Introduction',
            description: 'Learn the basics of LED control',
            pdfLabel: 'Level1_LED_Basics.pdf',
            pdfUrl: '/pdfs/level-1/lesson-1-1/introduction.pdf',
          },
          {
            id: 'explore',
            type: 'explore',
            title: 'Exploration',
            description: 'Try turning the LED on and off',
            allowedBlocks: ['dw_high', 'dw_low', 'pinMode'],
          },
          {
            id: 'concept',
            type: 'concept',
            title: 'Concept Building',
            description: 'Why microcontrollers need delays',
            pdfLabel: 'Hardware_Logic_DeepDive.pdf',
            pdfUrl: '/pdfs/level-1/lesson-1-1/concept-building.pdf',
          },
          {
            id: 'challenge',
            type: 'challenge',
            title: 'Student Task',
            description: 'Build a proper blinking LED program',
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
      {
        id: '1-3',
        title: 'What Just Happened?',
        description: 'Understanding sequential execution and state',
        icon: '🔁',
        estimatedMinutes: 20,
        steps: [
          {
            id: 'intro',
            type: 'content',
            title: 'Introduction',
            description: 'How the ESP32 follows your instructions',
            pdfUrl: '/pdfs/level-1/lesson-1-3/introduction.pdf',
          },
          {
            id: 'explore',
            type: 'explore',
            title: 'Exploration',
            description: 'Watch the execution cycle in action',
            explorationSimulationId: 'cycle-timeline',
          },
          {
            id: 'concept',
            type: 'concept',
            title: 'Concept Building',
            description: 'Sequential execution, state, and order',
            pdfUrl: '/pdfs/level-1/lesson-1-3/concept-building.pdf',
          },
          {
            id: 'challenge',
            type: 'challenge',
            title: 'Student Task',
            description: 'Build your own loop and observe the behavior',
            challengeSimulationId: 'infinite-loop',
            allowedBlocks: ['pinMode', 'dw_high', 'dw_low', 'delay_ms'],
            challengeBlocks: ['pinMode', 'dw_high', 'dw_low'],
            challengeStrict: false,
            hint: 'Try different block orders and observe how the LED behavior changes',
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
        id: '1-4',
        title: 'Understanding Program Flow',
        description: 'How Setup and Loop structure every ESP32 program',
        icon: '⚙️',
        estimatedMinutes: 20,
        steps: [
          {
            id: 'intro',
            type: 'content',
            title: 'Introduction',
            description: 'Why does the program repeat automatically?',
            pdfUrl: '/pdfs/level-1/lesson-1-4/introduction.pdf',
          },
          {
            id: 'explore',
            type: 'explore',
            title: 'Exploration',
            description: 'Spot the difference between Setup and Loop',
            explorationSimulationId: 'setup-vs-loop',
          },
          {
            id: 'concept',
            type: 'concept',
            title: 'Concept Building',
            description: 'Setup runs once. Loop runs forever.',
            pdfUrl: '/pdfs/level-1/lesson-1-4/concept-building.pdf',
          },
          {
            id: 'challenge',
            type: 'challenge',
            title: 'Student Task',
            description: 'Build a program that blinks an LED continuously',
            allowedBlocks: ['pinMode', 'dw_high', 'dw_low', 'delay_ms'],
            challengeBlocks: ['pinMode', 'dw_high', 'delay_ms', 'dw_low', 'delay_ms'],
            challengeStrict: false,
            simulationId: 'program-flow',
            hint: 'Make sure to set the pin mode, then turn the LED on and off with delays in between',
          },
          {
            id: 'mapping',
            type: 'mapping',
            title: 'Arduino Mapping',
            description: 'See how your blocks map to setup() and loop()',
          },
        ],
      },
    ],
  },
  {
    id: 2,
    title: 'Output & Communication',
    description: 'Learn how to send data, read sensors, and communicate between your ESP32 and the world.',
    icon: '📡',
    isLocked: false,
    lessons: [
      {
        id: '2-1',
        title: 'Seeing Output',
        description: 'Make the ESP32 send messages using Serial communication',
        icon: '📟',
        estimatedMinutes: 20,
        steps: [
          {
            id: 'intro',
            type: 'content',
            title: 'Introduction',
            description: 'How the ESP32 communicates with your computer',
            pdfUrl: '/pdfs/level-2/lesson-2-1/introduction.pdf',
          },
          {
            id: 'explore',
            type: 'explore',
            title: 'Exploration',
            description: 'Watch data flow from blocks to Serial Monitor',
            explorationSimulationId: 'serial-explorer',
          },
          {
            id: 'concept',
            type: 'concept',
            title: 'Concept Building',
            description: 'Serial communication, output, and debugging',
            pdfUrl: '/pdfs/level-2/lesson-2-1/concept-building.pdf',
          },
          {
            id: 'challenge',
            type: 'challenge',
            title: 'Student Task',
            description: 'Create your first Serial output program',
            allowedBlocks: ['serial_begin', 'serial_print', 'delay_ms', 'delay_sec'],
            challengeBlocks: ['serial_begin', 'serial_print', 'delay_ms'],
            challengeStrict: false,
            simulationId: 'serial-monitor',
            showSerialOutput: true,
            hint: 'Start Serial first, then print your message, then add a delay',
          },
          {
            id: 'mapping',
            type: 'mapping',
            title: 'Arduino Mapping',
            description: 'See how your blocks become Serial communication code',
            showSerialOutput: true,
          },
        ],
      },
      {
        id: '2-2',
        title: 'Variables',
        description: 'Store, update, and use values in your program',
        icon: '📦',
        estimatedMinutes: 25,
        steps: [
          {
            id: 'intro',
            type: 'content',
            title: 'Introduction',
            description: 'How programs remember and update information',
            pdfUrl: '/pdfs/level-2/lesson-2-2/introduction.pdf',
          },
          {
            id: 'explore',
            type: 'explore',
            title: 'Exploration',
            description: 'Create variables and watch how values are stored and updated',
            explorationSimulationId: 'variable-box',
          },
          {
            id: 'concept',
            type: 'concept',
            title: 'Concept Building',
            description: 'Variable types, storage, and updating values',
            pdfUrl: '/pdfs/level-2/lesson-2-2/concept-building.pdf',
          },
          {
            id: 'challenge',
            type: 'challenge',
            title: 'Student Task',
            description: 'Build a counter that increments and prints to Serial Monitor',
            allowedBlocks: ['var_int', 'var_add', 'serial_begin', 'serial_printvar', 'serial_println', 'delay_ms', 'delay_sec'],
            challengeBlocks: ['var_int', 'serial_begin', 'serial_printvar', 'var_add', 'delay_ms'],
            challengeStrict: false,
            simulationId: 'counter',
            showSerialOutput: true,
            hint: 'Important: the variable name in var_int, var_add, and serial_printvar must all match exactly. Create a variable first, start Serial, print the variable, then add to it, then delay',
          },
          {
            id: 'mapping',
            type: 'mapping',
            title: 'Arduino Mapping',
            description: 'See how variables and Serial output become real C++ code',
            showSerialOutput: true,
          },
        ],
      },
      {
        id: '2-3',
        title: 'Introducing Inputs',
        description: 'Use a button to send signals to your ESP32',
        icon: '🔘',
        estimatedMinutes: 25,
        steps: [
          {
            id: 'intro',
            type: 'content',
            title: 'Introduction',
            description: 'How external devices send signals to the ESP32',
            pdfUrl: '/pdfs/level-2/lesson-2-3/introduction.pdf',
          },
          {
            id: 'explore',
            type: 'explore',
            title: 'Exploration',
            description: 'See how a button press becomes an electrical signal',
            explorationSimulationId: 'button-signal',
          },
          {
            id: 'concept',
            type: 'concept',
            title: 'Concept Building',
            description: 'Inputs, signals, and reading pin states',
            pdfUrl: '/pdfs/level-2/lesson-2-3/concept-building.pdf',
          },
          {
            id: 'challenge',
            type: 'challenge',
            title: 'Student Task',
            description: 'Read a button and display its state on the Serial Monitor',
            allowedBlocks: ['btn_read', 'serial_begin', 'serial_print', 'serial_printvar', 'delay_ms', 'delay_sec'],
            challengeBlocks: ['btn_read', 'serial_begin', 'serial_printvar', 'delay_ms'],
            challengeStrict: false,
            simulationId: 'button-monitor',
            showSerialOutput: true,
            hint: 'Read the button into a variable first, start Serial, then print that variable — make sure the variable name matches in both blocks',
          },
          {
            id: 'mapping',
            type: 'mapping',
            title: 'Arduino Mapping',
            description: 'See how button reading becomes real C++ code',
            mappingSimulationId: 'signal-analyzer',
            mappingCodeComponent: 'button',
          },
        ],
      },
      {
        id: '2-4',
        title: 'Making Decisions',
        description: 'Use IF logic to control outputs based on input',
        icon: '🔀',
        estimatedMinutes: 25,
        steps: [
          {
            id: 'intro',
            type: 'content',
            title: 'Introduction',
            description: 'How the ESP32 chooses between different actions',
            pdfUrl: '/pdfs/level-2/lesson-2-4/introduction.pdf',
          },
          {
            id: 'explore',
            type: 'explore',
            title: 'Exploration',
            description: 'See how conditions create two possible paths',
            explorationSimulationId: 'decision-flow',
          },
          {
            id: 'concept',
            type: 'concept',
            title: 'Concept Building',
            description: 'IF conditions, TRUE/FALSE evaluation, branching',
            pdfUrl: '/pdfs/level-2/lesson-2-4/concept-building.pdf',
          },
          {
            id: 'challenge',
            type: 'challenge',
            title: 'Student Task',
            description: 'Control an LED using a button and IF condition',
            allowedBlocks: ['btn_read', 'pinMode', 'dw_high', 'dw_low', 'if_block', 'else_block', 'end_if'],
            challengeBlocks: ['btn_read', 'if_block', 'dw_high', 'else_block', 'dw_low', 'end_if'],
            challengeStrict: false,
            simulationId: 'if-decision',
            hint: 'Read the button into btnState, then use if_block with condition "btnState == HIGH", place dw_high inside IF and dw_low inside ELSE, close with end_if',
          },
          {
            id: 'mapping',
            type: 'mapping',
            title: 'Arduino Mapping',
            description: 'See how IF logic becomes real C++ code',
            mappingSimulationId: 'if-decision',
            mappingCodeComponent: 'if',
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
