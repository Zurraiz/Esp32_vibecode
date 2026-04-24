import { create } from 'zustand';

export interface SimulationState {
  pins: Record<number, number>;
  serial: string[];
  isRunning: boolean;
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
