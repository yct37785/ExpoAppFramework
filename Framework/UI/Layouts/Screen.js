/*****************************************************************************************
 * the main layout for a screen, manages app bar
*****************************************************************************************/
import React, { useContext } from 'react';
import { View } from 'react-native';
import { useTheme, Appbar } from 'react-native-paper';
import { LinearLayout } from './Layouts';
import { LocalDataContext } from '../../Contexts/LocalDataContext';
import { padSize } from '../../CommonVals';

/**
 * ScreenComp Component
 * 
 * A wrapper component to setup a screen quickly by providing the body and custom header content if any.
 * 
 * @param {Object} props - Component props.
 * @param {Object} props.navigation - Navigation object for navigating between screens.
 * @param {Object} props.route - Route object containing route parameters.
 * @param {boolean} props.scrollable - content scrollable if exceed screen height.
 * @param {boolean} props.applyPadding - to apply padding to sides.
 * @param {string} props.screenName - Name of the screen.
 * @param {React.ReactNode} props.customHeaderContent - Custom content to display in the header.
 * @param {React.ReactNode} props.children - The body content of the screen.
 * @returns {JSX.Element} The ScreenComp component.
 */
const ScreenComp = ({ navigation, route, scrollable = false, applyPadding = true, screenName, customHeaderContent: CustomHeaderComp, children }) => {
  const theme = useTheme();
  const { debugMode, toggleDebugMode } = useContext(LocalDataContext);

  return (
    <View style={{ flex: 1 }}>
      <Appbar.Header style={{ backgroundColor: debugMode ? '#b3ecff' : 'transparent' }}>
        <Appbar.BackAction onPress={() => navigation.goBack()} onLongPress={toggleDebugMode} />
        <Appbar.Content style={{ flex: 0 }} title={route.name} />
        <View style={{ flex: 1 }}>
          {CustomHeaderComp && CustomHeaderComp()}
        </View>
      </Appbar.Header>
      <LinearLayout flex={1} childMargin={padSize} scrollable={scrollable} style={{ padding: applyPadding ? padSize : 0 }} debugBackgroundColor='yellow'>
        {children}
      </LinearLayout>
    </View>
  );
};

export default ScreenComp;