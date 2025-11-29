import React, { memo, useMemo } from 'react';
import { View } from 'react-native';
import * as Const from '../../../Const';
import { BoxType } from './Box.types';

const spacing = (units?: number) =>
  units === undefined ? undefined : units * Const.padSize;

/******************************************************************************************************************
 * Box implementation.
 ******************************************************************************************************************/
export const Box: BoxType = memo(
  ({
    bgColor = 'transparent',
    flex,
    dir,
    align,
    justify,
    p, m,
    pv, ph, mv, mh,
    pt, pr, pb, pl,
    mt, mr, mb, ml,
    style,
    children,
  }) => {
    const resolvedStyle = [
      {
        backgroundColor: bgColor,
        flex,
        flexDirection: dir,
        alignItems: align,
        justifyContent: justify,

        // padding
        padding: spacing(p),
        paddingVertical: spacing(pv),
        paddingHorizontal: spacing(ph),
        paddingTop: spacing(pt),
        paddingRight: spacing(pr),
        paddingBottom: spacing(pb),
        paddingLeft: spacing(pl),

        // margin
        margin: spacing(m),
        marginVertical: spacing(mv),
        marginHorizontal: spacing(mh),
        marginTop: spacing(mt),
        marginRight: spacing(mr),
        marginBottom: spacing(mb),
        marginLeft: spacing(ml),
      },
      style,
    ];

    return <View style={resolvedStyle}>{children}</View>;
  }
);

Box.displayName = 'Box';