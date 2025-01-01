import React, { memo, useContext, useState, useCallback, useEffect } from 'react';
import { Divider, DividerProps } from 'react-native-paper';

/**
 * Divider component.
 */
export const DividerComp: React.FC<DividerProps> = memo((props) => <Divider {...props} />);