export function useTransform(
	node: HTMLElement | SVGElement | null,
	opts: {
		x?: number;
		y?: number;
		scale?: number;
		rotate?: number;
	}
) {
	// TODO: Original implementation
	// uses useLayoutEffect
	const { x, y, scale, rotate } = opts;
	const elm = node;
	if (!elm) return;
	if (x === undefined) return;

	if (scale !== undefined) {
		if (rotate !== undefined) {
			elm.style.transform = `translate(${x}px, ${y}px) scale(${scale}) rotate(${rotate}rad)`;
		} else {
			elm.style.transform = `translate(${x}px, ${y}px) scale(${scale})`;
		}
	} else {
		elm.style.transform = `translate(${x}px, ${y}px)`;
	}
}
