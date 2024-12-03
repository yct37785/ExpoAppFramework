import React from 'react';
import { RootComp } from '../../Framework/Index/Core';
import { screenMaps, DEFAULT_SCREEN } from './User/ScreenMapper';
import { LOCAL_DATA_SCHEMA } from './User/Schemas';

const App = () => {
  return (
    <RootComp screenMaps={screenMaps} DEFAULT_SCREEN={DEFAULT_SCREEN} LOCAL_DATA_SCHEMA={LOCAL_DATA_SCHEMA} />
  );
};

export default App;