export const allEntities = new Map();

export function addEntity(entity) {
  allEntities.set(entity.uniqueId.id, entity);
}

export function addEntities(entities) {
  for (const entity of entities) {
    allEntities.set(entity.uniqueId.id, entity);
  }
}

/**
 * @deprecated
 *
 * For Entities, use the `destroy` method on the `Entity` parent class instead.
 * */
export function destroyEntity(entity) {
  allEntities.delete(entity.uniqueId.id);
}
