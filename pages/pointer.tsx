import { useEffect } from 'react';

export default function Pointer() {
	function downHandler(e: PointerEvent) {
		let el = document.getElementById('target');
		el.setPointerCapture(e.pointerId);
	}

	function cancelHandler(e: PointerEvent) {
		let el = document.getElementById('target');
		el.releasePointerCapture(e.pointerId);
	}

	function init() {
		let el = document.getElementById('target');
		el.onpointerdown = downHandler;
		el.onpointercancel = cancelHandler;
	}

	useEffect(() => {
		init();
	}, []);

	return (
		<div
			style={{ touchAction: 'none' }}
			id={'target'}
		>
			Touch me...
		</div>
	);
}
