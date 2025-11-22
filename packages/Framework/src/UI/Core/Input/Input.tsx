import React, { useEffect, useRef, useState, memo } from 'react';
import {
  View,
  Text,
  TextInput as RNTextInput,
  Keyboard,
  TouchableOpacity,
  StyleSheet,
  StyleProp,
  ViewStyle,
} from 'react-native';
import { TextInputType, InputKind } from './Input.types';
import { Icon } from '../Text/Icon';

/******************************************************************************************************************
 * Keyboard + secure entry mapping
 ******************************************************************************************************************/
const getKeyboardTypeForType = (
  type: InputKind
): React.ComponentProps<typeof RNTextInput>['keyboardType'] => {
  switch (type) {
    case 'numeric':
    case 'password':
      return 'number-pad';
    case 'email':
      return 'email-address';
    case 'phone':
      return 'phone-pad';
    default:
      return 'default';
  }
};

/******************************************************************************************************************
 * TextInput implementation (pure React Native)
 ******************************************************************************************************************/
export const TextInput: TextInputType = memo(
  ({
    type = 'text',
    label,
    variant = 'flat',
    value = '',
    placeholder = '',
    onChange = () => {},
    onFocus = () => {},
    onBlur = () => {},
    style,
    autoFocus,
    maxLength,
    multiline,
    numberOfLines,
    editable = true,
    leadingIcon,
    trailingIcon,
    onPressTrailingIcon,
  }) => {
    const inputRef = useRef<RNTextInput | null>(null);
    const [passwordVisible, setPasswordVisible] = useState(false);

    /******************************************************************************************************************
     * Auto-blur when keyboard hides (preserves your older behaviour)
     ******************************************************************************************************************/
    useEffect(() => {
      const listener = Keyboard.addListener('keyboardDidHide', () => {
        const ref = inputRef.current;
        if (ref && ref.blur && ref.isFocused && ref.isFocused()) {
          ref.blur();
        }
      });
      return () => listener.remove();
    }, []);

    /******************************************************************************************************************
     * Icon behaviours
     ******************************************************************************************************************/
    const handleTrailingPress = () => {
      if (!editable) return;

      if (onPressTrailingIcon) {
        onPressTrailingIcon();
        return;
      }

      if (type === 'password') {
        setPasswordVisible(v => !v);
      } else if (value.length > 0) {
        onChange('');
      }
    };

    // Default icons
    let resolvedLeading = leadingIcon;
    if (!resolvedLeading && type === 'search') {
      resolvedLeading = 'magnify';
    }

    let resolvedTrailing = trailingIcon;
    if (!resolvedTrailing) {
      if (type === 'password') resolvedTrailing = passwordVisible ? 'eye-off' : 'eye';
      else if (value.length > 0) resolvedTrailing = 'close';
    }

    const secureTextEntry = type === 'password' && !passwordVisible;
    const keyboardType = getKeyboardTypeForType(type);

    /******************************************************************************************************************
     * Variant (flat | outline)
     ******************************************************************************************************************/
    const containerStyle: StyleProp<ViewStyle> = [
      styles.containerBase,
      variant === 'outline' ? styles.outline : styles.flat,
      style as ViewStyle,
    ];

    /******************************************************************************************************************
     * Render
     ******************************************************************************************************************/
    return (
      <View>
        {label ? <Text style={styles.label}>{label}</Text> : null}

        <View style={containerStyle}>
          {/* Leading icon */}
          {resolvedLeading ? (
            <View style={styles.icon}>
              <Icon source={resolvedLeading} variant='sm' />
            </View>
          ) : null}

          {/* Main input */}
          <RNTextInput
            ref={inputRef}
            style={styles.input}
            value={value}
            placeholder={placeholder}
            onChangeText={onChange}
            onFocus={onFocus}
            onBlur={onBlur}
            editable={editable}
            autoFocus={autoFocus}
            maxLength={maxLength}
            multiline={multiline}
            numberOfLines={numberOfLines}
            keyboardType={keyboardType}
            secureTextEntry={secureTextEntry}
          />

          {/* Trailing icon */}
          {resolvedTrailing ? (
            <TouchableOpacity style={styles.icon} onPress={handleTrailingPress}>
              <Icon source={resolvedTrailing} variant='sm' />
            </TouchableOpacity>
          ) : null}
        </View>
      </View>
    );
  }
);

/******************************************************************************************************************
 * Styles
 ******************************************************************************************************************/
const styles = StyleSheet.create({
  label: {
    marginBottom: 4,
    color: '#555',
    fontSize: 12,
  },
  containerBase: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    borderRadius: 8,
    minHeight: 44,
  },
  flat: {
    backgroundColor: '#F4F4F4',
  },
  outline: {
    borderWidth: 1,
    borderColor: '#CCC',
    backgroundColor: '#FFF',
  },
  icon: {
    marginHorizontal: 6,
  },
  input: {
    flex: 1,
    paddingVertical: 6,
    fontSize: 16,
  },
});
