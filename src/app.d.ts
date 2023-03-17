// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			user: {
				email: string;
				id: number;
				company?: string;
				companyId?: number;
				name?: string | null;
			};
		}
		// interface PageData {}
		// interface Platform {}
	}
}

export {};
