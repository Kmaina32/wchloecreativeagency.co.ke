
'use client';

import { firebaseConfig } from '@/firebase/config';
import { initializeApp, getApps, getApp, FirebaseApp } from 'firebase/app';
import { Auth, getAuth, signInWithEmailAndPassword } from 'firebase/auth'; // Import Auth
import { getFirestore, Firestore } from 'firebase/firestore'; // Import Firestore

// IMPORTANT: DO NOT MODIFY THIS FUNCTION
export function initializeFirebase() {
  if (getApps().length > 0) {
    return getSdks(getApp());
  }

  // When not in a production Firebase Hosting environment, we need to initialize
  // with the config object. In production, App Hosting provides the configuration
  // automatically.
  const firebaseApp = initializeApp(firebaseConfig);
  return getSdks(firebaseApp);
}

export function getSdks(firebaseApp: FirebaseApp) {
  return {
    firebaseApp,
    auth: getAuth(firebaseApp),
    firestore: getFirestore(firebaseApp)
  };
}

export async function initiateEmailSignIn(auth: Auth, email: string, password: string): Promise<void> {
  // We now await the result to catch potential errors at the call site.
  await signInWithEmailAndPassword(auth, email, password);
}


export * from './provider';
export * from './client-provider';
export * from './firestore/use-collection';
export * from './firestore/use-doc';
export * from './non-blocking-updates';
export * from './errors';
export * from './error-emitter';
