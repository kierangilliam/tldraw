<script lang="ts">
	import type { TLHandle, TLShapeId } from '@tldraw/tlschema';
	import { useHandleEvents } from '../../../hooks/useHandleEvents';
	import { useEditorComponents } from '../../../hooks/useEditorComponents';

	export let shapeId: TLShapeId;
	export let handle: TLHandle;

	const events = useHandleEvents(shapeId, handle.id);
	const { Handle } = useEditorComponents();
</script>

{#if Handle}
	<g aria-label="handle" transform={`translate(${handle.x}, ${handle.y})`} {...events}>
		<svelte:component this={Handle} {shapeId} {handle} />
	</g>
{/if}
