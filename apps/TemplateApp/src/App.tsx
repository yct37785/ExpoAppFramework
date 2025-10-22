import { View } from 'react-native';
import { Root } from 'framework';
import { Screen, Managers, UI } from 'framework';
// screens
import HomeScreen from './Screens/HomeScreen';
import TestbedScreen from './Screens/TestbedScreen';
import TypographyScreen from './Screens/TypographyScreen';
import LayoutScreen from './Screens/LayoutScreen';
import MenuScreen from './Screens/MenuScreen';
import ListScreen from './Screens/ListScreen';
import ContainerScreen from './Screens/ContainerScreen';

/******************************************************************************************************************
 * AppBar: default left content
 ******************************************************************************************************************/
const DefaultLeftContent = () => (
  <View style={{ flexDirection: 'row', alignItems: 'center', paddingLeft: 12 }}>
    <View
      style={{
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: '#007AFF', // blue dot
        marginRight: 8,
      }}
    />
    <UI.Text variant='titleMedium'>TemplateApp</UI.Text>
  </View>
);

/******************************************************************************************************************
 * Screen mapper
 ******************************************************************************************************************/
export const screenMap: Screen.ScreenMap = {
  'home': HomeScreen,
  'testbed': TestbedScreen,
  'typography': TypographyScreen,
  'layout': LayoutScreen,
  'menu': MenuScreen,
  'list': ListScreen,
  'container': ContainerScreen,
};

/******************************************************************************************************************
 * App with default layout
 ******************************************************************************************************************/
const defaultScreenLayoutProps = {
  showTitle: false, // screens can set true to show title
  showBack: undefined, // uses navigation.canGoBack() by default
  LeftContent: DefaultLeftContent,
};

export default function App() {
  return (
    <Root
      DEFAULT_SCREEN='home'
      screenMap={screenMap}
      defaultScreenLayoutProps={defaultScreenLayoutProps}
    />
  );
}
