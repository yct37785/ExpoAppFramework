import React, { memo, useState } from 'react';
import { View, StyleProp, ViewStyle } from 'react-native';
import { useTheme, Chip } from 'react-native-paper';
import * as Const from '../../../Const';

/******************************************************************************************************************
 * ChipOptions props.
 * 
 * @property schema       - Available chip labels
 * @property onSelected   - Callback receiving updated selection
 * @property style?       - Optional wrapper style
 ******************************************************************************************************************/
export type ChipOptionsProps = {
  schema: Set<string>;
  onSelected: (selectedValues: Set<string>) => void;
  style?: StyleProp<ViewStyle>;
};

/******************************************************************************************************************
 * Render a selectable chip group with multi-select support using react-native-paper chips.
 *
 * Features:
 * - Supports multi-selection of chips
 * - Provides selected/unselected visual states
 * - Callback returns updated selected values as a Set<string>
 * - Responsive row wrapping for variable chip counts
 * 
 * @usage
 * ```tsx
 * <ChipOptions
 *   schema={new Set(['Apples', 'Bananas', 'Cherries'])}
 *   onSelected={(values) => console.log('Selected chips:', values)}
 * />
 * ```
 ******************************************************************************************************************/
export type ChipOptions = React.FC<ChipOptionsProps>;
