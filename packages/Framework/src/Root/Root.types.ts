// screen typing
import { ScreenMap } from '../Screen/Screen.types';
// screen layout
import { ScreenLayoutProps } from '../Screen/ScreenLayout.types';

/******************************************************************************************************************
 * Root component props.
 *
 * @property DEFAULT_SCREEN   - Initial route name for the stack navigator
 * @property screenMap        - Mapping of route names to screen components
 * @property defaultScreenLayoutProps   - app wide screen layout (AppBar left content etc)
 ******************************************************************************************************************/
export type RootProps = {
  DEFAULT_SCREEN: string;
  screenMap: ScreenMap;
  defaultScreenLayoutProps: ScreenLayoutProps;
};

/******************************************************************************************************************
 * RootApp
 ******************************************************************************************************************/
export type RootType = React.FC<RootProps>;