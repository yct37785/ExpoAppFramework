import { View } from 'react-native';
import Root from 'framework/root';
import { screenMap } from './screens/screenMap';

export default function App() {
  return (
    <View style={{ flex: 1 }}>
      <Root DEFAULT_SCREEN='home' screenMap={screenMap} />
    </View>
  );
}
