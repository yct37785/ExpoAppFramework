import React, { memo } from 'react';
import { Screen, UI } from 'framework';

/******************************************************************************************************************
 * 
 ******************************************************************************************************************/
const EmptyScreen: Screen.ScreenType = ({ navigation, route }) => {
  const options: UI.MenuOption[] = [
    { label: 'Sign in with Google', value: 'signin', leadingIcon: 'google' },
    { label: 'Sign in with Google', value: 'signin', leadingIcon: 'google', disabled: true },
  ];

  const handleSelect = async (value: string) => {
  };

  return (
    <Screen.ScreenLayout>
      <UI.VerticalLayout constraint='scroll'>
        <UI.Text variant='labelLarge'>MenuList</UI.Text>
        <UI.MenuList options={options} onSelect={handleSelect} dense showDividers />
      </UI.VerticalLayout>
    </Screen.ScreenLayout>
  );
};

export default memo(EmptyScreen);
