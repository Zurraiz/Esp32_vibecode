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
import ButtonSignalExplorer from '@/components/ButtonSignalExplorer';
import ButtonMonitorSimulator from '@/components/ButtonMonitorSimulator';
import SignalAnalyzerSimulator from '@/components/SignalAnalyzerSimulator';
import DecisionFlowExplorer from '@/components/DecisionFlowExplorer';
import DualSensorSimulator from '@/components/DualSensorSimulator';
import SensorBrightnessSimulator from '@/components/SensorBrightnessSimulator';
import PWMWaveSimulator from '@/components/PWMWaveSimulator';
import AnalogOscilloscope from '@/components/AnalogOscilloscope';
import MappingSimulator from '@/components/MappingSimulator';
import MappedSensorSimulator from '@/components/MappedSensorSimulator';
import RealTimeControlSimulator from '@/components/RealTimeControlSimulator';
import DualModeSimulator from '@/components/DualModeSimulator';
import ForLoopConceptExplorer from '@/components/ForLoopConceptExplorer';
import ForLoopLEDChaser from '@/components/ForLoopLEDChaser';
import WhileVsForExplorer from '@/components/WhileVsForExplorer';
import CountdownSimulator from '@/components/CountdownSimulator';
import LoopConditionExplorer from '@/components/LoopConditionExplorer';
import SignalTreeVaultSystem from '@/components/SignalTreeVaultSystem';
import PatternSequenceExplorer from '@/components/PatternSequenceExplorer';
import PatternChaserSimulator from '@/components/PatternChaserSimulator';
import DHTEnvironmentExplorer from '@/components/DHTEnvironmentExplorer';
import DHTMonitorSimulator from '@/components/DHTMonitorSimulator';
import PIRExplorer from '@/components/PIRExplorer';
import PIRMonitorSimulator from '@/components/PIRMonitorSimulator';
import PIRAutonomousSimulator from '@/components/PIRAutonomousSimulator';
import UltrasonicExplorer from '@/components/UltrasonicExplorer';
import UltrasonicMonitorSimulator from '@/components/UltrasonicMonitorSimulator';
import UltrasonicAutonomousSimulator from '@/components/UltrasonicAutonomousSimulator';
import BuzzerExplorer from '@/components/BuzzerExplorer';
import BuzzerMonitorSimulator from '@/components/BuzzerMonitorSimulator';
import BuzzerAutonomousSimulator from '@/components/BuzzerAutonomousSimulator';
import SmartSystemExplorer from '@/components/SmartSystemExplorer';
import SmartSystemMonitorSimulator from '@/components/SmartSystemMonitorSimulator';
import SmartSystemAutonomousSimulator from '@/components/SmartSystemAutonomousSimulator';
import BlinkIntroLesson from '@/components/BlinkIntroLesson';

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
  'button-signal': ButtonSignalExplorer,
  'button-monitor': ButtonMonitorSimulator,
  'signal-analyzer': SignalAnalyzerSimulator,
  'decision-flow': DecisionFlowExplorer,
  'dual-sensor': DualSensorSimulator,
  'sensor-brightness': SensorBrightnessSimulator,
  'pwm-wave': PWMWaveSimulator,
  'analog-oscilloscope': AnalogOscilloscope,
  'mapping': MappingSimulator,
  'mapped-sensor': MappedSensorSimulator,
  'realtime-control': RealTimeControlSimulator,
  'dual-mode': DualModeSimulator,
  'for-loop-concept': ForLoopConceptExplorer,
  'for-loop-chaser': ForLoopLEDChaser,
  'while-vs-for': WhileVsForExplorer,
  'countdown': CountdownSimulator,
  'loop-condition': LoopConditionExplorer,
  'signal-tree': SignalTreeVaultSystem,
  'pattern-sequence': PatternSequenceExplorer,
  'pattern-chaser': PatternChaserSimulator,
  'dht-environment': DHTEnvironmentExplorer,
  'dht-monitor': DHTMonitorSimulator,
  'pir-explorer': PIRExplorer,
  'pir-monitor': PIRMonitorSimulator,
  'pir-autonomous': PIRAutonomousSimulator,
  'ultrasonic-explorer': UltrasonicExplorer,
  'ultrasonic-monitor': UltrasonicMonitorSimulator,
  'ultrasonic-autonomous': UltrasonicAutonomousSimulator,
  'buzzer-explorer': BuzzerExplorer,
  'buzzer-monitor': BuzzerMonitorSimulator,
  'buzzer-autonomous': BuzzerAutonomousSimulator,
  'smart-explorer': SmartSystemExplorer,
  'smart-monitor': SmartSystemMonitorSimulator,
  'smart-autonomous': SmartSystemAutonomousSimulator,
  'blink-intro': BlinkIntroLesson,
};
