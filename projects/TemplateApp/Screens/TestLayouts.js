import React, { memo, useContext } from 'react';
import { View, StyleSheet } from 'react-native';

/**
 * base layout component
 * @param {object} props
 * @param {'row' | 'column'} props.direction - flex direction
 * @param {'flex-start' | 'center' | 'flex-end'} [props.align='flex-start'] - alignment of children
 * @param {boolean} [props.reverse=false] - reverse the order of children
 * @param {'wrap' | 'fill'} [props.constraint='wrap'] - determines if children wrap or fill parent
 * @param {number} [props.childMargin=0] - margin between child elements
 * @param {number} [props.margin=0] - outer margin for the layout
 * @param {number} [props.padding=0] - inner padding for the layout
 * @param {object} [props.style={}] - additional custom styles for the layout
 * @param {React.ReactNode} props.children - child elements
 */
const Layout = ({
  direction,
  align = 'flex-start',
  reverse = false,
  constraint = 'wrap',
  childMargin = 0,
  margin = 0,
  padding = 0,
  style = {},
  children,
}) => {
  const arrangedChildren = React.Children.toArray(children).filter(child => React.isValidElement(child));
  if (reverse) {
    arrangedChildren.reverse();
  }
  
  const containerStyle = StyleSheet.create({
    container: {
      flexDirection: direction,
      justifyContent: align,
      flexWrap: constraint === 'wrap' ? 'wrap' : 'nowrap',
      margin,
      padding,
      ...style,
    },
  });

  return (
    <View style={containerStyle.container}>
      {arrangedChildren.map((child, index) =>
        <View style={{ padding: childMargin / 2 }} key={index}>{child}</View>
      )}
    </View>
  );
};

/**
 * Grid Layout Component
 * @param {object} props
 * @param {'row' | 'column'} [props.direction='row'] - layout direction
 * @param {boolean} [props.reverse=false] - reverse the order of children
 * @param {'fixed' | 'centered'} [props.alignment='fixed'] - alignment of elements in grid
 * @param {number} [props.spacing=0] - space between grid items
 * @param {number} [props.itemsPerLine=2] - number of items per row/column
 * @param {object} [props.style={}] - additional custom styles for the grid
 * @param {React.ReactNode} props.children - child elements
 */
export const GridLayout = memo(({
  direction = 'row',
  reverse = false,
  alignment = 'fixed',
  spacing = 0,
  itemsPerLine = 2,
  style = {},
  children,
}) => {
  const arrangedChildren = React.Children.toArray(children).filter(child =>
    React.isValidElement(child)
  );
  if (reverse) {
    arrangedChildren.reverse();
  }

  const containerStyle = StyleSheet.create({
    container: {
      flexDirection: direction === 'row' ? 'column' : 'row',
      flexWrap: 'wrap',
      alignItems: alignment === 'centered' ? 'flex-start' : 'stretch',
      ...style,
    },
  });

  const itemStyle = StyleSheet.create({
    item: {
      margin: spacing / 2,
      flexBasis: `${100 / itemsPerLine}%`,
      maxWidth: `${100 / itemsPerLine}%`,
    },
  });

  return (
    <View style={containerStyle.container}>
      {arrangedChildren.map((child, index) => (
        <View style={itemStyle.item} key={index}>
          {child}
        </View>
      ))}
    </View>
  );
});


/**
 * Vertical Layout Component
 */
export const VerticalLayout = memo((props) => <Layout {...props} direction="column" />);

/**
 * Horizontal Layout Component
 */
export const HorizontalLayout = memo((props) => <Layout {...props} direction="row" />);