import React, { memo } from 'react';
import { Divider, DividerProps } from 'react-native-paper';

/**
 * Divider component.
 */
export const DividerComp: React.FC<DividerProps> = memo((props) => <Divider {...props} />);