import { Component } from '../engine/component.js';

/**
 * How an entity looks.
 *
 * Not sure if we should use this, or `Sprite`.
 * */
export class Mesh extends Component {
	/** @param {string} sprite */
	constructor(sprite) {
		super();

		this.sprite = `./assets/sprites/${sprite}.gif`;
	}
}
