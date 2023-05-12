<script lang="ts">
	import { Matrix2d, toDomPrecision } from '@tldraw/primitives';
	import { useApp } from '../../../hooks/useApp';
	import { derived } from 'svelte/store';
	import {
		getPointerInfo,
		releasePointerCapture,
		setPointerCapture,
		type TLPointerEventInfo
	} from '@tldraw/editor';
	import { useEvents } from '../../../hooks/useEvents';

	const app = useApp();

	$: ({ selectionBounds: bounds, selectedIds } = $app);

	$: shouldDisplay = $app.isInAny(
		'select.idle',
		'select.brushing',
		'select.scribble_brushing',
		'select.pointing_shape',
		'select.pointing_selection',
		'text.resizing'
	);

	$: transform = bounds
		? Matrix2d.toCssString(
				Matrix2d.Compose(
					Matrix2d.Translate(bounds.minX, bounds.minY),
					Matrix2d.Rotate($app.selectionRotation)
				)
		  )
		: '';

	$: style = bounds
		? `
		transform: ${transform};
		width: ${toDomPrecision(Math.max(1, bounds.width))};
		height: ${toDomPrecision(Math.max(1, bounds.height))};
		pointerEvents: ${shouldDisplay ? 'all' : 'none'};
		opacity: ${shouldDisplay ? 1 : 0};
	`
		: '';

	const shouldRender = (_tracking: unknown) => {
		if (!bounds) return false;

		if (selectedIds.length === 1) {
			const shape = $app.getShapeById(selectedIds[0]);
			if (!shape) {
				return false;
			}
			const util = $app.getShapeUtil(shape);
			if (util.hideSelectionBoundsBg(shape)) {
				return false;
			}
		}

		return true;
	};

	const events = derived(app, (app) => {
		const onPointerDown = (e: React.PointerEvent) => {
			if ((e as any).isKilled) return;

			setPointerCapture(e.currentTarget, e);

			const info: TLPointerEventInfo = {
				type: 'pointer',
				target: 'selection',
				name: 'pointer_down',
				...getPointerInfo(e, app.getContainer())
			};

			app.dispatch(info);
		};

		const onPointerMove = (e: React.PointerEvent) => {
			if ((e as any).isKilled) return;

			const info: TLPointerEventInfo = {
				type: 'pointer',
				target: 'selection',
				name: 'pointer_move',
				...getPointerInfo(e, app.getContainer())
			};

			app.dispatch(info);
		};

		const onPointerUp = (e: React.PointerEvent) => {
			if ((e as any).isKilled) return;

			releasePointerCapture(e.currentTarget, e);

			const info: TLPointerEventInfo = {
				type: 'pointer',
				target: 'selection',
				name: 'pointer_up',
				...getPointerInfo(e, app.getContainer())
			};

			app.dispatch(info);
		};

		const onPointerEnter = (e: React.PointerEvent) => {
			if ((e as any).isKilled) return;

			const info: TLPointerEventInfo = {
				type: 'pointer',
				target: 'selection',
				name: 'pointer_enter',
				...getPointerInfo(e, app.getContainer())
			};

			app.dispatch(info);
		};

		const onPointerLeave = (e: React.PointerEvent) => {
			if ((e as any).isKilled) return;

			const info: TLPointerEventInfo = {
				type: 'pointer',
				target: 'selection',
				name: 'pointer_leave',
				...getPointerInfo(e, app.getContainer())
			};

			app.dispatch(info);
		};

		return {
			onPointerDown,
			onPointerMove,
			onPointerUp,
			onPointerEnter,
			onPointerLeave
		};
	});
</script>

{#if shouldRender($app)}
	<div class="tlui-selection__bg" draggable={false} {style} use:useEvents={$events} />
{/if}
