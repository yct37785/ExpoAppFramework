import React, { memo } from 'react';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useTheme } from 'react-native-paper';
import { AppBar } from '../UI/Core/Container/AppBar';
import { ScreenLayoutType } from './ScreenLayout.types';
import * as Const from '../Const';

/******************************************************************************************************************
 * Screen layout implementation.
 ******************************************************************************************************************/
export const ScreenLayout: ScreenLayoutType = memo(({
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
});