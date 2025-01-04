import React, { memo } from 'react';
import { View, StyleProp, ViewStyle } from 'react-native';
import { Appbar } from 'react-native-paper';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackPropsList } from '../Screen/ScreenPropTypes';

/**
 * BasicActivity props
 * 
 * @param navigation - React Navigation provided object for navigating between screens.
 * @param title - Title of the screen to be displayed on app header.
 * @param customHeaderContent - Custom content to display in the header.
 * @param style - Additional style on base container.
 * @param isRootActivity - Is this the root activity of the app?
 * @param children - The body content of the screen.
 */
export interface IBasicActivityProps {
  navigation: NativeStackNavigationProp<RootStackPropsList>;
  title?: string;
  CustomHeaderComp?: () => JSX.Element;
  style?: StyleProp<ViewStyle>;
  isRootActivity?: boolean;
  children: React.ReactNode;
}

/**
 * A wrapper component to setup an activity quickly by providing the body and custom header content if any.
 */
const BasicActivity: React.FC<IBasicActivityProps> = ({
  navigation,
  title = '',
  CustomHeaderComp,
  style = {},
  isRootActivity = false,
  children
}) => {
  return (
    <View style={[{ flex: 1 }, style]}>
      <Appbar.Header>
        {!isRootActivity ? <Appbar.BackAction onPress={() => navigation.goBack()} /> : null}
        {title ? <Appbar.Content style={{ flex: 0 }} title={title} /> : null}
        <View style={{ flex: 1 }}>
          {CustomHeaderComp && CustomHeaderComp()}
        </View>
      </Appbar.Header>
      <View style={{ flex: 1 }}>
        {children}
      </View>
    </View>
  );
}

export default memo(BasicActivity);