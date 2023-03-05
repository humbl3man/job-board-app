import type { DocumentData } from 'firebase/firestore';
import { writable } from 'svelte/store';

const user = writable<any>(undefined);

export { user };
