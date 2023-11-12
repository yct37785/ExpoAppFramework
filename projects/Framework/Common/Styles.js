import { StyleSheet } from 'react-native';
import { borderRad, padSize05, padSize, padSize2, padSize4 } from './Values';

const Styles = StyleSheet.create({

  /**------------------------------------------------------------------------------------*
   * Containers
   *------------------------------------------------------------------------------------*/
  contPage: {
    flex: 1,
    width: '100%'
  },
  contVert: {
    flex: 1,
    flexDirection: 'column',
    padding: padSize
  },
  contHort: {
    flex: 1,
    flexDirection: 'row',
    padding: padSize
  },
  contFlex: {
    flex: 1
  },
  contPad: {
    padding: padSize
  },

  /**------------------------------------------------------------------------------------*
   * Margins and paddings
   *------------------------------------------------------------------------------------*/
  margin: {
    margin: padSize
  },

  /**------------------------------------------------------------------------------------*
   * Orientations
   *------------------------------------------------------------------------------------*/
  center: {
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default Styles;