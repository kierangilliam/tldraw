import type { TLShape } from '@tldraw/tlschema';

export function htmlContainer(node: HTMLElement, shape: TLShape) {
	node.id = shape.id;
	node.classList.add('tl-html-container');
}
