import React from 'react';
import * as Root from '../../Framework/Index/Root';
import { screenMap, DEFAULT_SCREEN } from './User/ScreenMapper';
import { LOCAL_DATA_SCHEMA } from './User/Schema';

const App = () => {
  return (
    <Root.RootComp screenMap={screenMap} DEFAULT_SCREEN={DEFAULT_SCREEN} LOCAL_DATA_SCHEMA={LOCAL_DATA_SCHEMA} />
  );
};

export default App;