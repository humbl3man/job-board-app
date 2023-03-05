/* eslint-disable @typescript-eslint/no-empty-function */
import { browser } from '$app/environment';
import { goto } from '$app/navigation';
import type { Auth, User } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { readable } from 'svelte/store';
import { db } from './firebase/db';
import { user as userStore } from './user';

function createAuth() {
	let auth: Auth;

	const { subscribe } = readable<User | null>(undefined, (set) => {
		let unsubscribe = () => {};

		async function init() {
			if (browser) {
				const { app } = await import('$lib/firebase/app');
				const { getAuth, onAuthStateChanged } = await import('firebase/auth');
				auth = getAuth(app);
				unsubscribe = onAuthStateChanged(auth, async (user) => {
					if (user) {
						set(user);
						const userDoc = await getDoc(doc(db, 'users', user.uid));
						if (userDoc.exists()) {
							userStore.set({ ...userDoc.data(), id: userDoc.id });
						} else {
							userStore.set(undefined);
						}
					} else {
						set(null);
						userStore.set(undefined);
					}
				});
			}
		}

		init();

		return unsubscribe;
	});

	return {
		subscribe,
		emailLogin: async (email: string, password: string) => {
			try {
				const { signInWithEmailAndPassword } = await import('firebase/auth');
				await signInWithEmailAndPassword(auth, email, password);
			} catch (error: any) {
				throw new Error(error.message);
			}
		},
		registerWithEmail: async (email: string, password: string, companyName?: string) => {
			const { createUserWithEmailAndPassword } = await import('firebase/auth');
			try {
				const registerObj = await createUserWithEmailAndPassword(auth, email, password);
				// now we add this user to firestore db
				await setDoc(doc(db, 'users', registerObj.user.uid), {
					email: registerObj.user.email,
					displayName: registerObj.user.displayName ?? null,
					isEmployer: Boolean(companyName),
					companyName,
					createdAt: new Date(),
					updatedAt: null
				});
			} catch (error: any) {
				throw new Error(error.message);
			}
		},
		signInWithGoogle: async () => {
			const { signInWithPopup, GoogleAuthProvider } = await import('firebase/auth');
			const provider = new GoogleAuthProvider();
			await signInWithPopup(auth, provider);
		},
		logout: async () => {
			const { signOut } = await import('firebase/auth');
			await signOut(auth);
			goto('/login');
		}
	};
}

export const auth = createAuth();
