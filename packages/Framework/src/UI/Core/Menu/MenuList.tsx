import React, { memo } from 'react';
import { View } from 'react-native';
import { Divider } from 'react-native-paper';
import { MenuListType } from './MenuList.types';
import { MenuListItem } from './MenuListItem';
import * as Const from '../../../Const';

/******************************************************************************************************************
 * MenuList implementation.
 ******************************************************************************************************************/
export const MenuList: MenuListType = memo(({
  options,
  onSelect,
  style = {},
  showDividers = false,
  dense = false,
}) => {
  return (
    <View style={style}>
      {options.map((option, idx) => (
        <React.Fragment key={`${option.value}-${idx}`}>
          <MenuListItem option={option} onPress={onSelect} dense={dense} />
          {showDividers && idx < options.length - 1 ? (
            <Divider style={{ marginLeft: option.leadingIcon ? Const.padSize * 3 : 0 }} />
          ) : null}
        </React.Fragment>
      ))}
    </View>
  );
});
