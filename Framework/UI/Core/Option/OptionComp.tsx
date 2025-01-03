import React, { memo, useState } from 'react';
import { View, StyleProp, ViewStyle } from 'react-native';
const _ = require('lodash');

/**
 * Enum for Option States
 */
export enum OptionState {
  Selected = 1,
  Unselected = 2,
  Indeterminate = 3,
}

/**
 * Single option props
 * - Each option has a state and holds nested children
 * 
 * @param label - Label to be used by derived components.
 * @param state - 1 = selected, 2 = unselected, 3 = indeterminate.
 * @param children - Nested kv pairs of single options.
 */
export interface IOptionProps {
  label: string;
  state: OptionState;
  children?: Record<string, IOptionProps>; // children is now optional
}

/**
 * onSelectionChange function signature
 * 
 * @param updatedSchema - Updated schema shallow cloned.
 * @param optionPath - Array of string with keys of updated option path.
 */
export type onOptionSelectionChangeFunc = (updatedSchema: Record<string, IOptionProps>, optionPath: string[]) => void;

/**
 * Options component props
 * 
 * @param originalSchema - JSON schema representing the menu options.
 * @param onSelectionChange - Callback function to handle selection changes: updatedSchema, optionPath, optionRef.
 * @param optionsContainer - Container to contain children options.
 * @param renderOption - Function to render the option with the selection control.
 * @param depthPadding - To apply padding per depth hierarchy prop to same function value.
 * @param style - Additional style on base container.
 */
export interface IOptionCompProps {
  originalSchema: Record<string, IOptionProps>;
  onSelectionChange: onOptionSelectionChangeFunc;
  optionsContainer: React.FC<any>;
  renderOption: (props: { option: IOptionProps, onPress: () => void }) => JSX.Element;
  depthPadding?: number;
  style?: StyleProp<ViewStyle>;
}

/**
 * General options component for rendering various types of selection same layer and nested controls.
 */
const OptionComp: React.FC<IOptionCompProps> = ({
  originalSchema,
  onSelectionChange,
  optionsContainer: OptionsContainer,
  renderOption,
  depthPadding = 0,
  style = {},
}) => {

  const [schema, setSchema] = useState<Record<string, IOptionProps>>(_.cloneDeep(originalSchema));

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
      const setAllToState = (currObj: Record<string, IOptionProps>, newState: OptionState) => {
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
    onSelectionChange({ ...schema }, path);
  }

  // recursive rendering of child options
  const renderChildrenOptions = (options: Record<string, IOptionProps>, depth: number = 0, depthPaddingVal: number = 0, path: string[] = []) => {
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
}

export default memo(OptionComp);
