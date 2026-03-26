import { Entity } from '../entities/entity.js';

import { Offset } from '../constructs/offset.js';

export class Follow {
	/**
	 * @param {Entity} target The target to follow.
	 * @param {Offset} offset How much the entity is offset in space from the target.
	 */
	constructor(target, offset) {
		this.target = target;
		this.offset = offset;
	}
}
