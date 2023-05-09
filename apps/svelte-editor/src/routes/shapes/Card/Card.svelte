<script lang="ts">
	import HtmlContainer from '../../components/HTMLContainer.svelte';
	import type { CardShape, CardUtil } from './Instance';

	export let util: CardUtil;
	export let shape: CardShape;

	// You can access class methods from here
	const bounds = util.bounds(shape);

	const style = `
		border: 1px solid black;
		display: flex;
		align-items: center;
		justify-content: center;
		pointer-events: all;
	`;
</script>

<!-- TODO: 
	Why is the HtmlContainer useful? 
	In Svelte, it'll be easier to apply styles to a locally scopable div. 
	HtmlContainer should potentially be an action. 
-->
<HtmlContainer id={shape.id} {style}>
	<!-- Anything you want can go here—it's a regular Svelte component -->
	{bounds.w.toFixed()}x{bounds.h.toFixed()}
</HtmlContainer>
