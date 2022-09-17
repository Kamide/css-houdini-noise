import { inputProperties } from './noise.js';

inputProperties.forEach(CSS.registerProperty);
CSS.paintWorklet.addModule(new URL('./noise.js', import.meta.url));
