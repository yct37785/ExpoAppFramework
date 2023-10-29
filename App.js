import React from 'react';
// change to import RootComp from '../<expo-sample-app-folder>/Framework/RootComp';
import RootComp from './Framework/RootComp';
import { screenMaps, DEFAULT_SCREEN } from './User/PageMapper';
import { NEW_USER_DATA, APP_NAME } from './DefaultValues';

const App = () => {
  return (
    <RootComp screenMaps={screenMaps} defaultScreen={DEFAULT_SCREEN} NEW_USER_DATA={NEW_USER_DATA} APP_NAME={APP_NAME} />
  );
};

export default App;