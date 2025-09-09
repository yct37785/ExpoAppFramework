/******************************************************************************************************************
 * A simple authentication provider using:
 *   - React Native Firebase (modular API) for Firebase Authentication, and
 *   - @react-native-google-signin/google-signin for the native Google account picker.
 *
 * WHAT HAPPENS (high level JWT flow):
 *  1) Google Sign-In returns an OpenID Connect ID token (a JWT) for the chosen account.
 *     - That token’s audience = your Web client ID.
 *     - It is signed by Google and contains user identity claims (sub/email/etc.).
 *  2) We pass that ID token to Firebase via GoogleAuthProvider.credential(idToken).
 *     - Firebase verifies the token with Google and, if valid, signs the user into YOUR Firebase project.
 *  3) Firebase issues its own Firebase ID token (also a JWT) + refresh token managed by the SDK.
 *     - The SDK refreshes the Firebase ID token automatically (typ. hourly) using the refresh token.
 *
 * CONTEXT EXPOSES ONLY:
 *   - user   : FirebaseAuthTypes.User | null
 *   - signIn : () => Promise<FirebaseAuthTypes.User>
 *   - signOut: () => Promise<void>
 ******************************************************************************************************************/
import React, { createContext, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { logColors } from '../Const';
// Firebase (modular API)
import { getApp } from '@react-native-firebase/app';
import {
  getAuth,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithCredential,
  signOut as fbSignOut,
} from '@react-native-firebase/auth';
import type { FirebaseAuthTypes } from '@react-native-firebase/auth';
// native Google account picker (produces the Google ID token we exchange with Firebase)
import { GoogleSignin } from '@react-native-google-signin/google-signin';

/******************************************************************************************************************
 * Context type.
 ******************************************************************************************************************/
type AuthContextType = {
  user: FirebaseAuthTypes.User | null;            // Firebase user object; null if signed out
  signIn: () => Promise<FirebaseAuthTypes.User>;  // Google → Firebase login, resolves to Firebase user
  signOut: () => Promise<void>;                   // Clears Firebase session and Google session
};

/******************************************************************************************************************
 * Default context.
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
  webClientId?: string; // the Web OAuth client ID, required on many Android setups to get idToken != null
};

/******************************************************************************************************************
 * AuthProvider
 *
 * Responsibilities:
 *   1) Configure Google Sign-In (idempotent, once per app lifetime).
 *   2) Subscribe to Firebase Auth state and expose `user` (null when signed out).
 *   3) Provide signIn/signOut methods that bridge Google ↔ Firebase.
 *
 * NOTE on tokens:
 *   - GoogleSignin.signIn() → returns a Google ID token (JWT). We never store it; it’s used immediately.
 *   - Firebase then issues a Firebase ID token (JWT) + keeps a refresh token internally.
 *   - The Firebase SDK refreshes tokens automatically. You typically don’t need to manage them yourself.
 ******************************************************************************************************************/
export const AuthProvider: React.FC<Props> = ({ children, webClientId }) => {
  // current Firebase user (null -> signed out), derived purely from Firebase Auth state
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);
  const configuredRef = useRef(false);

  // in-progress guard — prevents concurrent sign-in calls (e.g., double-taps)
  const signingRef = useRef(false);

  // timeout wrapper to avoid silent hangs from native bridges
  const withTimeout = <T,>(p: Promise<T>, ms = 20000) =>
    new Promise<T>((resolve, reject) => {
      const t = setTimeout(() => reject(new Error('Google sign-in timed out')), ms);
      p.then(
        v => { clearTimeout(t); resolve(v); },
        e => { clearTimeout(t); reject(e); }
      );
    });

  /****************************************************************************************************************
   * Configure Google Sign-In once:
   * - Why webClientId? Google Sign-In often requires the Web client ID so that it returns an ID token (JWT).
   * - Without the Web client ID, Android flows can return idToken = null → Firebase credential exchange fails.
   * - We fail fast if not provided because project relies on explicit configuration.
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
   * Subscribe to Firebase Auth state changes (onAuthStateChanged).
   * HOW IT WORKS:
   *   - After a successful sign-in, Firebase stores refresh token + issues ID token (JWT).
   *   - It keeps the session and refreshes ID tokens automatically in the background.
   *   - This listener fires with the current Firebase user on any change.
   ****************************************************************************************************************/
  useEffect(() => {
    const auth = getAuth(getApp());
    const unsub = onAuthStateChanged(auth, setUser);
    return unsub;
  }, []);

  /****************************************************************************************************************
   * Sign in with Google.
   *
   * STEPS:
   *   1) Ensure Google Play Services are OK (Android).
   *   2) Show native account picker → receive Google ID token (JWT).
   *   3) Exchange the Google ID token for a Firebase credential & sign into Firebase.
   *
   * TOKEN NOTES:
   *   - The Google ID token is a short-lived JWT used once to prove identity to Firebase.
   *   - Firebase then issues its own ID token (JWT) and manages a refresh token internally.
   *   - Post-login, use auth().currentUser or getAuth().currentUser to query user; for a server call,
   *     you’d fetch a Firebase ID token via currentUser.getIdToken() and send it as a Bearer token.
   ****************************************************************************************************************/
  const signIn = async (): Promise<FirebaseAuthTypes.User> => {
    // prevent concurrent calls (double-tap)
    if (signingRef.current) {
      throw new Error(`${logColors.red}[Auth]${logColors.reset} Sign-in already in progress`);
    }
    signingRef.current = true;

    try {
      // 1) Play Services readiness (Android-specific guard).
      await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });

      // 2) Bring up account picker; retrieve Google ID token (OpenID Connect JWT).
      // wrap with timeout so the promise can't hang forever
      const res: any = await withTimeout(GoogleSignin.signIn(), 30000);
      const idToken = res?.idToken ?? res?.data?.idToken;
      if (!idToken) {
        // if this error is triggered, double-check webClientId + SHA-1 + package name
        throw new Error(`${logColors.red}[Auth]${logColors.reset} Google sign-in failed: missing idToken`);
      }

      // 3) Exchange Google ID token → Firebase credential; sign into your Firebase project.
      const auth = getAuth(getApp());
      const credential = GoogleAuthProvider.credential(idToken);
      const { user } = await signInWithCredential(auth, credential);

      // 4) SUCCESS. Firebase now holds (a) a Firebase ID token (JWT) and (b) a refresh token.
      // - the SDK refreshes tokens automatically; you typically won’t handle refreshes manually
      return user;
    } catch (err) {
      throw new Error(`${logColors.red}[Auth]${logColors.reset} Google sign-in failed: ${err}`);
    } finally {
      // release the in-progress flag
      signingRef.current = false;
    }
  };

  /****************************************************************************************************************
   * Sign out of both Firebase (clears Firebase session & refresh token locally)
   * and Google Sign-In (clears Google session on device for this app).
   ****************************************************************************************************************/
  const signOut = async (): Promise<void> => {
    const auth = getAuth(getApp());
    try {
      // ends Firebase session locally (ID token/refresh token no longer used)
      await fbSignOut(auth);
    } finally {
      try {
        // clears Google session state for this app’s sign-in library
        await GoogleSignin.signOut();
      } catch {
        /* ignore non-fatal Google sign-out issues */
      }
    }
  };

  // memoize context value so children don’t re-render unless `user` changes
  const value = useMemo(() => ({ user, signIn, signOut }), [user]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

/******************************************************************************************************************
 * Hook for consumers.
 ******************************************************************************************************************/
export const useAuth = () => useContext(AuthContext);
