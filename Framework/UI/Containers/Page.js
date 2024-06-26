import React from 'react';
import { View } from 'react-native';
import { useTheme, Appbar } from 'react-native-paper';
import { LinearLayout } from '../Layouts/Layouts';
import { onLocalDataUpdate } from '../../Contexts/LocalDataContext';
import { padSize } from '../../Common/Values';

/**
 * PageComp Component
 * 
 * A wrapper component to setup a page quickly by providing the body and custom header content if any.
 * 
 * @param {Object} props - Component props.
 * @param {Object} props.navigation - Navigation object for navigating between screens.
 * @param {Object} props.route - Route object containing route parameters.
 * @param {boolean} props.scrollable - page scrollable if exceed screen height.
 * @param {string} props.pageName - Name of the page.
 * @param {React.ReactNode} props.customHeaderContent - Custom content to display in the header.
 * @param {React.ReactNode} props.children - The body content of the page.
 * @returns {JSX.Element} The PageComp component.
 */
const PageComp = ({ navigation, route, scrollable = false, pageName, customHeaderContent: CustomHeaderComp, children }) => {
  const theme = useTheme();

  onLocalDataUpdate(() => {
    console.log(pageName + ": updated local data");
  });

  return (
    <View style={{ flex: 1 }}>
      <Appbar.Header style={{ backgroundColor: 'blue' }}>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content style={{ flex: 0 }} title={route.name} />
        <View style={{ flex: 1 }}>
          {CustomHeaderComp && CustomHeaderComp()}
        </View>
      </Appbar.Header>
      <LinearLayout flex={1} childMargin={padSize} scrollable={scrollable} style={{ padding: padSize }} debugBackgroundColor='yellow'>
        {children}
      </LinearLayout>
    </View>
  );
};

export default PageComp;