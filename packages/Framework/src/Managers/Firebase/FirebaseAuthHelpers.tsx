import { logColors } from '../../Const';
import { getApp } from '@react-native-firebase/app';
import {
  getAuth,
  signInAnonymously,
  onAuthStateChanged,
  onIdTokenChanged,
  reload,
  type FirebaseAuthTypes,
} from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { getFirestore, disableNetwork, enableNetwork } from '@react-native-firebase/firestore';
import { doLog, AppError } from '../../Utils';

/****************************************************************************************************************
 * Configure Google Sign-In (once).
 * - Provide web OAuth client ID via env: GOOGLE_WEB_CLIENT_ID
 ****************************************************************************************************************/
export async function configureGoogleSignIn() {
  const webClientId = process.env.GOOGLE_WEB_CLIENT_ID;
  if (!webClientId) {
    throw new AppError('auth', 'configureGoogleSignIn', 'GoogleSignin load failed: Missing webClientId');
  }
  GoogleSignin.configure({ webClientId });
  doLog('auth', 'configureGoogleSignIn', `GoogleSignin loaded: ${logColors.green}${webClientId.slice(0, 10)}..`);
}

/****************************************************************************************************************
 * Network policy:
 * - Anonymous  → local only (disable Firestore network)
 * - Google user → online (enable Firestore network)
 ****************************************************************************************************************/
export async function applyNetworkPolicyFor(user: FirebaseAuthTypes.User | null) {
  try {
    const db = getFirestore(getApp());
    if (user?.isAnonymous) {
      await disableNetwork(db);
      doLog('auth', 'applyNetworkPolicyFor', 'Applied local-only (anonymous)');
    } else if (user) {
      await enableNetwork(db);
      doLog('auth', 'applyNetworkPolicyFor', 'Applied online (google user)');
    }
  } catch {
    // Firestore might not be installed yet; ignore gracefully
  }
}

/****************************************************************************************************************
 * Ensure an anonymous session exists (local-first).
 ****************************************************************************************************************/
export async function ensureAnonymousSession() {
  const auth = getAuth(getApp());
  if (!auth.currentUser) {
    try {
      const { user } = await signInAnonymously(auth);
      doLog('auth', 'ensureAnonymousSession', `Anon uid: ${logColors.green}${user.uid.slice(0, 10)}..`);
      await applyNetworkPolicyFor(user);
    } catch (e) {
      doLog('auth', 'ensureAnonymousSession', `Anonymous sign-in failed: ${e}`);
    }
  } else {
    await applyNetworkPolicyFor(auth.currentUser);
  }
}

/****************************************************************************************************************
 * Verify current user against Firebase server (detect disable/delete).
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
    const invalid =
      code?.includes('user-disabled') ||
      code?.includes('user-not-found') ||
      code?.includes('user-token-expired') ||
      code?.includes('invalid-user-token') ||
      false;
    if (invalid) {
      doLog('auth', 'verifyCurrentUser', `Remote invalidation (${code})`);
      return false;
    }
    throw e;
  }
}

/****************************************************************************************************************
 * Start auth lifecycle observers.
 * - onAuthStateChanged: keeps `user` in sync and applies network policy
 * - onIdTokenChanged: triggers verification (caller decides what to do if invalid)
 * Returns a single cleanup function.
 ****************************************************************************************************************/
export function startAuthObservers(params: {
  onUser: (u: FirebaseAuthTypes.User | null) => void;
  onInvalidation: () => Promise<void> | void;
}) {
  const auth = getAuth(getApp());

  const unsubAuth = onAuthStateChanged(auth, async (u) => {
    let logMsg = '';
    if (u && !u.isAnonymous) logMsg = `google uid = ${logColors.green}${u.uid.slice(0, 10)}..`;
    else if (u && u.isAnonymous) logMsg = `anon uid = ${logColors.green}${u.uid.slice(0, 10)}..`;
    else logMsg = 'no user';
    doLog('auth', 'onAuthStateChanged', logMsg);

    // keep consumer state in sync, then enforce network policy for new state
    params.onUser(u);
    await applyNetworkPolicyFor(u);
  });

  const offToken = onIdTokenChanged(auth, async () => {
    try {
      const ok = await verifyCurrentUser();
      if (!ok) await params.onInvalidation();
    } catch {
      // ignore transient issues; will check again on next event
    }
  });

  return () => {
    offToken();
    unsubAuth();
  };
}

/****************************************************************************************************************
 * Utility: ensure account picker shows (clear cached Google session if any).
 ****************************************************************************************************************/
export async function ensureAccountPicker() {
  try {
    if (GoogleSignin.hasPreviousSignIn()) {
      await GoogleSignin.signOut();
      // optionally: await GoogleSignin.revokeAccess();
    }
  } catch {
    // best-effort
  }
}
