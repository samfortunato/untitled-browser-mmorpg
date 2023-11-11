export const allEntities = new Map();

export function addEntity(entity) {
  allEntities.set(entity.uniqueId.id, entity);
}

export function addEntities(entities) {
  for (const entity of entities) {
    allEntities.set(entity.uniqueId.id, entity);
  }
}

export function destroyAllEntities() {
  allEntities.clear();
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
  allEntities.delete(entity.uniqueId.id);
}
