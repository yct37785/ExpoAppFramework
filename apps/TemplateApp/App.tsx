import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import Root from 'framework/root';
import { screenMap } from './screens/screenMap';

export default function App() {
  return (
    <View style={styles.container}>
      <Root DEFAULT_SCREEN='home' screenMap={screenMap} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
