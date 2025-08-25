import React, { useContext, useState, useEffect, useCallback, useRef, memo } from 'react';
import { View } from 'react-native';
import { Text, Button, Switch } from 'react-native-paper';
import { Core, UI, Managers } from 'framework';

/******************************************************************************************************************
 * Home screen
 ******************************************************************************************************************/
const HomeScreen: React.FC<Core.ScreenProps> = ({ navigation, route }) => {
  const { getItem, setItem } = Managers.useLocalData();
  const isDarkMode = getItem('isDarkMode');

  function CustomHeader() {
    return <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
      <Switch
        value={!!isDarkMode}
        onValueChange={(val) => setItem('isDarkMode', val)}
      />
    </View>
  }

  function renderScreenBtn(screen: string, btnText: string) {
    return <Button mode='contained' onPress={() => navigation.navigate(screen, { paramText: `hello from home` })}>
      {btnText}
    </Button>
  }

  return (
    <Core.Activity navigation={navigation} CustomHeader={CustomHeader} title='Home Sample' isRootActivity={true}>
      <UI.VerticalLayout>
        <Text variant='bodyMedium'>Select the screen you want to navigate to</Text>
        {renderScreenBtn('layout', 'layouts example')}
        {renderScreenBtn('menu', 'menus example')}
        {renderScreenBtn('list', 'list example')}
        {renderScreenBtn('container', 'containers example')}
      </UI.VerticalLayout>
    </Core.Activity>
  );
};

export default memo(HomeScreen);