// This file is auto-generated. Do not edit directly.

export interface LectureBlock {
  type: 'paragraph' | 'bullet' | 'callout' | 'image' | 'code' | 'reveal';
  text: string;
  isSubheading?: boolean;
  icon?: string;
  bg?: string;
  border?: string;
  textColor?: string;
  lang?: string;
  question?: string;
}

export interface LectureSection {
  number: string;
  title: string;
  icon: string;
  accent: string;
  blocks: LectureBlock[];
  images?: string[];
}

export interface QuizQuestion {
  question: string;
  options: string[];
  correct: number;
  explanation: string;
  hint?: string;
}

export interface LectureData {
  levelTitle: string;
  lessonTitle: string;
  stepType: string;
  sections: LectureSection[];
  quiz?: QuizQuestion[];
}

export const LECTURES_STRUCTURED_DATA: Record<string, LectureData> = {
  "1-1-1-intro": {
    "levelTitle": "LEVEL 1.1: Your First Blink",
    "lessonTitle": " Your First Blink",
    "stepType": "Introduction",
    "sections": [
      {
        "number": "1.1.1",
        "title": "Overview",
        "icon": "📝",
        "accent": "#6366F1",
        "blocks": [
          {
            "type": "paragraph",
            "text": "In this lesson, you will build your first working ESP32 program."
          },
          {
            "type": "paragraph",
            "text": "You will control a small LED using blocks and make it turn ON. This is the first time you will see how instructions you create in the system directly affect a physical (or simulated) output."
          },
          {
            "type": "image",
            "text": "/lecs/levels/Level 1/Level 1.1/LEVEL 1.1 Introduction/images/section_0.png"
          },
          {
            "type": "paragraph",
            "text": "The goal of this lesson is not just to make the LED turn on, but to understand that:"
          },
          {
            "type": "bullet",
            "text": "Your blocks are instructions"
          },
          {
            "type": "bullet",
            "text": "The ESP32 executes those instructions"
          },
          {
            "type": "bullet",
            "text": "The output changes based on your instructions"
          },
          {
            "type": "paragraph",
            "text": "By the end of this lesson, you will have created a complete working cycle of input instructions that produce visible behaviour."
          }
        ]
      }
    ]
  },
  "1-1-1-concept": {
    "levelTitle": "LEVEL 1.1: Your First Blink",
    "lessonTitle": " Your First Blink",
    "stepType": "What is ESP32?",
    "sections": [
      {
        "number": "1.2.1",
        "title": "Overview",
        "icon": "📝",
        "accent": "#6366F1",
        "blocks": [
          {
            "type": "paragraph",
            "text": "The ESP32 is a small programmable microcontroller. A microcontroller is a compact computing device designed to interact with physical components such as lights, sensors, and motors."
          },
          {
            "type": "image",
            "text": "/lecs/levels/Level 1/Level 1.1/LEVEL 1.1 Concept Building/images/section_0.jpg"
          },
          {
            "type": "paragraph",
            "text": "The ESP32 can also be called a mini version of a computer as it is a compact computer that has been designed for tasks that require specific control and instructions."
          },
          {
            "type": "paragraph",
            "text": "Unlike a normal computer, which is designed for general-purpose tasks like browsing or running applications, the ESP32 is designed for control tasks."
          },
          {
            "type": "paragraph",
            "text": "Its main purpose is to:"
          },
          {
            "type": "bullet",
            "text": "Receive instructions"
          },
          {
            "type": "bullet",
            "text": "Execute those instructions repeatedly"
          },
          {
            "type": "bullet",
            "text": "Control physical outputs based on those instructions"
          },
          {
            "type": "bullet",
            "text": "Read inputs from the environment"
          },
          {
            "type": "paragraph",
            "text": "In this lesson, the ESP32 is being used as a controller for an LED."
          }
        ]
      },
      {
        "number": "1.2.2",
        "title": "What are blocks?",
        "icon": "💡",
        "accent": "#F59E0B",
        "blocks": [
          {
            "type": "paragraph",
            "text": "In this system, you are not writing traditional code. Instead, you are using blocks."
          },
          {
            "type": "paragraph",
            "text": "Each block represents a specific instruction that the ESP32 understands."
          },
          {
            "type": "paragraph",
            "text": "For example:"
          },
          {
            "type": "bullet",
            "text": "A block can set a pin mode"
          },
          {
            "type": "bullet",
            "text": "A block can turn a signal ON"
          },
          {
            "type": "bullet",
            "text": "A block can turn a signal OFF"
          },
          {
            "type": "bullet",
            "text": "A block can introduce a delay"
          },
          {
            "type": "paragraph",
            "text": "Blocks are executed in sequence from top to bottom. This means the order in which you arrange them matters."
          },
          {
            "type": "paragraph",
            "text": "This block-based interface allows you to create programs visually by linking blocks together, much like assembling building pieces. Each block represents a specific instruction that the ESP32 can understand, and the system automatically translates your block arrangement into executable code."
          },
          {
            "type": "paragraph",
            "text": "This approach is designed to make programming more intuitive, especially for beginners, by removing the need to memorize syntax and instead focusing on logic and program flow."
          },
          {
            "type": "image",
            "text": "/lecs/levels/Level 1/Level 1.1/LEVEL 1.1 Concept Building/images/section_1.png"
          },
          {
            "type": "image",
            "text": "/lecs/levels/Level 1/Level 1.1/LEVEL 1.1 Concept Building/images/section_2.png"
          },
          {
            "type": "paragraph",
            "text": "To use it, you simply select the required block from the sidebar and drag it into the workspace, placing it where you want it to connect."
          },
          {
            "type": "image",
            "text": "/lecs/levels/Level 1/Level 1.1/LEVEL 1.1 Concept Building/images/section_3.png"
          }
        ]
      },
      {
        "number": "1.2.3",
        "title": "What is a Pin?",
        "icon": "💡",
        "accent": "#10B981",
        "blocks": [
          {
            "type": "paragraph",
            "text": "A pin is a physical connection point on the ESP32."
          },
          {
            "type": "paragraph",
            "text": "Each pin can be thought of as a control interface between the ESP32 and external components."
          },
          {
            "type": "paragraph",
            "text": "Pins can:"
          },
          {
            "type": "bullet",
            "text": "Send electrical signals (output)"
          },
          {
            "type": "bullet",
            "text": "Receive electrical signals (input)"
          },
          {
            "type": "paragraph",
            "text": "In this lesson, we use a pin as an output to control an LED."
          },
          {
            "type": "image",
            "text": "/lecs/levels/Level 1/Level 1.1/LEVEL 1.1 Concept Building/images/section_4.png"
          },
          {
            "type": "paragraph",
            "text": "When a pin is connected to an LED:"
          },
          {
            "type": "bullet",
            "text": "The ESP32 controls whether electricity flows to the LED"
          },
          {
            "type": "bullet",
            "text": "This determines whether the LED turns ON or OFF"
          }
        ]
      },
      {
        "number": "1.2.4",
        "title": "Why do we set pin mode?",
        "icon": "❓",
        "accent": "#EF4444",
        "blocks": [
          {
            "type": "paragraph",
            "text": "Before using a pin, we must define its behaviour."
          },
          {
            "type": "paragraph",
            "text": "This is done using “Set Pin Mode”."
          },
          {
            "type": "image",
            "text": "/lecs/levels/Level 1/Level 1.1/LEVEL 1.1 Concept Building/images/section_5.png"
          },
          {
            "type": "paragraph",
            "text": "A pin can operate in different modes, but in this lesson, we only use:"
          },
          {
            "type": "bullet",
            "text": "Output Mode"
          },
          {
            "type": "paragraph",
            "text": "Output mode means:"
          },
          {
            "type": "bullet",
            "text": "The ESP32 will send signals out through the pin"
          },
          {
            "type": "bullet",
            "text": "It will control external components like LEDs"
          },
          {
            "type": "paragraph",
            "text": "Without setting pin mode correctly:"
          },
          {
            "type": "bullet",
            "text": "The ESP32 may not behave as expected"
          },
          {
            "type": "bullet",
            "text": "The pin may not respond properly to output commands"
          },
          {
            "type": "paragraph",
            "text": "This step is required because the ESP32 needs to know how each pin will be used before executing instructions."
          }
        ]
      },
      {
        "number": "1.2.5",
        "title": "What is Digital Write (High and Low)?",
        "icon": "💡",
        "accent": "#8B5CF6",
        "blocks": [
          {
            "type": "paragraph",
            "text": "Digital signals have only two states:"
          },
          {
            "type": "bullet",
            "text": "HIGH and LOW"
          },
          {
            "type": "paragraph",
            "text": "HIGH means:"
          },
          {
            "type": "bullet",
            "text": "Electrical signal is ON"
          },
          {
            "type": "bullet",
            "text": "Current flows through the pin"
          },
          {
            "type": "bullet",
            "text": "The LED turns ON"
          },
          {
            "type": "paragraph",
            "text": "LOW means:"
          },
          {
            "type": "bullet",
            "text": "Electrical signal is OFF"
          },
          {
            "type": "bullet",
            "text": "No current flows through the pin"
          },
          {
            "type": "bullet",
            "text": "The LED turns OFF"
          },
          {
            "type": "paragraph",
            "text": "This is called digital control because it uses only two values instead of a range of values."
          },
          {
            "type": "image",
            "text": "/lecs/levels/Level 1/Level 1.1/LEVEL 1.1 Concept Building/images/section_6.png"
          },
          {
            "type": "paragraph",
            "text": "You are essentially switching electricity on and off through instructions."
          }
        ]
      },
      {
        "number": "1.2.6",
        "title": "What actually happens when your program runs?",
        "icon": "💡",
        "accent": "#0EA5E9",
        "blocks": [
          {
            "type": "paragraph",
            "text": "When you connect your blocks, the ESP32 executes them in order."
          },
          {
            "type": "paragraph",
            "text": "Step-by-step process:"
          },
          {
            "type": "bullet",
            "text": "The ESP32 reads the first block"
          },
          {
            "type": "bullet",
            "text": "It sets the pin mode to output"
          },
          {
            "type": "paragraph",
            "text": "It moves to the next block and turns the LED ON that is connected at Pin 2."
          },
          {
            "type": "paragraph",
            "text": "It moves to next block, and turns the LED OFF that is connect at Pin 2."
          },
          {
            "type": "paragraph",
            "text": "This repetition is automatic and built into the system."
          },
          {
            "type": "paragraph",
            "text": "Even though you only created the sequence once, the ESP32 keeps running it repeatedly."
          },
          {
            "type": "paragraph",
            "text": "This is why the LED keeps blinking."
          },
          {
            "type": "callout",
            "text": "Remember: Here we are using blocks to simplify the coding complexity and it translates to real code which you will learn bit by bit.",
            "icon": "💡",
            "bg": "#EFF6FF",
            "border": "#BFDBFE",
            "textColor": "#1E40AF"
          }
        ]
      },
      {
        "number": "1.2.7",
        "title": "Key insights of this lesson",
        "icon": "🔑",
        "accent": "#F97316",
        "blocks": [
          {
            "type": "paragraph",
            "text": "The most important concept in this lesson is:"
          },
          {
            "type": "paragraph",
            "text": "You are not manually repeating actions. The system is repeating them for you."
          },
          {
            "type": "paragraph",
            "text": "Your block sequence becomes a cycle that runs continuously."
          },
          {
            "type": "paragraph",
            "text": "This is the foundation of all embedded systems behaviour."
          }
        ]
      }
    ],
    "quiz": [
      {
        "question": "What does the ESP32 microcontroller do?",
        "hint": "Think about what the word \"controller\" means — what does a controller do to hardware?",
        "options": [
          "It is a high-end graphics card for running massive 3D video games",
          "It receives visual blocks/code instructions and directly controls physical hardware outputs",
          "It operates exclusively as an external battery pack to supply power",
          "It works as a keyboard controller for standard computers"
        ],
        "correct": 1,
        "explanation": "The ESP32 is a compact, programmable microcontroller designed to read input states and drive physical actuators and outputs."
      },
      {
        "question": "Why do we need to set the \"Pin Mode\" (pinMode)?",
        "hint": "Think of a pin like a door — before using it, does the ESP32 need to know if signals flow IN or OUT?",
        "options": [
          "To change the physical color of the connected LED bulb",
          "To tell the ESP32 whether a specific pin should act as an Input (receiver) or Output (sender)",
          "To increase the clock speed and make the microcontroller execute instructions faster",
          "To establish a secure connection to the local WiFi network"
        ],
        "correct": 1,
        "explanation": "Setting pinMode is mandatory because the microcontroller needs to configure its internal solid-state registers to either drive current (OUTPUT) or sample incoming voltage (INPUT)."
      },
      {
        "question": "What do \"HIGH\" and \"LOW\" represent in digital control?",
        "hint": "Digital means only two possible states — think of a simple light switch: it is either ON or OFF.",
        "options": [
          "HIGH represents a dangerous 100V spike, and LOW represents 0V safety",
          "HIGH turns the signal ON (applying full voltage), while LOW turns the signal OFF (zero voltage)",
          "HIGH controls output audio volume, and LOW controls display brightness",
          "HIGH makes loops run slower, and LOW makes loops execute faster"
        ],
        "correct": 1,
        "explanation": "Digital signals are binary: HIGH applies the supply voltage (3.3V) to illuminate or activate components, and LOW pulls it down to ground (0V) to turn them off."
      }
    ]
  },
  "1-1-2-intro": {
    "levelTitle": "LEVEL 1.2: Making Changes Visible (Using Delay)",
    "lessonTitle": " Making Changes Visible (Using Delay)",
    "stepType": "Introduction",
    "sections": [
      {
        "number": "2.1.1",
        "title": "Overview",
        "icon": "📝",
        "accent": "#6366F1",
        "blocks": [
          {
            "type": "paragraph",
            "text": "In the previous lesson, you controlled an LED by turning it ON and OFF using blocks."
          },
          {
            "type": "paragraph",
            "text": "However, you may have noticed something unusual:"
          },
          {
            "type": "paragraph",
            "text": "Even though you gave instructions to turn the LED ON and then OFF, it was difficult to clearly see both actions."
          },
          {
            "type": "image",
            "text": "/lecs/levels/Level 1/Level 1.2/Introduction/images/section_0.png"
          },
          {
            "type": "paragraph",
            "text": "This happens because the ESP32 executes instructions extremely fast."
          },
          {
            "type": "paragraph",
            "text": "In this lesson, you will learn how to slow down the execution so that changes become visible and easier to understand."
          }
        ]
      }
    ]
  },
  "1-1-2-concept": {
    "levelTitle": "LEVEL 1.2: Making Changes Visible (Using Delay)",
    "lessonTitle": " Making Changes Visible (Using Delay)",
    "stepType": "Why couldn’t you clearly see the ON and OFF?",
    "sections": [
      {
        "number": "2.2.1",
        "title": "Overview",
        "icon": "📝",
        "accent": "#6366F1",
        "blocks": [
          {
            "type": "paragraph",
            "text": "In the previous lesson, when you turned the LED ON and then OFF, both actions happened almost instantly."
          },
          {
            "type": "paragraph",
            "text": "The ESP32 executes instructions extremely fast—far faster than the human eye can detect changes."
          },
          {
            "type": "paragraph",
            "text": "Because of this:"
          },
          {
            "type": "bullet",
            "text": "The LED turns ON"
          },
          {
            "type": "bullet",
            "text": "Then immediately turns OFF"
          },
          {
            "type": "bullet",
            "text": "And then immediately turns back ON"
          },
          {
            "type": "image",
            "text": "/lecs/levels/Level 1/Level 1.2/Concept Building/images/section_0.png"
          },
          {
            "type": "paragraph",
            "text": "These two actions happen so quickly that they appear as if they happened at the same time."
          },
          {
            "type": "paragraph",
            "text": "To you, it may look like:"
          },
          {
            "type": "bullet",
            "text": "Nothing happened"
          },
          {
            "type": "bullet",
            "text": "or"
          },
          {
            "type": "bullet",
            "text": "The LED did not turn OFF properly"
          },
          {
            "type": "paragraph",
            "text": "However, this is not the case. The ESP32 correctly executed both instructions. The change simply occurred too quickly to be observed by the human eye."
          },
          {
            "type": "paragraph",
            "text": "This highlights an important idea:"
          },
          {
            "type": "paragraph",
            "text": "The system is working correctly, but the result is not always visible to us."
          }
        ]
      },
      {
        "number": "2.2.2",
        "title": "What is Delay?",
        "icon": "⏱️",
        "accent": "#F59E0B",
        "blocks": [
          {
            "type": "paragraph",
            "text": "Delay is used to pause the execution of the program for a specific amount of time."
          },
          {
            "type": "paragraph",
            "text": "When the ESP32 reaches a Delay block, it temporarily stops executing further instructions before moving to the next step."
          },
          {
            "type": "paragraph",
            "text": "This pause gives enough time for the current action to be observed."
          },
          {
            "type": "paragraph",
            "text": "Delay is measured in milliseconds:"
          },
          {
            "type": "bullet",
            "text": "1000 milliseconds = 1 second"
          },
          {
            "type": "bullet",
            "text": "500 milliseconds = half a second"
          },
          {
            "type": "bullet",
            "text": "2000 milliseconds = 2 seconds"
          },
          {
            "type": "paragraph",
            "text": "This allows you to control how long the system should wait before continuing."
          },
          {
            "type": "image",
            "text": "/lecs/levels/Level 1/Level 1.2/Concept Building/images/section_1.png"
          }
        ]
      },
      {
        "number": "2.2.3",
        "title": "Why do we need Delay?",
        "icon": "⏱️",
        "accent": "#10B981",
        "blocks": [
          {
            "type": "paragraph",
            "text": "We use delay to make changes visible and understandable."
          },
          {
            "type": "paragraph",
            "text": "Without delay:"
          },
          {
            "type": "bullet",
            "text": "Instructions execute almost instantly"
          },
          {
            "type": "bullet",
            "text": "Changes happen too quickly to observe"
          },
          {
            "type": "bullet",
            "text": "The result may appear incorrect or confusing"
          },
          {
            "type": "paragraph",
            "text": "With delay:"
          },
          {
            "type": "bullet",
            "text": "The system pauses between actions"
          },
          {
            "type": "bullet",
            "text": "Each step becomes clearly visible"
          },
          {
            "type": "bullet",
            "text": "You can understand what each instruction is doing"
          },
          {
            "type": "paragraph",
            "text": "For example:"
          },
          {
            "type": "paragraph",
            "text": "If you:"
          },
          {
            "type": "bullet",
            "text": "Turn LED ON"
          },
          {
            "type": "bullet",
            "text": "Add a delay"
          },
          {
            "type": "bullet",
            "text": "Turn LED OFF"
          },
          {
            "type": "paragraph",
            "text": "Then:"
          },
          {
            "type": "bullet",
            "text": "The LED remains ON for a short period"
          },
          {
            "type": "bullet",
            "text": "You can clearly see the ON state before it turns OFF"
          },
          {
            "type": "paragraph",
            "text": "This makes the behavior of the system easier to understand."
          },
          {
            "type": "image",
            "text": "/lecs/levels/Level 1/Level 1.2/Concept Building/images/section_2.png"
          }
        ]
      },
      {
        "number": "2.2.4",
        "title": "Understanding time and observation",
        "icon": "⏳",
        "accent": "#EF4444",
        "blocks": [
          {
            "type": "paragraph",
            "text": "Computers are designed to operate at extremely high speeds."
          },
          {
            "type": "paragraph",
            "text": "They can perform thousands or even millions of operations in a very short amount of time."
          },
          {
            "type": "paragraph",
            "text": "Humans, on the other hand, require time to notice and understand changes."
          },
          {
            "type": "image",
            "text": "/lecs/levels/Level 1/Level 1.2/Concept Building/images/section_3.png"
          },
          {
            "type": "paragraph",
            "text": "This creates a gap between:"
          },
          {
            "type": "bullet",
            "text": "Machine speed"
          },
          {
            "type": "bullet",
            "text": "Human perception"
          },
          {
            "type": "paragraph",
            "text": "Delay acts as a bridge between these two."
          },
          {
            "type": "paragraph",
            "text": "It slows down execution so that:"
          },
          {
            "type": "bullet",
            "text": "Each step becomes observable"
          },
          {
            "type": "bullet",
            "text": "Each instruction becomes meaningful"
          },
          {
            "type": "paragraph",
            "text": "Without delay, it becomes difficult to understand what the system is doing."
          }
        ]
      },
      {
        "number": "2.2.5",
        "title": "What actually happens when Delay is used?",
        "icon": "⏱️",
        "accent": "#8B5CF6",
        "blocks": [
          {
            "type": "paragraph",
            "text": "When the ESP32 runs your program with delay:"
          },
          {
            "type": "bullet",
            "text": "It executes the first instruction"
          },
          {
            "type": "image",
            "text": "/lecs/levels/Level 1/Level 1.2/Concept Building/images/section_4.png"
          },
          {
            "type": "bullet",
            "text": "It reaches the Delay block"
          },
          {
            "type": "image",
            "text": "/lecs/levels/Level 1/Level 1.2/Concept Building/images/section_5.png"
          },
          {
            "type": "bullet",
            "text": "It pauses for the specified amount of time"
          },
          {
            "type": "bullet",
            "text": "After the pause, it continues to the next instruction"
          },
          {
            "type": "image",
            "text": "/lecs/levels/Level 1/Level 1.2/Concept Building/images/section_6.png"
          },
          {
            "type": "bullet",
            "text": "This process continues until all instructions are completed"
          },
          {
            "type": "paragraph",
            "text": "During the delay:"
          },
          {
            "type": "bullet",
            "text": "No new instructions are executed"
          },
          {
            "type": "bullet",
            "text": "The current state remains unchanged"
          },
          {
            "type": "paragraph",
            "text": "This pause allows you to clearly observe the effect of each instruction before moving on."
          }
        ]
      },
      {
        "number": "2.2.6",
        "title": "Key Insight of This Lesson",
        "icon": "🔑",
        "accent": "#0EA5E9",
        "blocks": [
          {
            "type": "bullet",
            "text": "The ESP32 executes instructions very quickly"
          },
          {
            "type": "bullet",
            "text": "Rapid changes may not be visible to the human eye"
          },
          {
            "type": "bullet",
            "text": "Delay introduces a pause between instructions"
          },
          {
            "type": "bullet",
            "text": "This pause makes system behavior easier to observe"
          },
          {
            "type": "bullet",
            "text": "Delay does not change the logic of the program"
          },
          {
            "type": "bullet",
            "text": "It only changes the timing of execution"
          }
        ]
      }
    ],
    "quiz": [
      {
        "question": "Why could we not clearly see the LED blinking in Lesson 1.1 without delays?",
        "hint": "The ESP32 runs at 240MHz — try to imagine how many ON/OFF transitions happen in a single second.",
        "options": [
          "The physical LED bulb was defective and burned out",
          "The ESP32 runs commands in microseconds—too fast for the human eye to perceive the transitions",
          "The blocks workspace had a logic compilation conflict",
          "The microcontroller did not have a connected power supply"
        ],
        "correct": 1,
        "explanation": "The ESP32 runs at 240MHz, executing millions of instructions per second. Without pauses, the LED switches ON and OFF so rapidly that human eyes only perceive a constant, dim light."
      },
      {
        "question": "What is 1 second in the millisecond (ms) scale used by delays?",
        "hint": "The prefix \"milli\" means one-thousandth. So one millisecond = 1/1000th of a second.",
        "options": [
          "10 milliseconds",
          "100 milliseconds",
          "1,000 milliseconds",
          "10,000 milliseconds"
        ],
        "correct": 2,
        "explanation": "Embedded system delay blocks use milliseconds as their base unit. 1,000 milliseconds (ms) equal exactly 1 second."
      },
      {
        "question": "Does adding a delay block alter the logical rules of your program?",
        "hint": "Think about what a pause does — does it change the ON/OFF setting of a pin, or only when it happens?",
        "options": [
          "Yes, it deletes previous pin configurations and variables",
          "No, it only pauses execution flow, changing the timing of transitions without altering states",
          "Yes, it forces all output pins to turn LOW automatically",
          "Yes, it puts the ESP32 into a permanent shutoff state"
        ],
        "correct": 1,
        "explanation": "A delay block merely suspends the processor execution loop for the set duration. It does not alter pin states, variable values, or configuration modes."
      }
    ]
  },
  "1-1-3-intro": {
    "levelTitle": "LEVEL 1.3: What Just Happened?",
    "lessonTitle": " What Just Happened?",
    "stepType": "Introduction",
    "sections": [
      {
        "number": "3.1.1",
        "title": "Overview",
        "icon": "📝",
        "accent": "#6366F1",
        "blocks": [
          {
            "type": "paragraph",
            "text": "In the previous lessons, you controlled an LED and learned how delay helps make changes visible."
          },
          {
            "type": "paragraph",
            "text": "Now, it is time to understand something deeper:"
          },
          {
            "type": "paragraph",
            "text": "How does the ESP32 actually follow your instructions?"
          },
          {
            "type": "paragraph",
            "text": "When you connect multiple blocks together:"
          },
          {
            "type": "paragraph",
            "text": "Does everything happen at once?"
          },
          {
            "type": "paragraph",
            "text": "Or does the ESP32 follow a specific order?"
          },
          {
            "type": "paragraph",
            "text": "In this lesson, you will learn how the ESP32 reads and executes your program step by step."
          },
          {
            "type": "image",
            "text": "/lecs/levels/Level 1/Level 1.3/Introduction/images/section_0.png"
          }
        ]
      }
    ]
  },
  "1-1-3-concept": {
    "levelTitle": "LEVEL 1.3: What Just Happened?",
    "lessonTitle": " What Just Happened?",
    "stepType": "How does the ESP32 read your program?",
    "sections": [
      {
        "number": "3.2.1",
        "title": "Overview",
        "icon": "📝",
        "accent": "#6366F1",
        "blocks": [
          {
            "type": "paragraph",
            "text": "When you build a program using blocks, it may feel like you are creating one complete system where everything happens together."
          },
          {
            "type": "bullet",
            "text": "But the ESP32 does not see your program as a “whole idea.”"
          },
          {
            "type": "paragraph",
            "text": "Instead, it treats it as a strict sequence of steps that must be followed one after another."
          },
          {
            "type": "paragraph",
            "text": "It begins from the first block, executes it completely, then moves to the next one, and continues until it reaches the end."
          },
          {
            "type": "image",
            "text": "/lecs/levels/Level 1/Level 1.3/Concept Building/images/section_0.png"
          },
          {
            "type": "paragraph",
            "text": "It does not:"
          },
          {
            "type": "bullet",
            "text": "Look ahead to future blocks"
          },
          {
            "type": "bullet",
            "text": "Rearrange your logic"
          },
          {
            "type": "bullet",
            "text": "Skip instructions"
          },
          {
            "type": "bullet",
            "text": "Try to understand your intention"
          },
          {
            "type": "paragraph",
            "text": "It simply follows exactly what you placed, in the exact order you placed it."
          },
          {
            "type": "paragraph",
            "text": "This is the foundation of how every ESP32 program behaves."
          }
        ]
      },
      {
        "number": "3.2.2",
        "title": "Why order matters so much",
        "icon": "❓",
        "accent": "#F59E0B",
        "blocks": [
          {
            "type": "paragraph",
            "text": "Take a simple set of blocks controlling an LED:"
          },
          {
            "type": "paragraph",
            "text": "If you arrange them like:"
          },
          {
            "type": "bullet",
            "text": "Turn LED ON"
          },
          {
            "type": "bullet",
            "text": "Wait"
          },
          {
            "type": "bullet",
            "text": "Turn LED OFF"
          },
          {
            "type": "image",
            "text": "/lecs/levels/Level 1/Level 1.3/Concept Building/images/section_1.png"
          },
          {
            "type": "paragraph",
            "text": "The behavior will follow that exact order:"
          },
          {
            "type": "bullet",
            "text": "The LED turns ON first"
          },
          {
            "type": "bullet",
            "text": "It stays ON for some time"
          },
          {
            "type": "bullet",
            "text": "Then it turns OFF"
          },
          {
            "type": "paragraph",
            "text": "Now if you change only the order:"
          },
          {
            "type": "bullet",
            "text": "Turn LED OFF"
          },
          {
            "type": "bullet",
            "text": "Wait"
          },
          {
            "type": "bullet",
            "text": "Turn LED ON"
          },
          {
            "type": "image",
            "text": "/lecs/levels/Level 1/Level 1.3/Concept Building/images/section_2.png"
          },
          {
            "type": "paragraph",
            "text": "The behavior changes completely:"
          },
          {
            "type": "bullet",
            "text": "The LED starts OFF"
          },
          {
            "type": "bullet",
            "text": "Then turns ON after the delay"
          },
          {
            "type": "paragraph",
            "text": "Nothing in the blocks changed except their order—but the result is different."
          },
          {
            "type": "paragraph",
            "text": "This is because in programming, order is not just structure—it defines behavior."
          }
        ]
      },
      {
        "number": "3.2.3",
        "title": "Understanding blocks as individual actions",
        "icon": "📝",
        "accent": "#10B981",
        "blocks": [
          {
            "type": "paragraph",
            "text": "Each block represents a single, direct action."
          },
          {
            "type": "paragraph",
            "text": "For example:"
          },
          {
            "type": "bullet",
            "text": "A HIGH block does one thing: it turns the LED ON"
          },
          {
            "type": "image",
            "text": "/lecs/levels/Level 1/Level 1.3/Concept Building/images/section_3.png"
          },
          {
            "type": "bullet",
            "text": "A LOW block does one thing: it turns the LED OFF"
          },
          {
            "type": "bullet",
            "text": "A Delay block does one thing: it pauses execution"
          },
          {
            "type": "paragraph",
            "text": "The ESP32 does not combine these actions or process them in parallel."
          },
          {
            "type": "paragraph",
            "text": "It performs them one at a time, fully completing one before moving to the next."
          },
          {
            "type": "paragraph",
            "text": "This makes behavior predictable:"
          },
          {
            "type": "bullet",
            "text": "One block → one action → immediate effect"
          }
        ]
      },
      {
        "number": "3.2.4",
        "title": "Understanding the idea of state",
        "icon": "📝",
        "accent": "#EF4444",
        "blocks": [
          {
            "type": "paragraph",
            "text": "At any moment, the system is in a condition called a state."
          },
          {
            "type": "image",
            "text": "/lecs/levels/Level 1/Level 1.3/Concept Building/images/section_4.png"
          },
          {
            "type": "paragraph",
            "text": "For an LED, the state is very simple:"
          },
          {
            "type": "bullet",
            "text": "ON"
          },
          {
            "type": "bullet",
            "text": "OFF"
          },
          {
            "type": "paragraph",
            "text": "Only one state can exist at a time."
          },
          {
            "type": "paragraph",
            "text": "Each action you give changes this state."
          },
          {
            "type": "paragraph",
            "text": "For example:"
          },
          {
            "type": "bullet",
            "text": "HIGH changes the state to ON"
          },
          {
            "type": "bullet",
            "text": "LOW changes the state to OFF"
          },
          {
            "type": "paragraph",
            "text": "When a new instruction is executed, it replaces whatever state existed before."
          },
          {
            "type": "paragraph",
            "text": "The system does not remember previous states unless you explicitly design it to do so."
          },
          {
            "type": "paragraph",
            "text": "It only reflects the most recent instruction affecting it."
          },
          {
            "type": "paragraph",
            "text": "As the program runs, the system’s state changes step by step."
          },
          {
            "type": "paragraph",
            "text": "For example:"
          },
          {
            "type": "bullet",
            "text": "The LED becomes ON when a HIGH instruction is executed"
          },
          {
            "type": "bullet",
            "text": "It remains ON during a delay"
          },
          {
            "type": "bullet",
            "text": "It changes to OFF when LOW is executed"
          },
          {
            "type": "paragraph",
            "text": "This creates a visible progression of states over time."
          }
        ]
      },
      {
        "number": "3.2.5",
        "title": "What actually happens during execution",
        "icon": "💡",
        "accent": "#8B5CF6",
        "blocks": [
          {
            "type": "paragraph",
            "text": "When you run your program, the ESP32 follows a strict execution flow:"
          },
          {
            "type": "paragraph",
            "text": "It starts from the first block and processes each instruction one by one."
          },
          {
            "type": "image",
            "text": "/lecs/levels/Level 1/Level 1.3/Concept Building/images/section_5.png"
          },
          {
            "type": "paragraph",
            "text": "If it encounters a delay, it temporarily pauses before continuing."
          },
          {
            "type": "paragraph",
            "text": "Once all instructions are completed, execution reaches the end of the sequence."
          },
          {
            "type": "paragraph",
            "text": "At this point, the program does not stop in the traditional sense—it simply finishes that pass of execution."
          },
          {
            "type": "paragraph",
            "text": "The final state remains active until another instruction changes it again."
          }
        ]
      },
      {
        "number": "3.2.6",
        "title": "Understanding behavior over time",
        "icon": "⏳",
        "accent": "#0EA5E9",
        "blocks": [
          {
            "type": "paragraph",
            "text": "When you observe your program over time, you begin to see that behavior is not just about individual instructions, but about how those instructions unfold across time."
          },
          {
            "type": "image",
            "text": "/lecs/levels/Level 1/Level 1.3/Concept Building/images/section_6.png"
          },
          {
            "type": "paragraph",
            "text": "You start noticing:"
          },
          {
            "type": "bullet",
            "text": "When a change happens"
          },
          {
            "type": "bullet",
            "text": "How long it lasts"
          },
          {
            "type": "bullet",
            "text": "What causes the next change"
          },
          {
            "type": "paragraph",
            "text": "This creates a relationship between:"
          },
          {
            "type": "bullet",
            "text": "Order of instructions"
          },
          {
            "type": "bullet",
            "text": "Timing between actions"
          },
          {
            "type": "bullet",
            "text": "Visible system behavior"
          },
          {
            "type": "paragraph",
            "text": "In other words, programming is not just about what you write, but how those instructions behave over time."
          }
        ]
      },
      {
        "number": "3.2.7",
        "title": "Key insight of this lesson",
        "icon": "🔑",
        "accent": "#F97316",
        "blocks": [
          {
            "type": "paragraph",
            "text": "At the core of this lesson are a few essential ideas:"
          },
          {
            "type": "bullet",
            "text": "The ESP32 executes instructions one by one"
          },
          {
            "type": "bullet",
            "text": "The order of instructions directly defines behavior"
          },
          {
            "type": "bullet",
            "text": "Each instruction performs a single, specific action"
          },
          {
            "type": "bullet",
            "text": "Each action changes the system’s state"
          },
          {
            "type": "bullet",
            "text": "The system only reflects the most recent change"
          },
          {
            "type": "bullet",
            "text": "Delay affects visibility, not logic"
          },
          {
            "type": "bullet",
            "text": "Behavior emerges from sequence, state, and timing working together"
          }
        ]
      }
    ],
    "quiz": [
      {
        "question": "In what order does the ESP32 execute the blocks you arrange in the workspace?",
        "options": [
          "It executes all blocks simultaneously in parallel",
          "It executes blocks in random cycles to balance load",
          "It executes instructions sequentially, step-by-step from top to bottom",
          "It executes blocks from the bottom block up to the top block"
        ],
        "correct": 2,
        "explanation": "Microcontrollers are sequential machines; they read and execute instructions one by one in the precise top-to-bottom sequence they are laid out."
      },
      {
        "question": "What happens if you omit a delay block after setting a pin state to LOW inside a loop?",
        "options": [
          "The output pin remains at a constant LOW state forever",
          "The output pin remains at a constant HIGH state forever",
          "The LOW state is executed so briefly that the LED appears constantly ON",
          "The ESP32 stops running and displays an error code"
        ],
        "correct": 2,
        "explanation": "If no delay follows the LOW command, the processor instantly loops back to the top of the cycle and turns the pin HIGH in microseconds, leaving no observable time in the OFF state."
      },
      {
        "question": "What is meant by an output pin's \"electrical state\"?",
        "options": [
          "The physical thickness and gauge of the jumper wire",
          "The active voltage condition of the pin, indicating whether it is driven HIGH (3.3V) or LOW (0V)",
          "The registered identifier key of the pin header",
          "The length of the block sequence configured"
        ],
        "correct": 1,
        "explanation": "An electrical state refers to whether the pin is outputting active voltage (HIGH/3.3V) to push current, or is clamped to ground (LOW/0V)."
      }
    ]
  },
  "1-1-4-intro": {
    "levelTitle": "Level 1.4:Repeating Actions",
    "lessonTitle": "Repeating Actions",
    "stepType": "Introduction",
    "sections": [
      {
        "number": "4.1.1",
        "title": "Overview",
        "icon": "📝",
        "accent": "#6366F1",
        "blocks": [
          {
            "type": "paragraph",
            "text": "So far, you have learned how to:"
          },
          {
            "type": "bullet",
            "text": "Control an LED"
          },
          {
            "type": "bullet",
            "text": "Use delay to make changes visible"
          },
          {
            "type": "bullet",
            "text": "Understand execution order"
          },
          {
            "type": "bullet",
            "text": "Observe repeating behavior"
          },
          {
            "type": "image",
            "text": "/lecs/levels/Level 1/Level 1.4/Introduction/images/section_0.png"
          },
          {
            "type": "paragraph",
            "text": "Now it is time to understand something very important:"
          },
          {
            "type": "paragraph",
            "text": "Why does the program repeat automatically?"
          },
          {
            "type": "paragraph",
            "text": "Is everything repeated?"
          },
          {
            "type": "paragraph",
            "text": "Or are some parts executed only once?"
          },
          {
            "type": "paragraph",
            "text": "In this lesson, you will learn how the ESP32 organizes your program into two main parts:"
          },
          {
            "type": "bullet",
            "text": "Setup"
          },
          {
            "type": "bullet",
            "text": "Loop"
          },
          {
            "type": "paragraph",
            "text": "This will help you understand the complete flow of how your program runs."
          }
        ]
      }
    ]
  },
  "1-1-4-concept": {
    "levelTitle": "Level 1.4:Repeating Actions",
    "lessonTitle": "Repeating Actions",
    "stepType": "Does the program run only once?",
    "sections": [
      {
        "number": "4.2.1",
        "title": "Overview",
        "icon": "📝",
        "accent": "#6366F1",
        "blocks": [
          {
            "type": "paragraph",
            "text": "When you build a sequence of blocks, it is natural to assume that the system should:"
          },
          {
            "type": "bullet",
            "text": "execute the instructions once"
          },
          {
            "type": "bullet",
            "text": "then stop"
          },
          {
            "type": "paragraph",
            "text": "This is how most instructions in daily life work. You give directions, they are completed, and the process ends."
          },
          {
            "type": "paragraph",
            "text": "But when you run your ESP32 program, something different happens."
          },
          {
            "type": "paragraph",
            "text": "After completing the sequence, the system does not stop. Instead, it immediately starts again from the beginning and executes the same instructions again."
          },
          {
            "type": "paragraph",
            "text": "So instead of running once, your program keeps running continuously."
          }
        ]
      },
      {
        "number": "4.2.2",
        "title": "Why does the ESP32 behave like this?",
        "icon": "❓",
        "accent": "#F59E0B",
        "blocks": [
          {
            "type": "paragraph",
            "text": "The ESP32 is not designed like a calculator that finishes a task and stops."
          },
          {
            "type": "paragraph",
            "text": "It is designed for systems that must stay alive and responsive all the time."
          },
          {
            "type": "paragraph",
            "text": "Think about real-world systems:"
          },
          {
            "type": "bullet",
            "text": "Traffic lights cannot stop working after one cycle"
          },
          {
            "type": "bullet",
            "text": "Sensors must keep checking values continuously"
          },
          {
            "type": "bullet",
            "text": "Devices must constantly respond to changes"
          },
          {
            "type": "image",
            "text": "/lecs/levels/Level 1/Level 1.4/Concept Building/images/section_0.png"
          },
          {
            "type": "image",
            "text": "/lecs/levels/Level 1/Level 1.4/Concept Building/images/section_1.png"
          },
          {
            "type": "paragraph",
            "text": "Because of this, the ESP32 is built to:"
          },
          {
            "type": "bullet",
            "text": "keep executing instructions"
          },
          {
            "type": "bullet",
            "text": "keep checking conditions"
          },
          {
            "type": "bullet",
            "text": "keep updating outputs"
          },
          {
            "type": "paragraph",
            "text": "It only stops if it is powered off or reset."
          },
          {
            "type": "paragraph",
            "text": "So continuous repetition is not accidental—it is the core design of the system."
          }
        ]
      },
      {
        "number": "4.2.3",
        "title": "How is an ESP32 program structured?",
        "icon": "📝",
        "accent": "#10B981",
        "blocks": [
          {
            "type": "paragraph",
            "text": "When you run your ESP32 program, it may look like all instructions are working together as one continuous system. But internally, the ESP32 does not treat your program as a single block of logic."
          },
          {
            "type": "paragraph",
            "text": "Instead, every program is divided into two main sections:"
          },
          {
            "type": "bullet",
            "text": "Setup"
          },
          {
            "type": "bullet",
            "text": "Loop"
          },
          {
            "type": "image",
            "text": "/lecs/levels/Level 1/Level 1.4/Concept Building/images/section_2.png"
          },
          {
            "type": "paragraph",
            "text": "These two sections define how the system behaves over time. Some instructions are meant to run only once at the beginning, while others are meant to run repeatedly for as long as the system is active."
          },
          {
            "type": "paragraph",
            "text": "Understanding this structure is important because it explains why some actions happen once and others continue forever."
          }
        ]
      },
      {
        "number": "4.2.4",
        "title": "What is Setup?",
        "icon": "💡",
        "accent": "#EF4444",
        "blocks": [
          {
            "type": "paragraph",
            "text": "At the start of every program, there are certain tasks that prepare the system before anything else happens. These tasks belong to the Setup section."
          },
          {
            "type": "paragraph",
            "text": "Setup runs only once when:"
          },
          {
            "type": "bullet",
            "text": "The program starts"
          },
          {
            "type": "bullet",
            "text": "The device is powered on"
          },
          {
            "type": "bullet",
            "text": "The system is reset"
          },
          {
            "type": "paragraph",
            "text": "This is where the ESP32 prepares everything it needs before starting continuous operation."
          },
          {
            "type": "image",
            "text": "/lecs/levels/Level 1/Level 1.4/Concept Building/images/section_3.png"
          },
          {
            "type": "paragraph",
            "text": "In the image are a few blocks that are examples of such instructions that only need to be executed once. The code for them goes in the setup method:"
          },
          {
            "type": "image",
            "text": "/lecs/levels/Level 1/Level 1.4/Concept Building/images/section_4.png"
          },
          {
            "type": "paragraph",
            "text": "For example, when you configure a pin using “Set Pin Mode,” you are defining how that pin will behave for the rest of the program. Once this is set, it does not need to be configured again."
          },
          {
            "type": "paragraph",
            "text": "Setup is not concerned with repeating actions. Its purpose is to make sure everything is correctly initialized before the system begins its main behavior."
          }
        ]
      },
      {
        "number": "4.2.5",
        "title": "Why Setup runs only once",
        "icon": "❓",
        "accent": "#8B5CF6",
        "blocks": [
          {
            "type": "paragraph",
            "text": "Some instructions are meant to define initial conditions rather than ongoing behavior."
          },
          {
            "type": "paragraph",
            "text": "If these instructions were repeated continuously, the system would waste resources doing the same configuration again and again without any benefit."
          },
          {
            "type": "paragraph",
            "text": "For example, repeatedly setting a pin to OUTPUT does not change anything after the first time. It simply re-applies the same configuration unnecessarily."
          },
          {
            "type": "paragraph",
            "text": "Because of this, Setup is designed to execute only once. This ensures:"
          },
          {
            "type": "bullet",
            "text": "The system starts in a stable state"
          },
          {
            "type": "bullet",
            "text": "No unnecessary repetition occurs"
          },
          {
            "type": "bullet",
            "text": "Processing power is used efficiently"
          },
          {
            "type": "paragraph",
            "text": "Once Setup finishes its execution, it is not called again during normal operation."
          }
        ]
      },
      {
        "number": "4.2.6",
        "title": "What is Loop?",
        "icon": "💡",
        "accent": "#0EA5E9",
        "blocks": [
          {
            "type": "paragraph",
            "text": "After Setup completes, the ESP32 does not stop running. Instead, it enters the Loop section."
          },
          {
            "type": "paragraph",
            "text": "This is where the main behavior of the system is defined."
          },
          {
            "type": "paragraph",
            "text": "Everything inside the Loop is executed continuously. When the ESP32 reaches the end of the Loop, it does not stop. Instead, it automatically goes back to the beginning and starts again."
          },
          {
            "type": "paragraph",
            "text": "This creates an ongoing cycle of execution that continues for as long as the device is powered on."
          },
          {
            "type": "paragraph",
            "text": "The Loop is responsible for:"
          },
          {
            "type": "bullet",
            "text": "Continuous actions"
          },
          {
            "type": "bullet",
            "text": "Real-time responses"
          },
          {
            "type": "bullet",
            "text": "Ongoing system behavior"
          },
          {
            "type": "image",
            "text": "/lecs/levels/Level 1/Level 1.4/Concept Building/images/section_5.png"
          },
          {
            "type": "paragraph",
            "text": "Above is an example of instructions that are repeated for a pattern of blinking LED."
          },
          {
            "type": "image",
            "text": "/lecs/levels/Level 1/Level 1.4/Concept Building/images/section_6.png"
          },
          {
            "type": "paragraph",
            "text": "These blocks go into the loop section since these are instructions that need to be repeated."
          }
        ]
      },
      {
        "number": "4.2.7",
        "title": "How Loop creates continuous behavior",
        "icon": "🔁",
        "accent": "#F97316",
        "blocks": [
          {
            "type": "paragraph",
            "text": "Inside the Loop, you define a sequence of instructions."
          },
          {
            "type": "paragraph",
            "text": "For example:"
          },
          {
            "type": "bullet",
            "text": "Turn LED ON"
          },
          {
            "type": "bullet",
            "text": "Wait"
          },
          {
            "type": "bullet",
            "text": "Turn LED OFF"
          },
          {
            "type": "bullet",
            "text": "Wait"
          },
          {
            "type": "paragraph",
            "text": "When these instructions are executed, they form one complete cycle of behavior."
          },
          {
            "type": "paragraph",
            "text": "Once the ESP32 reaches the end of this sequence, it immediately starts again from the beginning of the Loop."
          },
          {
            "type": "paragraph",
            "text": "This results in a repeating pattern:"
          },
          {
            "type": "bullet",
            "text": "ON → OFF → ON → OFF → ON → OFF"
          },
          {
            "type": "image",
            "text": "/lecs/levels/Level 1/Level 1.4/Concept Building/images/section_7.png"
          },
          {
            "type": "paragraph",
            "text": "Each repetition is identical because the same instructions are executed in the same order every time."
          },
          {
            "type": "paragraph",
            "text": "This repetition is what allows embedded systems to behave continuously instead of performing only one action."
          }
        ]
      },
      {
        "number": "4.2.8",
        "title": "What happens when the program runs",
        "icon": "💡",
        "accent": "#14B8A6",
        "blocks": [
          {
            "type": "paragraph",
            "text": "When the ESP32 starts running your program, it follows a fixed execution flow."
          },
          {
            "type": "paragraph",
            "text": "First, it begins with Setup. All instructions inside Setup are executed once in order. Once Setup is complete, the system transitions into the Loop."
          },
          {
            "type": "paragraph",
            "text": "Inside the Loop, instructions are executed one by one. After the last instruction is executed, the ESP32 does not stop. Instead, it immediately returns to the beginning of the Loop and repeats the process."
          },
          {
            "type": "image",
            "text": "/lecs/levels/Level 1/Level 1.4/Concept Building/images/section_8.png"
          },
          {
            "type": "paragraph",
            "text": "This cycle continues endlessly as long as the device remains powered."
          }
        ]
      },
      {
        "number": "4.2.9",
        "title": "Connecting everything together",
        "icon": "📝",
        "accent": "#6366F1",
        "blocks": [
          {
            "type": "paragraph",
            "text": "At this point, multiple concepts come together to form a complete understanding of how the system works."
          },
          {
            "type": "paragraph",
            "text": "Setup prepares the system once at the beginning. Loop handles continuous execution after that. Inside Loop, the order of instructions defines the sequence of actions. Each instruction changes the state of the system, and delay controls how quickly these changes are observed."
          },
          {
            "type": "paragraph",
            "text": "Together, these concepts define the full behavior of the ESP32 over time. A simple sequence inside the Loop can create continuous, repeating system behavior that runs indefinitely."
          }
        ]
      },
      {
        "number": "4.2.10",
        "title": "Key insight of this lesson",
        "icon": "🔑",
        "accent": "#F59E0B",
        "blocks": [
          {
            "type": "paragraph",
            "text": "Every ESP32 program is built on a simple structure."
          },
          {
            "type": "paragraph",
            "text": "Setup runs once to prepare the system. Loop runs continuously to maintain system behavior."
          },
          {
            "type": "paragraph",
            "text": "All actions inside the system depend on where they are placed. Sequence defines order, state defines condition, and repetition inside the Loop defines continuous behavior."
          },
          {
            "type": "paragraph",
            "text": "Understanding this structure is essential because it forms the foundation for every more advanced concept you will learn later."
          }
        ]
      }
    ],
    "quiz": [
      {
        "question": "What is the main operational difference between Setup and Loop blocks?",
        "options": [
          "Setup runs repeatedly in a cycle, whereas Loop runs once at startup",
          "Setup runs exactly once when power is applied, while Loop repeats continuously in an infinite cycle",
          "They function identically and can be used interchangeably",
          "Setup manages sensor variables, while Loop handles hardware digital signals"
        ],
        "correct": 1,
        "explanation": "Setup is meant for one-time configurations (e.g. pinMode) performed at startup. Loop runs immediately afterward, repeating its contents indefinitely."
      },
      {
        "question": "Why is the Loop block described as an \"infinite cycle\"?",
        "options": [
          "Because it runs continuously forever as long as the device has electrical power",
          "Because it does not possess a structured entry point",
          "Because it consumes an infinite amount of physical hardware memory",
          "Because it overrides emergency physical disconnects"
        ],
        "correct": 0,
        "explanation": "A loop block is a continuous cycle. Once the processor reaches the final instruction block inside a loop, it wraps back to the first instruction instantly, repeating forever."
      },
      {
        "question": "What would happen if we placed \"pinMode\" blocks inside the continuous Loop block?",
        "options": [
          "The program would immediately crash and fail to run",
          "The program would function, but is highly inefficient because pins only need to be configured once",
          "The connected LED would flash twice as bright",
          "The input pins would burn out due to electrical overload"
        ],
        "correct": 1,
        "explanation": "pinMode is a one-time configuration. Placing it in Loop causes the ESP32 to waste clock cycles re-configuring the same pin state millions of times per second."
      }
    ]
  },
  "2-2-1-intro": {
    "levelTitle": "LEVEL 2.1: Seeing Output (Serial Basics)",
    "lessonTitle": " Seeing Output (Serial Basics)",
    "stepType": "Introduction",
    "sections": [
      {
        "number": "1.1.1",
        "title": "Overview",
        "icon": "📝",
        "accent": "#6366F1",
        "blocks": [
          {
            "type": "paragraph",
            "text": "In this lesson, you will learn how to make the ESP32 send information to a screen using Serial communication."
          },
          {
            "type": "paragraph",
            "text": "You will display messages and observe how your program communicates internally. This is the first time you will see how instructions you create can produce visible output without using physical components."
          },
          {
            "type": "paragraph",
            "text": "The goal of this lesson is not just to display messages, but to understand that:"
          },
          {
            "type": "bullet",
            "text": "Your blocks are instructions"
          },
          {
            "type": "bullet",
            "text": "The ESP32 executes those instructions"
          },
          {
            "type": "bullet",
            "text": "The ESP32 can send information to a screen"
          },
          {
            "type": "bullet",
            "text": "You can observe what the program is doing internally"
          },
          {
            "type": "image",
            "text": "/lecs/levels/Level 2/2.1/Introduction/images/section_0.png"
          },
          {
            "type": "paragraph",
            "text": "By the end of this lesson, you will have created a complete working system where your instructions produce visible informational output through the Serial Monitor."
          }
        ]
      }
    ]
  },
  "2-2-1-concept": {
    "levelTitle": "LEVEL 2.1: Seeing Output (Serial Basics)",
    "lessonTitle": " Seeing Output (Serial Basics)",
    "stepType": "What is Serial Communication?",
    "sections": [
      {
        "number": "1.2.1",
        "title": "Overview",
        "icon": "📝",
        "accent": "#6366F1",
        "blocks": [
          {
            "type": "paragraph",
            "text": "Serial communication is a method used by the ESP32 to send data to another device, usually a computer."
          },
          {
            "type": "paragraph",
            "text": "Instead of controlling physical components like LEDs or motors, the ESP32 sends:"
          },
          {
            "type": "bullet",
            "text": "Text messages"
          },
          {
            "type": "bullet",
            "text": "Numerical values"
          },
          {
            "type": "bullet",
            "text": "Status updates"
          },
          {
            "type": "paragraph",
            "text": "This communication happens in a sequence, one piece of data at a time, which is why it is called serial communication."
          },
          {
            "type": "paragraph",
            "text": "It creates a connection between:"
          },
          {
            "type": "bullet",
            "text": "The ESP32 (sender)"
          },
          {
            "type": "bullet",
            "text": "The computer (receiver)"
          },
          {
            "type": "image",
            "text": "/lecs/levels/Level 2/2.1/Concept Building/images/section_0.png"
          },
          {
            "type": "bullet",
            "text": "Use simpler image"
          }
        ]
      },
      {
        "number": "1.2.2",
        "title": "What is the Serial Monitor?",
        "icon": "📟",
        "accent": "#F59E0B",
        "blocks": [
          {
            "type": "paragraph",
            "text": "The Serial Monitor is a tool that displays the data sent by the ESP32."
          },
          {
            "type": "paragraph",
            "text": "It acts as:"
          },
          {
            "type": "bullet",
            "text": "A display screen for your program"
          },
          {
            "type": "bullet",
            "text": "A communication interface between you and the ESP32"
          },
          {
            "type": "paragraph",
            "text": "When the ESP32 sends information, the Serial Monitor shows it instantly."
          },
          {
            "type": "paragraph",
            "text": "This allows you to:"
          },
          {
            "type": "bullet",
            "text": "Read messages"
          },
          {
            "type": "bullet",
            "text": "Observe changing values"
          },
          {
            "type": "bullet",
            "text": "Track program execution in real time"
          },
          {
            "type": "image",
            "text": "/lecs/levels/Level 2/2.1/Concept Building/images/section_1.png"
          },
          {
            "type": "bullet",
            "text": "Instead of this picture, can use serial monitor output picture"
          }
        ]
      },
      {
        "number": "1.2.3",
        "title": "Why Do We Use Serial Output?",
        "icon": "📟",
        "accent": "#10B981",
        "blocks": [
          {
            "type": "paragraph",
            "text": "Serial output is very important when working with embedded systems."
          },
          {
            "type": "paragraph",
            "text": "In many cases:"
          },
          {
            "type": "bullet",
            "text": "You cannot see what is happening inside the program"
          },
          {
            "type": "bullet",
            "text": "There is no physical output to observe"
          },
          {
            "type": "bullet",
            "text": "You need to verify if your logic is correct"
          },
          {
            "type": "paragraph",
            "text": "Serial output helps solve this problem by:"
          },
          {
            "type": "bullet",
            "text": "Printing values and messages"
          },
          {
            "type": "bullet",
            "text": "Showing step-by-step execution"
          },
          {
            "type": "bullet",
            "text": "Helping identify errors or unexpected behavior"
          },
          {
            "type": "paragraph",
            "text": "It is mainly used for:"
          },
          {
            "type": "bullet",
            "text": "Debugging programs"
          },
          {
            "type": "bullet",
            "text": "Testing logic"
          },
          {
            "type": "bullet",
            "text": "Understanding system behavior"
          },
          {
            "type": "image",
            "text": "/lecs/levels/Level 2/2.1/Concept Building/images/section_2.png"
          }
        ]
      },
      {
        "number": "1.2.4",
        "title": "What Type of Information Can Be Sent?",
        "icon": "💡",
        "accent": "#EF4444",
        "blocks": [
          {
            "type": "paragraph",
            "text": "The ESP32 can send different types of information through Serial, such as:"
          },
          {
            "type": "bullet",
            "text": "Simple messages (e.g., “System Started”)"
          },
          {
            "type": "bullet",
            "text": "Sensor values"
          },
          {
            "type": "bullet",
            "text": "Input states (HIGH or LOW)"
          },
          {
            "type": "bullet",
            "text": "Program status updates"
          },
          {
            "type": "paragraph",
            "text": "This makes Serial communication a flexible and powerful tool."
          }
        ]
      },
      {
        "number": "1.2.5",
        "title": "What Happens When the Program Runs?",
        "icon": "💡",
        "accent": "#8B5CF6",
        "blocks": [
          {
            "type": "paragraph",
            "text": "When your program runs, the following process occurs:"
          },
          {
            "type": "bullet",
            "text": "The ESP32 starts executing instructions"
          },
          {
            "type": "bullet",
            "text": "When it reaches a Serial block, it sends data"
          },
          {
            "type": "bullet",
            "text": "The data travels from the ESP32 to the computer"
          },
          {
            "type": "bullet",
            "text": "The Serial Monitor receives and displays the data"
          },
          {
            "type": "bullet",
            "text": "The program continues running and repeating this process"
          },
          {
            "type": "paragraph",
            "text": "Because the program runs continuously, the output is also updated continuously."
          },
          {
            "type": "image",
            "text": "/lecs/levels/Level 2/2.1/Concept Building/images/section_3.png"
          }
        ]
      },
      {
        "number": "1.2.6",
        "title": "Continuous Output and Repetition",
        "icon": "📝",
        "accent": "#0EA5E9",
        "blocks": [
          {
            "type": "paragraph",
            "text": "The ESP32 does not send data just once."
          },
          {
            "type": "paragraph",
            "text": "It keeps sending data repeatedly as long as the program is running."
          },
          {
            "type": "paragraph",
            "text": "This means:"
          },
          {
            "type": "bullet",
            "text": "Messages may appear again and again"
          },
          {
            "type": "bullet",
            "text": "Values may keep updating"
          },
          {
            "type": "bullet",
            "text": "You can observe changes over time"
          },
          {
            "type": "paragraph",
            "text": "This continuous behavior helps you monitor real-time activity."
          }
        ]
      },
      {
        "number": "1.2.7",
        "title": "How is Serial Output Different from LED Output?",
        "icon": "📟",
        "accent": "#F97316",
        "blocks": [
          {
            "type": "paragraph",
            "text": "LED Output:"
          },
          {
            "type": "bullet",
            "text": "Physical"
          },
          {
            "type": "bullet",
            "text": "Visible through light"
          },
          {
            "type": "bullet",
            "text": "Limited to ON/OFF behavior"
          },
          {
            "type": "paragraph",
            "text": "Serial Output:"
          },
          {
            "type": "bullet",
            "text": "Informational"
          },
          {
            "type": "bullet",
            "text": "Visible as text"
          },
          {
            "type": "bullet",
            "text": "Can show detailed data and messages"
          },
          {
            "type": "paragraph",
            "text": "Serial output gives you more control and more insight into your program."
          },
          {
            "type": "bullet",
            "text": "Add a section highlighting how our app handle this in simple way (i have to add this properly first)"
          }
        ]
      },
      {
        "number": "1.2.8",
        "title": "Key Insight of This Lesson",
        "icon": "🔑",
        "accent": "#14B8A6",
        "blocks": [
          {
            "type": "paragraph",
            "text": "The most important concept in this lesson is:"
          },
          {
            "type": "paragraph",
            "text": "You can observe and understand your program’s internal behavior using Serial output."
          },
          {
            "type": "paragraph",
            "text": "You are no longer limited to physical results."
          },
          {
            "type": "paragraph",
            "text": "You now have a way to:"
          },
          {
            "type": "bullet",
            "text": "See what the ESP32 is doing"
          },
          {
            "type": "bullet",
            "text": "Track how it is working"
          },
          {
            "type": "bullet",
            "text": "Debug and improve your programs"
          },
          {
            "type": "paragraph",
            "text": "This is a fundamental skill for building more advanced and interactive systems."
          }
        ]
      }
    ],
    "quiz": [
      {
        "question": "What defines a \"digital input\"?",
        "options": [
          "A continuous, slowly changing voltage range",
          "An electrical signal constrained to exactly two distinct states: HIGH (voltage detected) or LOW (no voltage)",
          "An encrypted packet of bytes transferred over a local network",
          "A serial character printed to the monitor console"
        ],
        "correct": 1,
        "explanation": "Digital input reads binary conditions—either an electrical potential exists (HIGH) or it is connected to ground (LOW)."
      },
      {
        "question": "Why must a physical button pin be configured as an INPUT?",
        "options": [
          "To allow the ESP32 to push current and light up the button cap",
          "To configure the pin's internal logic gate to monitor and read external voltages",
          "To direct the compiler to skip that pin during execution loops",
          "To clear previous analog sensor variables"
        ],
        "correct": 1,
        "explanation": "An INPUT configuration prepares the pin to behave as a sensor port with high impedance, reading external logic states without generating currents."
      },
      {
        "question": "What does \"digitalRead(4)\" return when a pressed button drives 3.3V into Pin 4?",
        "options": [
          "0",
          "LOW",
          "HIGH",
          "4095"
        ],
        "correct": 2,
        "explanation": "Pressing the button applies voltage (3.3V) directly to the pin. `digitalRead` samples this voltage and returns HIGH."
      }
    ]
  },
  "2-2-2-intro": {
    "levelTitle": "LEVEL 2.2: Variables (Storing and Updating Values)",
    "lessonTitle": " Variables (Storing and Updating Values)",
    "stepType": "Introduction",
    "sections": [
      {
        "number": "2.1.1",
        "title": "Overview",
        "icon": "📝",
        "accent": "#6366F1",
        "blocks": [
          {
            "type": "paragraph",
            "text": "In this lesson, you will learn how to store and update values in your program using variables."
          },
          {
            "type": "paragraph",
            "text": "You will use variables to keep track of information such as numbers, states, or sensor values. This is the first time you will see how your program can remember and update data during execution."
          },
          {
            "type": "image",
            "text": "/lecs/levels/Level 2/2.2/Introduction/images/section_0.png"
          },
          {
            "type": "paragraph",
            "text": "The goal of this lesson is not just to store values, but to understand that:"
          },
          {
            "type": "bullet",
            "text": "Your blocks are instructions"
          },
          {
            "type": "bullet",
            "text": "The ESP32 executes those instructions"
          },
          {
            "type": "bullet",
            "text": "Variables store information inside the program"
          },
          {
            "type": "bullet",
            "text": "The stored values can be updated and used later"
          },
          {
            "type": "paragraph",
            "text": "By the end of this lesson, you will have created a system where values are stored, updated, and used to control behavior, allowing your programs to become more dynamic and intelligent."
          }
        ]
      }
    ]
  },
  "2-2-2-concept": {
    "levelTitle": "LEVEL 2.2: Variables (Storing and Updating Values)",
    "lessonTitle": " Variables (Storing and Updating Values)",
    "stepType": "What is a variable?",
    "sections": [
      {
        "number": "2.2.1",
        "title": "Overview",
        "icon": "📝",
        "accent": "#6366F1",
        "blocks": [
          {
            "type": "paragraph",
            "text": "A variable is a place in the program where you can store a value."
          },
          {
            "type": "image",
            "text": "/lecs/levels/Level 2/2.2/Concept Building/images/section_0.png"
          },
          {
            "type": "paragraph",
            "text": "You can think of a variable as:"
          },
          {
            "type": "bullet",
            "text": "A container"
          },
          {
            "type": "bullet",
            "text": "A box with a name"
          },
          {
            "type": "paragraph",
            "text": "This box stores information that your program can use."
          },
          {
            "type": "paragraph",
            "text": "For example:"
          },
          {
            "type": "bullet",
            "text": "Store a number"
          },
          {
            "type": "bullet",
            "text": "Store a text message"
          },
          {
            "type": "bullet",
            "text": "Store a sensor value"
          }
        ]
      },
      {
        "number": "2.2.2",
        "title": "Why do we use variables?",
        "icon": "❓",
        "accent": "#F59E0B",
        "blocks": [
          {
            "type": "paragraph",
            "text": "Variables are used to:"
          },
          {
            "type": "bullet",
            "text": "Store information"
          },
          {
            "type": "bullet",
            "text": "Keep track of values"
          },
          {
            "type": "bullet",
            "text": "Use data later in the program"
          },
          {
            "type": "image",
            "text": "/lecs/levels/Level 2/2.2/Concept Building/images/section_1.png"
          },
          {
            "type": "paragraph",
            "text": "Without variables:"
          },
          {
            "type": "bullet",
            "text": "You cannot remember values"
          },
          {
            "type": "bullet",
            "text": "You cannot update information"
          },
          {
            "type": "paragraph",
            "text": "With variables:"
          },
          {
            "type": "bullet",
            "text": "Programs become dynamic"
          },
          {
            "type": "bullet",
            "text": "Values can change during execution"
          }
        ]
      },
      {
        "number": "2.2.3",
        "title": "Types of variables",
        "icon": "📦",
        "accent": "#10B981",
        "blocks": [
          {
            "type": "paragraph",
            "text": "Different types of variables store different kinds of data:"
          },
          {
            "type": "image",
            "text": "/lecs/levels/Level 2/2.2/Concept Building/images/section_2.png"
          },
          {
            "type": "bullet",
            "text": "Integer (var_int) → stores whole numbers (e.g., 5, 10)"
          },
          {
            "type": "bullet",
            "text": "Float (var_float) → stores decimal numbers (e.g., 25.5)"
          },
          {
            "type": "bullet",
            "text": "String (var_str) → stores text (e.g., \"Hello\")"
          },
          {
            "type": "bullet",
            "text": "Boolean (var_bool) → stores TRUE or FALSE"
          },
          {
            "type": "paragraph",
            "text": "Choosing the correct type is important."
          }
        ]
      },
      {
        "number": "2.2.4",
        "title": "Storing a value in a variable",
        "icon": "📊",
        "accent": "#EF4444",
        "blocks": [
          {
            "type": "paragraph",
            "text": "To store a value:"
          },
          {
            "type": "bullet",
            "text": "You create a variable"
          },
          {
            "type": "bullet",
            "text": "You assign a value to it"
          },
          {
            "type": "image",
            "text": "/lecs/levels/Level 2/2.2/Concept Building/images/section_3.png"
          },
          {
            "type": "paragraph",
            "text": "Example:"
          },
          {
            "type": "bullet",
            "text": "Store number 10 in a variable"
          },
          {
            "type": "bullet",
            "text": "Store button state (HIGH/LOW)"
          },
          {
            "type": "paragraph",
            "text": "Once stored:"
          },
          {
            "type": "bullet",
            "text": "The program can use this value anytime"
          }
        ]
      },
      {
        "number": "2.2.5",
        "title": "Updating a variable",
        "icon": "📦",
        "accent": "#8B5CF6",
        "blocks": [
          {
            "type": "paragraph",
            "text": "Variables are not fixed — they can be updated."
          },
          {
            "type": "paragraph",
            "text": "Example:"
          },
          {
            "type": "bullet",
            "text": "Start with value = 0"
          },
          {
            "type": "bullet",
            "text": "Increase value by 1 each time"
          },
          {
            "type": "paragraph",
            "text": "This is called updating a variable."
          },
          {
            "type": "paragraph",
            "text": "It allows you to:"
          },
          {
            "type": "bullet",
            "text": "Count things"
          },
          {
            "type": "bullet",
            "text": "Track changes"
          },
          {
            "type": "bullet",
            "text": "Store new values"
          }
        ]
      },
      {
        "number": "2.2.6",
        "title": "Using variables in programs",
        "icon": "📦",
        "accent": "#0EA5E9",
        "blocks": [
          {
            "type": "paragraph",
            "text": "Variables can be used to:"
          },
          {
            "type": "bullet",
            "text": "Store input values"
          },
          {
            "type": "bullet",
            "text": "Use values in IF conditions"
          },
          {
            "type": "bullet",
            "text": "Control outputs"
          },
          {
            "type": "image",
            "text": "/lecs/levels/Level 2/2.2/Concept Building/images/section_4.png"
          },
          {
            "type": "paragraph",
            "text": "Example:"
          },
          {
            "type": "bullet",
            "text": "Store button state in a variable"
          },
          {
            "type": "bullet",
            "text": "Use that variable to decide LED behavior"
          },
          {
            "type": "paragraph",
            "text": "This connects:"
          },
          {
            "type": "bullet",
            "text": "Input → Variable → Condition → Output"
          }
        ]
      },
      {
        "number": "2.2.7",
        "title": "Example: Counter Using Variable",
        "icon": "📦",
        "accent": "#F97316",
        "blocks": [
          {
            "type": "paragraph",
            "text": "Example:"
          },
          {
            "type": "bullet",
            "text": "Start counter at 0"
          },
          {
            "type": "bullet",
            "text": "Increase by 1 each time"
          },
          {
            "type": "bullet",
            "text": "Display value"
          },
          {
            "type": "image",
            "text": "/lecs/levels/Level 2/2.2/Concept Building/images/section_5.png"
          },
          {
            "type": "paragraph",
            "text": "This is useful for:"
          },
          {
            "type": "bullet",
            "text": "Counting repetitions"
          },
          {
            "type": "bullet",
            "text": "Tracking events"
          },
          {
            "type": "bullet",
            "text": "Measuring activity"
          },
          {
            "type": "bullet",
            "text": "Variables with Sensors"
          },
          {
            "type": "paragraph",
            "text": "Variables are very useful with sensors."
          },
          {
            "type": "paragraph",
            "text": "Example:"
          },
          {
            "type": "bullet",
            "text": "Read temperature from sensor"
          },
          {
            "type": "bullet",
            "text": "Store it in a variable"
          },
          {
            "type": "bullet",
            "text": "Use it in the program"
          },
          {
            "type": "image",
            "text": "/lecs/levels/Level 2/2.2/Concept Building/images/section_6.png"
          },
          {
            "type": "paragraph",
            "text": "This allows:"
          },
          {
            "type": "bullet",
            "text": "Real-world data to be used in logic"
          },
          {
            "type": "bullet",
            "text": "Smart decision making"
          }
        ]
      },
      {
        "number": "2.2.8",
        "title": "Key Insight of This Lesson",
        "icon": "🔑",
        "accent": "#14B8A6",
        "blocks": [
          {
            "type": "paragraph",
            "text": "The most important concept in this lesson is:"
          },
          {
            "type": "paragraph",
            "text": "Variables allow you to store, update, and use information inside your program."
          },
          {
            "type": "paragraph",
            "text": "You are now able to:"
          },
          {
            "type": "callout",
            "text": "Remember values",
            "icon": "💡",
            "bg": "#EFF6FF",
            "border": "#BFDBFE",
            "textColor": "#1E40AF"
          },
          {
            "type": "bullet",
            "text": "Track changes"
          },
          {
            "type": "bullet",
            "text": "Use data to control behavior"
          },
          {
            "type": "paragraph",
            "text": "This is essential for building dynamic, intelligent, and data-driven systems."
          }
        ]
      }
    ],
    "quiz": [
      {
        "question": "What is the functional purpose of an \"IF\" block in microcontroller logic?",
        "options": [
          "To create structured repeating cycles of instructions",
          "To evaluate a condition and branch execution down a specific path only if the condition is true",
          "To establish initial pin output registers",
          "To print diagnostic text streams to the serial monitor"
        ],
        "correct": 1,
        "explanation": "IF blocks implement conditional execution. They evaluate a boolean state: if true, the interior blocks run; if false, they are bypassed."
      },
      {
        "question": "How does an \"ELSE\" block function inside conditional logic?",
        "options": [
          "It executes a backup set of instructions only when the preceding IF condition is false",
          "It duplicates the behavior of the IF block to balance safety",
          "It immediately halts the execution loop and resets variables",
          "It reads continuous analog signals from pins"
        ],
        "correct": 0,
        "explanation": "The ELSE block is a fallback execution path. It handles cases where all preceding IF/ELSE-IF conditions evaluate to false."
      },
      {
        "question": "Why must input checks and conditional decision blocks be placed in the Loop?",
        "options": [
          "To make sure they only execute once at startup",
          "To continuously check the input state in real-time, responding dynamically to changes",
          "To compress code and compile faster",
          "To preserve the values of stored memory variables"
        ],
        "correct": 1,
        "explanation": "Inputs like buttons can change at any moment. Placing decision logic inside Loop forces the ESP32 to continuously poll the inputs, making the device highly responsive."
      }
    ]
  },
  "2-2-3-intro": {
    "levelTitle": "Level 2.3: Reading Input States",
    "lessonTitle": " Reading Input States",
    "stepType": "Introduction",
    "sections": [
      {
        "number": "3.1.1",
        "title": "Overview",
        "icon": "📝",
        "accent": "#6366F1",
        "blocks": [
          {
            "type": "paragraph",
            "text": "In this lesson, you will learn how the ESP32 reads and understands input signals from a button."
          },
          {
            "type": "paragraph",
            "text": "You will detect whether a button is pressed or not and observe how this information is represented inside the program. This is the first time you will see how physical actions are converted into digital values."
          },
          {
            "type": "image",
            "text": "/lecs/levels/Level 2/2.3/Introduction/images/section_0.png"
          },
          {
            "type": "paragraph",
            "text": "The goal of this lesson is not just to read a button, but to understand that:"
          },
          {
            "type": "bullet",
            "text": "Your blocks are instructions"
          },
          {
            "type": "bullet",
            "text": "The ESP32 executes those instructions"
          },
          {
            "type": "bullet",
            "text": "The ESP32 reads electrical signals from inputs"
          },
          {
            "type": "bullet",
            "text": "Physical actions are converted into digital values (HIGH and LOW)"
          },
          {
            "type": "paragraph",
            "text": "By the end of this lesson, you will have created a system where the ESP32 reads input states and represents them as values that can be used in your program."
          }
        ]
      },
      {
        "number": "3.3.1",
        "title": "Overview",
        "icon": "📝",
        "accent": "#6366F1",
        "blocks": [
          {
            "type": "paragraph",
            "text": "In this lesson, you will learn how the ESP32 reads and understands input signals from a button."
          },
          {
            "type": "paragraph",
            "text": "You will detect whether a button is pressed or not and observe how this information is represented inside the program. This is the first time you will see how physical actions are converted into digital values."
          },
          {
            "type": "image",
            "text": "/lecs/levels/Level 2/2.3/Introduction/images/section_0.png"
          },
          {
            "type": "paragraph",
            "text": "The goal of this lesson is not just to read a button, but to understand that:"
          },
          {
            "type": "bullet",
            "text": "Your blocks are instructions"
          },
          {
            "type": "bullet",
            "text": "The ESP32 executes those instructions"
          },
          {
            "type": "bullet",
            "text": "The ESP32 reads electrical signals from inputs"
          },
          {
            "type": "bullet",
            "text": "Physical actions are converted into digital values (HIGH and LOW)"
          },
          {
            "type": "paragraph",
            "text": "By the end of this lesson, you will have created a system where the ESP32 reads input states and represents them as values that can be used in your program."
          }
        ]
      }
    ]
  },
  "2-2-3-concept": {
    "levelTitle": "Level 2.3: Reading Input States",
    "lessonTitle": " Reading Input States",
    "stepType": "What Does Reading Input Mean?",
    "sections": [
      {
        "number": "3.2.1",
        "title": "Overview",
        "icon": "📝",
        "accent": "#6366F1",
        "blocks": [
          {
            "type": "paragraph",
            "text": "Reading input means checking the state of a pin connected to an external device, such as a button."
          },
          {
            "type": "image",
            "text": "/lecs/levels/Level 2/2.3/Concept Building/images/section_0.png"
          },
          {
            "type": "paragraph",
            "text": "The ESP32 does not understand actions like “pressed” or “not pressed” directly."
          },
          {
            "type": "paragraph",
            "text": "Instead, it:"
          },
          {
            "type": "bullet",
            "text": "Reads the electrical signal on the pin"
          },
          {
            "type": "bullet",
            "text": "Determines its state"
          },
          {
            "type": "bullet",
            "text": "Uses that value inside the program"
          },
          {
            "type": "paragraph",
            "text": "This process happens continuously while the program is running."
          }
        ]
      },
      {
        "number": "3.2.2",
        "title": "What are HIGH and LOW?",
        "icon": "💡",
        "accent": "#F59E0B",
        "blocks": [
          {
            "type": "paragraph",
            "text": "HIGH and LOW are the two possible digital states of a signal."
          },
          {
            "type": "bullet",
            "text": "HIGH means the signal is present (usually voltage is applied)"
          },
          {
            "type": "bullet",
            "text": "LOW means the signal is absent (no voltage)"
          },
          {
            "type": "paragraph",
            "text": "These two states form the basis of digital systems."
          },
          {
            "type": "image",
            "text": "/lecs/levels/Level 2/2.3/Concept Building/images/section_1.png"
          },
          {
            "type": "paragraph",
            "text": "You can think of them as:"
          },
          {
            "type": "bullet",
            "text": "HIGH → 1 (ON)"
          },
          {
            "type": "bullet",
            "text": "LOW → 0 (OFF)"
          },
          {
            "type": "paragraph",
            "text": "All digital systems, including the ESP32, work using these two values."
          }
        ]
      },
      {
        "number": "3.2.3",
        "title": "How Does ESP32 Read a Button?",
        "icon": "📝",
        "accent": "#10B981",
        "blocks": [
          {
            "type": "paragraph",
            "text": "When a button is connected to a pin:"
          },
          {
            "type": "bullet",
            "text": "If the button is pressed → the pin reads HIGH"
          },
          {
            "type": "bullet",
            "text": "If the button is not pressed → the pin reads LOW"
          },
          {
            "type": "image",
            "text": "/lecs/levels/Level 2/2.3/Concept Building/images/section_2.png"
          },
          {
            "type": "paragraph",
            "text": "The ESP32 continuously checks this pin and updates the value."
          },
          {
            "type": "paragraph",
            "text": "This means:"
          },
          {
            "type": "bullet",
            "text": "A physical press becomes a digital signal"
          },
          {
            "type": "bullet",
            "text": "The ESP32 converts real-world actions into data"
          },
          {
            "type": "image",
            "text": "/lecs/levels/Level 2/2.3/Concept Building/images/section_3.png"
          }
        ]
      },
      {
        "number": "3.2.4",
        "title": "How is the Input Value Used?",
        "icon": "📊",
        "accent": "#EF4444",
        "blocks": [
          {
            "type": "paragraph",
            "text": "Once the ESP32 reads the input:"
          },
          {
            "type": "bullet",
            "text": "The value (HIGH or LOW) is stored"
          },
          {
            "type": "bullet",
            "text": "This value can be used in the program"
          },
          {
            "type": "bullet",
            "text": "It can control outputs or trigger actions"
          },
          {
            "type": "paragraph",
            "text": "For example:"
          },
          {
            "type": "bullet",
            "text": "HIGH → can be used to turn ON an LED"
          },
          {
            "type": "bullet",
            "text": "LOW → can be used to turn OFF an LED"
          },
          {
            "type": "paragraph",
            "text": "This is how input becomes useful in programming."
          },
          {
            "type": "image",
            "text": "/lecs/levels/Level 2/2.3/Concept Building/images/section_4.png"
          },
          {
            "type": "callout",
            "text": "Note: If the yellow “? if “ blocks confuse you, don’t worry, they shall be explained in detail later.",
            "icon": "💡",
            "bg": "#EFF6FF",
            "border": "#BFDBFE",
            "textColor": "#1E40AF"
          }
        ]
      },
      {
        "number": "3.2.5",
        "title": "Continuous Reading and Real-Time Behavior",
        "icon": "⏳",
        "accent": "#8B5CF6",
        "blocks": [
          {
            "type": "paragraph",
            "text": "The ESP32 does not read the input just once."
          },
          {
            "type": "paragraph",
            "text": "It continuously:"
          },
          {
            "type": "bullet",
            "text": "Reads the input"
          },
          {
            "type": "bullet",
            "text": "Updates the value"
          },
          {
            "type": "bullet",
            "text": "Reacts to changes"
          },
          {
            "type": "paragraph",
            "text": "This creates real-time behavior where:"
          },
          {
            "type": "bullet",
            "text": "Pressing the button immediately changes the system"
          },
          {
            "type": "bullet",
            "text": "Releasing the button updates it again"
          },
          {
            "type": "bullet",
            "text": "3.6 Reading Temperature and Humidity with DHT11"
          },
          {
            "type": "paragraph",
            "text": "Not all inputs are simple HIGH or LOW signals. Some sensors, like the DHT11, provide more detailed data."
          },
          {
            "type": "paragraph",
            "text": "First, you can set which sensor the pin is physically connected to:"
          },
          {
            "type": "image",
            "text": "/lecs/levels/Level 2/2.3/Concept Building/images/section_5.png"
          },
          {
            "type": "paragraph",
            "text": "The DHT11 sensor is used to measure:"
          },
          {
            "type": "bullet",
            "text": "Temperature"
          },
          {
            "type": "bullet",
            "text": "Humidity"
          },
          {
            "type": "paragraph",
            "text": "Instead of sending just HIGH or LOW, it sends digital data values that represent real-world measurements."
          },
          {
            "type": "paragraph",
            "text": "For example:"
          },
          {
            "type": "bullet",
            "text": "Temperature → 28°C"
          },
          {
            "type": "bullet",
            "text": "Humidity → 65%"
          },
          {
            "type": "paragraph",
            "text": "The ESP32 reads this data through a pin and converts it into meaningful information inside the program."
          },
          {
            "type": "paragraph",
            "text": "This means:"
          },
          {
            "type": "bullet",
            "text": "The ESP32 is not only detecting actions (like a button press)"
          },
          {
            "type": "bullet",
            "text": "It can also measure environmental conditions"
          },
          {
            "type": "paragraph",
            "text": "Our system allows you to read these values and store them into variables (temp, humidity etc.) You can then use this information to perform a certain action based on the conditions of your environment.  An example use case can be a Smart Fan ; turn the fan on when the room gets hot and humid."
          }
        ]
      },
      {
        "number": "3.2.6",
        "title": "Key Insight of This Lesson",
        "icon": "🔑",
        "accent": "#0EA5E9",
        "blocks": [
          {
            "type": "paragraph",
            "text": "The most important concept in this lesson is:"
          },
          {
            "type": "paragraph",
            "text": "The ESP32 converts physical actions into digital values (HIGH and LOW) that can be used in a program."
          },
          {
            "type": "paragraph",
            "text": "You are now able to:"
          },
          {
            "type": "bullet",
            "text": "Detect user actions"
          },
          {
            "type": "bullet",
            "text": "Represent them as data"
          },
          {
            "type": "bullet",
            "text": "Use that data to control behavior"
          },
          {
            "type": "paragraph",
            "text": "This is a critical step toward building interactive systems."
          }
        ]
      },
      {
        "number": "3.3.1",
        "title": "Overview",
        "icon": "📝",
        "accent": "#6366F1",
        "blocks": [
          {
            "type": "paragraph",
            "text": "Reading input means checking the state of a pin connected to an external device, such as a button."
          },
          {
            "type": "image",
            "text": "/lecs/levels/Level 2/2.3/Concept Building/images/section_0.png"
          },
          {
            "type": "paragraph",
            "text": "The ESP32 does not understand actions like “pressed” or “not pressed” directly."
          },
          {
            "type": "paragraph",
            "text": "Instead, it:"
          },
          {
            "type": "bullet",
            "text": "Reads the electrical signal on the pin"
          },
          {
            "type": "bullet",
            "text": "Determines its state"
          },
          {
            "type": "bullet",
            "text": "Uses that value inside the program"
          },
          {
            "type": "paragraph",
            "text": "This process happens continuously while the program is running."
          }
        ]
      },
      {
        "number": "3.3.2",
        "title": "What are HIGH and LOW?",
        "icon": "💡",
        "accent": "#F59E0B",
        "blocks": [
          {
            "type": "paragraph",
            "text": "HIGH and LOW are the two possible digital states of a signal."
          },
          {
            "type": "bullet",
            "text": "HIGH means the signal is present (usually voltage is applied)"
          },
          {
            "type": "bullet",
            "text": "LOW means the signal is absent (no voltage)"
          },
          {
            "type": "paragraph",
            "text": "These two states form the basis of digital systems."
          },
          {
            "type": "image",
            "text": "/lecs/levels/Level 2/2.3/Concept Building/images/section_1.png"
          },
          {
            "type": "paragraph",
            "text": "You can think of them as:"
          },
          {
            "type": "bullet",
            "text": "HIGH → 1 (ON)"
          },
          {
            "type": "bullet",
            "text": "LOW → 0 (OFF)"
          },
          {
            "type": "paragraph",
            "text": "All digital systems, including the ESP32, work using these two values."
          }
        ]
      },
      {
        "number": "3.3.3",
        "title": "How Does ESP32 Read a Button?",
        "icon": "📝",
        "accent": "#10B981",
        "blocks": [
          {
            "type": "paragraph",
            "text": "When a button is connected to a pin:"
          },
          {
            "type": "bullet",
            "text": "If the button is pressed → the pin reads HIGH"
          },
          {
            "type": "bullet",
            "text": "If the button is not pressed → the pin reads LOW"
          },
          {
            "type": "image",
            "text": "/lecs/levels/Level 2/2.3/Concept Building/images/section_2.png"
          },
          {
            "type": "paragraph",
            "text": "The ESP32 continuously checks this pin and updates the value."
          },
          {
            "type": "paragraph",
            "text": "This means:"
          },
          {
            "type": "bullet",
            "text": "A physical press becomes a digital signal"
          },
          {
            "type": "bullet",
            "text": "The ESP32 converts real-world actions into data"
          },
          {
            "type": "image",
            "text": "/lecs/levels/Level 2/2.3/Concept Building/images/section_3.png"
          }
        ]
      },
      {
        "number": "3.3.4",
        "title": "How is the Input Value Used?",
        "icon": "📊",
        "accent": "#EF4444",
        "blocks": [
          {
            "type": "paragraph",
            "text": "Once the ESP32 reads the input:"
          },
          {
            "type": "bullet",
            "text": "The value (HIGH or LOW) is stored"
          },
          {
            "type": "bullet",
            "text": "This value can be used in the program"
          },
          {
            "type": "bullet",
            "text": "It can control outputs or trigger actions"
          },
          {
            "type": "paragraph",
            "text": "For example:"
          },
          {
            "type": "bullet",
            "text": "HIGH → can be used to turn ON an LED"
          },
          {
            "type": "bullet",
            "text": "LOW → can be used to turn OFF an LED"
          },
          {
            "type": "paragraph",
            "text": "This is how input becomes useful in programming."
          },
          {
            "type": "image",
            "text": "/lecs/levels/Level 2/2.3/Concept Building/images/section_4.png"
          },
          {
            "type": "callout",
            "text": "Note: If the yellow “? if “ blocks confuse you, don’t worry, they shall be explained in detail later.",
            "icon": "💡",
            "bg": "#EFF6FF",
            "border": "#BFDBFE",
            "textColor": "#1E40AF"
          }
        ]
      },
      {
        "number": "3.3.5",
        "title": "Continuous Reading and Real-Time Behavior",
        "icon": "⏳",
        "accent": "#8B5CF6",
        "blocks": [
          {
            "type": "paragraph",
            "text": "The ESP32 does not read the input just once."
          },
          {
            "type": "paragraph",
            "text": "It continuously:"
          },
          {
            "type": "bullet",
            "text": "Reads the input"
          },
          {
            "type": "bullet",
            "text": "Updates the value"
          },
          {
            "type": "bullet",
            "text": "Reacts to changes"
          },
          {
            "type": "paragraph",
            "text": "This creates real-time behavior where:"
          },
          {
            "type": "bullet",
            "text": "Pressing the button immediately changes the system"
          },
          {
            "type": "bullet",
            "text": "Releasing the button updates it again"
          },
          {
            "type": "bullet",
            "text": "3.6 Reading Temperature and Humidity with DHT11"
          },
          {
            "type": "paragraph",
            "text": "Not all inputs are simple HIGH or LOW signals. Some sensors, like the DHT11, provide more detailed data."
          },
          {
            "type": "paragraph",
            "text": "First, you can set which sensor the pin is physically connected to:"
          },
          {
            "type": "image",
            "text": "/lecs/levels/Level 2/2.3/Concept Building/images/section_5.png"
          },
          {
            "type": "paragraph",
            "text": "The DHT11 sensor is used to measure:"
          },
          {
            "type": "bullet",
            "text": "Temperature"
          },
          {
            "type": "bullet",
            "text": "Humidity"
          },
          {
            "type": "paragraph",
            "text": "Instead of sending just HIGH or LOW, it sends digital data values that represent real-world measurements."
          },
          {
            "type": "paragraph",
            "text": "For example:"
          },
          {
            "type": "bullet",
            "text": "Temperature → 28°C"
          },
          {
            "type": "bullet",
            "text": "Humidity → 65%"
          },
          {
            "type": "paragraph",
            "text": "The ESP32 reads this data through a pin and converts it into meaningful information inside the program."
          },
          {
            "type": "paragraph",
            "text": "This means:"
          },
          {
            "type": "bullet",
            "text": "The ESP32 is not only detecting actions (like a button press)"
          },
          {
            "type": "bullet",
            "text": "It can also measure environmental conditions"
          },
          {
            "type": "paragraph",
            "text": "Our system allows you to read these values and store them into variables (temp, humidity etc.) You can then use this information to perform a certain action based on the conditions of your environment.  An example use case can be a Smart Fan ; turn the fan on when the room gets hot and humid."
          }
        ]
      },
      {
        "number": "3.3.6",
        "title": "Key Insight of This Lesson",
        "icon": "🔑",
        "accent": "#0EA5E9",
        "blocks": [
          {
            "type": "paragraph",
            "text": "The most important concept in this lesson is:"
          },
          {
            "type": "paragraph",
            "text": "The ESP32 converts physical actions into digital values (HIGH and LOW) that can be used in a program."
          },
          {
            "type": "paragraph",
            "text": "You are now able to:"
          },
          {
            "type": "bullet",
            "text": "Detect user actions"
          },
          {
            "type": "bullet",
            "text": "Represent them as data"
          },
          {
            "type": "bullet",
            "text": "Use that data to control behavior"
          },
          {
            "type": "paragraph",
            "text": "This is a critical step toward building interactive systems."
          }
        ]
      }
    ],
    "quiz": [
      {
        "question": "What condition does the Logical AND (&&) operator require to return true?",
        "options": [
          "It requires only one of its sub-conditions to be true",
          "It requires all connected sub-conditions to be simultaneously true",
          "It requires all connected sub-conditions to be simultaneously false",
          "It only works with analog numbers"
        ],
        "correct": 1,
        "explanation": "The AND operator performs logical conjunction. The entire expression evaluates to true if and only if every single term is true."
      },
      {
        "question": "What condition does the Logical OR (||) operator require to evaluate to true?",
        "options": [
          "It requires every single connected sub-condition to be true",
          "It requires at least one of its sub-conditions to be true",
          "It requires all connected sub-conditions to be false",
          "It only checks digital pin states"
        ],
        "correct": 1,
        "explanation": "The OR operator performs logical disjunction. It returns true if at least one condition in the expression is true."
      },
      {
        "question": "What is the action of the Logical NOT (!) operator?",
        "options": [
          "It deletes a variable's value from the hardware memory",
          "It inverts a boolean state (transforming true to false, or HIGH to LOW)",
          "It pauses the loop execution for a fraction of a second",
          "It multiplies two sensor states together"
        ],
        "correct": 1,
        "explanation": "The NOT operator inverts boolean logic. Applying `!` to true yields false, and applying it to a HIGH read yields LOW."
      }
    ]
  },
  "2-2-4-intro": {
    "levelTitle": "Level 2.4: Making Decisions (IF Logic)",
    "lessonTitle": " Making Decisions (IF Logic)",
    "stepType": "Introduction",
    "sections": [
      {
        "number": "4.1.1",
        "title": "Overview",
        "icon": "📝",
        "accent": "#6366F1",
        "blocks": [
          {
            "type": "paragraph",
            "text": "In this lesson, you will learn how to make decisions in your ESP32 program using IF logic."
          },
          {
            "type": "paragraph",
            "text": "You will use input values, such as a button state, to control what action the system performs. This is the first time you will see how your program can choose between different behaviors."
          },
          {
            "type": "paragraph",
            "text": "The goal of this lesson is not just to use IF statements, but to understand that:"
          },
          {
            "type": "bullet",
            "text": "Your blocks are instructions"
          },
          {
            "type": "bullet",
            "text": "The ESP32 executes those instructions"
          },
          {
            "type": "bullet",
            "text": "The ESP32 can check conditions"
          },
          {
            "type": "bullet",
            "text": "The program can take different actions based on those conditions"
          },
          {
            "type": "image",
            "text": "/lecs/levels/Level 2/2.4/Introduction/images/section_0.png"
          },
          {
            "type": "paragraph",
            "text": "By the end of this lesson, you will have created a system where the ESP32 makes decisions and changes behavior depending on input values."
          }
        ]
      }
    ]
  },
  "2-2-4-concept": {
    "levelTitle": "Level 2.4: Making Decisions (IF Logic)",
    "lessonTitle": " Making Decisions (IF Logic)",
    "stepType": "What is Decision Making?",
    "sections": [
      {
        "number": "4.2.1",
        "title": "Overview",
        "icon": "📝",
        "accent": "#6366F1",
        "blocks": [
          {
            "type": "paragraph",
            "text": "Decision making is the ability of the ESP32 to choose between different actions based on a condition."
          },
          {
            "type": "paragraph",
            "text": "In earlier lessons:"
          },
          {
            "type": "bullet",
            "text": "The ESP32 followed fixed instructions"
          },
          {
            "type": "bullet",
            "text": "The behavior was always the same"
          },
          {
            "type": "image",
            "text": "/lecs/levels/Level 2/2.4/Concept Building/images/section_0.png"
          },
          {
            "type": "paragraph",
            "text": "Now:"
          },
          {
            "type": "bullet",
            "text": "The ESP32 evaluates a condition"
          },
          {
            "type": "bullet",
            "text": "It selects what to do next"
          },
          {
            "type": "paragraph",
            "text": "This allows the system to behave differently in different situations."
          }
        ]
      },
      {
        "number": "4.2.2",
        "title": "What is an IF Condition?",
        "icon": "💡",
        "accent": "#F59E0B",
        "blocks": [
          {
            "type": "paragraph",
            "text": "An IF condition is a rule that checks whether something is true or false."
          },
          {
            "type": "paragraph",
            "text": "It creates a decision point in your program."
          },
          {
            "type": "image",
            "text": "/lecs/levels/Level 2/2.4/Concept Building/images/section_1.png"
          },
          {
            "type": "paragraph",
            "text": "Structure:"
          },
          {
            "type": "bullet",
            "text": "IF condition is TRUE → execute one action"
          },
          {
            "type": "bullet",
            "text": "ELSE → execute another action"
          },
          {
            "type": "paragraph",
            "text": "Only one path is executed at a time."
          }
        ]
      },
      {
        "number": "4.2.3",
        "title": "Conditions and comparisons",
        "icon": "📝",
        "accent": "#10B981",
        "blocks": [
          {
            "type": "paragraph",
            "text": "A condition is based on comparing values."
          },
          {
            "type": "paragraph",
            "text": "For example:"
          },
          {
            "type": "paragraph",
            "text": "Is the button HIGH?"
          },
          {
            "type": "paragraph",
            "text": "Is a value equal to something?"
          },
          {
            "type": "paragraph",
            "text": "These comparisons result in:"
          },
          {
            "type": "bullet",
            "text": "TRUE"
          },
          {
            "type": "bullet",
            "text": "FALSE"
          },
          {
            "type": "image",
            "text": "/lecs/levels/Level 2/2.4/Concept Building/images/section_2.png"
          },
          {
            "type": "paragraph",
            "text": "Example:"
          },
          {
            "type": "bullet",
            "text": "Button = HIGH → TRUE"
          },
          {
            "type": "bullet",
            "text": "Button = LOW → FALSE"
          },
          {
            "type": "paragraph",
            "text": "This TRUE or FALSE result determines what action is taken."
          }
        ]
      },
      {
        "number": "4.2.4",
        "title": "Connecting Input to Decisions",
        "icon": "🔀",
        "accent": "#EF4444",
        "blocks": [
          {
            "type": "paragraph",
            "text": "The ESP32 uses input values inside IF conditions."
          },
          {
            "type": "paragraph",
            "text": "Example Flow:"
          },
          {
            "type": "bullet",
            "text": "The ESP32 reads the button state"
          },
          {
            "type": "bullet",
            "text": "It checks: “Is the button HIGH?”"
          },
          {
            "type": "bullet",
            "text": "If TRUE → it performs one action"
          },
          {
            "type": "bullet",
            "text": "If FALSE → it performs another action"
          },
          {
            "type": "image",
            "text": "/lecs/levels/Level 2/2.4/Concept Building/images/section_3.png"
          },
          {
            "type": "paragraph",
            "text": "Example:"
          },
          {
            "type": "image",
            "text": "/lecs/levels/Level 2/2.4/Concept Building/images/section_4.png"
          },
          {
            "type": "bullet",
            "text": "IF button is HIGH → LED ON"
          },
          {
            "type": "bullet",
            "text": "ELSE → LED OFF"
          }
        ]
      },
      {
        "number": "4.2.5",
        "title": "From decision to behavior",
        "icon": "🔀",
        "accent": "#8B5CF6",
        "blocks": [
          {
            "type": "paragraph",
            "text": "Once decisions are introduced, the system’s behavior changes based on input."
          },
          {
            "type": "paragraph",
            "text": "This creates a cause-and-effect relationship:"
          },
          {
            "type": "bullet",
            "text": "Cause → Button is pressed"
          },
          {
            "type": "bullet",
            "text": "Effect → LED turns ON"
          },
          {
            "type": "bullet",
            "text": "Cause → Button is released"
          },
          {
            "type": "bullet",
            "text": "Effect → LED turns OFF"
          },
          {
            "type": "paragraph",
            "text": "The ESP32 acts as the decision-maker that connects input to action."
          },
          {
            "type": "paragraph",
            "text": "When Button is Off:"
          },
          {
            "type": "image",
            "text": "/lecs/levels/Level 2/2.4/Concept Building/images/section_5.png"
          },
          {
            "type": "paragraph",
            "text": "When Button is On:"
          },
          {
            "type": "image",
            "text": "/lecs/levels/Level 2/2.4/Concept Building/images/section_6.png"
          }
        ]
      },
      {
        "number": "4.2.6",
        "title": "Understanding system behavior",
        "icon": "⚙️",
        "accent": "#0EA5E9",
        "blocks": [
          {
            "type": "paragraph",
            "text": "A system’s behavior is defined by how it:"
          },
          {
            "type": "bullet",
            "text": "Observes input"
          },
          {
            "type": "bullet",
            "text": "Evaluates conditions"
          },
          {
            "type": "bullet",
            "text": "Executes actions"
          },
          {
            "type": "paragraph",
            "text": "This creates a structured flow:"
          },
          {
            "type": "bullet",
            "text": "Input → Condition → Action"
          },
          {
            "type": "image",
            "text": "/lecs/levels/Level 2/2.4/Concept Building/images/section_7.png"
          },
          {
            "type": "paragraph",
            "text": "Because the ESP32 keeps checking and updating:"
          },
          {
            "type": "bullet",
            "text": "The system responds immediately"
          },
          {
            "type": "bullet",
            "text": "The output reflects the latest input"
          },
          {
            "type": "paragraph",
            "text": "This is why:"
          },
          {
            "type": "paragraph",
            "text": "When you press the button, the LED reacts instantly."
          }
        ]
      },
      {
        "number": "4.2.7",
        "title": "Expanding the same logic",
        "icon": "🔀",
        "accent": "#F97316",
        "blocks": [
          {
            "type": "paragraph",
            "text": "This same idea can be extended to more complex systems."
          },
          {
            "type": "paragraph",
            "text": "For example:"
          },
          {
            "type": "image",
            "text": "/lecs/levels/Level 2/2.4/Concept Building/images/section_8.png"
          },
          {
            "type": "bullet",
            "text": "IF button1 is pressed → LED1 ON"
          },
          {
            "type": "bullet",
            "text": "IF button2 is pressed → LED2 ON"
          },
          {
            "type": "paragraph",
            "text": "Or:"
          },
          {
            "type": "bullet",
            "text": "IF temperature is high → turn fan ON"
          },
          {
            "type": "bullet",
            "text": "ELSE → keep fan OFF"
          },
          {
            "type": "paragraph",
            "text": "This shows how simple logic can grow into real-world systems."
          }
        ]
      },
      {
        "number": "4.2.8",
        "title": "From Simple Control to Smart Systems",
        "icon": "⚙️",
        "accent": "#14B8A6",
        "blocks": [
          {
            "type": "paragraph",
            "text": "The system you built is a basic version of real-world smart systems."
          },
          {
            "type": "paragraph",
            "text": "This same pattern is used in:"
          },
          {
            "type": "bullet",
            "text": "Home automation"
          },
          {
            "type": "bullet",
            "text": "Security systems"
          },
          {
            "type": "bullet",
            "text": "Industrial control systems"
          },
          {
            "type": "paragraph",
            "text": "All follow the same structure:"
          },
          {
            "type": "bullet",
            "text": "Input → Condition → Action"
          }
        ]
      },
      {
        "number": "4.2.9",
        "title": "Key Insights Of This Lesson",
        "icon": "🔑",
        "accent": "#6366F1",
        "blocks": [
          {
            "type": "paragraph",
            "text": "The most important concept in this lesson is:"
          },
          {
            "type": "paragraph",
            "text": "The ESP32 can evaluate conditions and change its behavior based on input."
          },
          {
            "type": "paragraph",
            "text": "You are now building systems that:"
          },
          {
            "type": "bullet",
            "text": "Observe (input)"
          },
          {
            "type": "bullet",
            "text": "Decide (condition)"
          },
          {
            "type": "bullet",
            "text": "Act (output)"
          },
          {
            "type": "paragraph",
            "text": "This is the foundation of interactive and intelligent systems."
          }
        ]
      }
    ],
    "quiz": [
      {
        "question": "What is a variable in programming?",
        "options": [
          "A physical hardware component like a button or switch",
          "A labeled space in memory used to store data that can change as the program runs",
          "A colored LED light bulb",
          "A command that pauses the ESP32"
        ],
        "correct": 1,
        "explanation": "Variables are named locations in memory that act as data containers, holding values that can be read, written, and manipulated."
      },
      {
        "question": "What does the instruction \"counter = counter + 1\" do?",
        "options": [
          "It changes the counter name to \"1\"",
          "It reads the current value of counter, adds 1, and stores the new sum back into counter",
          "It resets the counter back to zero",
          "It checks if the counter equals 1"
        ],
        "correct": 1,
        "explanation": "This is an increment operation. The processor evaluates the right-hand side (`counter + 1`) and reassigns the resulting value to the variable."
      },
      {
        "question": "Why is variable initialization (like setting counter to 0) typically placed above or in Setup?",
        "options": [
          "To force the variable to reset to zero on every loop iteration",
          "To define its initial starting value once, preventing it from resetting on every loop cycle",
          "To delete it when the program is stopped",
          "To speed up variables loading times"
        ],
        "correct": 1,
        "explanation": "If a variable is initialized inside Loop, it will reset to its starting value on every cycle, erasing any cumulative changes (like counting steps)."
      }
    ]
  },
  "2-2-5-intro": {
    "levelTitle": "Level 2.5: Introducing Inputs (Buttons)",
    "lessonTitle": " Introducing Inputs (Buttons)",
    "stepType": "Introduction",
    "sections": [
      {
        "number": "4.1.1",
        "title": "Overview",
        "icon": "📝",
        "accent": "#6366F1",
        "blocks": [
          {
            "type": "paragraph",
            "text": "In this lesson, you will learn how to introduce input into your ESP32 program using a button."
          },
          {
            "type": "paragraph",
            "text": "You will use a button to send signals to the ESP32 and observe how it detects user interaction. This is the first time you will see how external actions can affect the behavior of your program."
          },
          {
            "type": "image",
            "text": "/lecs/levels/Level 2/2.5/Introduction/images/section_0.png"
          },
          {
            "type": "paragraph",
            "text": "The goal of this lesson is not just to use a button, but to understand that:"
          },
          {
            "type": "bullet",
            "text": "Your blocks are instructions"
          },
          {
            "type": "bullet",
            "text": "The ESP32 executes those instructions"
          },
          {
            "type": "bullet",
            "text": "External devices can send signals to the ESP32"
          },
          {
            "type": "bullet",
            "text": "The program can respond to user actions"
          },
          {
            "type": "paragraph",
            "text": "By the end of this lesson, you will have created a system where a physical action (button press) sends input to the ESP32 and becomes part of the program’s behavior."
          }
        ]
      }
    ]
  },
  "2-2-5-concept": {
    "levelTitle": "Level 2.5: Introducing Inputs (Buttons)",
    "lessonTitle": " Introducing Inputs (Buttons)",
    "stepType": "What is an Input?",
    "sections": [
      {
        "number": "4.2.1",
        "title": "Overview",
        "icon": "📝",
        "accent": "#6366F1",
        "blocks": [
          {
            "type": "paragraph",
            "text": "An input is any signal that is sent to the ESP32 from an external device."
          },
          {
            "type": "paragraph",
            "text": "Inputs allow the ESP32 to:"
          },
          {
            "type": "bullet",
            "text": "Receive information"
          },
          {
            "type": "bullet",
            "text": "Detect changes in the environment"
          },
          {
            "type": "bullet",
            "text": "Respond to user actions"
          },
          {
            "type": "image",
            "text": "/lecs/levels/Level 2/2.5/Concept Building/images/section_0.png"
          },
          {
            "type": "paragraph",
            "text": "Examples of inputs include:"
          },
          {
            "type": "bullet",
            "text": "Buttons"
          },
          {
            "type": "bullet",
            "text": "Sensors"
          },
          {
            "type": "bullet",
            "text": "Switches"
          }
        ]
      },
      {
        "number": "4.2.2",
        "title": "What is a Button?",
        "icon": "💡",
        "accent": "#F59E0B",
        "blocks": [
          {
            "type": "paragraph",
            "text": "A button is a simple input device used to send a signal to the ESP32."
          },
          {
            "type": "paragraph",
            "text": "It has two states:"
          },
          {
            "type": "bullet",
            "text": "Pressed"
          },
          {
            "type": "bullet",
            "text": "Not Pressed"
          },
          {
            "type": "image",
            "text": "/lecs/levels/Level 2/2.5/Concept Building/images/section_1.png"
          },
          {
            "type": "paragraph",
            "text": "It is one of the most basic ways for a user to interact with a system."
          }
        ]
      },
      {
        "number": "4.2.3",
        "title": "How Does a Button Work?",
        "icon": "📝",
        "accent": "#10B981",
        "blocks": [
          {
            "type": "paragraph",
            "text": "When a button is connected to a circuit:"
          },
          {
            "type": "bullet",
            "text": "When pressed → the circuit is completed and a signal is sent"
          },
          {
            "type": "bullet",
            "text": "When not pressed → the circuit is open and no signal is sent"
          },
          {
            "type": "paragraph",
            "text": "The ESP32 reads this electrical change through a pin."
          },
          {
            "type": "image",
            "text": "/lecs/levels/Level 2/2.5/Concept Building/images/section_2.png"
          }
        ]
      },
      {
        "number": "4.2.4",
        "title": "Why Do We Need Inputs?",
        "icon": "🔀",
        "accent": "#EF4444",
        "blocks": [
          {
            "type": "paragraph",
            "text": "Inputs are important because they allow systems to:"
          },
          {
            "type": "bullet",
            "text": "Respond to user actions"
          },
          {
            "type": "bullet",
            "text": "Interact with the environment"
          },
          {
            "type": "bullet",
            "text": "Change behavior dynamically"
          },
          {
            "type": "image",
            "text": "/lecs/levels/Level 2/2.5/Concept Building/images/section_3.png"
          },
          {
            "type": "paragraph",
            "text": "Without inputs:"
          },
          {
            "type": "bullet",
            "text": "The system would only follow fixed instructions"
          },
          {
            "type": "bullet",
            "text": "There would be no interaction"
          }
        ]
      },
      {
        "number": "4.2.5",
        "title": "Key Insight of This Lesson",
        "icon": "🔑",
        "accent": "#8B5CF6",
        "blocks": [
          {
            "type": "paragraph",
            "text": "The most important concept in this lesson is:"
          },
          {
            "type": "paragraph",
            "text": "The ESP32 can receive signals from the outside world."
          },
          {
            "type": "paragraph",
            "text": "You are no longer just controlling outputs."
          },
          {
            "type": "paragraph",
            "text": "You are building systems that can detect and respond to user interaction."
          }
        ]
      }
    ]
  },
  "3-3-1-intro": {
    "levelTitle": "LEVEL 3.1: Reading Changing Values (Analog Input)",
    "lessonTitle": " Reading Changing Values (Analog Input)",
    "stepType": "1. Introduction",
    "sections": [
      {
        "number": "1.1.1",
        "title": "Overview",
        "icon": "📝",
        "accent": "#6366F1",
        "blocks": [
          {
            "type": "paragraph",
            "text": "In the previous levels, you worked with signals that had only two states:"
          },
          {
            "type": "bullet",
            "text": "ON or OFF"
          },
          {
            "type": "bullet",
            "text": "HIGH or LOW"
          },
          {
            "type": "paragraph",
            "text": "However, not all inputs in real-world systems behave this way."
          },
          {
            "type": "paragraph",
            "text": "Many inputs change continuously instead of switching between two fixed states."
          },
          {
            "type": "paragraph",
            "text": "In this lesson, you will explore a new type of input where values are not limited to just two options. Instead, they can vary across a range."
          },
          {
            "type": "image",
            "text": "/lecs/levels/Level 3/Level 3.1/Introduction/images/1_0.png"
          },
          {
            "type": "paragraph",
            "text": "By the end of this lesson, you will understand how the ESP32 reads changing values and how these values behave over time."
          }
        ]
      }
    ]
  },
  "3-3-1-concept": {
    "levelTitle": "LEVEL 3.1: Reading Changing Values (Analog Input)",
    "lessonTitle": " Reading Changing Values (Analog Input)",
    "stepType": "3.1 What kind of values are you seeing?",
    "sections": [
      {
        "number": "1.2.1",
        "title": "Overview",
        "icon": "📝",
        "accent": "#6366F1",
        "blocks": [
          {
            "type": "paragraph",
            "text": "A lot of sensors in real systems return data using analog signals."
          },
          {
            "type": "paragraph",
            "text": "This means instead of giving simple ON or OFF values, they produce continuously changing signals that represent real-world conditions."
          },
          {
            "type": "paragraph",
            "text": "When you print the analog value, you will notice something different from digital input."
          },
          {
            "type": "paragraph",
            "text": "Instead of seeing only:"
          },
          {
            "type": "bullet",
            "text": "0 or 1"
          },
          {
            "type": "paragraph",
            "text": "You will see a wide range of numbers."
          },
          {
            "type": "image",
            "text": "/lecs/levels/Level 3/Level 3.1/Concept Building/images/3.1_0.png"
          },
          {
            "type": "paragraph",
            "text": "These numbers continuously change as you interact with the sensor."
          },
          {
            "type": "paragraph",
            "text": "This means:"
          },
          {
            "type": "bullet",
            "text": "The system is no longer reading simple states, it is reading real-world variation"
          }
        ]
      },
      {
        "number": "1.2.2",
        "title": "3.2 What is an analog sensor?",
        "icon": "🔬",
        "accent": "#F59E0B",
        "blocks": [
          {
            "type": "paragraph",
            "text": "An analog sensor (input) is a device that converts a physical property into a continuous electrical signal."
          },
          {
            "type": "image",
            "text": "/lecs/levels/Level 3/Level 3.1/Concept Building/images/3.2_0.png"
          },
          {
            "type": "paragraph",
            "text": "In this level, you are working with:"
          },
          {
            "type": "bullet",
            "text": "Photoresistor (Light Sensor)"
          },
          {
            "type": "bullet",
            "text": "Measures light intensity"
          },
          {
            "type": "bullet",
            "text": "Bright light → higher or lower values depending on wiring"
          },
          {
            "type": "bullet",
            "text": "Dark environment → opposite values"
          },
          {
            "type": "image",
            "text": "/lecs/levels/Level 3/Level 3.1/Concept Building/images/3.2_1.png"
          },
          {
            "type": "bullet",
            "text": "Potentiometer (Rotary Input)"
          },
          {
            "type": "bullet",
            "text": "Measures position of rotation"
          },
          {
            "type": "bullet",
            "text": "Left side → low values"
          },
          {
            "type": "bullet",
            "text": "Right side → high values"
          },
          {
            "type": "bullet",
            "text": "Middle → medium values"
          },
          {
            "type": "paragraph",
            "text": "These sensors do not give fixed results—they give a range of values based on physical change."
          }
        ]
      },
      {
        "number": "1.2.3",
        "title": "3.3 How does the ESP32 read analog values?",
        "icon": "📊",
        "accent": "#10B981",
        "blocks": [
          {
            "type": "paragraph",
            "text": "The ESP32 does not directly understand light, rotation or any other physical change."
          },
          {
            "type": "image",
            "text": "/lecs/levels/Level 3/Level 3.1/Concept Building/images/3.3_0.png"
          },
          {
            "type": "paragraph",
            "text": "Instead, It measures the input signal and converts it into numbers."
          },
          {
            "type": "paragraph",
            "text": "Some instances of this are:"
          },
          {
            "type": "bullet",
            "text": "Measures electrical resistance or voltage change"
          },
          {
            "type": "bullet",
            "text": "Converts it into a numeric value"
          },
          {
            "type": "bullet",
            "text": "Represents that value in a digital range"
          }
        ]
      },
      {
        "number": "1.2.4",
        "title": "3.4 Understanding continuous change",
        "icon": "📝",
        "accent": "#EF4444",
        "blocks": [
          {
            "type": "paragraph",
            "text": "Unlike digital input, which jumps between two states, analog input changes smoothly."
          },
          {
            "type": "paragraph",
            "text": "If you adjust the input slowly:"
          },
          {
            "type": "bullet",
            "text": "The values change gradually"
          },
          {
            "type": "paragraph",
            "text": "If you adjust it quickly:"
          },
          {
            "type": "bullet",
            "text": "The values change more rapidly"
          },
          {
            "type": "image",
            "text": "/lecs/levels/Level 3/Level 3.1/Concept Building/images/3.4_0.png"
          },
          {
            "type": "paragraph",
            "text": "This creates a continuous stream of values that reflect the current condition of the input."
          },
          {
            "type": "bullet",
            "text": "So instead of just simple ON / OFF states, You now have degrees of change"
          },
          {
            "type": "paragraph",
            "text": "This is much closer to how the real world behaves."
          },
          {
            "type": "image",
            "text": "/lecs/levels/Level 3/Level 3.1/Concept Building/images/3.4_1.png"
          },
          {
            "type": "image",
            "text": "/lecs/levels/Level 3/Level 3.1/Concept Building/images/3.4_2.png"
          }
        ]
      },
      {
        "number": "1.2.5",
        "title": "3.5 Understanding real-world sensors",
        "icon": "🔬",
        "accent": "#8B5CF6",
        "blocks": [
          {
            "type": "paragraph",
            "text": "Different sensors represent different physical properties:"
          },
          {
            "type": "bullet",
            "text": "Photoresistor → light intensity"
          },
          {
            "type": "bullet",
            "text": "Potentiometer → position"
          },
          {
            "type": "bullet",
            "text": "Future sensors → temperature, pressure, distance"
          },
          {
            "type": "paragraph",
            "text": "But they all share one key idea, they convert physical change into measurable values."
          }
        ]
      },
      {
        "number": "1.2.6",
        "title": "3.6 Why range matters",
        "icon": "❓",
        "accent": "#0EA5E9",
        "blocks": [
          {
            "type": "paragraph",
            "text": "Analog values always stay within a fixed range."
          },
          {
            "type": "paragraph",
            "text": "For ESP32:"
          },
          {
            "type": "bullet",
            "text": "Minimum → 0"
          },
          {
            "type": "bullet",
            "text": "Maximum → 4095"
          },
          {
            "type": "paragraph",
            "text": "This means:"
          },
          {
            "type": "image",
            "text": "/lecs/levels/Level 3/Level 3.1/Concept Building/images/3.6_0.png"
          },
          {
            "type": "bullet",
            "text": "0 = lowest physical input"
          },
          {
            "type": "bullet",
            "text": "4095 = highest physical input"
          },
          {
            "type": "bullet",
            "text": "Everything in between = intermediate states"
          },
          {
            "type": "paragraph",
            "text": "This range allows the system to:"
          },
          {
            "type": "bullet",
            "text": "Detect small changes"
          },
          {
            "type": "bullet",
            "text": "Represent fine variations"
          },
          {
            "type": "bullet",
            "text": "Respond smoothly"
          }
        ]
      },
      {
        "number": "1.2.7",
        "title": "3.7 Why values are not always stable",
        "icon": "📊",
        "accent": "#F97316",
        "blocks": [
          {
            "type": "paragraph",
            "text": "You may notice small fluctuations even when the input seems unchanged."
          },
          {
            "type": "paragraph",
            "text": "This happens because:"
          },
          {
            "type": "bullet",
            "text": "Electrical signals are not perfectly stable"
          },
          {
            "type": "bullet",
            "text": "Real-world environments are noisy"
          },
          {
            "type": "bullet",
            "text": "Sensors are sensitive to small changes"
          },
          {
            "type": "paragraph",
            "text": "So slight variations are normal and expected."
          },
          {
            "type": "image",
            "text": "/lecs/levels/Level 3/Level 3.1/Concept Building/images/3.7_0.png"
          }
        ]
      },
      {
        "number": "1.2.8",
        "title": "3.8 From physical world to data",
        "icon": "📝",
        "accent": "#14B8A6",
        "blocks": [
          {
            "type": "paragraph",
            "text": "Now your system works like this:"
          },
          {
            "type": "bullet",
            "text": "Physical change → Sensor → Electrical signal → Numeric value → ESP32"
          },
          {
            "type": "paragraph",
            "text": "This is the foundation of all embedded systems."
          }
        ]
      },
      {
        "number": "1.2.9",
        "title": "3.9 Key Insight of This Lesson",
        "icon": "🔑",
        "accent": "#6366F1",
        "blocks": [
          {
            "type": "bullet",
            "text": "Analog sensors measure continuous physical changes"
          },
          {
            "type": "bullet",
            "text": "Photoresistors measure light"
          },
          {
            "type": "bullet",
            "text": "Potentiometers measure position"
          },
          {
            "type": "bullet",
            "text": "Values change smoothly, not in steps"
          },
          {
            "type": "bullet",
            "text": "ESP32 converts physical signals into numeric ranges"
          },
          {
            "type": "bullet",
            "text": "This enables precise measurement of real-world conditions"
          }
        ]
      }
    ],
    "quiz": [
      {
        "question": "What is the core difference between digital and analog inputs?",
        "options": [
          "Digital inputs have continuous states, whereas analog inputs have only two",
          "Digital inputs read binary ON/OFF states, while analog inputs read continuous, varying voltage levels",
          "Digital inputs are for LEDs, and analog inputs are for buttons",
          "Analog inputs are much faster than digital inputs"
        ],
        "correct": 1,
        "explanation": "Digital reads are binary (HIGH or LOW). Analog inputs sample a continuous range of voltages between 0V and 3.3V, mapping them to numerical ranges."
      },
      {
        "question": "What is the full resolution range of the ESP32's Analog-to-Digital Converter (ADC)?",
        "options": [
          "0 to 255 (8-bit)",
          "0 to 1,023 (10-bit)",
          "0 to 4,095 (12-bit)",
          "0 to 10,000"
        ],
        "correct": 2,
        "explanation": "The ESP32 has a high-resolution 12-bit ADC, which translates analog sensor voltages into discrete integer values from 0 to 4,095."
      },
      {
        "question": "How does an LDR (Photoresistor) work?",
        "options": [
          "It operates as a small electric motor that spins when lit up",
          "It changes its electrical resistance dynamically based on the intensity of light hitting it",
          "It blinks red to warn the user of light shifts",
          "It connects the ESP32 directly to the cloud"
        ],
        "correct": 1,
        "explanation": "An LDR is a light-sensitive resistor. As light increases, its resistance drops, causing the voltage across it to shift in a readable curve."
      }
    ]
  },
  "3-3-2-intro": {
    "levelTitle": "LEVEL 3.3: Controlling Output Intensity (PWM Output)",
    "lessonTitle": " Controlling Output Intensity (PWM Output)",
    "stepType": "1. Introduction",
    "sections": [
      {
        "number": "2.1.1",
        "title": "Overview",
        "icon": "📝",
        "accent": "#6366F1",
        "blocks": [
          {
            "type": "paragraph",
            "text": "In the previous lessons, you learned how to:"
          },
          {
            "type": "bullet",
            "text": "Read continuously changing input values"
          },
          {
            "type": "bullet",
            "text": "Understand what those values represent"
          },
          {
            "type": "paragraph",
            "text": "So far, you have only observed data."
          },
          {
            "type": "paragraph",
            "text": "In this lesson, you will take the next step:"
          },
          {
            "type": "paragraph",
            "text": "You will use values to control an output."
          },
          {
            "type": "paragraph",
            "text": "Instead of turning an LED simply ON or OFF, you will now control how bright it is."
          },
          {
            "type": "paragraph",
            "text": "This introduces a new idea:"
          },
          {
            "type": "paragraph",
            "text": "Outputs are not always binary. They can vary in intensity."
          },
          {
            "type": "image",
            "text": "/lecs/levels/Level 3/Level 3.2/Introduction/images/1_0.png"
          }
        ]
      }
    ]
  },
  "3-3-2-concept": {
    "levelTitle": "LEVEL 3.2: Controlling Output Intensity (PWM Output)",
    "lessonTitle": " Controlling Output Intensity (PWM Output)",
    "stepType": "3.1 Is the LED only ON or OFF?",
    "sections": [
      {
        "number": "2.2.1",
        "title": "Overview",
        "icon": "📝",
        "accent": "#6366F1",
        "blocks": [
          {
            "type": "paragraph",
            "text": "In earlier lessons, the LED had only two states:"
          },
          {
            "type": "bullet",
            "text": "ON"
          },
          {
            "type": "bullet",
            "text": "OFF"
          },
          {
            "type": "paragraph",
            "text": "Now you will notice something different."
          },
          {
            "type": "paragraph",
            "text": "The LED can:"
          },
          {
            "type": "bullet",
            "text": "Glow dimly"
          },
          {
            "type": "bullet",
            "text": "Glow moderately"
          },
          {
            "type": "bullet",
            "text": "Glow brightly"
          },
          {
            "type": "paragraph",
            "text": "This means the LED is no longer limited to two states. It can exist at different levels of brightness. This means the output is no longer binary—it is continuous."
          },
          {
            "type": "image",
            "text": "/lecs/levels/Level 3/Level 3.2/Concept Building/images/3.1_0.png"
          }
        ]
      },
      {
        "number": "2.2.2",
        "title": "3.2 How is this possible?",
        "icon": "📝",
        "accent": "#F59E0B",
        "blocks": [
          {
            "type": "bullet",
            "text": "The ESP32 does not actually send “partial electricity.”"
          },
          {
            "type": "paragraph",
            "text": "Instead, it uses a technique called PWM (Pulse Width Modulation)."
          },
          {
            "type": "paragraph",
            "text": "It works by:"
          },
          {
            "type": "bullet",
            "text": "Switching the signal ON and OFF extremely fast"
          },
          {
            "type": "bullet",
            "text": "So fast that the human eye cannot detect it"
          },
          {
            "type": "bullet",
            "text": "The result appears as different brightness levels"
          },
          {
            "type": "paragraph",
            "text": "So instead of changing electricity strength, it changes time patterns."
          },
          {
            "type": "paragraph",
            "text": "What matters for you is simple:"
          },
          {
            "type": "paragraph",
            "text": "The value you provide controls how strong the output appears."
          },
          {
            "type": "image",
            "text": "/lecs/levels/Level 3/Level 3.2/Concept Building/images/3.2_0.png"
          }
        ]
      },
      {
        "number": "2.2.3",
        "title": "3.3 What do the PWM values represent?",
        "icon": "📊",
        "accent": "#10B981",
        "blocks": [
          {
            "type": "paragraph",
            "text": "PWM uses numbers to control intensity."
          },
          {
            "type": "paragraph",
            "text": "Typically:"
          },
          {
            "type": "bullet",
            "text": "Low values → weak output"
          },
          {
            "type": "bullet",
            "text": "Medium values → balanced output"
          },
          {
            "type": "bullet",
            "text": "High values → strong output"
          },
          {
            "type": "paragraph",
            "text": "For example:"
          },
          {
            "type": "bullet",
            "text": "Low value → LED barely visible"
          },
          {
            "type": "bullet",
            "text": "Medium value → LED clearly visible"
          },
          {
            "type": "bullet",
            "text": "High value → LED fully bright"
          },
          {
            "type": "paragraph",
            "text": "Each value represents how much time the signal stays ON compared to OFF."
          }
        ]
      },
      {
        "number": "2.2.4",
        "title": "3.4 Understanding gradual control",
        "icon": "📝",
        "accent": "#EF4444",
        "blocks": [
          {
            "type": "paragraph",
            "text": "Unlike digital output:"
          },
          {
            "type": "bullet",
            "text": "PWM does not switch instantly between ON and OFF"
          },
          {
            "type": "paragraph",
            "text": "Instead:"
          },
          {
            "type": "bullet",
            "text": "It creates smooth transitions"
          },
          {
            "type": "image",
            "text": "/lecs/levels/Level 3/Level 3.2/Concept Building/images/3.4_0.png"
          },
          {
            "type": "paragraph",
            "text": "When values change gradually:"
          },
          {
            "type": "bullet",
            "text": "Brightness increases step by step"
          },
          {
            "type": "bullet",
            "text": "Brightness decreases step by step"
          },
          {
            "type": "paragraph",
            "text": "This makes the system feel natural and responsive."
          }
        ]
      },
      {
        "number": "2.2.5",
        "title": "3.5 Why this is important",
        "icon": "⭐",
        "accent": "#8B5CF6",
        "blocks": [
          {
            "type": "paragraph",
            "text": "Controlling intensity is essential in many real-world systems."
          },
          {
            "type": "image",
            "text": "/lecs/levels/Level 3/Level 3.2/Concept Building/images/3.5_0.png"
          },
          {
            "type": "paragraph",
            "text": "For example:"
          },
          {
            "type": "bullet",
            "text": "Adjusting brightness of lights"
          },
          {
            "type": "bullet",
            "text": "Controlling motor speed"
          },
          {
            "type": "bullet",
            "text": "Regulating sound volume"
          },
          {
            "type": "image",
            "text": "/lecs/levels/Level 3/Level 3.2/Concept Building/images/3.5_1.png"
          },
          {
            "type": "paragraph",
            "text": "This allows systems to respond proportionally instead of just reacting with simple ON/OFF 3.5 Why this matters in real systems"
          },
          {
            "type": "paragraph",
            "text": "PWM is used anywhere you need control instead of switching."
          },
          {
            "type": "paragraph",
            "text": "Examples:"
          },
          {
            "type": "bullet",
            "text": "Light dimming systems"
          },
          {
            "type": "bullet",
            "text": "Fan speed control"
          },
          {
            "type": "bullet",
            "text": "Motor speed regulation"
          },
          {
            "type": "bullet",
            "text": "Audio volume control"
          },
          {
            "type": "paragraph",
            "text": "Instead of only “ON/OFF”, systems can now behave proportionally."
          }
        ]
      },
      {
        "number": "2.2.6",
        "title": "3.6 Connecting input and output (important shift)",
        "icon": "🔀",
        "accent": "#0EA5E9",
        "blocks": [
          {
            "type": "paragraph",
            "text": "Now we connect what you learned in 3.1."
          },
          {
            "type": "paragraph",
            "text": "You can:"
          },
          {
            "type": "paragraph",
            "text": "Use a sensor(photoresistor / potentiometer) to read and adjust values."
          },
          {
            "type": "bullet",
            "text": "Convert that value into a usable range"
          },
          {
            "type": "paragraph",
            "text": "Use it to control output brightness of an LED."
          },
          {
            "type": "paragraph",
            "text": "This creates a direct relationship:"
          },
          {
            "type": "bullet",
            "text": "Low sensor value → dim LED"
          },
          {
            "type": "bullet",
            "text": "High sensor value → bright LED"
          },
          {
            "type": "paragraph",
            "text": "You now have a dimmable LED that is responsive to the real world!"
          }
        ]
      },
      {
        "number": "2.2.7",
        "title": "3.7 What you may notice in real behavior",
        "icon": "💡",
        "accent": "#F97316",
        "blocks": [
          {
            "type": "paragraph",
            "text": "When using real sensor values:"
          },
          {
            "type": "bullet",
            "text": "Small changes in input cause small brightness changes"
          },
          {
            "type": "bullet",
            "text": "Large changes produce noticeable differences"
          },
          {
            "type": "bullet",
            "text": "Output feels smooth and continuous"
          },
          {
            "type": "paragraph",
            "text": "This shows that the system is not guessing—it is directly reacting to input values."
          }
        ]
      },
      {
        "number": "2.2.8",
        "title": "3.8 Key Insight of This Lesson",
        "icon": "🔑",
        "accent": "#14B8A6",
        "blocks": [
          {
            "type": "bullet",
            "text": "Outputs are not limited to ON and OFF"
          },
          {
            "type": "bullet",
            "text": "PWM allows smooth intensity control"
          },
          {
            "type": "bullet",
            "text": "Values directly control output strength"
          },
          {
            "type": "bullet",
            "text": "Sensors can now drive physical output behavior"
          },
          {
            "type": "bullet",
            "text": "Systems move from switching → controlling"
          },
          {
            "type": "bullet",
            "text": "This is the foundation of real-world embedded control"
          }
        ]
      }
    ],
    "quiz": [
      {
        "question": "What does Pulse Width Modulation (PWM) simulate?",
        "options": [
          "A binary input toggle state",
          "An analog voltage level on a digital pin by switching the output ON and OFF extremely fast",
          "A faster execution cycle for the main loop",
          "A secure wireless connection layer"
        ],
        "correct": 1,
        "explanation": "PWM pulses a digital pin HIGH and LOW at high frequencies. Adjusting the ratio of ON vs OFF time simulates varying output voltages to dim LEDs or speed motors."
      },
      {
        "question": "What is \"Duty Cycle\" in a PWM signal?",
        "options": [
          "The clock frequency of the processor chip",
          "The percentage of time the digital signal remains HIGH in a single repeating cycle period",
          "The time it takes to compile code blocks",
          "The physical range of the LDR sensor"
        ],
        "correct": 1,
        "explanation": "Duty cycle defines the pulse width. A 0% duty cycle is fully off, 50% is on half the time (half-brightness), and 100% is fully on."
      },
      {
        "question": "In an 8-bit PWM setup (0-255), what value drives an LED to approximately half-brightness?",
        "options": [
          "255",
          "0",
          "127",
          "50"
        ],
        "correct": 2,
        "explanation": "With 8-bit resolution, the scale is 0 to 255. Half-brightness corresponds to the midpoint of the range, which is roughly 127."
      }
    ]
  },
  "3-3-3-intro": {
    "levelTitle": "LEVEL 3.4: Translating Values (Mapping Input to Output)",
    "lessonTitle": " Translating Values (Mapping Input to Output)",
    "stepType": "1. Introduction",
    "sections": [
      {
        "number": "3.1.1",
        "title": "Overview",
        "icon": "📝",
        "accent": "#6366F1",
        "blocks": [
          {
            "type": "paragraph",
            "text": "In the previous lessons, you learned how to:"
          },
          {
            "type": "bullet",
            "text": "Read analog input values"
          },
          {
            "type": "bullet",
            "text": "Understand their range (0 to 4095)"
          },
          {
            "type": "bullet",
            "text": "Use values to control output intensity"
          },
          {
            "type": "paragraph",
            "text": "However, when you try to directly use input values to control output, you may notice something does not behave correctly."
          },
          {
            "type": "paragraph",
            "text": "This happens because different parts of the system use different value ranges."
          },
          {
            "type": "paragraph",
            "text": "In this lesson, you will learn how to translate values from one range to another so that systems can work correctly together."
          }
        ]
      }
    ]
  },
  "3-3-3-concept": {
    "levelTitle": "LEVEL 3.3: Translating Values (Mapping Input to Output)",
    "lessonTitle": " Translating Values (Mapping Input to Output)",
    "stepType": "3.1 Why direct connection doesn’t work",
    "sections": [
      {
        "number": "3.2.1",
        "title": "Overview",
        "icon": "📝",
        "accent": "#6366F1",
        "blocks": [
          {
            "type": "paragraph",
            "text": "Each sensor produces values in a large range."
          },
          {
            "type": "paragraph",
            "text": "For example:"
          },
          {
            "type": "bullet",
            "text": "Potentiometer → 0 to 4095"
          },
          {
            "type": "bullet",
            "text": "Photoresistor → 0 to 4095 (varies with light conditions)"
          },
          {
            "type": "paragraph",
            "text": "But PWM output expects:"
          },
          {
            "type": "image",
            "text": "/lecs/levels/Level 3/Level 3.3/Concept Building/images/3.1_0.png"
          },
          {
            "type": "bullet",
            "text": "0 to 255"
          },
          {
            "type": "paragraph",
            "text": "So if you connect them directly:"
          },
          {
            "type": "bullet",
            "text": "Most of the input range is not used properly"
          },
          {
            "type": "bullet",
            "text": "Output reacts too quickly or too weakly"
          },
          {
            "type": "bullet",
            "text": "Control feels inconsistent"
          }
        ]
      },
      {
        "number": "3.2.2",
        "title": "3.2 Potentiometer: human control input",
        "icon": "🔀",
        "accent": "#F59E0B",
        "blocks": [
          {
            "type": "paragraph",
            "text": "The potentiometer is your manual control device."
          },
          {
            "type": "paragraph",
            "text": "It represents:"
          },
          {
            "type": "bullet",
            "text": "Human intention"
          },
          {
            "type": "bullet",
            "text": "User-controlled input"
          },
          {
            "type": "paragraph",
            "text": "But raw values are too large for direct output control."
          },
          {
            "type": "image",
            "text": "/lecs/levels/Level 3/Level 3.3/Concept Building/images/3.2_0.png"
          },
          {
            "type": "paragraph",
            "text": "Without conversion:"
          },
          {
            "type": "bullet",
            "text": "Small movements may cause big brightness jumps"
          },
          {
            "type": "bullet",
            "text": "Large movements may feel unresponsive in parts"
          }
        ]
      },
      {
        "number": "3.2.3",
        "title": "3.3 Photoresistor: environmental input",
        "icon": "🔀",
        "accent": "#10B981",
        "blocks": [
          {
            "type": "paragraph",
            "text": "The photoresistor represents the environment itself."
          },
          {
            "type": "image",
            "text": "/lecs/levels/Level 3/Level 3.3/Concept Building/images/3.3_0.png"
          },
          {
            "type": "paragraph",
            "text": "It does not respond to human input—it responds to:"
          },
          {
            "type": "bullet",
            "text": "Light intensity"
          },
          {
            "type": "bullet",
            "text": "Environmental changes"
          },
          {
            "type": "paragraph",
            "text": "Without conversion:"
          },
          {
            "type": "bullet",
            "text": "Brightness control becomes unpredictable"
          },
          {
            "type": "bullet",
            "text": "Output does not fully reflect light changes"
          }
        ]
      },
      {
        "number": "3.2.4",
        "title": "3.4 What is mapping actually doing?",
        "icon": "💡",
        "accent": "#EF4444",
        "blocks": [
          {
            "type": "paragraph",
            "text": "Mapping converts a value from one range into another range while preserving its meaning."
          },
          {
            "type": "paragraph",
            "text": "It ensures:"
          },
          {
            "type": "bullet",
            "text": "Minimum input → minimum output"
          },
          {
            "type": "bullet",
            "text": "Maximum input → maximum output"
          },
          {
            "type": "bullet",
            "text": "Everything in between stays proportional"
          },
          {
            "type": "paragraph",
            "text": "So instead of raw values:"
          },
          {
            "type": "bullet",
            "text": "0–4095 becomes 0–255"
          },
          {
            "type": "paragraph",
            "text": "This allows both systems to communicate correctly."
          }
        ]
      },
      {
        "number": "3.2.5",
        "title": "3.5 Why proportional control matters",
        "icon": "❓",
        "accent": "#8B5CF6",
        "blocks": [
          {
            "type": "paragraph",
            "text": "Mapping does not distort behavior—it preserves proportion."
          },
          {
            "type": "paragraph",
            "text": "For example:"
          },
          {
            "type": "bullet",
            "text": "25% knob rotation → 25% brightness"
          },
          {
            "type": "bullet",
            "text": "50% light intensity → 50% output"
          },
          {
            "type": "bullet",
            "text": "75% input → 75% output"
          },
          {
            "type": "image",
            "text": "/lecs/levels/Level 3/Level 3.3/Concept Building/images/3.5_0.png"
          },
          {
            "type": "image",
            "text": "/lecs/levels/Level 3/Level 3.3/Concept Building/images/3.5_1.png"
          },
          {
            "type": "paragraph",
            "text": "This makes the system feel:"
          },
          {
            "type": "bullet",
            "text": "Predictable"
          },
          {
            "type": "bullet",
            "text": "Smooth"
          },
          {
            "type": "bullet",
            "text": "Natural"
          }
        ]
      },
      {
        "number": "3.2.6",
        "title": "3.6 What changes after mapping?",
        "icon": "💡",
        "accent": "#0EA5E9",
        "blocks": [
          {
            "type": "paragraph",
            "text": "Before mapping:"
          },
          {
            "type": "bullet",
            "text": "Output reacts unevenly"
          },
          {
            "type": "bullet",
            "text": "Some ranges feel useless"
          },
          {
            "type": "bullet",
            "text": "Control feels inaccurate"
          },
          {
            "type": "paragraph",
            "text": "After mapping:"
          },
          {
            "type": "bullet",
            "text": "Full sensor range is usable"
          },
          {
            "type": "bullet",
            "text": "Output changes smoothly"
          },
          {
            "type": "bullet",
            "text": "System becomes responsive and stable"
          }
        ]
      },
      {
        "number": "3.2.7",
        "title": "3.7 Connecting sensors and outputs properly",
        "icon": "🔬",
        "accent": "#F97316",
        "blocks": [
          {
            "type": "paragraph",
            "text": "Now your system has a proper communication structure:"
          },
          {
            "type": "bullet",
            "text": "Potentiometer → manual brightness control"
          },
          {
            "type": "bullet",
            "text": "Photoresistor → automatic brightness control"
          },
          {
            "type": "bullet",
            "text": "Mapping → translation layer"
          },
          {
            "type": "bullet",
            "text": "PWM → physical output control"
          },
          {
            "type": "paragraph",
            "text": "This is the first time your system behaves like a real control interface."
          }
        ]
      },
      {
        "number": "3.2.8",
        "title": "3.8 Key Insight of This Lesson",
        "icon": "🔑",
        "accent": "#14B8A6",
        "blocks": [
          {
            "type": "bullet",
            "text": "Sensors produce large-range values"
          },
          {
            "type": "bullet",
            "text": "Outputs require smaller, controlled ranges"
          },
          {
            "type": "bullet",
            "text": "Direct connection breaks behavior"
          },
          {
            "type": "bullet",
            "text": "Mapping translates values between systems"
          },
          {
            "type": "bullet",
            "text": "Proportional scaling preserves meaning"
          },
          {
            "type": "bullet",
            "text": "This enables accurate real-world control"
          }
        ]
      }
    ],
    "quiz": [
      {
        "question": "Why do we need a mathematical \"Map\" block (map function)?",
        "options": [
          "To load GPS tracking data into the microcontroller",
          "To scale a value proportionally from an input range (like 0-4095) to an output range (like 0-255)",
          "To trace wire routing paths on the virtual breadboard",
          "To print text logs in the serial terminal"
        ],
        "correct": 1,
        "explanation": "Sensors read in one resolution (e.g. 12-bit: 0-4095) but actuators expect another (e.g. 8-bit PWM: 0-255). Mapping translates these ranges proportionally."
      },
      {
        "question": "What does the operation `map(2048, 0, 4095, 0, 255)` return?",
        "options": [
          "0",
          "255",
          "127",
          "2048"
        ],
        "correct": 2,
        "explanation": "2048 is exactly in the middle of 0 to 4095. Scaling it to the range of 0 to 255 yields the midpoint value, which is 127."
      },
      {
        "question": "What is the danger of mapping a sensor without verifying the actual range?",
        "options": [
          "The ESP32 will suffer permanent hardware damage",
          "The output might clip at maximum limits, stay off, or respond erratically",
          "The block code will refuse to compile",
          "The analog input pins will convert to digital outputs"
        ],
        "correct": 1,
        "explanation": "Incorrect ranges lead to scaling math errors. Values can overflow or clip, resulting in components that stay fully ON, OFF, or behave unpredictably."
      }
    ]
  },
  "3-3-4-intro": {
    "levelTitle": "LEVEL 3.5: Real-Time Control System (Sensor → Output)",
    "lessonTitle": " Real-Time Control System (Sensor → Output)",
    "stepType": "1. Introduction",
    "sections": [
      {
        "number": "4.1.1",
        "title": "Overview",
        "icon": "📝",
        "accent": "#6366F1",
        "blocks": [
          {
            "type": "paragraph",
            "text": "In the previous lessons, you learned how to:"
          },
          {
            "type": "bullet",
            "text": "Read analog input values"
          },
          {
            "type": "bullet",
            "text": "Understand their range"
          },
          {
            "type": "bullet",
            "text": "Control output intensity"
          },
          {
            "type": "bullet",
            "text": "Translate values using mapping"
          },
          {
            "type": "paragraph",
            "text": "So far, these concepts were learned separately."
          },
          {
            "type": "paragraph",
            "text": "In this lesson, you will combine everything to build a complete system where:"
          },
          {
            "type": "bullet",
            "text": "Input is continuously read"
          },
          {
            "type": "bullet",
            "text": "Values are processed"
          },
          {
            "type": "bullet",
            "text": "Output responds immediately"
          },
          {
            "type": "paragraph",
            "text": "This creates a real-time control system where one component directly controls another."
          }
        ]
      }
    ]
  },
  "3-3-4-concept": {
    "levelTitle": "LEVEL 3.4: Real-Time Control System (Sensor → Output)",
    "lessonTitle": " Real-Time Control System (Sensor → Output)",
    "stepType": "3.1 What kind of system have you built?",
    "sections": [
      {
        "number": "4.2.1",
        "title": "Overview",
        "icon": "📝",
        "accent": "#6366F1",
        "blocks": [
          {
            "type": "paragraph",
            "text": "You now have two different control philosophies:"
          }
        ]
      },
      {
        "number": "4.2.2",
        "title": "Manual Control",
        "icon": "📝",
        "accent": "#F59E0B",
        "blocks": [
          {
            "type": "bullet",
            "text": "Human directly controls the system"
          },
          {
            "type": "bullet",
            "text": "Potentiometer acts as an input device"
          },
          {
            "type": "bullet",
            "text": "Behavior is intentional and predictable"
          }
        ]
      },
      {
        "number": "4.2.3",
        "title": "Automatic Control",
        "icon": "📝",
        "accent": "#10B981",
        "blocks": [
          {
            "type": "bullet",
            "text": "Environment controls the system"
          },
          {
            "type": "bullet",
            "text": "Photoresistor reacts to light changes"
          },
          {
            "type": "bullet",
            "text": "Behavior depends on external conditions"
          },
          {
            "type": "image",
            "text": "/lecs/levels/Level 3/Level 3.4/Concept Building/images/3.1_0.png"
          },
          {
            "type": "paragraph",
            "text": "This is called a dual-mode control system."
          }
        ]
      },
      {
        "number": "4.2.4",
        "title": "3.2 Manual control (Potentiometer system)",
        "icon": "⚙️",
        "accent": "#EF4444",
        "blocks": [
          {
            "type": "paragraph",
            "text": "In manual mode:"
          },
          {
            "type": "bullet",
            "text": "The user decides brightness"
          },
          {
            "type": "bullet",
            "text": "The system follows user input directly"
          },
          {
            "type": "paragraph",
            "text": "Flow:"
          },
          {
            "type": "bullet",
            "text": "👉 Potentiometer → Mapping → PWM → LED"
          },
          {
            "type": "paragraph",
            "text": "This gives:"
          },
          {
            "type": "bullet",
            "text": "Predictability"
          },
          {
            "type": "bullet",
            "text": "Direct control"
          },
          {
            "type": "bullet",
            "text": "Full user authority"
          },
          {
            "type": "image",
            "text": "/lecs/levels/Level 3/Level 3.4/Concept Building/images/3.2_0.png"
          },
          {
            "type": "paragraph",
            "text": "It is used in systems like:"
          },
          {
            "type": "bullet",
            "text": "Dimmers"
          },
          {
            "type": "bullet",
            "text": "Volume knobs"
          },
          {
            "type": "bullet",
            "text": "Manual sliders"
          }
        ]
      },
      {
        "number": "4.2.5",
        "title": "3.3 Automatic control (Photoresistor system)",
        "icon": "⚙️",
        "accent": "#8B5CF6",
        "blocks": [
          {
            "type": "paragraph",
            "text": "In automatic mode:"
          },
          {
            "type": "bullet",
            "text": "The environment controls brightness"
          },
          {
            "type": "bullet",
            "text": "The system reacts to external light"
          },
          {
            "type": "paragraph",
            "text": "Flow:"
          },
          {
            "type": "bullet",
            "text": "👉 Light → Photoresistor → Mapping → PWM → LED"
          },
          {
            "type": "paragraph",
            "text": "This gives:"
          },
          {
            "type": "bullet",
            "text": "Adaptive behavior"
          },
          {
            "type": "bullet",
            "text": "No user input required"
          },
          {
            "type": "bullet",
            "text": "Environment-driven response"
          },
          {
            "type": "image",
            "text": "/lecs/levels/Level 3/Level 3.4/Concept Building/images/3.3_0.png"
          },
          {
            "type": "paragraph",
            "text": "Light turns on when it gets dark. Simple yet automatic and convenient."
          },
          {
            "type": "paragraph",
            "text": "It is used in:"
          },
          {
            "type": "bullet",
            "text": "Auto-brightness screens"
          },
          {
            "type": "bullet",
            "text": "Street lights"
          },
          {
            "type": "bullet",
            "text": "Smart lighting systems"
          }
        ]
      },
      {
        "number": "4.2.6",
        "title": "3.4 Why two modes matter",
        "icon": "❓",
        "accent": "#0EA5E9",
        "blocks": [
          {
            "type": "paragraph",
            "text": "Real systems are not fixed to one behavior."
          },
          {
            "type": "paragraph",
            "text": "They often switch between:"
          },
          {
            "type": "bullet",
            "text": "Manual override (user control)"
          },
          {
            "type": "bullet",
            "text": "Automatic behavior (system intelligence)"
          },
          {
            "type": "paragraph",
            "text": "This allows flexibility depending on context."
          },
          {
            "type": "paragraph",
            "text": "For example:"
          },
          {
            "type": "bullet",
            "text": "User adjusts brightness manually indoors"
          },
          {
            "type": "bullet",
            "text": "System adjusts automatically outdoors"
          },
          {
            "type": "image",
            "text": "/lecs/levels/Level 3/Level 3.4/Concept Building/images/3.4_0.png"
          }
        ]
      },
      {
        "number": "4.2.7",
        "title": "3.5 Understanding control priorities",
        "icon": "📝",
        "accent": "#F97316",
        "blocks": [
          {
            "type": "paragraph",
            "text": "In advanced systems:"
          },
          {
            "type": "bullet",
            "text": "Manual control usually has higher priority"
          },
          {
            "type": "bullet",
            "text": "Automatic control runs when manual input is not active"
          },
          {
            "type": "paragraph",
            "text": "This creates layered behavior:"
          },
          {
            "type": "bullet",
            "text": "Primary control → user"
          },
          {
            "type": "bullet",
            "text": "Secondary control → environment"
          }
        ]
      },
      {
        "number": "4.2.8",
        "title": "3.6 Connecting everything from Level 3",
        "icon": "📝",
        "accent": "#14B8A6",
        "blocks": [
          {
            "type": "paragraph",
            "text": "Now all Level 3 concepts merge:"
          },
          {
            "type": "bullet",
            "text": "Analog input → sensors read real-world values"
          },
          {
            "type": "bullet",
            "text": "Mapping → values are normalized"
          },
          {
            "type": "bullet",
            "text": "PWM → output intensity control"
          },
          {
            "type": "bullet",
            "text": "Real-time loop → continuous updates"
          },
          {
            "type": "bullet",
            "text": "Two modes → behavioral switching layer"
          },
          {
            "type": "paragraph",
            "text": "This forms a complete embedded system structure."
          }
        ]
      },
      {
        "number": "4.2.9",
        "title": "3.7 Key Insight of This Lesson",
        "icon": "🔑",
        "accent": "#6366F1",
        "blocks": [
          {
            "type": "bullet",
            "text": "Systems can have multiple control modes"
          },
          {
            "type": "bullet",
            "text": "Manual mode = user-driven behavior"
          },
          {
            "type": "bullet",
            "text": "Automatic mode = environment-driven behavior"
          },
          {
            "type": "bullet",
            "text": "Same hardware can behave differently using logic"
          },
          {
            "type": "bullet",
            "text": "Mapping and PWM enable both modes"
          },
          {
            "type": "bullet",
            "text": "Real systems switch between control strategies"
          }
        ]
      }
    ],
    "quiz": [
      {
        "question": "What is a \"real-time feedback control loop\"?",
        "options": [
          "An error sequence that locks up the computer",
          "A system that continuously reads inputs, makes logical decisions, and immediately updates outputs in a loop",
          "A simple jumper wire loop on a breadboard",
          "A serial output text stream"
        ],
        "correct": 1,
        "explanation": "Feedback control loops continuously monitor changing environments via sensors, evaluating conditions in real-time to adjust outputs and maintain target states."
      },
      {
        "question": "In a night-light feedback system, why does the LED brighten when LDR voltage drops?",
        "options": [
          "The LDR acts as a physical power funnel for the LED",
          "The block program maps low light inputs (dark conditions) to high PWM duty cycles (bright output)",
          "The LED matches ambient lighting automatically",
          "It is a random side-effect of analog pins sharing voltage"
        ],
        "correct": 1,
        "explanation": "The code is written to invert or map low-input light levels to high-intensity PWM duty cycles, creating an automatic, responsive lighting system."
      },
      {
        "question": "Why are threshold limits critical in automated control loops?",
        "options": [
          "To slow down the execution frequency",
          "To trigger immediate safety actions (like emergency cutoffs) as soon as sensors detect unsafe states",
          "To print pretty charts to the screen",
          "To store more variables"
        ],
        "correct": 1,
        "explanation": "Threshold limits set safety bounds. Checking them in fast loops allows triggering shutdowns or alarms the instant a reading exceeds safe parameters."
      }
    ]
  },
  "4-4-1-intro": {
    "levelTitle": "LEVEL 4.1: Repetition Structures (For Loop Basics)",
    "lessonTitle": " Repetition Structures (For Loop Basics)",
    "stepType": "Introduction",
    "sections": [
      {
        "number": "1.1.1",
        "title": "Overview",
        "icon": "📝",
        "accent": "#6366F1",
        "blocks": [
          {
            "type": "paragraph",
            "text": "In this lesson, you will learn how to repeat actions automatically using repetition structures."
          },
          {
            "type": "paragraph",
            "text": "You will use a for loop to make the ESP32 perform the same action multiple times without writing the same instructions again. This is the first time you will see how your program can repeat tasks in a controlled way."
          },
          {
            "type": "image",
            "text": "/lecs/levels/Level 4/4.1/Introduction/images/section_0.png"
          },
          {
            "type": "paragraph",
            "text": "The goal of this lesson is not just to repeat actions, but to understand that:"
          },
          {
            "type": "bullet",
            "text": "Your blocks are instructions"
          },
          {
            "type": "bullet",
            "text": "The ESP32 executes those instructions"
          },
          {
            "type": "bullet",
            "text": "The ESP32 can repeat instructions automatically"
          },
          {
            "type": "bullet",
            "text": "You can control how many times an action is repeated"
          },
          {
            "type": "paragraph",
            "text": "By the end of this lesson, you will have created a system where a set of instructions runs multiple times using a loop, helping you build efficient and structured programs."
          }
        ]
      }
    ]
  },
  "4-4-1-concept": {
    "levelTitle": "Level 4.1: Repetition Structures (For Loop Basics)",
    "lessonTitle": " Repetition Structures (For Loop Basics)",
    "stepType": "What is Repetition in Programming?",
    "sections": [
      {
        "number": "1.2.1",
        "title": "Overview",
        "icon": "📝",
        "accent": "#6366F1",
        "blocks": [
          {
            "type": "paragraph",
            "text": "Repetition means performing the same action multiple times."
          },
          {
            "type": "paragraph",
            "text": "In earlier lessons:"
          },
          {
            "type": "bullet",
            "text": "You wrote instructions once"
          },
          {
            "type": "bullet",
            "text": "The system executed them repeatedly automatically (loop)"
          },
          {
            "type": "paragraph",
            "text": "Now:"
          },
          {
            "type": "bullet",
            "text": "You will control repetition intentionally"
          },
          {
            "type": "bullet",
            "text": "You can decide how many times something should repeat"
          },
          {
            "type": "image",
            "text": "/lecs/levels/Level 4/4.1/Concept Building/images/section_0.png"
          },
          {
            "type": "paragraph",
            "text": "Repetition is useful when:"
          },
          {
            "type": "bullet",
            "text": "The same task needs to be done multiple times"
          },
          {
            "type": "bullet",
            "text": "You want to avoid writing the same instructions again and again"
          }
        ]
      },
      {
        "number": "1.2.2",
        "title": "What is a For Loop?",
        "icon": "💡",
        "accent": "#F59E0B",
        "blocks": [
          {
            "type": "paragraph",
            "text": "A for loop is a structure that repeats a set of instructions a specific number of times."
          },
          {
            "type": "paragraph",
            "text": "It works using three main parts:"
          },
          {
            "type": "bullet",
            "text": "Start (Initialization) → where counting begins"
          },
          {
            "type": "bullet",
            "text": "Condition → when the loop should stop"
          },
          {
            "type": "bullet",
            "text": "Step (Increment) → how the count changes each time"
          },
          {
            "type": "image",
            "text": "/lecs/levels/Level 4/4.1/Concept Building/images/section_1.png"
          },
          {
            "type": "paragraph",
            "text": "This allows the ESP32 to repeat actions in a controlled way."
          }
        ]
      },
      {
        "number": "1.2.3",
        "title": "How does a For Loop work?",
        "icon": "🔁",
        "accent": "#10B981",
        "blocks": [
          {
            "type": "paragraph",
            "text": "The for loop follows a step-by-step process:"
          },
          {
            "type": "bullet",
            "text": "Start from an initial value (e.g., 0)"
          },
          {
            "type": "bullet",
            "text": "Check the condition (e.g., less than 5)"
          },
          {
            "type": "bullet",
            "text": "Execute the instructions inside the loop"
          },
          {
            "type": "bullet",
            "text": "Increase the counter (e.g., +1)"
          },
          {
            "type": "bullet",
            "text": "Repeat the process until the condition becomes false"
          },
          {
            "type": "paragraph",
            "text": "Each repetition is called an iteration."
          }
        ]
      },
      {
        "number": "1.2.4",
        "title": "Why do we use for loops?",
        "icon": "❓",
        "accent": "#EF4444",
        "blocks": [
          {
            "type": "paragraph",
            "text": "For loops are important because they:"
          },
          {
            "type": "bullet",
            "text": "Reduce repetition in code"
          },
          {
            "type": "bullet",
            "text": "Make programs shorter and cleaner"
          },
          {
            "type": "bullet",
            "text": "Save time and effort"
          },
          {
            "type": "bullet",
            "text": "Improve readability"
          },
          {
            "type": "paragraph",
            "text": "Without loops:"
          },
          {
            "type": "bullet",
            "text": "You would need to write the same instructions many times"
          },
          {
            "type": "paragraph",
            "text": "With loops:"
          },
          {
            "type": "bullet",
            "text": "You write once and repeat automatically"
          }
        ]
      },
      {
        "number": "1.2.5",
        "title": "Example: Repeating LED Blink",
        "icon": "🔁",
        "accent": "#8B5CF6",
        "blocks": [
          {
            "type": "paragraph",
            "text": "Example:"
          },
          {
            "type": "paragraph",
            "text": "Instead of writing:"
          },
          {
            "type": "bullet",
            "text": "Turn LED ON"
          },
          {
            "type": "bullet",
            "text": "Turn LED OFF"
          },
          {
            "type": "bullet",
            "text": "Repeat manually"
          },
          {
            "type": "image",
            "text": "/lecs/levels/Level 4/4.1/Concept Building/images/section_2.png"
          },
          {
            "type": "paragraph",
            "text": "You can use a for loop to:"
          },
          {
            "type": "bullet",
            "text": "Blink the LED 5 times automatically"
          },
          {
            "type": "paragraph",
            "text": "This shows how repetition can be controlled using loops."
          },
          {
            "type": "paragraph",
            "text": "A for loop is used when we know exactly how many times we want an action to repeat. In this example, the loop is used to blink an LED 5 times without writing the same code again and again."
          },
          {
            "type": "paragraph",
            "text": "This makes programs:"
          },
          {
            "type": "bullet",
            "text": "shorter,"
          },
          {
            "type": "bullet",
            "text": "easier to read,"
          },
          {
            "type": "paragraph",
            "text": "and more efficient."
          },
          {
            "type": "paragraph",
            "text": "In our platform, the for loop can be represented using the “Repeat N Times” block."
          },
          {
            "type": "image",
            "text": "/lecs/levels/Level 4/4.1/Concept Building/images/section_3.png"
          },
          {
            "type": "paragraph",
            "text": "The loop starts with a counter variable i = 0."
          },
          {
            "type": "paragraph",
            "text": "After each repetition, the value of i increases by 1."
          },
          {
            "type": "paragraph",
            "text": "The loop continues running while the condition i < 5 remains true."
          },
          {
            "type": "paragraph",
            "text": "During each repetition:"
          },
          {
            "type": "bullet",
            "text": "The LED turns ON"
          },
          {
            "type": "bullet",
            "text": "The program waits for 1 second"
          },
          {
            "type": "bullet",
            "text": "The LED turns OFF"
          },
          {
            "type": "bullet",
            "text": "The program waits for another 1 second"
          },
          {
            "type": "bullet",
            "text": "The Serial Monitor prints the message \"Inside the loop\""
          },
          {
            "type": "paragraph",
            "text": "After the loop completes 5 repetitions, the condition becomes false and the program exits the loop. The remaining code then executes, printing \"Outside the loop\" on the Serial Monitor."
          },
          {
            "type": "bullet",
            "text": "void loop() {"
          },
          {
            "type": "bullet",
            "text": "for(int i=0; i<5; i++){"
          },
          {
            "type": "bullet",
            "text": "digitalWrite(2, HIGH); // LED ON"
          },
          {
            "type": "bullet",
            "text": "delay(1 * 1000);"
          },
          {
            "type": "bullet",
            "text": "digitalWrite(2, LOW); // LED OFF"
          },
          {
            "type": "bullet",
            "text": "delay(1 * 1000);"
          },
          {
            "type": "bullet",
            "text": "Serial.print(\"Inside the loop \");"
          },
          {
            "type": "bullet",
            "text": "}"
          },
          {
            "type": "bullet",
            "text": "Serial.print(\"Outside the loop\");"
          },
          {
            "type": "bullet",
            "text": "}"
          },
          {
            "type": "image",
            "text": "/lecs/levels/Level 4/4.1/Concept Building/images/section_4.png"
          }
        ]
      },
      {
        "number": "1.2.6",
        "title": "Controlled Vs Continuous repetition",
        "icon": "📝",
        "accent": "#0EA5E9",
        "blocks": [
          {
            "type": "paragraph",
            "text": "There are two types of repetition:"
          },
          {
            "type": "bullet",
            "text": "Continuous (Infinite Loop)"
          },
          {
            "type": "bullet",
            "text": "Runs forever (like previous loop behavior)"
          },
          {
            "type": "bullet",
            "text": "Controlled (For Loop)"
          },
          {
            "type": "bullet",
            "text": "Runs a specific number of times"
          },
          {
            "type": "paragraph",
            "text": "In this lesson, you are learning:"
          },
          {
            "type": "bullet",
            "text": "Controlled repetition using a for loop"
          }
        ]
      },
      {
        "number": "1.2.7",
        "title": "Key Insights of this lesson",
        "icon": "🔑",
        "accent": "#F97316",
        "blocks": [
          {
            "type": "paragraph",
            "text": "The most important concept in this lesson is:"
          },
          {
            "type": "paragraph",
            "text": "You can control how many times an action is repeated using a for loop."
          },
          {
            "type": "paragraph",
            "text": "You are now able to:"
          },
          {
            "type": "bullet",
            "text": "Repeat actions efficiently"
          },
          {
            "type": "bullet",
            "text": "Control repetition using logic"
          },
          {
            "type": "bullet",
            "text": "Build more structured programs"
          },
          {
            "type": "paragraph",
            "text": "This is a fundamental step toward writing advanced and optimized programs."
          }
        ]
      }
    ],
    "quiz": [
      {
        "question": "What is the primary operational purpose of a For Loop?",
        "options": [
          "To execute a conditional branch exactly once",
          "To repeat a specific sequence of instructions a pre-determined, set number of times",
          "To create infinite loops that run forever",
          "To temporarily sleep the ESP32 processor"
        ],
        "correct": 1,
        "explanation": "For loops iterate a code block a designated number of times, managing the index and bounds automatically."
      },
      {
        "question": "In a For Loop set to iterate 5 times, how many times will the internal code block execute?",
        "options": [
          "1 time",
          "4 times",
          "5 times",
          "Infinitely"
        ],
        "correct": 2,
        "explanation": "The loop counter will run from its start bound to its limit, executing the block exactly 5 times."
      },
      {
        "question": "Why is a For Loop better than copying the same blocks 10 times in a row?",
        "options": [
          "Copying blocks makes the execution run faster",
          "It significantly reduces code redundancy, saves memory, and is much easier to maintain",
          "It gives higher voltage to the pins",
          "It overrides pin mode constraints"
        ],
        "correct": 1,
        "explanation": "Loops compress code. Instead of copying blocks, a loop runs a single block multiple times, making the project clean, editable, and memory-efficient."
      }
    ]
  },
  "4-4-2-intro": {
    "levelTitle": "LEVEL 4.2: Conditional Repetition (While Loop Basics)",
    "lessonTitle": " Conditional Repetition (While Loop Basics)",
    "stepType": "Introduction",
    "sections": [
      {
        "number": "2.1.1",
        "title": "Overview",
        "icon": "📝",
        "accent": "#6366F1",
        "blocks": [
          {
            "type": "paragraph",
            "text": "In this lesson, you will learn how to repeat actions based on a condition using a while loop."
          },
          {
            "type": "paragraph",
            "text": "You will create programs where the ESP32 continues performing actions as long as a condition remains true. This is the first time you will see how repetition can depend on a condition instead of a fixed number."
          },
          {
            "type": "image",
            "text": "/lecs/levels/Level 4/4.2/Introduction/images/section_0.png"
          },
          {
            "type": "paragraph",
            "text": "The goal of this lesson is not just to repeat actions, but to understand that:"
          },
          {
            "type": "bullet",
            "text": "Your blocks are instructions"
          },
          {
            "type": "bullet",
            "text": "The ESP32 executes those instructions"
          },
          {
            "type": "bullet",
            "text": "The ESP32 can repeat actions based on a condition"
          },
          {
            "type": "bullet",
            "text": "The repetition stops automatically when the condition becomes false"
          },
          {
            "type": "paragraph",
            "text": "By the end of this lesson, you will have created a system where actions continue only while a condition is true, giving you more control over program behavior."
          }
        ]
      }
    ]
  },
  "4-4-2-concept": {
    "levelTitle": "Level 4.2: Conditional Repetition (While Loop Basics)",
    "lessonTitle": " Conditional Repetition (While Loop Basics)",
    "stepType": "What is Conditional Repetition?",
    "sections": [
      {
        "number": "2.2.1",
        "title": "Overview",
        "icon": "📝",
        "accent": "#6366F1",
        "blocks": [
          {
            "type": "paragraph",
            "text": "Conditional repetition means repeating an action based on a condition."
          },
          {
            "type": "paragraph",
            "text": "In previous lessons:"
          },
          {
            "type": "bullet",
            "text": "You used a for loop"
          },
          {
            "type": "bullet",
            "text": "The repetition was fixed (e.g., repeat 5 times)"
          },
          {
            "type": "paragraph",
            "text": "Now:"
          },
          {
            "type": "bullet",
            "text": "Repetition depends on a condition"
          },
          {
            "type": "bullet",
            "text": "The system decides whether to continue or stop"
          },
          {
            "type": "image",
            "text": "/lecs/levels/Level 4/4.2/Concept Building/images/section_0.png"
          },
          {
            "type": "paragraph",
            "text": "This means the loop is not fixed — it depends on what is happening."
          }
        ]
      },
      {
        "number": "2.2.2",
        "title": "What is a While Loop?",
        "icon": "💡",
        "accent": "#F59E0B",
        "blocks": [
          {
            "type": "paragraph",
            "text": "A while loop repeats a set of instructions as long as a condition is true."
          },
          {
            "type": "image",
            "text": "/lecs/levels/Level 4/4.2/Concept Building/images/section_1.png"
          },
          {
            "type": "paragraph",
            "text": "Structure:"
          },
          {
            "type": "bullet",
            "text": "Check condition"
          },
          {
            "type": "bullet",
            "text": "If TRUE → execute instructions"
          },
          {
            "type": "bullet",
            "text": "Repeat"
          },
          {
            "type": "bullet",
            "text": "If FALSE → stop"
          },
          {
            "type": "paragraph",
            "text": "This allows the ESP32 to keep running actions until something changes."
          }
        ]
      },
      {
        "number": "2.2.3",
        "title": "How Does a While Loop Work?",
        "icon": "🔁",
        "accent": "#10B981",
        "blocks": [
          {
            "type": "image",
            "text": "/lecs/levels/Level 4/4.2/Concept Building/images/section_2.png"
          },
          {
            "type": "paragraph",
            "text": "The while loop works step-by-step:"
          },
          {
            "type": "bullet",
            "text": "Check the condition"
          },
          {
            "type": "bullet",
            "text": "If the condition is TRUE → run the instructions"
          },
          {
            "type": "bullet",
            "text": "Go back and check the condition again"
          },
          {
            "type": "bullet",
            "text": "Repeat the process"
          },
          {
            "type": "bullet",
            "text": "Stop only when the condition becomes FALSE"
          },
          {
            "type": "paragraph",
            "text": "This creates a loop controlled by a condition."
          }
        ]
      },
      {
        "number": "2.2.4",
        "title": "Difference Between For Loop and While Loop",
        "icon": "🔁",
        "accent": "#EF4444",
        "blocks": [
          {
            "type": "paragraph",
            "text": "There are two types of repetition:"
          },
          {
            "type": "image",
            "text": "/lecs/levels/Level 4/4.2/Concept Building/images/section_3.png"
          },
          {
            "type": "paragraph",
            "text": "For Loop:"
          },
          {
            "type": "bullet",
            "text": "Runs a fixed number of times"
          },
          {
            "type": "bullet",
            "text": "You know how many repetitions will happen"
          },
          {
            "type": "paragraph",
            "text": "While Loop:"
          },
          {
            "type": "bullet",
            "text": "Runs based on a condition"
          },
          {
            "type": "bullet",
            "text": "You do not know exactly how many times it will run"
          },
          {
            "type": "paragraph",
            "text": "This makes while loops more flexible."
          }
        ]
      },
      {
        "number": "2.2.5",
        "title": "Real-Life Example of While Loop",
        "icon": "🔁",
        "accent": "#8B5CF6",
        "blocks": [
          {
            "type": "paragraph",
            "text": "Real-life example:"
          },
          {
            "type": "bullet",
            "text": "Keep eating while you are hungry"
          },
          {
            "type": "bullet",
            "text": "Stop when you are full"
          },
          {
            "type": "paragraph",
            "text": "Similarly:"
          },
          {
            "type": "bullet",
            "text": "ESP32 keeps running actions while condition is true"
          },
          {
            "type": "bullet",
            "text": "Stops when condition becomes false"
          }
        ]
      },
      {
        "number": "2.2.6",
        "title": "Using While Loop with Inputs",
        "icon": "🔀",
        "accent": "#0EA5E9",
        "blocks": [
          {
            "type": "paragraph",
            "text": "The while loop is often used with inputs."
          },
          {
            "type": "image",
            "text": "/lecs/levels/Level 4/4.2/Concept Building/images/section_4.png"
          },
          {
            "type": "paragraph",
            "text": "Example:"
          },
          {
            "type": "bullet",
            "text": "While button is pressed → LED stays ON"
          },
          {
            "type": "image",
            "text": "/lecs/levels/Level 4/4.2/Concept Building/images/section_5.png"
          },
          {
            "type": "bullet",
            "text": "When button is released → LED turns OFF"
          },
          {
            "type": "image",
            "text": "/lecs/levels/Level 4/4.2/Concept Building/images/section_6.png"
          },
          {
            "type": "paragraph",
            "text": "Try to guess how the code blocks can be arranged to achieve this interaction."
          },
          {
            "type": "paragraph",
            "text": "Heres how:"
          },
          {
            "type": "image",
            "text": "/lecs/levels/Level 4/4.2/Concept Building/images/section_7.png"
          },
          {
            "type": "paragraph",
            "text": "Code:"
          },
          {
            "type": "bullet",
            "text": "void loop() {"
          },
          {
            "type": "bullet",
            "text": "btnState = digitalRead(12);"
          },
          {
            "type": "bullet",
            "text": "while(btnState == HIGH){"
          },
          {
            "type": "bullet",
            "text": "digitalWrite(2, HIGH); // LED ON"
          },
          {
            "type": "bullet",
            "text": "btnState = digitalRead(12);"
          },
          {
            "type": "bullet",
            "text": "}"
          },
          {
            "type": "bullet",
            "text": "digitalWrite(2, LOW); // LED OFF"
          },
          {
            "type": "bullet",
            "text": "}"
          },
          {
            "type": "paragraph",
            "text": "This creates real-time control based on user interaction."
          }
        ]
      },
      {
        "number": "2.2.7",
        "title": "Risk of Infinite Loops",
        "icon": "🔁",
        "accent": "#F97316",
        "blocks": [
          {
            "type": "paragraph",
            "text": "A while loop can run forever if the condition never becomes false."
          },
          {
            "type": "paragraph",
            "text": "This is called an infinite loop."
          },
          {
            "type": "paragraph",
            "text": "Example:"
          },
          {
            "type": "bullet",
            "text": "Condition is always TRUE → loop never stops"
          },
          {
            "type": "paragraph",
            "text": "So it is important to:"
          },
          {
            "type": "bullet",
            "text": "Use correct conditions"
          },
          {
            "type": "bullet",
            "text": "Ensure the condition can change"
          }
        ]
      },
      {
        "number": "2.2.8",
        "title": "Key Insight of This Lesson",
        "icon": "🔑",
        "accent": "#14B8A6",
        "blocks": [
          {
            "type": "paragraph",
            "text": "The most important concept in this lesson is:"
          },
          {
            "type": "paragraph",
            "text": "A while loop repeats actions as long as a condition is true."
          },
          {
            "type": "paragraph",
            "text": "You are now able to:"
          },
          {
            "type": "bullet",
            "text": "Control repetition using conditions"
          },
          {
            "type": "bullet",
            "text": "Create flexible and dynamic systems"
          },
          {
            "type": "bullet",
            "text": "Build real-time behavior based on input"
          },
          {
            "type": "paragraph",
            "text": "This is a key step toward advanced logic and control structures."
          }
        ]
      }
    ],
    "quiz": [
      {
        "question": "What controls when a While Loop stops executing?",
        "options": [
          "A fixed internal count of 10 loops",
          "It stops as soon as its conditional expression evaluates to false",
          "When the connected delay block times out",
          "While loops never stop executing"
        ],
        "correct": 1,
        "explanation": "While loops poll their condition on every iteration. The instant the conditional check is false, the loop exits and execution continues below."
      },
      {
        "question": "What is the risk of a \"While Loop\" whose condition never evaluates to false?",
        "options": [
          "It causes the ESP32 to run out of electricity",
          "It traps execution in an infinite loop, freezing the entire program and locking out all other blocks",
          "It resets all initialized variable counts",
          "It forces pins to switch from output to input"
        ],
        "correct": 1,
        "explanation": "An infinite While Loop is a major bug. Since the condition is always true, the processor cannot exit the loop, locking up the entire system."
      },
      {
        "question": "When is a While Loop preferred over a For Loop?",
        "options": [
          "When you want to execute code faster",
          "When the number of repetitions is dynamic and depends on real-time events rather than a fixed count",
          "When you are blinking red LEDs",
          "While loops are always preferred over For loops"
        ],
        "correct": 1,
        "explanation": "Use While loops when waiting for a dynamic trigger (like a button release or a sensor threshold) where you don't know the count in advance."
      }
    ]
  },
  "4-4-3-intro": {
    "levelTitle": "LEVEL 4.3: Combining Logic (Loops + Conditions)",
    "lessonTitle": " Combining Logic (Loops + Conditions)",
    "stepType": "Introduction",
    "sections": [
      {
        "number": "3.1.1",
        "title": "Overview",
        "icon": "📝",
        "accent": "#6366F1",
        "blocks": [
          {
            "type": "paragraph",
            "text": "In this lesson, you will learn how to combine loops and conditions to build more advanced logic in your programs."
          },
          {
            "type": "paragraph",
            "text": "You will use repetition and decision-making together to control how the system behaves. This is the first time you will see how multiple programming concepts can work together to create smarter systems."
          },
          {
            "type": "image",
            "text": "/lecs/levels/Level 4/4.3/Introduction/images/section_0.png"
          },
          {
            "type": "paragraph",
            "text": "The goal of this lesson is not just to use loops or conditions separately, but to understand that:"
          },
          {
            "type": "bullet",
            "text": "Your blocks are instructions"
          },
          {
            "type": "bullet",
            "text": "The ESP32 executes those instructions"
          },
          {
            "type": "bullet",
            "text": "Loops repeat actions"
          },
          {
            "type": "bullet",
            "text": "Conditions control those actions"
          },
          {
            "type": "bullet",
            "text": "You can combine both to create complex behavior"
          },
          {
            "type": "paragraph",
            "text": "By the end of this lesson, you will have created a system where actions are repeated and controlled by conditions, allowing you to build more flexible and intelligent programs."
          }
        ]
      }
    ]
  },
  "4-4-3-concept": {
    "levelTitle": "LEVEL 4.3: Combining Logic (Loops + Conditions)",
    "lessonTitle": " Combining Logic (Loops + Conditions)",
    "stepType": "What Does Combining Logic Mean?",
    "sections": [
      {
        "number": "3.2.1",
        "title": "Overview",
        "icon": "📝",
        "accent": "#6366F1",
        "blocks": [
          {
            "type": "paragraph",
            "text": "Combining logic means using multiple programming concepts together to control behavior."
          },
          {
            "type": "image",
            "text": "/lecs/levels/Level 4/4.3/Concept Building/images/section_0.png"
          },
          {
            "type": "paragraph",
            "text": "In earlier lessons:"
          },
          {
            "type": "bullet",
            "text": "You used loops (repetition)"
          },
          {
            "type": "bullet",
            "text": "You used conditions (decision making)"
          },
          {
            "type": "paragraph",
            "text": "Now:"
          },
          {
            "type": "bullet",
            "text": "You combine both together"
          },
          {
            "type": "bullet",
            "text": "The system repeats actions and makes decisions at the same time"
          },
          {
            "type": "paragraph",
            "text": "This creates more powerful and flexible programs."
          }
        ]
      },
      {
        "number": "3.2.2",
        "title": "How Do Loops and Conditions Work Together?",
        "icon": "🔁",
        "accent": "#F59E0B",
        "blocks": [
          {
            "type": "paragraph",
            "text": "When combined:"
          },
          {
            "type": "bullet",
            "text": "A loop repeats the process"
          },
          {
            "type": "bullet",
            "text": "A condition controls what happens inside the loop"
          },
          {
            "type": "paragraph",
            "text": "Flow:"
          },
          {
            "type": "bullet",
            "text": "Loop starts"
          },
          {
            "type": "bullet",
            "text": "Input is read"
          },
          {
            "type": "bullet",
            "text": "Condition is checked"
          },
          {
            "type": "bullet",
            "text": "Action is executed"
          },
          {
            "type": "bullet",
            "text": "Loop repeats"
          },
          {
            "type": "image",
            "text": "/lecs/levels/Level 4/4.3/Concept Building/images/section_1.png"
          },
          {
            "type": "paragraph",
            "text": "This means:"
          },
          {
            "type": "bullet",
            "text": "The system continuously checks and responds"
          }
        ]
      },
      {
        "number": "3.2.3",
        "title": "Example: Button Controlled Loop Behavior",
        "icon": "🔁",
        "accent": "#10B981",
        "blocks": [
          {
            "type": "paragraph",
            "text": "Example:"
          },
          {
            "type": "bullet",
            "text": "Loop runs continuously"
          },
          {
            "type": "paragraph",
            "text": "Inside the loop:"
          },
          {
            "type": "bullet",
            "text": "IF button is pressed → LED blinks"
          },
          {
            "type": "bullet",
            "text": "ELSE → LED stays OFF"
          },
          {
            "type": "paragraph",
            "text": "This shows:"
          },
          {
            "type": "bullet",
            "text": "Loop → keeps checking"
          },
          {
            "type": "bullet",
            "text": "Condition → decides behavior"
          },
          {
            "type": "image",
            "text": "/lecs/levels/Level 4/4.3/Concept Building/images/section_2.png"
          }
        ]
      },
      {
        "number": "3.2.4",
        "title": "Nested Logic (Condition Inside Loop)",
        "icon": "🔁",
        "accent": "#EF4444",
        "blocks": [
          {
            "type": "paragraph",
            "text": "When a condition is placed inside a loop, it is called nested logic."
          },
          {
            "type": "image",
            "text": "/lecs/levels/Level 4/4.3/Concept Building/images/section_3.png"
          },
          {
            "type": "paragraph",
            "text": "This means:"
          },
          {
            "type": "bullet",
            "text": "The loop runs repeatedly"
          },
          {
            "type": "bullet",
            "text": "The condition is checked in every iteration"
          },
          {
            "type": "paragraph",
            "text": "This allows:"
          },
          {
            "type": "bullet",
            "text": "Continuous monitoring"
          },
          {
            "type": "bullet",
            "text": "Real-time decision making"
          }
        ]
      },
      {
        "number": "3.2.5",
        "title": "Why is Combining Logic Important?",
        "icon": "⭐",
        "accent": "#8B5CF6",
        "blocks": [
          {
            "type": "paragraph",
            "text": "Combining logic is important because it allows systems to:"
          },
          {
            "type": "bullet",
            "text": "Continuously monitor inputs"
          },
          {
            "type": "bullet",
            "text": "Make decisions repeatedly"
          },
          {
            "type": "bullet",
            "text": "React instantly to changes"
          },
          {
            "type": "paragraph",
            "text": "Without combining logic:"
          },
          {
            "type": "bullet",
            "text": "Systems would be limited"
          },
          {
            "type": "bullet",
            "text": "Behavior would not adapt dynamically"
          },
          {
            "type": "paragraph",
            "text": "With combined logic:"
          },
          {
            "type": "bullet",
            "text": "Systems become interactive and intelligent"
          }
        ]
      },
      {
        "number": "3.2.6",
        "title": "Real-Time System Behavior",
        "icon": "⚙️",
        "accent": "#0EA5E9",
        "blocks": [
          {
            "type": "paragraph",
            "text": "When loops and conditions work together:"
          },
          {
            "type": "bullet",
            "text": "The system keeps running"
          },
          {
            "type": "bullet",
            "text": "It keeps checking input"
          },
          {
            "type": "bullet",
            "text": "It keeps updating output"
          },
          {
            "type": "paragraph",
            "text": "This creates:"
          },
          {
            "type": "bullet",
            "text": "Instant response"
          },
          {
            "type": "bullet",
            "text": "Continuous interaction"
          },
          {
            "type": "bullet",
            "text": "Real-time behavior"
          },
          {
            "type": "image",
            "text": "/lecs/levels/Level 4/4.3/Concept Building/images/section_4.png"
          }
        ]
      },
      {
        "number": "3.2.7",
        "title": "Expanding Combined Logic",
        "icon": "🔀",
        "accent": "#F97316",
        "blocks": [
          {
            "type": "paragraph",
            "text": "This logic can be expanded:"
          },
          {
            "type": "bullet",
            "text": "Multiple conditions inside a loop"
          },
          {
            "type": "bullet",
            "text": "Multiple inputs controlling different outputs"
          },
          {
            "type": "bullet",
            "text": "More complex behaviors"
          },
          {
            "type": "paragraph",
            "text": "Example:"
          },
          {
            "type": "paragraph",
            "text": "The following example demonstrates a double-check system. The light will only turn ON when both buttons are pressed. In this program, btn1 has priority because it is placed in the main condition."
          },
          {
            "type": "image",
            "text": "/lecs/levels/Level 4/4.3/Concept Building/images/section_5.png"
          },
          {
            "type": "paragraph",
            "text": "This means:"
          },
          {
            "type": "bullet",
            "text": "The program first checks whether btn1 is pressed"
          },
          {
            "type": "bullet",
            "text": "Only then does it check the state of btn2"
          },
          {
            "type": "bullet",
            "text": "If both conditions are true, the light turns ON"
          },
          {
            "type": "paragraph",
            "text": "To test, lets just turn on btn2 alone:"
          },
          {
            "type": "image",
            "text": "/lecs/levels/Level 4/4.3/Concept Building/images/section_6.png"
          },
          {
            "type": "paragraph",
            "text": "The light remains OFF because the second condition is nested inside the first condition. The program cannot reach the btn2 check unless btn1 is already active."
          },
          {
            "type": "paragraph",
            "text": "This type of structure is called nested conditional logic, where one condition exists inside another condition."
          },
          {
            "type": "paragraph",
            "text": "Now, when btn1 is pressed and then btn2 is pressed:"
          },
          {
            "type": "image",
            "text": "/lecs/levels/Level 4/4.3/Concept Building/images/section_7.png"
          },
          {
            "type": "paragraph",
            "text": "This shows how simple logic grows into complex systems."
          }
        ]
      },
      {
        "number": "3.2.8",
        "title": "Key Insight of This Lesson",
        "icon": "🔑",
        "accent": "#14B8A6",
        "blocks": [
          {
            "type": "paragraph",
            "text": "The most important concept in this lesson is:"
          },
          {
            "type": "paragraph",
            "text": "You can combine loops and conditions to create systems that continuously observe, decide, and act."
          },
          {
            "type": "paragraph",
            "text": "You are now able to:"
          },
          {
            "type": "bullet",
            "text": "Repeat actions continuously"
          },
          {
            "type": "bullet",
            "text": "Make decisions inside repetition"
          },
          {
            "type": "bullet",
            "text": "Build real-time interactive systems"
          },
          {
            "type": "paragraph",
            "text": "This is a major step toward advanced programming and automation."
          }
        ]
      }
    ],
    "quiz": [
      {
        "question": "What does \"nesting\" mean in program flow architecture?",
        "options": [
          "Deleting duplicate variables in memory",
          "Placing one control structure (like an IF statement or For Loop) inside the body of another control structure",
          "Wiring pins directly to one another",
          "Initializing pins in setup rather than loop"
        ],
        "correct": 1,
        "explanation": "Nesting is placing control blocks inside other control blocks, forming a hierarchy (e.g. evaluating a condition inside a repeating loop)."
      },
      {
        "question": "If an IF statement is nested inside a For Loop that repeats 5 times, how many times is the IF condition checked?",
        "options": [
          "1 time",
          "5 times",
          "0 times",
          "Infinitely"
        ],
        "correct": 1,
        "explanation": "Because the IF block resides inside the loop body, it is executed and evaluated on every single pass of the loop."
      },
      {
        "question": "How do you safely monitor button inputs during a repeating sequence of pin states?",
        "options": [
          "By using huge delays (e.g. delay(10000))",
          "By placing digitalRead checks directly inside the repeating loop body to sample the button state rapidly",
          "By disabling interrupts on the pins",
          "By moving the button pin mode to output"
        ],
        "correct": 1,
        "explanation": "Placing reading blocks inside the repeating loop ensures the input is sampled at high frequency, capturing button presses instantly."
      }
    ]
  },
  "4-4-4-intro": {
    "levelTitle": "LEVEL 4.4: Pattern Systems (Complex LED Patterns)",
    "lessonTitle": " Pattern Systems (Complex LED Patterns)",
    "stepType": "Introduction",
    "sections": [
      {
        "number": "4.1.1",
        "title": "Overview",
        "icon": "📝",
        "accent": "#6366F1",
        "blocks": [
          {
            "type": "paragraph",
            "text": "In this lesson, you will learn how to create patterns using LEDs by combining loops, timing, and control logic."
          },
          {
            "type": "paragraph",
            "text": "You will design sequences where LEDs turn ON and OFF in a specific order, creating visible patterns. This is the first time you will see how your program can generate structured and creative behavior."
          },
          {
            "type": "image",
            "text": "/lecs/levels/Level 4/4.4/Introduction/images/section_0.png"
          },
          {
            "type": "paragraph",
            "text": "The goal of this lesson is not just to blink LEDs, but to understand that:"
          },
          {
            "type": "bullet",
            "text": "Your blocks are instructions"
          },
          {
            "type": "bullet",
            "text": "The ESP32 executes those instructions"
          },
          {
            "type": "bullet",
            "text": "You can control the order of actions"
          },
          {
            "type": "bullet",
            "text": "You can repeat sequences to form patterns"
          },
          {
            "type": "paragraph",
            "text": "By the end of this lesson, you will have created a system where multiple instructions work together to produce repeating LED patterns, helping you build more complex and visually interactive programs."
          }
        ]
      }
    ]
  },
  "4-4-4-concept": {
    "levelTitle": "LEVEL 4.4: Pattern Systems (Complex LED Patterns)",
    "lessonTitle": " Pattern Systems (Complex LED Patterns)",
    "stepType": "What is a Pattern in Programming?",
    "sections": [
      {
        "number": "4.2.1",
        "title": "Overview",
        "icon": "📝",
        "accent": "#6366F1",
        "blocks": [
          {
            "type": "paragraph",
            "text": "A pattern is a sequence of actions that repeats in a specific order."
          },
          {
            "type": "paragraph",
            "text": "In earlier lessons:"
          },
          {
            "type": "bullet",
            "text": "You controlled a single LED"
          },
          {
            "type": "bullet",
            "text": "You performed simple ON/OFF actions"
          },
          {
            "type": "paragraph",
            "text": "Now:"
          },
          {
            "type": "bullet",
            "text": "You will create organized sequences"
          },
          {
            "type": "bullet",
            "text": "These sequences repeat to form patterns"
          },
          {
            "type": "paragraph",
            "text": "A pattern is not random — it follows a planned order."
          },
          {
            "type": "image",
            "text": "/lecs/levels/Level 4/4.4/Concept Building/images/section_0.png"
          }
        ]
      },
      {
        "number": "4.2.2",
        "title": "How Do Patterns Work?",
        "icon": "⚙️",
        "accent": "#F59E0B",
        "blocks": [
          {
            "type": "paragraph",
            "text": "Patterns are created using:"
          },
          {
            "type": "bullet",
            "text": "A sequence of steps"
          },
          {
            "type": "bullet",
            "text": "A specific order of execution"
          },
          {
            "type": "bullet",
            "text": "Repetition of that sequence"
          },
          {
            "type": "image",
            "text": "/lecs/levels/Level 4/4.4/Concept Building/images/section_1.png"
          },
          {
            "type": "paragraph",
            "text": "Example:"
          },
          {
            "type": "bullet",
            "text": "LED1 ON → LED1 OFF"
          },
          {
            "type": "bullet",
            "text": "LED2 ON → LED2 OFF"
          },
          {
            "type": "bullet",
            "text": "Repeat"
          },
          {
            "type": "paragraph",
            "text": "This creates a visible pattern."
          }
        ]
      },
      {
        "number": "4.2.3",
        "title": "Using Multiple Outputs",
        "icon": "📝",
        "accent": "#10B981",
        "blocks": [
          {
            "type": "paragraph",
            "text": "To create patterns, you often use multiple LEDs."
          },
          {
            "type": "image",
            "text": "/lecs/levels/Level 4/4.4/Concept Building/images/section_2.png"
          },
          {
            "type": "paragraph",
            "text": "Each LED:"
          },
          {
            "type": "bullet",
            "text": "Is connected to a different pin"
          },
          {
            "type": "bullet",
            "text": "Can be controlled independently"
          },
          {
            "type": "paragraph",
            "text": "This allows:"
          },
          {
            "type": "bullet",
            "text": "Different LEDs to turn ON/OFF at different times"
          },
          {
            "type": "bullet",
            "text": "More complex and interesting patterns"
          }
        ]
      },
      {
        "number": "4.2.4",
        "title": "Role of Timing in Patterns",
        "icon": "⚙️",
        "accent": "#EF4444",
        "blocks": [
          {
            "type": "paragraph",
            "text": "Timing is very important in patterns."
          },
          {
            "type": "paragraph",
            "text": "Using delay:"
          },
          {
            "type": "bullet",
            "text": "Controls how long an LED stays ON or OFF"
          },
          {
            "type": "bullet",
            "text": "Affects the speed of the pattern"
          },
          {
            "type": "image",
            "text": "/lecs/levels/Level 4/4.4/Concept Building/images/section_3.png"
          },
          {
            "type": "paragraph",
            "text": "Example:"
          },
          {
            "type": "bullet",
            "text": "Short delay → fast pattern"
          },
          {
            "type": "bullet",
            "text": "Long delay → slow pattern"
          },
          {
            "type": "paragraph",
            "text": "Timing makes patterns visible and meaningful."
          }
        ]
      },
      {
        "number": "4.2.5",
        "title": "Using Loops to Repeat Patterns",
        "icon": "🔁",
        "accent": "#8B5CF6",
        "blocks": [
          {
            "type": "paragraph",
            "text": "Loops are used to repeat patterns automatically."
          },
          {
            "type": "image",
            "text": "/lecs/levels/Level 4/4.4/Concept Building/images/section_4.png"
          },
          {
            "type": "paragraph",
            "text": "Instead of writing the sequence many times:"
          },
          {
            "type": "bullet",
            "text": "You define the pattern once"
          },
          {
            "type": "bullet",
            "text": "Use a loop to repeat it"
          },
          {
            "type": "paragraph",
            "text": "This creates:"
          },
          {
            "type": "bullet",
            "text": "Continuous patterns"
          },
          {
            "type": "bullet",
            "text": "Efficient programs"
          }
        ]
      },
      {
        "number": "4.2.6",
        "title": "Combining Logic for Complex Patterns",
        "icon": "⚙️",
        "accent": "#0EA5E9",
        "blocks": [
          {
            "type": "paragraph",
            "text": "Complex patterns are created by combining:"
          },
          {
            "type": "bullet",
            "text": "Multiple LEDs"
          },
          {
            "type": "bullet",
            "text": "Loops (repetition)"
          },
          {
            "type": "bullet",
            "text": "Timing (delay)"
          },
          {
            "type": "bullet",
            "text": "Conditions (optional)"
          },
          {
            "type": "paragraph",
            "text": "Example:"
          },
          {
            "type": "bullet",
            "text": "LED1 → LED2 → LED3 → reverse sequence"
          },
          {
            "type": "paragraph",
            "text": "This creates advanced visual effects."
          }
        ]
      },
      {
        "number": "4.2.7",
        "title": "Real-World Examples of Pattern Systems",
        "icon": "⚙️",
        "accent": "#F97316",
        "blocks": [
          {
            "type": "paragraph",
            "text": "Pattern systems are used in real life:"
          },
          {
            "type": "bullet",
            "text": "Traffic lights (Red → Yellow → Green)"
          },
          {
            "type": "bullet",
            "text": "Decorative lighting systems"
          },
          {
            "type": "bullet",
            "text": "Car indicators (running lights)"
          },
          {
            "type": "bullet",
            "text": "Display systems"
          },
          {
            "type": "image",
            "text": "/lecs/levels/Level 4/4.4/Concept Building/images/section_5.png"
          },
          {
            "type": "paragraph",
            "text": "All follow:"
          },
          {
            "type": "bullet",
            "text": "Sequence + Timing + Repetition"
          }
        ]
      },
      {
        "number": "4.2.8",
        "title": "Key Insight of This Lesson",
        "icon": "🔑",
        "accent": "#14B8A6",
        "blocks": [
          {
            "type": "paragraph",
            "text": "The most important concept in this lesson is:"
          },
          {
            "type": "paragraph",
            "text": "You can create structured and repeating patterns by combining sequence, timing, and loops."
          },
          {
            "type": "paragraph",
            "text": "You are now able to:"
          },
          {
            "type": "bullet",
            "text": "Control multiple outputs"
          },
          {
            "type": "bullet",
            "text": "Create ordered sequences"
          },
          {
            "type": "bullet",
            "text": "Build visually interactive systems"
          },
          {
            "type": "paragraph",
            "text": "This is an important step toward designing complex embedded systems and creative projects."
          }
        ]
      }
    ],
    "quiz": [
      {
        "question": "What is a sequential multi-LED \"chasing pattern\"?",
        "options": [
          "Turning all connected pins HIGH at the exact same moment",
          "Illuminating and extinguishing multiple pins in a timed, shifting sequential order",
          "A wireless network data package",
          "A random digital state check"
        ],
        "correct": 1,
        "explanation": "A chasing pattern lights up pins in sequence (e.g. Pin 2, then Pin 4, then Pin 5) with brief pauses to create a moving light wave effect."
      },
      {
        "question": "Why is precise coordination of pin state timing vital in active patterns?",
        "options": [
          "To conserve electrical current on the board",
          "To prevent overlapping states where multiple pins actuate out of sync",
          "To keep variables from clearing",
          "To allow blocks to execute out of order"
        ],
        "correct": 1,
        "explanation": "Coordination ensures display elements activate strictly according to the design sequence, preventing chaotic overlaps."
      },
      {
        "question": "Why are index-based loops powerful for complex pattern animations?",
        "options": [
          "They automatically turn off all hardware components",
          "They let a short block loop cycle through an ordered list of target pin numbers efficiently",
          "They are slower and consume less power",
          "They bypass compiler type checking"
        ],
        "correct": 1,
        "explanation": "Iterating over sequence indices allows you to drive complex, multi-pin displays using a tiny set of loops, rather than writing hundreds of individual lines."
      }
    ]
  },
  "5-5-1-intro": {
    "levelTitle": "LEVEL 6.1: Temperature and Humidity (DHT Sensor Basics)",
    "lessonTitle": " Temperature and Humidity (DHT Sensor Basics)",
    "stepType": "1. Introduction",
    "sections": [
      {
        "number": "1.1.1",
        "title": "Overview",
        "icon": "📝",
        "accent": "#6366F1",
        "blocks": [
          {
            "type": "paragraph",
            "text": "Until now, you have been working with simulated inputs like sliders and basic analog signals."
          },
          {
            "type": "image",
            "text": "/lecs/levels/Level 5/Level 5.1/Introduction/images/1_0.png"
          },
          {
            "type": "paragraph",
            "text": "In real systems, however, computers often read data from the physical world."
          },
          {
            "type": "paragraph",
            "text": "One of the most common types of real-world data is environmental data:"
          },
          {
            "type": "bullet",
            "text": "Temperature"
          },
          {
            "type": "bullet",
            "text": "Humidity"
          },
          {
            "type": "paragraph",
            "text": "In this lesson, you will learn how the ESP32 reads data from a sensor that measures these conditions."
          },
          {
            "type": "paragraph",
            "text": "Instead of manually changing values, the system will now receive information from the environment."
          }
        ]
      }
    ]
  },
  "5-5-1-concept": {
    "levelTitle": "3. Concept Building",
    "lessonTitle": "3. Concept Building",
    "stepType": "3.1 What is a sensor?",
    "sections": [
      {
        "number": "1.2.1",
        "title": "Overview",
        "icon": "📝",
        "accent": "#6366F1",
        "blocks": [
          {
            "type": "paragraph",
            "text": "A sensor is a component that reads information from the physical world and converts it into data that the ESP32 can understand."
          },
          {
            "type": "paragraph",
            "text": "Instead of manually providing input (like a slider), the system now receives input from the environment itself."
          },
          {
            "type": "image",
            "text": "/lecs/levels/Level 5/Level 5.1/Concept Building/images/3.1_0.png"
          },
          {
            "type": "paragraph",
            "text": "In this lesson, the sensor measures:"
          },
          {
            "type": "bullet",
            "text": "Temperature (heat level)"
          },
          {
            "type": "bullet",
            "text": "Humidity (moisture in air)"
          }
        ]
      },
      {
        "number": "1.2.2",
        "title": "3.2 What is the DHT sensor doing?",
        "icon": "🔬",
        "accent": "#F59E0B",
        "blocks": [
          {
            "type": "paragraph",
            "text": "The DHT sensor continuously monitors the environment and sends updated values to the ESP32."
          },
          {
            "type": "image",
            "text": "/lecs/levels/Level 5/Level 5.1/Concept Building/images/3.2_0.png"
          },
          {
            "type": "paragraph",
            "text": "It does not give a single fixed value. Instead:"
          },
          {
            "type": "bullet",
            "text": "It keeps measuring"
          },
          {
            "type": "bullet",
            "text": "It keeps updating"
          },
          {
            "type": "bullet",
            "text": "It reflects real-world changes"
          },
          {
            "type": "paragraph",
            "text": "This means the input is now external and dynamic, not manually controlled."
          }
        ]
      },
      {
        "number": "1.2.3",
        "title": "3.3 Why do values change over time?",
        "icon": "📊",
        "accent": "#10B981",
        "blocks": [
          {
            "type": "paragraph",
            "text": "You will notice that temperature and humidity values are not always stable."
          },
          {
            "type": "paragraph",
            "text": "This happens because:"
          },
          {
            "type": "bullet",
            "text": "The environment is always changing slightly"
          },
          {
            "type": "bullet",
            "text": "Air movement affects readings"
          },
          {
            "type": "bullet",
            "text": "Heat sources affect temperature"
          },
          {
            "type": "bullet",
            "text": "Humidity varies naturally"
          },
          {
            "type": "paragraph",
            "text": "So even if nothing seems to change, the sensor may still show small variations."
          },
          {
            "type": "image",
            "text": "/lecs/levels/Level 5/Level 5.1/Concept Building/images/3.3_0.png"
          },
          {
            "type": "image",
            "text": "/lecs/levels/Level 5/Level 5.1/Concept Building/images/3.3_1.png"
          }
        ]
      },
      {
        "number": "1.2.4",
        "title": "3.4 Understanding real-world input",
        "icon": "🔀",
        "accent": "#EF4444",
        "blocks": [
          {
            "type": "paragraph",
            "text": "Unlike previous lessons where:"
          },
          {
            "type": "bullet",
            "text": "You controlled the input manually"
          },
          {
            "type": "paragraph",
            "text": "Now:"
          },
          {
            "type": "bullet",
            "text": "The environment controls the input"
          },
          {
            "type": "paragraph",
            "text": "This is a major shift."
          },
          {
            "type": "image",
            "text": "/lecs/levels/Level 5/Level 5.1/Concept Building/images/3.4_0.png"
          },
          {
            "type": "paragraph",
            "text": "The system is no longer just reacting to user input—it is reacting to real conditions. The environment alone controls what the values will be."
          }
        ]
      },
      {
        "number": "1.2.5",
        "title": "3.5 Why sensors are important",
        "icon": "🔬",
        "accent": "#8B5CF6",
        "blocks": [
          {
            "type": "paragraph",
            "text": "Sensors allow systems to:"
          },
          {
            "type": "bullet",
            "text": "Understand their surroundings"
          },
          {
            "type": "bullet",
            "text": "Make decisions based on real conditions"
          },
          {
            "type": "bullet",
            "text": "React to changes without human input"
          },
          {
            "type": "paragraph",
            "text": "This is the foundation of all smart systems:"
          },
          {
            "type": "bullet",
            "text": "Smart homes"
          },
          {
            "type": "bullet",
            "text": "Weather stations"
          },
          {
            "type": "bullet",
            "text": "Industrial monitoring"
          },
          {
            "type": "bullet",
            "text": "IoT devices"
          },
          {
            "type": "image",
            "text": "/lecs/levels/Level 5/Level 5.1/Concept Building/images/3.5_0.png"
          }
        ]
      },
      {
        "number": "1.2.6",
        "title": "3.6 How the ESP32 reads sensor data",
        "icon": "🔬",
        "accent": "#0EA5E9",
        "blocks": [
          {
            "type": "paragraph",
            "text": "The process is simple:"
          },
          {
            "type": "bullet",
            "text": "The sensor measures temperature and humidity"
          },
          {
            "type": "bullet",
            "text": "It sends this data to the ESP32"
          },
          {
            "type": "bullet",
            "text": "The ESP32 reads the values"
          },
          {
            "type": "bullet",
            "text": "The values are then used in your program"
          },
          {
            "type": "paragraph",
            "text": "This happens repeatedly in a loop, so the system always stays updated."
          },
          {
            "type": "bullet",
            "text": "3.7 Why Serial is important here"
          },
          {
            "type": "paragraph",
            "text": "Since sensor values change over time, you need a way to observe them."
          },
          {
            "type": "paragraph",
            "text": "Serial output allows you to:"
          },
          {
            "type": "image",
            "text": "/lecs/levels/Level 5/Level 5.1/Concept Building/images/3.6_0.png"
          },
          {
            "type": "bullet",
            "text": "See live data"
          },
          {
            "type": "bullet",
            "text": "Track changes over time"
          },
          {
            "type": "bullet",
            "text": "Understand environmental behavior"
          },
          {
            "type": "paragraph",
            "text": "Without Serial, the data would exist but remain invisible."
          }
        ]
      },
      {
        "number": "1.2.7",
        "title": "3.8 Understanding real-time environmental systems",
        "icon": "⚙️",
        "accent": "#F97316",
        "blocks": [
          {
            "type": "paragraph",
            "text": "Now your system behaves like a real monitoring device."
          },
          {
            "type": "paragraph",
            "text": "It:"
          },
          {
            "type": "bullet",
            "text": "Continuously reads environmental data"
          },
          {
            "type": "bullet",
            "text": "Updates values in real time"
          },
          {
            "type": "bullet",
            "text": "Reflects changes in surroundings"
          },
          {
            "type": "paragraph",
            "text": "This is the first step toward building real IoT systems."
          }
        ]
      },
      {
        "number": "1.2.8",
        "title": "3.9 Key Insight of This Lesson",
        "icon": "🔑",
        "accent": "#14B8A6",
        "blocks": [
          {
            "type": "bullet",
            "text": "Sensors read data from the physical world"
          },
          {
            "type": "bullet",
            "text": "DHT measures temperature and humidity"
          },
          {
            "type": "bullet",
            "text": "Values change based on real environmental conditions"
          },
          {
            "type": "bullet",
            "text": "The ESP32 continuously reads updated data"
          },
          {
            "type": "bullet",
            "text": "Systems are no longer manually controlled only—they react to reality"
          }
        ]
      }
    ]
  },
  "5-5-2-intro": {
    "levelTitle": "LEVEL 6.2: Motion Detection (PIR Sensor)",
    "lessonTitle": " Motion Detection (PIR Sensor)",
    "stepType": "1. Introduction",
    "sections": [
      {
        "number": "2.1.1",
        "title": "Overview",
        "icon": "📝",
        "accent": "#6366F1",
        "blocks": [
          {
            "type": "paragraph",
            "text": "In the previous lesson, your system was observing the environment by reading temperature and humidity."
          },
          {
            "type": "paragraph",
            "text": "In this lesson, the system will go one step further."
          },
          {
            "type": "paragraph",
            "text": "Instead of continuously measuring values, it will now detect events—specifically, movement."
          },
          {
            "type": "paragraph",
            "text": "A PIR sensor (Passive Infrared Sensor) allows the ESP32 to detect when a person or object moves in its field of view."
          },
          {
            "type": "paragraph",
            "text": "This introduces a new type of input:"
          },
          {
            "type": "bullet",
            "text": "Not continuous values"
          },
          {
            "type": "bullet",
            "text": "But event-based signals"
          },
          {
            "type": "image",
            "text": "/lecs/levels/Level 5/Level 5.2/Introduction/images/1_0.png"
          }
        ]
      }
    ]
  },
  "5-5-2-concept": {
    "levelTitle": "3. Concept Building",
    "lessonTitle": "3. Concept Building",
    "stepType": "3.1 What is a PIR sensor actually doing?",
    "sections": [
      {
        "number": "2.2.1",
        "title": "Overview",
        "icon": "📝",
        "accent": "#6366F1",
        "blocks": [
          {
            "type": "paragraph",
            "text": "A PIR sensor does not measure gradual changes like temperature or humidity."
          },
          {
            "type": "paragraph",
            "text": "Instead, it detects motion by sensing changes in infrared radiation."
          },
          {
            "type": "paragraph",
            "text": "In simple terms:"
          },
          {
            "type": "bullet",
            "text": "When nothing moves → no signal change"
          },
          {
            "type": "bullet",
            "text": "When something moves → signal becomes active"
          },
          {
            "type": "paragraph",
            "text": "This makes it a binary event detector, not a continuous sensor."
          },
          {
            "type": "image",
            "text": "/lecs/levels/Level 5/Level 5.2/Concept Building/images/3.1_0.png"
          }
        ]
      },
      {
        "number": "2.2.2",
        "title": "3.2 Understanding event-based input",
        "icon": "🔀",
        "accent": "#F59E0B",
        "blocks": [
          {
            "type": "paragraph",
            "text": "Unlike analog sensors that give you a range of values, the PIR sensor behaves differently."
          },
          {
            "type": "paragraph",
            "text": "It only tells you:"
          },
          {
            "type": "bullet",
            "text": "Motion detected"
          },
          {
            "type": "bullet",
            "text": "No motion detected"
          },
          {
            "type": "image",
            "text": "/lecs/levels/Level 5/Level 5.2/Concept Building/images/3.2_0.png"
          },
          {
            "type": "paragraph",
            "text": "This is similar to digital input, but it is triggered by real-world movement, not a manual button."
          }
        ]
      },
      {
        "number": "2.2.3",
        "title": "3.3 Why does motion detection matter?",
        "icon": "❓",
        "accent": "#10B981",
        "blocks": [
          {
            "type": "paragraph",
            "text": "Motion detection allows systems to:"
          },
          {
            "type": "bullet",
            "text": "React only when something happens"
          },
          {
            "type": "bullet",
            "text": "Save energy by staying idle otherwise"
          },
          {
            "type": "bullet",
            "text": "Trigger actions automatically"
          },
          {
            "type": "paragraph",
            "text": "For example:"
          },
          {
            "type": "bullet",
            "text": "Security lights turning on when someone enters"
          },
          {
            "type": "bullet",
            "text": "Alarms activating when movement is detected"
          },
          {
            "type": "bullet",
            "text": "Smart cameras starting recording"
          },
          {
            "type": "bullet",
            "text": "This is the foundation of automated response systems"
          },
          {
            "type": "image",
            "text": "/lecs/levels/Level 5/Level 5.2/Concept Building/images/3.3_0.png"
          }
        ]
      },
      {
        "number": "2.2.4",
        "title": "3.4 How the ESP32 interprets PIR signals",
        "icon": "📝",
        "accent": "#EF4444",
        "blocks": [
          {
            "type": "paragraph",
            "text": "The PIR sensor sends a simple signal to the ESP32:"
          },
          {
            "type": "bullet",
            "text": "HIGH → motion detected"
          },
          {
            "type": "bullet",
            "text": "LOW → no motion detected"
          },
          {
            "type": "paragraph",
            "text": "The ESP32 reads this signal repeatedly inside the loop and updates behavior accordingly."
          },
          {
            "type": "paragraph",
            "text": "This allows the system to respond instantly when movement occurs."
          }
        ]
      },
      {
        "number": "2.2.5",
        "title": "3.5 From observation to reaction",
        "icon": "📝",
        "accent": "#8B5CF6",
        "blocks": [
          {
            "type": "paragraph",
            "text": "In previous lessons, the system:"
          },
          {
            "type": "bullet",
            "text": "Observed values continuously"
          },
          {
            "type": "paragraph",
            "text": "Now, the system:"
          },
          {
            "type": "bullet",
            "text": "Waits for an event"
          },
          {
            "type": "bullet",
            "text": "Reacts when it happens"
          },
          {
            "type": "paragraph",
            "text": "This is an important shift in thinking:"
          },
          {
            "type": "bullet",
            "text": "From passive monitoring"
          },
          {
            "type": "bullet",
            "text": "To active response"
          }
        ]
      },
      {
        "number": "2.2.6",
        "title": "3.6 How motion triggers behavior",
        "icon": "📝",
        "accent": "#0EA5E9",
        "blocks": [
          {
            "type": "paragraph",
            "text": "You can now connect input to output directly."
          },
          {
            "type": "image",
            "text": "/lecs/levels/Level 5/Level 5.2/Concept Building/images/3.6_0.png"
          },
          {
            "type": "paragraph",
            "text": "For example:"
          },
          {
            "type": "bullet",
            "text": "If motion is detected → turn LED ON"
          },
          {
            "type": "bullet",
            "text": "If no motion → turn LED OFF"
          },
          {
            "type": "paragraph",
            "text": "This creates a simple rule-based system that reacts to the environment."
          },
          {
            "type": "paragraph",
            "text": "The system no longer just displays information, it performs actions based on conditions."
          }
        ]
      },
      {
        "number": "2.2.7",
        "title": "3.7 Why stability matters in PIR readings",
        "icon": "❓",
        "accent": "#F97316",
        "blocks": [
          {
            "type": "paragraph",
            "text": "You may notice:"
          },
          {
            "type": "bullet",
            "text": "The sensor may stay HIGH for a short time after motion"
          },
          {
            "type": "bullet",
            "text": "Then return to LOW when no movement is detected"
          },
          {
            "type": "paragraph",
            "text": "This is normal behavior."
          },
          {
            "type": "paragraph",
            "text": "It ensures that:"
          },
          {
            "type": "bullet",
            "text": "Motion is not missed"
          },
          {
            "type": "bullet",
            "text": "Small movements still trigger detection"
          },
          {
            "type": "paragraph",
            "text": "The system smooths real-world activity into readable signals."
          }
        ]
      },
      {
        "number": "2.2.8",
        "title": "3.8 Key Insight of This Lesson",
        "icon": "🔑",
        "accent": "#14B8A6",
        "blocks": [
          {
            "type": "bullet",
            "text": "PIR sensors detect motion, not continuous values"
          },
          {
            "type": "bullet",
            "text": "Output is event-based (motion / no motion)"
          },
          {
            "type": "bullet",
            "text": "Systems react only when a condition is triggered"
          },
          {
            "type": "bullet",
            "text": "This enables automation and smart behavior"
          },
          {
            "type": "bullet",
            "text": "ESP32 continuously checks for events in a loop"
          },
          {
            "type": "bullet",
            "text": "Motion detection is the foundation of reactive systems"
          }
        ]
      }
    ]
  },
  "5-5-3-intro": {
    "levelTitle": "LEVEL 6.3: Distance Measurement (Ultrasonic Sensor)",
    "lessonTitle": " Distance Measurement (Ultrasonic Sensor)",
    "stepType": "1. Introduction",
    "sections": [
      {
        "number": "3.1.1",
        "title": "Overview",
        "icon": "📝",
        "accent": "#6366F1",
        "blocks": [
          {
            "type": "paragraph",
            "text": "In the previous lesson, you learned how the system can detect motion using a PIR sensor."
          },
          {
            "type": "paragraph",
            "text": "That was a binary understanding of the world:"
          },
          {
            "type": "bullet",
            "text": "Motion detected"
          },
          {
            "type": "bullet",
            "text": "No motion detected"
          },
          {
            "type": "paragraph",
            "text": "In this lesson, the system becomes more precise."
          },
          {
            "type": "paragraph",
            "text": "Instead of just detecting whether something is present, the ESP32 will now measure how far away it is."
          },
          {
            "type": "paragraph",
            "text": "This is done using an ultrasonic sensor, which allows the system to understand space and distance in real time."
          },
          {
            "type": "image",
            "text": "/lecs/levels/Level 5/Level 5.3/Introduction/images/1_0.png"
          }
        ]
      }
    ]
  },
  "5-5-3-concept": {
    "levelTitle": "3. Concept Building",
    "lessonTitle": "3. Concept Building",
    "stepType": "3.1 What is an ultrasonic sensor measuring?",
    "sections": [
      {
        "number": "3.2.1",
        "title": "Overview",
        "icon": "📝",
        "accent": "#6366F1",
        "blocks": [
          {
            "type": "paragraph",
            "text": "An ultrasonic sensor does not detect presence or motion."
          },
          {
            "type": "paragraph",
            "text": "Instead, it measures distance by sending sound waves and calculating how long they take to return."
          },
          {
            "type": "paragraph",
            "text": "In simple terms:"
          },
          {
            "type": "bullet",
            "text": "It sends a signal"
          },
          {
            "type": "bullet",
            "text": "The signal reflects off an object"
          },
          {
            "type": "bullet",
            "text": "It measures how long the return takes"
          },
          {
            "type": "bullet",
            "text": "That time is converted into distance"
          },
          {
            "type": "paragraph",
            "text": "This allows the system to understand how far away an object is."
          },
          {
            "type": "image",
            "text": "/lecs/levels/Level 5/Level 5.3/Concept Building/images/3.1_0.png"
          }
        ]
      },
      {
        "number": "3.2.2",
        "title": "3.2 Understanding distance as a value",
        "icon": "📊",
        "accent": "#F59E0B",
        "blocks": [
          {
            "type": "paragraph",
            "text": "Unlike previous sensors:"
          },
          {
            "type": "bullet",
            "text": "PIR → only detects motion"
          },
          {
            "type": "bullet",
            "text": "Analog input → measures intensity"
          },
          {
            "type": "bullet",
            "text": "Ultrasonic sensor → measures space"
          },
          {
            "type": "paragraph",
            "text": "The output is a number that represents distance."
          },
          {
            "type": "paragraph",
            "text": "For example:"
          },
          {
            "type": "bullet",
            "text": "Small value → object is close"
          },
          {
            "type": "bullet",
            "text": "Large value → object is far"
          },
          {
            "type": "paragraph",
            "text": "This introduces a new type of understanding called  spatial awareness."
          },
          {
            "type": "image",
            "text": "/lecs/levels/Level 5/Level 5.3/Concept Building/images/3.2_0.png"
          }
        ]
      },
      {
        "number": "3.2.3",
        "title": "3.3 Why does distance change smoothly?",
        "icon": "❓",
        "accent": "#10B981",
        "blocks": [
          {
            "type": "paragraph",
            "text": "As you move an object:"
          },
          {
            "type": "bullet",
            "text": "Distance decreases gradually when approaching"
          },
          {
            "type": "bullet",
            "text": "Distance increases gradually when moving away"
          },
          {
            "type": "paragraph",
            "text": "This creates a smooth, continuous stream of values."
          },
          {
            "type": "paragraph",
            "text": "This is similar to analog behavior, but applied to physical space."
          }
        ]
      },
      {
        "number": "3.2.4",
        "title": "3.4 What does the ESP32 actually receive?",
        "icon": "💡",
        "accent": "#EF4444",
        "blocks": [
          {
            "type": "paragraph",
            "text": "The sensor converts physical distance into a numeric value."
          },
          {
            "type": "paragraph",
            "text": "The ESP32 receives:"
          },
          {
            "type": "bullet",
            "text": "A number representing how far the object is"
          },
          {
            "type": "image",
            "text": "/lecs/levels/Level 5/Level 5.3/Concept Building/images/3.4_0.png"
          },
          {
            "type": "paragraph",
            "text": "This allows the system to:"
          },
          {
            "type": "bullet",
            "text": "React to proximity"
          },
          {
            "type": "bullet",
            "text": "Measure space accurately"
          },
          {
            "type": "bullet",
            "text": "Make decisions based on distance"
          },
          {
            "type": "paragraph",
            "text": "3.5 Why is this important?"
          },
          {
            "type": "paragraph",
            "text": "Distance measurement is used in real systems such as:"
          },
          {
            "type": "bullet",
            "text": "Parking sensors in cars"
          },
          {
            "type": "bullet",
            "text": "Obstacle avoidance robots"
          },
          {
            "type": "bullet",
            "text": "Smart door systems"
          },
          {
            "type": "bullet",
            "text": "Level detection in tanks"
          },
          {
            "type": "image",
            "text": "/lecs/levels/Level 5/Level 5.3/Concept Building/images/3.4_1.png"
          },
          {
            "type": "image",
            "text": "/lecs/levels/Level 5/Level 5.3/Concept Building/images/3.4_2.png"
          },
          {
            "type": "paragraph",
            "text": "These systems need to know not just if something exists, but how far it is."
          }
        ]
      },
      {
        "number": "3.2.5",
        "title": "3.6 How systems use distance values",
        "icon": "📊",
        "accent": "#8B5CF6",
        "blocks": [
          {
            "type": "paragraph",
            "text": "Distance values are often used to:"
          },
          {
            "type": "bullet",
            "text": "Trigger actions when objects are too close"
          },
          {
            "type": "bullet",
            "text": "Adjust behavior based on proximity"
          },
          {
            "type": "bullet",
            "text": "Create safety responses"
          },
          {
            "type": "paragraph",
            "text": "For example:"
          },
          {
            "type": "bullet",
            "text": "If object is too close → stop motor"
          },
          {
            "type": "bullet",
            "text": "If object is far → continue movement"
          },
          {
            "type": "paragraph",
            "text": "This turns raw distance into decision-making logic."
          }
        ]
      },
      {
        "number": "3.2.6",
        "title": "3.7 Real-time behavior of distance systems",
        "icon": "⚙️",
        "accent": "#0EA5E9",
        "blocks": [
          {
            "type": "paragraph",
            "text": "Since the sensor runs continuously:"
          },
          {
            "type": "bullet",
            "text": "Distance values are updated constantly"
          },
          {
            "type": "bullet",
            "text": "Movement instantly changes readings"
          },
          {
            "type": "bullet",
            "text": "The system always has the latest information"
          },
          {
            "type": "paragraph",
            "text": "This makes it suitable for dynamic environments."
          }
        ]
      },
      {
        "number": "3.2.7",
        "title": "3.8 Key Insight of This Lesson",
        "icon": "🔑",
        "accent": "#F97316",
        "blocks": [
          {
            "type": "bullet",
            "text": "Ultrasonic sensors measure distance using sound waves"
          },
          {
            "type": "bullet",
            "text": "Output is a numeric value representing space"
          },
          {
            "type": "bullet",
            "text": "Distance changes continuously as objects move"
          },
          {
            "type": "bullet",
            "text": "Systems can now understand physical space"
          },
          {
            "type": "bullet",
            "text": "This enables proximity-based decision making"
          },
          {
            "type": "bullet",
            "text": "ESP32 continuously updates distance in real time"
          }
        ]
      }
    ]
  },
  "5-5-4-intro": {
    "levelTitle": "LEVEL 6.4: Sound Output (Buzzer Control)",
    "lessonTitle": " Sound Output (Buzzer Control)",
    "stepType": "1. Introduction",
    "sections": [
      {
        "number": "4.1.1",
        "title": "Overview",
        "icon": "📝",
        "accent": "#6366F1",
        "blocks": [
          {
            "type": "paragraph",
            "text": "In the previous lessons, your system learned how to:"
          },
          {
            "type": "bullet",
            "text": "Detect motion using PIR sensors"
          },
          {
            "type": "bullet",
            "text": "Measure distance using ultrasonic sensors"
          },
          {
            "type": "bullet",
            "text": "Observe real-world conditions continuously"
          },
          {
            "type": "paragraph",
            "text": "So far, the ESP32 has only been receiving information."
          },
          {
            "type": "paragraph",
            "text": "In this lesson, the system will take a new step:"
          },
          {
            "type": "paragraph",
            "text": "It will produce sound based on conditions."
          },
          {
            "type": "image",
            "text": "/lecs/levels/Level 5/Level 5.4/Introduction/images/1_0.png"
          },
          {
            "type": "paragraph",
            "text": "You will use a buzzer to generate sound signals that respond to sensor input."
          },
          {
            "type": "paragraph",
            "text": "This introduces a new idea:"
          },
          {
            "type": "bullet",
            "text": "The system can now communicate back to the physical world"
          }
        ]
      }
    ]
  },
  "5-5-4-concept": {
    "levelTitle": "3. Concept Building",
    "lessonTitle": "3. Concept Building",
    "stepType": "3.1 What is a buzzer?",
    "sections": [
      {
        "number": "4.2.1",
        "title": "Overview",
        "icon": "📝",
        "accent": "#6366F1",
        "blocks": [
          {
            "type": "paragraph",
            "text": "A buzzer is an output device that produces sound when electrical signals are applied to it."
          },
          {
            "type": "paragraph",
            "text": "Unlike LEDs (which produce light), a buzzer:"
          },
          {
            "type": "bullet",
            "text": "Produces sound waves"
          },
          {
            "type": "bullet",
            "text": "Can turn ON and OFF rapidly"
          },
          {
            "type": "bullet",
            "text": "Can create patterns of sound"
          },
          {
            "type": "paragraph",
            "text": "This allows the system to communicate through audio signals."
          },
          {
            "type": "image",
            "text": "/lecs/levels/Level 5/Level 5.4/Concept Building/images/3.1_0.png"
          }
        ]
      },
      {
        "number": "4.2.2",
        "title": "3.2 How does the ESP32 control sound?",
        "icon": "📝",
        "accent": "#F59E0B",
        "blocks": [
          {
            "type": "paragraph",
            "text": "The ESP32 controls a buzzer by sending electrical signals in patterns."
          },
          {
            "type": "paragraph",
            "text": "When the signal is:"
          },
          {
            "type": "bullet",
            "text": "ON → sound is produced"
          },
          {
            "type": "bullet",
            "text": "OFF → sound stops"
          },
          {
            "type": "paragraph",
            "text": "By controlling timing and repetition, different sound behaviors can be created."
          },
          {
            "type": "image",
            "text": "/lecs/levels/Level 5/Level 5.4/Concept Building/images/3.2_0.png"
          }
        ]
      },
      {
        "number": "4.2.3",
        "title": "3.3 Why is sound important in systems?",
        "icon": "⭐",
        "accent": "#10B981",
        "blocks": [
          {
            "type": "paragraph",
            "text": "Sound is used in many real-world applications because it:"
          },
          {
            "type": "bullet",
            "text": "Provides immediate feedback"
          },
          {
            "type": "bullet",
            "text": "Works without visual attention"
          },
          {
            "type": "bullet",
            "text": "Can warn or alert users"
          },
          {
            "type": "paragraph",
            "text": "For example:"
          },
          {
            "type": "bullet",
            "text": "Car parking sensors"
          },
          {
            "type": "bullet",
            "text": "Alarm systems"
          },
          {
            "type": "bullet",
            "text": "Notification devices"
          },
          {
            "type": "bullet",
            "text": "Safety warnings"
          },
          {
            "type": "image",
            "text": "/lecs/levels/Level 5/Level 5.4/Concept Building/images/3.3_0.png"
          }
        ]
      },
      {
        "number": "4.2.4",
        "title": "3.4 Understanding sound as a pattern",
        "icon": "⚙️",
        "accent": "#EF4444",
        "blocks": [
          {
            "type": "paragraph",
            "text": "Sound is not just ON or OFF."
          },
          {
            "type": "paragraph",
            "text": "It becomes meaningful when:"
          },
          {
            "type": "bullet",
            "text": "Timing is controlled"
          },
          {
            "type": "bullet",
            "text": "Patterns are created"
          },
          {
            "type": "bullet",
            "text": "Repetition is structured"
          },
          {
            "type": "paragraph",
            "text": "For example:"
          },
          {
            "type": "bullet",
            "text": "Continuous ON → constant tone"
          },
          {
            "type": "bullet",
            "text": "Fast ON/OFF → beep sound"
          },
          {
            "type": "bullet",
            "text": "Slow ON/OFF → alert pulses"
          },
          {
            "type": "paragraph",
            "text": "The system is no longer just switching signals—it is creating communication patterns."
          }
        ]
      },
      {
        "number": "4.2.5",
        "title": "3.5 Connecting sound with sensors",
        "icon": "🔬",
        "accent": "#8B5CF6",
        "blocks": [
          {
            "type": "paragraph",
            "text": "Now you can combine input and output systems:"
          },
          {
            "type": "bullet",
            "text": "If object is close → buzzer ON"
          },
          {
            "type": "bullet",
            "text": "If object is far → buzzer OFF"
          },
          {
            "type": "paragraph",
            "text": "Or:"
          },
          {
            "type": "bullet",
            "text": "If motion is detected → beep sound"
          },
          {
            "type": "bullet",
            "text": "If no motion → silence"
          },
          {
            "type": "paragraph",
            "text": "This allows the system to respond directly to the environment using sound."
          }
        ]
      },
      {
        "number": "4.2.6",
        "title": "3.6 From observation to feedback",
        "icon": "⚙️",
        "accent": "#0EA5E9",
        "blocks": [
          {
            "type": "paragraph",
            "text": "Earlier:"
          },
          {
            "type": "bullet",
            "text": "System observed environment"
          },
          {
            "type": "paragraph",
            "text": "Now:"
          },
          {
            "type": "bullet",
            "text": "System responds to environment"
          },
          {
            "type": "paragraph",
            "text": "This creates a feedback loop:"
          },
          {
            "type": "bullet",
            "text": "Sensor detects change"
          },
          {
            "type": "bullet",
            "text": "System processes it"
          },
          {
            "type": "bullet",
            "text": "Output reacts physically"
          },
          {
            "type": "paragraph",
            "text": "This is the foundation of interactive embedded systems."
          }
        ]
      },
      {
        "number": "4.2.7",
        "title": "3.7 Why timing matters in sound output",
        "icon": "❓",
        "accent": "#F97316",
        "blocks": [
          {
            "type": "paragraph",
            "text": "Unlike LEDs, sound depends heavily on timing."
          },
          {
            "type": "paragraph",
            "text": "Small changes in timing can:"
          },
          {
            "type": "bullet",
            "text": "Change perception of urgency"
          },
          {
            "type": "bullet",
            "text": "Create different alert levels"
          },
          {
            "type": "bullet",
            "text": "Alter user interpretation"
          },
          {
            "type": "paragraph",
            "text": "This makes timing a critical part of system behavior."
          }
        ]
      },
      {
        "number": "4.2.8",
        "title": "3.8 Key Insight of This Lesson",
        "icon": "🔑",
        "accent": "#14B8A6",
        "blocks": [
          {
            "type": "bullet",
            "text": "Buzzers convert electrical signals into sound"
          },
          {
            "type": "bullet",
            "text": "Sound is controlled using ON/OFF timing"
          },
          {
            "type": "bullet",
            "text": "Patterns create meaningful audio feedback"
          },
          {
            "type": "bullet",
            "text": "Systems can now communicate, not just compute"
          },
          {
            "type": "bullet",
            "text": "Sensor input can directly trigger sound output"
          },
          {
            "type": "bullet",
            "text": "This completes basic sense → react behavior"
          }
        ]
      }
    ]
  },
  "5-5-5-intro": {
    "levelTitle": "LEVEL 6.5: Multi-Sensor Decision System (Smart Behavior Logic)",
    "lessonTitle": " Multi-Sensor Decision System (Smart Behavior Logic)",
    "stepType": "1. Introduction",
    "sections": [
      {
        "number": "5.1.1",
        "title": "Overview",
        "icon": "📝",
        "accent": "#6366F1",
        "blocks": [
          {
            "type": "paragraph",
            "text": "In the previous lessons, you learned how to:"
          },
          {
            "type": "bullet",
            "text": "Detect motion using a PIR sensor"
          },
          {
            "type": "bullet",
            "text": "Measure distance using an ultrasonic sensor"
          },
          {
            "type": "bullet",
            "text": "Read environmental conditions using a DHT sensor"
          },
          {
            "type": "bullet",
            "text": "Produce sound using a buzzer"
          },
          {
            "type": "paragraph",
            "text": "Each of these systems worked independently."
          },
          {
            "type": "paragraph",
            "text": "In this lesson, you will combine them."
          },
          {
            "type": "paragraph",
            "text": "Instead of reacting to one sensor at a time, the ESP32 will now:"
          },
          {
            "type": "bullet",
            "text": "use multiple inputs together to make decisions"
          },
          {
            "type": "paragraph",
            "text": "This is the beginning of intelligent system behavior."
          },
          {
            "type": "image",
            "text": "/lecs/levels/Level 5/Level 5.5/Introduction/images/1_0.png"
          }
        ]
      }
    ]
  },
  "5-5-5-concept": {
    "levelTitle": "3. Concept Building",
    "lessonTitle": "3. Concept Building",
    "stepType": "3.1 Why combine sensors?",
    "sections": [
      {
        "number": "5.2.1",
        "title": "Overview",
        "icon": "📝",
        "accent": "#6366F1",
        "blocks": [
          {
            "type": "paragraph",
            "text": "In real-world systems, one sensor is not enough."
          },
          {
            "type": "paragraph",
            "text": "For example:"
          },
          {
            "type": "bullet",
            "text": "Motion alone does not guarantee danger"
          },
          {
            "type": "bullet",
            "text": "Distance alone does not indicate intent"
          },
          {
            "type": "bullet",
            "text": "Temperature alone does not define a situation"
          },
          {
            "type": "image",
            "text": "/lecs/levels/Level 5/Level 5.5/Concept Building/images/3.1_0.png"
          },
          {
            "type": "paragraph",
            "text": "Systems become intelligent when they combine multiple inputs to make better decisions."
          }
        ]
      },
      {
        "number": "5.2.2",
        "title": "3.2 What does “multi-sensor logic” mean?",
        "icon": "🔬",
        "accent": "#F59E0B",
        "blocks": [
          {
            "type": "paragraph",
            "text": "Multi-sensor logic means:"
          },
          {
            "type": "bullet",
            "text": "👉 using more than one input to decide an output"
          },
          {
            "type": "paragraph",
            "text": "Instead of:"
          },
          {
            "type": "bullet",
            "text": "One condition → one action"
          },
          {
            "type": "paragraph",
            "text": "You now have:"
          },
          {
            "type": "bullet",
            "text": "Multiple conditions → one decision"
          },
          {
            "type": "paragraph",
            "text": "This allows systems to behave more accurately and intelligently."
          },
          {
            "type": "image",
            "text": "/lecs/levels/Level 5/Level 5.5/Concept Building/images/3.2_0.png"
          }
        ]
      },
      {
        "number": "5.2.3",
        "title": "3.3 How the ESP32 processes multiple inputs",
        "icon": "🔀",
        "accent": "#10B981",
        "blocks": [
          {
            "type": "paragraph",
            "text": "The ESP32 follows a simple process:"
          },
          {
            "type": "bullet",
            "text": "Read all sensors"
          },
          {
            "type": "bullet",
            "text": "Evaluate conditions"
          },
          {
            "type": "bullet",
            "text": "Decide outcome"
          },
          {
            "type": "bullet",
            "text": "Execute output"
          },
          {
            "type": "paragraph",
            "text": "This cycle repeats continuously."
          },
          {
            "type": "image",
            "text": "/lecs/levels/Level 5/Level 5.5/Concept Building/images/3.3_0.png"
          },
          {
            "type": "paragraph",
            "text": "Because of this:"
          },
          {
            "type": "bullet",
            "text": "The system always reacts to the latest environment state"
          }
        ]
      },
      {
        "number": "5.2.4",
        "title": "3.4 Understanding combined conditions",
        "icon": "📝",
        "accent": "#EF4444",
        "blocks": [
          {
            "type": "paragraph",
            "text": "When multiple conditions are used together:"
          },
          {
            "type": "bullet",
            "text": "AND conditions → all must be true"
          },
          {
            "type": "bullet",
            "text": "OR conditions → any one can be true"
          },
          {
            "type": "paragraph",
            "text": "This allows flexible behavior design."
          },
          {
            "type": "paragraph",
            "text": "For example:"
          },
          {
            "type": "bullet",
            "text": "Motion AND close distance → trigger alarm"
          },
          {
            "type": "bullet",
            "text": "Motion OR temperature change → trigger notification"
          },
          {
            "type": "image",
            "text": "/lecs/levels/Level 5/Level 5.5/Concept Building/images/3.4_0.png"
          },
          {
            "type": "paragraph",
            "text": "This gives control over how strict or flexible the system is."
          }
        ]
      },
      {
        "number": "5.2.5",
        "title": "3.5 What makes this “smart behavior”?",
        "icon": "💡",
        "accent": "#8B5CF6",
        "blocks": [
          {
            "type": "paragraph",
            "text": "A system becomes “smart” when:"
          },
          {
            "type": "bullet",
            "text": "It evaluates multiple inputs"
          },
          {
            "type": "bullet",
            "text": "It chooses different actions based on context"
          },
          {
            "type": "bullet",
            "text": "It adapts behavior dynamically"
          },
          {
            "type": "paragraph",
            "text": "This is exactly what happens here."
          },
          {
            "type": "paragraph",
            "text": "The system is no longer reactive—it is decision-driven."
          }
        ]
      },
      {
        "number": "5.2.6",
        "title": "3.6 Real-world applications",
        "icon": "📝",
        "accent": "#0EA5E9",
        "blocks": [
          {
            "type": "paragraph",
            "text": "Multi-sensor systems are used in:"
          },
          {
            "type": "bullet",
            "text": "Smart security systems"
          },
          {
            "type": "bullet",
            "text": "Home automation systems"
          },
          {
            "type": "bullet",
            "text": "Industrial monitoring systems"
          },
          {
            "type": "bullet",
            "text": "Smart energy systems"
          },
          {
            "type": "paragraph",
            "text": "In all these systems:"
          },
          {
            "type": "bullet",
            "text": "One sensor is never enough"
          },
          {
            "type": "bullet",
            "text": "Decisions depend on multiple signals"
          }
        ]
      },
      {
        "number": "5.2.7",
        "title": "3.7 Key Insight of This Lesson",
        "icon": "🔑",
        "accent": "#F97316",
        "blocks": [
          {
            "type": "bullet",
            "text": "Real systems use multiple sensors together"
          },
          {
            "type": "bullet",
            "text": "Decisions are based on combined conditions"
          },
          {
            "type": "bullet",
            "text": "Logic determines system behavior"
          },
          {
            "type": "bullet",
            "text": "Outputs depend on environmental context"
          },
          {
            "type": "bullet",
            "text": "ESP32 continuously evaluates all inputs"
          },
          {
            "type": "bullet",
            "text": "This creates intelligent, adaptive behavior"
          }
        ]
      }
    ]
  }
};
