import React, { memo, useEffect } from 'react';
import { View } from 'react-native';
import { Switch, useTheme } from 'react-native-paper';
import { Managers, UI } from 'framework';

/******************************************************************************************************************
 * AppBar: default left content
 ******************************************************************************************************************/
export const DefaultLeftContent = memo(() => {
  return (<View style={{ flexDirection: 'row', alignItems: 'center' }}>
    <UI.Text>Left content</UI.Text>
  </View>)
});

/******************************************************************************************************************
 * AppBar: default right content
 ******************************************************************************************************************/
export const DefaultRightContent = memo(() => {
  const theme = useTheme();
  const { getItem, setItem } = Managers.useLocalData();
  const isDarkMode = !!getItem<boolean>('isDarkMode');

  return (<UI.HorizontalLayout>
    <UI.ProfileMenu />
    <Switch
      value={isDarkMode}
      onValueChange={(val) => setItem('isDarkMode', val)}
      color={theme.colors.primary}
    />
  </UI.HorizontalLayout>)
});