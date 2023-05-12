<script lang="ts">
	import { useEvents } from '../../../hooks/useEvents';
	import { useSelectionEvents } from '../../../hooks/useSelectionEvents';

	const SQUARE_ROOT_PI = Math.sqrt(Math.PI);

	export let cx: number;
	export let cy: number;
	export let size: number;
	export let isHidden: boolean;
	export let dataWd: string | undefined = undefined;

	$: events = useSelectionEvents('mobile_rotate');
</script>

<g>
	<circle
		data-wd={dataWd}
		pointer-events="all"
		class="tl-transparent tl-mobile-rotate__bg"
		class:tl-hidden={isHidden}
		{cx}
		{cy}
		use:useEvents={$events}
	/>
	<circle
		class="tl-mobile-rotate__fg"
		class:tl-hidden={isHidden}
		{cx}
		{cy}
		r={size / SQUARE_ROOT_PI}
	/>
</g>
