<script lang="ts">
	import type { CardShape } from './Instance';

	export let shape: CardShape;
</script>

<rect width={shape.props.w} height={shape.props.h} />;

<style>
	rect {
		stroke: blue;
	}
</style>
