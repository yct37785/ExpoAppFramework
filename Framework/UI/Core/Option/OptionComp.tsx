import React, { useContext, memo, useState } from 'react';
import { View, StyleProp, ViewStyle } from 'react-native';

/**
 * single option props
 * - each option has a state and holds nested children
 * 
 * @param state: 1 = selected, 2 = unselected, 3 = indeterminate
 */
export interface IOptionProps {
  state: number;
  children?: Record<string, IOptionProps>;
};

/**
 * options component props
 *
 * @param originalSchema - JSON schema representing the menu options.
 * @param onSelectionChange - Callback function to handle selection changes: updatedSchema, optionPath, optionRef.
 * @param optionsContainer - Container to contain children options.
 * @param renderOption - Function to render the option with the selection control.
 * @param depthPadding - to apply padding per depth hierarchy prop to same function value.
 * @param style - Additional style on base container.
 */
export interface IOptionCompProps {
  originalSchema: Record<string, IOptionProps>;
  onSelectionChange: (updatedSchema: Record<string, IOptionProps>, optionPath: string[]) => void;
  optionsContainer: React.FC<any>;
  renderOption: (props: { option: IOptionProps, onPress: () => void }) => JSX.Element;
  depthPadding?: number;
  style?: StyleProp<ViewStyle>;
};

/**
 * General options component for rendering various types of selection controls.
 */
const OptionComp: React.FC<IOptionCompProps> = ({
  originalSchema,
  onSelectionChange,
  optionsContainer: OptionsContainer,
  renderOption,
  depthPadding = 0,
  style = {},
}) => {

  // utility function to clone schema with initial state
  const deepCloneWithState = (obj: Record<string, IOptionProps>, initialState: number = 1): Record<string, IOptionProps> => {
    const clone: Record<string, IOptionProps> = {};
    for (const [key, value] of Object.entries(obj)) {
      clone[key] = {
        ...value, // clone existing properties
        state: initialState,
      };
      if (value.children) {
        // recursively clone children
        clone[key].children = deepCloneWithState(value.children, initialState);
      }
    }
    return clone;
  };
  const [schema, setSchema] = useState<Record<string, IOptionProps>>(deepCloneWithState(originalSchema, 2));

  // handle option selection and state management
  const handleSelect = (path: string[]) => {
    // always iterate from root as schema refs might change but re-render doesn't activate
    let obj = schema[path[0]];
    let parentsRef = [obj];
    path.slice(1).map((key) => {
      obj = obj.children![key];
      parentsRef.push(obj);
    });
    parentsRef = parentsRef.slice(0, -1).reverse();

    // reverse state for node
    obj.state = obj.state === 1 ? 2 : 1;

    // check all children state for parent
    parentsRef.forEach((parent) => {
      const childrenState = Object.values(parent.children || {}).map((child) => child.state);
      const currChildState = childrenState[0];
      // all children = unselected
      if (currChildState === 2) {
        parent.state = 2; 
      }
      // all children = selected
      else if (currChildState === 1) {
        parent.state = 1;
      }
      else {
        parent.state = childrenState.every((state) => state === currChildState) ? currChildState : 3;
      }
    });

    // update the states for all children to match the selected state
    if (obj.children) {
      const setAllToState = (currObj: Record<string, IOptionProps>, newState: number) => {
        for (const [key, currChild] of Object.entries(currObj)) {
          currChild.state = newState;
          if (currChild.children) {
            setAllToState(currChild.children, newState);
          }
        }
      };
      setAllToState(obj.children, obj.state);
    }
    setSchema({...schema});
    onSelectionChange({...schema}, path);
  };

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
        return <View key={index}>
          {renderOption({ option, onPress: () => handleSelect(optionPath) })}
        </View>
      }
    });
  };

  return (
    <View style={style}>
      {renderChildrenOptions(schema)}
    </View>
  );
};

export default memo(OptionComp);