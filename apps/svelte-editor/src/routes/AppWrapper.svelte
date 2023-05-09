<script lang="ts">
	import { setContext } from 'svelte';
	import Canvas from './Canvas.svelte';
	import { App, createShapeId, TldrawEditorConfig, type TLStore } from '@tldraw/editor';
	import { writable } from 'svelte/store';

	export let container: HTMLDivElement;
	export let store: TLStore;
	export let config: TldrawEditorConfig;

	const app = new App({
		store,
		config,
		getContainer: () => container
	});

	const appStore = writable(app);

	setContext('app', appStore);

	console.log({ app, config });
	app.createShapes([
		{
			id: createShapeId(),
			type: 'card',
			x: 12,
			y: 100
		}
	]);

	store.listen((listener) => {
		$appStore = app;
	});
</script>

<Canvas />
