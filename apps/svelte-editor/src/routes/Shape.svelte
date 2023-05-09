<script lang="ts">
	import type { TLShapeId } from '@tldraw/tlschema';
	import { useApp } from './hooks/useApp';
	import { useShapeEvents } from './hooks/useShapeEvents';
	import { Matrix2d } from '@tldraw/primitives';

	export let id: TLShapeId;
	export let index: number;
	export let opacity: number;
	export let isCulled: boolean;

	const app = useApp();
	const events = useShapeEvents(id);

	$: shape = $app.getShapeById(id);
	$: util = shape ? $app.getShapeUtil(shape) : null;

	let rContainer: HTMLDivElement;

	// TODO: There are more Svelte-y alternatives
	// to all of these.
	$: setShapeContainerTransformPosition(rContainer, $app);
	$: setShapeContainerClipPathAndOrColor(rContainer, $app);
	$: setShapeHeightAndWidth(rContainer, $app);
	$: setOpacityOfContainerWhenChanged(rContainer, [opacity, index]);

	const setShapeContainerTransformPosition = (elm: HTMLElement, _tracking: unknown) => {
		if (!elm) return;

		const pageTransform = $app.getPageTransformById(id);

		if (!shape || !pageTransform) return null;

		const transform = Matrix2d.toCssString(pageTransform);
		elm.style.setProperty('transform', transform);
	};

	const setShapeContainerClipPathAndOrColor = (elm: HTMLElement, _tracking: unknown) => {
		if (!elm) return;
		if (!shape) return null;

		const clipPath = $app.getClipPathById(id);
		elm.style.setProperty('clip-path', clipPath ?? 'none');
		if ('color' in shape.props) {
			elm.style.setProperty('color', $app.getCssColor(shape.props.color));
		}
	};

	const setShapeHeightAndWidth = (elm: HTMLElement, _tracking: unknown) => {
		if (!elm) return;
		if (!shape) return null;
		if (!util) return null;

		const bounds = util.bounds(shape);
		elm.style.setProperty('width', Math.ceil(bounds.width) + 'px');
		elm.style.setProperty('height', Math.ceil(bounds.height) + 'px');
	};

	const setOpacityOfContainerWhenChanged = (elm: HTMLElement, _tracking: unknown) => {
		if (!elm) return;
		elm.style.setProperty('opacity', opacity + '');
		elm.style.setProperty('z-index', index + '');
	};
</script>

<!-- key={id} -->
{#if shape && util}
	<div
		bind:this={rContainer}
		class="tl-shape"
		data-shape-type={shape.type}
		draggable={false}
		on:pointerdown={$events.onPointerDown}
		on:pointermove={$events.onPointerMove}
		on:pointerup={$events.onPointerUp}
		on:pointerenter={$events.onPointerEnter}
		on:pointerleave={$events.onPointerLeave}
	>
		{#if isCulled && util.canUnmount(shape)}
			{@const bounds = util.bounds(shape)}
			<!-- Translated: <CulledShape {shape} {util} /> -->
			<div
				class="tl-shape__culled"
				style="transform: translate({bounds.minX}px, {bounds.minY}px); width: {bounds.width}; height: {bounds.height}"
			/>
		{:else}
			<!-- <OptionalErrorBoundary
					fallback={ShapeErrorFallback ? (error) => <ShapeErrorFallback error={error} /> : null}
					onError={(error) =>
						app.annotateError(error, { origin: 'react.shape', willCrashApp: false })
					}
				> -->
			<!-- Translated: <InnerShape {shape} {util} /> -->
			<svelte:component this={util.render(shape)} {util} {shape} />
			<!-- </OptionalErrorBoundary> -->
		{/if}
	</div>
{/if}
