import React from 'react';
import { View } from 'react-native';

// Base Layout Component
const Layout = ({
  children,
  backgroundColor = 'transparent',
  size = 'wrapContent',
  flex = 0,
  horizontalAlign = 'left',
  verticalAlign = 'top',
  overflow = 'none',
  padding = 0,
  margin = 0,
  flexDirection = 'column', // default flexDirection for vertical layout
  ...props
}) => {
  const alignmentStyles = {
    alignItems: horizontalAlign === 'left' ? 'flex-start' :
                horizontalAlign === 'center' ? 'center' :
                'flex-end',
    justifyContent: verticalAlign === 'top' ? 'flex-start' :
                   verticalAlign === 'center' ? 'center' :
                   'flex-end',
  };

  const sizeStyles = size === 'wrapContent' ? { flexShrink: 1 } : { flex: flex || 1 };

  return (
    <View
      style={[
        { backgroundColor, padding, margin, flexDirection, overflow, ...alignmentStyles },
        sizeStyles,
      ]}
      {...props}
    >
      {children}
    </View>
  );
};

// Exporting specific layout variations
export const VerticalLayout = (props) => <Layout {...props} flexDirection="column" />;
export const HorizontalLayout = (props) => <Layout {...props} flexDirection="row" />;
export const GridLayout = (props) => <Layout {...props} flexDirection="row" flexWrap="wrap" />;
export const ScrollLayout = (props) => <Layout {...props} flexDirection="column" overflow="scroll" />;
