<script lang="ts">
	import { toDomPrecision, type RotateCorner } from '@tldraw/primitives';
	import { useSelectionEvents } from '../../../hooks/useSelectionEvents';
	import { useEvents } from '../../../hooks/useEvents';

	export let cx: number;
	export let cy: number;
	export let targetSize: number;
	export let corner: RotateCorner;
	export let cursor: string | undefined = undefined;
	export let isHidden: boolean;
	export let dataWd: string | undefined = undefined;

	$: events = useSelectionEvents(corner);
</script>

<rect
	class="tl-transparent tl-rotate-corner"
	class:tl-hidden={isHidden}
	data-wd={dataWd}
	aria-label={`${corner} target`}
	pointer-events="all"
	x={toDomPrecision(cx - targetSize * 3)}
	y={toDomPrecision(cy - targetSize * 3)}
	width={toDomPrecision(Math.max(1, targetSize * 3))}
	height={toDomPrecision(Math.max(1, targetSize * 3))}
	{cursor}
	use:useEvents={$events}
/>
