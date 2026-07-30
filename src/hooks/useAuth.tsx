import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react';
import {
  GoogleAuthProvider,
  signInWithPopup,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  type User,
} from 'firebase/auth';
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db } from '@/lib/firebase';
import type { UserData } from '@/types';

interface AuthContextValue {
  user: User | null;
  userData: UserData | null;
  loading: boolean;
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Safety timeout: if Firebase doesn't respond within 5 seconds,
    // force loading to false so the app is never permanently blocked.
    const safetyTimer = setTimeout(() => {
      setLoading(false);
    }, 5000);

    let unsub: (() => void) | undefined;

    try {
      unsub = onAuthStateChanged(auth, async (u) => {
        clearTimeout(safetyTimer);
        setUser(u);
        if (u) {
          try {
            const ref = doc(db, 'users', u.uid);
            const snap = await getDoc(ref);
            if (snap.exists()) {
              setUserData(snap.data() as UserData);
            } else {
              const newData: UserData = {
                uid: u.uid,
                email: u.email,
                displayName: u.displayName,
                photoURL: u.photoURL,
                role: 'user',
                favorites: [],
                createdAt: new Date().toISOString(),
              };
              await setDoc(ref, { ...newData, createdAt: serverTimestamp() });
              setUserData(newData);
            }
          } catch {
            // Firestore error — still allow the app to render
          }
        } else {
          setUserData(null);
        }
        setLoading(false);
      });
    } catch {
      // Firebase initialization error — clear the timer and unblock the app
      clearTimeout(safetyTimer);
      setLoading(false);
    }

    return () => {
      clearTimeout(safetyTimer);
      unsub?.();
    };
  }, []);

  const signInWithGoogle = useCallback(async () => {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider);
  }, []);

  const signOut = useCallback(async () => {
    await firebaseSignOut(auth);
  }, []);

  return (
    <AuthContext.Provider value={{ user, userData, loading, signInWithGoogle, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
