import React, { useContext, memo, useState } from 'react';
import { View } from 'react-native';
import { VerticalLayout } from '../Layout/Layout';

/**
 * General options component for rendering various types of selection controls.
 * 
 * state: 1 = selected, 2 = unselected, 3 = indeterminate
 *
 * @component
 * @param {Object} props - Component props
 * @param {Object} props.originalSchema - JSON schema representing the menu options.
 * @param {Function} props.onSelectionChange - Callback function to handle selection changes: updatedSchema, optionPath, optionRef.
 * @param {Object} props.optionsContainer - Container to contain children options.
 * @param {Function} props.renderOption - Function to render the option with the selection control.
 * @param {Function} props.renderParentOption - Function to render parent options, if same as renderOption just set
 * @param {number} props.depthPadding - to apply padding per depth hierarchy.
 * prop to same function value.
 * @param {Object} [props.style={}] - Additional style on base container.
 * 
 * @returns {JSX.Element} The OptionsComp component.
 */
const OptionComp = ({
  originalSchema,
  onSelectionChange,
  optionsContainer: OptionsContainer,
  renderOption,
  renderParentOption,
  depthPadding = 0,
  style={}
}) => {

  const deepCloneWithState = (obj, initialState = 1) => {
    const clone = {};
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
  const [schema, setSchema] = useState(deepCloneWithState(originalSchema, 2));

  const handleSelect = (path) => {
    // always iterate from root as schema refs might change but re-render doesn't activate
    let obj = schema[path[0]];
    let parentsRef = [obj];
    path.slice(1).map(key => {
      obj = obj.children[key];
      parentsRef.push(obj);
    });
    parentsRef = parentsRef.slice(0, -1).reverse();
    // reverse state for node
    obj.state = obj.state === 1 ? 2 : 1;
    // check all children state for parent
    parentsRef.map(parent => {
      const childrenState = Object.values(parent.children).map(child => child.state);
      const currChildState = childrenState[0];
      // all children = unselected
      if (currChildState === 2) {
        parent.state = 2; 
      }
      // all children = selected
      else if (currChildState === 1) {
        parent.state = 1;
      }
      for (let i = 1; i < childrenState.length; ++i) {
        // some selected and unselected
        if (currChildState !== childrenState[i]) {
          parent.state = 3;
          break;
        }
      }
    });
    // all children options to match state of current
    if (obj.children) {
      const setAllToState = (currObj, newState) => {
        for (const [key, currChild] of Object.entries(currObj)) {
          currChild.state = newState;
          if (currChild.children) {
            setAllToState(currChild.children, newState);
          }
        }
      }
      setAllToState(obj.children, obj.state);
    }
    setSchema({...schema});
    onSelectionChange({...schema}, path);
  };

  const renderChildrenOptions = (options, depth = 0, depthPaddingVal = 0, path = []) => {
    return Object.entries(options).map(([key, option], index) => {
      // track current path/hierarchy
      const optionPath = [...path, key];
      // render the parent option/non-leaf node
      if (option.children) {
        return <View key={index} style={{ paddingLeft: 0 }}>
          {renderOption({ option, onPress: () => handleSelect(optionPath) })}
          <View style={{ paddingLeft: depthPaddingVal + depthPadding }}>
            <OptionsContainer>
              {renderChildrenOptions(option.children, depth + 1, depthPaddingVal + depthPadding, optionPath)}
            </OptionsContainer>
          </View>
        </View>
      } else {
        // render child option/leaf node
        return <View key={index}>
          {renderOption({ option, onPress: () => handleSelect(optionPath) })}
        </View>
      }
    });
  };

  return (
    <VerticalLayout style={style}>
      {renderChildrenOptions(schema)}
    </VerticalLayout>
  );
};

export default memo(OptionComp);