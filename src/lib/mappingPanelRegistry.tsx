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
};
