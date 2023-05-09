<script lang="ts">
	import { setContext } from 'svelte';
	import Canvas from './Canvas.svelte';
	import { App, createShapeId, TldrawEditorConfig, type TLStore } from '@tldraw/editor';

	export let container: HTMLDivElement;
	export let store: TLStore;
	export let config: TldrawEditorConfig;

	const app = new App({
		store,
		config,
		getContainer: () => container
	});

	setContext('app', app);

	console.log({ app, config });
	app.createShapes([
		{
			id: createShapeId(),
			type: 'card',
			x: 12,
			y: 100
		}
	]);
</script>

<Canvas />
