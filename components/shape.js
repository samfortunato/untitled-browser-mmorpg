import { Component } from '../engine/component.js';

/**
 * Collision box component.
 *
 * Maybe just use `Collider`? But this should maybe have general information about the physical shape and bounds of something?
 */
export class Shape extends Component {
	constructor(x = 0, y = 0, w = 0, h = 0) {
		super();

		this.x = x;
		this.y = y;
		this.w = w;
		this.h = h;
	}

	debug(ctx) {
		ctx.strokeStyle = 'red';
		ctx.strokeRect(this.x, this.y, this.w, this.h);
	}
}
