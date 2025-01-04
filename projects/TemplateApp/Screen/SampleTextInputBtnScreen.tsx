import React, { useContext, useState, useEffect, useCallback, useRef, memo } from 'react';
import { View } from 'react-native';
import * as UI from '../../../Framework/Index/UI';
import * as Hook from '../../../Framework/Index/Hook';
import * as Const from '../../../Framework/Index/Const';

/**
 * Showcase text, input and buttons.
 */
const SampleTextInputBtnScreen: React.FC<UI.IScreenProps> = ({ navigation, route }) => {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <UI.BasicActivity navigation={navigation} title="Text, input and button Sample">
      <UI.VerticalLayout childMargin={Const.padSize} padding={Const.padSize}>

        {/* Buttons */}
        <UI.GridLayout
          direction="row"
          spacing={Const.padSize}
          itemsPerLine={2}
        >
          <UI.Button mode="text" onPress={() => { }}>text</UI.Button>
          <UI.Button mode="outlined" onPress={() => { }}>outlined</UI.Button>
          <UI.Button mode="contained" onPress={() => { }}>contained</UI.Button>
          <UI.Button mode="elevated" onPress={() => { }}>elevated</UI.Button>
          <UI.Button mode="contained-tonal" onPress={() => { }}>contained-tonal</UI.Button>
          <UI.IconButton icon="account-box-multiple-outline" mode="contained" onPress={() => { }}>icon contained</UI.IconButton>
        </UI.GridLayout>

        <UI.DividerComp />

        {/* Input + highlight text */}
        <UI.TextInput
          type="search"
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder="search"
          style={{ marginTop: Const.padSize2 }}
        />
        <UI.HighlightText query={searchQuery} variant={'bodyMedium'} style={{ marginTop: Const.padSize2 }} >
          hello world here
        </UI.HighlightText>

      </UI.VerticalLayout>
    </UI.BasicActivity>
  );
}

export default memo(SampleTextInputBtnScreen);