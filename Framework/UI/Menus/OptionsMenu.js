import React, { useState, useContext } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Checkbox } from 'react-native-paper';
import { padSize025, padSize05, padSize } from '../../CommonVals';
import { LocalDataContext } from '../../Contexts/LocalDataContext';
import PropTypes from 'prop-types';

/**
 * Component for rendering a customizable options menu based on a JSON schema.
 *
 * @component
 * @param {Object} props - Component props
 * @param {Array<Object>} props.schema - JSON schema representing the menu options.
 * @param {string} props.schema[].label - The label for the menu option.
 * @param {string} props.schema[].value - The value for the menu option.
 * @param {Array<Object>} [props.schema[].children] - Nested options for the menu.
 * @param {Function} props.onSelectionChange - Callback function to handle selection changes.
 *
 * @example
 * const schema = [
 *   {
 *     label: 'Colors',
 *     value: 'colors',
 *     children: [
 *       { label: 'Red', value: 'red' },
 *       { label: 'Blue', value: 'blue' },
 *       { label: 'Green', value: 'green' },
 *     ],
 *   },
 *   {
 *     label: 'Shapes',
 *     value: 'shapes',
 *     children: [
 *       { label: 'Circle', value: 'circle' },
 *       { label: 'Square', value: 'square' },
 *     ],
 *   },
 * ];
 *
 * const handleSelectionChange = (selectedValues) => {
 *   console.log(selectedValues);
 * };
 *
 * <OptionsMenuComp schema={schema} onSelectionChange={handleSelectionChange} />
 */
const OptionsMenuComp = ({ schema, onSelectionChange }) => {
  const { debugMode } = useContext(LocalDataContext);
  const [selectedValues, setSelectedValues] = useState({});

  const handleSelect = (path, value, isSelected) => {
    const newSelectedValues = { ...selectedValues };

    if (isSelected) {
      let ref = newSelectedValues;
      for (let i = 0; i < path.length - 1; i++) {
        ref = ref[path[i]] = ref[path[i]] || {};
      }
      ref[path[path.length - 1]] = value;
    } else {
      let ref = newSelectedValues;
      for (let i = 0; i < path.length - 1; i++) {
        ref = ref[path[i]];
      }
      delete ref[path[path.length - 1]];
    }

    setSelectedValues(newSelectedValues);
    onSelectionChange(newSelectedValues);
  };

  const renderOptions = (options, path = []) => {
    return options.map((option, index) => {
      const optionPath = [...path, option.value];

      if (option.children) {
        return (
          <View key={index} style={{ paddingBottom: padSize025 }}>
            <Text>{option.label}</Text>
            {renderOptions(option.children, optionPath)}
          </View>
        );
      }

      const isSelected = optionPath.reduce((acc, key) => acc && acc[key], selectedValues) === option.value;

      return (
        <TouchableOpacity key={index} onPress={() => handleSelect(optionPath, option.value, !isSelected)}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Checkbox status={isSelected ? 'checked' : 'unchecked'} />
            <Text>{option.label}</Text>
          </View>
        </TouchableOpacity>
      );
    });
  };

  return (
    <View style={{ backgroundColor: debugMode ? '#ffcc99' : 'transparent' }}>
      {renderOptions(schema)}
    </View>
  );
};

OptionsMenuComp.propTypes = {
  /**
   * JSON schema representing the menu options.
   */
  schema: PropTypes.arrayOf(
    PropTypes.shape({
      /**
       * The label for the menu option.
       */
      label: PropTypes.string.isRequired,
      /**
       * The value for the menu option.
       */
      value: PropTypes.string.isRequired,
      /**
       * Nested options for the menu.
       */
      children: PropTypes.array,
    })
  ).isRequired,
  /**
   * Callback function to handle selection changes.
   */
  onSelectionChange: PropTypes.func.isRequired,
};

export default OptionsMenuComp;
