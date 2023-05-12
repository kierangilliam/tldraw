<script lang="ts">
	import type { TLHandle } from '@tldraw/tlschema';
	import { useApp } from '../../../hooks/useApp';
	import HandleWrapper from './HandleWrapper.svelte';
	import { Matrix2d } from '@tldraw/primitives';

	const MIN_HANDLE_DISTANCE = 48;

	const app = useApp();

	$: zoom = $app.zoomLevel;
	$: isChangingStyle = $app.isChangingStyle;
	$: onlySelectedShape = $app.onlySelectedShape;
	$: shouldDisplayHandles =
		$app.isInAny('select.idle', 'select.pointing_handle') && !isChangingStyle && !$app.isReadOnly;
	$: ({ handlesToDisplay, transform } = calculateHandlesToDisplay($app));

	function calculateHandlesToDisplay(_tracking: unknown) {
		if (!onlySelectedShape) {
			return { handlesToDisplay: [], transform: undefined };
		}

		const util = $app.getShapeUtil(onlySelectedShape);
		const handles = util.handles?.(onlySelectedShape);
		const transform = $app.getPageTransform(onlySelectedShape);

		// Don't display a temporary handle if the distance between it and its neighbors is too small.
		const handlesToDisplay: TLHandle[] = [];

		if (!handles) {
			return { handlesToDisplay: [], transform };
		}

		for (let i = 0, handle = handles[i]; i < handles.length; i++, handle = handles[i]) {
			if (handle.type !== 'vertex') {
				const prev = handles[i - 1];
				const next = handles[i + 1];
				if (prev && next) {
					if (Math.hypot(prev.y - next.y, prev.x - next.x) < MIN_HANDLE_DISTANCE / zoom) {
						continue;
					}
				}
			}

			handlesToDisplay.push(handle);
		}

		handlesToDisplay.sort((a) => (a.type === 'vertex' ? 1 : -1));

		return { handlesToDisplay, transform };
	}
</script>

{#if onlySelectedShape && shouldDisplayHandles && transform}
	<svg class="tl-svg-origin-container">
		<g transform={Matrix2d.toCssString(transform)}>
			{#each handlesToDisplay as handle (handle.id)}
				<HandleWrapper shapeId={onlySelectedShape.id} {handle} />
			{/each}
		</g>
	</svg>
{/if}
