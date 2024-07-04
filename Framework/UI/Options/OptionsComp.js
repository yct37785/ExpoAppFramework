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
 * @param {number} props.schema.state - 0: unselected, 1: selected, 2: partially selected (for parent options).
 * @param {Object} [props.schema.children] - Nested options for the menu.
 * @param {Function} props.onSelectionChange - Callback function to handle selection changes.
 * @param {Function} props.renderOption - Function to render the option with the selection control.
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
 * <OptionsComp 
 *   schema={schema}
 *   onSelectionChange={onSelectionChange}
 *   renderOption={renderOption} />
 */
const OptionsComp = ({ schema, onSelectionChange, renderOption }) => {
  const { debugMode } = useContext(LocalDataContext);

  const handleSelect = (path, isSelected) => {
    const updateSchema = (obj, path, isSelected) => {
      if (path.length === 1) {
        obj[path[0]].state = isSelected ? 1 : 0;
      } else {
        updateSchema(obj[path[0]].children, path.slice(1), isSelected);
      }
      
      // Update the parent state
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

  const renderOptions = (options, depth = 0, path = []) => {
    return Object.entries(options).map(([key, option], index) => {
      // track current path/hierarchy
      const optionPath = [...path, key];
      const isSelected = option.state === 1;
      return (
        <View key={index} style={{ backgroundColor: debugMode ? '#e699ff' : 'transparent' }}>
          {/* render the option */}
          {renderOption({option, isSelected, depth, onPress: () => handleSelect(optionPath, isSelected)
          })}
          {/* if have children/non-leaf node */}
          {option.children ? renderOptions(option.children, depth + 1, optionPath) : null}
        </View>
      );
      // #ccff99
    });
  };

  return (
    <LinearLayout>
      {renderOptions(schema)}
    </LinearLayout>
  );
};

export default memo(OptionsComp);
