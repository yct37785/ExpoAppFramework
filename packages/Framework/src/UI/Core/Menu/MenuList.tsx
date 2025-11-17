import React, { memo } from 'react';
import { View, type ViewStyle } from 'react-native';
import { MenuListType } from './MenuList.types';
import { MenuListItem } from './MenuListItem';
import { Divider } from '../Visuals/Divider';

/******************************************************************************************************************
 * MenuList implementation.
 ******************************************************************************************************************/
export const MenuList: MenuListType = memo(
  ({
    options,
    onSelect,
    showDividers = false,
    dense = false,
    align = 'start',
  }) => {
    return (
      <View>
        {options.map((option, idx) => (
          <React.Fragment key={`${option.value}-${idx}`}>
            <MenuListItem
              option={option}
              onPress={onSelect}
              dense={dense}
              align={align}
            />

            {showDividers && idx < options.length - 1 ? (
              <Divider spacing={0} />
            ) : null}
          </React.Fragment>
        ))}
      </View>
    );
  }
);
