import React from 'react';
import MissingDelaySimulator from '@/components/MissingDelaySimulator';
import LedDelaySimulator from '@/components/LedDelaySimulator';
import IfDecisionSimulator from '@/components/IfDecisionSimulator';
import CycleTimelineSimulator from '@/components/CycleTimelineSimulator';
import InfiniteLoopSimulator from '@/components/InfiniteLoopSimulator';
import SetupVsLoopExplorer from '@/components/SetupVsLoopExplorer';
import ProgramFlowSimulator from '@/components/ProgramFlowSimulator';
import SerialExplorer from '@/components/SerialExplorer';
import SerialMonitorSimulator from '@/components/SerialMonitorSimulator';
import VariableBoxExplorer from '@/components/VariableBoxExplorer';
import CounterSimulator from '@/components/CounterSimulator';

export const SIMULATION_REGISTRY: Record<string, React.ComponentType> = {
  'missing-delay': MissingDelaySimulator,
  'led-delay': LedDelaySimulator,
  'if-decision': IfDecisionSimulator,
  'cycle-timeline': CycleTimelineSimulator,
  'infinite-loop': InfiniteLoopSimulator,
  'setup-vs-loop': SetupVsLoopExplorer,
  'program-flow': ProgramFlowSimulator,
  'serial-explorer': SerialExplorer,
  'serial-monitor': SerialMonitorSimulator,
  'variable-box': VariableBoxExplorer,
  'counter': CounterSimulator,
};
