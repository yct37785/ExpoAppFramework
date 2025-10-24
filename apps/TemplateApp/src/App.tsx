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
import CollapsibleScreen from './Screens/CollapsibleScreen';
import TabsScreen from './Screens/TabsScreen';

/******************************************************************************************************************
 * AppBar: default left content
 ******************************************************************************************************************/
const DefaultLeftContent = () => (
  <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: 'green' }}>
    <UI.Text variant='titleMedium'>Left</UI.Text>
  </View>
);

const DefaultRightContent = () => (
  <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: 'red' }}>
    <UI.Text variant='titleMedium'>Right</UI.Text>
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
  'collapsible': CollapsibleScreen,
  'tabs': TabsScreen,
};

/******************************************************************************************************************
 * App with default layout
 ******************************************************************************************************************/
export default function App() {
  return (
    <Root
      DEFAULT_SCREEN='home'
      screenMap={screenMap}
      defaultScreenLayoutProps={{
        showTitle: false, // screens can set true to show title
        showBack: undefined, // uses navigation.canGoBack() by default
        LeftContent: DefaultLeftContent,
        RightContent: DefaultRightContent
      }}
    />
  );
}
