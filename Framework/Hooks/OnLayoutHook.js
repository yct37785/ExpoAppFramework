/*****************************************************************************************
 * callback for layout events
*****************************************************************************************/
import React, { memo, useContext, useState, useCallback, useEffect } from 'react';

/**
 * On layout change hook.
 */
export const useOnLayout = () => {
  const [size, setSize] = useState(null);

  const onLayout = useCallback(event => {
    const { width, height } = event.nativeEvent.layout;
    setSize({ width, height });
  }, []);

  return [size, onLayout];
};