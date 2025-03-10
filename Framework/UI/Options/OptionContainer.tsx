import React, { memo, useState } from 'react';
import { View, StyleProp, ViewStyle } from 'react-native';
const _ = require('lodash');

/**
 * enum for option states
 */
export enum OptionState {
  Selected = 1,
  Unselected = 2,
  Indeterminate = 3,
}

/**
 * option schema
 */
export type OptionSchema = Record<string, OptionProps>;

/**
 * single option props
 * - each option has a state and holds nested children
 * 
 * @param label - Label to be used by derived components.
 * @param state - 1 = selected, 2 = unselected, 3 = indeterminate.
 * @param children - Nested kv pairs of single options.
 */
export type OptionProps = {
  label: string;
  state: OptionState;
  children?: OptionSchema; // children is now optional
}

/**
 * option props
 * 
 * @param schema - JSON schema representing the menu options.
 * @param setSchema - setState function for schema.
 * @param optionsContainer - Container to contain children options.
 * @param renderOption - Function to render the option with the selection control.
 * @param depthPadding - To apply padding per depth hierarchy prop to same function value.
 * @param style - Additional style on base container.
 */
export type OptionContainerProps = {
  schema: OptionSchema;
  setSchema: (updatedSchema: OptionSchema) => void;
  optionsContainer: React.FC<any>;
  renderOption: (props: { option: OptionProps, onPress: () => void }) => JSX.Element;
  depthPadding?: number;
  style?: StyleProp<ViewStyle>;
}

/**
 * base options component for rendering various types of selection same layer and nested controls
 */
export const OptionContainer: React.FC<OptionContainerProps> = memo(({
  schema,
  setSchema,
  optionsContainer: OptionsContainer,
  renderOption,
  depthPadding = 0,
  style = {},
}) => {

  // handle option selection and state management
  const handleSelect = (path: string[]) => {
    if (path.length === 0) return;
    let obj = schema[path[0]];
    if (!obj) return;

    let parentsRef = [obj];

    // ensure the path is within bounds of the schema
    for (let i = 1; i < path.length; i++) {
      if (!obj.children) {
        return;
      }
      obj = obj.children[path[i]];
      parentsRef.push(obj);
    }
    parentsRef = parentsRef.slice(0, -1).reverse();

    // reverse state for the selected node
    obj.state = obj.state === OptionState.Selected ? OptionState.Unselected : OptionState.Selected;

    // check all children states for the parent
    parentsRef.forEach((parent) => {
      const childrenState = Object.values(parent.children || {}).map((child) => child.state);
      const currChildState = childrenState[0];
      // all children = unselected
      if (currChildState === OptionState.Unselected) {
        parent.state = OptionState.Unselected;
      }
      // all children = selected
      else if (currChildState === OptionState.Selected) {
        parent.state = OptionState.Selected;
      }
      parent.state = childrenState.every((state) => state === currChildState) ? currChildState : OptionState.Indeterminate;
    });

    // update the states for all children to match the selected state
    if (obj.children) {
      const setAllToState = (currObj: OptionSchema, newState: OptionState) => {
        for (const [key, currChild] of Object.entries(currObj)) {
          currChild.state = newState;
          if (currChild.children) {
            setAllToState(currChild.children, newState);
          }
        }
      }
      setAllToState(obj.children, obj.state);
    }

    // trigger re-render with updated schema
    setSchema({ ...schema });
  }

  // recursive rendering of child options
  const renderChildrenOptions = (options: OptionSchema, depth: number = 0, depthPaddingVal: number = 0, path: string[] = []) => {
    return Object.entries(options).map(([key, option], index) => {
      // track current path/hierarchy
      const optionPath = [...path, key];

      // render the parent option/non-leaf node
      if (option.children) {
        return (
          <View key={index} style={{ paddingLeft: 0 }}>
            {renderOption({ option, onPress: () => handleSelect(optionPath) })}
            <View style={{ paddingLeft: depthPaddingVal + depthPadding }}>
              <OptionsContainer>
                {renderChildrenOptions(option.children, depth + 1, depthPaddingVal + depthPadding, optionPath)}
              </OptionsContainer>
            </View>
          </View>
        );
      } else {
        // render child option or leaf node
        return <View key={index}>{renderOption({ option, onPress: () => handleSelect(optionPath) })}</View>;
      }
    });
  }

  return (
    <View style={style}>
      {renderChildrenOptions(schema)}
    </View>
  );
});