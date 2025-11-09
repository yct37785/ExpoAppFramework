/******************************************************************************************************************
 * Box component: A drawable container, it holds content and applies styling, but does not decide spatial 
 * arrangement of siblings. Think of it as an element in a layout.
 ******************************************************************************************************************/
import React from 'react';
import { type StyleProp, type ViewStyle, type FlexStyle } from 'react-native';

/**
 * A numeric scale where:
 *   1 = base padding/margin
 *   2 = 2x base
 *   3 = 3x base
 *   ...
 */
export type BoxSpacingValue = 1 | 2 | 3 | 4;

/******************************************************************************************************************
 * @property bgColor?  - Background color of the container
 * @property flex?     - Flex value to control layout behavior
 * @property dir?      - Flex direction
 * @property align?    - Align items
 * @property justify?  - Justify content
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
  bgColor?: string;
  flex?: number;
  dir?: FlexStyle['flexDirection'];
  align?: ViewStyle['alignItems'];
  justify?: ViewStyle['justifyContent'];

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
 * @usage
 * ```tsx
 * <Box p={2} ph={3} bgColor="#eee">
 *   <Text>Content with padding</Text>
 * </Box>
 * ```
 ******************************************************************************************************************/
export type BoxType = React.FC<BoxProps>;
