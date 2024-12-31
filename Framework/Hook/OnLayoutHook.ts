import React, { memo, useContext, useState, useCallback, useEffect } from 'react';
import { ILayoutSize } from '../Index/PropType';

/**
 * On layout change hook for React UI elements.
 */
export const useOnLayout = (): [ILayoutSize | null, (event: any) => void] => {
  const [size, setSize] = useState<ILayoutSize | null>(null);

  const onLayout = useCallback((event: { nativeEvent: { layout: ILayoutSize } }) => {
    const { width, height } = event.nativeEvent.layout;
    setSize({ width, height });
  }, []);

  return [size, onLayout];
};