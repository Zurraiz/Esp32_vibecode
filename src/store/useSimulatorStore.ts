import { create } from 'zustand';

/**
 * Global State for the ESP32 Simulator.
 * Decouples the executing logic from the React UI so that asynchronous 
 * block loops do not trigger destructive React re-renders.
 */
export interface SimulationState {
  pins: Record<number, number>; // Maps physical ESP32 pins to numerical values (0/1, 0-255 PWM, angles, frequency)
  serial: string[];             // Backlog of messages printed to the Serial Monitor
  isRunning: boolean;           // Kill switch for the simulatorEngine's infinite execution loop
}

interface SimulatorStore extends SimulationState {
  setPin: (pin: number, value: number) => void;
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
  
  setPin: (pin, value) => 
    set((state) => ({
      pins: { ...state.pins, [pin]: value }
    })),
    
  appendSerial: (text) => 
    set((state) => ({
      serial: [...state.serial, text]
    })),
    
  setRunning: (isRunning) => set({ isRunning }),
  
  resetSimulation: () => set(initialState),
}));
