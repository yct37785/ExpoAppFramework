import React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';

/******************************************************************************************************************
 * AppBar props.
 *
 * @property title?           - String title or a custom node via `TitleComponent`
 * @property onBack?          - If provided, renders a back button and calls this on press
 * @property left?            - Optional left-side content (renders after back button, flex 1)
 * @property right?           - Optional right-side content (e.g., actions, profile, flex 0)
 * @property style?           - Extra style(s) for the container
 ******************************************************************************************************************/
export type AppBarProps = {
  title?: string;
  onBack?: () => void;
  left?: React.ReactNode;
  right?: React.ReactNode;
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