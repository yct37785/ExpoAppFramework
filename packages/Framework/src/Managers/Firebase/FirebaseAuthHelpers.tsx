import { logColors } from '../../Const';
import { getApp } from '@react-native-firebase/app';
import { getAuth, signInAnonymously } from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

/****************************************************************************************************************
 * Configure Google Sign-In.
 * - Done once at the start.
 * - Provide web OAuth client ID via env.
 ****************************************************************************************************************/
export async function configureGoogleSignIn() {
  // web OAuth client ID; required for consistent Google ID token issuance on Android
  const webClientId = process.env.GOOGLE_WEB_CLIENT_ID;
  if (!webClientId) {
    throw new Error(`${logColors.red}[Auth]${logColors.reset} GoogleSignin load failed: Missing webClientId`);
  }
  GoogleSignin.configure({ webClientId });
  console.log(
    `${logColors.cyan}[Auth]${logColors.reset} GoogleSignin loaded with webClientId: ` +
    `${logColors.green}${webClientId.slice(0, 8)}..`
  );
}

/****************************************************************************************************************
 * Do anonymous session sign in.
 * - Only if no active user session, else nothing happens.
 ****************************************************************************************************************/
export async function doAnonymousSignIn() {
  const auth = getAuth(getApp());

  if (!auth.currentUser) {
    try {
      const { user } = await signInAnonymously(auth);
      console.log(
        `${logColors.cyan}[Auth]${logColors.reset} Anonymous sign-in success, uid: ${logColors.green}${user.uid}`);
    } catch (e) {
      // non-fatal: UI can still render; sign-in can be retried later
      console.log(
        `${logColors.cyan}[Auth]${logColors.reset} Anonymous sign-in failed: ${e}`);
    }
  } else {
    console.log(
      `${logColors.cyan}[Auth]${logColors.reset} Existing user detected, uid: ${logColors.green}${auth.currentUser.uid}`);
  }
}
