/******************************************************************************************************************
 * Singleton auth provider: Google Sign-In → Firebase Authentication.
 *
 * Prerequisites:
 * - Provide the Google web OAuth client ID (from Firebase) via .env → GOOGLE_WEB_CLIENT_ID.
 * - Get this ID from Firebase > Authentication > Sign-in method > Sign-in providers > Google.
 *
 * Mental model (how it works):
 * - Google Sign-In returns an **ID token** (OIDC JWT) for the chosen Google account.
 * - We send that ID token to Firebase Auth to **sign in** (or create) the Firebase account for this project.
 * - The Firebase SDK manages the session (issues/refreshes Firebase ID tokens automatically).
 * - The current Firebase user (or null) is exposed via context.
 *
 * Notes:
 * - The Firebase account has a stable **uid** (user id in this project).
 * - For “anonymous → Google” upgrades that keep the same uid, use linkWithCredential in the sign-in flow (handled elsewhere).
 ******************************************************************************************************************/
import React, { createContext, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { logColors } from '../Const';
import { withTimeout } from '../Utils';

import { getApp } from '@react-native-firebase/app';
import {
  getAuth,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithCredential,
  signOut as fbSignOut,
} from '@react-native-firebase/auth';
import type { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

/******************************************************************************************************************
 * Context shape.
 ******************************************************************************************************************/
type AuthContextType = {
  user: FirebaseAuthTypes.User | null;
  signIn: () => Promise<FirebaseAuthTypes.User>;
  signOut: () => Promise<void>;
};

/******************************************************************************************************************
 * Default context (guard against usage without provider).
 ******************************************************************************************************************/
const AuthContext = createContext<AuthContextType>({
  user: null,
  signIn: async () => {
    throw new Error(`${logColors.red}[Auth]${logColors.reset} AuthProvider not mounted`);
  },
  signOut: async () => {
    throw new Error(`${logColors.red}[Auth]${logColors.reset} AuthProvider not mounted`);
  },
});

type Props = {
  children: React.ReactNode;
  /** web OAuth client ID; required for consistent Google ID token issuance on Android */
  webClientId?: string;
};

/******************************************************************************************************************
 * AuthProvider.
 ******************************************************************************************************************/
export const AuthProvider: React.FC<Props> = ({ children, webClientId }) => {
  // current Firebase user (null when signed out)
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);

  // guards
  const configuredRef = useRef(false);
  const signingRef = useRef(false);

  /****************************************************************************************************************
   * Configure Google Sign-In once.
   * - Provide webClientId to ensure we receive an idToken.
   ****************************************************************************************************************/
  useEffect(() => {
    if (configuredRef.current) return;
    if (!webClientId) {
      throw new Error(`${logColors.red}[Auth]${logColors.reset} GoogleSignin load failed: Missing webClientId`);
    }
    GoogleSignin.configure({ webClientId });
    console.log(
      `${logColors.cyan}[Auth]${logColors.reset} GoogleSignin loaded with webClientId: ` +
      `${logColors.green}${webClientId.slice(0, 8)}..${logColors.reset}`
    );
    configuredRef.current = true;
  }, [webClientId]);

  /****************************************************************************************************************
   * Keep `user` in sync with Firebase Auth state.
   * - After sign-in, Firebase maintains session, refreshes tokens, and rehydrates across app restarts.
   ****************************************************************************************************************/
  useEffect(() => {
    const auth = getAuth(getApp());
    const unsub = onAuthStateChanged(auth, setUser);
    return unsub;
  }, []);

  /****************************************************************************************************************
   * Sign in with Google → Firebase.
   * - Shows native account picker.
   * - Exchanges Google ID token for Firebase credential.
   * - Returns the Firebase user.
   ****************************************************************************************************************/
  const signIn = async (): Promise<FirebaseAuthTypes.User> => {
    // prevent double-taps / concurrent calls
    if (signingRef.current) {
      throw new Error(`${logColors.red}[Auth]${logColors.reset} Sign-in already in progress`);
    }
    signingRef.current = true;

    try {
      // 1) Ensure Play Services on Android.
      await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });

      // 2) Launch Google account picker and fetch ID token (bounded to avoid silent hangs).
      const res: any = await withTimeout(GoogleSignin.signIn(), 30000);
      const idToken = res?.idToken ?? res?.data?.idToken;
      if (!idToken) {
        throw new Error(`${logColors.red}[Auth]${logColors.reset} Google sign-in failed: missing idToken`);
      }

      // 3) Exchange Google ID token → Firebase sign-in.
      const auth = getAuth(getApp());
      const credential = GoogleAuthProvider.credential(idToken);
      const { user } = await signInWithCredential(auth, credential);

      // 4) Firebase now manages the session (ID token + refresh token under the hood).
      return user;
    } catch (err) {
      throw new Error(`${logColors.red}[Auth]${logColors.reset} Google sign-in failed: ${err}`);
    } finally {
      signingRef.current = false;
    }
  };

  /****************************************************************************************************************
   * Sign out from Firebase and clear Google session state for this app.
   ****************************************************************************************************************/
  const signOut = async (): Promise<void> => {
    const auth = getAuth(getApp());
    try {
      // 1) Ends Firebase session locally.
      await fbSignOut(auth);
    } finally {
      try {
        // 2) Clears Google Sign-In session for this app.
        await GoogleSignin.signOut();
      } catch {
        /* ignore non-fatal Google sign-out issues */
      }
    }
  };

  const value = useMemo(() => ({ user, signIn, signOut }), [user]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

/******************************************************************************************************************
 * Consumer hook.
 ******************************************************************************************************************/
export const useAuth = () => useContext(AuthContext);
