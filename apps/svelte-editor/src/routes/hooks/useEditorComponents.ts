import type { TLHandle, TLShapeId } from '@tldraw/tlschema';
import { getContext, SvelteComponentTyped } from 'svelte';

type TLHandleComponent = typeof SvelteComponentTyped<{
	shapeId: TLShapeId;
	handle: TLHandle;
}>;

/** @public */
export interface TLEditorComponents {
	// Background: TLBackgroundComponent | null
	// SvgDefs: TLSvgDefsComponent | null
	// Brush: TLBrushComponent | null
	// ZoomBrush: TLBrushComponent | null
	// Cursor: TLCursorComponent | null
	// CollaboratorBrush: TLBrushComponent | null
	// CollaboratorCursor: TLCursorComponent | null
	// CollaboratorHint: TLCollaboratorHintComponent | null
	// CollaboratorShapeIndicator: TLShapeIndicatorComponent | null
	// Grid: TLGridComponent | null
	// Scribble: TLScribbleComponent | null
	// CollaboratorScribble: TLScribbleComponent | null
	// SnapLine: TLSnapLineComponent | null
	Handle: TLHandleComponent | null;
	// ErrorFallback: TLErrorFallback | null
	// ShapeErrorFallback: TLShapeErrorFallback | null
	// ShapeIndicatorErrorFallback: TLShapeIndicatorErrorFallback | null
	// Spinner: TLSpinnerComponent | null
}

const EditorComponentsContext = {};

export function useEditorComponents(): TLEditorComponents {
	return getContext(EditorComponentsContext) || {};
}
