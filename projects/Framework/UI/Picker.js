import React from 'react';
import { popupBGColorForDark } from '../Common/Values';
import { useTheme } from 'react-native-paper';
import { Picker } from '@react-native-picker/picker';

/**
 * value: str, value of a selection
 * options: [{ label: str, value: str }]
 */
function PickerComp({ value, options, onChange }) {
  const theme = useTheme();
  return (
    <Picker
      mode='dropdown'
      dropdownIconColor={theme.colors.text}
      style={{
        color: theme.colors.text,
        width: '100%',
      }}
      selectedValue={value}
      onValueChange={(v) => onChange(v)}>
      {
        options.map((item, idx) => {
          return <Picker.Item key={idx} label={item.label} value={item.value}
            style={{
              color: theme.colors.text, backgroundColor: theme.colors.surfaceVariant
            }} />
        })
      }
    </Picker>
  );
};

export default React.memo(PickerComp);