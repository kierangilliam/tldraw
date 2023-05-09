import type { App } from '@tldraw/editor';
import { getContext } from 'svelte';

export const useApp = (): App => {
	return getContext('app');
};
