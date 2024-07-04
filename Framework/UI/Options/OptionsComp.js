import React, { useContext, memo } from 'react';
import { View } from 'react-native';
import { LinearLayout } from '../Layouts/Layouts';
import { LocalDataContext } from '../../Contexts/LocalDataContext';

/**
 * General options component for rendering various types of selection controls.
 *
 * @component
 * @param {Object} props - Component props
 * @param {Object} props.schema - JSON schema representing the menu options.
 * @param {string} props.schema.label - The label for the menu option.
 * @param {number} props.schema.state - 0: unselected, 1: selected.
 * @param {Object} [props.schema.children] - Nested options for the menu.
 * @param {Function} props.onSelectionChange - Callback function to handle selection changes.
 * @param {Function} props.renderOption - Function to render the option with the selection control.
 * @param {Function} props.renderParentOption - Function to render parent options, if same as renderOption just set
 * prop to same function value.
 * @returns {JSX.Element} The OptionsComp component.
 *
 * @example
 * const schema = {
 *   label: 'Colors',
 *   state: 0,
 *   children: {
 *     red: { label: 'Red', state: 0 },
 *     blue: { label: 'Blue', state: 0 },
 *     green: { label: 'Green', state: 0 },
 *   },
 * };
 *
 * const onSelectionChange = (updatedSchema) => {
 *   console.log(updatedSchema);
 * };
 * 
 * const renderOption = ({ option, isSelected, depth, onPress }) => (
 *   // render option logic here
 * );
 * 
 * 
 * const renderParentOption = ({ option, isSelected, depth, onPress }) => (
 *   // render parent option logic here
 * );
 *
 * <OptionsComp 
 *   schema={schema}
 *   onSelectionChange={onSelectionChange}
 *   renderOption={renderOption}
 *   renderParentOption={renderParentOption} />
 */
const OptionsComp = ({ schema, onSelectionChange, renderOption, renderParentOption }) => {
  const { debugMode } = useContext(LocalDataContext);

  const handleSelect = (path, isSelected) => {
    const updateSchema = (obj, path, isSelected) => {
      // toggles a state for an option/node, recursively sets children state to match parent (1 or 0)
      const toggleState = (node, state) => {
        node.state = state;
        if (node.children) {
          Object.values(node.children).forEach(child => toggleState(child, state));
        }
      };
      if (path.length === 1) {
        // propagate state downwards to all descendants
        toggleState(obj[path[0]], isSelected ? 1 : 0);
      } else {
        updateSchema(obj[path[0]].children, path.slice(1), isSelected);
      }
      
      // check descendant states
      const parentState = calculateParentState(obj[path[0]]);
      obj[path[0]].state = parentState;
    };

    const calculateParentState = (parent) => {
      if (!parent.children) return parent.state;

      const childrenStates = Object.values(parent.children).map(child => child.state);

      if (childrenStates.every(state => state === 1)) {
        return 1;
      } else if (childrenStates.every(state => state === 0)) {
        return 0;
      } else {
        return 2;
      }
    };

    const newSchema = { ...schema };
    updateSchema(newSchema, path, !isSelected);

    onSelectionChange(newSchema);
  };

  const renderChildrenOptions = (options, depth = 0, path = []) => {
    return Object.entries(options).map(([key, option], index) => {
      // track current path/hierarchy
      const optionPath = [...path, key];
      const isSelected = option.state === 1;
      // render the parent option/non-leaf node
      if (option.children) {
        return <View key={index} style={{ backgroundColor: debugMode ? '#e699ff' : 'transparent' }}>
          {renderParentOption({option, isSelected, depth, onPress: () => handleSelect(optionPath, isSelected)})}
          {renderChildrenOptions(option.children, depth + 1, optionPath)}
        </View>
      } else {
        // render child option/leaf node
        return <View key={index} style={{ backgroundColor: debugMode ? '#ccff99' : 'transparent' }}>
          {renderOption({option, isSelected, depth, onPress: () => handleSelect(optionPath, isSelected)})}
        </View>
      }
    });
  };

  return (
    <LinearLayout>
      {renderChildrenOptions(schema)}
    </LinearLayout>
  );
};

export default memo(OptionsComp);
