import React from 'react';

/******************************************************************************************************************
 * Screen layout props.
 * 
 * @property showTitle?    - To show title text for the AppBar (default: false)
 * @property title?        - Title text for the AppBar (defaults to current route name) if showTitle is true
 * @property showBack?     - Show a back button (defaults to navigation.canGoBack())
 * @property LeftContent?  - Optional component rendered in the AppBar’s left slot (after back button).
 *                           Receives { navigation, route } so it can call into screen logic.
 * @property children      - Screen content rendered below the AppBar inside a SafeAreaView
 ******************************************************************************************************************/
export type ScreenLayoutProps = {
  showTitle?: boolean;
  title?: string;
  showBack?: boolean;
  LeftContent?: React.FC | null;
  children: React.ReactNode;
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
export type ScreenLayoutType = React.FC<ScreenLayoutProps>;
