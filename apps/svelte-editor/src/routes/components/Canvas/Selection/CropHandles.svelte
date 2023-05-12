<script lang="ts">
	import { toDomPrecision } from '@tldraw/primitives';

	export let size: number;
	export let width: number;
	export let height: number;
	export let hideAlternateHandles: boolean;

	$: cropStrokeWidth = toDomPrecision(size / 3);
	$: offset = cropStrokeWidth / 2;
</script>

<svg class="tl-svg-origin-container">
	<!-- {/* Top left */} -->
	<polyline
		class="tl-corner-crop-handle"
		points={`
				${toDomPrecision(0 - offset)},${toDomPrecision(size)} 
				${toDomPrecision(0 - offset)},${toDomPrecision(0 - offset)} 
				${toDomPrecision(size)},${toDomPrecision(0 - offset)}`}
		stroke-width={cropStrokeWidth}
		data-wd="selection.crop.top_left"
		aria-label="top_left handle"
	/>
	<!-- {/* Top */} -->
	<line
		class="tl-corner-crop-edge-handle"
		class:tl-hidden={hideAlternateHandles}
		x1={toDomPrecision(width / 2 - size)}
		y1={toDomPrecision(0 - offset)}
		x2={toDomPrecision(width / 2 + size)}
		y2={toDomPrecision(0 - offset)}
		stroke-width={cropStrokeWidth}
		data-wd="selection.crop.top"
		aria-label="top handle"
	/>
	<!-- {/* Top right */} -->
	<polyline
		class="tl-corner-crop-handle"
		class:tl-hidden={hideAlternateHandles}
		points={`
				${toDomPrecision(width - size)},${toDomPrecision(0 - offset)} 
				${toDomPrecision(width + offset)},${toDomPrecision(0 - offset)} 
				${toDomPrecision(width + offset)},${toDomPrecision(size)}`}
		stroke-width={cropStrokeWidth}
		data-wd="selection.crop.top_right"
		aria-label="top_right handle"
	/>
	<!-- {/* Right */} -->
	<line
		class="tl-corner-crop-edge-handle"
		class:tl-hidden={hideAlternateHandles}
		x1={toDomPrecision(width + offset)}
		y1={toDomPrecision(height / 2 - size)}
		x2={toDomPrecision(width + offset)}
		y2={toDomPrecision(height / 2 + size)}
		stroke-width={cropStrokeWidth}
		data-wd="selection.crop.right"
		aria-label="right handle"
	/>
	<!-- {/* Bottom right */} -->
	<polyline
		class="tl-corner-crop-handle"
		points={`
				${toDomPrecision(width + offset)},${toDomPrecision(height - size)} 
				${toDomPrecision(width + offset)},${toDomPrecision(height + offset)}
				${toDomPrecision(width - size)},${toDomPrecision(height + offset)}`}
		stroke-width={cropStrokeWidth}
		data-wd="selection.crop.bottom_right"
		aria-label="bottom_right handle"
	/>
	<!-- {/* Bottom */} -->
	<line
		class="tl-corner-crop-edge-handle"
		class:tl-hidden={hideAlternateHandles}
		x1={toDomPrecision(width / 2 - size)}
		y1={toDomPrecision(height + offset)}
		x2={toDomPrecision(width / 2 + size)}
		y2={toDomPrecision(height + offset)}
		stroke-width={cropStrokeWidth}
		data-wd="selection.crop.bottom"
		aria-label="bottom handle"
	/>
	<!-- {/* Bottom left */} -->
	<polyline
		class="tl-corner-crop-handle"
		class:tl-hidden={hideAlternateHandles}
		points={`
				${toDomPrecision(0 + size)},${toDomPrecision(height + offset)} 
				${toDomPrecision(0 - offset)},${toDomPrecision(height + offset)}
				${toDomPrecision(0 - offset)},${toDomPrecision(height - size)}`}
		stroke-width={cropStrokeWidth}
		data-wd="selection.crop.bottom_left"
		aria-label="bottom_left handle"
	/>
	<!-- {/* Left */} -->
	<line
		class="tl-corner-crop-edge-handle"
		class:tl-hidden={hideAlternateHandles}
		x1={toDomPrecision(0 - offset)}
		y1={toDomPrecision(height / 2 - size)}
		x2={toDomPrecision(0 - offset)}
		y2={toDomPrecision(height / 2 + size)}
		stroke-width={cropStrokeWidth}
		data-wd="selection.crop.left"
		aria-label="left handle"
	/>
</svg>
