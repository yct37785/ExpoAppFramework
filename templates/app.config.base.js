import { config as loadEnv } from 'dotenv';
loadEnv({ path: './.env' });

export default function withBaseConfig({ config }) {
  return {
    // preserve anything the caller already set
    ...config,

    expo: {
      ...(config?.expo ?? {}),

      // ---- app-agnostic defaults ----
      orientation: config?.expo?.orientation ?? 'portrait',
      userInterfaceStyle: config?.expo?.userInterfaceStyle ?? 'light',
      newArchEnabled: true,

      // ---- platform config that is common to all apps ----
      android: {
        ...(config?.expo?.android ?? {}),
        // each app should place its google-services.json in its own folder
        googleServicesFile: './google-services.json',

        // IMPORTANT: package is app-specific; do NOT set here
        // package: 'com.mycorp.myapp'
      },

      // ---- plugins shared by all apps ----
      plugins: [
        // keep any app-level plugins already provided by the caller
        ...((config?.expo?.plugins ?? [])),

        '@react-native-firebase/app',
        '@react-native-firebase/auth',
        '@react-native-firebase/firestore',
        "@react-native-google-signin/google-signin",
      ],
    },
  };
}