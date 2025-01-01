import React, { memo } from 'react';
import { View } from 'react-native';
import { Appbar } from 'react-native-paper';
import { IBasicActivityProps } from '../../../Index/PropType';

/**
 * A wrapper component to setup an activity quickly by providing the body and custom header content if any.
 */
const BasicActivity: React.FC<IBasicActivityProps> = ({
  navigation,
  title = '',
  CustomHeaderComp,
  style = {},
  children
}) => {
  return (
    <View style={[{ flex: 1 }, style]}>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        {title ? <Appbar.Content style={{ flex: 0 }} title={title} /> : null}
        <View style={{ flex: 1 }}>
          {CustomHeaderComp && <CustomHeaderComp />}
        </View>
      </Appbar.Header>
      <View style={{ flex: 1 }}>
        {children}
      </View>
    </View>
  );
};

export default memo(BasicActivity);