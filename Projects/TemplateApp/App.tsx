import React from 'react';
import RootComp from '@root/Root';
import { screenMap } from 'Screens/ScreenMap';

export default function App() {
  return (
    <RootComp DEFAULT_SCREEN="empty screen" screenMap={screenMap} />
  );
};