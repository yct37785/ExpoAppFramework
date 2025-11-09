/******************************************************************************************************************
 * Box component: A drawable container, it holds content and applies styling, but does not decide spatial 
 * arrangement of siblings.
 *  - Think of it as an element in a layout.
 *  - Use to wrap singular child UI components.
 ******************************************************************************************************************/
import React from 'react';
import { type StyleProp, type ViewStyle, type FlexStyle } from 'react-native';
import { PadSpacingValue } from '../../../Types';

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

  p?: PadSpacingValue;
  m?: PadSpacingValue;

  ph?: PadSpacingValue;
  pv?: PadSpacingValue;
  mh?: PadSpacingValue;
  mv?: PadSpacingValue;

  pt?: PadSpacingValue;
  pr?: PadSpacingValue;
  pb?: PadSpacingValue;
  pl?: PadSpacingValue;

  mt?: PadSpacingValue;
  mr?: PadSpacingValue;
  mb?: PadSpacingValue;
  ml?: PadSpacingValue;
  
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
