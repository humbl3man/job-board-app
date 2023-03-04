import type { DocumentData } from 'firebase/firestore';
import { readable, writable } from 'svelte/store';

const user = writable<DocumentData | null>(null);

user.subscribe(() => {
	console.log('listening to changes');
});

export { user };
