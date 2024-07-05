import React, { useContext, memo } from 'react';
import { LinearLayout } from '../Layouts/Layouts';
import { LocalDataContext } from '../../Contexts/LocalDataContext';

/**
 * General options component for rendering various types of selection controls.
 *
 * @component
 * @param {Object} props - Component props
 * @param {Object} props.schema - JSON schema representing the menu options.
 * @param {string} props.schema.label - The label for the menu option.
 * @param {number} props.schema.state - 0: unchecked, 1: checked, 2: indeterminate.
 * @param {Object} [props.schema.children] - Nested options for the menu.
 * @param {Function} props.onSelectionChange - Callback function to handle selection changes.
 * @param {Object} props.optionsContainer - Container to contain children options.
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
 * const renderOption = ({ option, isSelected, depth, onPress }) => (
 *   // render option logic here
 * );
 * 
 * const renderParentOption = ({ option, isSelected, depth, onPress }) => (
 *   // render parent option logic here
 * );
 * const optionsContainer = ({children}) => {
 *   <View>
 *     {children}
 *   </View>
 * }
 *
 * <OptionsComp 
 *   schema={schema}
 *   onSelectionChange={onSelectionChange}
 *   optionsContainer={optionsContainer}
 *   renderOption={renderOption}
 *   renderParentOption={renderParentOption} />
 */
const OptionsComp = ({ schema, onSelectionChange, optionsContainer: OptionsContainer, renderOption, renderParentOption }) => {
  const { debugMode } = useContext(LocalDataContext);

  const handleSelect = (path) => {
    // always iterate from root as schema refs might change but re-render doesn't activate
    let obj = schema[path[0]];
    let parentsRef = [obj];
    path.slice(1).map(key => {
      obj = obj.children[key];
      parentsRef.push(obj);
    });
    parentsRef = parentsRef.slice(0, -1).reverse();
    // set state for node
    obj.state = obj.state !== 1 ? 1 : 0;
    // check all children state for parent
    parentsRef.map(parent => {
      const childrenState = Object.values(parent.children).map(child => child.state);
      const currChildState = childrenState[0];
      // all children = unselected
      if (currChildState === 0) {
        parent.state = 0; 
      }
      // all children = selected
      else if (currChildState === 1) {
        parent.state = 1;
      }
      for (let i = 1; i < childrenState.length; ++i) {
        // some selected and unselected
        if (currChildState !== childrenState[i]) {
          parent.state = 2;
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
    onSelectionChange({...schema});
  };

  const renderChildrenOptions = (options, depth = 0, path = []) => {
    return Object.entries(options).map(([key, option], index) => {
      // track current path/hierarchy
      const optionPath = [...path, key];
      // render the parent option/non-leaf node
      if (option.children) {
        return <OptionsContainer key={index} depth={depth} style={{ backgroundColor: debugMode ? '#e699ff' : 'transparent' }}>
          {renderParentOption({option, onPress: () => handleSelect(optionPath)})}
          {renderChildrenOptions(option.children, depth + 1, optionPath)}
        </OptionsContainer>
      } else {
        // render child option/leaf node
        return <OptionsContainer key={index} depth={depth} style={{ backgroundColor: debugMode ? '#ccff99' : 'transparent' }}>
          {renderOption({option, onPress: () => handleSelect(optionPath)})}
        </OptionsContainer>
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
