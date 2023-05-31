export const allEntities = new Map();

export function addEntity(entity) {
  allEntities.set(entity.uniqueId.id, entity);
}

export function addEntities(entities) {
  for (const entity of entities) {
    allEntities.set(entity.uniqueId.id, entity);
  }
}

export function destroyEntity(entity) {
  allEntities.delete(entity.uniqueId.id);
}
