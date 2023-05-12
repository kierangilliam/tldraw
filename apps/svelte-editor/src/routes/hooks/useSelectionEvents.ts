import { createSelectionEvents, type TLSelectionHandle } from '@tldraw/editor';
import { derived } from 'svelte/store';
import { useApp } from './useApp';

export function useSelectionEvents(handle: TLSelectionHandle) {
	const app = useApp();

	return derived(app, (app) => {
		return createSelectionEvents(app, handle);
	});
}
