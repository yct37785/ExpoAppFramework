import { logColors } from '../../Const';
import { getApp } from '@react-native-firebase/app';
import { getAuth, signInAnonymously } from '@react-native-firebase/auth';
import { reload } from '@react-native-firebase/auth'; // ✅ modular API
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { getFirestore, disableNetwork, enableNetwork } from '@react-native-firebase/firestore';
import { doLog, AppError } from '../../Utils';

/****************************************************************************************************************
 * Configure Google Sign-In.
 * - Done once at the start.
 * - Provide web OAuth client ID via env.
 ****************************************************************************************************************/
export async function configureGoogleSignIn() {
  const webClientId = process.env.GOOGLE_WEB_CLIENT_ID;
  if (!webClientId) {
    throw new AppError('auth', 'configureGoogleSignIn', 'GoogleSignin load failed: Missing webClientId');
  }
  GoogleSignin.configure({ webClientId });
  doLog(
    'auth',
    'configureGoogleSignIn',
    `GoogleSignin loaded with webClientId: ${logColors.green}${webClientId.slice(0, 10)}..`
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
      doLog('auth', 'doAnonymousSignIn', `Anonymous sign-in success, uid: ${logColors.green}${user.uid.slice(0, 10)}..`);
      await goLocalOnly(); // anonymous = local-only
    } catch (e) {
      doLog('auth', 'doAnonymousSignIn', `Anonymous sign-in failed: ${e}`);
    }
  } else {
    doLog('auth', 'doAnonymousSignIn', `Existing user detected, uid: ${logColors.green}${auth.currentUser.uid.slice(0, 10)}..`);
  }
}

/****************************************************************************************************************
 * Verify current user against Firebase server.
 * - Used to detect when an account is deleted/disabled in Firebase Console.
 * - If the account is invalid, return false so the caller can signOut() and fallback to anon.
 *
 * Returns:
 *   - true  → user still valid
 *   - false → disabled/deleted/invalid on the server
 ****************************************************************************************************************/
export async function verifyCurrentUser(): Promise<boolean> {
  const auth = getAuth(getApp());
  const u = auth.currentUser;
  if (!u) return false;

  try {
    await reload(u);
    return true;
  } catch (e: any) {
    const code: string | undefined = e?.code || e?.message;
    const isInvalid =
      code?.includes('user-disabled') ||
      code?.includes('user-not-found') ||
      code?.includes('user-token-expired') ||
      code?.includes('invalid-user-token') ||
      false;

    if (isInvalid) {
      doLog('auth', 'verifyCurrentUser', `Remote account invalidated (${code})`);
      return false;
    }
    // unexpected error: bubble up so the caller can decide (usually ignore and retry later)
    throw e;
  }
}
