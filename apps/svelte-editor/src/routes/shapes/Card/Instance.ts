import {
	defineShape,
	TLBoxTool,
	TLBoxUtil,
	type TLBaseShape,
	type TLOpacityType
} from '@tldraw/editor';
import Card from './Card.svelte';
import Indicator from './CardIndicator.svelte';

// Shape Type
// ----------
// The shape type defines the card's type (`card`) and its props.
// Every shape needs an opacity prop (for now), but other than that
// you can add whatever you want, so long as it's JSON serializable.
export type CardShape = TLBaseShape<
	'card',
	{
		w: number;
		h: number;
		opacity: TLOpacityType;
	}
>;

// Shape Definition
// ----------------
// The shape definition is used to tell TypeScript about the shape
// and to register the shape with the app.
export const CardShape = defineShape<CardShape>({
	type: 'card',
	getShapeUtil: () => CardUtil
	// validator: createShapeValidator({ ... })
});

// Shape Util
// ----------
// The CardUtil class is used by the app to answer questions about a
// shape of the 'card' type. For example, what is the default props
// for this shape? What should we render for it, or for its indicator?
export class CardUtil extends TLBoxUtil<CardShape> {
	static type = 'card';

	// There are a LOT of other things we could add here, like these flags
	override isAspectRatioLocked = (_shape: CardShape) => false;
	override canResize = (_shape: CardShape) => true;
	override canBind = (_shape: CardShape) => true;

	override defaultProps(): CardShape['props'] {
		return {
			opacity: '1',
			w: 300,
			h: 300
		};
	}

	// This is the component that will be rendered for the shape.
	// Try changing the contents of the HTMLContainer to see what happens.
	render(shape: CardShape) {
		return Card;
	}

	// The indicator is used when hovering over a shape or when it's selected.
	// This can only be SVG path data; generally you want the outline of the
	// component you're rendering.
	indicator(shape: CardShape) {
		return Indicator;
	}
}

// Tool
// ----
// Because the card tool can be just a rectangle, we can extend the
// TLBoxTool class. This gives us a lot of functionality for free.
export class CardTool extends TLBoxTool {
	static override id = 'card';
	static override initial = 'idle';
	override shapeType = 'card';
}
