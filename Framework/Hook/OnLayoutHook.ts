import { useState, useCallback } from 'react';
import { ILayoutSizeProps } from '../Index/PropType';

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