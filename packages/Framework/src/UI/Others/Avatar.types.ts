import React from 'react';
import {
  type ImageStyle,
  type StyleProp,
  type ViewStyle,
} from 'react-native';

/******************************************************************************************************************
 * Avatar props.
 *
 * @property uri?          - Remote/local image URI
 * @property label?        - Fallback text (e.g., initials) when no image is available
 * @property size          - Pixel size OR preset token ('sm' | 'md' | 'lg'), default: 'md'
 * @property shape         - 'circle' | 'rounded', default: 'circle'
 * @property style?        - Extra style(s) for the outer container
 * @property imageStyle?   - Extra style(s) for the Image element
 * @property badgeColor?   - Optional small status dot color
 ******************************************************************************************************************/
export type AvatarProps = {
  uri?: string;
  label?: string;
  size?: number | 'sm' | 'md' | 'lg';
  shape?: 'circle' | 'rounded';
  badgeColor?: string;
  style?: StyleProp<ViewStyle>;
  imageStyle?: StyleProp<ImageStyle>;
};

/******************************************************************************************************************
 * Avatar: Theme-aware avatar with image or text fallback; optional status badge.
 * 
 * @usage
 * ```tsx
 * <Avatar uri={user.photoURL} />
 * <Avatar label="JS" size="lg" />
 * <Avatar label="A" badgeColor="#2E7D32" />
 * ```
 ******************************************************************************************************************/
export type AvatarType = React.FC<AvatarProps>;
