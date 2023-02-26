/* eslint-disable @typescript-eslint/no-empty-function */
import { browser } from '$app/environment';
import { goto } from '$app/navigation';
import type { Auth, AuthError, User } from 'firebase/auth';
import { readable } from 'svelte/store';

function createAuth() {
	let auth: Auth;

	const { subscribe } = readable<User | null>(undefined, (set) => {
		let unsubscribe = () => {};

		async function init() {
			if (browser) {
				const { app } = await import('$lib/firebase/app');
				const { getAuth, onAuthStateChanged } = await import('firebase/auth');
				auth = getAuth(app);
				unsubscribe = onAuthStateChanged(auth, set);
			}
		}

		init();

		return unsubscribe;
	});

	return {
		subscribe,
		emailLogin: async (email: string, password: string) => {
			const { signInWithEmailAndPassword } = await import('firebase/auth');
			await signInWithEmailAndPassword(auth, email, password);
		},
		registerWithEmail: async (email: string, password: string) => {
			const { createUserWithEmailAndPassword } = await import('firebase/auth');
			await createUserWithEmailAndPassword(auth, email, password);
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
