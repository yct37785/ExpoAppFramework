import { View } from 'react-native';
import { screenMap } from './Screens/ScreenMap';
import { Root, Theme } from 'framework';

export default function App() {
  return (
    <View style={{ flex: 1 }}>
      <Root DEFAULT_SCREEN='home' screenMap={screenMap} lightTheme={Theme.myThemeLight} darkTheme={Theme.myThemeDark} />
    </View>
  );
}
