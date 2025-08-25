import { View } from 'react-native';
import { screenMap } from './Screens/ScreenMap';
import { Root } from 'framework';

export default function App() {
  return (
    <View style={{ flex: 1 }}>
      <Root DEFAULT_SCREEN='home' screenMap={screenMap} />
    </View>
  );
}
