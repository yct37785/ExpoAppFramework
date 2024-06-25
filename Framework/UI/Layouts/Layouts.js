import React from 'react';
import { View, ScrollView, Text } from 'react-native';
import { getValueByCondition } from '../../Utilities/GeneralUtils'

/**
 * Arranges children in a linear layout, either vertically or horizontally.
 * 
 * @param {Object} props - Component props.
 * @param {React.ReactNode} props.children - The children components to render within the layout.
 * @param {number} props.flex - The flex value of the LinearLayout container.
 * @param {string} props.align - Alignment direction of children, either 'vertical' or 'horizontal'.
 * @param {string} props.childLayout - Child layout strategy, either 'wrap-content' or 'match-parent'.
 * @param {number} props.childMargin - Margin to apply to each child.
 * @param {Object} props.style - Custom styles to apply to the layout.
 * @returns {JSX.Element} The LinearLayout component.
 */
export const LinearLayout = ({ children, flex = 1, align = 'vertical', childLayout = 'wrap-content', childMargin = 0, style, ...props }) => {
  const isVertical = align === 'vertical';
  const marginStyle = isVertical ? { marginBottom: childMargin } : { marginRight: childMargin };

  return (
    <View style={[{ flexDirection: isVertical ? 'column' : 'row', flex: flex }, style]} {...props}>
      {React.Children.map(children, (child, index) => {
        const childStyle = child.props.style || {};
        const newStyle = {
          ...childStyle,
          ...marginStyle,
          ...(index === children.length - 1 ? {} : marginStyle), // Avoid margin for the last child
          ...(childLayout === 'match-parent' ? { flex: 1 } : {}),
        };

        return React.cloneElement(child, {
          style: newStyle,
        });
      })}
    </View>
  );
};

/**
 * Arranges children in a grid layout.
 * 
 * @param {Object} props - Component props.
 * @param {React.ReactNode} props.children - The children components to render within the layout.
 * @param {number} props.columns - Number of columns in the grid.
 * @param {string} props.childLayout - 'wrap-content'/'match-parent'
 * @param {number} props.childMargin - how much margin in between child wrappers
 * @param {string} props.lastRowAlign - if the last row != column num, align row children 'left'/'center'/'right'
 * @param {Object} props.style - Custom styles to apply to the layout.
 * @returns {JSX.Element} The GridLayout component.
 */
export const GridLayout = ({ children, flex = 1, columns = 2, childLayout = 'wrap-content', childMargin = 2, lastRowAlign = 'left', style, ...props }) => {
  const rows = [];
  let row = [];
  let rowFlex = flex;
  if (childLayout === 'wrap-content') {
    rowFlex = 0;
  }
  const compFlex = childLayout === 'match-parent' ? 1 : 0;
  children.forEach((child, index) => {
    const isLastRow = (children.length - index) <= (children.length % columns);
    const isLastCol = (index + 1) % columns === 0;
    let flexVal = isLastRow ? 1.0 / columns : 1;
    flexVal = compFlex === 0 ? 0 : flexVal;
    row.push(
      <View key={`col-${index}`} style={{ marginRight: isLastCol ? 0 : childMargin, marginBottom: isLastRow ? 0 : childMargin, 
        backgroundColor: isLastCol ? 'green' : 'yellow', flex: flexVal }}>
        {child}
      </View>
    );
    if (isLastCol) {
      rows.push(
        <View key={`row-${Math.floor(index / columns)}`} style={{ flexDirection: 'row', flex: rowFlex }}>
          {row}
        </View>
      );
      row = [];
    }
  });

  if (row.length > 0) {
    const alignItems = getValueByCondition([lastRowAlign === 'left', 'flex-start'], [lastRowAlign === 'center', 'center'], [lastRowAlign === 'right', 'flex-end'])
    rows.push(
      <View key={`row-${rows.length}`} style={{ flexDirection: 'row', flex: rowFlex, justifyContent: alignItems }}>
        {row}
      </View>
    );
  }

  return (
    <View style={[{ flex: flex }, style]} {...props}>
      {rows.map((row, index) => {
        return row
      })}
    </View>
  );
};

/**
 * Makes children scrollable.
 * 
 * @param {Object} props - Component props.
 * @param {React.ReactNode} props.children - The children components to render within the layout.
 * @param {Object} props.style - Custom styles to apply to the layout.
 * @returns {JSX.Element} The ScrollLayout component.
 */
export const ScrollLayout = ({ flex = 1, children, style, ...props }) => (
  <ScrollView style={[{ flex: flex }, style]} {...props}>
    {children}
  </ScrollView>
);
