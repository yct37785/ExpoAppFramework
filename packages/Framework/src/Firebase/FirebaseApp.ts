import { getApps, getApp, initializeApp, type FirebaseApp } from 'firebase/app';

export function getFirebaseApp(): FirebaseApp | null {
  const apiKey    = process.env.EXPO_PUBLIC_FB_API_KEY;
  const projectId = process.env.EXPO_PUBLIC_FB_PROJECT_ID;
  const appId     = process.env.EXPO_PUBLIC_FB_APP_ID;

  if (!apiKey || !projectId || !appId) return null; // disabled

  const config = {
    apiKey, projectId, appId,
    authDomain:       process.env.EXPO_PUBLIC_FB_AUTH_DOMAIN,
    storageBucket:    process.env.EXPO_PUBLIC_FB_STORAGE_BUCKET,
    messagingSenderId:process.env.EXPO_PUBLIC_FB_MESSAGING_SENDER_ID,
    measurementId:    process.env.EXPO_PUBLIC_FB_MEASUREMENT_ID,
  };

  return getApps().length ? getApp() : initializeApp(config);
}