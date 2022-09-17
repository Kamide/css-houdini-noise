# CSS Houdini Noise

CSS Houdini paint worklet for generating noise textures.

## Properties

Properties can be imported from [./src/noise.js](./src/noise.js).

```js
export const inputProperties = [
	{
		name: '--noise-size',
		syntax: '<integer>',
		inherits: false,
		initialValue: 1,
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
```

## Register

To register the paint worklet, import [./src/register.js](./src/register.js) as a module.

## Demo

https://kamide.github.io/css-houdini-noise/
