import React, { memo } from 'react';
import { View } from 'react-native';
import { MenuListType } from './MenuList.types';
import { MenuListItem } from './MenuListItem';
import { Divider } from '../Visuals/Divider';
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
            <Divider spacing={0} />
          ) : null}
        </React.Fragment>
      ))}
    </View>
  );
});
