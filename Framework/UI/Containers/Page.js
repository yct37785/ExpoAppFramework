import React from 'react';
import { View } from 'react-native';
import { useTheme } from 'react-native-paper';
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
 * @param {React.Component} props.screenHeaderComp - Component for the screen header.
 * @param {string} props.pageName - Name of the page.
 * @param {React.ReactNode} props.customHeaderContent - Custom content to display in the header.
 * @param {React.ReactNode} props.children - The body content of the page.
 * @returns {JSX.Element} The PageComp component.
 */
const PageComp = ({ navigation, route, screenHeaderComp: ScreenHeaderComp, pageName, customHeaderContent, children }) => {
  const theme = useTheme();

  onLocalDataUpdate(() => {
    console.log(pageName + ": updated local data");
  });

  return (
    <LinearLayout style={{ flex: 1 }}>
      <ScreenHeaderComp navigation={navigation} route={route} customHeaderComp={customHeaderContent} />
      <LinearLayout childMargin={padSize} style={{ padding: padSize }}>
        {children}
      </LinearLayout>
    </LinearLayout>
  );
};

export default PageComp;