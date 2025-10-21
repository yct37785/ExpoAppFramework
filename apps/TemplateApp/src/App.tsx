import { View } from 'react-native';
import { screenMap } from './Screens/ScreenMap';
import { Root } from 'framework';
import { Screen, Managers, UI_Core, UI_Derived } from 'framework';

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
    <UI_Core.Text variant='titleMedium'>TemplateApp</UI_Core.Text>
  </View>
);

const defaultScreenLayoutProps = {
  showTitle: false, // screens can set true to show title
  showBack: undefined, // uses navigation.canGoBack() by default
  LeftContent: DefaultLeftContent,
};

export default function App() {
  return (
    <View style={{ flex: 1 }}>
      <Root
        DEFAULT_SCREEN='home'
        screenMap={screenMap}
        defaultScreenLayoutProps={defaultScreenLayoutProps}
      />
    </View>
  );
}
