module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      'react-native-reanimated/plugin', // required for react-native-reanimated
      [
        'module:react-native-dotenv',
        {
          moduleName: '@env', // so you can `import { API_KEY } from '@env'`
          path: '.env',
          safe: false,
          allowUndefined: true,
        },
      ],
    ],
    env: {
      production: {
        plugins: ['react-native-paper/babel'],
      },
    },
  };
};
