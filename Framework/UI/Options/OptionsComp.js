import React, { useState, useEffect, memo } from 'react';
import { View } from 'react-native';

/**
 * General options component for rendering various types of selection controls.
 *
 * @component
 * @param {Object} props - Component props
 * @param {Object} props.schema - JSON schema representing the menu structure.
 * @param {string} props.schema.label - The label for the menu option.
 * @param {Object} [props.schema.children] - Nested options for the menu.
 * @param {Function} props.onSelectionChange - Callback function to handle selection changes: (stateMap, optionPath).
 * @param {Object} props.optionsContainer - Container to contain children options.
 * @param {Function} props.renderOption - Function to render the option with the selection control.
 * @param {Function} props.renderParentOption - Function to render parent options.
 * @param {number} props.depthPadding - Padding to apply for each hierarchy level.
 *
 * @returns {JSX.Element} The OptionsComp component.
 */
const OptionsComp = ({
  schema,
  onSelectionChange,
  optionsContainer: OptionsContainer,
  renderOption,
  renderParentOption,
  depthPadding = 0,
}) => {
  // Use a map to track the state separately
  const [stateMap, setStateMap] = useState(() => {
    const generateStateMap = (obj, path = []) => {
      const map = {};
      for (const [key, value] of Object.entries(obj)) {
        const currentPath = [...path, key].join('.');
        map[currentPath] = 0; // Initial state: unchecked (0)
        if (value.children) {
          Object.assign(map, generateStateMap(value.children, [...path, key]));
        }
      }
      return map;
    };
    return generateStateMap(schema);
  });

  const handleSelect = (path) => {
    const pathKey = path.join('.');
    const updatedMap = { ...stateMap };
    const toggleState = (key) => {
      updatedMap[key] = updatedMap[key] === 1 ? 0 : 1;
    };

    // Update the selected node
    toggleState(pathKey);

    // Update parent and child states recursively
    const updateChildrenState = (parentPath, state) => {
      for (const [key] of Object.entries(schema[parentPath]?.children || {})) {
        const childPath = `${parentPath}.${key}`;
        updatedMap[childPath] = state;
        updateChildrenState(childPath, state);
      }
    };

    updateChildrenState(pathKey, updatedMap[pathKey]);

    // Propagate changes to parents (set parent to indeterminate or consistent state)
    const updateParentStates = (childPath) => {
      const parts = childPath.split('.');
      if (parts.length === 1) return; // No parent to update

      const parentPath = parts.slice(0, -1).join('.');
      const childrenStates = Object.entries(schema[parentPath]?.children || {}).map(
        ([key]) => updatedMap[`${parentPath}.${key}`]
      );
      if (childrenStates.every((state) => state === 0)) {
        updatedMap[parentPath] = 0;
      } else if (childrenStates.every((state) => state === 1)) {
        updatedMap[parentPath] = 1;
      } else {
        updatedMap[parentPath] = 2; // Indeterminate
      }

      updateParentStates(parentPath);
    };

    updateParentStates(pathKey);

    setStateMap(updatedMap);
    onSelectionChange({ ...updatedMap }, path, updatedMap[pathKey]);
  };

  const renderChildrenOptions = (options, depth = 0, path = []) => {
    return Object.entries(options).map(([key, option]) => {
      const optionPath = [...path, key];
      const optionKey = optionPath.join('.');
      const isSelected = stateMap[optionKey];

      if (option.children) {
        return (
          <View key={optionKey} style={{ paddingLeft: depthPadding * depth }}>
            {renderParentOption({ option, isSelected, onPress: () => handleSelect(optionPath) })}
            <OptionsContainer>
              {renderChildrenOptions(option.children, depth + 1, optionPath)}
            </OptionsContainer>
          </View>
        );
      } else {
        return (
          <View key={optionKey} style={{ paddingLeft: depthPadding * depth }}>
            {renderOption({ option, isSelected, onPress: () => handleSelect(optionPath) })}
          </View>
        );
      }
    });
  };

  return <View>{renderChildrenOptions(schema)}</View>;
};

export default memo(OptionsComp);