import React, { memo } from 'react';
import { Core, Theme, UI } from 'framework';

/******************************************************************************************************************
 * Testbed screen: used for development and testing of new UI elements
 ******************************************************************************************************************/
const TestbedScreen: React.FC<Core.ScreenProps> = ({ navigation, route }) => {
  const theme = Theme.useTheme();

  return (
    <Core.Activity navigation={navigation} title='Layout Sample'>
      <UI.VerticalLayout constraint='scroll' navBarScrollAllowance>
        {/* header text */}
        <UI.Text variant='h1'>Test bed</UI.Text>
      </UI.VerticalLayout>
    </Core.Activity>
  );
};

export default memo(TestbedScreen);