<script lang="ts">
	import { useApp } from './hooks/useApp';
	import { useCanvasEvents } from './hooks/useCanvasEvents';
	import Shape from './Shape.svelte';

	const app = useApp();
	const events = useCanvasEvents();

	const { renderingShapes } = app;

	let rCanvas: HTMLDivElement;
	let rHtmlLayer: HTMLDivElement;
</script>

<div
	bind:this={rCanvas}
	draggable={false}
	class="tl-canvas"
	data-wd="canvas"
	on:pointerdown={events.onPointerDown}
	on:pointermove={events.onPointerMove}
	on:pointerup={events.onPointerUp}
	on:pointerenter={events.onPointerEnter}
	on:pointerleave={events.onPointerLeave}
	on:dragover={events.onDragOver}
	on:drop={events.onDrop}
	on:touchstart={events.onTouchStart}
	on:touchend={events.onTouchEnd}
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
		<!-- <SelectionBg /> -->
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
			<SelectedIdIndicators />
			<HoveredShapeIndicator />
			<SelectionFg />
			<HintedShapeIndicator />
			<SnapLinesWrapper />
			<HandlesWrapper />
			{debugFlags.newLiveCollaborators.value ? (
				<LiveCollaboratorsNext />
			) : (
				<LiveCollaborators />
			)} -->
		</div>
	</div>
</div>
