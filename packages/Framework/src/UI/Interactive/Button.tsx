import React, { memo } from 'react';
import { Button as PaperButton } from 'react-native-paper';
import { ButtonType } from './Button.types';

/******************************************************************************************************************
 * Button implementation.
 ******************************************************************************************************************/
export const Button: ButtonType = memo(({ mode = 'contained', children, ...rest }) => {
  return (
    <PaperButton mode={mode} {...rest}>
      {children}
    </PaperButton>
  );
});

Button.displayName = 'Button';
