import { useState, useCallback } from 'react';

/**
 * on layout change hook props
 * 
 * @param width - Receive width of React comp on layout change.
 * @param height - Receive height of React comp on layout change.
 */
interface ILayoutSizeProps {
  width: number;
  height: number;
};

/**
 * On layout change hook for React UI elements.
 */
export const useOnLayout = (): [ILayoutSizeProps | null, (event: any) => void] => {
  const [size, setSize] = useState<ILayoutSizeProps | null>(null);

  const onLayout = useCallback((event: { nativeEvent: { layout: ILayoutSizeProps } }) => {
    const { width, height } = event.nativeEvent.layout;
    setSize({ width, height });
  }, []);

  return [size, onLayout];
};