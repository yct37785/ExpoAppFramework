import React, { useContext, useState, useEffect, useCallback, useRef, memo } from 'react';
import { View } from 'react-native';
import { Text, Button, Switch } from 'react-native-paper';
import { Activity } from 'framework/core/activity.tsx';
import { ScreenProps } from 'framework/core/screen.ts';

/******************************************************************************************************************
 * Home screen
 ******************************************************************************************************************/
const SampleHomeScreen: React.FC<ScreenProps> = ({ navigation, route }) => {

  function CustomHeader() {
    return <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
      <Switch value={true} onValueChange={() => { }} />
    </View>
  }

  function renderScreenBtn(screen: string, btnText: string) {
    return <Button mode='contained' onPress={() => navigation.navigate(screen, { paramText: `hello from home` })}>
      {btnText}
    </Button>
  }

  return (
    <Activity navigation={navigation} CustomHeader={CustomHeader} title='Home Sample' isRootActivity={true}>
      <Text variant='bodyMedium'>Select the screen you want to navigate to</Text>
      {renderScreenBtn('hello', 'testing')}
    </Activity>
  );
};

export default memo(SampleHomeScreen);