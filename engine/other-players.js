import { addEntity } from './entity.js';
import { OtherPlayer } from '../entities/meta/player/other-player.js';

const otherPlayers = new Map();

export function spawnOtherPlayer(playerData) {
  if (otherPlayers.has(playerData.id)) return;

  const entity = new OtherPlayer(playerData.id, playerData.x, playerData.y, playerData.username);
  otherPlayers.set(playerData.id, entity);
  addEntity(entity);
}

export function updateOtherPlayer(playerData) {
  const entity = otherPlayers.get(playerData.id);
  if (entity) {
    if (!entity.hasReceivedFirstPosition) {
      entity.transform.x = playerData.x;
      entity.transform.y = playerData.y;
      entity.transform.z = playerData.z ?? 0;
      entity.hasReceivedFirstPosition = true;
    }
    entity.targetX = playerData.x;
    entity.targetY = playerData.y;
    entity.targetZ = playerData.z ?? 0;
    entity.direction = playerData.direction ?? 2;
    entity.state = playerData.state ?? 0;
  }
}

export function updateOtherPlayerUsername(id, username) {
  const entity = otherPlayers.get(id);
  if (entity) {
    entity.username = username;
  }
}

export function removeOtherPlayer(id) {
  const entity = otherPlayers.get(id);
  if (entity) {
    entity.destroy();
    otherPlayers.delete(id);
  }
}
