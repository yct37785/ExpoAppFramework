import React, { memo, useContext, useState, useCallback, useEffect } from 'react';
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
 * @param {number} [props.spacing=0] - space between grid items
 * @param {number} [props.itemsPerLine=2] - number of items per row/column
 * @param {object} [props.style={}] - additional custom styles for the grid
 * @param {React.ReactNode} props.children - child elements
 */
const useComponentSize = () => {
  const [size, setSize] = useState(null);

  const onLayout = useCallback(event => {
    const { width, height } = event.nativeEvent.layout;
    setSize({ width, height });
  }, []);

  return [size, onLayout];
};

export const GridLayout = memo(({
  direction = 'row',
  reverse = false,
  spacing = 0,
  itemsPerLine = 2,
  style = {},
  children,
}) => {
  const [size, onLayout] = useComponentSize();
  const arrangedChildren = React.Children.toArray(children).filter(child =>
    React.isValidElement(child)
  );
  if (reverse) {
    arrangedChildren.reverse();
  }

  const containerStyle = StyleSheet.create({
    container: {
      flexDirection: direction === 'row' ? 'row' : 'column',
      flexWrap: 'wrap',
      ...style,
    },
  });

  const itemStyle = StyleSheet.create({
    item: {
      backgroundColor: 'yellow',
      margin: spacing / 2,
      width: size ? (size.width / itemsPerLine) - spacing : 0
    },
  });

  return (
    <View style={containerStyle.container} onLayout={onLayout}>
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