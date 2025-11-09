import React, { memo, useMemo } from 'react';
import { View } from 'react-native';
import * as Const from '../../../Const';
import { BoxType } from './Box.types';

/******************************************************************************************************************
 * Box implementation.
 ******************************************************************************************************************/
export const Box: BoxType = memo(({
  backgroundColor = 'transparent',
  flex,
  p, m,
  pv, ph, mv, mh,
  pt, pr, pb, pl,
  mt, mr, mb, ml,
  style = {},
  children,
}) => {
  const resolvedStyle = useMemo(() => {
    return [
      {
        backgroundColor,
        flex,

        // padding
        padding: p !== undefined ? p * Const.padSize : undefined,
        paddingVertical: pv !== undefined ? pv * Const.padSize : undefined,
        paddingHorizontal: ph !== undefined ? ph * Const.padSize : undefined,
        paddingTop: pt !== undefined ? pt * Const.padSize : undefined,
        paddingRight: pr !== undefined ? pr * Const.padSize : undefined,
        paddingBottom: pb !== undefined ? pb * Const.padSize : undefined,
        paddingLeft: pl !== undefined ? pl * Const.padSize : undefined,

        // margin
        margin: m !== undefined ? m * Const.padSize : undefined,
        marginVertical: mv !== undefined ? mv * Const.padSize : undefined,
        marginHorizontal: mh !== undefined ? mh * Const.padSize : undefined,
        marginTop: mt !== undefined ? mt * Const.padSize : undefined,
        marginRight: mr !== undefined ? mr * Const.padSize : undefined,
        marginBottom: mb !== undefined ? mb * Const.padSize : undefined,
        marginLeft: ml !== undefined ? ml * Const.padSize : undefined,
      },
      style,
    ];
  }, [
    p, m, pv, ph, mv, mh,
    pt, pr, pb, pl,
    mt, mr, mb, ml,
    backgroundColor, flex, style,
  ]);

  return <View style={resolvedStyle}>{children}</View>;
});
