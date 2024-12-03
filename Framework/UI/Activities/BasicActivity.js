/*****************************************************************************************
 * the main layout for a screen, manages app bar
*****************************************************************************************/
import React, { useContext, memo } from 'react';
import { View } from 'react-native';
import { useTheme, Appbar } from 'react-native-paper';
import { LocalDataContext } from '../../Hooks/LocalDataHook';

/**
 * A wrapper component to setup an activity quickly by providing the body and custom header content if any.
 * 
 * @param {Object} props - Component props.
 * @param {Object} props.navigation - Navigation object for navigating between screens.
 * @param {Object} props.route - Route object containing route parameters.
 * @param {boolean} props.scrollable - Content scrollable if exceed screen height.
 * @param {boolean} props.applyPadding - Apply padding around children comps.
 * @param {string} props.screenName - Name of the screen to be displayed on app header.
 * @param {React.ReactNode} props.customHeaderContent - Custom content to display in the header.
 * @param {React.ReactNode} props.children - The body content of the screen.
 * @returns {JSX.Element} The BasicActivity component.
 */
const BasicActivity = ({ navigation, route, scrollable = false, applyPadding = true, screenName = '', customHeaderContent: CustomHeaderComp, children }) => {
  const { debugMode, toggleDebugMode } = useContext(LocalDataContext);

  return (
    <View style={{ flex: 1 }}>
      <Appbar.Header style={{ backgroundColor: debugMode ? '#b3ecff' : 'transparent' }}>
        <Appbar.BackAction onPress={() => navigation.goBack()} onLongPress={toggleDebugMode} />
        <Appbar.Content style={{ flex: 0 }} title={screenName} />
        <View style={{ flex: 1 }}>
          {CustomHeaderComp && CustomHeaderComp()}
        </View>
      </Appbar.Header>
      <View style={{ flex: 1}}>
        {children}
      </View>
    </View>
  );
};

export default memo(BasicActivity);