module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      [
        "module-resolver",
        {
          root: ["./"],
          alias: {
            "@root": "@expo-app-framework/framework/Root",
            "@screen": "@expo-app-framework/framework/Screen",
            "@ui": "@expo-app-framework/framework/UI/index",
            "@hook/*": "@expo-app-framework/framework/Hook/*",
            "@const": "@expo-app-framework/framework/Const"
          },
          extensions: [".js", ".ts", ".tsx", ".json"]
        }
      ]
    ],
    env: {
      production: {
        plugins: ['react-native-paper/babel'],
      },
    },
  };
};
