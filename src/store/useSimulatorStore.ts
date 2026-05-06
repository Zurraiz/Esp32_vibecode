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
    // In a real SSD1306, text wraps or advances the cursor. 
    // For MVP, we just append to the current cursor position and advance X.
    // Approximate: size 1 character is ~6 pixels wide.
    const newEntry = { x: state.oledCursorX, y: state.oledCursorY, text };
    const newX = state.oledCursorX + (text.length * 6);
    return {
      oledBuffer: [...state.oledBuffer, newEntry],
      oledCursorX: newX
    };
  }),
  
  updateOledScreen: () => set((state) => ({ oledScreen: [...state.oledBuffer] })),
}));
