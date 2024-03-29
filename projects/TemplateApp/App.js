import React from 'react';
import RootComp from '@expo-app-framework/framework/RootComp';
import { screenMaps, DEFAULT_SCREEN } from './User/PageMapper';
import { NEW_USER_DATA, APP_NAME } from './User/Schemas';

const App = () => {
  return (
    <RootComp screenMaps={screenMaps} defaultScreen={DEFAULT_SCREEN} NEW_USER_DATA={NEW_USER_DATA} APP_NAME={APP_NAME} />
  );
};

export default App;