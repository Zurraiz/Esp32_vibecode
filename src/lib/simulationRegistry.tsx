import React from 'react';
import MissingDelaySimulator from '@/components/MissingDelaySimulator';
import LedDelaySimulator from '@/components/LedDelaySimulator';
import IfDecisionSimulator from '@/components/IfDecisionSimulator';
import CycleTimelineSimulator from '@/components/CycleTimelineSimulator';
import InfiniteLoopSimulator from '@/components/InfiniteLoopSimulator';

export const SIMULATION_REGISTRY: Record<string, React.ComponentType> = {
  'missing-delay': MissingDelaySimulator,
  'led-delay': LedDelaySimulator,
  'if-decision': IfDecisionSimulator,
  'cycle-timeline': CycleTimelineSimulator,
  'infinite-loop': InfiniteLoopSimulator,
};
