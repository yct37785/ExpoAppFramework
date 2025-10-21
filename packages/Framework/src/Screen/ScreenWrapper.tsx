import React, { memo } from 'react';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useTheme } from 'react-native-paper';
import { AppBar } from '../UI/Core/Container/AppBar';
import * as Const from '../Const';

/******************************************************************************************************************
 * Screen wrapper props.
 * 
 * @property showTitle?    - To show title text for the AppBar (default: false)
 * @property title?        - Title text for the AppBar (defaults to current route name) if showTitle is true
 * @property showBack?     - Show a back button (defaults to navigation.canGoBack())
 * @property LeftContent?  - Optional component rendered in the AppBar’s left slot (after back button).
 *                           Receives { navigation, route } so it can call into screen logic.
 * @property children      - Screen content rendered below the AppBar inside a SafeAreaView
 ******************************************************************************************************************/
export type ScreenWrapperProps = {
  showTitle?: boolean;
  title?: string;
  showBack?: boolean;
  LeftContent?: React.FC | null;
  children: React.ReactNode;
};

/******************************************************************************************************************
 * Screen wrapper — Base view for screens (AppBar + SafeAreaView + Profile menu).
 * Use this in each screen to render a consistent top bar and safe-area content wrapper.
 ******************************************************************************************************************/
const ScreenWrapperComponent: React.FC<ScreenWrapperProps> = ({
  showTitle = false,
  title,
  showBack,
  LeftContent,
  children,
}) => {
  const theme = useTheme();
  const navigation = useNavigation();
  const route = useRoute();

  const computedTitle = title ?? (route?.name as string);
  const canGoBack = typeof (navigation as any).canGoBack === 'function' ? (navigation as any).canGoBack() : false;
  const showBackFinal = showBack ?? canGoBack;

  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <AppBar
        title={showTitle ? computedTitle : undefined}
        onBack={showBackFinal ? () => (navigation as any).goBack() : undefined}
        left={LeftContent ? <LeftContent /> : undefined}
        right={undefined}
      />
      <SafeAreaView edges={['bottom']} style={{ flex: 1 }}>
        {children}
      </SafeAreaView>
    </View>
  );
};

export const ScreenWrapper = memo(ScreenWrapperComponent);
