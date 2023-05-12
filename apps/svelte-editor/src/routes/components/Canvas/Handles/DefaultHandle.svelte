<script lang="ts">
	import type { TLHandle, TLShapeId } from '@tldraw/tlschema';

	// TODO: Unsure if this was the correct replacement of classnames
	// import classNames from 'classnames';

	export let shapeId: TLShapeId;
	export let handle: TLHandle;
</script>

<g class="tl-handle" class:tl-handle__hint={handle.type !== 'vertex'}>
	<circle class="tl-handle__bg" />
	<circle class="tl-handle__fg" />
</g>
