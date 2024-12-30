import React, { useContext, memo } from 'react';
import { View } from 'react-native';
import { useTheme, Appbar } from 'react-native-paper';

/**
 * A wrapper component to setup an activity quickly by providing the body and custom header content if any.
 * 
 * @param {Object} props - Component props.
 * @param {Object} props.navigation - React Navigation provided object for navigating between screens.
 * @param {Object} props.route - React Navigation provided oobject containing route parameters.
 * @param {string} [props.title=''] - Title of the screen to be displayed on app header.
 * @param {React.ReactNode} props.customHeaderContent - Custom content to display in the header.
 * @param {Object} [props.style={}] - Additional style on base container.
 * @param {React.ReactNode} props.children - The body content of the screen.
 * 
 * @returns {JSX.Element} The BasicActivity component.
 */
const BasicActivity = ({
  navigation,
  route,
  title = '',
  customHeaderContent: CustomHeaderComp,
  style={},
  children
}) => {
  return (
    <View style={[{ flex: 1 }, style]}>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        {title ? <Appbar.Content style={{ flex: 0 }} title={title} /> : null}
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