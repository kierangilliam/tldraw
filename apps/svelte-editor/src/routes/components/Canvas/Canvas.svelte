<script lang="ts">
	import { useApp } from '../../hooks/useApp';
	import { useCanvasEvents } from '../../hooks/useCanvasEvents';
	import Shape from '../../Shape.svelte';
	import HandlesWrapper from './Handles/HandlesWrapper.svelte';
	import SelectionBg from './SelectionBg.svelte';
	import SelectionFg from './SelectionFg.svelte';
	import HoveredShapeIndicator from './ShapeIndicator/HoveredShapeIndicator.svelte';

	const app = useApp();
	const events = useCanvasEvents();

	$: ({ renderingShapes } = $app);

	// const { Background, SvgDefs } = useEditorComponents()

	// useScreenBounds()
	// useDocumentEvents()
	// useCoarsePointer()

	// useGestureEvents(rCanvas)
	// useFixSafariDoubleTapZoomPencilEvents(rCanvas)

	// useQuickReactor(
	// 	'position layers',
	// 	() => {
	// 		const htmlElm = rHtmlLayer.current
	// 		if (!htmlElm) return

	// 		const { x, y, z } = app.camera

	// 		// Because the html container has a width/height of 1px, we
	// 		// need to create a small offset when zoomed to ensure that
	// 		// the html container and svg container are lined up exactly.
	// 		const offset =
	// 			z >= 1 ? modulate(z, [1, 8], [0.125, 0.5], true) : modulate(z, [0.1, 1], [-2, 0.125], true)

	// 		htmlElm.style.setProperty(
	// 			'transform',
	// 			`scale(${toDomPrecision(z)}) translate(${toDomPrecision(x + offset)}px,${toDomPrecision(
	// 				y + offset
	// 			)}px)`
	// 		)
	// 	},
	// 	[app]
	// )

	// const { context: patternContext, isReady: patternIsReady } = usePattern()

	// const events = useCanvasEvents()
	// if (onDropOverride) {
	// 	events.onDrop = onDropOverride(events.onDrop)
	// }

	// React.useEffect(() => {
	// 	if (patternIsReady && app.isSafari) {
	// 		const htmlElm = rHtmlLayer.current

	// 		if (htmlElm) {
	// 			// Wait for `patternContext` to be picked up
	// 			requestAnimationFrame(() => {
	// 				htmlElm.style.display = 'none'

	// 				// Wait for 'display = "none"' to take effect
	// 				requestAnimationFrame(() => {
	// 					htmlElm.style.display = ''
	// 				})
	// 			})
	// 		}
	// 	}
	// }, [app, patternIsReady])

	// React.useEffect(() => {
	// 	rCanvas.current?.focus()
	// }, [])

	let rCanvas: HTMLDivElement;
	let rHtmlLayer: HTMLDivElement;
</script>

<div
	bind:this={rCanvas}
	draggable={false}
	class="tl-canvas"
	data-wd="canvas"
	on:pointerdown={$events.onPointerDown}
	on:pointermove={$events.onPointerMove}
	on:pointerup={$events.onPointerUp}
	on:pointerenter={$events.onPointerEnter}
	on:pointerleave={$events.onPointerLeave}
	on:dragover={$events.onDragOver}
	on:drop={$events.onDrop}
	on:touchstart={$events.onTouchStart}
	on:touchend={$events.onTouchEnd}
>
	<!-- {Background && <Background />}
	<GridWrapper />
	<UiLogger /> -->
	<div bind:this={rHtmlLayer} class="tl-html-layer" draggable={false}>
		<!-- <svg className="tl-svg-context">
			<defs>
				{patternContext}
				{Cursor && <Cursor />}
				<CollaboratorHint />
				<ArrowheadDot />
				<ArrowheadCross />
				{SvgDefs && <SvgDefs />}
			</defs>
		</svg> -->
		<SelectionBg />
		<div class="tl-shapes">
			<!-- TODO: Debug svg -->
			<!-- Translated: <ShapesToDisplay /> -->
			{#each renderingShapes as result (result.id)}
				<Shape {...result} />
			{/each}
		</div>
		<div class="tl-overlays">
			<!-- <ScribbleWrapper />
			<BrushWrapper />
			<ZoomBrushWrapper />
			<SelectedIdIndicators /> -->
			<HoveredShapeIndicator />
			<!-- <SelectionFg /> -->
			<!-- <HintedShapeIndicator /> -->
			<!-- <SnapLinesWrapper /> -->
			<HandlesWrapper />
			<!-- {debugFlags.newLiveCollaborators.value ? (
				<LiveCollaboratorsNext />
			) : (
				<LiveCollaborators />
			)} -->
		</div>
	</div>
</div>
