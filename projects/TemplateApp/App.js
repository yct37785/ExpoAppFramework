import React from 'react';
import * as Core from '../../Framework/Index/Core';
import { screenMap, DEFAULT_SCREEN } from './User/ScreenMapper';
import { LOCAL_DATA_SCHEMA } from './User/Schemas';

const App = () => {
  return (
    <Core.RootComp screenMap={screenMap} DEFAULT_SCREEN={DEFAULT_SCREEN} LOCAL_DATA_SCHEMA={LOCAL_DATA_SCHEMA} />
  );
};

export default App;