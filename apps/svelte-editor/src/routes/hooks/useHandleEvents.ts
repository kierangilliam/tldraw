import { createHandleEvents, type TLShapeId } from '@tldraw/editor';
import { derived } from 'svelte/store';
import { useApp } from './useApp';

export function useHandleEvents(id: TLShapeId, handleId: string) {
	const app = useApp();

	return derived(app, ($app) => {
		return createHandleEvents($app, id, handleId);
	});
}
