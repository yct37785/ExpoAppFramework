import { FontColor } from 'Types';
import { MD3Theme } from 'react-native-paper';

// mapping of general font colors to RN Paper theme keys
export const tokenToRNPaperThemeKey: Record<FontColor, string> = {
  default: 'onSurface',
  label: 'onSurfaceVariant',
  disabled: 'onSurfaceDisabled',
  primary: 'primary',
  secondary: 'secondary',
  error: 'error',
  surface: 'surface',
  background: 'background',
  outline: 'outline',
} as const;

export function resolveFontColor(color: FontColor | undefined, theme: MD3Theme): string {
  const themeKey = color ? tokenToRNPaperThemeKey[color] : undefined;
  return (theme.colors as any)[themeKey ?? 'onSurface'] ?? theme.colors.onSurface;
}