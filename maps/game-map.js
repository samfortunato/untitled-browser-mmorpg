import { calculateTileCrop, getTileset } from './tiles.js';

export class GameMap {
  static tilesetName = 'NULL';
  static tiles = [[0]];

  /** @param {CanvasRenderingContext2D} ctx */
  static draw(ctx) {
    for (let y = 0; y < this.tiles.length; y++) {
      for (let x = 0; x < this.tiles[y].length; x++) {
        ctx.drawImage(
          getTileset(this.tilesetName),
          ...calculateTileCrop(this.tilesetName, this.tiles[y][x]),
          16, 16,
          x * 32, y * 32,
          32, 32
        )
      }
    }
  }
}
