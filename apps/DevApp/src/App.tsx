import { Root } from 'framework';
import { Screen } from 'framework';
// screens
import HomeScreen from './Screens/HomeScreen';
// layout
import { DefaultLeftContent, DefaultRightContent } from './ScreenLayout';

/******************************************************************************************************************
 * Screen mapper
 ******************************************************************************************************************/
export const screenMap: Screen.ScreenMap = {
  home: HomeScreen
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
        showTitle: true, // screens can set true to show title
        LeftContent: <DefaultLeftContent />,
        RightContent: <DefaultRightContent />
      }}
    />
  );
}
