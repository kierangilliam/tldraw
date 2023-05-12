type TLEvents = {
	onTouchStart?: (e: React.TouchEvent) => void;
	onTouchEnd?: (e: React.TouchEvent) => void;
	onPointerMove?: (e: React.PointerEvent) => void;
	onPointerUp?: (e: React.PointerEvent) => void;
	onPointerDown?: (e: React.PointerEvent) => void;
	onPointerEnter?: (e: React.PointerEvent) => void;
	onPointerLeave?: (e: React.PointerEvent) => void;
	onDragOver?: (e: React.DragEvent<Element>) => void;
	onDrop?: (e: React.DragEvent<Element>) => void;
};

export function useEvents(node: HTMLElement | SVGElement, events?: TLEvents) {
	function applyEvents(events: TLEvents) {
		if (events.onPointerDown) node.addEventListener('pointerdown', events.onPointerDown);
		if (events.onPointerMove) node.addEventListener('pointermove', events.onPointerMove);
		if (events.onPointerUp) node.addEventListener('pointerup', events.onPointerUp);
		if (events.onPointerEnter) node.addEventListener('pointerenter', events.onPointerEnter);
		if (events.onPointerLeave) node.addEventListener('pointerleave', events.onPointerLeave);
		if (events.onDragOver) node.addEventListener('dragover', events.onDragOver);
		if (events.onDrop) node.addEventListener('drop', events.onDrop);
		if (events.onTouchStart) node.addEventListener('touchstart', events.onTouchStart);
		if (events.onTouchEnd) node.addEventListener('touchend', events.onTouchEnd);
	}

	function removeEvents(events: TLEvents) {
		if (events.onPointerDown) node.removeEventListener('pointerdown', events.onPointerDown);
		if (events.onPointerMove) node.removeEventListener('pointermove', events.onPointerMove);
		if (events.onPointerUp) node.removeEventListener('pointerup', events.onPointerUp);
		if (events.onPointerEnter) node.removeEventListener('pointerenter', events.onPointerEnter);
		if (events.onPointerLeave) node.removeEventListener('pointerleave', events.onPointerLeave);
		if (events.onDragOver) node.removeEventListener('dragover', events.onDragOver);
		if (events.onDrop) node.removeEventListener('drop', events.onDrop);
		if (events.onTouchStart) node.removeEventListener('touchstart', events.onTouchStart);
		if (events.onTouchEnd) node.removeEventListener('touchend', events.onTouchEnd);
	}

	if (events) {
		applyEvents(events);
	}

	let lastEvents = events;

	return {
		update(events?: TLEvents) {
			if (lastEvents) {
				removeEvents(lastEvents);
			}

			if (events) {
				applyEvents(events);
			}

			lastEvents = events;
		},
		destroy() {
			if (lastEvents) {
				removeEvents(lastEvents);
			}
		}
	};
}
