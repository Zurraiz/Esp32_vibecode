import { create } from 'zustand';

/**
 * Global State for the ESP32 Simulator.
 * Decouples the executing logic from the React UI so that asynchronous 
 * block loops do not trigger destructive React re-renders.
 */
export interface SimulationState {
  pins: Record<number, { value: number; mode: string }>; // Maps physical ESP32 pins to structured values and modes
  serial: string[];             // Backlog of messages printed to the Serial Monitor
  isRunning: boolean;           // Kill switch for the simulatorEngine's infinite execution loop
}

interface SimulatorStore extends SimulationState {
  setPin: (pin: number, value: number, mode?: string) => void;
  appendSerial: (text: string) => void;
  setRunning: (isRunning: boolean) => void;
  resetSimulation: () => void;
}

const initialState: SimulationState = {
  pins: {},
  serial: [],
  isRunning: false,
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
    
  appendSerial: (text) => 
    set((state) => ({
      serial: [...state.serial, text]
    })),
    
  setRunning: (isRunning) => set({ isRunning }),
  
  resetSimulation: () => set(initialState),
}));
