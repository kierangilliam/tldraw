<script lang="ts">
	import { useApp } from '../../../hooks/useApp';
	import ShapeIndicator from './ShapeIndicator.svelte';

	const app = useApp();

	$: displayingHoveredId = $app.isInAny('select.idle', 'select.editing_shape')
		? $app.pageState.hoveredId
		: null;

	$: console.log({ displayingHoveredId });
</script>

{#if displayingHoveredId}
	<ShapeIndicator id={displayingHoveredId} />
{/if}
