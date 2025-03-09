import { useState, useCallback } from 'react';

/**
 * @param width - Receive width of React comp on layout change.
 * @param height - Receive height of React comp on layout change.
 */
export type LayoutSizeProps = {
  width: number;
  height: number;
}

/**
 * on layout change
 */
export const useOnLayout = (): [LayoutSizeProps | null, (event: any) => void] => {
  const [size, setSize] = useState<LayoutSizeProps | null>(null);

  const onLayout = useCallback((event: { nativeEvent: { layout: LayoutSizeProps } }) => {
    const { width, height } = event.nativeEvent.layout;
    setSize({ width, height });
  }, []);

  return [size, onLayout];
}