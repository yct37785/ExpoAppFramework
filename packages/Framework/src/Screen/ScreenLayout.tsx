import React, { memo, useContext, createContext } from 'react';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useTheme } from 'react-native-paper';
import { AppBar } from '../UI/Core/Container/AppBar';
import { ScreenLayoutProps, ScreenLayoutType } from './ScreenLayout.types';
import * as Const from '../Const';

/******************************************************************************************************************
 * Screen layout defaults context
 *
 * @property value - Partial<ScreenLayoutProps> that acts as app-wide defaults, provided by Root
 ******************************************************************************************************************/
export const ScreenLayoutContext = createContext<Partial<ScreenLayoutProps>>({});

/******************************************************************************************************************
 * Screen layout implementation.
 ******************************************************************************************************************/
export const ScreenLayout: ScreenLayoutType = memo((props) => {
  const defaults = useContext(ScreenLayoutContext);
  const theme = useTheme();
  const navigation = useNavigation();
  const route = useRoute();

  // merge strategy: screen props override app-wide defaults
  const showTitle = props.showTitle ?? defaults.showTitle ?? false;
  const title = props.title ?? defaults.title;
  const LeftContent = props.LeftContent ?? defaults.LeftContent;
  const explicitShowBack = props.showBack ?? defaults.showBack;

  const computedTitle = title ?? (route?.name as string);
  const canGoBack =
    typeof (navigation as any).canGoBack === 'function'
      ? (navigation as any).canGoBack()
      : false;
  const showBackFinal = explicitShowBack ?? canGoBack;

  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <AppBar
        title={showTitle ? computedTitle : undefined}
        onBack={showBackFinal ? () => (navigation as any).goBack() : undefined}
        left={LeftContent ? <LeftContent /> : undefined}
        right={undefined}
      />
      <SafeAreaView edges={['bottom']} style={{ flex: 1 }}>
        {props.children}
      </SafeAreaView>
    </View>
  );
});