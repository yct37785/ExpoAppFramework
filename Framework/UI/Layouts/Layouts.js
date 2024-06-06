import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { padSize } from '../../Common/Values';

/**
 * Common layout component with alignment, size, and overflow handling.
 * 
 * @param {Object} props - Component props.
 * @param {React.ReactNode} props.children - Content to be rendered within the layout.
 * @param {string} [props.horizontalAlign='left'] - Horizontal alignment: 'left', 'center', or 'right'.
 * @param {string} [props.verticalAlign='top'] - Vertical alignment: 'top', 'center', or 'bottom'.
 * @param {string} [props.size='wrapContent'] - Size: 'wrapContent' or 'fitParent'.
 * @param {string} [props.overflow='none'] - Overflow handling: 'wrap', 'scroll', or 'none'.
 * @param {string} [props.padding=padSize] - Padding around the content.
 * @param {string} [props.backgroundColor] - Background color of the layout.
 * @param {number} [props.flex=1] - Flex value for the layout.
 * @param {string} [props.direction='column'] - Flex direction: 'row' or 'column'.
 * @returns {JSX.Element} The layout component.
 */
const Layout = ({
  children,
  horizontalAlign = 'left',
  verticalAlign = 'top',
  size = 'wrapContent',
  overflow = 'none',
  padding = padSize,
  backgroundColor,
  flex = 1,
  direction = 'column',
}) => {
  const styles = createStyles({ horizontalAlign, verticalAlign, size, padding, backgroundColor, flex, direction });

  if (overflow === 'scroll') {
    return (
      <ScrollView contentContainerStyle={styles.container}>
        {children}
      </ScrollView>
    );
  }

  return <View style={styles.container}>{children}</View>;
};

/**
 * Creates styles for the layout component.
 * 
 * @param {Object} options - Style options.
 * @param {string} options.horizontalAlign - Horizontal alignment.
 * @param {string} options.verticalAlign - Vertical alignment.
 * @param {string} options.size - Size of the container.
 * @param {string} options.padding - Padding around the content.
 * @param {string} options.backgroundColor - Background color of the layout.
 * @param {number} options.flex - Flex value for the layout.
 * @param {string} options.direction - Flex direction.
 * @returns {Object} The generated styles.
 */
const createStyles = ({ horizontalAlign, verticalAlign, size, padding, backgroundColor, flex, direction }) => {
  return StyleSheet.create({
    container: {
      flex: flex,
      padding,
      flexDirection: direction,
      justifyContent: verticalAlignToFlex(verticalAlign),
      alignItems: horizontalAlignToFlex(horizontalAlign),
      backgroundColor,
    },
  });
};

/**
 * Converts vertical alignment to flexbox justifyContent value.
 * 
 * @param {string} align - Vertical alignment.
 * @returns {string} The flexbox justifyContent value.
 */
const verticalAlignToFlex = (align) => {
  switch (align) {
    case 'center':
      return 'center';
    case 'bottom':
      return 'flex-end';
    case 'top':
    default:
      return 'flex-start';
  }
};

/**
 * Converts horizontal alignment to flexbox alignItems value.
 * 
 * @param {string} align - Horizontal alignment.
 * @returns {string} The flexbox alignItems value.
 */
const horizontalAlignToFlex = (align) => {
  switch (align) {
    case 'center':
      return 'center';
    case 'right':
      return 'flex-end';
    case 'left':
    default:
      return 'flex-start';
  }
};

// Specific Layout Components
export const HorizontalLayout = (props) => <Layout {...props} direction="row" />;
export const VerticalLayout = (props) => <Layout {...props} direction="column" />;
export const GridLayout = (props) => <Layout {...props} direction="row" overflow="wrap" />;
export const ScrollLayout = (props) => <Layout {...props} overflow="scroll" />;
