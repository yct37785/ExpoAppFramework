/*****************************************************************************************
* load RootComp here to run the app
*****************************************************************************************/
import React from 'react';
import { RootComp } from '../../Framework/Index/Core';
import { screenMaps, DEFAULT_SCREEN } from './User/ScreenMapper';
import { NEW_USER_DATA } from './User/Schemas';

const App = () => {
  return (
    <RootComp screenMaps={screenMaps} DEFAULT_SCREEN={DEFAULT_SCREEN} NEW_USER_DATA={NEW_USER_DATA} />
  );
};

export default App;