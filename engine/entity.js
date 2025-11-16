import { Entity } from '../entities/entity.js';

/** @type {Map<symbol, Entity>} */
export const entities = new Map();

/** @param {Entity} entity */
export function addEntity(entity) {
  entities.set(entity.id.value, entity);
}

/** @param {Entity[]} additional */
export function addEntities(additional) {
  for (const entity of additional) {
    entities.set(entity.id.value, entity);
  }
}

export function destroyAllEntities() {
  entities.clear();
}

/**
 * @private
 *
 * Do NOT use to destroy an entity.
 *
 * ONLY for use in a parent class' `destroy` method.
 *
 * For subclasses, use `this.destroy()` from the parent `Entity` class instead.
 * */
export function _destroyEntity(entity) {
  entities.delete(entity.id.value);
}
