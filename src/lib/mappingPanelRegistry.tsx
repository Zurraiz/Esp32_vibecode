import React from 'react';
import ButtonMappingPanel from '@/components/ButtonMappingPanel';
import IfMappingPanel from '@/components/IfMappingPanel';
import AnalogMappingPanel from '@/components/AnalogMappingPanel';
import PWMMappingPanel from '@/components/PWMMappingPanel';
import MappingMappingPanel from '@/components/MappingMappingPanel';
import DualModeMappingPanel from '@/components/DualModeMappingPanel';
import ForLoopMappingPanel from '@/components/ForLoopMappingPanel';
import WhileLoopMappingPanel from '@/components/WhileLoopMappingPanel';
import CombinedLogicMappingPanel from '@/components/CombinedLogicMappingPanel';
import PatternMappingPanel from '@/components/PatternMappingPanel';
import DHTMappingPanel from '@/components/DHTMappingPanel';
import PIRMappingPanel from '@/components/PIRMappingPanel';

export const MAPPING_PANEL_REGISTRY: Record<string, React.ComponentType> = {
  'button': ButtonMappingPanel,
  'if': IfMappingPanel,
  'analog': AnalogMappingPanel,
  'pwm': PWMMappingPanel,
  'mapping': MappingMappingPanel,
  'dual-mode': DualModeMappingPanel,
  'for-loop': ForLoopMappingPanel,
  'while-loop': WhileLoopMappingPanel,
  'combined-logic': CombinedLogicMappingPanel,
  'pattern': PatternMappingPanel,
  'dht': DHTMappingPanel,
  'pir': PIRMappingPanel,
};
