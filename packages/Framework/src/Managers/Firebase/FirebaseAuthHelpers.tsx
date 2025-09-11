import { logColors } from '../../Const';
import { getApp } from '@react-native-firebase/app';
import { getAuth, signInAnonymously } from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { getFirestore, disableNetwork, enableNetwork } from '@react-native-firebase/firestore';

/****************************************************************************************************************
 * Configure Google Sign-In.
 * - Done once at the start.
 * - Provide web OAuth client ID via env.
 ****************************************************************************************************************/
export async function configureGoogleSignIn() {
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
 * Firestore network controls.
 * - keep anonymous sessions local-only (no server traffic)
 * - enable sync when user is Google-signed-in
 ****************************************************************************************************************/
export async function goLocalOnly() {
  await disableNetwork(getFirestore(getApp()));
}

export async function goOnline() {
  await enableNetwork(getFirestore(getApp()));
}

/****************************************************************************************************************
 * Do anonymous session sign in.
 * - Only if no active user session, else nothing happens.
 * - Ensures anonymous sessions are strictly local-only (no sync).
 ****************************************************************************************************************/
export async function doAnonymousSignIn() {
  const auth = getAuth(getApp());

  if (!auth.currentUser) {
    try {
      const { user } = await signInAnonymously(auth);
      console.log(
        `${logColors.cyan}[Auth]${logColors.reset} Anonymous sign-in success, uid: ${logColors.green}${user.uid}`
      );
      await goLocalOnly(); // anonymous = local-only
    } catch (e) {
      console.log(`${logColors.cyan}[Auth]${logColors.reset} Anonymous sign-in failed: ${e}`);
    }
  } else {
    console.log(
      `${logColors.cyan}[Auth]${logColors.reset} Existing user detected, uid: ${logColors.green}${auth.currentUser.uid}`
    );
  }
}
