import React, { memo, useContext, createContext } from 'react';
import { View, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useTheme } from 'react-native-paper';
import { AppBar } from './AppBar';
import { PadSpacingValue } from '../Types';
import * as Const from '../Const';

const SAFE_AREA_EDGES = ['bottom'] as const;

/******************************************************************************************************************
 * Screen layout defaults context
 *
 * @property value - ScreenLayoutProps that acts as app-wide defaults, provided by Root
 ******************************************************************************************************************/
export const ScreenLayoutContext = createContext<ScreenLayoutProps>({});

/******************************************************************************************************************
 * Screen layout props.
 * 
 * @property showTitle?     - To show title text for the AppBar (default: false)
 * @property title?         - Title text for the AppBar (defaults to current route name) if showTitle is true
 * @property showBack?      - Show a back button
 * @property LeftContent?   - Optional component rendered in the AppBar’s left slot (after back button).
 *                            Receives { navigation, route } so it can call into screen logic.
 * @property RightContent?  - Optional component rendered in the AppBar’s right slot (after LeftContent).
 *                            Receives { navigation, route } so it can call into screen logic.
 * @property appbarBottomMargin?  - Margin below appbar
 * @property children?      - Screen content rendered below the AppBar inside a SafeAreaView
 ******************************************************************************************************************/
export type ScreenLayoutProps = {
  showTitle?: boolean;
  title?: string;
  showBack?: boolean;
  LeftContent?: React.ReactNode;
  RightContent?: React.ReactNode;
  appbarBottomMargin?: PadSpacingValue;
  children?: React.ReactNode;
};

/******************************************************************************************************************
 * Screen layout — Base view for screens.
 * Use this in each screen to render consistent base screen layout (AppBar, SafeAreaView etc).
 *
 * @usage
 * ```tsx
 *  return (
 *    <Screen.ScreenLayout>
 *      ...
 *    </Screen.ScreenLayout>
 *  );
 * ```
 ******************************************************************************************************************/
export const ScreenLayout: React.FC<ScreenLayoutProps> = memo((props) => {
  const defaults = useContext(ScreenLayoutContext);
  const theme = useTheme();
  const navigation = useNavigation();
  const route = useRoute();

  // merge strategy: screen props override app-wide defaults
  const showTitle = props.showTitle ?? defaults.showTitle ?? false;
  const title = props.title ?? defaults.title;
  const LeftContent = props.LeftContent ?? defaults.LeftContent;
  const RightContent = props.RightContent ?? defaults.RightContent;
  const explicitShowBack = props.showBack ?? defaults.showBack;
  const appbarBottomMargin =
    props.appbarBottomMargin ?? defaults.appbarBottomMargin ?? 2;

  const computedTitle =
    title ?? route?.name?.replace(/^./, (c: string) => c.toUpperCase());

  const canGoBack =
    typeof (navigation as any).canGoBack === 'function'
      ? (navigation as any).canGoBack()
      : false;
  const showBackFinal = explicitShowBack ?? canGoBack;

  return (
    <View
      style={[
        styles.root,
        { backgroundColor: theme.colors.background },
      ]}
    >
      <AppBar
        title={showTitle ? computedTitle : undefined}
        onBack={showBackFinal ? () => (navigation as any).goBack() : undefined}
        left={LeftContent}
        right={RightContent}
      />

      <SafeAreaView
        edges={SAFE_AREA_EDGES}
        style={[
          styles.content,
          { marginTop: appbarBottomMargin * Const.padSize },
        ]}
      >
        {props.children}
      </SafeAreaView>
    </View>
  );
});

/******************************************************************************************************************
 * Styles
 ******************************************************************************************************************/
const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
});