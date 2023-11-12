import React, { useRef } from 'react';
import { View } from 'react-native';
import { Text, TouchableRipple, useTheme } from 'react-native-paper';
import { padSize05, padSize, rippleColorForLight, rippleColorForDark } from '../Common/Values';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  Menu,
  MenuOptions,
  MenuTrigger,
} from 'react-native-popup-menu';

/**
 * triggerComp: comp
 * options: [{ icon: comp, label: str, value: str, color: str }]
 * value: str, value of a selection
 * 
 * note, triggerComp should not take in an onPress callback or else it will override the option callbacks
 */
function DropdownMenu({ triggerComp, value = '', options, onPress, disabled = false, marginTop = 0,
  dir = 'column', selectionStyle = 1, drawCustomOptionComp = null }) {
  /**------------------------------------------------------------------------------------*
   * State
   *------------------------------------------------------------------------------------*/
  const theme = useTheme();
  const menuRef = useRef(null);
  const width = dir === 'column' ? '100%' : 'auto';
  const optionsStyles = {
    optionsContainer: {
      backgroundColor: theme.colors.surfaceVariant, marginTop: marginTop,
      padding: dir === 'column' ? 5 : 0
    },
    optionsWrapper: {
      flexDirection: dir,
      flexWrap: 'wrap'
    }
  };

  /**------------------------------------------------------------------------------------*
   * Logic
   *------------------------------------------------------------------------------------*/
  function onPressOption(val) {
    menuRef.current.close();
    onPress(val);
  }

  function closeMenu() {
    menuRef.current.close();
  }

  /**------------------------------------------------------------------------------------*
   * Draw items
   *------------------------------------------------------------------------------------*/
  function getTextColorStyle(o) {
    if (o.color) {
      return { color: o.color };
    }
    return {}
  }

  function drawNormalItem(o, idx) {
    return <TouchableRipple
      style={{ width: width, padding: padSize }} key={idx} onPress={() => onPressOption(o.value)}>
      {o.comp ? o.comp : <Text style={getTextColorStyle(o)}>{o.label}</Text>}
    </TouchableRipple>
  }

  function drawSelectedItem(o, idx) {
    return <TouchableRipple
      style={{ width: width, padding: padSize }} key={idx} onPress={() => onPressOption(o.value)}>
      <View style={{ width: width, flexDirection: 'row', alignItems: 'center' }}>
        {value === o.value ? <Icon name="check" size={15} color={theme.colors.text} /> :
          <View style={{ width: 16 }} />}
        {o.comp ? o.comp : <Text style={[getTextColorStyle(o), { marginLeft: padSize }]}>{o.label}</Text>}
      </View>
    </TouchableRipple>
  }

  function drawSelectedItem2(o, idx) {
    return <TouchableRipple
      style={{ width: width, padding: padSize, backgroundColor: value === o.value ? !theme.dark ? rippleColorForLight : rippleColorForDark : 'none' }}
      key={idx} onPress={() => onPressOption(o.value)}>
      <View style={{ flex: 1, alignItems: 'center' }}>
        {o.comp ? o.comp : <Text style={[getTextColorStyle(o), { marginLeft: padSize }]}>{o.label}</Text>}
      </View>
    </TouchableRipple>
  }

  /**------------------------------------------------------------------------------------*
   * Draw
   *------------------------------------------------------------------------------------*/
  return (
    <Menu ref={menuRef}>
      <MenuTrigger disabled={disabled} customStyles={{
        TriggerTouchableComponent: TouchableRipple
      }}>
        {triggerComp}
      </MenuTrigger>
      <MenuOptions customStyles={optionsStyles}>
        {drawCustomOptionComp ? drawCustomOptionComp(closeMenu) :
          options.map((o, idx) => {
            if (value === '') {
              return drawNormalItem(o, idx);
            } else {
              return selectionStyle === 1 ? drawSelectedItem(o, idx) : drawSelectedItem2(o, idx);
            }
          })
        }
      </MenuOptions>
    </Menu>
  )
}

export default React.memo(DropdownMenu);