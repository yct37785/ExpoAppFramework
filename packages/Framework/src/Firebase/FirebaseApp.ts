import { getApps, getApp, initializeApp, type FirebaseApp } from 'firebase/app';

export function testFirebaseEnvVars() {
  console.log(`-${process.env.EXPO_PUBLIC_FB_API_KEY}-`);
  console.log(`-${process.env.EXPO_PUBLIC_FB_PROJECT_ID}-`);
  console.log(`-${process.env.EXPO_PUBLIC_FB_APP_ID}-`);
}