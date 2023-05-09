import type { App } from '@tldraw/editor';
import { getContext } from 'svelte';
import type { Readable } from 'svelte/store';

export const useApp = (): Readable<App> => {
	return getContext('app');
};
