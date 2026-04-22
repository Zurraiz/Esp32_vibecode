import React from 'react';
import MissingDelaySimulator from '@/components/MissingDelaySimulator';
import LedDelaySimulator from '@/components/LedDelaySimulator';

export const SIMULATION_REGISTRY: Record<string, React.ComponentType> = {
  'missing-delay': MissingDelaySimulator,
  'led-delay': LedDelaySimulator,
};
