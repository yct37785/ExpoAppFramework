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
 * - For “anonymous → Google” upgrades that keep the same uid, we **link** Google to the current anonymous user.
 * - Anonymous accounts will get orphaned when it is signed out inadvertently, need to be cleaned up on Firebase end.
 ******************************************************************************************************************/
import React, { createContext, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { logColors } from '../../Const';
import { withTimeout } from '../../Utils';
import { getApp } from '@react-native-firebase/app';
import {
  getAuth,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithCredential,
  signOut as fbSignOut,
  linkWithCredential,
} from '@react-native-firebase/auth';
import type { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { configureGoogleSignIn, doAnonymousSignIn, goLocalOnly, goOnline } from './FirebaseAuthHelpers';

/******************************************************************************************************************
 * Context shape.
 ******************************************************************************************************************/
type AuthContextType = {
  user: FirebaseAuthTypes.User | null;
  signIn: () => Promise<FirebaseAuthTypes.User>;
  signOut: () => Promise<void>;
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
};

/******************************************************************************************************************
 * AuthProvider.
 ******************************************************************************************************************/
export const AuthProvider: React.FC<Props> = ({ children }) => {
  // current Firebase user (null when signed out)
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);

  // guards
  const startupRef = useRef(false);
  const signingRef = useRef(false);

  /****************************************************************************************************************
   * Start up checks.
   ****************************************************************************************************************/
  useEffect(() => {
    // prevent any retriggers
    if (startupRef.current) return;
    startupRef.current = true;

    // 3) Keep user in sync with Firebase Auth state.
    const auth = getAuth(getApp());

    // seed immediately so downstream can reflect an existing session (if any)
    setUser(auth.currentUser ?? null);

    // subscribe immediately
    const unsub = onAuthStateChanged(auth, (u) => {
      console.log(
        `${logColors.cyan}[Auth]${logColors.reset} onAuthStateChanged: `,
        u ? `${u.isAnonymous ? 'anon' : 'google'} uid = ${logColors.green}${u.uid.slice(0, 8)}...` : `null${logColors.reset}`
      );
      setUser(u);
    });

    // kick off async startup work
    (async () => {
      try {
        // 1) Configure Google Sign-In once.
        await configureGoogleSignIn(); // idempotent internally

        // 2) Ensure an anonymous session exists early (local-first) if no existing session.
        await doAnonymousSignIn(); // will trigger the auth listener if it signs in

        // if we already have a non-anon user (e.g., hot reload), ensure network on
        if (auth.currentUser && !auth.currentUser.isAnonymous) {
          await goOnline();
        }
      } catch (e) {
        console.log(`${logColors.red}[Auth]${logColors.reset} Startup init failed: ${e}`);
      }
    })();

    // cleanup
    return unsub;
  }, []);

  /****************************************************************************************************************
   * Sign in with Google → Firebase.
   * - Shows native account picker.
   * - Exchanges Google ID token for Firebase credential.
   * - If the current user is **anonymous**, LINK the Google credential to **retain the same uid**.
   * - Otherwise, do a standard Google credential sign-in.
   * - Returns the Firebase user.
   ****************************************************************************************************************/
  const signIn = async (): Promise<FirebaseAuthTypes.User> => {
    // prevent double-taps / concurrent calls
    if (signingRef.current) {
      throw new Error(`${logColors.red}[Auth]${logColors.reset} Sign-in already in progress`);
    }
    signingRef.current = true;

    try {
      /** 1) Ensure Play Services on Android **/
      await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });

      /** 2) Launch Google account picker and fetch ID token (bounded to avoid silent hangs) **/
      const res: any = await withTimeout(GoogleSignin.signIn(), 30000);
      const idToken = res?.idToken ?? res?.data?.idToken;
      if (!idToken) {
        throw new Error(`${logColors.red}[Auth]${logColors.reset} Google sign-in failed: missing idToken`);
      }

      /** 3) Link-or-sign-in with Google credential **/
      const auth = getAuth(getApp());
      const credential = GoogleAuthProvider.credential(idToken);

      // anonymous → try to LINK first
      if (auth.currentUser?.isAnonymous) {
        try {
          const { user: linked } = await linkWithCredential(auth.currentUser, credential);
          await goOnline(); // now allowed to sync
          return linked;
        } catch (e: any) {
          const code = e?.code || e?.nativeErrorCode;
          const alreadyLinked =
            code === 'auth/credential-already-in-use' || code === 'auth/account-exists-with-different-credential';

          if (!alreadyLinked) throw e;

          // fall back: switch to that Google account
          const { user: target } = await signInWithCredential(auth, credential);
          await goOnline(); // sync for signed-in account
          return target;
        }
      }

      // not anonymous → normal sign-in
      const { user: signedIn } = await signInWithCredential(auth, credential);
      await goOnline();
      return signedIn;

    } catch (err) {
      throw new Error(`${logColors.red}[Auth]${logColors.reset} Google sign-in failed: ${err}`);
    } finally {
      signingRef.current = false;
    }
  };

  /****************************************************************************************************************
   * Sign out (best-effort) → always lands in a fresh anonymous, local-only session.
   ****************************************************************************************************************/
  const signOut = async (): Promise<void> => {
    const auth = getAuth(getApp());
    try {
      try {
        await fbSignOut(auth);
      } catch (e) {
        console.warn(`${logColors.red}[Auth] Firebase signOut failed: ${e}`); // best-effort: do not reject
      }
      try {
        await GoogleSignin.signOut();
      } catch (e) {
        console.warn(`${logColors.red}[Auth] Google signOut failed: ${e}`);   // best-effort
      }
    } finally {
      // fresh anonymous workspace; keep it local-only (never appears in console)
      await doAnonymousSignIn();
      await goLocalOnly();
    }
  };

  const value = useMemo(() => ({ user, signIn, signOut }), [user]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

/******************************************************************************************************************
 * Consumer hook.
 ******************************************************************************************************************/
export const useAuth = () => useContext(AuthContext);
