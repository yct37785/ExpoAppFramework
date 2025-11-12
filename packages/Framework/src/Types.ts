/**
 * A numeric scale where:
 *   0 = none
 *   1 = base padding/margin
 *   2 = 2x base
 *   3 = 3x base
 *   ...
 */
export type PadSpacingValue = 0 | 1 | 2 | 3 | 4;

/**
 * General font colors (Text, Icon etc.)
 */
export type FontColor =
  | 'default'
  | 'label'
  | 'disabled'
  | 'primary'
  | 'secondary'
  | 'error'
  | 'surface'
  | 'background'
  | 'outline';
