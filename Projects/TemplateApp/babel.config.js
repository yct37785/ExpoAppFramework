module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      ["module:react-native-dotenv"],
      [
        "module-resolver",
        {
          root: ["./"],
          alias: {
            "@root": "@expo-app-framework/framework/Root",
            "@screen": "@expo-app-framework/framework/Screen",
            "@ui": "@expo-app-framework/framework/UI/index",
            "@hook/*": "@expo-app-framework/framework/Hook/*",
            "@const": "@expo-app-framework/framework/Const",
            "@util": "@expo-app-framework/framework/Utility",
            "@firebase/*": "@expo-app-framework/framework/Firebase/*"
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
