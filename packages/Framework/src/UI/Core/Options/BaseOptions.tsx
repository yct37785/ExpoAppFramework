import React, { memo } from 'react';
import { View } from 'react-native';
import { OptionState, OptionSchema, BaseOptionsType } from './BaseOptions.types';

/******************************************************************************************************************
 * Helper: cascade a state to all children recursively.
 ******************************************************************************************************************/
const setAllToState = (currObj: OptionSchema, newState: OptionState) => {
  for (const child of Object.values(currObj)) {
    child.state = newState;
    if (child.children) {
      setAllToState(child.children, newState);
    }
  }
};

/******************************************************************************************************************
 * BaseOptions implementation.
 ******************************************************************************************************************/
export const BaseOptions: BaseOptionsType = memo(
  ({
    schema,
    setSchema,
    optionsContainer: OptionsContainer,
    renderOption,
    depthPadding = 0,
    style,
  }) => {
    /**
     * Handles selecting/deselecting an option:
     * - Flips the state of the target node.
     * - Updates all child nodes (cascade).
     * - Recomputes all parent states (indeterminate logic).
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

      // parentsRef: all ancestors EXCEPT the selected node, from closest parent upwards
      parentsRef = parentsRef.slice(0, -1).reverse();

      // flip state of the selected option
      obj.state =
        obj.state === OptionState.Selected
          ? OptionState.Unselected
          : OptionState.Selected;

      // update all parent nodes based on child states
      parentsRef.forEach((parent) => {
        const childrenState = Object.values(parent.children || {}).map(
          (child) => child.state
        );
        if (childrenState.length === 0) return;

        const firstState = childrenState[0];
        parent.state = childrenState.every((s) => s === firstState)
          ? firstState
          : OptionState.Indeterminate;
      });

      // cascade state down to all children
      if (obj.children) {
        setAllToState(obj.children, obj.state);
      }

      // trigger re-render with updated schema
      setSchema({ ...schema });
    };

    /**
     * Recursively renders options and their children.
     */
    const renderChildrenOptions = (
      options: OptionSchema,
      depthPaddingVal: number = 0,
      path: string[] = []
    ) => {
      return Object.entries(options).map(([key, option]) => {
        const optionPath = [...path, key];
        const keyStr = optionPath.join('/');

        if (option.children) {
          return (
            <View key={keyStr}>
              {renderOption({
                option,
                onPress: () => handleSelect(optionPath),
              })}
              <View style={{ paddingLeft: depthPaddingVal + depthPadding }}>
                <OptionsContainer>
                  {renderChildrenOptions(
                    option.children,
                    depthPaddingVal + depthPadding,
                    optionPath
                  )}
                </OptionsContainer>
              </View>
            </View>
          );
        }

        return (
          <View key={keyStr}>
            {renderOption({
              option,
              onPress: () => handleSelect(optionPath),
            })}
          </View>
        );
      });
    };

    return <View style={style}>{renderChildrenOptions(schema)}</View>;
  }
);
