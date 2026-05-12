import { create } from 'zustand';

/**
 * Global State for the ESP32 Simulator.
 * Decouples the executing logic from the React UI so that asynchronous 
 * block loops do not trigger destructive React re-renders.
 */
export interface OledText {
  x: number;
  y: number;
  text: string;
}

export interface SimulationState {
  pins: Record<number, { value: number; mode: string }>; // Maps physical ESP32 pins to structured values and modes
  serial: string[];             // Backlog of messages printed to the Serial Monitor
  isRunning: boolean;           // Kill switch for the simulatorEngine's infinite execution loop

  // OLED State
  oledBuffer: OledText[];
  oledScreen: OledText[];
  oledCursorX: number;
  oledCursorY: number;
}

interface SimulatorStore extends SimulationState {
  setPin: (pin: number, value: number, mode?: string) => void;
  appendSerial: (text: string, newline?: boolean) => void;
  setRunning: (isRunning: boolean) => void;
  resetSimulation: () => void;

  // OLED Actions
  clearOledBuffer: () => void;
  setOledCursor: (x: number, y: number) => void;
  printToOledBuffer: (text: string) => void;
  updateOledScreen: () => void;
}

const initialState: SimulationState = {
  pins: {},
  serial: [],
  isRunning: false,
  oledBuffer: [],
  oledScreen: [],
  oledCursorX: 0,
  oledCursorY: 0,
};

export const useSimulatorStore = create<SimulatorStore>((set) => ({
  ...initialState,

  setPin: (pin, value, mode = 'digital') =>
    set((state) => ({
      pins: {
        ...state.pins,
        [pin]: { value, mode: mode || state.pins[pin]?.mode || 'digital' }
      }
    })),

  appendSerial: (text, newline = false) =>
    set((state) => {
      const newSerial = [...state.serial];

      if (newSerial.length === 0) {
        if (newline) {
          return { serial: [text, ''] };
        }
        return { serial: [text] };
      }

      // Append text to the very last line
      const lastIndex = newSerial.length - 1;
      newSerial[lastIndex] = newSerial[lastIndex] + text;

      // If newline is requested, add an empty string as the next line placeholder
      if (newline) {
        newSerial.push('');
      }

      return { serial: newSerial };
    }),

  setRunning: (isRunning) => set({ isRunning }),

  resetSimulation: () => set(initialState),

  clearOledBuffer: () => set({ oledBuffer: [], oledCursorX: 0, oledCursorY: 0 }),

  setOledCursor: (x, y) => set({ oledCursorX: x, oledCursorY: y }),

  printToOledBuffer: (text) => set((state) => {
    // SSD1306 128x64 simulation with word wrapping
    const CHAR_WIDTH = 6;
    const LINE_HEIGHT = 10;
    const MAX_WIDTH = 128;
    const MAX_HEIGHT = 64;

    let cursorX = state.oledCursorX;
    let cursorY = state.oledCursorY;
    const newEntries: OledText[] = [];

    // Split text into characters to handle wrapping precisely
    const chars = String(text).split('');
    let currentChunk = '';
    let chunkStartX = cursorX;

    for (const char of chars) {
      // If adding this char exceeds width, push current chunk and wrap
      if (cursorX + CHAR_WIDTH > MAX_WIDTH) {
        if (currentChunk) {
          newEntries.push({ x: chunkStartX, y: cursorY, text: currentChunk });
        }
        cursorX = 0;
        cursorY += LINE_HEIGHT;
        currentChunk = char;
        chunkStartX = cursorX;
        cursorX += CHAR_WIDTH;
      } else {
        currentChunk += char;
        cursorX += CHAR_WIDTH;
      }

      // Stop if we exceed screen height (typical behavior is to stop or scroll, we'll stop for now)
      if (cursorY + LINE_HEIGHT > MAX_HEIGHT) break;
    }

    if (currentChunk && cursorY + LINE_HEIGHT <= MAX_HEIGHT) {
      newEntries.push({ x: chunkStartX, y: cursorY, text: currentChunk });
    }

    return {
      oledBuffer: [...state.oledBuffer, ...newEntries],
      oledCursorX: cursorX,
      oledCursorY: cursorY
    };
  }),

  updateOledScreen: () => set((state) => ({ oledScreen: [...state.oledBuffer] })),
}));
