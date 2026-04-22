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
