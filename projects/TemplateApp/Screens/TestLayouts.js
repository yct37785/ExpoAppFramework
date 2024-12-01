import React from 'react';
import { View, StyleSheet } from 'react-native';

/**
 * Base Layout Component
 * @param {object} props
 * @param {'row' | 'column'} props.direction - Flex direction.
 * @param {'flex-start' | 'center' | 'flex-end'} [props.align='flex-start'] - Alignment of children.
 * @param {boolean} [props.reverse=false] - Reverse the order of children.
 * @param {'wrap' | 'fill'} [props.constraint='wrap'] - Determines if children wrap or fill parent.
 * @param {number} [props.childMargin=0] - Margin between child elements.
 * @param {number} [props.margin=0] - Outer margin for the layout.
 * @param {number} [props.padding=0] - Inner padding for the layout.
 * @param {React.ReactNode} props.children - The child elements.
 */
const Layout = ({
  direction,
  align = 'flex-start',
  reverse = false,
  constraint = 'wrap',
  childMargin = 0,
  margin = 0,
  padding = 0,
  children,
}) => {
  // Generate dynamic styles for children
  const childStyle = {
    marginHorizontal: childMargin / 2,
    marginVertical: childMargin / 2,
  };

  // Reverse children if needed
  const arrangedChildren = React.Children.toArray(children).map((child, index) =>
    React.cloneElement(child, { style: [child.props.style, childStyle] })
  );
  if (reverse) {
    arrangedChildren.reverse();
  }

  // Main container styles
  const containerStyle = StyleSheet.create({
    container: {
      flexDirection: direction,
      alignItems: align,
      flexWrap: constraint === 'wrap' ? 'wrap' : 'nowrap',
      margin,
      padding,
    },
  });

  return <View style={containerStyle.container}>{arrangedChildren}</View>;
};

/**
 * Vertical Layout Component
 */
export const VerticalLayout = (props) => <Layout {...props} direction="column" />;

/**
 * Horizontal Layout Component
 */
export const HorizontalLayout = (props) => <Layout {...props} direction="row" />;
