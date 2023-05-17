export const allEntities = new Map();

export function addEntity(entity) {
  allEntities.set(entity.id, entity);
}

export function addEntities(entities) {
  for (const entity of entities) {
    allEntities.set(entity.id, entity);
  }
}

export function destroyEntity(entity) {
  allEntities.delete(entity.id);
}
