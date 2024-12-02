import React from 'react';
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
 * Vertical Layout Component
 */
export const VerticalLayout = (props) => <Layout {...props} direction="column" />;

/**
 * Horizontal Layout Component
 */
export const HorizontalLayout = (props) => <Layout {...props} direction="row" />;
