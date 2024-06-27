import React, { useContext } from 'react';
import { View, ScrollView, Text } from 'react-native';
import { getValueByCondition } from '../../Utilities/GeneralUtils';
import { LocalDataContext } from '../../Contexts/LocalDataContext';
/**
 * Arranges children in a linear layout, either vertically or horizontally.
 * 
 * @param {Object} props - Component props.
 * @param {React.ReactNode} props.children - The children components to render within the layout.
 * @param {number} props.flex - The flex value of the LinearLayout container.
 * @param {string} props.align - Alignment direction of children, either 'vertical' or 'horizontal'.
 * @param {string} props.childLayout - Child layout strategy, either 'wrap-content' or 'match-parent'.
 * @param {number} props.childMargin - Margin to apply to each child.
 * @param {boolean} props.scrollable - Whether the layout should be scrollable if children exceed the container size.
 * @param {string} props.debugBackgroundColor - dictate background color of layout for debugging purposes.
 * @param {Object} props.style - Custom styles to apply to the layout.
 * @returns {JSX.Element} The LinearLayout component.
 */

export const LinearLayout = ({
  children,
  flex = 0,
  align = 'vertical',
  childLayout = 'wrap-content',
  childMargin = 0,
  scrollable = false,
  debugBackgroundColor = 'orange',
  style,
  ...props
}) => {
  const { debugMode } = useContext(LocalDataContext);
  const isVertical = align === 'vertical';
  const marginStyle = isVertical ? { marginBottom: childMargin } : { marginRight: childMargin };

  const renderChildren = () => {
    return React.Children.map(children, (child, index) => {
      const childCustomLayout = child.props.customLayout || childLayout;
      const newStyle = {
        ...(childCustomLayout === 'match-parent' ? { flex: 1 } : {}),
      };

      return (
        <View key={index} style={[newStyle, index !== React.Children.count(children) - 1 ? marginStyle : {}]}>
          {child}
        </View>
      );
    });
  };

  const mainContent = (
    <View style={[{
      flexDirection: isVertical ? 'column' : 'row', flex: flex,
      backgroundColor: debugMode ? debugBackgroundColor : 'transparent'
    }, style]} {...props}>
      {renderChildren()}
    </View>
  );

  if (scrollable) {
    return (
      <ScrollView style={{ flex: 1, backgroundColor: debugMode ? debugBackgroundColor : 'transparent' }}
        horizontal={!isVertical} contentContainerStyle={{ flexDirection: isVertical ? 'column' : 'row' }}>
        {mainContent}
      </ScrollView>
    );
  }

  return mainContent;
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
 * @param {string} props.debugBackgroundColor - dictate background color of layout for debugging purposes.
 * @param {Object} props.style - Custom styles to apply to the layout.
 * @returns {JSX.Element} The GridLayout component.
 */
export const GridLayout = ({ children, flex = 0, columns = 2, childLayout = 'wrap-content', childMargin = 2, lastRowAlign = 'left',
  debugBackgroundColor = 'orange', style, ...props }) => {
  const { debugMode } = useContext(LocalDataContext);
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
    const debugRowBackgroundColor = isLastCol ? 'green' : 'yellow';
    row.push(
      <View key={`col-${index}`} style={{
        marginRight: isLastCol ? 0 : childMargin, marginBottom: isLastRow ? 0 : childMargin,
        backgroundColor: debugMode ? debugRowBackgroundColor : 'transparent', flex: flexVal
      }}>
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
    <View style={[{ flex: flex, backgroundColor: debugMode ? debugBackgroundColor : 'transparent' }, style]} {...props}>
      {rows.map((row, index) => {
        return row
      })}
    </View>
  );
};
