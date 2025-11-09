import React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';

/******************************************************************************************************************
 * A numeric scale where:
 *   1 = base padding/margin
 *   2 = 2x base
 *   3 = 3x base
 *   ...
 ******************************************************************************************************************/
export type BoxSpacingValue = 1 | 2 | 3 | 4;

/******************************************************************************************************************
 * Box props.
 *
 * @property backgroundColor?  - Background color of the container
 * @property flex?             - Flex value to control layout behavior
 *
 * @property p?   - Uniform padding
 * @property m?   - Uniform margin
 *
 * @property ph?  - Horizontal padding (left + right)
 * @property pv?  - Vertical padding (top + bottom)
 * @property mh?  - Horizontal margin  (left + right)
 * @property mv?  - Vertical margin    (top + bottom)
 *
 * @property pt?  - Padding top
 * @property pr?  - Padding right
 * @property pb?  - Padding bottom
 * @property pl?  - Padding left
 *
 * @property mt?  - Margin top
 * @property mr?  - Margin right
 * @property mb?  - Margin bottom
 * @property ml?  - Margin left
 * 
 * @property style?         - Optional container style
 * @property children       - Content
 ******************************************************************************************************************/
export type BoxProps = {
  backgroundColor?: string;
  flex?: number;

  p?: BoxSpacingValue;
  m?: BoxSpacingValue;

  ph?: BoxSpacingValue;
  pv?: BoxSpacingValue;
  mh?: BoxSpacingValue;
  mv?: BoxSpacingValue;

  pt?: BoxSpacingValue;
  pr?: BoxSpacingValue;
  pb?: BoxSpacingValue;
  pl?: BoxSpacingValue;

  mt?: BoxSpacingValue;
  mr?: BoxSpacingValue;
  mb?: BoxSpacingValue;
  ml?: BoxSpacingValue;
  
  style?: StyleProp<ViewStyle>;
  children?: React.ReactNode;
};

/******************************************************************************************************************
 * A lightweight UI container similar to View, with shorthand layout spacing utilities.
 * 
 * @param props - Refer to BoxProps
 * 
 * @usage
 * ```tsx
 * <Box p={2} ph={3} backgroundColor="#eee">
 *   <Text>Content with padding</Text>
 * </Box>
 * ```
 ******************************************************************************************************************/
export type BoxType = React.FC<BoxProps>;
