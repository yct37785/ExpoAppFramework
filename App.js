import React from 'react';
// change to import RootComp from '../<expo-sample-app-folder>/Framework/RootComp';
import RootComp from './Framework/RootComp';
import { screenMaps, DEFAULT_SCREEN } from './User/PageMapper';

const App = () => {
  return (
    <RootComp screenMaps={screenMaps} defaultScreen={DEFAULT_SCREEN} />
  );
};

export default App;