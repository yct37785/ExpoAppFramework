import React, { useState, useContext, memo } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Checkbox, Text } from 'react-native-paper';
import { LinearLayout } from '../Layouts/Layouts';
import { padSize025, padSize05, padSize } from '../../Index/CommonVals';
import { LocalDataContext } from '../../Contexts/LocalDataContext';

/**
 * Component for rendering checkbox options based on a JSON schema.
 *
 * @component
 * @param {Object} props - Component props
 * @param {Array<Object>} props.schema - JSON schema representing the menu options.
 * @param {string} props.schema[].label - The label for the menu option.
 * @param {string} props.schema[].value - The value for the menu option.
 * @param {Array<Object>} [props.schema[].children] - Nested options for the menu.
 * @param {Function} props.onSelectionChange - Callback function to handle selection changes.
 * @returns {JSX.Element} The CheckOptions component.
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
const CheckOptions = ({ schema, onSelectionChange }) => {
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

  const renderOptions = (options, depth = 0, path = []) => {
    return options.map((option, index) => {
      const optionPath = [...path, option.value];
      const padding = padSize * depth;

      if (option.children) {
        const isGrandparent = !!option.children[0]?.children;
        return (
          <View key={index} style={{ paddingLeft: padding, backgroundColor: debugMode ? '#e699ff' : 'transparent' }}>
            <Text style={{ paddingBottom: isGrandparent ? padSize05 : 0 }}>{option.label}</Text>
            {renderOptions(option.children, depth + 1, optionPath)}
          </View>
        );
      }

      const isSelected = optionPath.reduce((acc, key) => acc && acc[key], selectedValues) === option.value;

      return (
        <TouchableOpacity key={index} onPress={() => handleSelect(optionPath, option.value, !isSelected)}>
          <View style={{ paddingLeft: padding, flexDirection: 'row', alignItems: 'center', backgroundColor: debugMode ? '#ccff99' : 'transparent' }}>
            <Checkbox status={isSelected ? 'checked' : 'unchecked'} />
            <Text>{option.label}</Text>
          </View>
        </TouchableOpacity>
      );
    });
  };

  return (
    <LinearLayout>
      {renderOptions(schema)}
    </LinearLayout>
  );
};

export default memo(CheckOptions);