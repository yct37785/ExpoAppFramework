import React from 'react';
import { View, ScrollView, Text } from 'react-native';
import { getValueByCondition } from '../../Utilities/GeneralUtils'

/**
 * Linear layout, aligns children verticallyhorizontally
 * 
 * @param {Object} props - Component props.
 * @param {React.ReactNode} props.children - The children components to render within the layout.
 * @param {string} props.align - 'vertical'/'horizontal'
 * @param {string} props.childLayout - 'wrap-content'/'match-parent'
 * @param {number} props.childMargin - how much margin in between child wrappers
 * @param {Object} props.style - Custom styles to apply to the layout.
 * @returns {JSX.Element} The VerticalLayout component.
 */
export const LinearLayout = ({ children, flex = 1, align = 'vertical', childLayout = 'wrap-content', childMargin = 2, style, ...props }) => {
  return (<View style={[{ flexDirection: align === 'vertical' ? 'column' : 'row', flex: flex }, style]} {...props}>
    {children.map((child, index) => {
      if (childLayout === 'match-parent') {
        return <View key={index} style={{ flex: 1 }}>
          {child}
        </View>
      } else {
        return child
      }
    })}
  </View>)
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
        <View key={`row-${Math.floor(index / columns)}`} style={{ flexDirection: 'row', flex: compFlex }}>
          {row}
        </View>
      );
      row = [];
    }
  });

  if (row.length > 0) {
    const alignItems = getValueByCondition([lastRowAlign === 'left', 'flex-start'], [lastRowAlign === 'center', 'center'], [lastRowAlign === 'right', 'flex-end'])
    rows.push(
      <View key={`row-${rows.length}`} style={{ flexDirection: 'row', flex: compFlex, justifyContent: alignItems }}>
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

/**
 * Allows flexible sizing of children.
 * 
 * @param {Object} props - Component props.
 * @param {React.ReactNode} props.children - The children components to render within the layout.
 * @param {number} props.flex - Flex value to determine space occupied relative to siblings.
 * @param {Object} props.style - Custom styles to apply to the layout.
 * @returns {JSX.Element} The FlexLayout component.
 */
export const FlexLayout = ({ children, flex = 1, style, ...props }) => (
  <View style={[{ flex }, style]} {...props}>
    {children}
  </View>
);
