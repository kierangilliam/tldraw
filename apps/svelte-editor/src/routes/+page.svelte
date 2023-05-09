<script lang="ts">
	import AppWrapper from './AppWrapper.svelte';
	import { TLInstance, TLUser, TldrawEditorConfig } from '@tldraw/editor';
	import { CardShape, CardTool } from './shapes/Card/Instance';
	import '@tldraw/editor/editor.css';

	export let userId;
	export let instanceId;

	// TODO: "TldrawEditorConfig.Svelte.default"
	const createConfig = () => {
		// Finally, collect the custom tools and shapes into a config object
		const customTldrawConfig = new TldrawEditorConfig({
			tools: [CardTool],
			shapes: [CardShape],
			allowUnknownShapes: true
		});

		return customTldrawConfig;
	};

	const config = createConfig(); // TldrawEditorConfig.default;

	const store = config.createStore({
		userId: userId ?? TLUser.createId(),
		instanceId: instanceId ?? TLInstance.createId()
	});

	let container: HTMLDivElement;
</script>

<div bind:this={container}>
	{#if container}
		<AppWrapper {store} {config} {container} />
	{/if}
</div>
