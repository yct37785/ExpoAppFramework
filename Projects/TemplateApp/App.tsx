import React from 'react';
import RootComp from '@root';
import { screenMap } from './Screens/ScreenMap';

export default function App() {
  return (
    <RootComp DEFAULT_SCREEN='home' screenMap={screenMap} />
  );
};