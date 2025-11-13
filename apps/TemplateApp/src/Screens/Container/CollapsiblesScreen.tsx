import React, { useContext, useState, useEffect, useCallback, useRef, memo } from 'react';
import { View } from 'react-native';
import { Screen, Const, UI } from 'framework';
const _ = require('lodash');

/******************************************************************************************************************
 * Const defines
 ******************************************************************************************************************/
export const ACCORDION_SECTION_TITLES: string[] = ['First', 'Second', 'Third'];

/******************************************************************************************************************
 * Collapsible containers demo
 ******************************************************************************************************************/
const CollapsiblScreen: Screen.ScreenType = ({ navigation, route }) => {
  return (
    <Screen.ScreenLayout>
      <UI.VerticalLayout>

        {/* CollapsibleContainer */}
        <UI.Text variant='titleMedium'>CollapsibleContainer</UI.Text>
        <UI.CollapsibleContainer toggleHeaderText='collapsible'>
          <View style={{ flex: 1, padding: Const.padSize }}>
            <UI.Text>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</UI.Text>
          </View>
        </UI.CollapsibleContainer>

        <UI.Divider />

        {/* AccordionContainer */}
        <UI.Text variant='titleMedium'>AccordionContainer</UI.Text>
        <UI.AccordionContainer sectionTitles={ACCORDION_SECTION_TITLES}>
          <View style={{ flex: 1, padding: Const.padSize }}>
            <UI.Text>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</UI.Text>
          </View>
          <View style={{ flex: 1, padding: Const.padSize }}>
            <UI.Text>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</UI.Text>
          </View>
          <View style={{ flex: 1, padding: Const.padSize }}>
            <UI.Text>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</UI.Text>
          </View>
        </UI.AccordionContainer>
        
      </UI.VerticalLayout>
    </Screen.ScreenLayout>
  );
};

export default memo(CollapsiblScreen);
