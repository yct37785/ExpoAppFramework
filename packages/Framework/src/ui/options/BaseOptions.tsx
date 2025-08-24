import React, { memo, JSX } from 'react';
import { View, StyleProp, ViewStyle } from 'react-native';

/******************************************************************************************************************
 * Option state
 *
 * Enum representing the three possible states of an option:
 * - Selected: option is checked/active
 * - Unselected: option is not checked/inactive
 * - Indeterminate: option has mixed child states (some selected, some unselected)
 ******************************************************************************************************************/
export enum OptionState {
  Selected = 1,
  Unselected = 2,
  Indeterminate = 3,
}

/******************************************************************************************************************
 * Option schema
 *
 * A recursive JSON schema structure describing the tree of selectable options.
 * Each key corresponds to an option, which may itself contain nested children.
 ******************************************************************************************************************/
export type OptionSchema = Record<string, OptionProps>;

/******************************************************************************************************************
 * Option props
 *
 * Represents a single option node in the schema.
 *
 * @property label - human-readable label for the option
 * @property state - current selection state (Selected, Unselected, Indeterminate)
 * @property children - optional nested schema of child options
 ******************************************************************************************************************/
export type OptionProps = {
  label: string;
  state: OptionState;
  children?: OptionSchema;
};

type BaseOptionsProps = {
  schema: OptionSchema;
  setSchema: (updatedSchema: OptionSchema) => void;
  optionsContainer: React.FC<any>;
  renderOption: (props: { option: OptionProps; onPress: () => void }) => JSX.Element;
  depthPadding?: number;
  style?: StyleProp<ViewStyle>;
};

/******************************************************************************************************************
 * Base options component
 *
 * Recursive engine component that powers option selection and rendering.
 *
 * Responsibilities:
 * - Handles toggling between Selected / Unselected
 * - Propagates selection state downward to children
 * - Aggregates children states upward to compute Indeterminate state
 * - Supports recursive rendering of nested options
 *
 * @param schema - JSON schema representing the menu options
 * @param setSchema - callback to update schema state
 * @param optionsContainer - component to wrap child option groups
 * @param renderOption - render function for a single option (with selection control)
 * @param depthPadding - extra padding applied per hierarchy depth
 * @param style - additional style for the root container
 * 
 * @returns JSX.Element - recursively rendered options component
 ******************************************************************************************************************/
export const BaseOptions: React.FC<BaseOptionsProps> = memo(
  ({ schema, setSchema, optionsContainer: OptionsContainer, renderOption, depthPadding = 0, style = {} }) => {
    /**
     * Handles selecting/deselecting an option.
     * - Flips the state of the target node
     * - Updates all child nodes (cascade)
     * - Recomputes all parent states (indeterminate logic)
     */
    const handleSelect = (path: string[]) => {
      if (path.length === 0) return;
      let obj = schema[path[0]];
      if (!obj) return;

      let parentsRef = [obj];

      // traverse down the schema following the path
      for (let i = 1; i < path.length; i++) {
        if (!obj.children) return;
        obj = obj.children[path[i]];
        parentsRef.push(obj);
      }
      parentsRef = parentsRef.slice(0, -1).reverse();

      // flip state of the selected option
      obj.state = obj.state === OptionState.Selected ? OptionState.Unselected : OptionState.Selected;

      // update all parent nodes based on child states
      parentsRef.forEach((parent) => {
        const childrenState = Object.values(parent.children || {}).map((child) => child.state);
        const firstState = childrenState[0];
        parent.state = childrenState.every((s) => s === firstState) ? firstState : OptionState.Indeterminate;
      });

      // cascade state down to all children
      if (obj.children) {
        const setAllToState = (currObj: OptionSchema, newState: OptionState) => {
          for (const child of Object.values(currObj)) {
            child.state = newState;
            if (child.children) setAllToState(child.children, newState);
          }
        };
        setAllToState(obj.children, obj.state);
      }

      // trigger re-render with updated schema
      setSchema({ ...schema });
    };

    /**
     * recursively renders options and their children
     */
    const renderChildrenOptions = (
      options: OptionSchema,
      depth: number = 0,
      depthPaddingVal: number = 0,
      path: string[] = []
    ) => {
      return Object.entries(options).map(([key, option], index) => {
        const optionPath = [...path, key];
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
          return <View key={index}>{renderOption({ option, onPress: () => handleSelect(optionPath) })}</View>;
        }
      });
    };

    return <View style={style}>{renderChildrenOptions(schema)}</View>;
  }
);
