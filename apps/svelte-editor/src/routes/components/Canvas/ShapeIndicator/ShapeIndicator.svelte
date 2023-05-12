<script lang="ts">
	import { Matrix2d } from '@tldraw/primitives';
	import type { TLShapeId } from '@tldraw/tlschema';
	import { useApp } from '../../../hooks/useApp';

	export let id: TLShapeId;
	export let isHinting: boolean | undefined = undefined;
	export let color: string | undefined = undefined;

	const app = useApp();

	$: transform = getTransform($app);
	// TODO: Unsure why ShapeWithPropsEquality is in the original implementation
	// $: shape = new ShapeWithPropsEquality($app.store.get(id))
	$: shape = $app.store.get(id);
	$: util = shape ? $app.getShapeUtil(shape) : null;
	$: indicator = shape ? util?.indicator(shape) : null;

	function getTransform(_tracking: unknown) {
		const pageTransform = $app.getPageTransformById(id);
		if (!pageTransform) return '';
		return Matrix2d.toCssString(pageTransform);
	}
</script>

<svg class="tl-svg-origin-container here">
	<g
		class="tl-shape-indicator"
		class:tl-shape-indicator__hinting={isHinting}
		{transform}
		stroke={color ?? 'var(--color-selected)'}
	>
		{#if indicator}
			<!-- TODO: <OptionalErrorBoundary
				fallback={
					ShapeIndicatorErrorFallback
						? (error) => <ShapeIndicatorErrorFallback error={error} />
						: null
				}
				onError={(error) =>
					app.annotateError(error, { origin: 'react.shapeIndicator', willCrashApp: false })
				}
			> -->
			<svelte:component this={indicator} {shape} />
			<!-- </OptionalErrorBoundary> -->
		{/if}
	</g>
</svg>
