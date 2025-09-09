/******************************************************************************************************************
 * A simple proof-of-concept authentication provider using React Native Firebase + Google Sign-In.
 ******************************************************************************************************************/
import React, { createContext, useContext, useEffect, useMemo, useRef, useState } from 'react';
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
import { logColors } from '../Const';

/******************************************************************************************************************
 * Context type
 ******************************************************************************************************************/
type AuthContextType = {
  user: FirebaseAuthTypes.User | null;            // currently signed-in user (null if none)
  signIn: () => Promise<FirebaseAuthTypes.User>;  // sign in with Google → Firebase
  signOut: () => Promise<void>;                   // sign out from both Firebase + Google
};

/******************************************************************************************************************
 * Default context (throws if used outside provider)
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

/******************************************************************************************************************
 * AuthProvider
 *
 * Responsibilities:
 *   - Configure Google Sign-In (idempotent)
 *   - Subscribe to Firebase Auth state (user signed in/out)
 *   - Provide simple signIn() and signOut() functions
 ******************************************************************************************************************/
type Props = {
  children: React.ReactNode;
  webClientId?: string;
};

export const AuthProvider: React.FC<Props> = ({ children, webClientId }) => {
  // current Firebase user
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);

  // track if GoogleSignin has been configured
  const configuredRef = useRef(false);

  /****************************************************************************************************************
   * Configure Google Sign-In once.
   * - auto-detection via google-services.json does not work, hence pass webClientId manually.
   ****************************************************************************************************************/
  useEffect(() => {
    if (configuredRef.current) return;
    if (!webClientId) {
      throw new Error(`${logColors.red}[Auth]${logColors.reset} GoogleSignin load failed: Missing webClientId`);
    }
    GoogleSignin.configure({ webClientId });
    console.log(`${logColors.cyan}[Auth]${logColors.reset} GoogleSignin loaded with webClientId: ${logColors.green}${webClientId.slice(0, 8)}..`);
    configuredRef.current = true;
  }, [webClientId]);

  /****************************************************************************************************************
   * Subscribe to Firebase Auth state changes (user signs in/out).
   * - Stores current user in local state.
   ****************************************************************************************************************/
  useEffect(() => {
    const auth = getAuth(getApp());
    const unsub = onAuthStateChanged(auth, setUser);
    return unsub; // unsubscribe on unmount
  }, []);

  /****************************************************************************************************************
   * Sign in with Google.
   * - Ensures Play Services are available (Android).
   * - Prompts user to pick a Google account and returns an idToken.
   * - Converts idToken into a Firebase credential and signs in.
   ****************************************************************************************************************/
  const signIn = async (): Promise<FirebaseAuthTypes.User> => {
    try {
      await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });

      const res: any = await GoogleSignin.signIn();
      const idToken = res?.idToken ?? res?.data?.idToken;
      if (!idToken) {
        throw new Error(`${logColors.red}[Auth]${logColors.reset} Google sign-in failed: missing idToken`);
      }

      const auth = getAuth(getApp());
      const credential = GoogleAuthProvider.credential(idToken);
      const { user } = await signInWithCredential(auth, credential);
      return user;
    } catch (err) {
      throw new Error(`${logColors.red}[Auth]${logColors.reset} Google sign-in failed: ${err}`);
    }
  };

  /****************************************************************************************************************
   * Sign out.
   * - Signs out from Firebase.
   * - Also clears Google Sign-In session.
   ****************************************************************************************************************/
  const signOut = async (): Promise<void> => {
    const auth = getAuth(getApp());
    try {
      await fbSignOut(auth);
    } finally {
      try {
        await GoogleSignin.signOut();
      } catch {
        /* ignore */
      }
    }
  };

  /****************************************************************************************************************
   * Memoize context value so children don’t re-render unnecessarily.
   ****************************************************************************************************************/
  const value = useMemo(() => ({ user, signIn, signOut }), [user]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

/******************************************************************************************************************
 * Hook for consumers
 ******************************************************************************************************************/
export const useAuth = () => useContext(AuthContext);
