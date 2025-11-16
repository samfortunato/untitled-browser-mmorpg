import { Entity } from '../entities/entity.js';

/**
 * A structure that represents the space in a map, or scene.
 *
 * Implemented as a (grid? quadtree? still deciding?)
 *
 * "Organizes" a defined 2D? 3D? area. Helps with querying objects, finding, collision detection, etc.
 */
export class Space {
	/** @param {number} size Size of the space. Probably will be a number? */
	constructor(size) {
		this.size = size;
	}

	/** @param {Entity} entity */
	add(entity) { }

	/** @param {Entity} entity */
	find(entity) { }
}
