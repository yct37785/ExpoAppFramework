import React from 'react';
import * as Root from '../../Framework/Index/Root';
import { LOCAL_DATA_VALUES, DEFAULT_SCREEN, ScreenNames } from './User/Schema';
import { FC } from 'react';
import SampleHomeScreen from './Screen/SampleHomeScreen';
import SampleTextInputBtnScreen from './Screen/SampleTextInputBtnScreen';
import SampleLayoutsScreen from './Screen/SampleLayoutsScreen';
import SampleContainersScreen from './Screen/SampleContainersScreen';
import SampleMenusScreen from './Screen/SampleMenusScreen';
import SampleEmptyScreen from './Screen/SampleEmptyScreen';
import SampleDataDisplayScreen from './Screen/SampleDataDisplayScreen';
import * as PropTypes from './../../Framework/Index/PropTypes';

/**
 * screen map
 */
export const screenMap: Record<ScreenNames, FC<PropTypes.IScreenProps>> = {
  [ScreenNames.Home]: SampleHomeScreen,
  [ScreenNames.TextInputBtn]: SampleTextInputBtnScreen,
  [ScreenNames.Layouts]: SampleLayoutsScreen,
  [ScreenNames.Containers]: SampleContainersScreen,
  [ScreenNames.Menus]: SampleMenusScreen,
  [ScreenNames.Empty]: SampleEmptyScreen,
  [ScreenNames.DataDisplay]: SampleDataDisplayScreen,
}

const App = () => {
  return (
    <Root.RootComp screenMap={screenMap} DEFAULT_SCREEN={DEFAULT_SCREEN} LOCAL_DATA_VALUES={LOCAL_DATA_VALUES} />
  );
}

export default App;