export const inputProperties = [
	{
		name: '--noise-size',
		syntax: '<integer>',
		inherits: false,
		initialValue: 1,
	},
	{
		name: '--noise-shape',
		syntax: 'square | circle',
		inherits: false,
		initialValue: 'square',
	},
	{
		name: '--noise-hue',
		syntax: '<integer>+',
		inherits: false,
		initialValue: 0,
	},
	{
		name: '--noise-saturation',
		syntax: '<percentage>+',
		inherits: false,
		initialValue: '0%',
	},
	{
		name: '--noise-lightness',
		syntax: '<percentage>+',
		inherits: false,
		initialValue: '40% 60%',
	},
	{
		name: '--noise-alpha',
		syntax: '<number>+',
		inherits: false,
		initialValue: 1,
	},
];

export class Noise {
	static inputProperties = inputProperties.map(property => property.name);

	paint(context, canvas, props) {
		const size = clamp(props.get('--noise-size').value, 0, Number.MAX_SAFE_INTEGER);
		const shape = props.get('--noise-shape').value;

		let [minHue, maxHue = minHue] = props.getAll('--noise-hue')
			.map(p => mod(p.value, 360));
		[minHue, maxHue] = sort(minHue, maxHue);

		let [minSaturation, maxSaturation = minSaturation] = props.getAll('--noise-saturation')
			.map(p => clamp(p.value, 0, 100));
		[minSaturation, maxSaturation] = sort(minSaturation, maxSaturation);

		let [minLightness, maxLightness = minLightness] = props.getAll('--noise-lightness')
			.map(p => clamp(p.value, 0, 100));
		[minLightness, maxLightness] = sort(minLightness, maxLightness);

		let [minAlpha, maxAlpha = minAlpha] = props.getAll('--noise-alpha')
			.map(p => clamp(p.value, 0, 1));
		[minAlpha, maxAlpha] = sort(minAlpha, maxAlpha);

		let [x, y] = [0, 0];
		while (y < canvas.height) {
			const h = random(minHue, maxHue);
			const s = random(minSaturation, maxSaturation);
			const l = random(minLightness, maxLightness);
			const a = random(minAlpha, maxAlpha);
			context.fillStyle = `hsl(${h}, ${s}%, ${l}%, ${a})`;

			if (shape === 'square') {
				context.fillRect(x, y, size, size);
			}
			else {
				context.beginPath()
				context.arc(x + size / 2, y + size / 2, size / 2, 0, 2 * Math.PI)
				context.closePath()
				context.fill()
			}

			x += size;
			if (x >= canvas.width) {
				x = 0;
				y += size;
			}
		}
	}
}

export const mod = (x, y) => ((x % y) + y) % y;
export const sort = (x, y) => [Math.min(x, y), Math.max(x, y)];
export const clamp = (value, min, max) => Math.min(Math.max(value, min), max);
export const random = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

if ('PaintWorkletGlobalScope' in globalThis && globalThis instanceof PaintWorkletGlobalScope) {
	registerPaint('noise', Noise);
}
