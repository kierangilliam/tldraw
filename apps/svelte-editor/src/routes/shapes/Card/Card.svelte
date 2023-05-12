<script lang="ts">
	import { htmlContainer } from '../../hooks/useTlHtmlContainer';
	import type { CardShape, CardUtil } from './Instance';

	export let util: CardUtil;
	export let shape: CardShape;

	$: bounds = util.bounds(shape);
</script>

<div use:htmlContainer={shape}>
	{bounds.w.toFixed()}x{bounds.h.toFixed()}
</div>

<style>
	div {
		border: 1px solid black;
		display: flex;
		align-items: center;
		justify-content: center;
		pointer-events: all;
	}
</style>
