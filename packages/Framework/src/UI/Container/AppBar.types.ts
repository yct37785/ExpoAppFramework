import React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';

/******************************************************************************************************************
 * AppBar props.
 *
 * @property title?           - String title or a custom node via `TitleComponent`
 * @property TitleComponent?  - Optional custom title renderer (overrides `title`)
 * @property onBack?          - If provided, renders a back button and calls this on press
 * @property left?            - Optional left-side content (renders after back button)
 * @property right?           - Optional right-side content (e.g., actions, profile)
 * @property elevated?        - Draw a subtle elevation (shadow) instead of a border
 * @property style?           - Extra style(s) for the container
 ******************************************************************************************************************/
export type AppBarProps = {
  title?: string;
  TitleComponent?: React.ComponentType | null;
  onBack?: () => void;
  left?: React.ReactNode;
  right?: React.ReactNode;
  elevated?: boolean;
  style?: StyleProp<ViewStyle>;
};

/******************************************************************************************************************
 * AppBar: A simple theme-aware header bar with optional back button and action slots.
 * 
 * @usage
 * ```tsx
 * <AppBar title='Settings' onBack={() => navigation.goBack()} right={<Avatar label='A' />} />
 * ```
 ******************************************************************************************************************/
export type AppBarType = React.FC<AppBarProps>;