export default function Swiper() {
	let ongoingTouches = [];

	const colorForTouch = (touch: Touch) => {
		let r: string | number = touch.identifier % 16;
		let g: string | number = Math.floor(touch.identifier / 3) % 16;
		let b: string | number = Math.floor(touch.identifier / 7) % 16;
		r = r.toString(16); // make it hex digits
		g = g.toString(16); // make it hex digits
		b = b.toString(16); // make it hex digits
		return `#${r}${g}${b}`;
	};

	const copyTouch = (touch: Touch) => {
		return {
			identifier: touch.identifier,
			pageX: touch.pageX,
			pageY: touch.pageY,
		};
	};

	const log = (msg: string) => {
		const p = document.getElementById('log');
		p.innerHTML = msg + '\n' + p.innerHTML;
	};

	const ongoingTouchIndexById = (idToFind: number) => {
		for (let i = 0; i < ongoingTouches.length; i++) {
			let id = ongoingTouches[i].identifier;

			if (id === idToFind) {
				return i;
			}

			return -1; // not found
		}
	};

	const handleStart = (e: TouchEvent) => {
		e.preventDefault();
		log(`touch start`);
		const el: any = document.getElementById('canvas');
		const ctx = el.getContext('2d');
		const touches = e.changedTouches;

		for (let i = 0; i < touches.length; i++) {
			log(`touchstart: ${i} ...`);
			ongoingTouches.push(copyTouch(touches[i]));
			const color = colorForTouch(touches[i]);
			ctx.beginPath();
			ctx.arc(
				touches[i].pageX,
				touches[i].pageY,
				4,
				0,
				2 * Math.PI,
				false,
			);
			ctx.fillStyle = color;
			ctx.fill();
		}
	};

	const handleEnd = (e: TouchEvent) => {
		e.preventDefault();
		const el: any = document.getElementById('canvas');
		const ctx = el.getContext('2d');
		const touches = e.changedTouches;

		for (let i = 0; i < touches.length; i++) {
			const color = colorForTouch(touches[i]);
			const idx = ongoingTouchIndexById(touches[i].identifier);

			if (idx >= 0) {
				ctx.lineWidth = 4;
				ctx.fillStyle = color;
				ctx.beginPath();
				ctx.moveTo;
				ctx.moveTo(
					ongoingTouches[idx].pageX,
					ongoingTouches[idx].pageY,
				);
				ctx.lineTo(touches[i].pageX, touches[i].pageY);
				ctx.fillRect(touches[i].pageX - 4, touches[i].pageY - 4, 8, 8);

				ongoingTouches.splice(idx, 1);
			} else {
				log(`cannot find figure out which touch end`);
			}
		}
	};

	const handleCancel = (e: TouchEvent) => {
		e.preventDefault();
		const touches = e.changedTouches;

		for (let i = 0; i < touches.length; i++) {
			const idx = ongoingTouchIndexById(touches[i].identifier);
			ongoingTouches.splice(idx, 1);
		}
	};

	const handleMove = (e: TouchEvent) => {
		e.preventDefault();
		const el: any = document.getElementById('canvas');
		const ctx: CanvasRenderingContext2D = el.getContext('2d');
		const touches = e.changedTouches;

		for (let i = 0; i < touches.length; i++) {
			const color = colorForTouch(touches[i]);
			const idx = ongoingTouchIndexById(touches[i].identifier);

			if (idx >= 0) {
				log(`continuing touch ${idx}`);
				ctx.beginPath();
				log(
					`ctx.moveTo${ongoingTouches[idx].pageX}, ${ongoingTouches[idx].pageY}`,
				);
				ctx.moveTo(
					ongoingTouches[idx].pageX,
					ongoingTouches[idx].pageY,
				);
				log(
					'ctx.lineTo(' +
						touches[i].pageX +
						', ' +
						touches[i].pageY +
						');',
				);
				ctx.lineTo(touches[i].pageX, touches[i].pageY);
				ctx.lineWidth = 4;
				ctx.strokeStyle = color;
				ctx.stroke();

				ongoingTouches.splice(idx, 1, copyTouch(touches[i]));
			} else {
				log(`cannot figure out which touch to continue`);
			}
		}
	};

	const startUp = () => {
		const el = document.getElementById('canvas');
		el.addEventListener('touchstart', handleStart, false);
		el.addEventListener('touchend', handleEnd, false);
		el.addEventListener('touchcancel', handleCancel, false);
		el.addEventListener('touchmove', handleMove, false);
		log(`initialized`);
	};

	return (
		<>
			<canvas
				id="canvas"
				width="600"
				height="600"
				style={{ border: '1px solid gray' }}
			>
				Your browser does not support canvas element.
			</canvas>
			<br />
			<button onClick={startUp}>Initialize</button>
			Log:{' '}
			<pre
				id="log"
				style={{
					border: '1px solid #ccc',
				}}
			></pre>
		</>
	);
}
