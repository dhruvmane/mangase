// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			user: {id: string, email: string, name: string, profilePicURL: string | null, profilePicKey: string | null} | null
		}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

declare module '*.md?raw' {
  const content: string;
  export default content;
}

export {};
