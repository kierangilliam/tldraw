<script lang="ts">
	import { toDomPrecision } from '@tldraw/primitives';
	import { useApp } from '../../../hooks/useApp';
	import { getCursor } from '@tldraw/editor';
	import { useSelectionEvents } from '../../../hooks/useSelectionEvents';
	import { useTransform } from '../../../hooks/useTransform';
	import CropHandles from './CropHandles.svelte';
	import RotateCornerHandle from './RotateCornerHandle.svelte';
	import type { App } from '@tldraw/editor';
	import MobileRotateHandle from './MobileRotateHandle.svelte';
	import { useEvents } from '../../../hooks/useEvents';

	const app = useApp();
	let rSvg: SVGElement | null = null;

	$: ({
		isReadonlyMode,
		topEvents,
		rightEvents,
		bottomEvents,
		leftEvents,
		topLeftEvents,
		topRightEvents,
		bottomRightEvents,
		bottomLeftEvents,
		isDefaultCursor,
		textHandleHeight,
		rotation,
		isChangingStyles,
		width,
		height,
		size,
		isTinyX,
		isTinyY,
		isSmallX,
		isSmallY,
		targetSize,
		targetSizeX,
		targetSizeY,
		onlyShape,
		showSelectionBounds,
		shouldDisplayBox,
		showCropHandles,
		showResizeHandles,
		hideAlternateCornerHandles,
		showOnlyOneHandle,
		hideAlternateCropHandles,
		showHandles,
		hideRotateCornerHandles,
		hideMobileRotateHandle,
		hideTopLeftCorner,
		hideTopRightCorner,
		hideBottomLeftCorner,
		hideBottomRightCorner,
		hideEdgeTargets,
		showTextResizeHandles
	} = state($app));

	const state = (app: App) => {
		const isReadonlyMode = app.isReadOnly;
		const topEvents = useSelectionEvents('top');
		const rightEvents = useSelectionEvents('right');
		const bottomEvents = useSelectionEvents('bottom');
		const leftEvents = useSelectionEvents('left');
		const topLeftEvents = useSelectionEvents('top_left');
		const topRightEvents = useSelectionEvents('top_right');
		const bottomRightEvents = useSelectionEvents('bottom_right');
		const bottomLeftEvents = useSelectionEvents('bottom_left');

		const isDefaultCursor = !app.isMenuOpen && app.cursor.type === 'default';
		const isCoarsePointer = app.isCoarsePointer;

		const bounds = app.selectionBounds;

		useTransform(rSvg, {
			x: bounds?.x,
			y: bounds?.y,
			scale: 1,
			rotate: app.selectionRotation
		});

		if (!bounds) return {};

		const zoom = app.zoomLevel;
		const shapes = app.selectedShapes;
		const rotation = app.selectionRotation;
		const isChangingStyles = app.isChangingStyle;

		const width = Math.max(1, bounds.width);
		const height = Math.max(1, bounds.height);

		const size = 8 / zoom;
		const isTinyX = width < size * 2;
		const isTinyY = height < size * 2;

		const isSmallX = width < size * 4;
		const isSmallY = height < size * 4;
		const isSmallCropX = width < size * 5;
		const isSmallCropY = height < size * 5;

		const mobileHandleMultiplier = isCoarsePointer ? 1.75 : 1;
		const targetSize = (6 / zoom) * mobileHandleMultiplier;

		const targetSizeX = (isSmallX ? targetSize / 2 : targetSize) * (mobileHandleMultiplier * 0.75);
		const targetSizeY = (isSmallY ? targetSize / 2 : targetSize) * (mobileHandleMultiplier * 0.75);

		const onlyShape = shapes.length === 1 ? shapes[0] : null;

		const showSelectionBounds =
			(onlyShape ? !app.getShapeUtil(onlyShape).hideSelectionBoundsFg(onlyShape) : true) &&
			!isChangingStyles;

		const shouldDisplayBox =
			(showSelectionBounds &&
				app.isInAny(
					'select.idle',
					'select.brushing',
					'select.editing_shape',
					'select.scribble_brushing',
					'select.pointing_canvas',
					'select.pointing_selection',
					'select.pointing_shape',
					'select.crop.idle',
					'select.crop.pointing_crop',
					'select.pointing_resize_handle',
					'select.pointing_crop_handle'
				)) ||
			(showSelectionBounds &&
				app.isIn('select.resizing') &&
				onlyShape &&
				shapes[0].type === 'text');

		shouldDisplayBox;
		const showCropHandles =
			app.isInAny('select.pointing_crop_handle', 'select.crop.idle', 'select.crop.pointing_crop') &&
			!isChangingStyles &&
			!isReadonlyMode;

		const shouldDisplayControls =
			app.isInAny(
				'select.idle',
				'select.pointing_selection',
				'select.pointing_shape',
				'select.crop.idle'
			) &&
			!isChangingStyles &&
			!isReadonlyMode;

		const showCornerRotateHandles =
			!isCoarsePointer &&
			!(isTinyX || isTinyY) &&
			(shouldDisplayControls || showCropHandles) &&
			(onlyShape ? !app.getShapeUtil(onlyShape).hideRotateHandle(onlyShape) : true);

		const showMobileRotateHandle =
			isCoarsePointer &&
			(!isSmallX || !isSmallY) &&
			(shouldDisplayControls || showCropHandles) &&
			(onlyShape ? !app.getShapeUtil(onlyShape).hideRotateHandle(onlyShape) : true);

		const showResizeHandles =
			shouldDisplayControls &&
			(onlyShape
				? app.getShapeUtil(onlyShape).canResize(onlyShape) &&
				  !app.getShapeUtil(onlyShape).hideResizeHandles(onlyShape)
				: true) &&
			!showCropHandles;

		const hideAlternateCornerHandles = isTinyX || isTinyY;
		const showOnlyOneHandle = isTinyX && isTinyY;
		const hideAlternateCropHandles = isSmallCropX || isSmallCropY;

		const showHandles = showResizeHandles || showCropHandles;
		const hideRotateCornerHandles = !showCornerRotateHandles;
		const hideMobileRotateHandle = !shouldDisplayControls || !showMobileRotateHandle;
		const hideTopLeftCorner = !shouldDisplayControls || !showHandles;
		const hideTopRightCorner = !shouldDisplayControls || !showHandles || hideAlternateCornerHandles;
		const hideBottomLeftCorner =
			!shouldDisplayControls || !showHandles || hideAlternateCornerHandles;
		const hideBottomRightCorner =
			!shouldDisplayControls || !showHandles || (showOnlyOneHandle && !showCropHandles);

		let hideEdgeTargetsDueToCoarsePointer = isCoarsePointer;

		if (
			hideEdgeTargetsDueToCoarsePointer &&
			shapes.every((shape) => app.getShapeUtil(shape).isAspectRatioLocked(shape))
		) {
			hideEdgeTargetsDueToCoarsePointer = false;
		}

		// If we're showing crop handles, then show the edges too.
		// If we're showing resize handles, then show the edges only
		// if we're not hiding them for some other reason
		let hideEdgeTargets = true;

		if (showCropHandles) {
			hideEdgeTargets = hideAlternateCropHandles;
		} else if (showResizeHandles) {
			hideEdgeTargets =
				hideAlternateCornerHandles || showOnlyOneHandle || hideEdgeTargetsDueToCoarsePointer;
		}

		const textHandleHeight = Math.min(24 / zoom, height - targetSizeY * 3);
		const showTextResizeHandles =
			shouldDisplayControls &&
			isCoarsePointer &&
			onlyShape?.type === 'text' &&
			textHandleHeight * zoom >= 4;

		return {
			isReadonlyMode,
			topEvents,
			rightEvents,
			bottomEvents,
			leftEvents,
			topLeftEvents,
			topRightEvents,
			bottomRightEvents,
			bottomLeftEvents,
			isDefaultCursor,
			textHandleHeight,
			rotation,
			isChangingStyles,
			width,
			height,
			size,
			isTinyX,
			isTinyY,
			isSmallX,
			isSmallY,
			targetSize,
			targetSizeX,
			targetSizeY,
			onlyShape,
			showSelectionBounds,
			shouldDisplayBox,
			showCropHandles,
			showResizeHandles,
			hideAlternateCornerHandles,
			showOnlyOneHandle,
			hideAlternateCropHandles,
			showHandles,
			hideRotateCornerHandles,
			hideMobileRotateHandle,
			hideTopLeftCorner,
			hideTopRightCorner,
			hideBottomLeftCorner,
			hideBottomRightCorner,
			hideEdgeTargets,
			showTextResizeHandles
		};
	};

	$: console.log({
		test: state($app),
		test2: $app.selectionBounds,
		display:
			height &&
			width &&
			targetSize &&
			hideRotateCornerHandles &&
			targetSizeX &&
			targetSizeY &&
			size &&
			textHandleHeight &&
			hideMobileRotateHandle &&
			hideAlternateCropHandles &&
			topEvents &&
			rightEvents &&
			bottomEvents &&
			leftEvents &&
			topLeftEvents &&
			topRightEvents &&
			bottomRightEvents &&
			bottomLeftEvents
	});
</script>

<!-- TODO: Gnarly -->
{#if height != null && width != null && targetSize != null && hideRotateCornerHandles != null && targetSizeX != null && targetSizeY != null && size != null && textHandleHeight != null && hideMobileRotateHandle != null && hideAlternateCropHandles != null && topEvents != null && rightEvents != null && bottomEvents != null && leftEvents != null && topLeftEvents != null && topRightEvents != null && bottomRightEvents != null && bottomLeftEvents != null}
	<svg class="tl-svg-origin-container" bind:this={rSvg}>
		<g data-wd="selection-foreground" class="tlui-selection__fg">
			<rect
				class="tlui-selection__fg__outline"
				class:tl-hidden={!shouldDisplayBox}
				width={toDomPrecision(width)}
				height={toDomPrecision(height)}
			/>
			<RotateCornerHandle
				dataWd="selection.rotate.top-left"
				cx={0}
				cy={0}
				{targetSize}
				corner="top_left_rotate"
				cursor={isDefaultCursor ? getCursor('nwse-rotate', rotation) : undefined}
				isHidden={hideRotateCornerHandles}
			/>
			<RotateCornerHandle
				dataWd="selection.rotate.top-right"
				cx={width + targetSize * 3}
				cy={0}
				{targetSize}
				corner="top_right_rotate"
				cursor={isDefaultCursor ? getCursor('nesw-rotate', rotation) : undefined}
				isHidden={hideRotateCornerHandles}
			/>
			<RotateCornerHandle
				dataWd="selection.rotate.bottom-left"
				cx={0}
				cy={height + targetSize * 3}
				{targetSize}
				corner="bottom_left_rotate"
				cursor={isDefaultCursor ? getCursor('swne-rotate', rotation) : undefined}
				isHidden={hideRotateCornerHandles}
			/>
			<RotateCornerHandle
				dataWd="selection.rotate.bottom-right"
				cx={width + targetSize * 3}
				cy={height + targetSize * 3}
				{targetSize}
				corner="bottom_right_rotate"
				cursor={isDefaultCursor ? getCursor('senw-rotate', rotation) : undefined}
				isHidden={hideRotateCornerHandles}
			/>{' '}
			<MobileRotateHandle
				dataWd="selection.rotate.mobile"
				cx={isSmallX ? -targetSize * 1.5 : width / 2}
				cy={isSmallX ? height / 2 : -targetSize * 1.5}
				{size}
				isHidden={hideMobileRotateHandle}
			/>
			<!-- Targets -->
			<rect
				class="tl-transparent"
				class:tl-hidden={hideEdgeTargets}
				data-wd="selection.resize.top"
				aria-label="top target"
				pointer-events="all"
				x={0}
				y={toDomPrecision(0 - (isSmallY ? targetSizeY * 2 : targetSizeY))}
				width={toDomPrecision(Math.max(1, width))}
				height={toDomPrecision(Math.max(1, targetSizeY * 2))}
				style:cursor={isDefaultCursor ? getCursor('ns-resize', rotation) : undefined}
				use:useEvents={$topEvents}
			/>
			<rect
				class="tl-transparent"
				class:tl-hidden={hideEdgeTargets}
				data-wd="selection.resize.right"
				aria-label="right target"
				pointer-events="all"
				x={toDomPrecision(width - (isSmallX ? 0 : targetSizeX))}
				y={0}
				height={toDomPrecision(Math.max(1, height))}
				width={toDomPrecision(Math.max(1, targetSizeX * 2))}
				style:cursor={isDefaultCursor ? getCursor('ew-resize', rotation) : undefined}
				use:useEvents={$rightEvents}
			/>
			<rect
				class="tl-transparent"
				class:tl-hidden={hideEdgeTargets}
				data-wd="selection.resize.bottom"
				aria-label="bottom target"
				pointer-events="all"
				x={0}
				y={toDomPrecision(height - (isSmallY ? 0 : targetSizeY))}
				width={toDomPrecision(Math.max(1, width))}
				height={toDomPrecision(Math.max(1, targetSizeY * 2))}
				style:cursor={isDefaultCursor ? getCursor('ns-resize', rotation) : undefined}
				use:useEvents={$bottomEvents}
			/>
			<rect
				class="tl-transparent"
				class:tl-hidden={hideEdgeTargets}
				data-wd="selection.resize.left"
				aria-label="left target"
				pointer-events="all"
				x={toDomPrecision(0 - (isSmallX ? targetSizeX * 2 : targetSizeX))}
				y={0}
				height={toDomPrecision(Math.max(1, height))}
				width={toDomPrecision(Math.max(1, targetSizeX * 2))}
				style:cursor={isDefaultCursor ? getCursor('ew-resize', rotation) : undefined}
				use:useEvents={$leftEvents}
			/>
			<!-- Corner Targets -->
			<rect
				class="tl-transparent"
				class:tl-hidden={hideTopLeftCorner}
				data-wd="selection.target.top-left"
				aria-label="top-left target"
				pointer-events="all"
				x={toDomPrecision(0 - (isSmallX ? targetSizeX * 2 : targetSizeX * 1.5))}
				y={toDomPrecision(0 - (isSmallY ? targetSizeY * 2 : targetSizeY * 1.5))}
				width={toDomPrecision(targetSizeX * 3)}
				height={toDomPrecision(targetSizeY * 3)}
				style:cursor={isDefaultCursor ? getCursor('nwse-resize', rotation) : undefined}
				use:useEvents={$topLeftEvents}
			/>
			<rect
				class="tl-transparent"
				class:tl-hidden={hideTopRightCorner}
				data-wd="selection.target.top-right"
				aria-label="top-right target"
				pointer-events="all"
				x={toDomPrecision(width - (isSmallX ? 0 : targetSizeX * 1.5))}
				y={toDomPrecision(0 - (isSmallY ? targetSizeY * 2 : targetSizeY * 1.5))}
				width={toDomPrecision(targetSizeX * 3)}
				height={toDomPrecision(targetSizeY * 3)}
				style:cursor={isDefaultCursor ? getCursor('nesw-resize', rotation) : undefined}
				use:useEvents={$topRightEvents}
			/>
			<rect
				class="tl-transparent"
				class:tl-hidden={hideBottomRightCorner}
				data-wd="selection.target.bottom-right"
				aria-label="bottom-right target"
				pointer-events="all"
				x={toDomPrecision(width - (isSmallX ? targetSizeX : targetSizeX * 1.5))}
				y={toDomPrecision(height - (isSmallY ? targetSizeY : targetSizeY * 1.5))}
				width={toDomPrecision(targetSizeX * 3)}
				height={toDomPrecision(targetSizeY * 3)}
				style:cursor={isDefaultCursor ? getCursor('nwse-resize', rotation) : undefined}
				use:useEvents={$bottomRightEvents}
			/>
			<rect
				class="tl-transparent"
				class:tl-hidden={hideBottomLeftCorner}
				data-wd="selection.target.bottom-left"
				aria-label="bottom-left target"
				pointer-events="all"
				x={toDomPrecision(0 - (isSmallX ? targetSizeX * 3 : targetSizeX * 1.5))}
				y={toDomPrecision(height - (isSmallY ? 0 : targetSizeY * 1.5))}
				width={toDomPrecision(targetSizeX * 3)}
				height={toDomPrecision(targetSizeY * 3)}
				style:cursor={isDefaultCursor ? getCursor('nesw-resize', rotation) : undefined}
				use:useEvents={$bottomLeftEvents}
			/>
			<!-- Resize Handles -->
			{#if showResizeHandles}
				<rect
					data-wd="selection.resize.top-left"
					class="'tl-corner-handle'"
					class:tl-hidden={hideTopLeftCorner}
					aria-label="top_left handle"
					x={toDomPrecision(0 - size / 2)}
					y={toDomPrecision(0 - size / 2)}
					width={toDomPrecision(size)}
					height={toDomPrecision(size)}
				/>
				<rect
					data-wd="selection.resize.top-right"
					class="tl-corner-handle"
					class:tl-hidden={hideTopRightCorner}
					aria-label="top_right handle"
					x={toDomPrecision(width - size / 2)}
					y={toDomPrecision(0 - size / 2)}
					width={toDomPrecision(size)}
					height={toDomPrecision(size)}
				/>
				<rect
					data-wd="selection.resize.bottom-right"
					class="tl-corner-handle"
					class:tl-hidden={hideBottomRightCorner}
					aria-label="bottom_right handle"
					x={toDomPrecision(width - size / 2)}
					y={toDomPrecision(height - size / 2)}
					width={toDomPrecision(size)}
					height={toDomPrecision(size)}
				/>
				<rect
					data-wd="selection.resize.bottom-left"
					class="tl-corner-handle"
					class:tl-hidden={hideBottomLeftCorner}
					aria-label="bottom_left handle"
					x={toDomPrecision(0 - size / 2)}
					y={toDomPrecision(height - size / 2)}
					width={toDomPrecision(size)}
					height={toDomPrecision(size)}
				/>
			{/if}

			{#if showTextResizeHandles}
				<rect
					data-wd="selection.text-resize.left.handle"
					class="tl-text-handle"
					aria-label="bottom_left handle"
					x={toDomPrecision(0 - size / 4)}
					y={toDomPrecision(height / 2 - textHandleHeight / 2)}
					rx={size / 4}
					width={toDomPrecision(size / 2)}
					height={toDomPrecision(textHandleHeight)}
				/>
				<rect
					data-wd="selection.text-resize.right.handle"
					class="tl-text-handle"
					aria-label="bottom_left handle"
					rx={size / 4}
					x={toDomPrecision(width - size / 4)}
					y={toDomPrecision(height / 2 - textHandleHeight / 2)}
					width={toDomPrecision(size / 2)}
					height={toDomPrecision(textHandleHeight)}
				/>
			{/if}
			<!-- Crop Handles -->
			{#if showCropHandles}
				<CropHandles {size} {width} {height} hideAlternateHandles={hideAlternateCropHandles} />
			{/if}
		</g>
	</svg>
{/if}
