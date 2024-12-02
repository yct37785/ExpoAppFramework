import React, { memo, useContext, useState, useCallback, useEffect } from 'react';

/*****************************************************************************************
 * callback for layout events
*****************************************************************************************/
export const useOnLayout = () => {
  const [size, setSize] = useState(null);

  const onLayout = useCallback(event => {
    const { width, height } = event.nativeEvent.layout;
    setSize({ width, height });
  }, []);

  return [size, onLayout];
};