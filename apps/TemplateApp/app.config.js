import withBaseConfig from '../../templates/app.config.base.js';

export default ({ config }) =>
  withBaseConfig({
    config: {
      ...config,
      expo: {
        name: 'TemplateApp',
        slug: 'TemplateApp',
        version: '1.0.0',
        icon: './assets/icon.png',
        userInterfaceStyle: 'light',
        newArchEnabled: true,
        splash: {
          image: './assets/splash-icon.png',
          resizeMode: 'contain',
          backgroundColor: '#ffffff',
        },
        web: { favicon: './assets/favicon.png' },

        ios: {
          bundleIdentifier: 'com.anonymous.TemplateApp',
          supportsTablet: true,
        },
        android: {
          package: 'com.anonymous.TemplateApp',
          adaptiveIcon: {
            foregroundImage: './assets/adaptive-icon.png',
            backgroundColor: '#ffffff',
          },
          edgeToEdgeEnabled: true,
        },
        plugins: [],
      },
    },
  });