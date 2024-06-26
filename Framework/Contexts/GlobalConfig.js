/***************************************************************************************
* global vars here
***************************************************************************************/
export const GlobalConfig = {
  debugMode: false,
};

/**
 * get/set
 */
export const toggleDebugMode = () => {
  GlobalConfig.debugMode = !GlobalConfig.debugMode;
  console.log('Debug Mode:', GlobalConfig.debugMode);
};