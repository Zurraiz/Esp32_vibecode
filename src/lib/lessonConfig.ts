import { LECTURES_DATA } from './lecturesData';

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
            description: 'Learn the basics of LED control and how sensors read the world',
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
    title: 'Analog Input & PWM',
    description: 'Read continuous values from sensors and control outputs like LED brightness and motor speed with precision.',
    icon: '🟡',
    isLocked: false,
    lessons: [
      {
        id: '3-1',
        title: 'Reading Changing Values',
        description: 'Read analog inputs from photoresistors and potentiometers to measure continuous variation.',
        icon: '📊',
        estimatedMinutes: 20,
        steps: [
          {
            id: 'intro',
            type: 'content',
            title: 'Introduction',
            description: 'Learn how to read changing values (analog input)',
          },
          {
            id: 'explore',
            type: 'explore',
            title: 'Exploration',
            description: 'Connect a photoresistor and potentiometer and read their values',
            explorationSimulationId: 'analog-oscilloscope',
            allowedBlocks: ['analog_read', 'serial_begin', 'serial_printvar', 'delay_ms'],
          },
          {
            id: 'concept',
            type: 'concept',
            title: 'Concept Building',
            description: 'Understand analog sensors, voltages, and digital range',
          },
          {
            id: 'challenge',
            type: 'challenge',
            title: 'Student Task',
            description: 'Build a dual sensor reader program',
            allowedBlocks: ['analog_read', 'serial_begin', 'serial_printvar', 'delay_ms'],
            challengeBlocks: ['serial_begin', 'analog_read', 'serial_printvar', 'analog_read', 'serial_printvar', 'delay_ms'],
            simulationId: 'dual-sensor',
            showSerialOutput: true,
            hint: 'In loop, read light sensor (Pin 34) into lightVal and potentiometer (Pin 35) into potVal. Print both to Serial Monitor.',
          },
          {
            id: 'mapping',
            type: 'mapping',
            title: 'Arduino Mapping',
            description: 'See how analogRead maps to real C++ code',
            mappingSimulationId: 'dual-sensor',
            mappingCodeComponent: 'analog',
            showSerialOutput: true,
          },
        ],
      },
      {
        id: '3-2',
        title: 'Controlling Intensity (PWM)',
        description: 'Fade LEDs and control analog outputs beyond digital ON/OFF using PWM.',
        icon: '🔆',
        estimatedMinutes: 20,
        steps: [
          {
            id: 'intro',
            type: 'content',
            title: 'Introduction',
            description: 'Learn to adjust LED brightness using Pulse Width Modulation (PWM)',
          },
          {
            id: 'explore',
            type: 'explore',
            title: 'Exploration',
            description: 'Observe the PWM wave form and adjust the duty cycle',
            explorationSimulationId: 'pwm-wave',
            allowedBlocks: ['pwm_setup', 'pwm_write', 'delay_ms'],
          },
          {
            id: 'concept',
            type: 'concept',
            title: 'Concept Building',
            description: 'Learn about duty cycles, frequencies, and analogWrite',
          },
          {
            id: 'challenge',
            type: 'challenge',
            title: 'Student Task',
            description: 'Control LED brightness with a potentiometer',
            allowedBlocks: ['analog_read', 'pwm_setup', 'pwm_write', 'delay_ms'],
            challengeBlocks: ['pwm_setup', 'analog_read', 'pwm_write', 'delay_ms'],
            simulationId: 'sensor-brightness',
            hint: 'Set up PWM on Pin 2 first. In loop, read analog Pin 35 into potVal, then set Pin 2 brightness to potVal.',
          },
          {
            id: 'mapping',
            type: 'mapping',
            title: 'Arduino Mapping',
            description: 'See how PWM setup and write map to C++ code',
            mappingSimulationId: 'sensor-brightness',
            mappingCodeComponent: 'pwm',
          },
        ],
      },
      {
        id: '3-3',
        title: 'Translating Values (Mapping)',
        description: 'Translate input ranges (e.g. 0-4095) to output ranges (e.g. 0-255) using mathematics.',
        icon: '🗺️',
        estimatedMinutes: 20,
        steps: [
          {
            id: 'intro',
            type: 'content',
            title: 'Introduction',
            description: 'Understand why we need to match sensor ranges to outputs',
          },
          {
            id: 'explore',
            type: 'explore',
            title: 'Exploration',
            description: 'Interact with the interactive map block and observe mapping results',
            explorationSimulationId: 'mapping',
            allowedBlocks: ['map_val', 'delay_ms'],
          },
          {
            id: 'concept',
            type: 'concept',
            title: 'Concept Building',
            description: 'Learn the mathematical map() function and linear interpolation',
          },
          {
            id: 'challenge',
            type: 'challenge',
            title: 'Student Task',
            description: 'Map a potentiometer (0-4095) to an LED brightness (0-255)',
            allowedBlocks: ['analog_read', 'map_val', 'pwm_setup', 'pwm_write', 'delay_ms'],
            challengeBlocks: ['pwm_setup', 'analog_read', 'map_val', 'pwm_write', 'delay_ms'],
            simulationId: 'mapped-sensor',
            hint: 'Set up PWM on Pin 2. In loop, read Pin 35 into potVal. Map potVal from 0-4095 to 0-255 into brightness. Write brightness to Pin 2.',
          },
          {
            id: 'mapping',
            type: 'mapping',
            title: 'Arduino Mapping',
            description: 'See how map() and pwmWrite map to C++ code',
            mappingSimulationId: 'mapped-sensor',
            mappingCodeComponent: 'mapping',
          },
        ],
      },
      {
        id: '3-4',
        title: 'Real-Time Control System',
        description: 'Combine analog inputs, mapping, and logic to build intelligent responsive control systems.',
        icon: '⚙️',
        estimatedMinutes: 25,
        steps: [
          {
            id: 'intro',
            type: 'content',
            title: 'Introduction',
            description: 'Build responsive automatic control loops',
          },
          {
            id: 'explore',
            type: 'explore',
            title: 'Exploration',
            description: 'Observe real-time feedback loops and threshold actions',
            explorationSimulationId: 'realtime-control',
            allowedBlocks: ['analog_read', 'map_val', 'pwm_write', 'if_block', 'else_block', 'end_if', 'delay_ms'],
          },
          {
            id: 'concept',
            type: 'concept',
            title: 'Concept Building',
            description: 'Learn feedback loops, automated light controllers, and safety thresholds',
          },
          {
            id: 'challenge',
            type: 'challenge',
            title: 'Student Task',
            description: 'Build an automatic night light with adjustable override',
            allowedBlocks: ['pinMode', 'analog_read', 'map_val', 'pwm_setup', 'pwm_write', 'if_block', 'else_block', 'end_if', 'delay_ms'],
            challengeBlocks: ['pwm_setup', 'analog_read', 'map_val', 'pwm_write', 'delay_ms'],
            simulationId: 'dual-mode',
            hint: 'Read the light sensor on Pin 34. Map it to LED brightness. Then write the mapped value to PWM Pin 2.',
          },
          {
            id: 'mapping',
            type: 'mapping',
            title: 'Arduino Mapping',
            description: 'See how dual-mode feedback maps to C++ code',
            mappingSimulationId: 'dual-mode',
            mappingCodeComponent: 'dual-mode',
          },
        ],
      },
    ],
  },
  {
    id: 4,
    title: 'Loops & Pattern Systems',
    description: 'Master control flow structures using For Loops, While Loops, combined conditional logic, and multi-LED patterns.',
    icon: '🔄',
    isLocked: false,
    lessons: [
      {
        id: '4-1',
        title: 'Repetition (For Loop)',
        description: 'Learn how to repeat actions a specific number of times efficiently without repeating lines of code.',
        icon: '🔁',
        estimatedMinutes: 20,
        steps: [
          {
            id: 'intro',
            type: 'content',
            title: 'Introduction',
            description: 'Repeat actions without repeating lines of code',
          },
          {
            id: 'explore',
            type: 'explore',
            title: 'Exploration',
            description: 'Watch the execution flow repeat inside a loop block',
            allowedBlocks: ['pinMode', 'dw_high', 'dw_low', 'delay_ms', 'for_loop', 'end_loop'],
          },
          {
            id: 'concept',
            type: 'concept',
            title: 'Concept Building',
            description: 'Under the hood of For Loops and control flow',
          },
          {
            id: 'challenge',
            type: 'challenge',
            title: 'Student Task',
            description: 'Blink an LED exactly 5 times using a For Loop',
            allowedBlocks: ['pinMode', 'dw_high', 'dw_low', 'delay_ms', 'for_loop', 'end_loop'],
            challengeBlocks: ['pinMode', 'for_loop', 'dw_high', 'delay_ms', 'dw_low', 'delay_ms', 'end_loop'],
            hint: 'Set Pin 2 as OUTPUT in setup. In loop, start a For Loop (Repeat 5 times), turn Pin 2 HIGH, wait, turn Pin 2 LOW, wait, and end the loop.',
          },
          {
            id: 'mapping',
            type: 'mapping',
            title: 'Arduino Mapping',
            description: 'See how repeat blocks map to for loops in C++',
          },
        ],
      },
      {
        id: '4-2',
        title: 'Conditional Repetition (While Loop)',
        description: 'Repeat actions while a dynamic condition remains true and learn how to avoid infinite loops.',
        icon: '🔄',
        estimatedMinutes: 20,
        steps: [
          {
            id: 'intro',
            type: 'content',
            title: 'Introduction',
            description: 'Learn loop control based on real-time conditions',
          },
          {
            id: 'explore',
            type: 'explore',
            title: 'Exploration',
            description: 'Experiment with conditions that keep a loop running',
            allowedBlocks: ['btn_read', 'pinMode', 'dw_high', 'dw_low', 'while_loop', 'end_loop'],
          },
          {
            id: 'concept',
            type: 'concept',
            title: 'Concept Building',
            description: 'While loops vs For loops and the risk of infinite lockouts',
          },
          {
            id: 'challenge',
            type: 'challenge',
            title: 'Student Task',
            description: 'Keep LED ON while a button is pressed using a While Loop',
            allowedBlocks: ['btn_read', 'pinMode', 'dw_high', 'dw_low', 'while_loop', 'end_loop'],
            challengeBlocks: ['pinMode', 'while_loop', 'dw_high', 'end_loop', 'dw_low'],
            hint: 'In setup, set pinModes. In loop, use while_loop with condition "digitalRead(4) == HIGH" and place dw_high inside. After the loop, turn the LED LOW.',
          },
          {
            id: 'mapping',
            type: 'mapping',
            title: 'Arduino Mapping',
            description: 'See how while blocks map to while loops in C++',
          },
        ],
      },
      {
        id: '4-3',
        title: 'Combining Logic',
        description: 'Combine conditional checks inside loops to build complex, highly responsive program flows.',
        icon: '🔀',
        estimatedMinutes: 25,
        steps: [
          {
            id: 'intro',
            type: 'content',
            title: 'Introduction',
            description: 'Learn decision-making inside continuous repetitions',
          },
          {
            id: 'explore',
            type: 'explore',
            title: 'Exploration',
            description: 'Observe what happens when an IF statement runs inside a loop',
            allowedBlocks: ['btn_read', 'pinMode', 'dw_high', 'dw_low', 'if_block', 'else_block', 'end_if', 'delay_ms'],
          },
          {
            id: 'concept',
            type: 'concept',
            title: 'Concept Building',
            description: 'Nested logic, execution paths, and timing states',
          },
          {
            id: 'challenge',
            type: 'challenge',
            title: 'Student Task',
            description: 'Blink LED if a button is pressed, otherwise keep it OFF',
            allowedBlocks: ['btn_read', 'pinMode', 'dw_high', 'dw_low', 'if_block', 'else_block', 'end_if', 'delay_ms'],
            challengeBlocks: ['pinMode', 'btn_read', 'if_block', 'dw_high', 'delay_ms', 'dw_low', 'delay_ms', 'else_block', 'dw_low', 'end_if'],
            hint: 'Read button input. If it is pressed (HIGH), blink the LED on Pin 2 by turning it HIGH, waiting, turning it LOW, and waiting. Otherwise, keep Pin 2 LOW.',
          },
          {
            id: 'mapping',
            type: 'mapping',
            title: 'Arduino Mapping',
            description: 'See how nested conditional logic maps to C++ code',
          },
        ],
      },
      {
        id: '4-4',
        title: 'Pattern Systems',
        description: 'Coordinate multiple pins in structured sequential timings to form active display sequences.',
        icon: '⚙️',
        estimatedMinutes: 25,
        steps: [
          {
            id: 'intro',
            type: 'content',
            title: 'Introduction',
            description: 'Coordinate multiple outputs in structured patterns',
          },
          {
            id: 'explore',
            type: 'explore',
            title: 'Exploration',
            description: 'Observe multi-LED sequential patterns and duty speeds',
            allowedBlocks: ['pinMode', 'dw_high', 'dw_low', 'delay_ms'],
          },
          {
            id: 'concept',
            type: 'concept',
            title: 'Concept Building',
            description: 'Sequence arrays, indexing, and state progression',
          },
          {
            id: 'challenge',
            type: 'challenge',
            title: 'Student Task',
            description: 'Create a 3-LED pattern (LED1 -> LED2 -> LED3) in sequence',
            allowedBlocks: ['pinMode', 'dw_high', 'dw_low', 'delay_ms'],
            challengeBlocks: ['pinMode', 'pinMode', 'pinMode', 'dw_high', 'delay_ms', 'dw_low', 'dw_high', 'delay_ms', 'dw_low', 'dw_high', 'delay_ms', 'dw_low'],
            hint: 'Configure Pins 2, 4, and 5 as OUTPUT. Then in loop, turn Pin 2 HIGH, wait 300ms, turn Pin 2 LOW. Do the same for Pin 4, then Pin 5, to create a chasing pattern.',
          },
          {
            id: 'mapping',
            type: 'mapping',
            title: 'Arduino Mapping',
            description: 'See how sequential output blocks map to C++ code',
          },
        ],
      },
    ],
  },
];

// Dynamically bind the HTML contents and clear pdfUrl where applicable
LEVELS.forEach(level => {
  level.lessons.forEach(lesson => {
    lesson.steps.forEach(step => {
      const key = `${level.id}-${lesson.id}-${step.id}`;
      if (LECTURES_DATA[key]) {
        step.content = LECTURES_DATA[key];
        step.pdfUrl = undefined;
        step.pdfLabel = undefined;
      }
    });
  });
});

