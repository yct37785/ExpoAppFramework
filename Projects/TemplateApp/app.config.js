export default ({ config }) => {
  const isCustomBuild = process.env.CUSTOM_DEV === "true";

  return {
    ...config,
    expo: {
      name: "TemplateApp",
      slug: "TemplateApp",
      version: "1.0.0",
      orientation: "portrait",
      icon: "./assets/icon.png",
      userInterfaceStyle: "light",
      newArchEnabled: true,
      splash: {
        image: "./assets/splash-icon.png",
        resizeMode: "contain",
        backgroundColor: "#ffffff",
      },
      ios: {
        supportsTablet: true,
      },
      android: {
        package: "com.anonymous.TemplateApp",
        adaptiveIcon: {
          foregroundImage: "./assets/adaptive-icon.png",
          backgroundColor: "#ffffff",
        },
      },
      web: {
        favicon: "./assets/favicon.png",
      },
      plugins: isCustomBuild ? ["expo-dev-client"] : [],
    },
  };
};
