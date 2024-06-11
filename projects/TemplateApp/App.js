import React from 'react';
import RootComp from '../../Framework/RootComp';
import { screenMaps, screenHeaderMaps, DEFAULT_SCREEN } from './User/PageMapper';
import { NEW_USER_DATA } from './User/Schemas';

const App = () => {
  return (
    <RootComp screenMaps={screenMaps} screenHeaderMaps={screenHeaderMaps} DEFAULT_SCREEN={DEFAULT_SCREEN} NEW_USER_DATA={NEW_USER_DATA} />
  );
};

export default App;